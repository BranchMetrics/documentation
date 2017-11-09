---
type: recipe
directory: marketing-channels
title: "Deepviews"
page_title: "Deepviews - Mobile Web Splash Pages"
description: Learn how to create a mobile web Deepview using Branch links.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
- react
sections:
- overview
- guide
- advanced
alias: [ /features/deepviews/, /features/deepviews/overview/, /features/deepviews/guide/ios/, /features/deepviews/guide/android/, /features/deepviews/guide/cordova/, /features/deepviews/guide/xamarin/, /features/deepviews/guide/unity/, /features/deepviews/guide/adobe/, /features/deepviews/guide/titanium/, /features/deepviews/guide/react/, /features/deepviews/advanced/ios/, /features/deepviews/advanced/android/, /features/deepviews/advanced/cordova/, /features/deepviews/advanced/xamarin/, /features/deepviews/advanced/unity/, /features/deepviews/advanced/adobe/, /features/deepviews/advanced/titanium/, /features/deepviews/advanced/react/ ]
redirect: https://docs.branch.io/pages/web/deep-views/
---



{% if page.overview %}

A Deepview is a mobile web splash page, hosted by Branch, that gives a preview of the in-app content behind a given Branch link. When a visitor opens one of your Branch links and does not have your app installed, you can show them a Deepview instead of sending them directly to the App/Play Store.

Deepviews are discoverable in all search portals (Google, Apple Spotlight, Bing, etc), opening up new mechanisms for people to find your app, and drive much higher conversions to install than sending visitors to the App/Play Store directly. Here's an example flow:

{% image src='/img/pages/features/deepviews/deepviews_allthecooks.gif' actual center alt='Deepviews example' %}

{% protip title="If you already have a mobile website..." %}The [Website to App Routing]({{base.url}}/features/website-to-app-routing) feature can be used to recreate the functionality of Deepviews using your own website. If you already host your own content previews, this is a good alternative!{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- For Deepviews to function as intended, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Deepviews uses your alternate domain for Universal Links. Make sure you include your `xxxx-alternate.app.link` domain in your [Associated Domains]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-the-associated-domains-entitlement-to-your-project).
- If you use a custom domain or subdomain for your Branch links, you should instead add entries for `applinks:[mycustomdomainorsubdomain]` and `XXXX-alternate.app.link`. If you’re unsure of your Branch-assigned app.link subdomain, [contact support](https://support.branch.io), and we can provide it.

{% endprerequisite %}

## Enable Deepviews on the Branch dashboard

1. Head to the [Deepviews configuration page](https://dashboard.branch.io/#/settings/deepviews) on the Branch dashboard.
1. Deepviews are configured separately for visitors on each platform (iOS, Android, and desktop). Select the platforms you want and click **Enable**.

{% image src='/img/pages/features/deepviews/deepviews_enable.png' third center alt='Deepviews tab' %}

{% caution %}
If you enable desktop Deepviews, they will override any [Text-Me-The-App]({{base.url}}/features/text-me-the-app) page you have configured.
{% endcaution %}

{% protip title="Changing the app icon" %}If we pulled the wrong app icon, you can upload a new one in the _Social Media Display Customization_ section of the [dashboard Settings](https://dashboard.branch.io/#/settings/link).{% endprotip %}

## View the analytics

Branch lets you track the flow of users through Deepviews. You can find this information on the [summary page](https://dashboard.branch.io/#) of the Branch dashboard.

{% image src='/img/pages/features/deepviews/deepview_analytics.png' 2-thirds center alt='Deepviews analytics tab' %}

There are various metrics to understand when deep linking from your mobile website.

- **Views:** a user viewed the mobile site.
- **Clicks:** a user clicked on the Deepview CTA
- **Installs:** a user installed the app for the first time
- **Upgrades:** a user re-opened or upgraded the app from a previous version

Only users who do not have the app will go through this flow. You can view the total counts and conversion rate from each step on this chart.

## Customizations

This is all you need to do to enable Deepviews. For each link, Branch will attempt to intelligently display the best content we have available. However, you can (and will probably want to!) customize what is shown. See the [Advanced]({{base.url}}/marketing-channels/deepviews/advanced/) page for more information.

{% elsif page.advanced %}

## Use pages on your own website for Deepviews

The [Website to App Routing]({{base.url}}/features/website-to-app-routing) feature can be used to recreate the functionality of Deepviews using your own website. If you already host your own content previews, try this instead.

## Customizing Deepview content

The default Deepview template simply displays the content from three of the link's [control parameters]({{base.url}}/getting-started/configuring-links). You can specify the content of these parameters when creating your link to control what will display in that link’s Deepview. If nothing is set for a particular link, we will gracefully fall back to the OG values set for your entire app in _Settings > Link Settings > Social Media Display Customization._

| Key | Value
| --- | ---
| **$og_title** | The title you'd like to appear on the deepview
| **$og_description** | The description you'd like to appear on the deepview
| **$og_image_url** | The URL for the image you'd like to appear on the deepview

{% protip title="Hosting your own OG tags" %}
If you want to use OG tags you host elsewhere, leave these parameters empty and specify a **$desktop_url** control parameter when you create the link. Branch will perform a one-time scrape to populate the Deepview using the OG tags from the URL you specify.
{% endprotip %}

{% example title="When creating links dynamically" %}
If you're creating a link by appending query parameters, just append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

{% highlight javascript %}
"https://[branchsubdomain]?%24og_title=MyApp%20is%20disrupting%20apps&$og_image_url=http%3A%2F%2Fmyapp.com%2Fimage.png"
{% endhighlight %}
{% endexample %}

{% example title="When using a mobile SDK" %}
When you create links via a mobile SDK, you simply need to set the OG tag parameters.

<!--- iOS -->
{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

// Add any additional custom OG tags here
[branchUniversalObject addMetadataKey:@"$og_video" value:@"http://mysite/video.mpg"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"

// Add any additional custom OG tags here
branchUniversalObject.addMetadataKey("$og_video", value: "http://mysite/video.mpg")
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}
<!--- /iOS -->

<!--- Android -->
{% if page.android %}
{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")

// Add any additional custom OG tags here
                .addContentMetadata("$og_video", "http://mysite/video.mpg");
{% endhighlight %}
{% endif %}
<!--- /Android -->

<!--- Codova -->
{% if page.cordova %}
{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'item/12345',
// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
  title: 'My Content Title',
  contentDescription: 'My Content Description',
  contentImageUrl: 'https://example.com/mycontent-12345.png,
  contentMetadata: {
    '$og_video': 'http://mysite/video.mpg'
  }
}).then(function (newBranchUniversalObj) {
  branchUniversalObj = newBranchUniversalObj;
  console.log(newBranchUniversalObj);
});
{% endhighlight %}
{% endif %}
<!--- /Cordova -->

<!--- Xamarin -->
{% if page.xamarin %}
{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "item/12345";
universalObject.title = "Hot off the presses!";
universalObject.contentDescription = "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out.";
universalObject.imageUrl = "http://yoursite.com/pics/987666.png";
universalObject.metadata.Add("$og_video", "http://mysite/video.mpg");
{% endhighlight %}
{% endif %}
<!--- /Xamarin -->

<!--- Unity -->
{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> parameters = new Dictionary<string, object>
{
    { "article_id", "1234" },
    { "$og_title", "Hot off the presses!" },
    { "$og_image_url", "http://yoursite.com/pics/987666.png" },
    { "$og_description", "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out." }
}

string channel = "sms";
string feature = "share";
Branch.getShortURLWithTags(parameters, channel, feature, delegate(string url, string error) {
    // show the link to the user or share it immediately
});
{% endhighlight %}
{% endif %}
<!--- /Unity -->

<!--- Adobe -->
{% if page.adobe %}
{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
    "article_id": "1234",
    "$og_title": "Hot off the presses!",
    "$og_image_url": "http://yoursite.com/pics/987666.png",
    "$og_description": "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out."
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}
<!--- /Adobe -->

<!--- /Titanium -->
{% if page.titanium %}
{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",

// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
  "title" : "My Content Title",
  "contentDescription" : "My Content Description",
  "contentImageUrl" : "https://example.com/mycontent-12345.png",

  "contentIndexingMode" : "public",
  "contentMetadata" : {
      "product_picture" : "12345",
      "user_id" : "6789"
  },
});
{% endhighlight %}
{% endif %}
<!--- /Titanium -->

<!--- /React -->
{% if page.react %}
{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'content/12345', // canonical identifier
  {
    contentTitle: 'My Content Title',
    contentImageUrl: 'https://example.com/mycontent-12345.png',
    contentDescription: 'My Content Description',
    metadata: {
      $og_video: 'http://mysite/video.mpg'
    }
  }
)
{% endhighlight %}
{% endif %}
<!--- /React -->

{% endexample %}

{% example title="When creating Quick Links on the Branch dashboard" %}
Edit the Title, Description and Image URL in the _Social Media Description_ section. 

{% image src='/img/pages/features/deepviews/deepviews_social_media_description.png' 2-thirds center alt='Social Media Description' %}

**Note:** the _Deep Link Data (Advanced)_ section accepts most link control parameters, but `$og_title`, `$og_description` and `$og_image_url` **cannot** be specified there.

{% endexample %}

## Enabling Deepviews for one link

If you don't want to enable Deepviews globally, you can do it for each platform on a per link basis by inserting custom link control parameters [link control parameters]({{base.url}}/getting-started/configuring-links).

#### Active Deepviews

Active deepviews should only show when the app is _not_ installed (or when direct deep linking doesn't work like in the Facebook webview), and pause on the deepview page. These let the user preview the content, ultimately deciding if they want to install the app. The user must click the call-to-action of `Get The App` in order to be sent to the appropriate App or Play Store page.

| Key | Value | Default Template
| --- | --- | ---
| $ios_deepview | The name of the template to use for iOS. | `default_template`
| $android_deepview | The name of the template to use for Android. | `default_template`
| $desktop_deepview | The name of the template to use for the desktop. | `default_template`

#### Passive Deepviews

Passive deepviews should also only appear when the app is _not_ installed, but instead of pausing on the deepview page, they will attempt to redirect to the App/Play Store immediately without the user taking action. These should be used when you don't want a blank white screen to be left in a browser after the user clicks a link to go install your app. Note that these are automatically enabled in Safari iOS 10.3 and Facebook iOS webviews if you're attempting to redirect to your Store page.

To disable passive deepviews, simply set the value to `false` in the link data.

| Key | Value | Default
| --- | --- | ---
| $ios_passive_deepview | The name of the template to use for iOS. | `default_template`
| $android_passive_deepview | The name of the template to use for Android. | `default_template`

{% example title="When creating links dynamically" %}
If you're creating a link by appending query parameters, you simply need to append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

Here's how to enable iOS and desktop Deepviews:

{% highlight javascript %}
"https://[branchsubdomain]?%24ios_deepview=default_template&%24desktop_deepview=default_template"
{% endhighlight %}
{% endexample %}

{% example title="When using a mobile SDK" %}
Here's how to enable iOS and Android Deepviews on a link using a mobile SDK call:

<!--- iOS -->
{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$ios_deepview" withValue:@"default_template"];
[linkProperties addControlParam:@"$android_deepview" withValue:@"default_template"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$ios_deepview", withValue: "default_template")
linkProperties.addControlParam("$android_deepview", withValue: "default_template")
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}
<!--- /iOS -->

<!--- Android -->
{% if page.android %}
{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$ios_deepview", "default_template")
               .addControlParameter("$android_deepview", "default_template");
{% endhighlight %}
{% endif %}
<!--- /Android -->

<!--- Cordova -->
{% if page.cordova %}
{% highlight js %}
branchUniversalObj.generateShortUrl({
  // put your link properties here
  "feature" : "sharing",
  "channel" : "facebook"
}, {
  // put your control parameters here
  "$ios_deepview" : "default_template",
  "$android_deepview" : "default_template"
}).then(function (res) {
    // Success Callback
    console.log(res.generatedUrl);
});
{% endhighlight %}
{% endif %}
<!--- /Cordova -->

<!--- Xamarin -->
{% if page.xamarin %}
{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$ios_deepview", "default_template");
linkProperties.controlParams.Add("$android_deepview", "default_template");
{% endhighlight %}
{% endif %}
<!--- /Xamarin -->

<!--- Unity -->
{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> parameters = new Dictionary<string, object>
{
	{ "$ios_deepview", "default_template" },
	{ "$android_deepview", "default_template" }
}

string channel = "facebook";
string feature = "share";
Branch.getShortURLWithTags(parameters, channel, feature, delegate(string url, string error) {
    // show the link to the user or share it immediately
});
{% endhighlight %}
{% endif %}
<!--- /Unity -->

<!--- Adobe -->
{% if page.adobe %}
{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
	"$ios_deepview": "default_template",
	"$android_deepview": "default_template"
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}
<!--- /Adobe -->

<!--- Titanium -->
{% if page.titanium %}
{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "share",
  "channel" : "facebook"
}, {
  "$ios_deepview": "default_template",
  "$android_deepview": "default_template"
});

branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}
{% endif %}
<!--- /Titanium -->

<!--- React -->
{% if page.react %}
{% highlight js %}
let linkProperties = {
  feature: 'share',
  channel: 'facebook'
}

let controlParams = {
  "$ios_deepview": "default_template",
  "$android_deepview": "default_template"
}

let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}
{% endif %}
<!--- /React -->

{% endexample %}

{% example title="When creating Quick Links on the Branch dashboard" %}

You can enable Deepviews for an individual link on the [Marketing dashboard](https://dashboard.branch.io/quick-links/mlc/define){:target="_blank"} by selecting Deepviews as a redirect option in Configure Options > Redirects.

{% image src='/img/pages/features/deepviews/deepviews-mlc.png' full center alt='Quick Link Deepviews' %}

{% endexample %}

## Disabling Deepviews for one link

If you've enabled Deepviews globally, it's likely that you'll want to disable them now and again for specific use cases. To do so, just follow the instructions for [_enabling Deepviews for one link_](#enabling-deepviews-for-one-link) and set one or more of the key values to `false`.

| Key | Value |
| --- | --- |
| **$ios_deepview** | `false` |
| **$android_deepview** | `false` |
| **$desktop_deepview** | `false` |

{% example title="When creating Quick Links on the Branch dashboard" %}

You can disable Deepviews for an individual link on the [Marketing dashboard](https://dashboard.branch.io/quick-links/mlc/define){:target="_blank"} by selecting Deepviews as a redirect option in Configure Options > Redirects and setting it to false.

{% image src='/img/pages/features/deepviews/deepviews-disable-mlc.png' full center alt='Disable Quick Link Deepviews' %}

{% endexample %}

## Customizing the Deepview templates

You can create new Deepview templates using the [Deepviews configuration page](https://dashboard.branch.io/settings/deepviews){:target="_blank"} on the Branch dashboard, either by duplicating the default Branch Public Template, or by creating a new one from scratch. New Deepview templates are shared between all platforms (iOS, Android, and desktop), and cannot be deleted after creation.

{% image src='/img/pages/features/deepviews/deepview-create-template.png' third center alt='Deepviews tab' %}

The Deepview editing screen contains two tabs: **Basic** and **Editor**.

### Basic

The Basic tab displays your new template, and allows you to modify the default fallback OG tags used if none are specified for a link.

{% image src='/img/pages/features/deepviews/deepviews_editor_basic.png' 2-thirds center alt='Deepviews tab' %}

#### Deepview Settings

| Setting | Usage |
| --- | --- |
| Title | Internal name for your reference |
| Key | The value that you will reference when creating a link. E.g., `$ios_deepview: [key]` |

#### App Settings 

{% caution %}
These fields are duplicates of the _Social Media Display Customization_ section of your app's [main link settings page](https://dashboard.branch.io/#/settings/link). Any updates will be applied in both locations.
{% endcaution %}

| Setting | Usage |
| --- | --- |
| OG Title | Default value used if `$og_title` is not specified for a link.
| OG Description | Default value used if `$og_description` is not specified for a link.
| OG Image Url | Default value used if `$og_image_url` is not specified for a link.

### Editor

The Editor tab allows you to edit the raw HTML and CSS for your template. The rendered template will update as you modify the markup.

{% image src='/img/pages/features/deepviews/deepviews_editor_code.png' 2-thirds center alt='Deepviews tab' %}

{% caution title="Javascript is not allowed on deepview templates" %}
Before rendering the template, we sanitize the markup of Javascript for security reasons. This includes script tags and event attributes on tags.
{% endcaution %}


## Using liquid tags in Deepviews

By customizing your Deepview template, you have the ability to pass through other parameters from your link's [data dictionary]({{base.url}}/getting-started/configuring-links).

Here's a full list of liquid available tags:

### {% raw %}{{app}}{% endraw %}
App Object, which contains app data not specific to any link.

| Key | Usage |
| --- | --- |
| `app.branch_key` | Your Branch key from [Settings](https://dashboard.branch.io/#/settings).
| `app.name` | The name of your app from [Settings](https://dashboard.branch.io/#/settings).
| `app.og_title` | The **Link Title** set in the _Social Media Display Customization_ section of your app's [Link Settings](https://dashboard.branch.io/#/settings/link).
| `app.og_description` | The **Description** set in the _Social Media Display Customization_ section of your app's [Link Settings](https://dashboard.branch.io/#/settings/link).
| `app.og_image_url` | The **Thumbnail Image** set in the _Social Media Display Customization_ section of your app's [Link Settings](https://dashboard.branch.io/#/settings/link).

{% example %}
If you want to show your app's name inside a Deepview, you would expose it like so: `<h1>Get {% raw %}{{app.name}}{% endraw %}</h1>`
{% endexample %}

### {% raw %}{{link_data}}{% endraw %}
Link Object, which contains all of your link's parameters, including your deep link values from the data dictionary. See the [Configuring Links]({{base.url}}/getting-started/configuring-links) page for more information.

{% example %}
If you want to expose a key value pair of `'welcome_message' : 'Welcome to my App'`, you would do the following: `<h1>{% raw %}{{link_data.welcome_message}}{% endraw %}</h1>`, and this would render `Welcome to my App`.
{% endexample %}

### {% raw %}{{action}}{% endraw %}
The URL of the Branch link itself. If you create a new call to action in your Deepview, use this.

{% example %}
Create a new call to action link: `<a href="{% raw %}{{action}}{% endraw %}">Click</a>`.
{% endexample %}

{% endif %}
