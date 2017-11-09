---
type: recipe
directory: marketing-channels
title: Bronto
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
machine_name: e_br
redirect: https://docs.branch.io/
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

You can retrieve your click tracking domain from your Bronto account. If you have not added a private domain yet, follow the instructions [here](#set-up-a-private-domain). 

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{% ingredient email-technical-setup %}{% endingredient %}

### Set up a private domain

Using a private domain gives you more control over your email sending reputation. Please follow Bronto's [documentation](https://helpdocs.bronto.com/bmp/task/t_bmp_private_domain_set_up.html){:target="_blank"} to set this up.

### Enable Click Through Link Tracking

Enabling Click Through Link Tracking allows you to see which links your users are clicking in your emails. Please follow Bronto's [documentation](https://helpdocs.bronto.com/bmp/task/t_bmp_home_data_exchange_link_tracking_set_up.html){:target="_blank"} to set this up.

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