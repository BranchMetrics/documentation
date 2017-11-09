---
type: recipe
directory: marketing-channels
title: Appboy
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
alias: [ /third-party-integrations/appboy-with-sendgrid/ /third-party-integrations/appboy-with-sendgrid/overview/, /third-party-integrations/appboy-with-sendgrid/setup/, /third-party-integrations/appboy-with-sendgrid/usage/, /third-party-integrations/appboy-with-sendgrid/support/, /marketing-channels/appboy-with-sendgrid/ /marketing-channels/appboy-with-sendgrid/overview/, /marketing-channels/appboy-with-sendgrid/setup/, /marketing-channels/appboy-with-sendgrid/usage/, /marketing-channels/appboy-with-sendgrid/support/ ] 
machine_name: e_ab
redirect: https://docs.branch.io/pages/integrations/appboy
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

Contact your Appboy Account Manager and request the Email Click Tracking Domain and the SendGrid Data domain associated with your SendGrid account.

Once you’ve retrieved this information, enter both the click tracking domain and the SendGrid domain in item 1 of this step: {% image src="/img/pages/third-party-integrations/sendgrid/configure-sendgrid-1.png" center full alt='Click tracking domain' %}

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

To use Branch links within your {{ page.title }} campaigns, you’ll need to add an HTML tag to the Branch URLs within your {{ page.title }} email templates.

1. Create your email template same as you normally would.
1. Add Branch links to your email for all links you would like to deep link users to specific app content (this works for existing app users as well as those without your app).
   * Be sure to add `"$3p":"e_ab"` to the deep link data of any links you use in email to ensure Universal Link and click tracking works as expected.
1.Once you’re done composing your email template, click on the “Source” button in the email creator toolbar
   {% image src="/img/pages/third-party-integrations/appboy-with-sendgrid/appboy-source.png" center full alt='Appboy source view' %}
1. Add universal="true" to the HTML for any link which you want to convert intoa Branch deep link, for example:
   * `<a href="links.example.com" universal="true">Link to your app!</a>`
   {: .code}
   {% image src="/img/pages/third-party-integrations/appboy-with-sendgrid/appboy-universal.png" center full alt='Appboy universal tag' %}

All done! So long as you’ve taken the above steps, the links in your {{ page.title }} email campaigns will now dynamically deep link users to app content, even if they have uninstalled your app, giving you the best chance of engaging or re-acquiring them.

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}