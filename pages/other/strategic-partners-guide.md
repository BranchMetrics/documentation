---
type: recipe
directory: other
exclude_from_google_search: true
title: "Strategic Partners Guide"
page_title: Branch Preferred Partner (Whitelabel) Guide
description: Learn how to create white-labeled Branch accounts for your customers.  Give your clients best-in-class deep linking while keeping your branding intact! 
keywords: white-label, Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
hide_platform_selector: true
sections:
- overview
- guide
alias: [ /third-party-integrations/strategic-partners-guide/, /third-party-integrations/strategic-partners-guide/overview/, /third-party-integrations/strategic-partners-guide/guide/ ]
redirect: https://docs.branch.io
---

{% if page.overview %}

If you are a company that wants to include the Branch deep linking and attribution as part of your broader product offering, in a white label format, you can build as complex or as simple integration as you need.  We have APIs to do everything from create and configure Branch apps, to create links automatically, to collect and report on the clicks and install data.

{% protip title="Branch Strategic Partners Program" %}
To learn more about becoming a Branch Strategic Partner, please [click here](https://branch.io/strategic-partners/)
{% endprotip %}

{% elsif page.guide %}

## Create a Branch key and configure redirection.

### Retrieve your Branch Preferred Partner user_id

First, you will need a Branch partner token that gives you the ability to create Branch apps via the API. You can, of course, create apps via the normal signup form and dashboard manually without this. It's required for the API access though.

Send a note to [integrations@branch.io](mailto:integrations@branch.io) to request the `user_id` token. The token will be in the form of a long series of numbers like this: `19190933253783894`.

### Create and update the Branch app config

The Branch configuration is where you define all of the default link routing behavior and more. Most of these settings are configured in the [settings page on the dashboard](https://dashboard.branch.io/#/settings), but you can control all of them via an API with these endpoints:

1. **[Create an app](https://github.com/BranchMetrics/Deferred-Deep-Linking-Public-API#creating-a-new-branch-app-config)**
2. **[Update a pre-existing app](https://github.com/BranchMetrics/Deferred-Deep-Linking-Public-API#updating-a-branch-app-config)**
3. **[View an app](https://github.com/BranchMetrics/Deferred-Deep-Linking-Public-API#creating-a-new-branch-app-config)**

## Integrate the SDK and create links

First, you'll need to decide what you're going to build and implement in all of the apps you create. 

### Add the SDK

We support all major development platforms. The SDK can be integrated in about 5 minutes for each. Please find the details in the **[SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide)**.

### Share Branch links from the app

One of the most common uses of Branch is to dynamically create Branch links for your users to share. You can configure these links to contain all of the metadata that you need for deep linking and reference later. Please find the details on building a sharing or invite feature in the **[Content Sharing page]({{base.url}}/features/content-sharing)**.

### Create Branch links

If you want to create links manually or via the API, there many mechanisms to do so. Here are links to describe the most common ways for doing so:

1. **[Via the API]({{base.url}}/getting-started/creating-links/other-ways#http-api)**
2. **[By appending query params]({{base.url}}/getting-started/creating-links/other-ways#appending-query-parameters)**
3. **[On the dashboard]({{base.url}}/getting-started/creating-links/dashboard)**

### Use the Web SDK (Smart banner or SMS-to-download)

If you want to configure the web SDK on your site, it's a few lines of code depending on the feature you're interested in. Here is a list of the most commonly used features:

1. **[Journeys Web To App Platform]({{base.url}}/features/journeys)**
2. **[Desktop SMS to download]({{base.url}}/features/text-me-the-app)**

## Receive or monitor Branch data for your apps

Branch is constantly collecting install, open and custom events via the SDKs. We attribute these events back to the referring link and make all of this data available via our dashboard or webhook system.

### Create a webhook for clicks and installs

If you have some central server that you'd like to receive data for, you can create a webhook directly on the dashboard. If you want to just receive all data, we recommend you create a webhook for the event name `*`, which is our wildcard. This means we'll send everything. Here's a list of ways to create webhooks per apps:

1. **[Create webhook via API](https://github.com/BranchMetrics/Deferred-Deep-Linking-Public-API#creating-a-dynamic-reward-rule)**
1. **[Create on dashboard]({{base.url}}/getting-started/webhooks/guide)**

The spec for what we send can be seen [here]({{base.url}}/getting-started/webhooks/advanced/#postback-syntax).

### Monitoring the Branch dashboard

The `user_id` that you use to create Branch apps with will automatically be given access to the dashboard of any app you create. If you visit **[dashboard.branch.io](https://dashboard.branch.io)**, you can use the pulldown in the top right corner of the screen. You can search by app name or Branch key or really any value associated with the app.

{% endif %}