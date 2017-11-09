---
type: recipe
directory: data-exchange
title: "Tune"
page_title: Sync Branch data with Tune
description: Learn how to synchronize your Branch data with Tune to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Tune, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- support
alias: [ /third-party-integrations/tune/, /third-party-integrations/tune/overview/, /third-party-integrations/tune/guide/, /third-party-integrations/tune/advanced/, /third-party-integrations/tune/support/ ] 
redirect: https://docs.branch.io/pages/integrations/tune/
---

{% if page.overview %}

With a push of a button you can send your Branch data to your Tune dashboard, helping you segment users, calculate LTV and understand the power of Branch links in acquiring users.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## What events does Branch send to Tune?

Branch will send all **Branch link clicks** to Tune. Branch also sends all the data that is attached to the link. Tune then matches all downstream actions (installs, opens, custom events, payouts) back to the referring link. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Tune [here](/third-party-integrations/tune/advanced/#what-branch-sends-to-tune).

## What does it look like?

See your Branch organic acquisition campaigns alongside your Tune data. You can also use Branch links with Tune measurement URL parameters to get the advantages of Branch deep linking with Tune's fine-grained attribution data and ROI analysis.

{% image src="/img/pages/third-party-integrations/tune/tune-dashboard-example.png" 3-quarters center %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be a Tune customer and have the Tune SDK ([iOS](http://developers.mobileapptracking.com/ios-sdk/), [Android](http://developers.mobileapptracking.com/android-sdk/)) installed in your app.

{% endprerequisite %}

## Get credentials from your Tune dashboard

To set up the integration you will need your **Tune Advertiser ID** (an account-level identifier), your platform-specific Tune **Site IDs** (also known as App IDs) and a Tune **Publisher ID** for Branch.

You can find your **Advertiser ID** by navigating to "Accounts > Advertiser Account" in the left hand sidebar and finding the Advertiser ID in the Account Details.

{% image src="/img/pages/third-party-integrations/tune/tune-advertiser-id.png" 3-quarters center %}

You can find your **Site ID** by navigating to "Mobile Apps" in the left hand sidebar and getting the relevant Site ID from the table.

{% image src="/img/pages/third-party-integrations/tune/tune-app-ids.png" 3-quarters center %}

To retrieve Branch's **Publisher ID** from Tune it is first necessary to set Branch up as an [Integrated Partner](https://help.tune.com/marketing-console/setting-up-an-integrated-advertising-partner/#1-enable-the-advertising-partner-integration) and find the Publisher ID:

1. Log in to Tune and go to Attribution Analytics
1. In the navigation bar on the left side of the portal, under the Partners section, click: Integrations
1. On the Integrated Partners page (on the right side), search for Branch
1. Select Branch and, in the far-right column, click: Enable
1. Click on the Branch logo, then click on the "Attribution Settings" tab and copy the Partner ID (also known as the Branch Publisher ID)

{% image src="/img/pages/third-party-integrations/tune/tune-branch-partner-id.png" half center alt='Branch Partner ID' %}

## Enable the Tune card in your Branch dashboard

1. On the Branch Dashboard (https://dashboard.branch.io) navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Tune and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Branch Partner ID, the Tune Advertiser ID and your platform-specific Tune Site IDs.
1. Hit **Save**.

{% image src="/img/pages/third-party-integrations/tune/enable-tune-integration.png" half center alt='Enable Integration' %}

{% elsif page.advanced %}

## What Branch sends to Tune

Branch will send any parameters that you append to a link on to Tune (see [below for adding advanced attribution parameters](/third-party-integrations/tune/advanced/#advanced-network-segmentation-with-tune)). By default, if you don't append any additional parameters to your link, Branch will pass Branch Analytics tags on to Tune with the below mapping.

{% caution %}
If you enabled the Tune integration before August 10th 2016, your analytics tags will map to sub_publisher and sub_placement. To get the updated mappings please disable and re-enable the Tune card in your dashboard.
{% endcaution %}

Branch Analytics Tag | Tune Data Placeholder Tag
--- | ---
Campaign | my_campaign
Channel | my_placement
Feature | my_keyword
Branch Click ID | tracking_id

## What are the methods Branch uses to let TUNE know an install came from Branch?

We rely on 3 methods to match attributions into TUNE’s dashboard.

1. The first is snapshotting, which is the most basic. This is when we send a click event to Tune with IP address and User Agent and Tune completes the attribution.
1. The next method is passing the Google Advertising Id or IDFA on iOS. This occurs when a Universal or App link drove open the app session via Branch (meaning a click never touched the browser). In this case, we can attribute Branch correctly in TUNE’s dashboard 100% of the time, because TUNE receives the IDFA / GAID from Branch while also keeping reference to it through their own SDK.
1. The third method is passing along Branch’s click ID through the install referrer on Android, and the URI scheme on iOS. The TUNE SDK consumes the click ID through these mechanisms and then Branch sends that same click id back to TUNE. This also results in a 100% match.

By following all the steps listed in this guide, you’ll automatically have all 3 available.

## Advanced network segmentation with Tune

If you are interested in advanced network attribution segmentation in Tune, you can use the same attribution parameters you'd append to a Tune Measurement URL with your Branch link.

{% caution %}
If you enabled the Tune integration before August 10th 2016, you will need to disable and re-enable the Tune card in your dashboard before carrying out the instructions below. Please note this will change your default mapping of Branch analytics tags from the sub_publisher and sub_placement values into the my_partner values as noted above.
{% endcaution %}

1. Start with an existing Branch link, for example, a [ Quick Link](/features/google-search-ads/guide/#create-a-marketing-link-on-the-branch-dashboard){:target="_blank"}.
1. Append `?` to the end of your link to start the query params string. For example: **https://mylinks.app.link/8AHjQx0fyv?**
1. Next, [create a measurement URL](https://help.tune.com/marketing-console/creating-a-measurement-url/){:target="_blank"} in Tune's Attribution Analytics Dashboard with the parameters you'd like to capture.
	- Select the "Click" URL (as opposed to the Impression URL)
	- After creating the measurement URL, copy everything after **action=click&** and append the parameters to the end of your Branch link.
	- You should remove `&site_id={value}` from the parameters, as Branch will automatically fill that in for your app depending on platform.

{% image src="/img/pages/third-party-integrations/tune/tune-measurement-url.png" 3-quarters center alt='Tune Measurement URL' %}

Your new URL will now pass useful parameters to Tune.

{% example %}
Here's an example of a finalized link for Tapjoy:

{% highlight sh %}
https://mylinks.app.link/8AHjQx0fyv?
	publisher_id=334667&
	sub_campaign=TapjoyBranchCampaign&
	my_publisher=Tapjoy&
	sub1=customtapjoyparameter&
	android_id=TAPJOY_RESTORED_RAW_ADVERTISING_ID
{% endhighlight %}
{% endexample %}

{% caution %}
Branch automatically uses the my_* parameters for its link data. If there is a conflict between the custom parameters you append to your Branch link and the [default parameters Branch automatically sends to Tune](/third-party-integrations/tune/advanced/#what-branch-sends-to-tune), the custom parameters will override the default data.
{% endcaution %}

## Sending Google ValueTrack Parameters to Tune

For AdWords App Install Campaigns, you can append ValueTrack parameters to your Branch link by following the same instructions highlighted above.

When you create a Measurement URL in the Tune dashboard, the following URL parameters will automatically be generated and should be appended to the end of your Branch link (line breaks added for legibility):
{% highlight sh %}
https://mylinks.app.link/8AHjQx0fyv?
	&sub_publisher={network}&
	sub_placement={placement}&
	sub_ad={creative}&
	sub_campaign={campaignid}&
	attr_core=1&
	sub_keyword={keyword}&
	gdevice={device}&
	gmodel={devicemodel}&
	is_mobile={ifmobile:[value]}
{% endhighlight %}
{% protip %}
With the macros **{}**, Google will insert the relevant values for each parameter, values which will then be passed to Tune's Attribution Analytics.
{% endprotip %}

For a full list of supported value parameters for AdWords, check out Tune's [Google AdWords Integration](https://help.tune.com/marketing-console/google-adwords-integration/){:target="_blank"} documentation.

{% elsif page.support %}

## How can I test this integration?

1. Enable the integration
1. Create a Branch link
1. Click the Branch link so the app opens or you are taken to the app store. If you're taken to the app store, download and open the app.
1. Log in to your Tune dashboard, and click "Logs" on the left hand side bar.
1. Check the "Click" logs for a click attributed to Branch (or the network if you are using measurement URL parameters)
1. Check the "Installs" or "Opens" logs for a correctly attributed install.
1. After 10-15 minutes, you should see an install or open appear in your Attribution Dashboard.

Please note that to produce installs, you must delete the app and reset your advertising identifier, then click a Branch link and install the app.

## Branch data not appearing in Tune

Ensure Branch is an enabled provider under your **Partners** in your TUNE dashboard. This should happen automatically, but to verify, click into the **Integrated Partners** section on your TUNE dashboard. From there, enter in Branch inside the search box, and click enable.

## Install discrepancies

### Capture the GAID and IDFA device identifiers

Ensure that you are capturing both the [Google Advertising Identifier (GAID) on Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id), and the [IDFA on iOS]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#install-the-sdk-manually) (by importing the `AdSupport.framework`).

### Add Google Play Install Referrer (Android)

When you integrate the Tune SDK, ensure you add the install referrer snippet provided Tune [here](https://help.tune.com/marketing-console/how-google-play-install-referrer-works/).

## Issues with Facebook data discrepancies.

If you are finding data discrepancies between Branch, Tune and Facebook - please ensure you have followed the Facebook Ads setup and troubleshooting steps [here](/features/facebook-ads/guide/ios/).

If you're using the Tune integration and Branch links in Facebook ads, Branch must initialize and complete before the Tune SDK. When this happens, Branch will be able fetch the necessary attribution parameters and pass them to Tune via the integration.

{% endif %}
