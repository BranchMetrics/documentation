---
type: recipe
directory: data-exchange
title: "Adobe Analytics"
page_title: Sync Branch data with Adobe Analytics
description: Learn how to synchronize your Branch data with Adobe Analytics, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Adobe Analytics, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Adobe Analytics, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- support
alias: [ /third-party-integrations/adobe-analytics/, /third-party-integrations/adobe-analytics/overview/, /third-party-integrations/adobe-analytics/guide/, /third-party-integrations/adobe-analytics/advanced/, /third-party-integrations/adobe-analytics/support/ ] 
redirect: https://docs.branch.io/pages/integrations/adobe-analytics/
---

{% if page.overview %}
	
With a push of a button you can send your Branch data to your Adobe Analytics dashboard, helping you understand the power of Branch as an acquisition pathway.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Adobe Analytics Information will result in Branch automatically forwarding referred events to Adobe Analytics.

## What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the analytics tags that are attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

## What does it look like?

Branch events will appear on the Adobe Analytics dashboard through `Reports > Custom Conversion > Branch eVar`. Note, this will automatically appear once the Branch Data Connector is enabled through the Adobe Analytics dashboard.

You'll have the flexibility to analyze data as needed in the Adobe Analytics platform, as the data Branch sends maps in Adobe Analytics to a top level eVar. This eVar contains campaign, channel, target, event name, and action property, which are your analytics tags.

{% image src="/img/pages/third-party-integrations/adobe-analytics/adobe-analytics-conversion.png" 3-quarters center %}

Branch events are similar to Adobe Analytics events in that they can be used to build custom reports and are tracked on the various pages and dashboards. However, unlike normal events, Branch events contain valuable information about how users ended up in your app in the first place.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be a Adobe Analytics customer and have the Adobe Analytics SDK.

{% endprerequisite %}

## Activate the Branch Data Connector

In your Adobe Analytics dashboard, under the *Admin* tab, find *Data Connectors*.

{% image src="/img/pages/third-party-integrations/adobe-analytics/select-data-connectors.png" 3-quarters center %}

Click *+Add New*, search for "Branch," and click *Activate*.

{% image src="/img/pages/third-party-integrations/adobe-analytics/activate-connector.png" half center %}

## Configure the Branch Data Connector

#### Integration Settings

These are automatically configured when you activate the Data Connector.

#### Variable Mappings

Map your Branch events to your chosen eVar. In the example below, it will be mapped to `Custom eVar 1`, renamed to the SiteCatalyst metric `Branch`.

{% image src="/img/pages/third-party-integrations/adobe-analytics/variable-mappings.png" 3-quarters center %}

#### Data Settings

Branch has provided a default classification rule set for the Branch data that will be ingested. This maps Branch analytics data to Adobe classifications as follows. You can change this classification rule set if you would like to, but editing is not required. We also include Branch tags so you can create a new rule that further segments your analytics data for advanced visibility. 

Adobe Classification | Branch Analytics Tag | Example
--- | ---
Source | Channel | Our Website 
Campaign | Campaign | Journeys Test Campaign
Medium | Feature | Journeys
Action | Branch Event Name | Install
Action Property| Branch Tags | tag=bar&tag2=1234

{% image src="/img/pages/third-party-integrations/adobe-analytics/data-settings.png" 3-quarters center %}

#### Review Summary

Finally, review the integration, scroll to the bottom of the screen and click *Activate Now* to enable the integration. 

{% image src="/img/pages/third-party-integrations/adobe-analytics/final-activation.png" half center %}

## Retrieve your Adobe Analytics Information

In your Adobe Analytics dashboard, navigate to the Mobile Marketing UI and find your app.

Under Manage App Setting -> SDK Analytics Options, find the following data

Branch field | Adobe field value
--- | ---
Protocol | Use HTTPS Check Box (if checked, select HTTPS)
Analytics Server Domain | Tracking Server
Omniture iOS/Android Server Key | Report Suite ID for that app
Timestamp | Offline Tracking

For `Analytics Server Domain`, please do not include `http` or `https`. If your value for this is `http://test.com`, simply put in `test.com`. This means no extra slashes, and no protocol.

## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Adobe Analytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Adobe Analytics information and hit **Save**.

## Pass Adobe Visitor ID

When you're ready to send data through Branch, you'll need to make sure you pass through the configured Adobe Visitor ID through the Branch SDKs. In order to do so, figure out which ID you use for user tracking in the Adobe SDK, and pass this value through `setRequestMetadataKey` on the Branch SDKs.

There are three possible identities you can track via this integration. Please verify which ID you use, and send that. For example, if your Adobe integration uses Marketing Cloud Visitor ID, retrieve it from the Adobe SDK, and pass in a key value pair, with the key being *$marketing_cloud_visitor_id*. The value would be the value retrieved through the Adobe SDK.

1. Marketing Cloud Visitor ID - *$marketing_cloud_visitor_id*
2. Analytics Visitor ID - *$adobe_visitor_id*
3. Analytics Custom Visitor ID - *$analytics_visitor_id*

Here's a sample snippet showing this. **NOTE** you must set the correct key before calling *initSession*. You must also initialize the Adobe SDK before setting the request metadata in the Branch SDK.

**iOS**

Inside *didFinishLaunchingWithOptions*

{% highlight objc %}

Branch *branch = [Branch getInstance];
[[Branch getInstance] setRequestMetadataKey:@"$adobe_visitor_id" value:[ADBMobile trackingIdentifier]];

{% endhighlight %}

**Swift**

Inside *didFinishLaunchingWithOptions*

{% highlight swift %}

if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$adobe_visitor_id", value:ADBMobile.trackingIdentifier() as NSObject!);
}

{% endhighlight %}

**Android**

Before you initialize in your Application#onCreate or Deep Link Activity's #onCreate.

{% highlight java %}

Branch branch = Branch.getInstance();
branch.setRequestMetadata("$adobe_visitor_id", Analytics.getTrackingIdentifier());

...

Branch.initSession(...);

{% endhighlight %}

{% elsif page.advanced %}

## What Branch Sends to Adobe Analytics

Branch sends the following values from Branch link data:

Adobe Classification | Branch Analytics Tag | Example
--- | ---
Source | Channel | Our Website 
Campaign | Campaign | Journeys Test Campaign
Medium | Feature | Journeys
Action | Branch Event Name | Install
Action Property| Branch Tags | tag=bar&tag2=1234

If you create a Quick Link and specify analytics, those analytics will appear in the Adobe Analytics reporting suite.

{% elsif page.support %}

## Troubleshooting

There are common strategies to take while trouble shooting.

### Data isn't appearing after simulating an event

With Adobe Analytics' dashboard, it may take up to ~2 hours for data to appear. We'd recommend you simulate 10-15 events in one testing session, and validate that they show up two hours later, so that feedback is transparent and obvious.

Another thing to do is make sure a valid adobe_visitor_id is being passed up through the Branch SDK. Call *setDebug* and inspect the requests to `v1/open`. The key you want to find in this request payload is `$adobe_visitor_id`. 

{% endif %}

