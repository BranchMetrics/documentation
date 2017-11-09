---
type: recipe
directory: marketing-channels
title: "Google Display Network Ads"
page_title: "Advertising with Deep Links: Google Display Network Ads"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
contents:
  number:
  - guide
alias: [ /features/google-xplatform-display-ads/, /features/google-xplatform-display-ads/overview/, /features/google-xplatform-display-ads/guide/, /features/google-xplatform-display-ads/support/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
If you're running Google AdWords Display Network ads, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Display Network | Build Awareness: See your ad | Cross-platform Display
Display Network | Influence Consideration: Engage with your content | Cross-platform Display
Display Network | Influence Consideration: Visit your website | Cross-platform Display
Display Network | Drive Action: Buy on your website | Cross-platform Display
Display Network | Drive Action: Take an action on your website | Cross-platform Display

#### OS Support and Major Differences

Operating System | Supported by AdWords Display Network Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to to Final Website | [link]({{base.url}}/marketing-channels/google-xplatform-display-ads/guide)
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link]({{base.url}}/marketing-channels/google-xplatform-display-ads/guide)
Android | Yes | Uses tracking template, must redirect to Google Play store | [link]({{base.url}}/marketing-channels/google-xplatform-display-ads/guide)

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

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Display Link`
{% image src='/img/pages/features/google-dla/create-link-display.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-xplatform-display-ads/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the Web redirect is set to the desired final website promoted by the ad campaign.
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

To set up a Display Network Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Display Network campaigns can be found **[here](https://support.google.com/adwords/answer/6340468?hl=en)**.

#### Create Your Campaign

1. Select `Display Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-display-network.png' third center alt='Adwords Network' %}
1. Select the desired type of Display Campaign
{% image src='/img/pages/features/google-dla/google-xplatform-display-ads/adwords-display-network.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. Enter your desired Final Website into the **Final URL** field. This should be the same website that your Branch link routes to.
1. Copy your Branch Ad Link from the last section and ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.) which should be automatically generated on your Branch dashboard.
1. Expand the **Advanced URL options** and paste your Branch Ad link into the **Tracking URL template** field.

{% image src="/img/pages/features/google-dla/google-xplatform-display-ads/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-xplatform-display-ads/adwords-configuration.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your final destination website, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient adwords-valuetrack-info %}{% endingredient %}

## FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.

{% endif %}
