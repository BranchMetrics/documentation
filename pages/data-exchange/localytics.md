---
type: recipe
directory: data-exchange
title: "Localytics"
page_title: Send Deep Link Install Data to Localytics
description: We’ve partnered with Localytics to provide an easy way to deliver Branch installs and attributions to your Localytics dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Localytics
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
alias: [ /third-party-integrations/localytics/, /third-party-integrations/localytics/overview/, /third-party-integrations/localytics/guide/, /third-party-integrations/localytics/advanced/ ] 
redirect: https://docs.branch.io/pages/integrations/localytics/
---

{% if page.overview %}

We've partnered with Localytics to provide an easy way to deliver Branch installs and attributions to your Localytics dashboard. This is great for segmenting your users and providing higher granularity for your organic cohorts vs paid cohorts.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How it works

We have built a custom integration to automatically send all Branch install data to Localytics without any extra work on your side (besides integrating both SDKs). We just need some configuration information from your Localytics account, and we'll take care of the rest.

{% protip title="How do we differentiate Localytics and Branch installs?" %}
We rely on a Branch link being clicked which leads to an install. This sets an internal boolean that an install came from Branch.
{% endprotip %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [sign up for a Localytics account](https://www.localytics.com/free-trial-signup/) and [install the Localytics SDK](http://docs.localytics.com/).

{% endprerequisite %}


## Set up Localytics

1. On the Localytics dashboard, navigate to the **Attribution** section, click the **•••** (overflow) button, and select **Settings**. {% image src='/img/pages/third-party-integrations/localytics/localytics-more.png' 3-quarters center alt='Custom redirect configuration' %}
1. Once there, you'll need to add your **Store ID** (iTunes for iOS, Play Store for Android).
1. Under the section **Ad Tracking Setup**, check the box labeled **Third-party Attribution**. This will enable an **Attribution ID** for you. Copy it, and have it handy for the next steps. {% image src='/img/pages/third-party-integrations/localytics/localytics-attr-settings.png' 2-thirds center alt='Custom redirect configuration' %}

{% protip title="What does this mean?" %}
Once you have selected to allow third-party attribution, Localytics will attribute non-Localytics installs to your dashboard. **This information is delayed by 10 minutes.**
{% endprotip %}


## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Localytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Localytics API Key for each platform and hit **Save**

{% image src="/img/pages/third-party-integrations/localytics/enable-localytics-integration.png" half center alt='Enable Integration' %}

{% caution title="Please test your integration!" %}
Branch is not responsible for inaccurate API keys.

{% endcaution %}

{% elsif page.advanced %}

## What Branch sends to Localytics

Branch Analytics Tag | Localytics Data Placeholder Tag
--- | ---
Campaign | campaign
Channel | adgroup
Feature | creative_name

Branch will also send any arbitrary parameters you attach to a link on to Localytics.

{% endif %}
