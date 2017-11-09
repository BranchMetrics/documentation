---
type: recipe
directory: other
title: Website to App Routing
page_title: Automatically route website users to your app
description: Add powerful, best in class deep linking to your mobile website.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
alias: [ /features/website-to-app-routing/, /features/website-to-app-routing/overview/, /features/website-to-app-routing/guide/, /features/website-to-app-routing/advanced/, /features/website-to-app-routing/support/ ]
redirect: https://docs.branch.io/pages/web/journeys/#web-to-app-routing-without-journeys
---

{% if page.overview %}

If you maintain a mobile website, Branch allows you to deep link mobile visitors directly into your app, or easily and automatically give them the option of downloading it. Here's a diagram that describes how it works:

{% image src='/img/pages/features/website-to-app-routing/deepview-websdk-routing.png' center full alt='Deepviews web routing' %}

{% protip title="If you do not have a mobile website..." %}This feature essentially recreates the functionality of [Deepviews]({{base.url}}/features/deepviews) using your own website. If you do not have one, Deepviews are a good alternative!{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- Your Branch links need to have [fallback control parameters]({{base.url}}/getting-started/configuring-links/guide/#fallback-url-customization). These should point at the URL on your website where you are implementing the steps in this guide. 
{% endprerequisite %}

## Initialize the Deepview SDK on page load

Add the following code somewhere inside the `<head></head>` tags on your website and customize the [link parameters]({{base.url}}/getting-started/configuring-links) to suit your needs.

{% protip %}
What this script does is move a lot of the Branch redirection logic to the Javascript on your own page, effectively 'clicking a Branch link' on page load.
{% endprotip %}

{% highlight html %}
<script type="text/javascript">
// load the Branch SDK file
{% ingredient web-sdk-initialization %}{% endingredient %}
// define the deepview structure
branch.deepview(
    {
      'channel': 'mobile_web',
      'feature': 'deepview',
      data : {
        '$deeplink_path': 'page/1234',
        'user_profile': '7890',
        'page_id': '1234',
        'custom_data': 1234
      }
    },
    {
      'open_app': true  // If true, Branch attempts to open your app immediately when the page loads. If false, users will need to press a button. Defaults to true
    }
);
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Add a Call To Action

Trigger the `branch.deepviewCta()` function with a button or hyperlink on your page. Executing this function (whether by button, link, or some other method) 'clicks' the link you defined using `branch.deepview()` above.

| Platform | Result of Call To Action
| --- | ---
| Mobile, app installed | Open app, deep link directly to content [if configured]({{base.url}}/features/website-to-app-routing/advanced/#deep-linking-from-your-website). This is a failsafe action in case the 'link click' on page load didn't fire correctly.
| Mobile, app NOT installed | Open App Store or Play Store page for your app, deep link directly to content after download [if configured]({{base.url}}/features/website-to-app-routing/advanced/#deep-linking-from-your-website).
| Desktop | Redirect to `$desktop_url` specified in the `deepview()` call, or fall back to your default web url from [Link Settings](https://dashboard.branch.io/#/settings/link).

{% example %}Here's how to add a simple hyperlink call to action:

{% highlight html %}
<a id='downloadapp' onclick='branch.deepviewCta()'>View this in app</a>
{% endhighlight %}
{% endexample %}

{% protip title="Use Journeys" %} If you don't want to build a custom call to action, you can use the Branch [Journeys Platform]({{base.url}}/features/journeys) to achieve the same results.{% endprotip %}

## View the analytics

With your website linking all set up, you can view conversions on the summary tab of [the Branch dashboard](https://dashboard.branch.io). It will look something like this:

{% image src='/img/pages/features/website-to-app-routing/deepview_analytics.png' 2-thirds center alt='Deepviews analytics tab' %}

There are various metrics to understand when deep linking from your mobile website.

- **Views:** a user viewed the mobile site.
- **Clicks:** a user clicked on the Deepview CTA
- **Installs:** a user installed the app for the first time
- **Upgrades:** a user re-opened or upgraded the app from a previous version

Only users who do not have the app will go through this flow. You can view the total counts and conversion rate from each step on this chart.

{% elsif page.advanced %}

## Deep linking from your website

{% prerequisite %}

- For this to function as expected, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

Like all Branch deep links, you can pass custom parameters by specifying keys in the link's [data dictionary]({{base.url}}/getting-started/configuring-links). This is useful if you are running this script on a website page with equivalent in-app content, because you can route directly to that content in your app.

{% example %}This example will take the visitor straight to a picture with id “12345” after installing and opening the app.

{% highlight javascript %}
branch.deepview(options, {
    data: {
        '$deeplink_path': 'picture/12345',
        'picture_id': '12345',
        'user_id': '45123'
    }
});
{% endhighlight %}
{% endexample%}


{% elsif page.support %}

## Troubleshooting

### Calls to [branchdomain] blocked

{% ingredient branchsubdomain %}{% endingredient %}

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'"> 
{% endhighlight %}

{% endif %}