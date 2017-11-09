---
type: recipe
directory: other
exclude_from_google_search: true
title: "Referral SaaSquatch"
page_title: "Using Branch and Referral Saasquatch together"
platforms:
- ios
- android
sections:
- overview
- guide
alias: [ /third-party-integrations/referral-saasquatch/, /third-party-integrations/referral-saasquatch/overview/, /third-party-integrations/referral-saasquatch/guide/ ]
redirect: https://docs.branch.io
---

{% if page.overview %}

[Referral SaaSquatch](http://www.referralsaasquatch.com/) is a cross-platform customer referral program platform. In addition to mobile, SaaSquatch also works with desktop, web, telecom, ecommerce, and enterprise companies to power their referral programs across channels. The Branch + Referral SaaSquatch integration lets you run a referral program with any combination of web and mobile, using the power of Branch deep linking and Referral SaaSquatch's widgets, referral graph, reward bank, and administration features.

The Branch + SaaSquatch referral program integration provides:

- **Cross-channel referrals.** The Branch + SaaSquatch integration powers referrals across from **Mobile ⇨ Mobile**, **Web ⇨ Mobile**, **Mobile ⇨ Web**, **Web ⇨ Web**.
- **Unique referral links for web and mobile.** SaaSquatch referral links wrap Branch deep links to power mobile or web app attribution.
- **Unique referral codes for retail, call centers and support.** SaaSquatch provides unique referral codes for each of your customers that can be integrated with identify systems, support systems and payment systems like Stripe, Braintree and Recurly.
- **Custom conversion tracking.** SaaSquatch lets you to provide rewards for any custom conversion status. You can reward users for referring users who not just signup, but also make purchases, etc.
- **User reward tracking/storage.** SaaSquatch leaves the actual user facing rewarding to you, but we store how many credits have been earned from referrals. This makes it easy so that you can just check the balance of credits in the app from us, give the user some reward, then clear the credit balance on our server.

{% example title="Other implementation ideas" %}

Referral SaaSquatch supports referral tracking across platforms and mediums.
For example you could invite a friend to try a product using your iPhone, but then their friends might sign up for an account using Chrome on their laptop, and then install your Android app to make their first purchase.

Some other possibilities:

 - Someone sends an invite from your **web app**, a friend gets an email on their phone, is redirected to install the iOs app and signs up in-app.
 - Someone tweets an invite from your **android app**, a friend sees the tweet on their laptop, is redirected to your website, and signs up from your website using their twitter credentials.
 - Someone posts to Facebook after receiving an **email newsletter**, the friend sees the post and is redirected to install your Android app. After installing your app, they go to your website to create and account.

{% endexample %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Generating referral links & codes

Referral SaaSquatch [provides a widget](http://docs.referralsaasquatch.com/mobile/widget/) to track referrals and let people send invites. The widget is embedded as a personalized mobile webview based upon your user's id, name, and details. The first time that a user is identified and has their widget loaded, they will be created in the SaaSquatch database. This will trigger
attribution and conversion tracking, and create a unique referral code and referral link.

Here's how to integrate the widget:

{% if page.ios %}

{% highlight objc %}

NSString *tenantAlias = @"test_example";

// path construction
NSMutableString *path = @"/a";
[path appendString:tenantAlias];
[path appendString:@"/widgets/mobilewidget";

// query construction
NSURLQueryItem *userId = [NSURLQueryItem queryItemWithName:@"userId" value:[user getId]];
NSURLQueryItem *firstName = [NSURLQueryItem queryItemWithName:@"fistName" value:[user getFirstName]];
NSURLQueryItem *accountId = [NSURLQueryItem queryItemWithName:@"accountId" value:[user getAccountId]];
NSURLQueryItem *email = [NSURLQueryItem queryItemWithName:@"email" value:[user getEmail]];

// URL construction
NSURLComponents *components = [[NSURLComponents alloc] init];
components.scheme = @"https";
components.host = @"app.referralsaasquatch.com";
components.path = path
components.queryItems = @[userId, firstName, accountId, email];

NSURL *url = [[NSURL alloc] init];
url = components.URL;

{% endhighlight %}

{% endif %}

{% if page.android %}

{% highlight java %}

String tenantAlias = "test_example";

Uri.Builder builder = new Uri.Builder();
builder.scheme("https")
    .authority("app.referralsaasquatch.com")
    .appendPath("a")
    .appendPath(tenantAlias)
    .appendPath("widgets").appendPath("mobilewidget")
    .appendQueryParameter("userId", user.getId())
    .appendQueryParameter("firstName", user.getFirstName())
    .appendQueryParameter("accountId", user.getCompanyId())
    .appendQueryParameter("email", user.getEmail())

    // If available connect referralCode from Branch deep link to trigger attribution
    //.appendQueryParameter("referralCode", TODO)

    // If status is available, include it here to trigger conversions
    //.appendQueryParameter("accountStatus", "PAID")

    .appendQueryParameter("paymentProviderId", "NULL");

String widgetUrl = builder.build().toString();

WebView webview = new WebView(this);
webview.getSettings().setJavaScriptEnabled(true);
webview.loadUrl(widgetUrl);
{% endhighlight %}
{% endif %}

## Including the widget

Once you've built the widget and loaded the content, all of the background tracking for the referral program is complete. To include the referral program you can load the request inside the webView in your View Controller:

{% if page.ios %}
{% highlight objc %}

    [self.webView loadRequest:[NSURLRequest requestWithUrl:url]];

{% endhighlight %}
{% endif %}

{% if page.android %}
{% highlight java %}

    setContentView(webview);

{% endhighlight %}
{% endif %}

## Tracking mobile referrals

To capture **mobile installs** from a SaaSquatch referral program, you'll need to use the Branch SDK to detect the referral code after a link has been clicked and register the `sq_referralCode` metadata field to the `referralCode` field of the SaaSquatch webview. Alternatively, for the [SaaSquatch Stripe integration](http://docs.referralsaasquatch.com/stripe/), this referral code can be passed directly to the Stripe SDK as the `coupon.code`.

{% protip %}
This is the same strategy used for other SaaSquatch payment systems integrations like Recurly, Braintree and Zuora.
{% endprotip %}

{% if page.ios %}
{% highlight objc %}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // initialize the session, setup a deep link handler
    [[Branch getInstance]initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error){
        if (error == nil && params) {
            // params contains Referral SaasQuatch info
            if ([params contains:@"sq_referralCode"]) {
                // referral attributed, add UI
            }
        }
    }];
    return YES;
}

{% endhighlight %}
{% endif %}

{% if page.android %}
{% highlight java %}

@Override
public void onStart() {
    super.onStart();

    Branch branch = Branch.getInstance(getApplicationContext());
    branch.initSession(new Branch.BranchReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked before showing up
                Log.i("BranchConfigTest", "deep link data: " + referringParams.toString());

                if (referringParams.has("sq_referralCode")) {
                    // This is a SaaSquatch link
                    try {
                        //setup referrer name
                        TextView referrerName = (TextView) findViewById(R.id.referrer_name);
                        String displayText = referringParams.getString("sq_firstName") + " " + referringParams.getString("sq_lastName");
                        displayText += " wants join to join them on Fake App.";
                        referrerName.setText(displayText);

                        //setup referrer image
                        WebView referrerImage = (WebView) findViewById(R.id.referrer_image);
                        referrerImage.loadUrl(referringParams.getString("sq_imageUrl"));

                        //setup referral reward
                        String rewardText = "You can get " + referringParams.getString("sq_quantity") + "% off your bill!";
                        TextView reward = (TextView) findViewById(R.id.reward);
                        reward.setText(rewardText);

                        // TODO: Connect this with the Widget code shown above to complete attribution once a user authenticates
                        String referralCode = referringParams.getString("sq_referralCode");

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }, this.getIntent().getData(), this);
}

{% endhighlight %}
{% endif %}

## Conclusion

You now have the foundation for an incentivized referral program. Like many popular promo-code systems, you can reward both the user who shares a link and the user who clicks the link and purchases in the app.

{% endif %}
