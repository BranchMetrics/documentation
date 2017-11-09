---
type: recipe
directory: other
exclude_from_google_search: true
title: "Apptimize"
page_title: Deep link users through install, and test the best user flow automatically.
description: Branch has partnered with Apptimize to seamlessly A/B test user flows after a deep link click from Branch.
keywords: abtesting, apptimize
platforms:
- ios
- android
sections:
- overview
- guide
- support
alias: [ /third-party-integrations/apptimize/, /third-party-integrations/apptimize/overview, /third-party-integrations/apptimize/guide/ios/, /third-party-integrations/apptimize/android/, /third-party-integrations/apptimize/support/ios/, /third-party-integrations/apptimize/support/android/ ]
redirect: https://docs.branch.io
---

{% if page.overview %}

Branch has partnered with Apptimize to seamlessly provide different onboarding flows for users arriving through Branch links. You can design and test different user flows based off the data the Branch deep link returns to you. Have a theory that users clicking Branch links right into a product page convert better than users clicking Branch links, but must authenticate first? With this integration, you can define, measure, and prove your hypothesis!

{% image src='/img/pages/third-party-integrations/apptimize/campaign-flow.png' full center alt='Apptimize flow example' %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [sign up for an Apptimize account](https://apptimize.com/admin/sign-up?p=20) and [install the Apptimize SDK](https://apptimize.com/admin/help).

{% endprerequisite %}

## How it works

You first define a campaign on Apptimize's dashboard, and then configure it to filter and segment based on values that come from the deep link data of a Branch link. The easiest way to do this is to have an Apptimize call to send data inside the Branch `initSesssion` callback. **However, as long as Apptimize is aware of Branch data before an Apptimize experiment is run, you can structure this however you like.**

## Configure an Apptimize Campaign

1. Create a new Apptimize campaign and name it
1. Set up **Variants** corresponding to pieces of code you will execute to perform your A/B test.

{% image src='/img/pages/third-party-integrations/apptimize/campaign-creation.png' 3-quarters center alt='Apptimize campaign creation' %}

## Set targeting on Apptimize dashboard

Next, segment users into your campaign using the Apptimize dashboard. We have set a **custom attribute** of `channel` with a value of **facebook**, meaning that if someone comes from a Branch link with the channel set to Facebook, they will automatically be a part of your campaign.

{% image src='/img/pages/third-party-integrations/apptimize/campaign-targeting.png' full center alt='Apptimize campaign targeting' %}

## Set targeting in your app

You need to decide *where* to define a user attribute from the previous step. Setting this in the callback found inside your {% if page.ios %}`AppDelegate.m`{% endif %}{% if page.android %} `BaseActivity` or `SplashActivity`{% endif %} is the simplest approach, but you can do it anywhere.

{% if page.ios %}

{% highlight objc %}

-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Initalize Branch and register the deep link handler
    // The deep link handler is called on every install/open to tell you if the user had just clicked a deep link
    Branch *branch = [Branch getInstance];
    [branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error){
        if (!error && params) {
            // set Attribute inside callback
            if ([params objectForKey:@"channel"] != nil) {
                [Apptimize setUserAttributeString:@"facebook" forKey:@"channel"];
            }

            [Apptimize runTest:@"Branch Experiment" withBaseline:^{
                // baseline
                UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
                AuthViewController *vc = [[AuthViewController alloc] init];
                [navController setViewControllers:@[vc] animated:YES];
            } andVariations:@{@"Call-to-Action variant": ^{
                UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
                ProductViewController *vc = [[ProductViewController alloc] initWithItem:[params objectForKey:@"product_id"]];
                [navController setViewControllers:@[vc] animated:YES];
            }}];
        }
    }];
}
{% endhighlight %}
{% endif %}

{% if page.android %}

{% highlight java %}

    Branch branch = Branch.getInstance();
    branch.initSession(new BranchReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (error == null) {
                if (referringParams.has("facebook")) {
                    Apptimize.setUserAttribute("channel", "facebook");
                }

                Bundle extras = new Bundle();
                try {
                    extras.putString("product_id", referringParams.getString("product_id"));
                } catch (JSONException e) { //no-op }

                Apptimize.runTest("Branch Experiment", new ApptimizeTest() {
                    @Override
                    public void baseline() {
                        // take user through auth flow, then product
                        startActivity(new Intent(getApplicationContext(), AuthActivity.class), extras)
                    }

                    @SuppressWarnings("unused")
                    public void variation1() {
                        // Variant: Take user directly to product
                        startActivity(new Intent(getApplicationContext(), ProductActivity.class), extras)
                    }
                });
            }
        }, this.getIntent().getData(), this);
{% endhighlight %}

{% endif %}

{% protip %}
The {% if page.ios %}`[Apptimize runTest: withBaseline: andVariations:]`{% endif %}{% if page.android %}`Apptimize.runTest("Branch Experiment", ...)`{% endif %} method takes the parameters we defined when creating the campaign on the Apptimize dashboard. The `runTest` parameter takes the string `Branch Experiment`, which corresponds to what we named our campaign. The baseline and variation values also correspond to the strings value specified in the Apptimize campaign dashboard.
{% endprotip %}

## Define a goal event

Like [tracking events with Branch]({{base.url}}/getting-started/user-value-attribution#custom-event-tracking), you can track events with Apptimize. Use this to measure conversions from different flows; a good goal to track would be purchases from the initial product.

{% if page.ios %}

{% highlight objc %}
[Apptimize track:@"completed_purchase"];
{% endhighlight %}

{% endif %}

{% if page.android %}

{% highlight java %}
Apptimize.track("completed_purchase");
{% endhighlight %}

{% endif %}

## Testing

In order to test different flows from a Branch link click, we recommend the following steps:

1. Run your app locally on the XCode simulator / local Android Phone
1. Take the Branch link you'll be testing and copy and paste inside the simulator / local Android Phone
1. Run the application afterwards
1. Once you've tested the code block, hit 'Reset Content and Settings' inside the iOS simulator or Reset Google IDFA
1. Repeat to try your second variation

{% elsif page.support %}

## FAQ

##### My code variations aren't showing!

One thing to note is that it takes **10** minutes to propagate a campaign change. Please check after 10 minutes.

##### How do I tell Apptimize about my Branch channel data?

Currently, the easiest way to do this is to define it before you release a campaign. After you create a branch link and know your segment, tell Apptimize about it through the SDK, and then you can filter on it. This will be modified.

{% endif %}
