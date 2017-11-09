---
type: recipe
directory: marketing-channels
title: "Google Search App Install Ads"
page_title: "Advertising with Deep Links: Google Search Install Ads"
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
alias: [ /features/google-search-install-ads/, /features/google-search-install-ads/overview/, /features/google-search-install-ads/guide/ios/, /features/google-search-install-ads/guide/android/, /features/google-search-install-ads/support/ios/, /features/google-search-install-ads/support/android/  ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
If you're running Google AdWords Search Mobile Install Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Mobile App Installs | App Only: Install

#### OS Support and Major Differences

Operating System | Supported by AdWords Search Install Ads? | Key Differences | Documentation
--- | --- | --- | ---
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link]({{base.url}}/marketing-channels/google-search-install-ads/guide/ios)
Android | Yes | Uses Final URL with ValueTrack Parameters, no tracking template | [link]({{base.url}}/marketing-channels/google-search-install-ads/guide/android)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

{% if page.android %}
{% caution title="Android SDK v2.10.0" %}

Ensure the application being promoted by the Ad campaign has the SDK version of **v2.10.0** or later. Starting at this version, accurate measurement of the Google Play link referrer is used which is required to support this Adwords campaign type.

{% endcaution %}
{% endif %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

{% if page.ios %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `App Install or Engagement`
{% image src='/img/pages/features/google-dla/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search Install iOS**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-search-install-ads/iOS/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
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

To set up a Search Network Mobile App Install Campaign on iOS, you will need to first create your campaign and then setup a tracking template on the ad. Adwords campaign creation documentation is available **[here](https://support.google.com/adwords/answer/6309969?hl=en)**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-search-network.png' third center alt='Adwords Network' %}
1. For the type of Search campaign select `Mobile app installs`
{% image src='/img/pages/features/google-dla/google-search-install-ads/adwords-search-install.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. Grab your app's iTunes App Store URL and fill it into the **Final URL** field of your ad setup
1. Expand the `Ad URL options`. and place your Branch Ad link from the first section in the **Tracking template** field. Ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.) which should be automatically generated on your Branch dashboard.

{% image src="/img/pages/features/google-dla/google-search-install-ads/iOS/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-search-install-ads/iOS/adwords-configuration.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your app store domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% elsif page.android %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s **Create Google Adwords Link** button under the Google Adwords Partner and select 'App Install or Engagement'
{% image src='/img/pages/features/google-dla/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search Install Android**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-search-install-ads/Android/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
{% image src='/img/pages/features/ads-analytics/adwords-analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Attribution Windows" %}

You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows]({{base.url}}/marketing-channels/ad-network-integrations/advanced/#changing-attribution-windows) for instructions.

{% endprotip %}

## Configure an Ad

To set up a Search Network Mobile App Install Campaign on Android, you will need to first create your campaign and then setup a tracking template on the ad. Adwords campaign creation documentation is available **[here](https://support.google.com/adwords/answer/6309969?hl=en)**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-search-network.png' third center alt='Adwords Network' %}
1. For the type of Search campaign select `Mobile app installs`
{% image src='/img/pages/features/google-dla/google-search-install-ads/adwords-search-install.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. Copy the final Branch Ad link generated from the previous section. Note: This link should begin with **https://play.google.com...** instead of the normal Branch link domain. Refer to the [Create A Branch Ad Link]({{base.url}}/marketing-channels/google-search-install-ads/guide/android/#create-a-branch-ad-link) section if the link is not in this format to ensure the link creation was setup properly.
{% image src="/img/pages/features/google-dla/google-search-install-ads/Android/full-branch-link.png" half center alt='Example Link' %}
1. Paste this Ad link into the **Final URL** field

{% image src="/img/pages/features/google-dla/google-search-install-ads/Android/adwords-configuration.png" 3-quarters center alt='Example Ad' %}

{% caution title="Using the Final URL"%}

Google Adwords current implementation of the Search Network Mobile App Install Campaign for Android **fails to support Tracking Templates** despite the option to set them up in the Ad creation process.

Therefore, a unique Play Store link is used in this setup which corresponds to a Branch link. All install capturing and deep linking of content is still possible through this setup.

{% endcaution %}

{% caution title="Limited Click Attribution" %}

As of June 2017, due to the current Adwords Search Network Mobile App Install Campaign implementation, Branch's **Android Click attribution** is only measured when a user installs the mobile application.

{% endcaution %}

{% endif %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient adwords-valuetrack-info %}{% endingredient %}

## FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For App Install/Engagement Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% if page.android %}

**Q: Why am I seeing inaccurate click attribution values for my Search Network Mobile App Install Campaign on Android?**

**A:** Google Adwords current implementation of the Search Network Mobile App Install Campaign for Android **fails to support Tracking Templates** despite the option to set them up in the Ad creation process.

Therefore, a unique Play Store link is used in this setup which corresponds to a Branch link. All install capturing and deep linking of content is still possible through this setup.

{% endif %}

{% endif %}
