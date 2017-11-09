---
type: recipe
directory: other
title: Chrome Extension
page_title: Branch Chrome Extension
description: Every app is assigned a custom app.link subdomain. Learn how to use this when setting up your Branch configuration
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Chrome Extension, Simple Deep Links
hide_platform_selector: true
sections:
- guide
alias: [ /features/chrome-extension/, /features/chrome-extension/guide/ ]
redirect: https://docs.branch.io/pages/links/integrate/#short-links
---

{% if page.guide %}

The Branch Chrome Extension makes it very easy for you to create new links, and easily share via any channel for marketing purposes. In the guide below, we'll explain how to get set up and start linking!

{% image src='/img/pages/features/chrome-extension/chrome-extension-overview.png' 2-thirds center alt='Chrome extension example' %}

## One time setup

You must be using Chrome as your browser, as this extension will not work on any other. Apologies for the inconvenience.

### Install the extension

Head to the Chrome Web Store and install the `Branch Link Creator`. You can find it [here](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf).

### Enter your Branch key

Once installed, click the Branch icon at the top right corner. It will show you the following screen:

{% image src='/img/pages/features/chrome-extension/chrome-no-key.png' half center alt='enter key' %}

You can retrieve the Branch key associated with the account you'd like create links for on the main settings page of your [dashboard](https://dashboard.branch.io/settings). Please copy the one starting with `key_live_...` and paste it into the extension. Hit save when you are done.

## Ongoing Branch link creation

Any time you want to create a new Branch link, just do the following:
1. Visit the website you'd like to create a link to
2. Click the Branch icon in the top right

A link will automatically be created for this website.

### Properties of these links

The links will automatically configured with the following properties:

| **Property** | **Value** |
| ---: | --- |
| **type** | 2 - Quick Link by default
| **marketing title** | Automatically set to "Link to: <your website URL>"
| **$fallback_url** | the website URL
| **auto_fetch** | true: we'll automatically scrape the website to pull in app links tags and deep link routing info

### Viewing the click data

Since these links are automatically added to the marketing tab of your dashboard, you can easily view the performance by heading to [there](https://dashboard.branch.io/quick-links). If you have the SDK integrated, you'll be able to track installs and re-opens. Clicks will be visible always.

{% image src='/img/pages/features/chrome-extension/link-performance.png' half center alt='link performance' %}

{% endif %}
