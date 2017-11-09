---
type: recipe
directory: marketing-channels
title: "Install Ads"
page_title: "Twitter Ads"
hide_platform_selector: true
sections:
- overview
- guide
alias: [ /features/twitter-ads/overview/, /features/twitter-ads/overview/, /features/twitter-ads/guide/ ]
redirect: https://docs.branch.io/pages/deep-linked-ads/twitter/
---

{% if page.overview %}

Configuring Twitter install ads to use Branch links is very simple. The only trick is that you will be using the website click/conversion ads instead of the standard app install ad. Using Branch links allows you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- To track installs from Twitter Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Create a Quick Link on the Branch dashboard

### Add a Quick Link

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Marketing Title** for later reference. For example: "Ad for blue sneakers" {% image src='/img/pages/features/twitter-ads/ad_example_create.png' 3-quarters center alt='Create Quick Link' %}
1. **Channel** and **Campaign** are optional but recommended. **Tags** is free form.

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure ad campaign on Twitter

{% image src='/img/pages/features/twitter-ads/twitter_screenshot_0.png' full center alt='Twitter Ads' %}

### Select campaign type

Go to Twitter and set up a new ad campaign. When selecting the campaign type that you want, select **Website Clicks or Conversions**.

### Set the device targeting

Set the device targeting as desired. 

## Enter Branch Quick Link

On the ad creation card, enter the Branch Quick Link you created in the **Website URL** field.

{% image src='/img/pages/features/twitter-ads/twitter_screenshot_1.png' full center alt='Twitter Ads' %}

## View your data using the Branch dashboard

The [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard shows the performance of each individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs. 

{% image src='/img/pages/features/twitter-ads/marketing_link_row.png' full center alt='Twitter Example Ad' %}

To view more details stats, click the _small button that looks like a bar chart_ on the far right. Note that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

{% image src='/img/pages/features/twitter-ads/click_flow_analytics.png' full center alt='Twitter Example Ad' %}

{% endif %}