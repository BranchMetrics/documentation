---
type: recipe
directory: other
title: "Criteo Dynamic Ads"
page_title: "Advertising with Deep Links: Criteo Dynamic Ads"
description: Learn how to create Criteo Dynamic Ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Criteo App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Criteo Ads, Criteo Authentication
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/criteo-dynamic-ads/, /features/criteo-dynamic-ads/overview/, /features/criteo-dynamic-ads/guide/, /features/criteo-dynamic-ads/support/]
redirect: https://docs.branch.io
---

{% if page.overview %}

Dynamic remarketing campaigns on desktop have been proven to deliver 16x return on ad spend. Now you can easily set up Criteo Dynamic Ads on mobile to drive incredible results.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ensure your app has set up [Universal Links](/getting-started/universal-app-links/guide/ios/) for deep linking with Criteo.
- Use [Branch Deep Linked Feeds](/features/deep-linked-feeds) to create your Criteo Dynamic Advertising deep links.
{% endprerequisite %}

## Connect your account managers

Tell your Branch Account Manager, as well as your Criteo Account Strategist and Criteo Solutions Engineer, that you are looking to use Deep Linked Feeds on Criteo.

## Create a Deep Linked Feed

Branch makes it easy for you to create and manage feeds with Criteo-compatible deep links.

Learn how to [create a Deep Linked Feed](/features/deep-linked-feeds/guide){:target="_blank"}.

It is recommended that you don't include your advanced measurement parameters in your Deep Linked Feed, as Criteo will handle non-Branch measurement links when your campaign is configured.

## Upload your feed to Criteo

There are two ways to send your Deep Linked Feed to Criteo. 

### 1. **Recommended** : Hosted URLs

When setting up your Deep Linked Feed, provide a hosted Feed Source on a URL. This Feed Source should be automatically updated on a regular cadence.

When you have completed creating a Deep Linked Feed from your Feed Source, select ["Schedule Refresh"](/features/deep-linked-feeds/guide/#schedule-refresh){:target="_blank"} and set your Deep Linked Feed to update as often as your Feed Source refreshes. You can also access this screen by finding the feed you want in the Deep Linked Feeds tab, and clicking "View" under the Actions column.

{% image src='/img/pages/features/deep-linked-feeds/getting-dlf.png' 3-quarters center alt='Getting your CSV' %}

{% image src='/img/pages/features/deep-linked-feeds/hosted-dlf.png' 3-quarters center alt='Hosted Deep Linked Feeds' %}

Send your Deep Linked Feed URL to your Criteo account manager, who will use it for your dynamic ad campaigns.

### 2. Send a one-time file to Criteo

You can also send Criteo a file with your Deep Linked Feed. To do this, select "Download CSV" after creating your feed. You can also access this screen by finding the feed you want in the Deep Linked Feeds tab, and clicking "View" under the Actions column.

However, a drawback to this approach is that your feed will not be updated automatically, so we recommend option 1, above.

## Setting up App Events and the Criteo Pixel

We are currently assessing interest for using Branch custom event data for Criteo campaign optimization.

If you're interested in using Branch custom events to send data to Criteo for optimizing campaigns, please contact [Will Lindemann](mailto:w@branch.io).

## Creating a Dynamic Ad Campaign

Your Criteo account manager will be happy to set up your campaign according to your specific optimization goals. 

## View your data using the Branch dashboard

The [Source Analytics page](https://dashboard.branch.io/analytics/source) on the Branch dashboard shows the performance of your dynamic ad campaign. 

The [Content Analytics page](https://dashboard.branch.io/analytics/content) on the Branch dashboard shows the performance of individual pieces of content in your dynamic ad campaigns.

You can find your link listed in the table with a quick summary of the clicks, installs, opens and custom events. 

{% elsif page.support %}

## Advanced measurement and redirection

If you need advanced redirect behavior for tagging, please talk to your Criteo account manager.

{% endif %}
