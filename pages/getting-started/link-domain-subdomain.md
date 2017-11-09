---
type: recipe
directory: getting-started
title: Link Domain / Subdomain
page_title: Information about your app's custom subdomain
description: Every app is assigned a custom app.link subdomain. Learn how to use this when setting up your Branch configuration
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Webhooks, data export, funnel, RequestBin, Filters, Tempting
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
redirect: https://docs.branch.io/pages/dashboard/integrate/#change-link-domain
---

{% if page.guide %}

## The default app.link subdomain

Every app on the Branch platform is assigned a subdomain of the form `xxxx.app.link`. This is unique to your app and must be used in several places when integrating the SDK.

{% protip %}
Because of the way that Apple implements Universal Links, every app also has a shadow subdomain of the form `xxxx-alternate.app.link`. This is used in select places but will not be shown to your users.
{% endprotip %}

### Retriving the subdomain assigned to your app

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the **Link Domain** area.
1. Copy the value listed there.

{% image src='/img/pages/getting-started/link-domain-subdomain/subdomain-setting.png' full center alt='retrieving the default link subdomain' %}

{% caution title="Test environment domain" %}

The assigned subdomain for your [test environment]({{base.url}}/getting-started/integration-testing#the-test-sandbox-environment) is of the form `xxxx.test-app-link` and must be configured separately. Branch automatically handles HTTPS traffic for custom subdomains and root domains. Branch will acquire the necessary SSL certificate if you follow the simple setup instructions below. Branch will also automatically renew the certificates when needed.

{% endcaution %}

## Changing your app.link subdomain

You can brand your links with a custom subdomain like `you.app.link`. 

{% caution title="One change only" %}

You can only change your app.link subdomain once. Keep in mind that if you change this and you have implemented [strong matching]({{base.url}}/getting-started/sdk-integration-guide/guide/#support-strong-matching-only-for-new-applink-domain) or [universal links]({{base.url}}/getting-started/universal-app-links/guide/#add-your-branch-link-domains), you must update your implementation. The links on your old subdomain will no longer work.

{% endcaution %}

1. Go to [Link Settings](https://dashboard.branch.io/settings/link){:target="_blank"} in the dashboard.
1. Scroll to the **Link Domain** setting at the bottom.
1. Click `Change my app.link subdomain`.
1. Choose a subdomain that matches your brand. You cannot choose one that is in use by someone else, and it cannot have special characters. {% image src='/img/pages/getting-started/link-domain-subdomain/get-subdomain.png' full center alt='Custom app.link subdomain configuration' %}
1. Press `Get`.

## Setting a custom link domain

If you want to use a custom domain or subdomain for your Branch links instead of the `XXXX.app.link` domain, setting one up is simple.

{% caution title="Avoid switching later" %}
We recommend that you choose one domain or subdomain to use with Branch and stick with it, as switching can cause significant problems with your existing links.
{% endcaution %}

{% protip title="Updates to Universal & App Links configuration" %}

If you enable (or change) your link domain/subdomain, you will need to make updates to your Universal Links (iOS) and App Links (Android) configuration. Review the [configuration guide]({{base.url}}/getting-started/universal-app-links/overview/) for these features.

{% endprotip %}

### Custom SUBDOMAIN (go.branch.com)

{% caution title="Do not use www" %}
Some browsers have special rules for processing URLs beginning with `www`. We strongly recommend you do not include a `www` prefix in your custom subdomain.
{% endcaution %}

1. Create a CNAME for your subdomain and point it to `custom.bnc.lt`
1. Go to [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} on the Branch dashboard, and find the **Link Domain** section.
1. Click `Use my own domain`.
1. You should see a message telling you the status of your domain under the domain field. If you don't, please type your domain in again. {% image src='/img/pages/getting-started/link-domain-subdomain/sub-custom-domain.png' full center alt='successful custom subdomain configuration' %}
1. Click `Confirm`.

### Custom ROOT domain (branch.com)

{% caution title="Use this domain for Branch links only" %}
Once you enable this root domain for Branch links, you will not be able to use it for hosting anything else. We recommend using a subdomain, or purchasing a new root domain for this purpose. **You cannot use your main website domain for hosting Branch links**.
{% endcaution %}

1. Go to [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} on the Branch dashboard, and find the **Link Domain** section.
1. Click `Use my own domain`.{% image src='/img/pages/getting-started/link-domain-subdomain/subdomain-setting.png' full center alt='successful custom domain configuration' %}
1. Enter your custom domain into the text box. Resolve any errors. {% image src='/img/pages/getting-started/link-domain-subdomain/domain-error.png' two-thirds center alt='domain already reserved' %}
1. Work with your domain registrar to make the Branch-provided nameservers listed under the domain field authoritative for your domain. **Note that this means you cannot host anything else on this domain — only Branch links.** {% image src='/img/pages/getting-started/link-domain-subdomain/custom-domain-nameservers.png' full center alt='root domain nameservers' %}
1. Click `Confirm`.
{% protip title="Heads Up!" %}
1. The nameservers in the above image are for example purposes only. The nameservers you use will be unique to your application.
2. If you are configuring the domain through AWS's Route 53, make sure you are editing the nameservers under the `"Registered Domains"` tab, and not the `"Hosted zones"` section.
{% endprotip %}

## About the legacy bnc.lt domain

The bnc.lt domain is no longer available for new apps. If you have existing links with this domain as the base, they will continue to function.

{% endif %}
