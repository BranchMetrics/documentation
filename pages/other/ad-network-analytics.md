---
type: recipe
directory: other
exclude_from_google_search: true
title: "Ad Network Analytics"
page_title: Use Branch together with an external analytics tool
description: Learn what needs to be done in order to put a Branch deep link in between a third party ad network and a third party measurement service.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Ad Measurement, third party ad measurement, ad network
hide_platform_selector: true
sections:
- overview
- guide
alias: [ /third-party-integrations/ad-network-analytics/, /third-party-integrations/ad-network-analytics/guide/, /third-party-integrations/ad-network-analytics/overview/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
You can insert a Branch link **between** a third-party ad network and an analytics tool like [Adjust](https://www.adjust.com).

_Ad network ⇨ **Branch** ⇨ analytics tool (Adjust, etc.)_

This is useful when you want to make use of the attribution and analytics offered by another tool, while still benefiting from tracking and deep linking by Branch.

1. Users who click on an ad and **do not** have your app installed will be sent through Branch to your analytics tool, which should be configured to send them to download your app. After downloading, you will still be able to access your Branch link data as usual.
1. You may choose whether Branch sends users who **already have your app** to your analytics tool, or simply routes them directly to your app.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- For this feature to work as expected, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Create a Quick Link on the Branch dashboard

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Marketing Title** for later reference. For example: "Ad for blue sneakers" {% image src='/img/pages/third-party-integrations/ad-network-analytics/ad_example_create.png' 3-quarters center alt='Create Quick Link' %}
1. **Channel** and **Campaign** are optional but recommended. **Tags** is free form.

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Send redirected link traffic to analytics tool

You need to point the iOS and Android Custom Redirects of your Branch link to your analytics tool. Your previous links probably looked something like this:

| Platform | URL
| --- | ---
| **iOS** | https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}
| **Android** | https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}

Take the base URL (everything before the `?`) and set the Custom Redirects of your Branch link as follows. This tells Branch where to send users for the specific OS. Any additional query parameters (everything after `?`) will be carried through Branch automatically.

| Platform | URL
| --- | ---
| **Android URL** | https://app.adjust.io/abc123
| **iOS URL** | https://app.adjust.io/abc123

{% image src='/img/pages/third-party-integrations/ad-network-analytics/custom_redirect_configuration.png' 2-thirds center alt='Custom redirect configuration' %}

{% protip %}
Note that by default these redirects only come into play if the user does **not** have the app installed. If you want **all** users (including those with the app already installed) to pass through to your analytics tool, set the [`$web_only` control parameter]({{base-url}}/getting-started/configuring-links/guide/#web-only-links) of your link to `false`.
{% endprotip %}

## Provide Branch link to advertiser

Now you simply deliver your Branch link to the advertising network. You probably are used to a templated link something like this:

`https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}`

Instead, just replace the base URL (everything before the `?`), with your Branch link:

`https://[branchsubdomain]/l/125AdD-F?campaign={campaign_id}&adgroup={creative_id}`

{% ingredient branchsubdomain %}{% endingredient %}

**This is the link to provide to your ad partner.**

{% endif %}