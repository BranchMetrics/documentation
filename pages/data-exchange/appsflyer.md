---
type: recipe
directory: data-exchange
title: "AppsFlyer"
page_title: Sync Branch data with AppsFlyer
description: Learn how to synchronize your Branch data with AppsFlyer, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, AppsFlyer, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, AppsFlyer, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- support
alias: [ /third-party-integrations/appsflyer/, /third-party-integrations/appsflyer/overview/, /third-party-integrations/appsflyer/guide/, /third-party-integrations/appsflyer/advanced/, /third-party-integrations/appsflyer/support/ ] 
redirect: https://docs.branch.io/pages/integrations/appsflyer/
---

{% if page.overview %}
	
With a push of a button you can send your Branch install data and attributions to your AppsFlyer dashboard, helping you understand the power of Branch as an acquisition pathway.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your AppsFlyer Information will result in Branch automatically forwarding attribution information for your acquisitions. As a result, you can segment and analyze your Branch-led users in your AppsFlyer dashboard.

## What events does Branch send?

Branch will send all Branch mobile link clicks to AppsFlyer. This includes sending analytics information you've added to your Branch links, such as campaign and channel. 

## What does it look like?

Branch events will appear on the AppsFlyer dashboard, in the overview page. Scroll to the `Aggregated Performance Report` section, and you'll notice Branch led attributions fall under the name `branch_int`.

{% image src="/img/pages/third-party-integrations/appsflyer/appsflyer.png" 3-quarters center %}

You can click into `branch_int` in the above screenshot and then see the breakdown of clicks and installs by campaign specified.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be a AppsFlyer customer and have the AppsFlyer SDK.

{% endprerequisite %}

## Retrieve your AppsFlyer Information

In your AppsFlyer dashboard, grab your app identifier information. 

For iOS, this will be the ID of your iOS AP, without the `id` portion. If you have `id123`, simply put `123` into the Branch data integration card.

For Android, this will be your package name registered on AppsFlyer. If your package is registered as `io.branch.test`, then simply put `io.branch.test` in the Android section of the AppsFlyer Data Integration card.

## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate AppsFlyer and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your AppsFlyer information and hit **Save**.

{% elsif page.advanced %}

## What Branch Sends to AppsFlyer

Branch Analytics Tag | AppsFlyer Data Placeholder Tag
--- | ---
Campaign | Maps to _AppsFlyer Campaign_, `c`
Channel | Maps to _AppsFlyer Channel_, `af_channel`

The default Media Source will appear as "branch_int" (mandated by AppsFlyer and cannot be changed).

You can also append additional [AppsFlyer Parameters in this format](https://support.appsflyer.com/hc/en-us/articles/207447163-AppsFlyer-Tracking-Link-Structure-and-Parameters) in link data or as query parameters.

For example, if you wanted to add Ad and Ad Set values to your link, you can do the following:
`https://mycompany.app.link/123245?af_ad=MyAd&af_adset=MyAdSet`

{% elsif page.support %}

## Troubleshooting

There are common strategies to take while troubleshooting.

### Data isn't appearing after simulating an event

It's likely that the device being tested on is already attributed. The proper steps to perform an attribution are as follows:

1. Disable setDebug through the Branch SDK
2. Uninstall app from device.
3. Reset iOS IDFA, or Google Advertising ID
4. Click Branch link
5. Deploy app from XCode or Android Studio
6. Confirm a fresh install occurred on Branch / AppsFlyer. 

### Installs not being attributed to Branch
For AppsFlyer to attribute installs properly to Branch, fingerprinting must be enabled for your app in your AppsFlyer settings. If you see Branch clicks but not installs appearing, this may be the issue. Ask your AppsFlyer Account Manager to enable fingerprinting for your app.

{% endif %}
