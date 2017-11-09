---
type: recipe
directory: marketing-channels
title: Epsilon
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
alias: [ /other/epsilon-harmony/, /other/epsilon-harmony/overview/, /other/epsilon-harmony/setup/, /other/epsilon-harmony/usage/, /other/epsilon-harmony/support/ ]
machine_name: e_ep
redirect: https://docs.branch.io/pages/emails/epsilon/
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

You can retrieve your click tracking domain from your {{page.title}} settings. We recommend creating a new click tracking domain for the Epsilon Harmony integration. You can switch over your production click tracking domain to Epsilon but we recommend testing with a different domain to get started.

For Epsilon, you may also need an IP address. Notify your Epsilon Harmony Account Manager that you plan to use Branch Deep Linked Email, and ask your Harmony Account Manager to provide the IP that you set your click tracking domains to. Add that next to your click tracking domain in this step.

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{% ingredient email-technical-setup %}{% endingredient %}

### Set up your click tracking domain

Only do this step after you've [provided your click tracking domain](#tell-us-your-click-tracking-domain) to Branch.

1. Create a CNAME for your subdomain and point it to `epsilon.thirdparty.bnc.lt`
1. Confirm with your Branch Account Manager that the domain is working correctly.

{% ingredient email-associated-domains %}{% endingredient %}

{% ingredient email-bounce-web %}{% endingredient %}

{% ingredient email-validate-test %}{% endingredient %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

{% ingredient email-usage %}{% endingredient %}

## Options for generating Branch links for email

There are a few different ways you can create Branch links that are compatible with Deep Linked Email + {{ page.title }}. You will need to replace the web URLs in your templates with these. To create Branch links, you can either:

1. [Configure your Epsilon Harmony Content ](#configure-your-epsilon-harmony-content)
1. [Making regular Branch links compatible with email](#making-regular-branch-links-compatible-with-email)
1. [Create email links via API without changing your email templates](#create-email-links-via-api-without-changing-your-email-templates)
1. [Convert all web links in your email to deep links](#convert-all-web-links-in-your-email-to-deep-links)

### Configure your Epsilon Harmony Content 

This code is referred to as the "Branch script" - this script will convert your web URLs to deep links. 

Get your Branch base URL from the email tab in the dashboard or from your Branch account manager.

The Harmony integration requires you to add email template code in two places with HTML content.

1. At the top of an email template
2. Immediately before a hyperlink

Copy the following snippet, and using the “Source” view (ie not the design view), paste the snippet directly under the `<body>` tag for every template you plan to add deep linking to.

{% highlight html %}
[#assign branch_base_url='appsolutely.app.link/3p?%243p=e_ep&%24original_url=']
{% endhighlight %}

Remember to get the value of `branch_base_url` from the Branch dashboard or from your account manager and to exclude `https://` from it when entering it in to the assign statement. 

#### Create deep links

Wherever you are using `<a>` tags in your email templates, replace it with these two lines.

{% example%}

**Before:**

{% highlight html %}
<a href=“https://branch.io”>Example link</a>
{% endhighlight %}

**After:**

{% highlight html %}
[#assign original_url='https://branch.io'][#assign branch_final_url=branch_base_url + original_url]
<a href="https://$(branch_final_url)">Link</a>
{% endhighlight %}

{% endexample %}

Here is how links look before and after (the latter being a Branch deep link).

1. *Before:* http://example.com/?foo=bar
2. *After:* https://vza3.app.link/3p?%243p=e_ep&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar

(note that these are simplified examples, not actual demo links)

{% protip title="Advanced Features" %}
The above script is compatible with dynamic content, transactional/real time emails and query parameters added via the query parameter box in the "Link" tab in Epsilon Harmony content creation. We recommend verifying emails created with the script - particularly that encoded parameters on website URLs are accepted by your website.
{% endprotip %}

{% ingredient email-link-options %}{% endingredient %}

{% ingredient email-usage-bounce %}{% endingredient %}

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}