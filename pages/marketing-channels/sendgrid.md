---
type: recipe
directory: marketing-channels
title: SendGrid
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
alias: [ /third-party-integrations/sendgrid/, /third-party-integrations/sendgrid/overview/, /third-party-integrations/sendgrid/setup/, /third-party-integrations/sendgrid/usage/, /third-party-integrations/sendgrid/support/ ] 
machine_name: e_sg
redirect: https://docs.branch.io/pages/emails/sendgrid/
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

You can retrieve your click tracking domains from your Sendgrid settings:

1. Log in to your SendGrid account.
1. Go to Settings > Whitelabels > Email Links. 
1. Find your email link whitelabeled domain, click on the gear icon and click "View" (or create a new whitelabel). {% image src='/img/pages/third-party-integrations/sendgrid/sendgrid-view-domain.png' full center alt='xcode add domain' %}
1. Note the "Host" email click tracking domain (e.g. email.mydomain.com) and the SendGrid domain under "Data". {% image src='/img/pages/third-party-integrations/sendgrid/sendgrid-whitelabel.png' full center alt='xcode add domain' %}
1. Enter both the click tracking domain and the SendGrid domain in item 1 of this step: {% image src="/img/pages/third-party-integrations/sendgrid/configure-sendgrid-1.png" center full alt='Click tracking domain' %}

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{% ingredient email-technical-setup %}{% endingredient %}

{% ingredient email-cname %}{% endingredient %}

{% ingredient email-associated-domains %}{% endingredient %}

{% ingredient email-validate-test %}{% endingredient %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

{% ingredient email-usage %}{% endingredient %}

{% ingredient email-link-options-menu %}{% endingredient %}

{% ingredient email-link-options %}{% endingredient %}

## Flag your deep links

In order for {{page.title}} to know that the email link should open the app, add `universal="true"` to the template HTML, for example:

{% highlight html %}
<a href="https://vza3.app.link/3p?%243p={{ page.machine_name }}&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar" universal="true">Link to your app!</a>
{% endhighlight %}

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}