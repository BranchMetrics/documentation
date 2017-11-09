---
type: recipe
directory: marketing-channels
title: "Google Ads Overview"
page_title: "Advertising with Deep Links: Google AdWords"
description:
hide_platform_selector: true
sections:
- overview
alias: [ /features/google-ads-overview/ ]
redirect: https://docs.branch.io/pages/deep-linked-ads/google-ads-overview/
---

{% if page.overview %}
With Branch, you can put deep links in every type of Google AdWords campaign, improving conversion rates and letting you measure the impact of your campaigns on mobile.  

The Google AdWords interface can be confusing so we've created a guide to help you find the right documentation. The new AdWords interface (released in beta in May 2017) still follows roughly the same campaign creation flow. We'll update this page as needed if the campaign creation flow is updated, or new ad types are supported.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Documentation Link | Branch Ad Format
--- | --- | --- | ---
Search Network | Mobile app installs | **[link]({{base.url}}/marketing-channels/google-search-install-ads)** | App Only: Install
Search Network | Mobile app engagement | **[link]({{base.url}}/marketing-channels/google-search-engagement-ads)** | App Only: Engagement
Search Network | Standard  | **[link]({{base.url}}/marketing-channels/google-xplatform-search-ads/standard/)** | Cross-platform Search
Search Network | Dynamic Search Ads  | **[link]({{base.url}}/marketing-channels/google-xplatform-search-ads/dynamic/)** | Cross-platform Search
Display Network | Install your mobile app | **[link]({{base.url}}/marketing-channels/google-display-install-ads/)** | App Only: Install
Display Network | Engage with your mobile app | **[link]({{base.url}}/marketing-channels/google-display-engagement-ads)** | App Only: Engagement
Display Network | Others (Visit your website, Influence, etc.)  | **[link]({{base.url}}/marketing-channels/google-xplatform-display-ads)** | Cross-platform Display
Video | Mobile App Installs | **[link]({{base.url}}/marketing-channels/google-video-ads/install/)** | App Only: Install
Video | Standard | **[link]({{base.url}}/marketing-channels/google-video-ads/standard/)** | Cross-platform Display
Universal App Campaigns | Universal App Campaigns | **[link]({{base.url}}/marketing-channels/google-uac)** | App Only: Install

{::comment}
Shopping | Shopping | link here | Cross-platform Product Links
Video (YouTube TrueView) | Shopping | link here | Cross-platform Product Links
{:/comment}

For setup instructions for Adwords Conversion tracking with Branch check out **[Google Conversion Setup]({{base.url}}/marketing-channels/google-conversions)**.

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted title='Search Mobile App Install' next='features/google-search-install-ads' %}{% endgetstarted %}
{% endif %}
