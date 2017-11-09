---
type: recipe
directory: marketing-channels
title: Sailthru
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
premium: true
sections:
- overview
- setup
- usage
- support
contents:
  number:
    - setup
    - usage
alias: [ /third-party-integrations/sailthru/overview/, /third-party-integrations/sailthru/overview/, /third-party-integrations/sailthru/setup/, /third-party-integrations/sailthru/usage/, /third-party-integrations/sailthru/support/ ] 
machine_name: e_st
redirect: https://docs.branch.io/pages/emails/sailthru/
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

You can retrieve your click tracking domain from your Sailthru settings:

1. Log in to your Sailthru account
1. Go to Settings > Setup > Domains: {% image src='/img/pages/third-party-integrations/sailthru/sailthru-view-domain.png' full center alt='xcode add domain' %}
1. Note or copy the value in the Link Domain field
1. Enter the domain in item 1 of this step: {% image src="/img/pages/third-party-integrations/sailthru/configure-sailthru-1.png" center full alt='Click tracking domain' %}
1. Click **Done**

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{% ingredient email-send-aasa %}{% endingredient %}

{% ingredient email-technical-setup %}{% endingredient %}

### Upload your AASA file

Sailthru will host an Apple App Site Association (AASA) file for you, so that your click tracking domain appears to Apple as a Universal Link, and the app will open and deep link.

To set up your AASA file, download the AASA file from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), and follow the [instructions provided by Sailthru](https://getstarted.sailthru.com/mobile/apple-ios-app-universal-links/){:target="_blank"} for setting up the HTTPS certificates.

{% ingredient email-associated-domains %}{% endingredient %}

{% ingredient email-bounce-web %}{% endingredient %}

{% ingredient email-validate-test %}{% endingredient %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

{% ingredient email-usage %}{% endingredient %}

## Options for generating Branch links for email

There are a few different ways you can create Branch links that are compatible with Deep Linked Email + {{ page.title }}. You will need to replace the web URLs in your templates with these. To create Branch links, you can either:

1. [Automatically populate emails with content via Zephyr](#automatically-populate-emails-with content-via-zephyr)
1. [Making regular Branch links compatible with email](#making-regular-branch-links-compatible-with-email)
1. [Create email links via API without changing your email templates](#create-email-links-via-api-without-changing-your-email-templates)
1. [Convert all web links in your email to deep links](#convert-all-web-links-in-your-email-to-deep-links)

### Automatically populate emails with content via Zephyr

Sailthru allows you to automatically populate emails with content via Zephyr. This means that you can create a template once, then have all subsequent emails automatically configured to convert normal web URLs into deep links.

The Sailthru integration requires you to add code in two places:

1. At the top of an email template
1. Immediately before a hyperlink

#### Prepare your template

At the top of each email template, you should simply copy and paste the following snippet. It specifies a variable that is used to automatically contruct deep links, `branch_base_url`. This snippet will be provided by your Branch Account Manager.

Copy the below snippet and paste it above the `<head>` tag:

{% highlight html %}
{branch_base_url='BASE URL FROM BRANCH'}
{% endhighlight %}

Enter the base url provided by your Branch account manager.

{% example %}
{% highlight html %}
{branch_base_url='http://bnc.lt/abcd/3p?%243p=e_st'}
{% endhighlight %}
{% endexample %}


#### Create deep links
Before each hyperlink, you’ll need to include a short amount of code. Put the original link (which will automatically be converted to a deep link) on the first line of the code snippet.

Before:

{% highlight html %}
<a href="ORIGINAL URL">Click me</a>
{% endhighlight %}

After:

{% highlight html %}
{link='ORIGINAL URL'}

{*Branch deeplink builder*}{deeplink=branch_base_url + "&%24original_url=" + u(link)}{*end Branch deeplink builder*}

<a href="{deeplink}">Click me</a>
{% endhighlight %}

{% example %}
{% highlight html %}
{link='http://example.com/?utm=y'}

{*Branch deeplink builder*}{deeplink=branch_base_url + "&%24original_url=" + u(link)}{*end Branch deeplink builder*}

<a href="{deeplink}">Click me</a>
{% endhighlight %}
{% endexample %}


{% image src="/img/pages/third-party-integrations/sailthru/deep-linked-email-sailthru.png" center full alt='Deep Linked Email Sailthru Example' %}

{% protip title="Using Branch Links with Zephyr" %}
The Branch deep link script also works with Sailthru's Zephyr personalization language. Here's an example with the correct syntax.

{% highlight html %}
{link=content[0].url}

{*Branch deeplink builder*}{deeplink=branch_base_url + "&%24original_url=" + u(link)}{*end Branch deeplink builder*}

<a href="{deeplink}">Click me</a>
{% endhighlight %}

{% endprotip %}

{% ingredient email-link-options %}{% endingredient %}

{% ingredient email-usage-bounce %}{% endingredient %}

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}
