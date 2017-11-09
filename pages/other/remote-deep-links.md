---
type: recipe
directory: other
exclude_from_google_search: true
title: Creating Remote Deep Links
page_title: Create premium deep links for use in email and advertising campaigns.
description: A how to guide on creating deep links for use in email and advertising campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email, Sailthru
hide_platform_selector: true
exclude_from_google_search: true
sections:
- overview
- guide
alias: [ /third-party-integrations/remote-deep-links/, /third-party-integrations/remote-deep-links/overview/, /third-party-integrations/remote-deep-links/guide/ ]
redirect: https://docs.branch.io
---

{% if page.overview %}

{% protip %}
This premium functionality is available to customers upon request. Please contact your Branch Account Manager or the [Integrations team](https://support.branch.io/support/tickets/new) to enable remote deep links.
{% endprotip %}

Remote Deep Links are special Branch links designed for use in enterprise marketing campaigns. They have the benefits of regular Branch links, but are simple to create from a web URL without hitting the Branch link creation API, hit a specially monitored endpoint, have UTM tag mapping, and have security parameters built in.

{% elsif page.guide %}

{% prerequisite %}
To create a Remote Deep Link, you’ll need the following:

* A Branch base domain (ask your Account Manager if you don’t have one)
* A web url you want to convert into a Branch link
* [Optional] Deep link parameters (conditional on your deep link logic)
{% endprerequisite %}


# Enable remote deep linking functionality 

Let's start with some example information. 

* Base domain: `https://bnc.lt/27mg/3p?%243p=e_ex&%24original_url=`
* Web URL: `https://www.example.com/product/summer_shoes/`
* Deep link parameters: `sku=123456` and `color=blue`

Creating remote deep links is simple. Create your web link, then append the necessary parameters (if needed), URI encode it and append it to your base link. 

Here's an example.

1. [Optional] Add any deep link parameters to your web URL: 
```https://www.example.com/product/summer_shoes/?sku=123456&color=blue```

1. URI encode the web link:
```https%3A%2F%2Fwww.example.com%2Fproduct%2Fsummer_shoes%2F%3Fsku%3D123456%26color%3Dblue```

1. Append the web link as the original URL parameter on the base link: 
```https://bnc.lt/27mg/3p?%243p=ex&%24original_url=https%3A%2F%2Fwww.example.com%2Fproduct%2Fsummer_shoes%2F%3Fsku%3D123456%26color%3Dblue```

The deep linking and fallback behavior of the link is determined in the Branch dashboard. Your Branch account manager will set this up for you before starting.

{% protip %}
There are reference scripts in Python and Javascript [here](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-branch-sdk-js) as well as an example [of a full email conversion script](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-sendgrid-demo-js).
{% endprotip %}

{% endif %}
