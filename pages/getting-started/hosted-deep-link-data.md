---
type: recipe
directory: getting-started
title: "Hosted Deep Link Data"
page_title: "Hosted Deep Link Data"
description: By hosting deep link data on your website, Branch can automatically retrieve deep link data from any desktop URL.
ios_keywords: Contextual Deep Linking, Deep links, Tune, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
redirect: https://docs.branch.io/pages/web/hosted-data/
---

Make it easy for your marketers to create links! If you host deep link data in your website source code, Branch can automatically convert a simple web URL into a corresponding Branch link that deep links to relevant content in your mobile app.

Furthermore, Branch can reliably parse your Content Analytics data and provide you with more valuable information about which content is driving clicks, installs, opens, and in-app engagement.

{% protip %}
Today, you can use this functionality for [Journeys](https://branch.io/journeys), [Deep Linked Email](https://branch.io/email/), the Branch [Quick Link creator]({{base.url}}/getting-started/creating-links/dashboard) and [Chrome extension]({{base.url}}/getting-started/creating-links/chrome-extension/) - they will all scrape your web URL for deep link data to make link creation even easier.
{% endprotip %}

{% protip title="Using App Links already?" %}

If you already have [Facebook App Links metatags](https://developers.facebook.com/docs/applinks) on your site and working with your app, then you can skip these instructions. Branch will automatically fetch App Links tags and add them to your deep link data.

{% endprotip %}


## Understand your web and app content

The first step to successfully putting deep link data on your website is to understand how your deep links correspond to your web URLs. Ask yourself the following questions, and group your content accordingly.

1. Do you have any content on web that doesn't exist in the app? Examples include: time-sensitive promotions, splash pages, micro-sites.
1. For content that has corresponding app content, what type of pages do you have? Examples include: search result pages, category homepages, product pages.
1. If you've already set up deep linking (if you haven't set up deep linking skip this step): what does your deep linking schema look like? Do you use different keys for different content? Do you have required key/value pairs that aren't content specific? Examples include: `productPage` or `categoryPage` keys, or `product_view=true`.

With this information, you can create a grid of types of content, web URLs, and deep linking schemes:

Content type | Example web URL | Example deep link values
--- | --- | ---
Product page | https://shop.com/shoes/brown-loafers | `productId=1234`, `product_view=true`
Category page | https://shop.com/shoes | `categoryId=5678`
Mother's day promotion | https://shop.com/your-mother-is-great | [No corresponding app content]*

\* If you don't have corresponding app content, you can add the `$web_only=true` parameter to your site. Depending on the link creation mechanism, this means that either the link [will not open the app](/getting-started/configuring-links/guide/#web-only-links), or if it opens the app, you can [write logic to redirect the user to a browser](/getting-started/configuring-links/guide/#link-control-parameters).

{% protip title="Setting up deep linking?"%}
If you're just getting started with deep linking, you have a chance to keep things simple! If you choose one key, and a consistent value that easily maps from the web URL, you can easily create metatags and save yourself work down the line.

For example:

Content type | Example web URL | Example deep link values
--- | --- | ---
Product page | https://shop.com/shoes/brown-loafers | `deeplink=shoes/brown-loafers`
Category page | https://shop.com/shoes | `deeplink=shoes`

{% endprotip %}

## Adding metatags to your site

You can host your deep link data on your website with a metatag in the format `<meta name="branch:deeplink:my_key" content="my_value" />` where `my_key` and `my_value` will become a key value pair in deep link data.

{% example title="Hosted Deep Link Data" %}

Content type | Example web URL | Metatags
--- | --- | ---
Product page | https://shop.com/shoes/brown-loafers | `<meta name="branch:deeplink:productId" content="1234" />`, `<meta name="branch:deeplink:product_view" content="true" />`
Category page | https://shop.com/shoes | `<meta name="branch:deeplink:categoryId" content="5678" />`
Mother's day promotion | https://shop.com/your-mother-is-great | `<meta name="branch:deeplink:$web_only" content="true" />`

{% endexample %}

{% caution title="Do not use Google Tag Manager"%}

Do not use Google Tag Manager (GTM) to insert your content metatags. GTM requires Javascript to load on the page, and the Branch link data scraper does not support Javascript execution at this time.

{% endcaution %}
