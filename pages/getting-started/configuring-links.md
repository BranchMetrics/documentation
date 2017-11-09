---
type: recipe
directory: getting-started
title: Configuring Links
page_title: Configuration options for Branch links
description: Learn about the properties and customizations that are available when creating Branch links for iOS and Android apps.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to, Standards, Web SDK, SDK
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
redirect: https://docs.branch.io/pages/links/integrate/
---

Every Branch link that you create is completely customizable from a functionality perspective. Here are the key variables for customization.

{% protip title="Link Configuration vs. Link Creation" %}
This page describes how to use the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters Branch offers. You can read about how to actually create Branch links in the [Creating Links]({{base.url}}/getting-started/creating-links) guide.
{% endprotip %}

## The data structure of Branch links

Conceptually, the data inside a Branch link follows this model:

{% highlight js %}
{
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    alias: 'myalias',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}
{% endhighlight %}

{% protip title="Points to understand" %}

- Analytics labels and certain parameters related to the link itself are specified at the top level. These include `channel`, `feature`, `campaign`, `stage`, `tags`, `alias`, `duration`, and `type`, and are documented in the [Link creation customizations]({{base.url}}/getting-started/configuring-links/guide/#link-creation-customizations) section of this page.
- All other parameters (essentially everything prefixed with `$`) go inside the `data` dictionary.
- Any custom data you specify also goes inside the `data` dictionary.

While the mobile SDKs manage this structure automatically, the [Web SDK]({{base.url}}/getting-started/creating-links/other-ways/#web-sdk) and [HTTP API]({{base.url}}/getting-started/creating-links/other-ways/#http-api) do not. It is important to keep this in mind when working with these.

{% endprotip %}

## Link data dictionary

Every Branch link includes a dictionary of `key : value` pairs that is specified by you at the time the link is created. Branch's SDKs make this data available within your app whenever the app is opened via a Branch link click. Read more about how to populate Branch links with data in the [Creating Links]({{base.url}}/getting-started/creating-links) guide.

## Link creation customizations

### Analytics labels

Use analytics labels to help _organize your data_. Track updates, run A/B tests and measure the effectiveness of different channels using these labels.

{% ingredient analytics-labels %}{% endingredient %}

### Other parameters

| Key | Usage | Default
| --- | --- | ---
| alias | Specify a link alias in place of the standard encoded short URL (e.g., `[branchsubdomain]/youralias` or `yourdomain.co/youralias`). Link aliases are unique, immutable objects that cannot be deleted. **Aliases on the legacy `bnc.lt` domain are incompatible with [Universal Links]({{base.url}}/getting-started/universal-app-links) and [Spotlight]({{base.url}}/features/spotlight-indexing)**
| duration | *(Deprecated. Use `$match_duration`)* Lets you control the snapshotting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds | `7200`
| type | *(Advanced)* Set to `1` to limit deep linking behavior of the generated link to a single use. Set type to `2` to make the link show up under [Marketing page](https://dashboard.branch.io/#/marketing) in the dashboard | `0`

{% ingredient branchsubdomain %}{% endingredient %}

## Link control parameters

These parameters are used to customize the functionality of each individual Branch link, either by specifying a property or overriding a global default.

### Redirect customization

The redirect destinations are completely customizable for every link that you create.

#### Fallback URL customization

| Key | Usage | Default
| --- | --- | ---
| $fallback_url | Change the redirect endpoint for _all_ platforms - so you don't have to enable it by platform. Note that Branch will forward all robots to this URL, overriding any OG tags entered in the link. | System-wide Default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$desktop_url** | Change the redirect endpoint on desktops | Text-Me-The-App page (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $ios_url | Change the redirect endpoint for iOS | App Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $ios_has_app_url | Change the redirect endpoint for iOS _only for users that Branch knows to have the app installed_ | App Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $android_url | Change the redirect endpoint for Android | Play Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$windows_phone_url** | Change the redirect endpoint for Windows OS | Windows Phone default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $blackberry_url | Change the redirect endpoint for Blackberry OS | BlackBerry default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $fire_url | Change the redirect endpoint for Amazon Fire OS | Fire default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $ios_wechat_url | Change the redirect endpoint for WeChat on iOS devices | `$ios_url` value
| $android_wechat_url | Change the redirect endpoint for WeChat on Android devices | `$android_url` value

#### Country-specific redirects

You can redirect your users differently depending on their location when clicking the link.

| Key | Usage
| --- | ---
| $fallback_url_{xx} | xx is a lower-case Alpha-2 country code conforming to the [ISO 3166](https://www.iso.org/obp/ui/#search) standard format. (e.g. `$fallback_url_de` for Germany)

You may add **more** than one country-specific redirect to your link data. Note, that you need to supply a `$fallback_url` to act as the global redirect in addition to the country-specifc ones.

{% caution %}
OS-specifc redirects in your link data (e.g. `$ios_url`) will take precedence over country-specific ones.
{% endcaution %}

#### After click redirect

This lets you customize where Branch will redirect a user's web view after opening up the app or app store. The alternative is that in some configs, we leave a white screen.

{% caution %}
This parameter is currently supported only on iOS.
{% endcaution %}

| Key | Usage
| --- | ---
| $after_click_url | URL redirect to after the main click redirect has completed

#### Web-only links

Web-only links are Branch links that redirect the user to the web *even if the app is installed*. When creating the link, add `$web_only: true` to the deep link data.

Web-only links are distinguished by the presence of an `/e/` (short for "exclusion") between the Branch link domain portion of the link and the link's alpha-encoded unique identifier or alias. Such links are not added to the apple-app-site-association file generated for custom and app.link domains. Note that bnc.lt links will not have `/e/` in the URL, but will instead revert to their non-Universal form, `/m/`.

When you create an aliased web-only link, the alias will apply to both forms of the link. The links `myapp.app.link/myalias` and `myapp.app.link/e/myalias`, then, are the same link, though the web-only form will not open the app on a mobile device even if the app is installed.

{% caution %}
This parameter does not work with [Android App Links]({{base.url}}/getting-started/universal-app-links/).
{% endcaution %}

| Key | Value | Default
| --- | --- | ---
| $web_only | true/false | false (not specified)

{% protip title="Do you use Branch links in email?" %}
Note: when Branch links are wrapped in email service provider click-tracking URLs the web-only parameter may not function as intended, as the email service provider controls how click-tracking links are created.
{% endprotip %}


### Link behavior customization

#### Control parameters

Use these keys to control how URI scheme deep linking functions when opening your app from a link.

{% caution title="Incomplete support on iOS" %}
[Universal Links]({{base.url}}/getting-started/universal-app-links) and [Spotlight]({{base.url}}/features/spotlight-indexing) do not support deep linking via URI paths. If you use `$deeplink_path` or `$ios_deeplink_path`, you will need to implement some custom logic. [Click here for more information]({{base.url}}/getting-started/universal-app-links/advanced/ios/#how-to-handle-uri-paths-with-universal-links).
{% endcaution %}

| Key | Usage | Default
| --- | --- | ---
| $deeplink_path | Set the deep link path for _all_ platforms - so you don't have to enable it by platform. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within | `open?link_click_id=1234`
| $android_deeplink_path | Set the deep link path for Android apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within | *null*
| $ios_deeplink_path | Set the deep link path for iOS apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within | *null*
| **$match_duration** | Lets you control the snapshotting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds | `7200` (2 hours)
| $always_deeplink | Set to `false` to make links always fall back to your mobile site. Does not apply to Universal Links or Android App Links. We recommend using `$web_only: false` in place of `$always_deeplink: false`. | `true`
| $ios_redirect_timeout | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds | `750`
| $android_redirect_timeout | Control the timeout that the clientside JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds | `750`
| $one_time_use | Set to 'true' to limit deep linking behavior of the generated link to a single use. Can also be set using `type` | `false`
| $custom_sms_text | Text for SMS link sent for desktop clicks to this link. Must contain `{% raw %}{{ link }}{% endraw %}` | Value of **Text me the app page** in [Settings](https://dashboard.branch.io/settings)
| $marketing_title | Sets the Marketing Title for the deep link in the [Marketing page](https://dashboard.branch.io/quick-links) of the dashboard | *null*

#### Triggering links from within an iFrame

Note that on iOS 9 and 10, Apple has tough restrictions around redirecting from within an iFrame. If you need to trigger a Branch link from an iFrame, we recommend that you use the following:

{% highlight js %}
window.open(<Branch link here>);
{% endhighlight %}

### Deepviews

Control [Deepviews]({{base.url}}/features/deepviews) on a link-by-link basis.

| Key | Value | Default
| --- | --- | ---
| $ios_deepview | The name of the deepview template to use for iOS | `default_template`
| $android_deepview | The name of the deepview template to use for Android | `default_template`
| $desktop_deepview | The name of the deepview template to use for the desktop | `default_template`

## Display customization

{% protip title="Use the BranchUniversalObject if possible!" %}
Most of these parameters can also be specified using the [BranchUniversalObject]({{base.url}}/getting-started/branch-universal-object). This is the preferred method, if available on your platform.
{% endprotip %}

### Content indexing controls

Currently, parameters determine how your content is listed on all public search portals via Branch's app content sitemap. We compile all public links into a sitemap once you've enabled `Google App Indexing` on the Branch dashboard.

| Key | Usage | Default
| --- | --- | ---
| $publicly_indexable | If this content should be public and discovered by other apps. `1` indicates public, and `0` indicates private | `1`
| $keywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use
| $canonical_identifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
| $exp_date | The date when the content will not longer be available or valid
| $content_type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)

### Open Graph tags

If you do not specify a primary OG tag when creating a link, Branch will perform a one-time scrape of your **$desktop_url** (if set) and attempt to retrieve it.

| Key | Usage | Scraped?
| --- | --- | ---
| $og_title | Set the title of the link as it will be seen in social media displays | yes
| $og_description | Set the description of the link as it will be seen in social media displays | yes
| $og_image_url | Set the image of the link as it will be seen in social media displays | yes
| $og_image_width | Set the image's width in pixels for social media displays | yes
| $og_image_height | Set the image's height in pixels for social media displays | yes
| $og_video | Set a video as it will be seen in social media displays
| $og_url | Set the base URL of the link as it will be seen in social media displays
| $og_type | Set the type of custom card format link as it will be seen in social media displays
| $og_redirect | *(Advanced, not recommended)* Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags
| $og_app_id | *(Rarely used)* Set the OG App ID tag

### Twitter specific

| Key | Usage
| --- | ---
| $twitter_card | Set the Twitter card type of the link
| $twitter_title | Set the title of the Twitter card
| $twitter_description | Set the description of the Twitter card
| $twitter_image_url | Set the image URL for the Twitter card
| $twitter_site | Set the site for Twitter
| $twitter_app_country | Set the app country for the app card
| $twitter_player | Set the video player's URL. Defaults to the value of `$og_video`.
| $twitter_player_width | Set the player's width in pixels
| $twitter_player_height | Set the player's height in pixels

### Custom Tags

You may specify custom tags by adding the following parameter to your link data.

| Key | Value
| --- | ---
| $custom_meta_tags | Valid stringified JSON dictionary of the tags' keys and values

- Valid dictionary example: `"{\"twitter:player:stream\": \"https://branch.io\"}"`. This will result in the following meta tag
    `<meta property="twitter:player:stream" content="https://branch.io" />`
- If you create the link via the Dashboard, don't worry about stringifying the dictionary. It will be done automatically.
- `apple_touch_icon` is a special key in the dictionary. If you set it, we will add a `<link rel="apple-touch-icon" href="<url>" />` tag to the scraped HTML page.
This will allow you to show a custom icon for previews in iMessage, Safari Bookmarks, Slack, etc.

## Appending query parameters to links

### Branch parameters

In addition to specifying parameters when creating a link, you can also append any of them on a case-by-case to the URL of a generated link.

To pass a key/value pair of `$deeplink_path : article/jan/123` on a specific instance of a link:

{% highlight sh %}
https://[branchsubdomain]/l/3HZMytU-BW?$deeplink_path=article%2Fjan%2F123
{% endhighlight %}

The following parameters can **only** be specified by appending to a link:

| Key | Usage | Default
| --- | --- | ---
| has_app | Set to 'true' or 'false' in order to tell us whether you want us to try to open up the app for this particular link or not. Functionally identical to `$always_deeplink` | `true`
| debug | Set to 'true' to route to a link debug page that shows the labels and configuration of a link | Value of **Always try to open app** in [Link Settings](https://dashboard.branch.io/#/settings/link)

### Custom parameters

If you append your own custom query parameters to a link, this data will also be captured and passed through when you initiate a Branch session.

To pass a key/value pair of `myparameter : testvalue` on a specific instance of a link:

{% highlight sh %}
https://[branchsubdomain]/l/3HZMytU-BW?myparameter=testvalue
{% endhighlight %}
