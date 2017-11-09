---
type: recipe
directory: data-exchange
title: "Adjust"
page_title: Sync Branch data with Adjust
description: Learn how to synchronize your Branch data with Adjust to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Adjust, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
alias: [ /third-party-integrations/adjust/, /third-party-integrations/adjust/overview/, /third-party-integrations/adjust/guide/, /third-party-integrations/adjust/advanced/ ] 
redirect: https://docs.branch.io/pages/integrations/adjust/
---

{% if page.overview %}

Send data to Adjust to maximize your understanding of your mobile acquisition efforts, while deep linking your users through Branch.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## What events does Branch send to Adjust?

The integration automatically sends **Branch link clicks** to Adjust, specifically we send:

* All Android clicks
* iOS Universal Link clicks

This means that for iOS install campaigns (which doesn't use Universal Links), you must use Adjust as your fallback URL.

## What data can I expect to see in Adjust?

Once you enable an integration with Adjust, we'll automatically send all eligible clicks to Adjust's servers. From there, you'll see how many users came from Branch, along with installs, opens and downstream events attributed back to the Branch link. This will give you automatic segmentation and cohorting for users acquired via Branch links.

We'll pass along all of the Branch link's analytics data, which will map to labels inside Adjust. Check the "Advanced" section to see all of the labels.

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need an account with Adjust and have the Adjust SDK (
	[iOS](https://github.com/adjust/ios_sdk),
	[Android](https://github.com/adjust/android_sdk)) installed in your app.

{% endprerequisite %}

## Get credentials from your Adjust account

To set up the integration, you will need to navigate to your Adjust dashboard, and create a new tracking link for your mobile app. Start by selecting 'Settings' of your mobile app.

{% image src="/img/pages/third-party-integrations/adjust/adjust-tracker-setting.png" 3-quarters center %}

From there, you will need to create a new tracker, which is found under Data Management > Trackers > Click Trackers, and "Create a new tracker" below. Be sure to call it "Branch." Once created, grab the 6 digit value after the `app.adjust.com` portion. This is your tracker.

{% image src="/img/pages/third-party-integrations/adjust/adjust-tracker.png" 3-quarters center %}

## Enable the Adjust card in your Branch dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Adjust and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your tracker for iOS and Android.
1. Hit **Save**.

{% image src="/img/pages/third-party-integrations/adjust/enable-adjust-integration.png" half center alt='Enable Integration' %}

## Add Adjust tracking link to your Branch Settings

If you'd like to track iOS installs from Branch links in Adjust, you'll need to create an Adjust tracking link and put in your Branch settings page.

You need to point the iOS Custom Redirect to Adjust. Take the tracker you just created in Adjust and set the Custom Redirects of your [Branch Settings](https://dashboard.branch.io/settings/link) as follows. This means that Branch will fall back to the App Store via Adjust when your user doesn't have the app and isn't going to mobile web. Remember to click the "Save" button at the bottom of the Link Settings page.

| Platform | URL
| --- | ---
| **iOS** | https://app.adjust.io/abcdef

{% image src='/img/pages/third-party-integrations/adjust/adjust-redirect-settings.png' 2-thirds center alt='Custom redirect configuration' %}

{% elsif page.advanced %}

## What Branch sends to Adjust

By default, Branch sends the following parameters to Adjust as part of the integration.

Branch Analytics Tag | Adjust Data Tag
--- | ---
Campaign | campaign
Channel | adgroup
Feature | creative
Branch Click ID | external_click_id

## Advanced network segmentation with Adjust

By default, installs and events via Branch links will be attributed to Branch via your default tracker. If you'd like to use Branch links on your paid ad networks for deep linking, but you'd like more granular network attribution, you can create a new tracker in Adjust then use the tracker id in your Branch link. This will override the default Branch attribution.

1. Name your Adjust tracker something like "TapjoyBranch"
1. Take the 6 letter identifier for your tracker and put it as a key value pair with key `tracker_id` in your deep link data for that specific link.

{% image src="/img/pages/third-party-integrations/adjust/override-adjust.png" half center alt='Overriden Tracker' %}

{% endif %}
