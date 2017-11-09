---
type: recipe
directory: marketing-channels
title: "Google Search Network Ads"
page_title: "Advertising with Deep Links: Google Search Network Ads"
description:
hide_platform_selector: true
sections:
- overview
- standard
- dynamic
- support
contents:
  number:
  - guide
alias: [ /features/google-xplatform-search-ads/, /features/google-xplatform-search-ads/overview/, /features/google-xplatform-search-ads/standard/, /features/google-xplatform-search-ads/standard/,  /features/google-xplatform-search-ads/support/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
If you're running Google AdWords Search Network ads, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Standard | Cross-platform Search
Search Network | Dynamic Search Ads | Cross-platform Search

#### OS Support and Major Differences

Operating System | Supported by AdWords Search Network Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to to Final Website | [link]({{base.url}}/marketing-channels/google-xplatform-search-ads/standard)
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link]({{base.url}}/marketing-channels/google-xplatform-search-ads/standard)
Android | Yes | Uses tracking template, must redirect to Google Play store | [link]({{base.url}}/marketing-channels/google-xplatform-search-ads/standard)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.standard %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Search Link`
{% image src='/img/pages/features/google-dla/create-link-search.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Search** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-xplatform-search-ads/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
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

To set up a Search Network Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Search Network campaigns can be found **[here](https://support.google.com/adwords/answer/6340430?hl=en)**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-search-network.png' third center alt='Adwords Network' %}
1. Select the `Standard` campaign type
{% image src='/img/pages/features/google-dla/google-xplatform-search-ads/standard/adwords-search-standard.png' 3-quarters center alt='Adwords Setup' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. For Standard Search Ads first copy your generated Branch Ad link from the previous section.
1. In the ad editor, locate the `Ad URL options (advanced)` section and expand it. Now paste your link into the **Tracking Template** field.
*Note: The `Ad URL options (advanced)` may not be available in the campaign set up procedure. In this case, finish setting up the campaign and then access the ad editor after for access to the advanced URL options.*

{% image src="/img/pages/features/google-dla/google-xplatform-search-ads/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-xplatform-search-ads/standard/adwords-configuration.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match the final destination website, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.dynamic %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Search Link`
{% image src='/img/pages/features/google-dla/create-link-search.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Search** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-xplatform-search-ads/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
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

To set up a Dynamic Search Network Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Dynamic Search campaigns can be found **[here](https://support.google.com/adwords/answer/2471185?hl=en)**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
{% image src='/img/pages/features/google-dla/adwords-search-network.png' third center alt='Adwords Network' %}
1. Select the `Dynamic Search Ads` campaign type
{% image src='/img/pages/features/google-dla/google-xplatform-search-ads/dynamic/adwords-search-dynamic.png' 3-quarters center alt='Adwords Setup' %}
1. Set the **Website** field to equal to the final website that the dynamic ads will route to. This should be the same website that your Branch link redirects to on desktop.
{% image src='/img/pages/features/google-dla/google-xplatform-search-ads/dynamic/final-website.png' half center alt='Adwords Final Website' %}
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. In the ad editor, locate the `Ad URL options (advanced)` section and expand it. Now copy your Branch Ad link from the previous step into the **Tracking Template** field.

{% image src="/img/pages/features/google-dla/google-xplatform-search-ads/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-xplatform-search-ads/dynamic/adwords-configuration.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match the final destination website, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient adwords-valuetrack-info %}{% endingredient %}

## FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.

{% endif %}
