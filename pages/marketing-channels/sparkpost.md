---
type: recipe
directory: marketing-channels
title: SparkPost
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
machine_name: e_sk
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

You can retrieve your click tracking domain from the **[Tracking Domains](https://app.sparkpost.com/account/tracking-domains){:target="_blank"}** section of your SparkPost account. If you have not added a custom click tracking domain yet, follow the instructions [here](#create-a-custom-click-tracking-domain). 

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{% ingredient email-technical-setup %}{% endingredient %}

### Create a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Tracking Domains](https://app.sparkpost.com/account/tracking-domains){:target="_blank"}** section of your SparkPost account:
   {% image src='/img/pages/marketing-channels/email/sparkpost-create-domain.png' third center alt='SparkPost domain' %}
1. Create a new CNAME record in your DNS zone file and set the host of your domain to the value `spgo.io`

For more information on how to set up your domain, please visit SparkPost's [documentation](https://www.sparkpost.com/docs/tech-resources/enabling-multiple-custom-tracking-domains/){:target="_blank"}.

{% ingredient email-cname %}{% endingredient %}

{% ingredient email-associated-domains %}{% endingredient %}

{% ingredient email-bounce-web %}{% endingredient %}

{% ingredient email-validate-test %}{% endingredient %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

{% ingredient email-usage %}{% endingredient %}

{% ingredient email-usage-auto-bounce %}{% endingredient %}

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}