---
type: recipe
directory: marketing-channels
title: "Google Universal App Campaigns"
page_title: "Advertising with Deep Links: Google Ads - Universal App Campaigns"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
contents:
  number:
  - guide
alias: [ /features/google-dla/google-uac/overview/, /features/google-dla/google-uac/guide/, /features/google-dla/google-uac/support/ ]
redirect: https://docs.github.io/pages/deep-linked-ads/google-uac/
---

{% if page.overview %}

If you're running Google's new Universal App Campaign, Branch links can be placed inside your ads. This allows you to track ad-driven installs across Android and iOS on the Branch dashboard and deep link those new users directly to content the first time they open your app.

Branch uses Google Adwords' server to server [App Conversion Confirmation](https://developers.google.com/app-conversion-tracking/api/legacy/confirm) for attribution data which reports on conversion events. Therefore, we only collect **install (conversion) data**. Click data is not supported for this campaign type.

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Universal App Campaign | Mobile App Install | App Only: Install

#### OS Support and Major Differences

Operating System | Supported by Universal App Campaigns? | Key Differences | Documentation
--- | --- | --- | ---
iOS | Yes | Conversion and Postback setup, no tracking template | [link]({{base.url}}/marketing-channels/google-uac/guide)
Android | Yes | Conversion and Postback setup, no tracking template | [link]({{base.url}}/marketing-channels/google-uac/guide)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

Universal App Campaigns don’t use traditional ads and ad groups. Instead different types of ad units are automatically created by Google using information given at the campaign level. There are no destination URLs, you will just use your Apple App Store or Google Play Store Applications.

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to 

, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
{% endprerequisite %}

## Enable Google as an ad partner

Set up Google as an Ad Partner and conversion tracking from Adwords on the Branch dashboard. If you already have Google enabled as an ad partner, follow the conversion tracking steps to ensure the conversion ID and label parameters are setup.

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management).
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/ads-partner-management.png" center 3-quarters alt='Ads Partner Management' %}
1. Search for **Google AdWords**.
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/find-google-partner.png" center 3-quarters alt='Find Google AdWords in Partner Manager' %}
1. We will now fill in the conversion ID and Label fields.

#### Enable Adwords Conversions

1. Go to your [Adwords dashboard](https://adwords.google.com/cm/CampaignMgmt){:target="_blank"}.
1. In the top nav bar, click into `Tools` > `Conversions`.
1. Click `+ Add a Conversion` button.
1. Select `App` from the cards.
1. Select `First opens and in-app actions`.
1. Select the appropriate platform (iOS or Android).
1. Select `App installs (first-open)`.
{% image src="/img/pages/features/google-dla/google-uac/adwords-app-conversion-card.png" third center alt='Conversion IDs' %}
1. Now fill out the conversion action page:
   * Give it a name like `Branch Android/iOS Conversion`
   * Under `Value` assign a value (or select “Don’t assign a value to this install”)
   * Under `Mobile app` input your application details
   * Select `Include in "Conversions"` to have the conversion events appear in your Adwords columns
1. Click `Save and continue`.
1. Select the option to have a server report conversions: `Set up a server-to-server conversion feed...`.
1. Note your `Conversion ID` & `Conversion label` as shown in the screenshot below.{% image src="/img/pages/features/google-dla/google-uac/adwords-conversions.png" half center alt='Conversion IDs' %}
1. Head to the [Branch Dashboard Adwords Settings](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=settings){:target="_blank"}.
1. Paste in the `Conversion ID` and `Conversion label` from your Adwords dashboard into the appropriate fields for either iOS or Android
1. Click the `Save and Enable` button in the lower right hand corner.
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/save-and-enable-google.png" center 3-quarters alt='Save and Enable Google AdWords in Partner Manager' %}
1. Google AdWords is now enabled as an ad partner.
1. Click `Done` in your Adwords dashboard.
1. Finally, to create a Google ads link click the `Create Google AdWords` Link in the top right hand corner.
{% image src="/img/pages/marketing-channels/deep-linked-ads/google/create-google-link.png" center 3-quarters alt='Create Google AdWords link' %}

{% protip title="Universal App Campaigns for both Android & iOS" %}

If you're running a Universal App Campaign for both iOS and Android, all four fields under your Adwords Partner Settings should be populated, even if you have the same conversion ID and Label for iOS and Android. If you want to stop running Universal App Campaign reporting for a platform, just remove the two fields for that platform.

{% endprotip %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `App Install or Engagement`
{% image src='/img/pages/features/google-dla/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Display**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Universal App Campaign iOS/Android** while leaving the Campaign field blank
{% image src='/img/pages/features/google-dla/google-uac/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
{% image src='/img/pages/features/ads-analytics/adwords-analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To setup a Universal App Campaign we will place our unique Branch Ad link into a Adwords Conversion Postback setting. Adwords campaign documentation is available **[here](https://support.google.com/adwords/answer/6247380?hl=en)**.

#### Create Your Campaign

1. Select `Universal app campaign` on Adwords
{% image src='/img/pages/features/google-dla/adwords-uac-network.png' third center alt='Adwords Network' %}
1. Complete setting up the campaign completely with your desired app to promote

#### Setup the Branch Link

1. Copy the generated Branch Ad link from the last section which should be in the general form shown below (there are slight differences between iOS/Android). Ensure that the `link-identifier` param of the link has a unique id filled in.
{% image src='/img/pages/features/google-dla/google-uac/full-branch-link.png' 3-quarters center alt='Adwords Network' %}
1. Go to your [Adwords dashboard](https://adwords.google.com/cm/CampaignMgmt){:target="_blank"}.
1. In the top nav bar, click into `Tools` > `Conversions`.
1. Locate the Conversion that was setup in the previous section.
1. Click `Edit Settings` and locate the **Postback URL** field.
1. Copy and paste the generated Branch link into the Postback URL field and save the changes to the Conversion.

{% image src="/img/pages/features/google-dla/google-uac/postback-setup.png" 3-quarters center alt='Example Adwords Config' %}

The setup to measure your Universal App Campaign is complete and Adwords will send Branch information on conversions from ads in your Campaign!

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

**Q: I'm not seeing any click data for my campaign.**

**A:** Branch uses Google Adwords' server to server [App Conversion Confirmation](https://developers.google.com/app-conversion-tracking/api/legacy/confirm) for attribution data which reports on conversion events. Therefore, we only collect **install (conversion) data**. Click data is not supported for this campaign type.

**Q: I'm getting discrepancy between conversion counts in Branch and Google Adwords**

**A:** While we should always expect around a 5% discrepancy due to time zone differences and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

**Q: There's an issue with iOS 10 and Limit Ad Tracking**

**A:** In iOS 10, Apple broke the ability for app developers to collect the `IDFA` if the user had enabled `Limit Ad Tracking`. In this case, Branch and Google cannot compare notes to see who drove the install. This will account for about 15% discrepancy in counts across both platforms, where Branch's tracked installs will be lower.

**Q: I'm not seeing any data coming through for the Universal App Campaign?**

**A:** If you see absolutely 0 data coming through from your integration, it's possible that you're not collecting Google Advertising ID (GAID) on Android or IDFA on iOS.

- iOS: Add the AdSupport.framework and read this extra info about [submitting](https://dev.branch.io/getting-started/sdk-integration-guide/guide/ios/#submitting-to-the-app-store) to the store.
- Android: Add Google Play Services so that we can collect GAID. See [here](https://dev.branch.io/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id).

**Q: There seems to be a discrepancy between the Install and Opens values?**

**A:** One discrepancy root cause we've seen before is the scenario where Branch will classify an install as an 'open'. We remember the history of a particular user via their IDFA (in addition to using a few other methods) and will detect whether the user is actually a new user or a returning user who had previously uninstalled your app. Facebook doesn't do this.

We've seen Google classify 're-installs' as fresh installs, where Branch will correctly classify them as 're-opens'. If you're comparing the raw install numbers on Branch, and ignoring the 're-opens', it's possible you'll see a discrepancy. To check sum up the 'installs' and 'reopens' for the given link and compare it to Google's total installs.

{% image src='/img/pages/features/facebook-ads/installs_plus_opens.png' 2-thirds center alt='installs and opens' %}

If it's close, you know that this is the root cause.

**Q: Fewer Clicks Recorded in Branch**

**A:** The number of clicks on a link used inside of a Branch enabled Facebook Ad will be lower in Branch's dashboard than Google's. This is because Google routes users straight to the App/Play Store without letting Branch know that a link was clicked. If the user decides not to install the app/drops off at the App/Play Store, then Google will have recorded one more click than Branch. Branch does not increment the link's click count until the user enters into the app. This is why you'll see more clicks in Google's dashboard.

{% endif %}
