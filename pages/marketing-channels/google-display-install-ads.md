---
type: recipe
directory: marketing-channels
title: "Google Display App Install Ads"
page_title: "Advertising with Deep Links: Google Display Install Ads"
description:
platforms:
- ios
- android
sections:
- overview
- guide
- support
contents:
  number:
  - ios
  - android
alias: [ /features/google-display-install-ads/, /features/google-display-install-ads/overview/, /features/google-display-install-ads/guide/ios/, /features/google-display-install-ads/guide/android/, /features/google-display-install-ads/support/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
If you're running Google AdWords Display Mobile Install Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Display Network | Mobile App Installs | App Only: Install

#### OS Support and Major Differences

Operating System | Supported by AdWords Display Install Ads? | Key Differences | Documentation
--- | --- | --- | ---
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link]({{base.url}}/marketing-channels/google-display-install-ads/guide/ios)
Android | Yes | Uses tracking template, must redirect to Google Play store | [link]({{base.url}}/marketing-channels/google-display-install-ads/guide/android)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

{% if page.ios %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `App Install or Engagement`
{% image src='/img/pages/features/google-dla/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Display Install iOS**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-display-install-ads/iOS/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS redirect is set to the desired app being promoted by the ad campaign.
{% image src='/img/pages/features/google-dla/ad-link-redirect.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
{% image src='/img/pages/features/ads-analytics/adwords-analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Attribution Windows" %}

You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows]({{base.url}}/marketing-channels/ad-network-integrations/advanced/#changing-attribution-windows) for instructions.

{% endprotip %}

## Configure an Ad

To set up a Display Network Mobile App Install Campaign on iOS, you will need to first create your campaign and then setup a tracking template on the ad. Adwords campaign creation documentation is available **[here](https://support.google.com/adwords/answer/6309958?hl=en)**.

#### Create Your Campaign

1. Select `Display Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-display-network.png' third center alt='Adwords Network' %}
1. For the type of Display campaign select `Install your mobile app`
{% image src='/img/pages/features/google-dla/google-display-install-ads/adwords-display-install.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. Grab your app's iTunes App Store URL and fill it into the **Final URL** field of the ad setup.
1. Expand the `Ad URL options` and place your Branch Ad link from the first section in the **Tracking template** box. Ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.) which should be automatically generated on your Branch dashboard.

{% image src="/img/pages/features/google-dla/google-display-install-ads/iOS/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-display-install-ads/iOS/adwords-configuration.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your app store domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% elsif page.android %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `App Install or Engagement`
{% image src='/img/pages/features/google-dla/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Display Install Android**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-display-install-ads/Android/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the Android redirect is set to the desired app being promoted by the ad campaign.
{% image src='/img/pages/features/google-dla/ad-link-redirect.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
{% image src='/img/pages/features/ads-analytics/adwords-analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Attribution Windows" %}

You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows]({{base.url}}/marketing-channels/ad-network-integrations/advanced/#changing-attribution-windows) for instructions.

{% endprotip %}

## Configure an Ad

To set up a Display Network Mobile App Install Campaign on Android, you will need to first create your campaign and then setup a tracking template on the ad. Adwords campaign creation documentation is available **[here](https://support.google.com/adwords/answer/6309958?hl=en)**.

#### Create Your Campaign

1. Select `Display Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-display-network.png' third center alt='Adwords Network' %}
1. For the type of Display campaign select `Mobile app installs`
{% image src='/img/pages/features/google-dla/google-display-install-ads/adwords-display-install.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. Grab your app's Google Play Store URL and fill it into the **Final URL** field of your ad setup
1. Expand the `Ad URL options`. and place your Branch Ad link from the first section in the **Tracking template** box. Ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.) which should be automatically generated on your Branch dashboard.

{% image src="/img/pages/features/google-dla/google-display-install-ads/Android/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-display-install-ads/Android/adwords-configuration.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your app store domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% endif %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient adwords-valuetrack-info %}{% endingredient %}

## FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For App Install/Engagement Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% endif %}
