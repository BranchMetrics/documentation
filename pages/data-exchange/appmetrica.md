---
type: recipe
directory: data-exchange
title: "AppMetrica"
page_title: Sync Branch data with AppMetrica
description: Learn how to synchronize your Branch data with AppMetrica to segment users from Branch installs and get powerful insights.
ios_keywords: Contextual Deep Linking, Deep links, AppMetrica, Yandex, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, AppMetrica, Yandex, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
alias: [ /third-party-integrations/appmetrica/, /third-party-integrations/appmetrica/overview/, /third-party-integrations/appmetrica/guide/, /third-party-integrations/appmetrica/advanced/ ] 
redirect: https://docs.branch.io/pages/integrations/appmetrica/
---

{% if page.overview %}

With a push of a button you can send your Branch data to your AppMetrica dashboard, helping you segment users and understand the power of Branch links in acquiring users.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## What events does Branch send to AppMetrica?

Branch will send all **Branch link clicks** to AppMetrica. Branch also sends all the data that is attached to the link. AppMetrica then matches all downstream actions (installs, opens, custom events, payouts) back to the referring link. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to AppMetrica [here](/third-party-integrations/appmetrica/advanced/#what-branch-sends-to-appmetrica).

## What does it look like?

See your Branch organic acquisition campaigns alongside your AppMetrica data.

{% image src="/img/pages/third-party-integrations/appmetrica/appmetrica-dashboard-example.png" 3-quarters center %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be an AppMetrica customer and have the [AppMetrica SDK](https://tech.yandex.com/metrica-mobile-sdk/doc/mobile-sdk-dg/concepts/mobilesdk-about-docpage/) installed in your app.

{% endprerequisite %}

## Get credentials from your AppMetrica dashboard

To set up the integration you will need to create new trackers in the AppMetrica dashboard for Branch (separate tracker for iOS and Android). After creating the trackers you will need the **tracking URL** for the integration.

1. To create a tracker navigate to the **Trackers** tab and press the **Create Tracker** button. {% image src="/img/pages/third-party-integrations/appmetrica/appmetrica-create-tracker.png" 3-quarters center %}

1. Select "Branch" in **Partner** dropdown
1. Select a **Destination URL**. If there are no active destination URL's created for this app press the **New destination URL** button and fill in a link to your website or app {% image src="/img/pages/third-party-integrations/appmetrica/appmetrica-destination-url.png" 3-quarters center %}
1. Copy the **Tracking URL** {% image src="/img/pages/third-party-integrations/appmetrica/appmetrica-tracking-url.png" 3-quarters center %}

## Enable the AppMetrica card in your Branch dashboard

1. On the Branch Dashboard (https://dashboard.branch.io) navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate AppMetrica and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your **Tracking URL**.
1. Hit **Save**.

{% image src="/img/pages/third-party-integrations/appmetrica/enable-appmetrica-integration.png" half center alt='Enable Integration' %}

{% elsif page.advanced %}

## What Branch sends to AppMetrica

Branch will send any parameters that you append to a link on to AppMetrica. By default, if you don't append any additional parameters to your link, Branch will pass Branch Analytics tags on to AppMetrica with the below mapping.

Branch Analytics Tag | AppMetrica Data Placeholder Tag
--- | ---
Campaign | my_campaign
Channel | my_placement
Feature | my_keyword
Branch Click ID | tracking_id

## Advanced AppMetrica Tracker Settings

If you are interested in controlling advanced attribution policies, check out AppMetrica's [documentation](https://tech.yandex.com/metrica-mobile-sdk/doc/mobile-tracking/concepts/add-tracker-docpage/) on this topic.

{% endif %}
