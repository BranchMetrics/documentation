---
type: recipe
directory: getting-started
title: Creating Links
page_title: How to create Branch links
description: Learn about the multiple ways to create Branch deep links for iOS and Android apps.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
- react
- mparticle_ios
- mparticle_android
sections:
- overview
- apps
- dashboard
- chrome-extension
- other-ways
hide_platform_selector:
- dashboard
- chrome-extension
- other-ways
contents:
  list:
  number:
    - apps
    - dashboard
  hide:
redirect: https://docs.branch.io/pages/links/integrate/
---

{% if page.overview %}
Links are the foundation of everything Branch offers:

- By using our mobile SDKs to [create Branch links in your app]({{base.url}}/getting-started/creating-links/apps), you can enable your users to share content or invite friends.
- By [creating links in the dashboard]({{base.url}}/getting-started/creating-links/dashboard) or [with the chrome extension]({{base.url}}/getting-started/creating-links/chrome-extension), you can turn your social posts, ads, or whatever other use case you can think of into a deep link into your app.
- By using our web SDK with [Journeys]({{base.url}}/features/journeys) to [create Branch links from your website]({{base.url}}/getting-started/creating-links/other-ways#web-sdk), you can convert your mobile web traffic to app users.

{% protip %}
You can read more about using the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters used throughout this guide on the [Link Configuration page]({{base.url}}/getting-started/configuring-links).

Learn how to set up your app to interpret key/value pairs in the [Deep Link Routing guide]({{base.url}}/getting-started/deep-link-routing).
{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.apps %}

### Creating links in apps

{% ingredient quickstart-prerequisite %}{% endingredient %}

<!--- iOS -->
{% if page.ios or page.mparticle_ios %}

## Import framework

{% tabs %}
{% tab objective-c %}
Import the Branch framework into the view controller where you will be creating links:

{% highlight objective-c %}
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
In the <your project>-Bridging-Header.h, add the following:

{% highlight swift %}
#import "Branch.h"
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
#import "BranchConstants.h"
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"
branchUniversalObject.addMetadataKey("property1", value: "blue")
branchUniversalObject.addMetadataKey("property2", value: "red")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$desktop_url" withValue:@"http://example.com/home"];
[linkProperties addControlParam:@"$ios_url" withValue:@"http://example.com/ios"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$desktop_url", withValue: "http://example.com/home")
linkProperties.addControlParam("$ios_url", withValue: "http://example.com/ios")
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error && url) {
        NSLog(@"success getting url! %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrl(with: linkProperties) { (url, error) in
    if error == nil {
        print("got my Branch link to share: %@", url)
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/ios/#showsharesheetwithlinkproperties).
{% endprotip %}

{% protip title="What happens if the internet goes out?" %}
When the Branch SDK requests a short link, it will try three times before failing. In the event that the request fails, the SDK reverts to local link generation. Rather than not creating a link at all, the link parameters will be appended as query params, and then the link metadata is appended as base64 encoded data. If your app is generating unusually long links, check the device's internet connection.
{% endprotip %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android or page.mparticle_android %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                .addContentMetadata("property1", "blue")
                .addContentMetadata("property2", "red");
{% endhighlight %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$desktop_url", "http://example.com/home")
               .addControlParameter("$ios_url", "http://example.com/ios");
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

{% highlight java %}
branchUniversalObject.generateShortUrl(this, linkProperties, new BranchLinkCreateListener() {
    @Override
    public void onLinkCreate(String url, BranchError error) {
        if (error == null) {
            Log.i("MyApp", "got my Branch link to share: " + url);
        }
    }
});
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/android/#showsharesheet).
{% endprotip %}

{% protip title="What happens if the internet goes out?" %}
When the Branch SDK requests a short link, it will try three times before failing. In the event that the request fails, the SDK reverts to local link generation. Rather than not creating a link at all, the link parameters will be appended as query params, and then the link metadata is appended as base64 encoded data. If your app is generating unusually long links, check the device's internet connection.
{% endprotip %}

{% endif %}
<!--- /Android -->

{% if page.cordova %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight js %}
// only canonicalIdentifier is required
var properties = {
    canonicalIdentifier: '123',
    canonicalUrl: 'http://example.com/123',
    title: 'Content 123',
    contentDescription: 'Content 123 ' + Date.now(),
    contentImageUrl: 'http://lorempixel.com/400/400/',
    price: 12.12,
    currency: 'GBD',
    contentIndexingMode: 'private',
    contentMetadata: {
        'custom': 'data',
        'testing': 123,
        'this_is': true
    }
};

// create a branchUniversalObj variable to reference with other Branch methods
var branchUniversalObj = null;
Branch.createBranchUniversalObject(properties).then(function(res) {
    branchUniversalObj = res;
    alert('Response: ' + JSON.stringify(res));
}).catch(function(err) {
    alert('Error: ' + JSON.stringify(err));
});
{% endhighlight %}

## Assemble link parameters

Then, create the link to be shared by referencing the `BranchUniversalObject` and defining the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination. We also added a default redirect to a website on the desktop.

{% highlight js %}
// optional fields
var analytics = {
    channel: "channel",
    feature: "feature",
    campaign: "campaign",
    stage: "stage",
    tags: ["one","two","three"]
};

// optional fields
var properties = {
    $fallback_url: "www.example.com",
    $desktop_url: "www.desktop.com",
    $android_url: "www.android.com",
    $ios_url: "www.ios.com",
    $ipad_url: "www.ipad.com",
    more_custom: "data",
    even_more_custom: true,
    this_is_custom: 41231
};

branchUniversalObj.generateShortUrl(analytics, properties).then(function(res) {
    alert(JSON.stringify(res.url));
}).catch(function(err) {
    alert(JSON.stringify(err));
});
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/cordova/#showsharesheet).
{% endprotip %}

{% endif %}

{% if page.xamarin %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "item/12345";
universalObject.title = "My Content Title";
universalObject.contentDescription = "My Content Description";
universalObject.imageUrl = "https://example.com/mycontent-12345.png";
universalObject.contentIndexMode = 0; // 1 for private
universalObject.metadata.Add("property1", "red");
universalObject.metadata.Add("property2", "blue");
{% endhighlight %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$desktop_url", "http://example.com/home");
linkProperties.controlParams.Add("$ios_url", "http://example.com/ios");
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

{% highlight c# %}

Branch.GetInstance().GetShortURL (callback,
                              universalObject,
                              linkProperties);

{% endhighlight %}

After you've registered the class as a delegate of `IBranchUrlInterface`, you would next use the returned link and help the user post it to (in this example) Facebook.

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
{% endhighlight %}
{% endif %}

<!--- Unity -->

{% if page.unity %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "id12345";
universalObject.title = "id12345 title";
universalObject.contentDescription = "My awesome piece of content!";
universalObject.imageUrl = "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png";
universalObject.metadata.Add("foo", "bar");
{% endhighlight %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "invite";
linkProperties.channel = "Twitter";
linkProperties.stage = "2";
linkProperties.controlParams.Add("$desktop_url", "http://example.com");
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

{% highlight c# %}
Branch.getShortURL(universalObject, linkProperties, (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.getShortURL failed: " + error);
    } else {
        Debug.Log("Branch.getShortURL shared params: " + url);
    }
});
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/unity/#sharelink).
{% endprotip %}

{% endif %}

<!--- Adobe -->

{% if page.adobe %}

## Add the event listeners and functions

Use this snippet to register the methods that respond when link creation succeeds or fails:

{% highlight java %}
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}
{% endhighlight %}

## Assemble link information

Build your key/value pairs and add any additional analytics and control parameters:

{% highlight java %}
var dataToInclude:Object = {
  "article_id": "1234",
  "$og_title": "Hot off the presses!",
  "$og_image_url": "mysite.com/image.png",
  "$desktop_url": "mysite.com/article1234"
};
{% endhighlight %}

## Generate the links

Then generate the link with the getShortUrl() method:

{% highlight java %}
branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",
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

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters and generate the links

Define the analytics tags and control parameters, and generate the link by referencing the `BranchUniversalObject` you created:

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  "$desktop_url" : "http://desktop-url.com",
}, function (res) {
    Ti.API.info('Completed link generation');
    Ti.API.info(res);
});
{% endhighlight %}

The event listener `bio:generateShortUrl` returns a `string` object containing the generated link:

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/titanium/#showsharesheet).
{% endprotip %}

{% endif %}

{% if page.react %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'content/12345', // canonical identifier
  {
    contentTitle: 'My Content Title',
    contentImageUrl: 'https://example.com/mycontent-12345.png',
    contentDescription: 'My Content Description',
    metadata: {
      product_picture: '12345',
      user_id: '6789'
    }
  }
)
{% endhighlight %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters, and generate the link by referencing the `BranchUniversalObject` you created:

{% highlight js %}
let linkProperties = {
  feature: 'sample-feature',
  channel: 'sample-channel'
}

let controlParams = {
  '$desktop_url': 'http://desktop-url.com'
}
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` and parameters you created:

{% highlight js %}
let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/react/#showsharesheet).
{% endprotip %}

{% endif %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.dashboard %}

### Creating Quick Links in the dashboard

You can create deep links that work on all platforms and look good on social media directly in the Branch [dashboard](https://dashboard.branch.io){:target="_blank"}.

{% image src='/img/pages/getting-started/creating-links/create-link.png' 2-thirds center alt='Create link button' %}

{% protip title='Optimize your link creation' %}

Creating deep links into your app is much easier if you [host deep link data on your website]({{base.url}}/getting-started/hosted-deep-link-data). You should also be sure to fill out your [link settings](https://dashboard.branch.io/settings/link){:target="_blank"} completely, so that your users are always directed to the right place.

{% endprotip %}

## Define your link

Step 1 includes all the fields you need to fill in order to create a successful link. If you complete this step and you have [hosted deep link data]({{base.url}}/getting-started/hosted-deep-link-data) on your website, you can create a deep link directly from this page using the **Create Link Now** button.

{% image src='/img/pages/getting-started/creating-links/define.png' full center alt='Define your link' %}

### Name your link

This is the name that will show for your link under **Marketing Title** on the [Quick Links](https://dashboard.branch.io/settings/link){:target="_blank"} page. Choosing a descriptive name will help you find your link later through search or table sorting.

{% image src='/img/pages/getting-started/creating-links/name-your-link.png' half center alt='Name your link' %}

### Web URL
When you type or paste a URL from your website into this field, all kinds of useful information will be filled automatically.

{% image src='/img/pages/getting-started/creating-links/web-url.png' half center alt='Web URL' %}

##### Autofetch
Social media display, link redirects, and even data for deep linking will be retrieved from your web page, and you can view and change all of these in the Configure Options step. Learn more about the properties that can be automatically retrieved from your website in the [hosted deep link data]({{base.url}}/getting-started/hosted-deep-link-data) guide.

##### Redirect to Web URL
You can also choose your web URL as a redirect on the Configure Options step. Your web URL will be the redirect by default if your app-wide link settings are not complete.

##### Fill in link name
If you do not enter a link name before pasting in a web URL, it will be automatically filled with the `$og_title` from your webpage.

### Channel and campaign

**Channel** and **campaign** are parameters you can set for link analytics. You will be able to use these to analyze performance on the [Quick Links](https://dashboard.branch.io/quick-links){:target="_blank"} or [Source Analytics](https://dashboard.branch.io/analytics/source){:target="_blank"} page later.

{% image src='/img/pages/getting-started/creating-links/channel-campaign.png' 3-quarters center alt='Channel and campaign' %}

##### Where will you post this link?

Say there are three places you primarily focus on for marketing: Facebook, Twitter, and Email. You'll want to pick one of those "channels" here, so that you can see all your data for one channel or compare the performance of multiple channels later.

##### What campaign is it part of?

In the same way as channels, you can see all your data for one campaign or compare multiple campaigns later. A campaign can span multiple channnels, but may be time limited, for example "Mother's Day Promotion."

## Configure options

Step 2, Configure Options, is where you can see the result of all of the parameters you defined in step 1 and change or add more. When you are happy with your link, you can click the **Create Link Now** button.

If all the fields for a section like **Deep Linking** or **Redirects** are filled in, you will see a blue checkmark, and if not, you will see a question mark. If you filled in all the fields in step 1 and you have [hosted deep link data]({{base.url}}/getting-started/hosted-deep-link-data) on your website, every section should have a blue checkmark.

{% image src='/img/pages/getting-started/creating-links/configure-options.png' full center alt='Configure options' %}

### Change your URL appearance

You can change your link **alias**, or the appearance of your link after the domain. If you do not, a short alias will be automatically generated for you. You cannot edit your alias after you have created your link.

{% image src='/img/pages/getting-started/creating-links/alias.png' full center alt='Change your link alias' %}

### Deep link into your app

Here you can define keys and values for [deep linking]({{base.url}}/getting-started/deep-link-routing) to specific content or a specific screen within your app. What you put here depends on how you have structured your app, but could include keys like `product_id`, `article_id`, or `$deeplink_path`. If you [host deep link data]({{base.url}}/getting-started/hosted-deep-link-data) on your website and you entered a web URL in step 1, you will see some key-value pairs prepopulated here.

{% image src='/img/pages/getting-started/creating-links/deep-linking.png' full center alt='Deep linking' %}

##### Keys and values

You can find the full list of possible parameters on the [Configuring Links]({{base.url}}/getting-started/configuring-links) page. The data you can enter here is the same as for any Branch link, with a few exceptions:

| Excluded Key | Reason
| --- | ---
| ~campaign | Specified in the UI in Define or Configure Options > Analytics Tags
| ~channel | Specified in the UI in Define or Configure Options > Analytics Tags
| ~feature | Set to `marketing` for links created in the dashboard
| ~tags | Specified in the UI in Configure Options > Analytics Tags
| $android_deepview | Specified in the UI in Configure Options > Redirects
| $android_url | Specified in the UI in Configure Options > Redirects
| $desktop_deepview | Specified in the UI in Configure Options > Redirects
| $desktop_url | Specified in the UI in Configure Options > Redirects
| $ios_deepview | Specified in the UI in Configure Options > Redirects
| $ios_url | Specified in the UI in Configure Options > Redirects
| $marketing_title | Specified in the UI in Define
| $og_description | Specified in the UI in Configure Options > Social Media
| $og_image_url | Specified in the UI in Configure Options > Social Media
| $og_title | Specified in the UI in Configure Options > Social Media

{% protip title="Links that never open the app" %}

You can add `$web_only: true` to your deep link data to direct to the web URL you define in the redirects section, even when the app is installed. You might want to do this is you are linking to content you only have on your website. More information about this parameter in the [configuring links]({{base.url}}/getting-started/configuring-links/#web-only-links) guide.

{% endprotip %}

### Define redirects when the app isn't installed

You can choose where the user is directed when they do not have the app in the **Redirects** section. By default, redirects will be set to `Default Redirect` and match your app-wide [link settings](https://dashboard.branch.io/settings/link){:target="_blank"}. You can also choose from the **web URL** you entered in step 1, type in a new web URL, or select a deepview.

{% image src='/img/pages/getting-started/creating-links/redirects.png' full center alt='Redirects' %}

| Redirect | Behavior | Values | Default
| --- | --- | ---
| Web URL | Redirect to a web URL | Any web URL | The web URL entered in the Define step
| Deepview | Redirect to a [Deepview]({{base.url}}/features/deepviews) | Any Deepview template name | The [enabled Deepview](https://dashboard.branch.io/settings/deepviews){:target="_blank"} or `branch_default` by default
| Default Redirect | Redirect to the App Store, Play Store, or custom URL | Uneditable | [Link settings](https://dashboard.branch.io/settings/link){:target="_blank"}

### Set channel, campaign, and tags for analytics

You will be able to use these parameters to analyze performance on the [Quick Links](https://dashboard.branch.io/quick-links){:target="_blank"}, [Source Analytics](https://dashboard.branch.io/analytics/source){:target="_blank"}, [Content Analytics](https://dashboard.branch.io/analytics/content){:target="_blank"}, and [Summary](https://dashboard.branch.io/){:target="_blank"} pages later. If you entered channel and campaign on the Define step, they will carry over here.

{% image src='/img/pages/getting-started/creating-links/analytics-tags.png' full center alt='Analytics tags' %}

### Customize your link appearance on social media

Setting **Title**, **Description**, and **Image** here affects how your link appears when you post it on social media and other forums. If you posted a web URL on the Define step or have a default social media display in [link settings](https://dashboard.branch.io/settings/link){:target="_blank"}, these will be prepopulated.

{% image src='/img/pages/getting-started/creating-links/social-media.png' full center alt='Social media' %}

## Validate and share

In the final step of the flow, you can see what you have filled in successfully, see a preview of your link when shared, and copy your link to clipboard for easy distribution.

{% image src='/img/pages/getting-started/creating-links/validate-share.png' full center alt='Validate and share' %}

### Validation

Each validation message corresponds to items you can fill out with the Define step or in the Configure Options step. Only Redirects are required to create a link, but completing all is recommended. If you click the validation message, you will be directed to the section that needs to be filled in the Configure Options step.

{% image src='/img/pages/getting-started/creating-links/validation.png' half center alt='Validation' %}

## Manage and edit your links

You can manage your links on the [Quick Links](https://dashboard.branch.io/quick-links){:target="_blank"} page of the dashboard.

### Edit, view stats, duplicate, and archive

You can access a menu with the **more** icon for each link in the **Actions** column.

{% image src='/img/pages/getting-started/creating-links/marketing-actions.png' half center alt='Quick Link actions' %}

* **Edit** will open the link creation flow in edit mode.
* **View stats** will bring up data for just that link.
* **Duplicate** will open the creation flow for a new link with all of the link parameters copied over.
* **Archive link** will hide that link from main view. You can still see it by enabling the **Archived** checkbox at the top of the page.

### Copy to clipboard

You can copy your link to clipboard direct from the table on the [Quick Links](https://dashboard.branch.io/quick-links){:target="_blank"} page.

{% image src='/img/pages/getting-started/creating-links/marketing-copy.png' half center alt='Copy to clipboard' %}

## See your link analytics

At a granular level, you can see analytics for each individual link you create on the [Quick Links](https://dashboard.branch.io/quick-links){:target="_blank"} page. The link you most recently created will be at the top, but you can also search for it in the search bar.

{% image src='/img/pages/getting-started/creating-links/marketing-title.png' full center alt='Marketing title' %}

You'll also find aggregate data for your links on the [Summary](https://dashboard.branch.io/){:target="_blank"}, [Source Analytics](https://dashboard.branch.io/analytics/source){:target="_blank"}, and [Content Analytics](https://dashboard.branch.io/analytics/content){:target="_blank"} pages, and you can slice and dice using the filters at the top.

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.chrome-extension %}

### Creating links with the chrome extension

The Branch Chrome Extension makes it very easy for you to create new links, and easily share via any channel for marketing purposes. In the guide below, we'll explain how to get set up and start linking!

{% image src='/img/pages/features/chrome-extension/chrome-extension-overview.png' 2-thirds center alt='Chrome extension example' %}

## One time setup

You must be using Chrome as your browser, as this extension will not work on any other. Apologies for the inconvenience.

### Install the extension

Head to the Chrome Web Store and install the `Branch Link Creator`. You can find it [here](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf).

### Enter your Branch key

Once installed, click the Branch icon at the top right corner. It will show you the following screen:

{% image src='/img/pages/features/chrome-extension/chrome-no-key.png' half center alt='enter key' %}

You can retrieve the Branch key associated with the account you'd like create links for on the main settings page of your [dashboard](https://dashboard.branch.io/settings). Please copy the one starting with `key_live_...` and paste it into the extension. Hit save when you are done.

## Ongoing Branch link creation

Any time you want to create a new Branch link, just do the following:
1. Visit the website you'd like to create a link to
2. Click the Branch icon in the top right

A link will automatically be created for this website.

### Properties of these links

The links will automatically configured with the following properties:

| **Property** | **Value** |
| ---: | --- |
| **type** | 2 - Quick Link by default
| **marketing title** | Automatically set to "Link to: <your website URL>"
| **$fallback_url** | the website URL
| **auto_fetch** | true: we'll automatically scrape the website to pull in app links tags and deep link routing info

### Viewing the click data

Since these links are automatically added to the marketing tab of your dashboard, you can easily view the performance by heading to [there](https://dashboard.branch.io/quick-links). If you have the SDK integrated, you'll be able to track installs and re-opens. Clicks will be visible always.

{% image src='/img/pages/features/chrome-extension/link-performance.png' half center alt='link performance' %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.other-ways %}

## Appending query parameters

You can dynamically append additional query parameters to any existing Branch link, or even build a new Branch link by appending query parameters to the base link domain (this method can be useful if you don't want to wait for a server callback and don't care whether the link is short or not because you won't be displaying it to users).

1. Start with an exiting Branch link, or your Branch link domain: **http://[branchsubdomain]**.
1. Append `?` to start the query params string: **http://[branchsubdomain]?**
   - If you're creating a new link and and you're using the legacy `bnc.lt` domain or a custom domain/subdomain as the base for your links, instead append `/a/your_Branch_key?`: **http://bnc.lt/a/your_branch_key?**
1. [optional] Append any additional key/value pairs, and analytics or link control parameters.

{% ingredient branchsubdomain %}{% endingredient %}

{% example %}

Here's an example of a finalized dynamic link (line breaks added for legibility):

{% highlight sh %}
https://[branchsubdomain]?
  %24deeplink_path=article%2Fjan%2F123&
  %24fallback_url=https%3A%2F%2Fgoogle.com&
  channel=facebook&
  feature=affiliate&
  user_id=4562&
  name=Alex
{% endhighlight %}

The following keys have been embedded:

| Key | Value |
| --- | --- |
| **$deeplink_path** | article/jan/123 |
| **$fallback_url** | https://google.com |
| **channel** | facebook |
| **feature** | affiliate |
| **user_id** | 4562 |
| **name** | Alex |

{% endexample %}

{% caution title="Link URL considerations" %}
1. Don't forget to URL encode everything, otherwise the link will break.
1. If any of your links use the legacy `bnc.lt` domain be sure to include your custom domain **and** `bnc.lt` when configuring the [Associated Domains entitlement]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-your-branch-link-domains) for iOS Universal Links.

{% endcaution %}

### URL formats by base domain type

| Link Type | bnc.lt | wxyz.app.link | customdomain.com |
| --- | --- | --- | --- |
| New link | https://bnc.lt/a/key_live_xxxxxxxxxxxxxxx?param=value | https://wxyz.app.link?param=value | https://customdomain.com/a/key_live_xxxxxxxxxxxxxxx?param=value
| Existing SDK link | https://bnc.lt/wxyz/KDSYTMnSZs?param=value | https://wxyz.app.link/KDSYTMnSZs?param=value | https://customdomain.com/wxyz/KDSYTMnSZs?param=value
| Existing Quick Link | https://bnc.lt/linkslug?param=value | https://wxyz.app.link/linkslug?param=value | https://customdomain.com/linkslug?param=value

## Web SDK

You can use the Branch Web SDK to create links in several ways:

- [Text-Me-The-App]({{base.url}}/features/text-me-the-app)
- [Journeys Web To App Platform]({{base.url}}/features/journeys)
- [Website To App Routing]({{base.url}}/features/website-to-app-routing)

#### Link() function

A basic `link()` function is also available for custom implementations:

{% highlight js %}
branch.link({
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$ipad_url': 'http://myappwebsite.com/ipad',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}, function(err, link) {
    console.log(err, link);
});
{% endhighlight %}

##### Callback Format

{% highlight js %}
callback(
    "Error message",
    'https://[branchsubdomain]/l/3HZMytU-BW' // Branch shortlink URL
);
{% endhighlight %}

## HTTP API

If you want to build something custom, you can generate links by querying the Branch API directly. Here is an example CURL call:

{% highlight sh %}
curl -X POST \
-H "Content-Type: application/json" \
-d '{"branch_key":"key_live_jfdweptNITtAY5HVY3mBSojopgfGf8qQ",
"sdk":"api",
"campaign":"announcement",
"feature":"invite",
"channel":"email",
"tags":["4"],
"data":"{\"name\":\"Alex\",\"email\":\"alex@branch.io\",\"$desktop_url\":\"https://branch.io\"}"
}' \
https://api.branch.io/v1/url
{% endhighlight %}

This will return Branch shortlink:

{% highlight sh %}
{"url":"https://[branchsubdomain]/m/BqmToC9Ion"}
{% endhighlight %}

## Next steps

Now that you can create links into your app, you will want to set up [**Deep Link Routing**]({{base.url}}/getting-started/deep-link-routing) to send users directly to specific content in your app based on the Branch link they clicked.

{% getstarted title='Deep Link Routing' next='getting-started/deep-link-routing' %}{% endgetstarted %}

{% endif %}
