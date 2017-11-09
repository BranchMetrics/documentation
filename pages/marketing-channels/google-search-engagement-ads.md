---
type: recipe
directory: marketing-channels
title: "Google Search App Engagement Ads"
page_title: "Advertising with Deep Links: Google Search Install Ads"
description:
platforms:
- android
sections:
- overview
- guide
- support
contents:
  number:
  - android
alias: [ /features/google-search-engagement-ads/, /features/google-search-engagement-ads/overview/, /features/google-search-engagement-ads/guide/android/, /features/google-search-engagement-ads/support/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
If you're running Google AdWords Search Mobile Engagement Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Mobile App Engagement | App Only: Engagement

#### OS Support and Major Differences

Operating System | Supported by AdWords Search Engagement Ads? | Key differences | Documentation
--- | --- | --- | ---
iOS | No | The Search Mobile Engagement Campaign type currently does not support iOS | N/A
Android | Yes | Uses Final URL with ValueTrack Parameters, no tracking template |  [link]({{base.url}}/marketing-channels/google-search-engagement-ads/guide/android)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ensure you have entered your Android application's URI scheme under `Link Settings > Android URI Scheme` in your Branch dashboard.
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `App Install or Engagement`
{% image src='/img/pages/features/google-dla/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search App Engagement Android**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-search-engagement-ads/Android/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
{% image src='/img/pages/features/ads-analytics/adwords-analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Attribution Windows" %}

You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows]({{base.url}}/marketing-channels/ad-network-integrations/advanced/#changing-attribution-windows) for instructions.

{% endprotip %}

## Configure an Ad

To set up a Search Network Mobile App Engagement Campaign on Android, you will need to first create your campaign and then setup a tracking template on the ad. Adwords campaign creation documentation is available **[here](https://support.google.com/adwords/answer/6310671?hl=en)**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-search-network.png' third center alt='Adwords Network' %}
1. For the type of Search campaign select `Mobile app engagement`
{% image src='/img/pages/features/google-dla/google-search-engagement-ads/adwords-search-engagement.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. Copy the Branch Ad link from the first section and ensure that it is in the format _App URI://open?link_click_id=link-..._. Refer to the [Create A Branch Ad Link]({{base.url}}/marketing-channels/google-search-engagement-ads/guide/android/#create-a-branch-ad-link) section if the link is not in this format to ensure the link creation was setup properly.
{% image src="/img/pages/features/google-dla/google-search-engagement-ads/Android/full-branch-link.png" half center alt='Example Link' %}
1. In the Ad creator, locate the **Scheme** field and enter the scheme portion of the Branch Ad link. This should be the portion of the link before the **://** symbol.
1. Now locate the **Host and path** field and enter the rest of your Branch Ad link following the **://** symbol.
{% image src="/img/pages/features/google-dla/google-search-engagement-ads/Android/adwords-configuration.png" 3-quarters center alt='Example Ad' %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For App Install/Engagement Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

**Q: Can I run a Adwords Search Network Mobile Engagement Campaign for iOS?**

**A:** As of June 2017, Google Adwords currently does not support this campaign type. We'll update our documentation if the campaign type gets supported in the future!

**Q: How can I test the Branch Ad link?**

**A:** On the Adwords Ad creator page or the when editing your ad, locate and click the `Test this app URI` button. With an Android phone that has your mobile app installed, use a QR code reader application to read the generated QR code to simulate a click on your Ad. Now you can verify that your Branch Ad link works and deep linked data is passed through to the app.

{% image src="/img/pages/features/google-dla/google-search-engagement-ads/Android/debug-uri.png" half center alt='Debug Link' %}

{% endif %}
