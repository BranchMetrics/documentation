---
type: recipe
directory: other
exclude_from_google_search: true
title: Integrating Your ESP
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- support
alias: [ /third-party-integrations/integrating-your-esp/, /third-party-integrations/integrating-your-esp/overview/, /third-party-integrations/integrating-your-esp/guide/, /third-party-integrations/integrating-your-esp/support/ ]
redirect: https://docs.branch.io/pages/emails/get-started/
---

{% if page.overview %}

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

{% ingredient email-paid-integration %}{% endingredient %}

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

With a script provided by Branch, you can dynamically create Branch links in email. This script will help you automatically re-write normal web links to be Branch deep links.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.

- Your Branch account manager will walk you through the one time setup steps. Please see the Advanced tab for more detailed information.
{% endprerequisite %}

## Contact Branch

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) to enable the DLE integration and let your Branch Account Manager know you which ESP you use. You'll need to give your account manager two pieces of information.

1. Go to your ESP account settings.
1. Find your email link whitelabeled domain. This is your "click tracking domain" (e.g. click.branch.io)
1. Find the ESP domain. This is the ESP's host click domain (e.g. click.espdomain.net) to which you CNAMEd your click tracking domain. 

{% example %}
In this [Mandrill support documentation](https://mandrill.zendesk.com/hc/en-us/articles/205582917-How-to-Use-a-Custom-Tracking-Domain), `mandrillapp.com` is the ESP domain. 
{% endexample %}

Provide both the click tracking domain and the ESP domain to your Branch Account Manager. If you do not have a whitelabeled click tracking domain, you will not be able to enable click tracking with deep linking.

## Add your click tracking domain to your entitlements file

On iOS 9+ with Universal Links, Branch will be able to open the app directly from emails without going to the browser. To make this work, you'll need to update your app.

1. In the `Domains` section of your Entitlements, click the `+` icon and add your click tracking domain:
   * `applinks:click.branch.io`

{% image src='/img/pages/getting-started/universal-app-links/add_domain.png' 3-quarters center alt='xcode add domain' %}

## Set up your click tracking domain

Only do this step after you've given your Branch account manager your ESP click tracking domain.

1. Create a CNAME for your subdomain and point it to `thirdparty.bnc.lt`. Note that this will temporarily disable your links, so if you're chaning a click tracking domain that's in active use (rather than a new one), let your Branch account manager know. 
1. Confirm with your Branch AM that the domain is working correctly.

## On-going use

Once you’ve completed the one time setup steps, it’s time to send your first email! This step will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

### Making regular Branch links compatible with email

Be sure to add `"$3p":"e_eml"` to the deep link data of any links you use in email to ensure Universal Link and click tracking works as expected.

### Create email links via API without changing your email templates

To create email links via API, please use the instructions on how to [create links via API](/getting-started/creating-links/other-ways/#http-api), but include the following key value pairs in your call:

1. `"$3p":"e_eml"` This is required for Universal Link and click tracking functionality.
1. `"$original_url":"{{your web url URI encoded}}"` For each piece of content, include a URI encoded version of your content's web URL. You can also add deep link data as query parameters on that web URL. This ensures accurate Content Analytics reporting. **Example: `"$original_url":"https%3A%2F%2Fshop.com%2Fshoes%2Fbrown-shoes%3Fmy_key%3Dmy_value%26campaign%3Dshoe_discounts"`**

{% elsif page.support %}

## How does link creation work?

### Three stages of a link

| Link name| Link example | Link description
| --- | --- | --- | ---
| Original link | https://www.shop.com/product | This is the original link that you would put in an email. If emails are dynamically personalized, this will be the link that is filled in by the personalization engine.
| Branch link | https://branch.shop.com/?original_url=https%3A%2F%2Fwww.shop.com%2Fproduct | A Branch deep link, that handles all redirection for users on any platform, with or without the app.
| Click Tracking URL | https://email.shop.com/click/abcde12345 | An ESP generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-creation-flow.png" center full alt='Deep Linked Email Creation Flow' %}

### Redirect behavior and tracking

When your customer clicks the click tracking link in an email, the browser will generally open. Once in the browser, the click tracking redirect will happen, followed by an instant redirect to the Branch link. At this point, Branch will either stay in the browser, and load the original URL (if the app is not installed, or the customer is on a desktop device), or Branch will open the app and deep link to content. Branch uses the information from the original URL to deep link to the correct in-app content.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-post-click.png" center full alt='Branch Email Deep Linking Redirects' %}

## Universal links and click tracking
Apple introduced Universal Links starting with iOS 9. Apple introduced Universal Links starting with iOS 9. You must configure your app and your links in a specific way to enable Universal Link functionality. Branch guides developers through this process so that Branch links function as Universal Links.

For Universal Links to work, Apple requires that a file called an “Apple-App-Site-Association” (AASA) file must be hosted on the domain of the link in question. When the link is clicked, Apple will check for the presence of this file to decide whether or not to open the app. All Branch links are Universal Links, because we will host this file securely on your Branch link domain.

When you click a Branch link directly from an email inside the Mail app on iOS 9+, it functions as a Universal Link - it redirects directly into the desired app. However, if you put a Branch Universal Link behind a click tracking URL, it won’t deep link into the app. This is because generally, a click tracking URL is not a Universal Link. If you’re not hosting that AASA file on the click tracking URL’s domain, you aren’t going to get Universal Link behavior for that link.

**Solution**

To solve this, Branch will host the AASA file on your click tracking domain. We’ll help you get set up with this.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-universal-links.png" center full alt='Deep Linked Email Universal Links' %}

{% endif %}