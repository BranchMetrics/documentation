---
type: recipe
directory: data-exchange
title: "Google Analytics"
page_title: Send Deep Link Data to Google Analytics
description: This guide teaches you how to find and send deep link data to Google Analytics through your Branch Metrics implementation.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Google Analytics, iOS, Webhook
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Google Analytics, Android, Webhook
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- support
alias: [ /third-party-integrations/google-analytics/, /third-party-integrations/google-analytics/overview/, /third-party-integrations/google-analytics/guide/, /third-party-integrations/google-analytics/advanced/, /third-party-integrations/google-analytics/support/ ] 
redirect: https://docs.branch.io/pages/integrations/google-analytics/
---

{% if page.overview %}

With a push of a button you can send your Branch data to your Google Analytics dashboard, helping you understand the power of Branch as an acquisition pathway. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Google Analytics Tracking Id will result in Branch automatically forwarding referred events to Google Analytics, in the exact format Google Analytics expects. This includes automatically setting various UTM tags that can be used to determine the source of new users.

## What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends over analytics data that is attached to the link, whether it's UTM tags or fields set on the Branch Dashboard (e.g. Campaign, Channel, Feature). This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Google Analytics [here](/third-party-integrations/google-analytics/advanced/#what-branch-sends-to-google-analytics).

## What does it look like?

Branch events will appear alongside your other tracked events in Google Analytics. Here is an example of the Sources screen with test information set.

{% image src="/img/pages/third-party-integrations/google-analytics/google-analytics-sources.png" 3-quarters center %}

To view referred **installs** and **opens**, as well as any custom events you track with Branch as they are occur, navigate to Real-Time > Events. The event category for all referred Branch events is **BranchEvent**.

{% image src="/img/pages/third-party-integrations/google-analytics/google-analytics-open.png" 3-quarters center %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and the Google Analytics SDK into your app.

{% endprerequisite %}

## Enter your Google Analytics Tracking ID

For the basic, codeless integration: find your Google Analytics Tracking ID (tid) and enter it into the Branch Dashboard.

1. To locate your Google Analytics Tracking ID, navigate to https://analytics.google.com and log in.
1. Click on **Home** in the navigation bar at the top of the page. You should see your app(s), with accompanying Tracking ID.
1. Copy the Tracking ID of whichever app you’re going to use with Branch. This is also known as the Property ID, and it is of the form UA-XXXXXX-YY (e.g. UA-000000-01). Here’s an example: {% image src="/img/pages/third-party-integrations/google-analytics/tid.png" half center alt='Example Ad' %}


## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Google Analytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Google Analytics Tracking ID and hit **Save**

{% image src="/img/pages/third-party-integrations/google-analytics/enable-google-analytics-integration.png" half center alt='Enable Integration' %}

{% caution title="Please test your integration!" %}
Branch is not responsible for inaccurate API keys.
{% endcaution %}


## Set up Google Analytics to use standard hardware or advertising identifiers (recommended)

Please ensure you're using the Branch iOS SDK 0.12.2 or greater, and Android SDK v1.12.1 or greater. If you implemented Branch after May 28th 2016, you are likely already on this version or later.

In addition to the basic integration, you should add a tiny amount of code to your app. This will ensure that Google Analytics uses the correct device-specific identifier for client ID (cid) with the logic Branch uses. As a result, the CIDs for SDK and integration should match up and result in unified user data on the GA Dashboard.

**iOS:**

On iOS, please add the following when tracking events, screen views, etc. It will ensure that the GA SDK uses the IDFA when available, and uses the IDFV if not.

Please add the following to your Google Analytics code when the app first starts

{% highlight objc %}
#import <AdSupport/AdSupport.h>

// before tracking screen, event, etc.
Class ASIdentifierManagerClass = NSClassFromString(@"ASIdentifierManager");
if (ASIdentifierManagerClass && [[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]) {
	NSUUID *idfa = [[ASIdentifierManager sharedManager] advertisingIdentifier];
    [tracker set:kGAIClientId value:[idfa UUIDString]];
}
else if (NSClassFromString(@"UIDevice")) {
    [tracker set:kGAIClientId value:[[UIDevice currentDevice].identifierForVendor UUIDString]];
}
{% endhighlight %}

In order for IDFA to be available, please be sure you have included `AdSupport.framework`.

{% protip title="iOS 10 and Ad Tracking Limited" %}
If ad tracking is limited, the IDFA will be set to "00000000-0000-0000-0000-000000000000" [documentation](https://developer.apple.com/reference/adsupport/asidentifiermanager). The alternative approach below allows you to specify a `cid` manually, which avoids this issue.
{% endprotip %}

**Android:**

On Android, please add the following when tracking events, screen views, etc. It will ensure that the GA SDK uses the GAID when available, and uses the Android ID (hardware ID) if not.

{% highlight java %}
// Enable Advertising Features.
mTracker.enableAdvertisingIdCollection(true);
{% endhighlight %}

### Alternative approach to Client ID - pass to Branch directly

If you specify `$google_analytics_client_id`, we can pass that to Google (as *cid*).

**iOS:**

Please add the following before initializing the Branch session:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$google_analytics_client_id" value:@"CLIENT-ID-HERE"];
{% endhighlight %}

**Android:**

Please call the following line right after you initialize Branch in your Application’s #onCreate or Activity’s #onCreate:

{% highlight java %}
Branch.getInstance().setRequestMetadata("$google_analytics_client_id", "CLIENT-ID-HERE");
{% endhighlight %}


{% elsif page.advanced %}

## Optional Parameter - User ID

If you specify `$google_analytics_user_id`, we can pass that to Google (as `uid`).

**iOS:**

You can add the following before initializing the Branch session:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$google_analytics_user_id" value:@"USER-ID-HERE"];
{% endhighlight %}

**Android:**

You can call the following line right after you initialize Branch in your Application’s #onCreate or Activity’s #onCreate:

{% highlight java %}
Branch.getInstance().setRequestMetadata("$google_analytics_user_id", "USER-ID-HERE");
{% endhighlight %}

## What Branch Sends to Google Analytics

| Property Name | Value | Sourced from | Example | Req
| --- | --- | --- | --- | --- | ---
| v | API version | [fixed] | 1 | Y
| tid | Tracking ID | Branch Dashboard | UA-XXXXXX-Y | Y
| ds | Source (mobile SDK) | [fixed] | app | Y
| an | Application Name | [fixed] | BRANCH-APP | Y
| t | Type | [fixed] | event | Y
| ec | Event Category | [fixed] | BranchEvent | Y
| cid | Client ID | (discussed above, includes $google_analytics_client_id) | AEBE52E7-03EE-455A-B3C4-E57283966239 | Y
| uid | User Id | $google_analytics_user_id | User A | N
| cn | Campaign Name | utm_campaign -or- Branch campaign  | "Beaches and breezes" | N
| cs | Campaign Source | utm_source -or- Branch channel | "Twitter" | N
| cm | Campaign Medium | utm_medium -or- Branch feature  | "480banner" | N
| ck | Campaign Keywords | utm_term -or- Branch $keywords | ["Keyword1", "keyword3"] | N
| cc | Campaign Content | utm_content -or- Branch tags | "Some content" | N
| ea | Event Action (Name) | event name | install | Y
| uip | User’s IP Address | collected by Branch SDK | 111.111.111.111 | N
| z | Cache buster | [unix time + random number] | 1461878903666 | N

{% protip title=""anonymous" Client ID" %}
If for some reason Branch does not receive an advertising identifier or hardware identifier, and you do not explicitly specify a `$google_analytics_client_id`, then Branch will send `anonymous` as the Client ID (`cid`). This is a required field by Google Analytics.
{% endprotip %}

{% elsif page.support %}

## Troubleshooting

### Very short or nonexistent session lengths

Google Analytics will automatically start a session when Branch sends over installs and opens. Because of this, you should remove any code that creates a new session when your application starts up. For example, on iOS, you may be firing an event with the following:

{% highlight objc %}
[builder set:@"start" forKey:kGAISessionControl];
{% endhighlight %}

You should remove this so that your app does not start a new session. Otherwise you may see zero second sessions and your average session length drop.

### Data not appearing in Google Analytics

1. Check your property ID in the Branch dashboard matches the property ID in Google Analytics
1. Ensure you are looking at the right part of the Google Analytics dashboard. The data should appear in `Acquisition > Sources > All`
1. Check that your Google Analytics Views don't have any filters on them. For example, if your View filters out users in the United Kingdom, and your Branch opens are from users in the United Kingdom, you won't see this Branch data in your View.

{% endif %}
