---
type: recipe
directory: other
title: Email Campaigns
page_title: Email campaigns with deep links
description: How to create deep links for email campaigns featuring your app. Branch Links enable deep linking, install attribution, and in-depth analytics.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, email campaigns, Quick Links
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,email campaigns, Quick Links, Android
hide_platform_selector: true
sections:
- overview
- guide
alias: [ /features/email-campaigns/, /features/email-campaigns/overview/, /features/email-campaigns/guide/, /features/email-campaigns/advanced/ ]
redirect: https://docs.branch.io/pages/emails/get-started/
---

{% if page.overview %}

You can use Branch links in email campaigns to launch your app or gracefully fall back to the App or Play Store download page. For more advanced purposes, you can even deep link users directly to content after your app opens.

{% image src='/img/pages/features/email-campaigns/email.png' half center alt='Create Quick Link' %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- To track installs from Branch links in email campaigns, you need to [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

{% ingredient disable-click-tracking %}{% endingredient %}

## Create Quick Links on the Branch dashboard

1. Open the [Quick Link creator](https://dashboard.branch.io/quick-links/qlc/define) on the Branch dashboard.
1. Pick a **Link Name** for later reference. For example: "Launch Email".
1. Paste in the web URL from your email template.
1. Add analytics tags. For "Where will you post this link?" it's recommended to use `Email` as the channel.
1. In **Configure Options** > **Redirects**, select **Web URL** for each platform.
1. Click **Create Link Now**, and then copy the created link into your email template.

Repeat this for each URL in your email template that you would like to deep link.

{% protip title="Optional: Deep Link Routing (Advanced)" %}

You can use the **Configure Options** > **Deep Linking** section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Conclusion

It's that simple! The [Branch dashboard](https://dashboard.branch.io/sources){:target="_blank"} will track clicks for this link based on the channel, campaign and any other tags you created. Users who have the app will be linked straight to the app, and users who don't will be taken to the App/Play Store to download it, depending on your [settings](https://dashboard.branch.io/link-settings){:target="_blank"}.

{% protip title="Creating links dynamically" %}

If you need more flexibility, you might also be interested in building links by [appending query parameters]({{base.url}}/getting-started/creating-links/other-ways/#appending-query-parameters).
{% endprotip %}

{% endif %}