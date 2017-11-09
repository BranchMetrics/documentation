---
type: recipe
directory: data-exchange
title: "Kochava"
page_title: Send Deep Link Install Data to Kochava
description: We’ve partnered with Kochava to provide an easy way to deliver Branch installs and attributions to your Kochava dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Kochava
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
alias: [ /third-party-integrations/kochava/, /third-party-integrations/kochava/overview/, /third-party-integrations/kochava/guide/, /third-party-integrations/kochava/advanced/ ] 
redirect: https://docs.branch.io/pages/integrations/kochava/
---

{% if page.overview %}

The Kochava integration sends **all clicks on a Branch link** from Branch to Kochava, for the enabled platform. Now you can see your valuable Branch attribution data in your Kochava dashboard.

Kochava offers unique, holistic and unbiased app measurement. From attribution and analytics to optimization, the Kochava platform provides precise, real-time visualization of campaign and app performance from ad impression through user lifetime value. Kochava customers enjoy a suite of optimization tools including Configurable Attribution, Fraud Detection and over 2200 certified network & publisher integrations including super publishers like Facebook, Instagram, Google and Pandora.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to be a Kochava customer and have the [Kochava SDK installed](http://support.kochava.com/sdk-integration) in your app.

{% endprerequisite %}

## Create Campaign IDs in Kochava

For each platform (iOS and Android) you should create campaign IDs. You will do this in the Kochava dashboard.

### Create a campaign

1. Log in to Kochava.
1. Select the desired app .
1. Select `App Tools > Campaign Manager`
1. Click `Add a Campaign`
1. Enter a unique Campaign name.

### Create a Segment

1. Select `Campaign Tools>New Segment`
1. Enter a Segment Name.
1. Click submit

### Create a tracker

1. Click `Segment Tools > New Tracker`
1. Enter the Tracker Name.
1. Select `Tracker Type>3rd Party Tracking` (default setting)
1. Select `Select A Network > Branch`
1. Click submit. (If no further trackers need to be created).

Once you've clicked `Submit` you should see a screen with the campaign ID.

{% image src="/img/pages/third-party-integrations/kochava/kochava-dashboard.png" half center alt='Branch Campaign ID in Kochava' %}

## Configure the Branch Dashboard

1. In the Branch dashboard, go to the [Integrations page](https://dashboard.branch.io/integrations) and look for the **Kochava** card.
1. Click **Enable** on the card
1. Enter your Kochava campaign ID for the relevant platform
1. Hit **Save**

{% image src="/img/pages/third-party-integrations/kochava/enable-kochava-integration.png" half center alt='Enable Kochava Integration' %}

{% elsif page.advanced %}

## Advanced network segmentation with Kochava

If you are interested in advanced network attribution segmentation in Kochava, you can use the same attribution parameters from a Kochava Click URL with your Branch link, and switch out campaign_ids. Please note that using this method will override the default attribution of Branch links to their default campaign in Kochava (only the specific Branch links that you do this for will not attribute to the default campaign).

{% caution %}
If you enabled the Kochava integration before August 12th 2016, you will need to disable and re-enable the Kochava card in your dashboard before carrying out the instructions below.
{% endcaution %}

1. Start with an existing Branch link, for example, a [ Quick Link](/features/google-search-ads/guide/#create-a-marketing-link-on-the-branch-dashboard){:target="_blank"}.
1. Next, [create a Kochava Click URL](http://support.kochava.com/campaign-management/create-an-install-campaign){:target="_blank"} in the Kochava Dashboard with the parameters you'd like to capture.
	- Select the "Click" URL (as opposed to the Impression URL)
	- After creating the URL, copy everything after **click** value and append the parameters to the end of your Branch link.

{% example %}
Here's an example of a finalized link for Branch and Kochava:

{% highlight sh %}
https://mylinks.app.link/8AHjQx0fyv?
	campaign_id=kokochavabranchdemo90128398&
	network=Bing
{% endhighlight %}
{% endexample %}

{% endif %}
