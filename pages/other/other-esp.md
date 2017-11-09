---
type: recipe
directory: other
exclude_from_google_search: true
title: Email Service Provider Integrations
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- support
alias: [ /third-party-integrations/other-esp/, /third-party-integrations/other-esp/overview/, /third-party-integrations/other-esp/guide/, /third-party-integrations/other-esp/advanced/, /third-party-integrations/other-esp/support/ ]
redirect: https://docs.branch.io/pages/emails/get-started/
---

{% if page.overview %}

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

With a script provided by Branch, you can dynamically create Branch links in email. In any place the script is called, the web URL is converted into its corresponding Branch link. The email is then sent.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

## Email + Branch Deep Linking

It has always been possible to put normal Branch deep links into emails. However, it has always been fairly time-consuming (you had to convert individual web links to Branch deep links). Also, with iOS 9, Apple [required developers to adopt Universal Links](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links), which did not work in emails that had click tracking enabled.

Branch's solution to this has been to work with email service providers to make Universal Links work again. At the same time, we tackled the problem of manually creating Branch links for emails. Our solution allows marketers to paste normal web links into an email, then a script rewrites those links as Branch deep links.

## Partnering with Branch

If you are an email service provider and wish to partner with Branch to offer deep links in emails, please read this guide.

If you use Branch and wish to use deep links in email but do not see your current email service provider listed in these docs, please reach out to them and send them this guide.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## Two approaches to email: API vs UI

Email Service Providers (ESPs) typically allow partners to send emails via two mechanisms: APIs and UIs, such as dashboards. Both mechanisms are valuable. The breakdown of responsibilities for converting normal emails to deep linked emails is slightly different for these two mechanisms.

In short, when emails are sent via APIs, it is the partner's responsibility to convert normal web links to Branch deep links. Branch has examples of how to do this in both Javascript and Python. However, when emails are sent via an ESP dashboard, such as a template designer, this responsibility falls to the ESP. See the section on [Rewriting links](/third-party-integrations/other-esp/guide/#rewriting-links) below.

The following two sections cover sending emails via API versus ESP-provided UIs. Note that the initial steps are the same for both mechanisms.


## Sending emails via API

### One-time setup for Email Service Providers (ESP)

ESPs must:

1. Allow customizing the click tracking domain. A company should be able to provide a custom domain to the ESP, such as email-companyname.app.link. Then when the ESP rewrites links for click tracking, it should use this domain.
2. Provide Branch with nameservers or CNAME information so that Branch can proxy requests from the custom click tracking domain through to the ESP.
3. (Optional) Change backend to accept the X-Forwarded-For HTTP header, since Branch will be proxying requests through. This only matters if reporting provided by the ESP includes IP address of users.

### One-time setup for customers

Partners using the ESP and Branch must:

1. Set up custom click tracking domain, such as email-companyname.mydomain.com, and provide that to the ESP.
1. Delegate that click tracking domain to Branch, who will then proxy all clicks to the ESP.
1. Work with Branch to set up [redirect behavior and tracking](/third-party-integrations/other-esp/support/#redirect-behavior-and-tracking).
1. Rewrite normal web links as Branch deep links, [using a Branch-provided script](/third-party-integrations/other-esp/guide/#rewriting-links).

## Sending emails via UI (Dashboard)

### One-time setup for Email Service Providers (ESP)

ESPs must:

1. Allow customizing the click tracking domain. A company should be able to provide a custom domain to the ESP, such as email-companyname.app.link. Then when the ESP rewrites links for click tracking, it should use this domain.
2. Provide Branch with nameservers or CNAME information so that Branch can proxy requests from the custom click tracking domain through to the ESP.
3. (Optional) Change backend to accept the X-Forwarded-For HTTP header, since Branch will be proxying requests through. This only matters if reporting provided by the ESP includes IP address of users.
4. Rewrite normal web links as Branch deep links, [using a Branch-provided script](/third-party-integrations/other-esp/guide/#rewriting-links).

### One-time setup for Partners

Partners using the ESP and Branch must:

1. Set up custom click tracking domain, such as email-companyname.mydomain.com, and provide that to the ESP.
1. Delegate that click tracking domain to Branch, who will then proxy all clicks to the ESP.
1. Work with Branch to set up [redirect behavior and tracking](/third-party-integrations/other-esp/support/#redirect-behavior-and-tracking).
1. Indicate which links should be rewritten as Branch deep links. The ESP should provide a method, such as appending ?deeplink=true to URLs, that allows the partner to indicate whether a link should be rewritten.


## What Branch handles

Regardless of whether emails are sent via API or UI, Branch is responsible for:

1. Generating and hosting the apple-app-site-association file
2. Generating a custom domain, such as email-companyname.app.link
3. Proxying non-apple-app-site-association traffic to email-companyname.app.link through to the ESP
4. Routing of all deep links, including Universal Links
5. Automatic "clicking" of Universal Links. This allows ESPs to track clicks on Universal Links even though these links skip the browser entirely!


## Rewriting links

For the best customer experience, we recommending giving customers a way to easily convert their links from normal web links to Branch deep links. We have provided [a way](/third-party-integrations/remote-deep-links/guide/) for doing so, as well as [an example](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-sendgrid-demo-js). The example takes an html email (as a string) and applies the script to it.

Here is the script:
{% highlight js %}
var crypto = require('crypto');
module.exports = function(original_url, branch_base_url) {
    if (!original_url) { return new Error('Missing original_url'); }
    if (typeof original_url != 'string') { return new Error('Invalid original_url'); }
    if (!branch_base_url) { return new Error('Missing branch_base_url, should be similar to https://bnc.lt/abcd/3p?%243p=xx'); }
    if (typeof branch_base_url != 'string') { return new Error('Invalid branch_base_url'); }

    return branch_base_url + '&%24original_url=' + encodeURIComponent(original_url);
};
{% endhighlight %}

Here is how links look before and after (the latter being a Branch deep link).

1. *Before:* http://example.com/?foo=bar
2. *After:* https://vza3.app.link/3p?%243p=e_eml&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar&%24hash=221dd9fb333d809b22fbdfd9b87808de73e3cd94f99b8eb26e6181e962fcb438

(note that these are simplified examples, not actual demo links)

## Web only content

The ESP can determine which tracked links should function as Universal Links, i.e. should open the app. As an example, one ESP currently has their tracked links of the form `https://esp-tracking.com/{hash}` and `https://esp-tracking.com/uni/{hash}`.

Then when Branch automatically generates the apple-app-site-association file, it specifies that only links of the form `https://esp-tracking.com/uni/{hash}` should open the app. This allows links without in-app content, such as unsubscribe links or password reset links, to not open the app. We highly recommend this approach.

Please use the `/uni/` path for click tracking URLs that should open the app. Please notify Branch if you choose to use a different path.

{% elsif page.advanced %}

## AASA file for Universal Link support

Branch will host an Apple App Site Association (AASA) file for you, so that your click tracking domain using `/uni/` appears to Apple as a Universal Link, and the app will open and deep link.

Branch will proxy traffic on to the ESP click tracking domain, allowing Universal Links to function and clicks to be recorded.

{% protip title="How does it work?"%}
Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will robotically “click” the link, registering the click with the ESP, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. See the "Support" tab for more information.
{% endprotip %}

{% elsif page.support %}

## How does link creation work?

### Three stages of a link

| Link name| Link example | Link description
| --- | --- | --- | ---
| Original link | https://www.shop.com/product | This is the original link that you would put in an email. If emails are dynamically personalized, this will be the link that is filled in by the personalization engine.
| Branch link | https://branch.shop.com/?original_url=https%3A%2F%2Fwww.shop.com%2Fproduct | A Branch deep link, that handles all redirection for users on any platform, with or without the app.
| Click Tracking URL | https://email.shop.com/click/abcde12345 | A SendGrid generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-creation-flow.png" center full alt='Deep Linked Email Creation Flow' %}

### Redirect behavior and tracking

When your customer clicks the click tracking link in an email, the browser will generally open. Once in the browser, the click tracking redirect will happen, followed by an instant redirect to the Branch link. At this point, Branch will either stay in the browser, and load the original URL (if the app is not installed, or the customer is on a desktop device), or Branch will open the app and deep link to content. Branch uses the information from the original URL to deep link to the correct in-app content.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-post-click.png" center full alt='Branch Email Deep Linking Redirects' %}

## Universal links and click tracking
Apple introduced Universal Links starting with iOS 9. Apple introduced Universal Links starting with iOS 9. You must configure your app and your links in a specific way to enable Universal Link functionality. Branch guides developers through this process so that Branch links function as Universal Links.

For Universal Links to work, Apple requires that a file called an “Apple-App-Site-Association” (AASA) file must be hosted on the domain of the link in question. When the link is clicked, Apple will check for the presence of this file to decide whether or not to open the app. All Branch links are Universal Links, because we will host this file securely on your Branch link domain.

When you click a Branch link directly from an email inside the Mail app on iOS 9+, it functions as a Universal Link - it redirects directly into the desired app. However, if you put a Branch Universal Link behind a click tracking URL, it won’t deep link into the app. This is because generally, a click tracking URL is not a Universal Link. If you’re not hosting that AASA file on the click tracking URL’s domain, you aren’t going to get Universal Link behavior for that link.

**Solution**

To solve this, Branch will host the AASA file on your customers' click tracking domain. We’ll help you customers get set up with this.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-universal-links.png" center full alt='Deep Linked Email Universal Links' %}

{% endif %}
