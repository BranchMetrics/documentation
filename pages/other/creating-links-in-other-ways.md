---
type: recipe
directory: other
title: Creating Links in Other Ways
page_title: How to create Branch links in other ways
description: Learn about the multiple ways to create Branch deep links for iOS and Android apps.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
hide_platform_selector: true
hide_section_selector: true
platforms:
sections:
- guide
exclude_from_google_search: true
alias: [ /getting-started/creating-links-in-other-ways/ ]
redirect: https://docs.branch.io/pages/links/integrate/#create-deep-links
---

Links are the foundation of everything Branch offers. There are many ways to create links, depending on your needs.

{% protip %}
If you want to create links inside your app (to share content or invite users, for example), see the [Creating Links in Apps page]({{base.url}}/getting-started/creating-links/apps).

You can read more about using the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters used throughout this page on the [Configuring Links page]({{base.url}}/getting-started/configuring-links).
{% endprotip %}

## Dashboard

You can create links on the [Marketing page](https://dashboard.branch.io/#/marketing) of the Branch dashboard. Many link parameters can be configured using this UI, and most others can be manually specified under the _Deep Linking_ section.


## Appending query parameters

You can dynamically append additional query parameters to any existing Branch link, or even build a new Branch link by appending query parameters to the base link domain (this method can be useful if you don't want to wait for a server callback and don't care whether the link is short or not because you won't be displaying it to users).

{% ingredient branchsubdomain %}{% endingredient %}

1. Start with an exiting Branch link, or your Branch link domain: **http://[branchsubdomain]**.
1. Append `?` to start the query params string: **http://[branchsubdomain]?**
   - If you're creating a new link and and you're using the legacy `bnc.lt` domain or a custom domain/subdomain as the base for your links, instead append `/a/your_Branch_key?`: **http://bnc.lt/a/your_branch_key?**
1. [optional] Append any additional key/value pairs, and analytics or link control parameters.

{% example %}

Here's an example of a finalized dynamic link (line breaks added for legibility):

{% highlight sh %}
https://[branchsubdomain]?
  %24deeplink_path=article%2Fjan%2F123&
  %24fallback_url=https%3A%2F%2Fgoogle.com&
  channel=facebook&
  feature=affiliate&
  user_id=4562&
  name=Alex
{% endhighlight %}

The following keys have been embedded:

| Key | Value |
| --- | --- |
| **$deeplink_path** | article/jan/123 |
| **$fallback_url** | https://google.com |
| **channel** | facebook |
| **feature** | affiliate |
| **user_id** | 4562 |
| **name** | Alex |

{% endexample %}

{% caution title="Link URL considerations" %}
1. Don't forget to URL encode everything, otherwise the link will break.
1. If any of your links use the legacy `bnc.lt` domain be sure to include your custom domain **and** `bnc.lt` when configuring the [Associated Domains entitlement]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-your-branch-link-domains) for iOS Universal Links.

{% endcaution %}

### URL formats by base domain type

| Link Type | bnc.lt | wxyz.app.link | customdomain.com |
| --- | --- | --- | --- |
| New link | https://bnc.lt/a/key_live_xxxxxxxxxxxxxxx?param=value | https://wxyz.app.link?param=value | https://customdomain.com/a/key_live_xxxxxxxxxxxxxxx?param=value
| Existing SDK link | https://bnc.lt/wxyz/KDSYTMnSZs?param=value | https://wxyz.app.link/KDSYTMnSZs?param=value | https://customdomain.com/wxyz/KDSYTMnSZs?param=value
| Existing Quick Link | https://bnc.lt/linkslug?param=value | https://wxyz.app.link/linkslug?param=value | https://customdomain.com/linkslug?param=value

## Web SDK

You can use the Branch Web SDK to create links in several ways:

- [Text-Me-The-App]({{base.url}}/features/text-me-the-app)
- [Journeys Web To App Platform]({{base.url}}/features/journeys)
- [Website To App Routing]({{base.url}}/features/website-to-app-routing)

#### Link() function

A basic `link()` function is also available for custom implementations:

{% highlight js %}
branch.link({
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$ipad_url': 'http://myappwebsite.com/ipad',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}, function(err, link) {
    console.log(err, link);
});
{% endhighlight %}

##### Callback Format

{% highlight js %}
callback(
    "Error message",
    'https://[branchsubdomain]/l/3HZMytU-BW' // Branch shortlink URL
);
{% endhighlight %}

## HTTP API

If you want to build something custom, you can generate links by querying the Branch API directly. Here is an example CURL call:

{% highlight sh %}
curl -X POST \
-H "Content-Type: application/json" \
-d '{"branch_key":"key_live_jfdweptNITtAY5HVY3mBSojopgfGf8qQ",
"sdk":"api",
"campaign":"announcement",
"feature":"invite",
"channel":"email",
"tags":["4"],
"data":"{\"name\":\"Alex\",\"email\":\"alex@branch.io\",\"$desktop_url\":\"https://branch.io\"}"
}' \
https://api.branch.io/v1/url
{% endhighlight %}

This will return Branch shortlink:

{% highlight sh %}
{"url":"https://[branchsubdomain]/m/BqmToC9Ion"}
{% endhighlight %}