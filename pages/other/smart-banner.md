---
type: recipe
directory: other
title: Smart Banner
page_title: Journeys Smart App Download Banner
ios_description: Insert this short code snippet to add a smart app download banner to both your desktop and mobile web pages and drive iOS app downloads.
android_description: Insert this short code snippet to add a smart app download banner to both your desktop and mobile web pages and drive Android app downloads.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Smart Banner, App Download Banner, Banner
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/smart-banner/, /features/smart-banner/overview/, /features/smart-banner/guide/, /features/smart-banner/support/ ] 
redirect: https://docs.branch.io/pages/web/integrate/#create-smart-banner
---

{% if page.overview %}

{% protip title="Branch's Free Smart App Banner now available in Journeys!" %}

Still free. Way more powerful. We've upgraded the banner substantially and rolled it into our [Journeys App Banners]({{base.url}}/features/journeys/) platform and will continue expanding on it there. These docs have been changed in November 2016 to update this fact.
{% endprotip %}

The Branch Smart Banner displays a fully-customizable banner at the top of your website, encouraging your mobile visitors to download the app (or open it, if already installed). Desktop visitors may enter their phone number to send themselves a link via SMS.

{% image src='/img/pages/features/smart-banner/banner2.png' 2-thirds center alt='Smart Banner examples' %}

The Download/Open button and SMS link both contain all the features of any other Branch link, including deep linking directly to content, passing data across install, measuring clicks, and more.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% protip title="Branch's Free Smart App Banner now available in Journeys!" %}

Still free. Way more powerful. We've upgraded the banner substantially and rolled it into our [Journeys App Banners]({{base.url}}/features/journeys/) platform and will continue expanding on it there. The docs below have been changed in November 2016 to update this fact.
{% endprotip %}

## Add the Branch Web SDK to your site

Add the following code somewhere inside the `<head></head>` tags on your website. More information about this SDK can be found in the [Github README](https://github.com/BranchMetrics/web-branch-deep-linking).

{% highlight html %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Deep linking from the banner

{% prerequisite %}

- For this to function as expected, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

Like all Branch deep links, you can pass custom parameters by specifying keys in the link's [data dictionary]({{base.url}}/getting-started/configuring-links). This is useful if you are showing the Smart Banner on a website page with equivalent in-app content, because you can route directly to that content in your app.

{% example %}This example will take the visitor straight to a picture with id “12345” after installing and opening the app.

{% highlight javascript %}
branch.setBranchViewData({
    '$deeplink_path': 'picture/12345',
    'picture_id': '12345',
    'user_id': '45123'
});
{% endhighlight %}
{% endexample %}

{% protip %}You can dynamically specify the deep link path depending on which website page is loaded.

{% highlight javascript %}
branch.setBranchViewData({
    '$deeplink_path': window.location.pathname + window.location.search + window.location.hash,
    'user_id': '45123'
});
{% endhighlight %}
{% endprotip %}

## Design and style the banner

1. Head to the [Journeys page](http://dashboard.branch.io/journeys) on the Branch dashboard.
1. Click the **Create New Journey** button to get started.
1. In the **Journey Name:** field, enter a name to use for internal reference (this will never be shown to your users). {% image src='/img/pages/features/journeys/journeys-name.png' half center alt='name' %}

### Select Audience

For the basic, free smart app banner, audience targeting is restricted. Just click *Save & Continue* on this screen to move to the next screen where you'll select the banner template. Selecting any audience criteria will prompt you to upgrade.

### Select a Template

1. First, click the **Select a Template** button. {% image src='/img/pages/features/journeys/select-template.png' 2-thirds center alt='select templates' %}
1. Next, click to select the type of template that you want to show. The free tier restricts you to only use one of the following:
    - Smart Banner at bottom of screen.
    - Smart Banner at top of screen
1. Click **Customize** to make changes to the template. You can use the WYSIWYG editor for free.
1. Once done, save your changes and click to *Validate and Test*

### Validate & Test

This screen allows you to preview your Journey variations, and is where you can perform final validation and testing on your Journey before publishing it.

#### Preview

To preview your Journey in your live, production website, enter your website URL in the **Test on your mobile device** field, and press the copy button. **The URL you enter must have the Branch Web SDK integrated and be using your Branch Key.**

{% image src='/img/pages/features/journeys/test-on-device.png' third center alt='test on your mobile device' %}

#### Validation

{% image src='/img/pages/features/journeys/validation-messages.png' third center alt='validation messages' %}

There are a number of errors and warnings you may encounter.

##### Web SDK errors

You must have the web SDK installed on your website to run a Journey. Head back up to the top of the page for instructions on how to add this.

**Fix:** [Install the Web SDK]({{base.url}}/features/smart-banner/guide/#add-the-branch-web-sdk-to-your-site).

##### App SDK warnings

If you choose to target iOS or Android users but haven’t integrated those SDKs, your banner will still show on the correct devices and direct users to your app. However, you won’t be able to get any install or event attribution for your Journeys, and you will not be able to deep link to content through install.

**Fix:** [Set up the mobile SDK in your app]({{base.url}}/getting-started/sdk-integration-guide).

##### Premium account warnings

If you have built a Journey that includes premium-only functionality, you will see a warning.

**Fix:** Go back and remove the premium features such as advanced audience targeting, non-banner templates, CSS editing or A/B testing.

## Deploy your banner

Now, save your app banner and deploy it! It'll immediately appear on your site and deep link through install based on how you've configured it on your site. Come back any time to make changes to your banner to see them immediately reflect on your site without editing any code.

{% elsif page.support %}

## FAQ

##### Q: Can I use the App Smart Banner on non mobile-optimized pages?

A: Yes, you can. However, you are responsible for handling the resizing of the banner whenever a user zooms in or zooms out. The smart banner is meant for mobile-optimized pages.

##### Q: How does Branch determine whether the banner says download or open?

A: Initially, if we’ve never determined a device has your application, we will default to download (or whatever custom text you’ve set for when a user doesn’t have the app). If they have clicked one of your links before and consequently opened the application, we will switch the text to say open (or whatever custom text you’ve set for when a user has your app).

{% endif %}
