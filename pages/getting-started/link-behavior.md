---
type: recipe
directory: getting-started
title: Expected Link Behavior
page_title: What you should expect from Branch links
description: Learn about how Branch links work across all different browsers and platforms.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
redirect: https://docs.branch.io/pages/links/integrate/#expected-redirect-behavior
---

Branch links work across hundreds of thousands of edge cases created by different browsers, operating systems and link configuration combinations. Below are some of the most common use cases for Branch links, with notes on the out-of-the-box behavior you should expect.

## iOS mobile link behavior

The following notes assume that your app's [Branch link settings](https://dashboard.branch.io/settings/link){:target="_blank"} have been properly configured for both:

- [URI Schemes]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios#register-a-uri-scheme){:target="_blank"}
- [Universal Links]({{base.url}}/getting-started/universal-app-links/guide/ios/){:target="_blank"}

### Behavior when the app is installed

Note that what we describe here assumes that the app, or the link being tapped, has been configured to support Branch's default "Open in the App Store" behavior. If the app or link has instead been configured to redirect to a custom URL, the scenarios described will be identical with the difference that the user will be redirected to the custom URL instead of to the App Store.

Also, note that Universal Links were only introduced with iOS 9. Consequently, devices running iOS versions prior to version 9 fully support URI Schemes but do not support Universal Links and may not behave as described here.

| App/Browser | Link Behavior
| --- | ---
| iMessage | Opens app via Universal Link
| Notes | Opens app via Universal Link
| Mail | Opens app via Universal Link
| Gmail | Opens app via Universal Link
| Safari click | Opens app via Universal Link
| Safari paste-in | Will redirect to the App Store *
| Chrome click | Opens app via URI scheme
| Chrome paste-in | Opens app via URI scheme
| Facebook | Will redirect to the App Store ** 
| Facebook Messenger | Will redirect to the App Store **
| Twitter | Opens app via a URI scheme
| Pinterest | Opens app via a URI scheme
| Snapchat Message Link | Will redirect to the App store **
| Snapchat Story Link | Can only go to websites. Snapchat has deviously blocked all links out, even to the App Store

(*) Note that when links are entered into the Safari address bar: 

1. Apple blocks all deep linking attempts and prohibits Universal Links from functioning properly, meaning users will always be redirected to the App Store
2. Entering a Branch link into the address bar and appending query parameters may result in strange behavior due to [Safari pre-fetching](http://stackoverflow.com/a/37358674/5394680)

(**) If you are planning to use Facebook as your primary channel for distributing Branch links and most of your link clicks will be coming from users who already have the app installed, we recommend that configuring [iOS Deepviews]({{base.url}}/features/deepviews/guide/ios/) or using a [Journeys app banner]({{base.url}}/features/journeys/overview/) on your own site. The 'Open App' call-to-action buttons that are found on Deepviews and on Journeys app banners function as Universal Links. Branch does not display Deepviews by default because when they are configured, Facebook will always display a modal dialog asking the user to confirm that they want to Leave Facebook. If the app is not installed, the modal doesn't do anything and this results in a poor user experience.

### Behavior when the app is not installed

Branch links are generally intended to direct users to the App or Play Store when the associated app is not installed on a device. Links can also be configured to redirect to other URLs if desired. Branch's fallback functionality will work the same in these situations, with the only difference being that the user will be redirected to the specified alternate URL instead of the App or Play Store.

| App/Browser | Link Behavior
| --- | ---
| Safari 10.3+ | Shows a [passive deepview]({{base.url}}/features/deepviews/advanced/ios/#enabling-deepviews-for-one-link) while redirecting to App Store.
| Facebook | Shows a [passive deepview]({{base.url}}/features/deepviews/advanced/ios/#enabling-deepviews-for-one-link) while redirecting to App Store.
| Pinterest | Shows a Branch Deepview *
| All other apps/browsers | Redirects to App Store

(*) We show a Branch Deepview when users tap on links in Pinterest because tapping on the Deepview's CTA button will successfully open the app. The alternative behavior would be to always redirect to the App Store from these browsers. We don't do this on Facebook.

## Android mobile link behavior

The following assumes that you've correctly configured your [Branch link settings](https://dashboard.branch.io/settings/link){:target="_blank"} with the following:

- Your app's [URI schemes]({{base.url}}/getting-started/sdk-integration-guide/advanced/android#register-a-uri-scheme){:target="_blank"}
- Your app's package name

### App installed

| App/Browser | Link Behavior
| --- | ---
| Gmail | Opens app via Chrome intent
| Chrome click | Opens the app via Chrome intent
| Chrome paste-in | Will show a Chrome error *
| Facebook | Opens app via URI scheme intent
| Facebook Messenger | Opens app via URI scheme intent
| Twitter | Opens app via URI scheme intent
| Pinterest | Opens app via URI scheme intent
| Hangouts | Opens app via Chrome intent
| Google+ | Opens app via Chrome intent
| Snapchat Message Link | Will redirect to the Play Store
| Snapchat Story Link | Can only go to websites. Snapchat has deviously blocked all links out, even to the Play Store

### App - not - installed

| App/Browser | Link Behavior
| --- | ---
| All apps/browsers | Redirects to Play Store

## Desktop (non-mobile) link behavior

Branch's default desktop behavior is to load a fully hosted text-me-the-app page as shown below. We wrapped Twilio for you, so your users can text themselves the app.

{% image src='/img/pages/getting-started/link-behavior/default-desktop.png' half center alt='Desktop SMS to download' %}

You have a few options for customization here:

- Customize the hosted page using [desktop deepviews]({{base.url}}/features/deepviews/guide/)
- Replace it with your own website by overriding the desktop redirect (global in link settings or per link using `$desktop_url`)

