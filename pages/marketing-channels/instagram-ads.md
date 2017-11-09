---
type: recipe
directory: marketing-channels
title: "Instagram Ads"
page_title: "Advertising with Deep Links: Instagram Ads"
description: Learn how to create Instagram ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication, Instagram, Instagram Ads
platforms:
- ios
- android
sections:
- overview
- guide
- support
alias: [ /features/instagram-ads/, /features/instagram-ads/overview/, /features/instagram-ads/guide/ios/, /features/instagram-ads/guide/android/, /features/instagram-ads/support/ios/, /features/instagram-ads/support/android/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}

Branch links can be used together with Instagram ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted title="Get started with Instagram ads" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- To track installs from Instagram Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Connect Branch to Facebook

There are two options for connecting Branch to Facebook (which will enable you to run ads on Instagram), and either can be done depending on your context. The first option doesn't require any native app code changes and should be used if you don't have the Facebook SDK. The second option is for if you want Branch to just connect to the Facebook SDK via a client side integration.

### **Option 1** Connect Without Using Facebook SDK

In order for Branch to properly run a Instagram deep linked ad campaign, you must first allow Branch to access your Facebook app information.

1. Log in to Facebook, navigate to [developers.facebook.com/apps](http://developers.facebook.com/apps) and choose your app. You'll need the **App ID** and **App Secret**.{% image src='/img/pages/features/facebook-ads/fb_auth_fb.png' 3-quarters center alt='Facebook Auth' %}
1. On the Branch Dashboard, go to [Link Settings](https://dashboard.branch.io/#/settings/link) and scroll down to 'Authenticate for Facebook Install Ads'. Enter your **App ID** and **App Secret** from Facebook.{% image src='/img/pages/features/facebook-ads/fb_auth_branch.png' 3-quarters center alt='Facebook Auth' %}
1. Press 'Authenticate'.

### **Option 2** Connect Branch to the Facebook SDK

In order to use this option, you must be using iOS SDK v0.12.2 or Android SDK v1.12.0. These have the code necessary to wrap the Facebook SDK.

{% if page.ios %}
On iOS, you simply need to give Branch the class that Facebook uses for deferred deep linking. In the `AppDelegate.m`, first import the correct header file.

{% highlight objc %}
#import <FBSDKCoreKit/FBSDKCoreKit.h>
{% endhighlight %}

Next, you need to register the app link utility class with Branch before you call initSession.

{% highlight objc %}
// You must call this before you call initSession
[[Branch getInstance] registerFacebookDeepLinkingClass:[FBSDKAppLinkUtility class]];
[[Branch getInstance] initSession......
{% endhighlight %}
{% endif %}

{% if page.android %}
On Android, you'll need to enable our Facebook App Links check process. Ideally, you should call this in your custom Application class when you call `getAutoInstance`.

{% highlight java %}
Branch.getAutoInstance().enableFacebookAppLinkCheck();
{% endhighlight %}
{% endif %}

Note that you cannot call `fetchDeferredAppLinkData` in addition to us, lest you risk consuming the attribution event before the Branch SDK can. Other than that, you're all set!

## Create a Quick Link on the Branch dashboard

### Add a Quick Link

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Link Description** for later reference. For example: "Instagram ad for blue sneakers - summer 2016." {% image src='/img/pages/features/instagram-ads/link-description.png' 3-quarters center alt='Create Quick Link' %}
1. **Channel** and **Campaign** are optional but recommended. **Tags** is free form. {% image src='/img/pages/features/instagram-ads/link-tags.png' 3-quarters center alt='Create Quick Link' %}

{% caution %}

In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](https://dev.branch.io/features/deepviews/guide/ios/) for your entire account or [disable Deepviews for one link]({{base.url}}/features/deepviews/advanced/ios/#disabling-deepviews-for-one-link).

{% endcaution %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Add Branch link to Instagram App Install campaign

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) while logged in to the account that owns your Facebook app.
1. Choose **Get installs of your app**. After entering a name for your campaign and clicking continue, select the Facebook app that you wish to advertise. {% image src='/img/pages/features/facebook-ads/fb_ad_installs.png' 3-quarters center alt='Instagram Example Ad' %}
1. After you choose your audience, select "Choose your placements" to target Instagram. {% image src='/img/pages/features/instagram-ads/instagram-placement.png' 3-quarters center alt='Instagram Example Ad' %}
1. Next, set your budget, and schedule, click continue to create your ad.
1. Once you have customized the display of the ad, you can now specify the Deep Link in the following section. {% image src='/img/pages/features/instagram-ads/instagram-ad-deep-link.png' 3-quarters center alt='Instagram Example Ad' %}
1. Paste the Branch link from the dashboard into the **Deep Link** field. {% image src='/img/pages/features/facebook-ads/fb_ad_deep_link_branch.png' half center alt='Instagram Example Ad' %}

{% protip title="Optional: Use Multiple Deep Links with the Carousel Ad Format" %}

If you are using the Carousel Ad Format, you can specify a different Deep Link for each image you use. This is format is useful if you want to drive customers to different content or products.

{% endprotip %}

## Add Branch link to Instagram App Engagement campaign

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) while logged in to the account that owns your Facebook app.
1. Choose **Increase engagement in your app**. After entering a name for your campaign and clicking continue, select the Facebook app that you wish to advertise. {% image src='/img/pages/features/facebook-ads/fb_ad_installs.png' 3-quarters center alt='Instagram Example Ad' %}
1. After you choose your audience, select "Choose your placements" to target Instagram. {% image src='/img/pages/features/instagram-ads/instagram-placement.png' 3-quarters center alt='Instagram Example Ad' %}
1. Next, set your budget, and schedule, click continue to create your ad.
1. Once you have customized the display of the ad, you can now specify the Deep Link in the following section. {% image src='/img/pages/features/instagram-ads/instagram-ad-deep-link.png' 3-quarters center alt='Instagram Example Ad' %}
1. Paste the Branch link from the dashboard into the **Deep Link** field. Note that this field does not support query parameter-based links. You must create a short link add deep link data keys and values on the marketing page. {% image src='/img/pages/features/facebook-ads/fb_ad_deep_link_branch.png' half center alt='Instagram Example Ad' %}

## Add Branch link to Instagram Website Clicks campaign

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) while logged in to the account that owns your Facebook app.
1. Choose **Send people to your website**. After entering a name for your campaign and clicking continue, select your audience, placement (this is where you can choose to target **Instagram**), budget, and schedule. Then click continue to create your ad.
1. Paste the Branch link from the dashboard into the **Website URL** field.
1. You can then customize the display of the ad and specify the **Call to Action** (we recommend **Download**).

## View your data using the Branch dashboard

The [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard shows the performance of each individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs.

{% caution %}
Instagram prevents Branch from measuring the number of clicks on their ads, so all **Clicks** numbers for Instagram ads are inaccurate.
{% endcaution %}

{% image src='/img/pages/features/facebook-ads/marketing_link_row.png' full center alt='Facebook Example Ad' %}

To view more details stats, click the _small button that looks like a bar chart_ on the far right. Note that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

{% image src='/img/pages/features/facebook-ads/click_flow_analytics.png' full center alt='Facebook Example Ad' %}

{% elsif page.support %}

## Don't use setDebug

Instagram ads are incompatible with [debug mode]({{base.url}}/getting-started/integration-testing/guide/ios/#use-debug-mode-to-simulate-fresh-installs), as this prevents us from sending the correct hardware ID to Facebook.

## Testing deep linked ads

The only way to test the deep linking functionality is outside of the actual ads system. Follow these instructions to test the deep linking functionality:

1. Head to the [Ads tester tool](https://developers.facebook.com/tools/app-ads-helper/)
1. Choose the app that you're advertising with
1. Scroll down to the button that says 'Test Deep Link'
1. Paste in the Branch link
1. Check 'Send Deferred'
1. Click 'Send to iOS/Android'
1. Install the app and it should deep link!

##### Demo/preview ads do not deep link

Unfortunately, Instagram uses a different mechanism for showing the preview ads that you send to your phone. **This prevents you from testing deep linking from your Instagram ads**. Do not waste time trying to get this to work. We've confirmed with Facebook representatives that this is broken.

##### Liked live ads do not deep link

If you see that someone liked your ad, do not bother trying to click and test it. Clicking your own ad that shows up in notifications **will not deep link**.

## Conflicts with Facebook SDK (iOS)

If your app integrates the FBSDK, be certain you are *not* using the [`FBSDKAppLinkUtility` method](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/). This has been known to cause conflicts with Branch when handling incoming deep links.

## Issues reading Facebook App Links

If Facebook is having trouble reading the App Links from the Branch link, you might see messages like these while trying to test out the flow. This means that there is something corrupted in the OG tags causing Facebook to not parse your link.

{% image src='/img/pages/features/facebook-ads/invalid-app-links-error.png' half center alt='Invalid app links' %}
{% image src='/img/pages/features/facebook-ads/missing_applinks.png' quarter center alt='troubleshooting' %}

### Rescrape the OG tags

You can test the OG tags using the [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) provided by Facebook:

1. Paste the Branch Link into the Input URL box.
1. Click on the Show existing scrape information button.
1. Examine errors regarding App Links from the output window.
1. Click on the Fetch New Scrape Information button. This last step typically resolves this problem if you are certain that your Branch Link Settings are correct.

{% protip %}
You can further automate the rescraping process by using this command after you create a new link and before you use it for any ads:

{% highlight sh %}
curl --insecure "https://graph.facebook.com/?id=[YOUR-URL-TO-SCRAPE]&scrape=true"
{% endhighlight %}
{% endprotip %}

### If the OG tag tester continues to report problems

1. Examine your [Link Settings](https://dashboard.branch.io/#/settings/link) and ensure that for all platforms (for which an app is available), that a URI scheme and a link to the app in the Play/App Store is configured. If you are using a Custom URL for your iOS Redirect, then you need to append `?id[10-digit App Store ID]` to the URL. This is necessary in order to fully generate the App Links and OG tags that the Facebook scraper expects to find.
    - For example, if your App Store URL is `https://itunes.apple.com/us/app/my-app-name/id1234567890`, then your Custom URL value should be `https://example.com?id1234567890`
1. If errors from the output window pertain to OG tags i.e. missing title, description etc. then examine link OG tags by appending `?debug=true` as described on the [Integration Testing page]({{base.url}}/getting-started/integration-testing/guide/#debugging-an-individual-link).
1. If you haven't set OG tags on a per link level, then please check your Dashboard's global Social Media Display Customization settings from the [Link Settings](https://dashboard.branch.io/#/settings/link) page.

### Use a direct deep link

As a last resort, you can manually input a direct deep link. To retrieve this:

1. Go to Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)
1. Input the Branch link you want to use for your ad
1. Click **Fetch new scrape information**
1. Find the `al:ios:url` line (it should look like `<meta property="al:ios:url" content="myapp://open?link_click_id=link-242052337263342024" />`)
1. Copy the value of this (`myapp://open?link_click_id=link-242052337263342024`) and input it as the Deep Link value of your ad

If none of these approaches work, please reach out to integrations@branch.io immediately.

## Known issue with App Restrictions

We recently discovered a bug within the Facebook system that prevents App Links from being read by the robot if you change any of these values from the defaults in your Advanced Facebook App Settings tab. Please make sure

- Contains Alcohol is set to **No**
- Age Restriction is set to **Anyone (13+)**
- Social Discovery is set to **Yes**
- Country Restricted is set to **No**

It has to look like this **exactly**:
{% image src='/img/pages/features/facebook-ads/app_restrictions.png' 2-thirds center alt='app restrictions troubleshooting' %}


## Common issues with Facebook Authentication

If you are having trouble authenticating with Facebook, please check the following:

##### Be sure you have the correct App ID and App Secret

Be sure you have the correct App ID and App Secret. This is the number one source of issues.

##### App Secret embedded?

If you have entered the correct App ID and Secret but are still getting issues, it may be related to how you are using your Secret. Visit the Settings > Advanced page on Facebook and check that you don't have the toggle enabled for "Is your App Secret embedded?" You will only have this option if you have enabled "Native or desktop app?" on this page.

So if you have enabled "Native or desktop app", then your advanced options should appear like the following:

{% image src='/img/pages/features/facebook-ads/facebook_secret.png' 2-thirds center alt='Client Secret' %}

## Debugging Common Discrepancies Between Branch and Facebook Counts

While we should always expect around a 5% discrepancy due to time zone differents and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

### Not Collecting Advertising ID

If you see absolutely 0 data coming through from your integration, it's possible that you're not collecting Google Advertising ID (GAID) on Android or IDFA on iOS.

- iOS: Add the AdSupport.framework and read this extra info about [submitting](https://dev.branch.io/getting-started/sdk-integration-guide/guide/ios/#submitting-to-the-app-store) to the store.
- Android: Add Google Play Services so that we can collect GAID. See [here](https://dev.branch.io/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id).

### Intercepting Deep Links Before Branch

We recently discovered a discrepancy where and app was calling Facebook's SDK to fetch the deferred app link within their iOS and Android app. Branch calls uses this same mechanism via a direct API integration, but if Facebook's SDK retrieves it before we do, Branch will not see any deep link data. Please ensure to comment out any calls to the following API within your app:

- [Android: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/android/current/class/AppLinkData/)
- [iOS: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/)

### Installs Counted as Opens on Branch

One discrepancy root cause we've seen before is the scenario where Branch will classify an install as an 'open'. We remember the history of a particular user via their IDFA (in addition to using a few other methods) and will detect whether the user is actually a new user or a returning user who had previously unistalled your app. Facebook doesn't do this.

We've seen Facebook classify 're-installs' as fresh installs, where Branch will correctly classify them as 're-opens'. If you're comparing the raw install numbers on Branch, and ignoring the 're-opens', it's possibe you'll see a discrepancy. To check sum up the 'installs' and 'reopens' for the given link and compare it to Facebook's total installs.

{% image src='/img/pages/features/facebook-ads/installs_plus_opens.png' 2-thirds center alt='installs and opens' %}

If it's close, you know that this is the root cause.

{% endif %}
