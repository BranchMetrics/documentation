---
type: recipe
directory: marketing-channels
title: Journeys App Banners
page_title: Journeys App Banner Platform
description: A complete guide to using the Journeys tool to drive high value, retained users to your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Apple Universal Links, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner, Interstitial, Download Interstitial
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- examples
- amp
contents:
  number:
    - amp
  hide:
    - examples
alias: [ /features/journeys/, /features/journeys/overview/, /features/journeys/guide/, /features/journeys/advanced/, /features/journeys/examples/ ]
redirect: https://docs.branch.io/pages/web/journeys/
---

{% if page.overview %}

{% protip %}
Journeys introduces many more advanced features on top of the basic smart app banner functionality, but **you can still create an Android and iOS smart app banner for free if your MAU are under 20k**. After 20k MAU, we'd ask that you pay a small fee for use. Premium-only advanced features (including the option to run multiple Journeys simultaneously) are indicated with a {% premiumflag %}{% endpremiumflag %} icon and a 14 day trial period is available.
{% endprotip %}

On a daily basis, Google Search drives **more app installs** than all of Facebook's paid install products combined. Converting your mobile web visitors into native app users is one of the most effective acquisition channels available, and Branch's Journeys App Banners platform makes this easy.

{% image src='/img/pages/features/journeys/journeys-examples.png' full center alt='Journeys intro' %}

- **Customizable presentation.** WYSIWYG designer for smart banner or full-page interstitial, with more coming soon.
- **Powerful targeting rules.** Want to show your Journey only visitors without your app installed already? All iOS users from Japan? Just users viewing your checkout page? Android users who have visited your website twice AND purchased something using your app? The possibilities are infinite.
- **AMP-compatible.** You can convert mobile search traffic to your app by [showing Journeys on AMP pages](/marketing-channels/journeys/amp).
- **Run A/B tests.** Design multiple campaign versions to see which converts most effectively.
- **Optimized user experience.** If installed, your app will open and users can be routed directly to the content they expect. If not, the App/Play store will open and users can still be routed directly to the content they expect after installing.
- **Comprehensive analytics.** Measure the downstream performance and retention of every Journeys campaign.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite title="Make sure you include your alternate domain for Universal Links" %}

- Journeys uses your alternate domain for Universal Links. Make sure you include your `xxxx-alternate.app.link` domain in your [Associated Domains]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-the-associated-domains-entitlement-to-your-project).
- If you use a custom domain or subdomain for your Branch links, you should instead add entries for `applinks:[mycustomdomainorsubdomain]` and `XXXX-alternate.app.link`. If you’re unsure of your Branch-assigned app.link subdomain, [contact support](https://support.branch.io), and we can provide it.

{% endprerequisite %}

## Add the Branch Web SDK to your site

Add the following code somewhere inside the `<head></head>` tags on your website. More information about this SDK can be found in the [Github README](https://github.com/BranchMetrics/web-branch-deep-linking).

{% highlight html %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Deep linking from the banner or interstitial

Like all Branch deep links, you can pass custom parameters by specifying keys in the link's [data dictionary]({{base.url}}/getting-started/configuring-links). This is useful if you are showing the Smart Banner on a website page with equivalent in-app content, because you can route directly to that content in your app.

{% example %}This example will take the visitor straight to a picture with id “12345” after installing and opening the app.

{% highlight javascript %}
branch.setBranchViewData({
    data: {
        '$deeplink_path': 'picture/12345',
        'picture_id': '12345',
        'user_id': '45123'
    }
});
{% endhighlight %}
{% endexample %}

{% protip %}
You can dynamically specify the deep link path depending on which website page is loaded.

{% highlight javascript %}
branch.setBranchViewData({
    data: {
        '$deeplink_path': window.location.pathname + window.location.search + window.location.hash,
        'user_id': '45123'
    }
});
{% endhighlight %}
{% endprotip %}

{% protip %}

Also, if the user has the app installed on their phone, we can try to open the app automaticaly and deeplink them.

{% highlight javascript %}
branch.setBranchViewData({
    open_app: true
});
{% endhighlight %}
{% endprotip %}

If a user is referred to a page running Journeys via a Branch link, then referring link data will be passed into the Journeys call-to-action by default. If you’re using setBranchViewData() to specify link data for Journeys on that page, the only data from setBranchViewData() that will be used are [dynamic Journeys layout parameters]({{base.url}}/marketing-channels/journeys/advanced/#dynamic-journeys-layout-customization); all other data in that call will be ignored, unless `make_new_link` is set to `true` in `branch.init()`. You can find more information [here]({{base.url}}/marketing-channels/journeys/advanced/#preserve-or-discard-referring-link-data).

**Note:** You should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing) for deferred deep linking and attribution.

## Create Journey banner or interstitial

1. Head to the [Journeys page](http://dashboard.branch.io/journeys) on the Branch dashboard.
1. Click the **Create New Journey** button to get started. {% image src='/img/pages/features/journeys/create-journey-button.png' third center alt='name' %}
1. In the **Journey Name:** field, enter a name to use for internal reference (this will never be shown to your users). {% image src='/img/pages/features/journeys/journeys-name.png' half center alt='name' %}

## Select audience

You can customize the audience that will see your Journey by choosing the target platform, device, and region.

{% example title="Easy Localization!" %}
If you have users in many countries, you can create a separate Journey for each localization and use audience targeting rules to make sure users see the appropriate one.
{% endexample %}

{% image src='/img/pages/features/journeys/audience-rules.png' full center alt='audience' %}

| Option | Description |
| --- | --- |
| Platform | Branch currently offers Journeys on one platform: **Mobile web**. This will display for mobile users on your website. _More options coming soon._
| Devices | Which devices would you like to target? For example, if you only have an iOS app, then you might want to show a Journey only to users viewing your mobile website on iOS.
| Regions {% premiumflag %}{% endpremiumflag %} | Select one or more countries in which to display your Journey. Defaults to **Show to All Regions**
| Additional Filters {% premiumflag %}{% endpremiumflag %} | Read about advanced filtering criteria [here]({{base.url}}/marketing-channels/journeys/advanced/#advanced-audience-rules).

## Select and style the banner or interstitial

1. First, click the **Select a Template** button. {% image src='/img/pages/features/journeys/select-template.png' 2-thirds center alt='select templates' %}
1. Next, click to select the type of template that you want to show. There are three template options:
    - Smart Banner at bottom of screen.
    - Smart Banner at top of screen
    - Full Screen Interstitial (SEO friendly!) {% premiumflag %}{% endpremiumflag %}
    - _The fourth option shown is an alternate preconfiguration of the full screen interstitial_{% image src='/img/pages/features/journeys/select-template-type.png' 3-quarters center alt='select template type' %}
1. Click **Customize** to make changes to the template.
1. In the **Customize Template** heading, you may edit the the name to use for internal reference.
1. Click any object in the preview to edit it. To see documentation on all customization options, [click here](../advanced/#template-customization-options).
1. When finished, click **Save & Close** button to continue.

**Note about generic deep linking params** If you are running a generic download campaign or a site-wide discount offer, your users would go to the same place inside your app regardless of where they originated on your website. You can configure this destination by setting **Deep Link Data** for the **Button** element when you [customize your template options]({{base.url}}/features/journeys/advanced/#template-customization-options).

## Validate & Test

This screen allows you to preview your Journey variations, and is where you can perform final validation and testing on your Journey before publishing it.

{% image src='/img/pages/features/journeys/validate-and-test.png' 3-quarters center alt='validate and test screen' %}

### Preview

Use the dropdown menu to switch between your Journey variations.

{% image src='/img/pages/features/journeys/select-preview-variation.png' 2-thirds center alt='select preview variation' %}

To preview your Journey in your live, production website, enter your website URL in the **Test on your mobile device** field, and press the copy button. **The URL you enter must have the Branch Web SDK integrated and be using your Branch Key.**

{% image src='/img/pages/features/journeys/test-on-device.png' third center alt='test on your mobile device' %}

{% protip title="How does this work?" %}
The Branch SDK integrated into your website listens for a unique, one-time URL parameter that is generated by the preview tool. It looks something like `_branch_view_id=296449069883323397`. When this parameter is detected, the SDK loads a temporary preview of that specific Journey. This parameter is only valid for your Branch Key, and will not work on any other website even if the Branch SDK is integrated.
{% endprotip %}

### Validation

{% image src='/img/pages/features/journeys/validation-messages.png' 2-thirds center alt='validation messages' %}

There are a number of errors and warnings you may encounter.

#### Web SDK errors
You must have the web SDK installed on your website to run a Journey

**Fix:** [Install the Web SDK]({{base.url}}/features/journeys/guide/#add-the-branch-web-sdk-to-your-site).

#### App SDK warnings

If you choose to target iOS or Android users but haven’t integrated those SDKs, your Journeys will still show on the correct devices and direct users to your app. However, you won’t be able to get any install or event attribution for your Journeys, and you will not be able to deep link users to content inside your app.

**Fix:** [Set up the mobile SDK in your app]({{base.url}}/getting-started/sdk-integration-guide).

#### Audience rule warnings

You will see a warning if your audience rules do not add up to 100%. If less than 100%, the remainder will see whatever is normal behavior for your website.

**Fix:** Not required. To change audience allocations, simply press the **Back** button.

#### Premium account warnings
If you have built a Journey that includes premium-only functionality, you will see a warning.

**Fix:**  Go back and remove the premium features such as advanced audience targeting, non-banner templates, CSS editing or A/B testing or [upgrade your app to Journeys Premium](http://dashboard.branch.io/journeys?modal=journeys-signup).

## Managing your Journeys App Banners

The [Journeys Manager](https://dashboard.branch.io/journeys) is your homepage for all of the personalized experiences create. You can turn Journeys on and off, clone them, or view performance.

{% image src='/img/pages/features/journeys/journeys-manager.png' 2-thirds center alt='journeys manager' %}

A Journey can have one of four states:

| State | Meaning | Next Stage |
| --- | --- | --- |
| Draft | Not yet published, still editable | **Active** |
| Active | Live for your users, read-only | **Stopped** |
| Stopped | Not live for your users, read-only | **Active** or **Archived** |
| Archived | Not live for your users, hidden from default manager view | _none_ |

You can activate a journey directly from the creation flow, or from **Start** in the Actions menus in the Journeys Manager.

{% image src='/img/pages/features/journeys/edit-journeys.png' quarter center alt='edit journeys' %}

{% protip title="Editing a live Journey" %}

To prevent corruption of historical analytics data, Journeys cannot be edited once they leave **Draft** status. However, you can **Clone** a Journey and make changes to the new copy.

{% endprotip %}

## Prioritizing Journeys

The Journeys Priority View allows you to set the priority of multiple Journeys when they **overlap**. They **overlap** when a single person is eligible to see multiple Journeys. You can prioritize the Journey that should show ahead of any others.

{% example title="Prioritizing Journeys" %}

Let's say you have two Journeys that may reach the same audience.

1. A half page interstitial that promotes an offer on your "Shoes" category page.
2. A smart banner that should show for all visitors.

In general, you'd like the interstitial to show ahead of the smart banner on the "Shoes" category page (where both audience segments overlap). 

{% endexample %}

To prioritize Journeys, switch to the Priority View by clicking on the toggle.

{% image src='/img/pages/features/journeys/priority-view-toggle.png' 3-quarter center alt='priority view toggle' %}

You're now in Priority View. 

1. Drag and drop Journeys in the order you'd like them to show. The lower numbers mean higher priority (i.e. a Journey with priority 1 is going to show ahead of a Journey with priority 2).{% image src='/img/pages/features/journeys/first-priority-view.png' 3-quarter center alt='first priority view' %}
1. Click the **Save** button. {% image src='/img/pages/features/journeys/save-priority.png' 3-quarter center alt='changed priority view' %}
1. Your Journeys have now been prioritized. {% image src='/img/pages/features/journeys/final-priority-view.png' 3-quarter center alt='final priority view' %}

{% caution %}

When you save Journeys priorities, **ALL** Journeys will be prioritized in the order they appear in the table. 

{% endcaution %}

For more detailed Journeys prioritization questions, visit our [Advanced section](/features/journeys/advanced/#prioritization).


## Visualizing Journeys performance

### Analytics & attribution

Journeys map to [standard Branch analytics labels](/getting-started/configuring-links/#analytics-labels):

- All Journeys: `feature` = `journeys`
- Each Journey: `campaign` = `[Journey Name]`
- Individual Templates: `tags` = `[Template Name]` (+ any additional tags you specify during configuration)

You can access your Journey’s performance by selecting **View Performance** from the actions menu in the Journeys Manager.

{% image src='/img/pages/features/journeys/view-performance.png' quarter center alt='view performance' %}

### Using Source Analytics

You can also access Journeys analytics by selecting the above filters from the [Source Analytics](http://dashboard.branch.io/analytics/source) page of the Branch dashboard.

{% image src='/img/pages/features/journeys/view-source-analytics.png' 2-thirds center alt='view performance using source analytics' %}

#### To compare all of your Journeys

1. Filter by `feature` = `journeys`

#### To compare variations within one Journey

1. Filter by `feature` = `journeys`
2. Filter by `campaign` = `[Journey Name]`

{% protip title="Attribute Journeys events to referring links" %}

By default, when users arrive on a page running Journeys via a Branch link, then any interaction with the Journey (click/install/re-open) will be attributed to the referring Branch link, rather than to the Journey. [Learn how]({{base.url}}/marketing-channels/journeys/advanced/#preserve-or-discard-referring-link-data) to attribute this data to the Journey instead.

{% endprotip %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.advanced %}

## Advanced audience rules

You can target users on a more granular level - based on behavior like where they came from, whether they already have your app installed, and what they’ve done on your website or in your app. We've created a bunch of great examples on the [next tab]({{base.url}}/features/journeys/examples).

{% image src='/img/pages/features/journeys/advanced-audience-rules.png' full center alt='Advanced audience' %}

#### Has completed event

If you have [custom event tracking]({{base-url}}/getting-started/user-value-attribution/) set up, you can target users based on events that you define. For instance, you might want to show a Journey to users who have completed a purchase within the last week, or who add an item to their shopping cart more than three times.

<!-- #### Referred from site

You can target a user based on the last touch point before they entered your website. For example, if you want to target users that found you through Google Search, you can select “Referred from site” and fill in `google.com`. Currently, we only support domain names in the Referred from site field. -->

#### Is viewing a page url

You can define which subsets of your website the Journey will appear. For example, maybe you have a page `yoursite.com/settings` and `yoursite.com/products/1234`. You could fill in `products` here and only users visiting a URL with that substring present would see the Journey.

#### Has visited web

Here, you can use website visits to determine who to target. For instance, you might decide that someone who visits your site five times is ready to see a Journey with some extra incentive to open the app.

#### Has visited the app

Similar to visited web, you can target users by number of app visits. For example, someone who has visited the app two times and opens up the mobile web could be lured back into the app with a Journey.

#### Has the app installed

You might choose to only show a Journey that asks a user to open the app to those that already have it installed.

#### Has clicked on ad

A user is grouped into "Has clicked on Ad" when they've clicked a link from [Deep Linked Feeds](/features/deep-linked-feeds). 

Use this to target users who have been part of an ad campaign to improve your ROI; maybe with a specific call to action to open the app and buy something if they've also never made a purchase in the app. 

The technical definition is that they've clicked on a link with an Ad Network's custom `$3p` value in link data, but you just need to consider the way the link is created - in this case, through Deep Linked Feeds.

#### Has clicked on email

A user is grouped into "Has clicked on Email" when they've clicked a link from [Deep Linked Email](https://dashboard.branch.io/email). 

Use this to target users who have been part of an email campaign; maybe with a specific call to action to get them download the app if they don't have it and they've landed on mobile web.

The technical definition is that they've clicked on a link with an Email Service Provider's custom `$3p` value in link data, but you just need to consider the way the link is created - in this case, through a Deep Linked Email integration.

## Set up split testing {% premiumflag %}{% endpremiumflag %}

Note that if you are planning on just using the free banner, you can skip this section. This feature allows you to run A/B tests by designing multiple templates and assigning a percentage of your audience to each one.

1. Click the **Add Variation** button to add another design variation. {% image src='/img/pages/features/journeys/add-variation.png' third center alt='add a variation' %}
1. To remove an unwanted variation, click the `-` button. {% image src='/img/pages/features/journeys/remove-variation.png' quarter center alt='remove a variation' %}
1. Use the percentage fields to control the ratio of your audience that will see each variation.{% image src='/img/pages/features/journeys/multiple-templates.png' 3-quarters center alt='multiple templates' %}

{% protip title="Variation Display Limitations" %}
- You may have up to three variations in each Journey.
- Your total percentage allocation must not equal more than **100%**.
- Your total percentage allocation may be _less_ than **100%**. In this situation, the remainder of your audience will be shown your standard website without a Journey. This allows you to A/B test against your non-Journeys website experience.
{% endprotip %}

## Preserve or discard referring link data

By default, when users arrive on a page running Journeys via a Branch link and `make_new_link` is not set to `true`, then any interaction with the Journey (click/install/re-open) will be attributed to the referring Branch link, rather than to the Journey. If `make_new_link` is set to `true`, the same events will be attributed to the Journey, instead.

This can help you collect data on how the referring links are contributing to app growth/engagement, even when users aren’t installing from those links directly. For example, if a user clicked a Branch link on Facebook, landed on your website, and installed from a Journey, this would allow you to attribute the install to the link on Facebook. If the original link was also configured to deep link into your app, that deep link would be preserved, too.

Branch will pass the referring link into Journeys by default. In order to discard referring link data, include the `make_new_link` flag, with a value of  `true`, into the options during initialization:

{% highlight javascript %}
branch.init( 'BRANCH_KEY',
    {
        'make_new_link' : true
    }
);
{% endhighlight %}

## Prioritization

##### When do my Journeys prioritization rules apply?
Prioritization only takes effect when two Journeys are overlapping. If you have a Journey targeting iOS users and a Journey targeting Android users, the prioritization won't matter. If you update the Journey targeting iOS to now target iOS and Android users, the higher priority Journey will show to Android users.

##### What happens if a user dismisses a banner or interstitial?
Assuming it fits your audience rule, your highest priority Journey is shown. If that Journey is dismissed, no other Journeys will show to respect the user's preference for not seeing a Journey when those rules are applied. To maximize Journey visibility, make your interstitial rules narrow (for example, showing on specific URLs) and your banner rules broad.

##### Why do I have to prioritize Stopped and Draft Journeys?
We ask you to prioritize all non-Archived Journeys because Journeys can be set live from *Draft* or *Stopped* mode. 

##### What happens if I have some Journeys with priorities set and some without?
We recommend setting priority for all Journeys. All new Journeys you create will automatically have the lowest priority assigned to them, as well as *Draft* or *Stopped* Journeys *without priority* that are set live (Journeys with priority will not have their priority changed unless you explicitly set them). If you don't set a priority for all your Journeys, then any matching Journey (i.e. Journey passing the audience filter you set) without priority will be picked at random to show.

## Dynamic Journeys layout customization

We now support the use case where you can customize the appearance of a Journey depending on which link referred the web session. So, you can create a Branch link with a set of defined keys and values that will change properties such as the title or images when the user is referred to your website from this link. 

| **Link Data Key** | **Value** | **Example Value** |
| ---: | --- | --- |
| `$journeys_button_get_has_app` | The call to action button when the app is currently installed | "Open App" |
| `$journeys_button_get_no_app` | The call to action button when the app is **not** currently installed | "Install App" |
| `$journeys_title` | The title or main text of your Journey | "Download Appsolutely today" |
| `$journeys_description` | This is the description or subtitle in the frame | "This app is disrupting apps" |
| `$journeys_icon_image_url` | The app icon displayed in the layout | "https://mysite.com/image.png" |

Note that not all template support all override keys. For example, the floating button does not support title, description or icon image url. If a template is to be rendered and the key you've specified does not exist, we'll simply ignore it while rendering the template. 

## Clientside Javascript Journeys controls

There are a number of clientside APIs to help you build quality user experiences. See below:

### Use Javascript to block a Journey from showing

You can prevent Journeys from showing on a certain page by inserting `no_journeys` with the value of `true` into the options during initialization.

{% highlight javascript %}
<script type="text/javascript">
// load the Branch SDK file
branch.init('BRANCH_KEY', 
    {
      'no_journeys': true
    }
);
</script>
{% endhighlight %}

### Closing a Journey Programmatically

Journeys include a close button the user can click, but you may want to close the Journey with a timeout, or via some other user interaction with your web app.
In this case, closing the Journey is very simple by calling:

{% highlight javascript %}

branch.closeJourney(function(err) { console.log(err); });

{% endhighlight %}

### Trigger a Journey to Show by Firing an Event

If you block or programatically close a Journey via one the calls above, then you can trigger a Journey to show by firing the following event:

{% highlight javascript %}
branch.track('pageview');
{% endhighlight %}

**Note:** If a user has closed a Journey in the past, then firing the aforementioned event will not override a user's preference.

### Disable Journeys Animations

You can disable Journeys animations on a page by setting two flags - `disable_entry_animation` and `disable_exit_animation` - when you’re calling either init() or track() with Branch’s Web SDK.

Journeys animations can be disabled in order to reduce the amount of time it takes to load a Journey on a page. They can also be disabled in order to improve Journeys UX on single-page web apps, where Journeys animations can be jarring. When switching between multiple Journeys on a single-page web app, remember to use [setBranchViewData()](https://dev.branch.io/marketing-channels/journeys/guide/#deep-linking-from-the-banner-or-interstitial) to change the link behind the CTA.

To disable animations during initialization, insert `disable_entry_animation` and/or `disable_exit_animation`, with values of `true`, into the options:

{% highlight javascript %}
branch.init(‘BRANCH_KEY’,
    {
        ‘disable_entry_animation’ : true,
        ‘disable_exit_animation’ : true
    }
);
{% endhighlight %}

To disable animations using track(), insert `disable_entry_animation` and/or `disable_exit_animation`, with values of `true`, into the event metadata:

{% highlight javascript %}
branch.track(
    ‘pageview’,
    {},
	{
	    ‘disable_entry_animation’ : true,
        ‘disable_exit_animation’ : true
    }
);
{% endhighlight %}

### Listen to Journeys lifecycle events

You can easily listen to Journeys lifecycle events by registering listener functions like so:

{% highlight javascript %}

var listener = function(event) { console.log(event); }

// Specify an event to listen for
branch.addListener('willShowJourney', listener);

// Listen for all events
branch.addListener(listener);

{% endhighlight %}

| Listener Name | Description |
| --- | --- |
| willShowJourney | Journey is about to be shown. |
| didShowJourney | Journey's entrance animation has completed and it is being shown to the user. |
| willNotShowJourney | Journey will not be shown and no other events will be emitted. |
| didClickJourneyCTA | User clicked on Journey's CTA button. |
| didClickJourneyClose | User clicked on Journey's close button. |
| willCloseJourney | Journey close animation has started. |
| didCloseJourney | Journey's close animation has completed and it is no longer visible to the user. |

## Journeys text localization

Journeys now has an entire localization framework. Due to the complexity of this offering, we're not exposing it directly to partners. Please reach out to your account manager or integrations@branch.io to receive access to this functionality.

## CSS Editor {% premiumflag %}{% endpremiumflag %}

If you have an upgraded premium account, you may also modify your CSS code directly in addition to using the WYSIWYG View Editor. To do so, go to the **Configure Views** step, click to edit a template, and then select the **CSS Editor** tab on the **Customize Template** screen.

{% image src='/img/pages/features/journeys/view-css-editor.png' third center alt='view editor and css editor toggle' %}

## Template customization options

The customization options available depend on the template chosen:

- [Smart Banner](#smart-banner)
- [Full Screen Interstitial](#full-screen-interstitial) {% premiumflag %}{% endpremiumflag %}
- [Half Page Interstitial](#full-screen-interstitial) {% premiumflag %}{% endpremiumflag %}
- Floating Button {% premiumflag %}{% endpremiumflag %}

### Smart Banner

The available configuration options are identical for banners at both the top and the bottom of the screen.

#### Background

{% image src='/img/pages/features/journeys/customize-banner-background.png' 2-thirds center alt='background banner template' %}

| Option | Usage |
| --- | --- |
| Text Color | Specify the text color for elements without a specific setting. _Not currently used_ |
| Background Color | Set the background color of the banner |

#### Title

{% image src='/img/pages/features/journeys/customize-banner-title.png' 2-thirds center alt='title banner template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for title text |
| Title | The text of the title. Maximum 35 characters |

#### Description

{% image src='/img/pages/features/journeys/customize-banner-description.png' 2-thirds center alt='banner interstitial template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for description text |
| Description | The text of the description. Maximum 60 characters, will wrap to two lines |

#### Rating

{% image src='/img/pages/features/journeys/customize-banner-rating.png' 2-thirds center alt='rating banner template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for rating stars. Primarily useful for changing color |
| Rating Star Count | The number of stars of your App/Play Store rating average. We encourage you to be honest! |

#### Reviews

{% image src='/img/pages/features/journeys/customize-banner-reviews.png' 2-thirds center alt='reviews banner template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for reviews count |
| Reviews | The number of reviews of your app on the App/Play Store. We encourage you to be honest! |

#### Button

{% image src='/img/pages/features/journeys/customize-banner-button.png' 2-thirds center alt='button banner template' %}

| Option | Usage |
| --- | --- |
| Text Color | Change the color of the button text and button outline |
| Background Color | Change the color of the button background
| Button Text | Change the text shown when the app is installed and not installed. |
| Channel | Set the **[Channel]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `website`
| Tags | Set the **[Tags]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `purchase` and `fall-sale`
| Deep Link Data | Insert deep link data and advanced link control parameters. Can contain any [Branch link parameter](https://dev.branch.io/getting-started/configuring-links/)

#### Dismiss

{% image src='/img/pages/features/journeys/customize-banner-dismiss.png' 2-thirds center alt='dismiss button banner template' %}

| Option | Usage |
| --- | --- |
| Dismiss Period | Control how long the banner should be hidden once dismissed by the user. Options are `1 day`, `1 week`, `1 month`, `Never Again`, and `Custom` |

#### App Icon

{% image src='/img/pages/features/journeys/customize-banner-icon.png' 2-thirds center alt='app icon button banner template' %}

| Option | Usage |
| --- | --- |
| App Icon | Enter the URL for your app icon, or upload an image |

### Full screen interstitial {% premiumflag %}{% endpremiumflag %}

#### Background

{% image src='/img/pages/features/journeys/customize-fullpage-background.png' 2-thirds center alt='background interstitial template' %}

| Option | Usage |
| --- | --- |
| Text Color | Specify the text color for elements without a specific setting. _Not currently used_ |
| Background Color | Set the background color of the interstitial |
| Background | Enter the URL for your background graphic, or upload an image |
| Image Position | Control the vertical alignment of the background graphic |
| Content Position | Control the vertical alignment of the content block |

| Image Position | Usage |
| --- | --- |
| Top | Pin to top of screen, scale to full screen width |
| Center | Pin to middle of screen, scale to full screen width |
| Bottom | Pin to bottom of screen, scale to full screen width |
| Cover | Anchor to top of screen, scale to fill entire screen |

The content block contains everything except for the background image. Dimensions _within_ this block are preset and cannot be modified.

| Content Position | Usage |
| --- | --- |
| Top | Pin to top of screen |
| Center | Pin to center of 'safe' screen height (accounting for browser controls and device dimensions) |
| Bottom | Pin to bottom of 'safe' screen height (accounting for browser controls and device dimensions) |
| Custom | Position by relative percentage. Be sure to test for appropriate real-world alignment

#### Title

{% image src='/img/pages/features/journeys/customize-fullpage-title.png' 2-thirds center alt='title interstitial template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for title text |
| Title | The text of the title. Maximum 35 characters, will wrap to multiple lines |

#### Description

{% image src='/img/pages/features/journeys/customize-fullpage-description.png' 2-thirds center alt='description interstitial template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for description text |
| Description | The text of the description. Maximum 60 characters, will wrap to multiple lines |

#### Button

{% image src='/img/pages/features/journeys/customize-fullpage-button.png' 2-thirds center alt='button interstitial template' %}

| Option | Usage |
| --- | --- |
| Text Color | Change the color of the button text and button outline |
| Background Color | Change the color of the button background
| Button Text | Change the text shown when the app is installed and not installed. |
| Channel | Set the **[Channel]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `website`
| Tags | Set the **[Tags]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `purchase` and `fall-sale`
| Deep Link Data | Insert deep link data and advanced link control parameters. Can contain any [Branch link parameter](https://dev.branch.io/getting-started/configuring-links/)

#### Dismiss

{% image src='/img/pages/features/journeys/customize-fullpage-dismiss.png' 2-thirds center alt='dismiss button interstitial template' %}

| Option | Usage |
| --- | --- |
| Dismiss Text | Text to show users wanting to continue to your mobile website instead of downloading the app.
| Dismiss Period | Control how long before the same visitor should see the Journey again. Options are `1 day`, `1 week`, `1 month`, `Never Again`, and `Custom` |

## Premium journeys functionality

All Journeys features are available to upgraded apps, and are charged per event with a 14 day free trial. Visit [this page](https://branch.io/pricing) for full pricing information.

#### Limitations for apps with free accounts

- Any number of Journeys may be created in **Draft** mode using all features.
- An invitation to upgrade will be displayed when premium-only functionality (indicated with a {% premiumflag %}{% endpremiumflag %} icon) is enabled
- Only a single Journey using the Smart Banner template (either top or bottom position) may be **Active** at any one time.
- To enable a different Journey, the currently active Journey must first be put into **Stopped** mode.
- Any Journey using premium-only features cannot be placed into **Active** mode until the app has been upgraded.

## Web to app routing without Journeys

If you maintain a mobile website, Branch allows you to deep link mobile visitors directly into your app, or easily and automatically give them the option of downloading it. Here's a diagram that describes how it works:

{% image src='/img/pages/features/website-to-app-routing/deepview-websdk-routing.png' center full alt='Deepviews web routing' %}

### Open app if installed

Add the following code somewhere inside the `<head></head>` tags on your website and customize the [link parameters]({{base.url}}/getting-started/configuring-links) to suit your needs.

{% protip %}
What this script does is move a lot of the Branch redirection logic to the Javascript on your own page, effectively 'clicking a Branch link' on page load.
{% endprotip %}

{% highlight javascript %}
<script type="text/javascript">
// load the Branch SDK file
{% ingredient web-sdk-initialization %}{% endingredient %}
// define the deepview structure
branch.deepview(
    {
      'channel': 'mobile_web',
      'feature': 'deepview',
      data : {
        '$deeplink_path': 'page/1234',
        'user_profile': '7890',
        'page_id': '1234',
        'custom_data': 1234
      }
    },
    {
      'open_app': true  // If true, Branch attempts to open your app immediately when the page loads. If false, users will need to press a button. Defaults to true
    }
);
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

### Add an install call to action

Trigger the `branch.deepviewCta()` function with a button or hyperlink on your page. Executing this function (whether by button, link, or some other method) 'clicks' the link you defined using `branch.deepview()` above.

| Platform | Result of Call To Action
| --- | ---
| Mobile, app installed | Open app, deep link directly to content [if configured]({{base.url}}/features/website-to-app-routing/advanced/#deep-linking-from-your-website). This is a failsafe action in case the 'link click' on page load didn't fire correctly.
| Mobile, app NOT installed | Open App Store or Play Store page for your app, deep link directly to content after download [if configured]({{base.url}}/features/website-to-app-routing/advanced/#deep-linking-from-your-website).
| Desktop | Redirect to `$desktop_url` specified in the `deepview()` call, or fall back to your default web url from [Link Settings](https://dashboard.branch.io/#/settings/link).

{% example %}Here's how to add a simple hyperlink call to action:

{% highlight html %}
<a id='downloadapp' onclick='branch.deepviewCta()'>View this in app</a>
{% endhighlight %}
{% endexample %}

## Custom fonts with Journeys

1) Go to [Google Fonts](https://fonts.google.com/) and select a font.

{% image src='/img/pages/features/journeys/font_embedding.png' center half alt='Font embedding' %}

2) Add to CSS EDITOR in Journeys. Please note: trailing semicolon on @import line is important. It's always good to have a fallback web font in case the google font fails to load.

{% image src='/img/pages/features/journeys/custom_font.png' center half alt='Custom Fonts' %}


## Troubleshooting

### Calls to [branchsubdomain] blocked

{% ingredient branchsubdomain %}{% endingredient %}

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'">
{% endhighlight %}

### Non-mobile optimized sites

If you're not using a mobile viewport tag (`<meta name="viewport" content="width=device-width initial-scale=1, maximum-scale=1, user-scalable=no">`) because your site isn't mobile optimized, Journeys will look shrunken and weird. Don't worry, we have you covered:

1. design the banner as you would like it to look on your site
2. Go to the CSS editor and scroll to the bottom of the CSS code
3. Add two properties to the #branch-banner selector
    - `height: 228;`
    - `zoom: 3;`

The image will not look scaled properly in the editor view. This is because the dashboard is mobile optimized. Use the preview test link on the validation page to make sure the banner looks right

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.examples %}

## Example audiences

The Journeys audience tool is extremely powerful, but sometimes a few examples can help kickstart your creative juices. Here are are a couple common audience use cases to help you get started.

1. [New users](#example-new-users)
2. [Loyal users](#example-loyal-users)
3. [Retargeting users who have taken some action](#example-retargeting-users)
4. [Users from Google (for SEO)](#example-seo-friendly)
5. [iOS users from English-speaking countries](#example-english-speaking-ios-users)

All of these examples require you to configure advanced audience rules, which is a premium feature. You can add any set of complex rules using the following button:

{% image src='/img/pages/features/journeys/examples/advanced_add_filter.png' center full alt='Add rule' %}

### Example: New users

In this example, you'll configure an audience to target people who have visited your site **less than 3 times** historically. Anyone who had visited more than this will be excluded. First, you'll add a new rule for `Has visted web` in the advanced section.

{% image src='/img/pages/features/journeys/examples/new_users_0.png' center full alt='New users 0' %}

Next, you'll choose the `Less than or equal to` in the middle section:

{% image src='/img/pages/features/journeys/examples/new_users_1.png' center full alt='New users 1' %}

Finally, you'll enter 2 in the last part to indicate you want to target people who have visited less than 3 times historically.

{% image src='/img/pages/features/journeys/examples/new_users_2.png' center full alt='New users 2' %}

Save and continue!

### Example: Loyal users

In this example, you'll configure an audience to target people who have visited your site **more than 4 times** historically. Anyone who had visited less than this will be excluded. First, you'll add a new rule for `Has visted web` in the advanced section.

{% image src='/img/pages/features/journeys/examples/new_users_0.png' center full alt='loyal users 0' %}

Next, you'll choose the `More than or equal to` in the middle section:

{% image src='/img/pages/features/journeys/examples/loyal_users_1.png' center full alt='loyal users 1' %}

Finally, you'll enter 5 in the last part to indicate you want to target people who have visited more than 4 times historically.

{% image src='/img/pages/features/journeys/examples/loyal_users_2.png' center full alt='loyal users 2' %}

Save and continue!

### Example: Retargeting users

In this example, you'll configure an audience to target people who have completed some action on your site in a past or current session. For example, if a user had added something to their cart or had previously completed a purchase. You can retarget these users with a custom call to action to download. We'll use a generic event called `MyAction` in the example. First, you'll add a new rule for `Has completed event` in the advanced section.

{% image src='/img/pages/features/journeys/examples/retargeting_users_0.png' center full alt='retargeting users 0' %}

In this next dropdown, you'll choose the custom event to retarget from. Here, we'll use a generic event called `MyAction` but you would select `Purchase` or something more meaningful to your use case.

{% image src='/img/pages/features/journeys/examples/retargeting_users_1.png' center full alt='retargeting users 1' %}

Next, you'll choose the `More than or equal to` in the middle section:

{% image src='/img/pages/features/journeys/examples/retargeting_users_2.png' center full alt='retargeting users 2' %}

Finally, you'll enter 3 in the last part to indicate you want to target people who have completed `MyAction` more than 2 times historically.

{% image src='/img/pages/features/journeys/examples/retargeting_users_3.png' center full alt='retargeting users 3' %}

Save and continue!

### Example: SEO friendly

Google has recently announced that it will begin punishing sites that show a full page interstitial when a user comes from search. Because of this, you'll likely need to treat Google search traffic differently than traffic that comes from any other source. In this example, you'll set up an audience specific to users who come from Google. First, you'll add a new rule for `Came directly from a url` in the advanced section.

{% image src='/img/pages/features/journeys/examples/seo_friendly_0.png' center full alt='seo friendly 0' %}

Next, you'll choose the `starts with` in the middle section to match a substring:

{% image src='/img/pages/features/journeys/examples/seo_friendly_1.png' center full alt='seo friendly 1' %}

Finally, you'll enter `google.com` to target users who came from Google search (where the referrer starts with google.com):

{% image src='/img/pages/features/journeys/examples/seo_friendly_2.png' center full alt='seo friendly 2' %}

Alternatively, you can target users who did NOT come from Google search (where the referrer doesn't start with google.com):

{% image src='/img/pages/features/journeys/examples/seo_friendly_3.png' center full alt='seo friendly 3' %}

### Example: English speaking iOS users

In this example, you'll restrict the audience to users in countries where English is the native language who are on the iOS operating system. Note that this is not in the advanced audience section, but rather in the top section. First, select `iOS` of the mobile OS checkboxes.

{% image src='/img/pages/features/journeys/examples/ios_english_0.png' center full alt='ios english 0' %}

Next, go through and choose the following countries: `United States`, `Canada`, `United Kingdom` and `Australia`.

{% image src='/img/pages/features/journeys/examples/ios_english_1.png' center full alt='ios english 1' %}

Save and continue!

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.amp %}

[Accelerated Mobile Pages (AMP)](https://www.ampproject.org/){:target="_blank"} are a way to build pages that serve static content so that they load in Google search results much faster. Google uses AMP to quickly serve content on mobile devices without users having to click through to a website to view the content, and AMP pages often appear at the top of mobile search results. 

AMP pages by design make it difficult for users to go anywhere except back to Google search, and difficult for you to convert users to your website or your app. With AMP-compatible Journeys, you can convert mobile web traffic from Google search results to your app and take advantage of extra traffic from AMP pages. Select Journeys templates can be shown on your AMP-compatible website.

{% prerequisite %}

- To host AMP Journeys and show in Google search as an AMP page, your webpage must be [AMP](https://www.ampproject.org/docs/){:target="_blank"}-compatible.
- Journeys uses your alternate domain for Universal Links. Make sure you include your `xxxx-alternate.app.link` domain in your [Associated Domains]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-the-associated-domains-entitlement-to-your-project). If you’re unsure of your Branch-assigned app.link subdomain, [contact support](https://support.branch.io/support/tickets/new){:target="_blank"}, and we can provide it.

{% endprerequisite %}

## Add the Branch AMP SDK to your site

The AMP SDK consists of 2-3 snippets that you can insert into your AMP page.

Add the following snippet between the AMP page’s `<head></head>` tags:
   {% highlight html %}<style amp-custom>#branch-amp-journey{bottom:0;left:0;width:100%;height:77px;position:fixed;}.hideme{width:100%;height:77px;left:24px;background-color:none;position:fixed;}.close{width:24px;height:100%;left:0;z-index:10000;background-color:none;position:fixed;}.branch-amp-journey-inner{position:relative;width:100%;height:100%;z-index:9999;}.donotdisplay{display:none;}</style>{% endhighlight %}

Modify the following snippet to include your domain instead of **`DOMAIN_HERE`** and your Branch key instead of **`BRANCH_KEY_HERE`** - in both the `amp-list` tag and the `amp-iframe` tag. You can find these in [Link Settings](https://dashboard.branch.io/link-settings){:target="_blank"} and [Account Settings](https://dashboard.branch.io/account-settings){:target="_blank"}.
   {% highlight html %}{% raw %}<amp-list tabindex=0 role="" on="tap:branch-amp-journey.hide" id="branch-amp-journey" src="https://DOMAIN-HERE/branch-amp-journeys-pre?branch_key=BRANCH_KEY_HERE&__aj_cid=CLIENT_ID(_s)&__amp_viewer=VIEWER&__aj_source_url=SOURCE_URL&__aj_canonical_url=CANONICAL_URL&__aj_v=1.0.0" layout=fixed-height height="77px"><template type="amp-mustache" id="journey-template"><a class="close" on="tap:branch-amp-journey.hide"></a><div class="hideme" ></div><amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_audience_rule_id={{_audience_rule_id}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe></template></amp-list>{% endraw %}{% endhighlight %}
Then add the modified snippet between the `<body></body>` tags of your AMP page, preferably near or at the bottom.

Finally, if you do not already have the following AMP scripts on your page, add them between the AMP page's `<head></head>` tags:
   {% highlight html %}<script async src="https://cdn.ampproject.org/v0/amp-list-0.1.js" custom-element="amp-list"></script><script async src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js" custom-template="amp-mustache"></script><script async src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js" custom-element="amp-iframe"></script>{% endhighlight %} 

{% protip title="Include canonical URL for SEO and deep linking" %}
[Google recommends](https://www.ampproject.org/docs/guides/discovery){:target="_blank"} that on your AMP page, you include a reference to the canonical URL of the non-AMP page with the same content. For example, you should include a tag like this in the `<head></head>` section of your AMP page:
  {% highlight html %}<link rel="canonical" href="https://example.com/article.html">{% endhighlight %}
This helps make your AMP page discoverable, and likely helps ensure that SEO information is shared between these two pages. Additionally, Branch automatically embeds the canonical URL in the Journey link data, leading to better identification of content and the ability to use this key for deep linking.
{% endprotip %}

## Target AMP Web in your audience

AMP Journeys can be created as part of the normal [Journeys creation flow](https://dashboard.branch.io/web/journeys/audiencerule/new){:target="_blank"}. You can target users on AMP pages by checking the box **AMP Web** on the Select Audience step:

{% image src='/img/pages/features/journeys/amp-checkbox.png' center half alt='AMP Web checkbox' %}

See the [Journeys Guide](/marketing-channels/journeys/guide#select-audience) for more information on selecting your audience.

### Audience rule limitations

Because cookies are restricted on both AMP and iOS, event-based audience rules on AMP Journeys are cookie-restricted. Practically, this means that targeting works *only within AMP* for the following rules:

* Has completed event
* Has visited web
* Has visited the app
* Has the app installed

Once a user has clicked a Branch link outside of AMP, event-based audience rules will adhere to the regular web cookie for that user, and will work across AMP and non-AMP web.

### URL-based targeting with AMP

With AMP, Google will serve your page from the Google AMP cache. This means that the URL that serves your AMP page will look something like `https://www.google.com/amp/s/www.example.com/amp/doc.html`. However, Branch passes through your original source URL, and this is what you should use for audience targeting. For the advanced audience filter **Is viewing a page URL**, you'll want to use the original URL where you host the AMP page. In this example, that would be `https://www.example.com/amp/doc.html`.

## Select an AMP-compatible template

Once you have your audience selected, you can configure your templates. Currently, only **Branch Standard Banner Bottom** is supported on AMP because Google requires that banners not show in the top 75% of an AMP page. Over time, Branch will add support for more Journeys templates.

When you click **Select Template** from the **Configure Views** step, the **standard bottom banner** view type should already be selected, showing you the Journeys templates that are compatible with AMP:

{% image src='/img/pages/features/journeys/amp-select-template.png' center half alt='AMP-compatible templates' %}

Hover over the template and click **Create**.

### Customization limitations

For the time being, only banners of a fixed height and placement (bottom of the page) are compatible with AMP. This includes **Branch Banner Bottom**, or other custom banners with page placement on the bottom of the page and height of 76px.

## Validate & Test your AMP Journey

On the **Validate & Test** step, you will see AMP-specific messages if you have targeted **AMP Web** users on the [Select Audience](#target-amp-web-in-your-audience) step.

{% image src='/img/pages/features/journeys/amp-validation.png' center 2-thirds alt='AMP validation messages' %}

### The selected template is not AMP-compatible

If Branch has detected that you have selected a template that is not compatible with AMP, you will see an error on the **Validate & Test** step. [See which templates are currently compatible](#customization-limitations).

## Deep linking with AMP

You can [configure links] with deep link data on AMP in two ways:

1. Add query parameters to your Branch link in the AMP SDK
1. Add deep link data to a Journey in the dashboard

{% protip title="Use $canonical_url for deep linking" %}
AMP Journeys, along with regular Journeys and the Quick Link Creator, automatically embeds `$canonical_url` in your link data based on meta tags on your web or AMP page. If you use this key to route to specific content in your app, you do not have to add anything extra for AMP.
{% endprotip %}

### Add query parameters in the AMP SDK

To deep link to specific content in your app, you can add query parameters to your Branch link within the `amp-iframe`. Here is what the `amp-iframe` looks like without any query parameters:

{% highlight html %}{% raw %}
<amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_audience_rule_id={{_audience_rule_id}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe>
{% endraw %}{% endhighlight %}

If your deep linking keys were **productId** and **category**, for example, you would add `&productId=1234&category=shoes` to your `amp-iframe` like this:

{% highlight html %}{% raw %}
<amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_audience_rule_id={{_audience_rule_id}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0&productId=1234&category=shoes" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe>
{% endraw %}{% endhighlight %}

If you are generating AMP pages programmatically, it makes sense to generate these keys as query params at the same time.

#### Dynamic layout customization

You can customize the appearance of a Journey dynamically using query parameters on your `amp-iframe` link. These are the fields currently supported for dynamic layout customization on AMP:

| **Link Data Key** | **Value** | **Example** |
| ---: | --- | --- |
| `$journeys_button_get_has_app` | The call to action button when the app is currently installed | `$journeys_button_get_has_app=Download` |
| `$journeys_button_get_no_app` | The call to action button when the app is **not** currently installed | `$journeys_button_get_no_app=Read` |
| `$journeys_description` | This is the description or subtitle in the frame | `$journeys_description=Continue+reading+in+the+app.` |

### Add deep link data in the Journeys dashboard

You can also add deep link data to a Journey in the dashboard. In the **Customize Template** screen, click the button and add your key:value pairs in the deep link data fields. For example if your deep linking key was **productId**:

{% image src='/img/pages/features/journeys/amp-deep-link-data.png' center 3-quarters alt='Add rule' %}

## AMP Journeys analytics

Analytics for AMP Journeys works the [same way as for regular Journeys](/marketing-channels/journeys/guide/#visualizing-journeys-performance), in that you can see clicks, opens, installs, and custom events tied to your Journey by clicking **View Performance** from the actions menu for your AMP Journey.

{% image src='/img/pages/features/journeys/view-performance.png' quarter center alt='view performance' %}

## AMP-specific restrictions

Because javascript is limited on AMP and cookies are restricted on both AMP and iOS, AMP Journeys does not support all of standard Journeys functionality. The following Journeys features are affected:

* Event-based audience rules work within AMP only or after a Branch link click on an AMP page. [Read more](#audience-rule-limitations).
* Only templates on the bottom of the page and equal to 76px in height show on AMP. [Read more](#customization-limitations).
* [Dismiss period](/marketing-channels/journeys/guide/#dismiss) is not supported - after dismiss, Journeys will show again during the next AMP session.
* [Client-side javascript controls](/marketing-channels/journeys/guide/#clientside-javascript-journeys-controls) are not supported.
* Auto-opening the app with open_app: true is not supported.
* [Deep linking with setBranchViewData](/marketing-channels/journeys/guide/#deep-linking-from-the-banner-or-interstitial) is not supported. [Learn how](#deep-linking-with-amp) you can deep link to content from AMP pages.

{% endif %}
