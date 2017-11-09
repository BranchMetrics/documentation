---
type: recipe
directory: marketing-channels
title: "Google Adwords Conversions Setup"
page_title: "Advertising with Deep Links: Google Ads - Conversion Setup"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
contents:
  number:
  - guide
alias: [ /features/google-adwords-conversions/overview/, /features/google-adwords-conversions/guide/, /features/google-adwords-conversions/support/ ]
redirect: https://docs.branch.io/pages/deep-linked-ads/google-ads-overview/
---

{% if page.overview %}

If you're using Google Adwords with Branch links, setting up conversion events in Adwords will allow Branch to send app install conversion information to Adwords for verification. We recommend setting this up to help minimize discrepancies between Adwords and Branch conversion values.

Note: Conversions measured here are **app installs**.

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

Setting up Adwords conversion events with Branch allows Branch to get direct confirmation from Google for which conversion events were driven by an Adwords advertisement and allows Adwords to collect accurate conversion data for your app.

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

## Conversions Setup

Set up Google as an Ad Partner and conversion tracking from Adwords on the Branch dashboard. If you already have Google enabled as an ad partner, continue with the _Enable Adwords Conversions_ instructions.

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management).
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/ads-partner-management.png" center 3-quarters alt='Ads Partner Management' %}
1. Search for **Google AdWords**.
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/find-google-partner.png" center 3-quarters alt='Find Google AdWords in Partner Manager' %}
1. We will now fill in the conversion ID and Label fields.

#### Enable Adwords Conversions

1. Go to your [Adwords dashboard](https://adwords.google.com/cm/CampaignMgmt){:target="_blank"}.
1. In the top nav bar, click into `Tools` > `Conversions`.
{% image src="/img/pages/features/google-dla/google-conversions/adwords-tools-conversion.png" third center alt='Conversion Menu' %}
1. Click `+ Add a Conversion` button.
1. Select `App` from the cards.
{% image src="/img/pages/features/google-dla/google-conversions/adwords-conversion-install.png" 3-quarters center alt='Conversion App Install' %}
1. Select `First opens and in-app actions`.
1. Select the appropriate platform (iOS or Android).
1. Select `App installs (first-open)`.
{% image src="/img/pages/features/google-dla/google-conversions/adwords-app-conversion-card.png" half center alt='Conversion IDs' %}
1. Now fill out the conversion action page:
   * Give it a name like `Branch Android/iOS Conversion`
   * Under `Value` assign a value (or select “Don’t assign a value to this install”)
   * Under `Mobile app` input your application details
   * Select `Include in "Conversions"` to have the conversion events appear in your Adwords columns
1. Click `Save and continue`.
1. Select the option to have a server report conversions: `Set up a server-to-server conversion feed...`.
1. Note your `Conversion ID` & `Conversion label` as shown in the screenshot below.{% image src="/img/pages/features/google-dla/google-conversions/adwords-conversions.png" 3-quarters center alt='Conversion IDs' %}
1. Head to the [Branch Dashboard Adwords Settings](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=settings){:target="_blank"}.
1. Paste in the `Conversion ID` and `Conversion label` from your Adwords dashboard into the appropriate fields for either iOS or Android
1. Click the `Save and Enable` button in the lower right hand corner.
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/save-and-enable-google.png" center 3-quarters alt='Save and Enable Google AdWords in Partner Manager' %}
1. Google AdWords is now enabled as an ad partner.
1. Click `Done` in your Adwords dashboard.

You're all setup to confirm app install conversions between Branch and Adwords!

{% protip title="Conversion Windows" %}

Adwords has a default 30 day conversion window for app install actions which can't be changed. To minimize discrepancies between Branch and Adwords conversion values, we recommend setting your Branch attribution window to the same value. Navigate to `Link Settings` > `Attribution Windows` and set the **Click to conversion event** to 30 days.
**By default, the window is set to 30 days in the Branch dashboard.**

{% image src="/img/pages/features/google-dla/google-conversions/attribution-window.png" 3-quarters center alt='Branch Conversion Window' %}

{% endprotip %}

{% elsif page.support %}

## FAQ / Debugging

**Q: I'm getting discrepancy between conversion counts in Branch and Google Adwords**

**A:** While we should always expect around a 5% discrepancy due to time zone differences and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

**Q: My campaign is reporting a number of conversions much higher than the number of conversions shown in the conversion table in Adwords**

**A:** When viewing a campaign, it shows the sum of all conversion events that apply to it. To view by conversion, navigate to `Segment` > `Conversions` > `Conversion name`, in order to clearly see the breakdown of your campaign's conversions.

{% image src="/img/pages/features/google-dla/google-conversions/conversion-segment.png" third center alt='Adwords Conversion Segment' %}

{% endif %}
