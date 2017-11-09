---
type: recipe
directory: marketing-channels
title: "Google Video Ads"
page_title: "Advertising with Deep Links: Google Video Ads"
description:
hide_platform_selector: true
sections:
- overview
- install
- standard
- support
contents:
  number:
  - install
  - standard
alias: [ /features/google-video-ads/, /features/google-video-ads/overview/, /features/google-video-ads/install/, /features/google-video-ads/standard/, /features/google-video-ads/support/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
If you're running Google AdWords Video Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Video | Standard - Instream | Cross-platform Search
Video | Standard - Bumper | Cross-platform Search
Video | Mobile App Install - Instream | App Only: Install

#### OS Support and Major Differences

Operating System | Supported by Adwords Video Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to Final Website | [link]({{base.url}}/marketing-channels/google-video-ads/standard)
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link]({{base.url}}/marketing-channels/google-video-ads/install)
Android | Yes | Uses tracking template, must redirect to Google Play store | [link]({{base.url}}/marketing-channels/google-video-ads/install)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.install %}

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
{% image src='/img/pages/features/google-dla/google-video/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android redirect is set to the desired app being promoted by the ad campaign.
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

To set up a Video Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Video campaigns can be found **[here](https://support.google.com/adwords/answer/6340491?hl=en)**. To set up a Video App Install campaign, you must first complete the entire creation flow for the campaign and ad on Google Adwords.

#### Create Your Campaign

1. Select `Video` on Adwords
{% image src='/img/pages/features/google-dla/adwords-video-network.png' third center alt='Adwords Network' %}
1. Select the 'Mobile app installs' campaign type
{% image src='/img/pages/features/google-dla/google-video/install/video-install.png' 3-quarters center alt='Adwords Setup' %}
1. Complete the rest of the ad campaign setup

#### Ad Creation

1. Navigate to the Video ad to edit on the Adwords portal.
1. Select the ad and select `Edit > Change URL options`.
1. In the Change URL options window, copy and paste your Branch Ad link from the previous section into the Tracking template field and confirm the change.

{% image src="/img/pages/features/google-dla/google-video/full-branch-link.png" 3-quarters center alt='Example Link' %}

{% image src="/img/pages/features/google-dla/google-video/install/configuration-instream.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the video ad directly links to the App store to install the app, Branch links can't be used as the video link directly. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% caution title="Video Discovery Ad Support" %}

As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type.

{% endcaution %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.standard %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Display Link`
{% image src='/img/pages/features/google-dla/create-link-display.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-video/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
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

To set up a Video Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Video campaigns can be found **[here](https://support.google.com/adwords/answer/6340491?hl=en)**.

#### Create Your Campaign

1. Select `Video` on Adwords
{% image src='/img/pages/features/google-dla/adwords-video-network.png' third center alt='Adwords Network' %}
1. Select the 'Standard' campaign type
{% image src='/img/pages/features/google-dla/google-video/standard/video-standard.png' 3-quarters center alt='Adwords Setup' %}
1. Complete the rest of the campaign and ad group setup

#### Ad Creation

1. On the ad creation section, select your desired Video ad format and fill in the **Final URL** field with the final website URL of your ad
1. Locate the `Ad URL options (advanced)` section and expand it. Now copy your Branch Ad link from the previous step into the **Tracking Template** field.

{% image src="/img/pages/features/google-dla/google-video/full-branch-link.png" 3-quarters center alt='Example Link' %}

#### Instream Video Setup

{% image src="/img/pages/features/google-dla/google-video/standard/configuration-instream.png" 3-quarters center alt='Example Adwords Config' %}

#### Bumper Video Setup

{% image src="/img/pages/features/google-dla/google-video/standard/configuration-bumper.png" 3-quarters center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your final destination website, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% caution title="Video Discovery Ad Support" %}

As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type.

{% endcaution %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient adwords-valuetrack-info %}{% endingredient %}

## FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For Video Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.

**Q: Why can't I use a Branch link in a Video discovery ad?**

**A:** As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type. However, we're working on support in the future and will update these docs accordingly.

{% endif %}
