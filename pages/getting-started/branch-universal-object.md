---
type: recipe
directory: getting-started
title: Branch Universal Object
page_title: Learn about the Branch Universal Object
description: Learn what Branch Universal Objects are, and how they can help you track and analyze your app's content
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
hide_section_selector: true
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
- guide
- advanced
contents: list
redirect: https://docs.branch.io/
---

{% if page.guide %}

A `BranchUniversalObject` is a container that Branch uses to organize and track pieces of content within your app. As a single, self-contained object associated with each thing that you want to share, it provides convenient methods for sharing, deep linking, and tracking how often that thing is viewed.

{% if page.adobe %}

Unfortunately `BranchUniversalObject` is not yet supported on this platform. Please see the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page for alternatives!

{% else %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Best Practices for using Branch Universal Object

Here are a set of best practices to ensure that your analytics are correct, and your content is ranking in search effectively.

1. Set the `canonicalIdentifier` to a unique, de-duped value across instances of the app
2. Ensure that the `title`, `contentDescription` and `imageUrl` properly represent the object
3. Initialize the Branch Universal Object and call `userCompletedAction` with the corresponding platform view event **on page load**
4. Call `showShareSheet` and `getShortUrl` later in the life cycle, when the user takes an action that needs a link
5. Call the additional object events (purchase, share completed, etc) when the corresponding user action is taken

Practices to _avoid_:

1. Don't set the same `title`, `contentDescription` and `imageUrl` across all objects
2. Don't wait to initialize the object and register views until the user goes to share
3. Don't wait to initialize the object until you conveniently need a link
4. Don't create many objects at once and register views in a `for` loop.

## Defining a Branch Universal Object

You build a `BranchUniversalObject` by assembling parameters. After the parameters are assembled, you can [create a link]({{base.url}}/getting-started/creating-links/apps) by referencing the `BranchUniversalObject`.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
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

{% endif %}

{% if page.android %}

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

{% endif %}

{% if page.cordova %}

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

{% endif %}

{% if page.xamarin %}

{% highlight c# %}

BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "content/12345";
universalObject.canonicalUrl = "http://mypage.com/content/12345"; // optional
universalObject.title = "My Content Title";
universalObject.contentDescription = "My Content Description";
universalObject.imageUrl = "https://example.com/mycontent-12345.png";
universalObject.metadata.Add("product_picture", "1234");
universalObject.metadata.Add("user_id", "6789");
{% endhighlight %}

{% endif %}

{% if page.unity %}

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "content/12345";
universalObject.canonicalUrl = "http://mypage.com/content/12345"; // optional
universalObject.title = "My Content Title";
universalObject.contentDescription = "My Content Description";
universalObject.imageUrl = "https://example.com/mycontent-12345.png";
universalObject.metadata.Add("product_picture", "1234");
universalObject.metadata.Add("user_id", "6789");
{% endhighlight %}

{% endif %}

{% if page.titanium %}

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

{% endif %}

{% if page.react %}

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'content/12345', // canonical identifier
  {
    title: 'My Content Title',
    contentImageUrl: 'https://example.com/mycontent-12345.png',
    contentDescription: 'My Content Description',
    metadata: {
      product_picture: '12345',
      user_id: '6789'
    }
  }
)
{% endhighlight %}

{% endif %}

## Parameters

Some of these parameters automatically [populate the link parameters]({{base.url}}/getting-started/configuring-links) of any link created from that `BranchUniversalObject`. Specifying via `BranchUniversalObject` is preferred.

{% if page.ios %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | The canonical URL, used for SEO purposes
| title | The name for the piece of content | $og_title
| contentDescription | A description for the content | $og_description
| imageUrl | The image URL for the content | $og_image_url
| metadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing).
| price | The price of the item
| currency | The currency representing the price in [ISO 4217 currency code](http://en.wikipedia.org/wiki/ISO_4217). Default is USD.
| contentIndexMode | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| expirationDate | The date when the content will not longer be available or valid* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future**

{% endif %}

{% if page.android %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| setCanonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| setCanonicalUrl | The canonical URL, used for SEO purposes
| setTitle | The name for the piece of content | $og_title
| setContentDescription | A description for the content | $og_description
| imageUrl | The image URL for the content | $og_image_url
| addContentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing).
| price | The price of the item
| currency | The currency representing the price in [ISO 4217 currency code](http://en.wikipedia.org/wiki/ISO_4217). Default is USD.
| setContentIndexingMode | Can be set to either `BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC` or `BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| setContentExpiration | The date when the content will not longer be available or valid. Set in milliseconds.* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future**

{% endif %}

{% if page.cordova %}
| Key | Default | Usage | Link Property
| --- | :-: | --- | :-:
| canonicalIdentifier | | **(Required)** This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | `$canonical_identifier`
| canonicalUrl | | The canonical URL, used for SEO purposes | `$canonical_url`
| title | | The name for the piece of content | `$og_title`
| contentDescription | | A description for the content | `$og_description`
| contentImageUrl | | The image URL for the content | `$og_image_url `
| price | | The price of the item | `$amount`
| currency | | The currency representing the price in ISO 4217 currency code | `$currency`
| contentIndexMode | `"public"` | Can be set to either `"public"` or `"private"`. Public indicates that you’d like this content to be discovered by other apps. | `$publicly_indexable`
| contentMetadata | | Any custom key-value data e.g. `{ "custom": "data" }`
{% endif %}

{% if page.xamarin %}
| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | | The canonical URL, used for SEO purposes | `$canonical_url`
| title | The name for the piece of content | $og_title
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| metadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| contentIndexMode | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| expirationDate | The date when the content will not longer be available or valid* | $exp_date
{% endif %}

{% if page.unity %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | The canonical URL, used for SEO purposes | `$canonical_url`
| title | The name for the piece of content | $og_title
| contentDescription | A description for the content | $og_description
| imageUrl | The image URL for the content | $og_image_url
| metadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| contentIndexMode | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| expirationDate | The date when the content will not longer be available or valid* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future**

{% endif %}

{% if page.titanium %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | The canonical URL, used for SEO purposes
| title | The name for the piece of content | $og_title
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| contentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| contentIndexingMode | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| expirationDate | The date when the content will not longer be available or valid* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future**

{% endif %}

{% if page.react %}

{% protip title="Partial support in React Native" %}
Only a subset of link parameters are currently supported in the React Native SDK. We hope to include more soon, and would also gladly accept pull requests to our [GitHub repo](https://github.com/BranchMetrics/React-Native-Deferred-Deep-Linking-SDK)!
{% endprotip %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| title | The name for the piece of content | $og_title
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| contentIndexingMode | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| contentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).

{% endif %}

## Methods

After you've assembled parameters to create your `BranchUniversalObject`, there are a number of methods you can call on it.

{% if page.ios %}

### Register a content view

Please do not call `registerView` anymore. Instead, call this method in `viewDidLoad` or `viewDidAppear` to track how many times a piece of content is viewed.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject userCompletedAction:BNCRegisterViewEvent];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
branchUniversalObject.userCompletedAction(BNCRegisterViewEvent)
{% endhighlight %}
{% endtab %}
{% endtabs %}

### userCompletedAction

We've added a series of custom events that you'll want to start tracking for rich analytics and targeting. Here's a list below with a sample snippet that calls the register view event.

| Key | Value
| --- | ---
| BNCRegisterViewEvent | User viewed the object
| BNCAddToWishlistEvent | User added the object to their wishlist
| BNCAddToCartEvent | User added object to cart
| BNCPurchaseInitiatedEvent | User started to check out
| BNCPurchasedEvent | User purchased the item
| BNCShareInitiatedEvent | User started to share the object
| BNCShareCompletedEvent | User completed a share

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject userCompletedAction:BNCRegisterViewEvent];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
branchUniversalObject.userCompletedAction(BNCRegisterViewEvent)
{% endhighlight %}
{% endtab %}
{% endtabs %}

### getShortUrlWithLinkProperties

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more.

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
    if (error == nil) {
        print("Got my Branch link to share: \(url)")
    } else {
        print(String(format: "Branch error : %@", error! as CVarArg))
    }   
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

### showShareSheetWithLinkProperties

Use Branch's preconfigured `UIActivityItemProvider` to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. Note that certain channels restrict access to certain fields. For example, Facebook prohibits you from pre-populating a message.

{% image src='/img/pages/getting-started/branch-universal-object/ios_share_sheet.png' actual center alt='ios share sheet' %}

To implement it, use the following `showShareSheetWithLinkProperties` method on your `branchUniversalObject`

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject showShareSheetWithLinkProperties:linkProperties
                                           andShareText:@"Super amazing thing I want to share!"
                                     fromViewController:self
                                             completion:^(NSString *activityType, BOOL completed) {
    NSLog(@"finished presenting");
}];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
branchUniversalObject.showShareSheet(with: linkProperties,
                                     andShareText: "Super amazing thing I want to share!",
                                     from: self) { (activityType, completed) in
    if (completed) {
        print(String(format: "Completed sharing to %@", activityType!))
    } else {
        print("Link sharing cancelled")
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

### listOnSpotlightWithCallback

List your piece of content on Spotlight. Visit the [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) page to learn more.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
branchUniversalObject.automaticallyListOnSpotlight = YES;
[branchUniversalObject userCompletedAction:BNCRegisterViewEvent];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.automaticallyListOnSpotlight = true
branchUniversalObject.userCompletedAction(BNCRegisterViewEvent)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

### registerView

Please do not call `registerView` anymore. Instead, call this method when the page loads to track how many times a piece of content is viewed.

{% highlight java %}
branchUniversalObject.userCompletedAction(BranchUniversalObject.BUO_USER_ACTIONS.VIEW);
{% endhighlight %}

### userCompletedAction

We've added a series of custom events that you'll want to start tracking for rich analytics and targeting. Here's a list below with a sample snippet that calls the register view event.

| Key | Value
| --- | ---
| BranchEvent.VIEW | User viewed the object
| BranchEvent.ADD_TO_WISH_LIST | User added the object to their wishlist
| BranchEvent.ADD_TO_CART | User added object to cart
| BranchEvent.PURCHASE_STARTED | User started to check out
| BranchEvent.PURCHASED | User purchased the item
| BranchEvent.SHARE_STARTED | User started to share the object
| BranchEvent.SHARE_COMPLETED | User completed a share

{% highlight java %}
branchUniversalObject.userCompletedAction(BranchEvent.VIEW);
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more.

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

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. This share sheet is customizable and will automatically generate a link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/android_share_sheet.png' half center alt='Android share sheet' %}

To implement it, use the following `showShareSheet` method on your `branchUniversalObject`

{% highlight java %}
branchUniversalObject.showShareSheet(this,
                                      linkProperties,
                                      shareSheetStyle,
                                       new Branch.BranchLinkShareListener() {
    @Override
    public void onShareLinkDialogLaunched() {
    }
    @Override
    public void onShareLinkDialogDismissed() {
    }
    @Override
    public void onLinkShareResponse(String sharedLink, String sharedChannel, BranchError error) {
    }
    @Override
    public void onChannelSelected(String channelName) {
    }
});
{% endhighlight %}

You can customize the styling with the ShareSheetStyle class:

{% highlight java %}
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
                        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
                        .setAsFullWidthStyle(true)
                        .setSharingTitle("Share With");
{% endhighlight %}

### listOnGoogleSearch

List your piece of content on Google/Firebase App Indexing. Visit the [Firebase App Indexing]({{base.url}}/features/google-app-indexing) page to learn more.

{% highlight java %}
branchUniversalObject.listOnGoogleSearch(context);
{% endhighlight %}
{% endif %}

{% if page.cordova %}
### registerView

Call this method when the content loads on screen to track how many times a piece of content is viewed.

{% highlight js %}
branchUniversalObj.registerView();
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more.

{% highlight js %}
branchUniversalObj.generateShortUrl({
  // put your link properties here
  "feature" : "sharing",
  "channel" : "facebook"
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com/monster/12345",
}).then(function (res) {
    // Success Callback
    console.log(res.generatedUrl);
});
{% endhighlight %}

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

To implement it, use the following `showShareSheet` method on your `branchUniversalObject`

{% highlight js %}
branchUniversalObj.showShareSheet({
  // put your link properties here
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

#### Share sheet callbacks

{% protip %}
Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.
{% endprotip %}

To implement the callback on Android, you must add listeners to the following events:

##### onShareSheetLaunched

The event fires when the share sheet is presented.

{% highlight js %}
branchUniversalObj.onShareSheetLaunched(function () {
  console.log('Share sheet launched');
});
{% endhighlight %}

##### onShareSheetDismissed

The event fires when the share sheet is dismissed.

{% highlight js %}
branchUniversalObj.onShareSheetDismissed(function () {
  console.log('Share sheet dimissed');
});
{% endhighlight %}

##### onLinkShareResponse (Android ONLY)

The event returns a dictionary of the response data.

{% highlight js %}
branchUniversalObj.onLinkShareResponse(function (res) {
  console.log('Share link response: ' + JSON.stringify(res));
});
{% endhighlight %}

##### onChannelSelected (Android ONLY)

The event fires when a channel is selected.

{% highlight js %}
branchUniversalObj.onChannelSelected(function (res) {
  console.log('Channel selected: ' + JSON.stringify(res));
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}
### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight c# %}
Branch.GetInstance().RegisterView (BranchUniversalObject universalObject)
{% endhighlight %}

### getShortURL

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more. First define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Then call getShortUrl with the `universalObject` and `linkProperties`. Make sure to pass in a reference where you've registered a delegate to `IBranchUrlInterface` as below.

{% highlight c# %}
Branch.GetInstance().GetShortURL (IBranchUrlInterface callback,
                              universalObject,
                              linkProperties);

{% endhighlight %}

Now define the delegate implementation for `IBranchUrlInterface`.

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
{% endhighlight %}

### shareLink

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

First define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Then use the following `shareLink` method on your `branchUniversalObject`

{% highlight c# %}
Branch.GetInstance().ShareLink (IBranchLinkShareInterface callback,
           universalObject,
           linkProperties,
           "Check this out!")
{% endhighlight %}

If you want to be notified when the user returns from the share sheet, implement the delegate of `IBranchLinkShareInterface`

{% highlight c# %}
#region IBranchLinkShareInterface implementation

public void LinkShareResponse (string sharedLink, string sharedChannel)
{
    // handle completion
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}

### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight c# %}
Branch.registerView(universalObject);
{% endhighlight %}

### getShortURL

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more.

First define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Then call getShortUrl to retrieve the Branch link with the customized properties.

{% highlight c# %}
Branch.getShortURL(universalObject, linkProperties, (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.getShortURL failed: " + error);
    } else {
        Debug.Log("Branch.getShortURL shared params: " + url);
    }
});
{% endhighlight %}

### shareLink

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

Then use the following `shareLink` method on your `branchUniversalObject`

{% highlight c# %}
Branch.shareLink(universalObject, linkProperties, "hello there with short url", (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.shareLink failed: " + error);
    } else {
        Debug.Log("Branch.shareLink shared params: " + url);
    }
});
{% endhighlight %}
{% endif %}

{% if page.titanium %}

### registerView

Call this method in `viewDidLoad` or `viewDidAppear` to track how many times a piece of content is viewed.

{% highlight js %}
branchUniversalObject.registerView();
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more.

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
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

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

To implement it, use the following `showShareSheet` method on your `branchUniversalObject`

{% highlight js %}
branchUniversalObject.showShareSheet({
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
}, {
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

#### Share sheet callbacks (Android ONLY)

{% protip %}
Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.
{% endprotip %}

To implement the callback on Android, you must add listeners to the following events:

##### shareLinkDialogLaunched

The event fires when the share sheet is presented.

{% highlight js %}
branchUniversalObject.shareLinkDialogLaunched(function () {
  console.log('Share sheet launched');
});
{% endhighlight %}

##### shareLinkDialogDismissed

The event fires when the share sheet is dismissed.

{% highlight js %}
branchUniversalObject.shareLinkDialogDismissed(function () {
  console.log('Share sheet dimissed');
});
{% endhighlight %}

##### shareLinkResponse

The event returns a dictionary of the response data.

{% highlight js %}
branchUniversalObject.shareLinkResponse(function (res) {
  console.log('Share link response: ' + JSON.stringify(res));
});
{% endhighlight %}

##### shareChannelSelected

The event fires when a channel is selected.

{% highlight js %}
branchUniversalObject.shareChannelSelected(function (res) {
  console.log('Channel selected: ' + JSON.stringify(res));
});

{% endhighlight %}

{% endif %}

{% if page.react %}

### registerView

Call this method in `viewDidLoad` or `viewDidAppear` to track how many times a piece of content is viewed.

{% highlight js %}
let viewResult = await branchUniversalObject.registerView()
{% endhighlight %}

### getShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps) page to learn more.

{% highlight js %}
let linkProperties = {
  feature: 'share',
  channel: 'facebook'
}

let controlParams = {
  $desktop_url: 'http://desktop-url.com/monster/12345'
}

let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

### showShareSheet

Use Branch’s custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios share sheet' %}

To implement it, first set your `shareOptions`

{% highlight js %}
let shareOptions = {
  messageHeader: 'Check this out',
  messageBody: 'No really, check this out!'
}

let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
{% endhighlight %}

### listOnSpotlight

For iOS apps only, you can list content on Spotlight search with the following method:

{% highlight js %}
let spotlightResult = await branchUniversalObject.listOnSpotlight()
{% endhighlight %}

{% endif %}

{% endif %}

{% endif %}

{% if page.advanced %}

## Specifying an shared email subject

The majority of share options only include one string of text, except email, which has a subject and a body. The share text will fill in the body and you can specify the email subject in the link properties as shown below.

<!--- iOS -->
{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"share";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$email_subject" withValue:@"Therapists hate him"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "share"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$email_subject", withValue: "Therapists hate him")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

<!--- Android -->
{% if page.android %}

{% highlight java %}
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Therapists hate him", "You will never believe what happened next!")
                        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
                        .setAsFullWidthStyle(true)
                        .setSharingTitle("Share With");
{% endhighlight %}

{% endif %}
<!--- /Android -->

{% if page.cordova %}

{% highlight js %}
// optional fields
var analytics = {
    channel: 'channel',
    feature: 'feature',
    campaign: 'campaign',
    stage: 'stage',
    tags: ['one', 'two', 'three']
};

// optional fields
var properties = {
    $fallback_url: 'http://www.example.com/example',
    $desktop_url: 'http://www.example.com/desktop',
    $android_url: 'http://www.example.com/android',
    $ios_url: 'http://www.example.com/ios',
    $ipad_url: 'http://www.example.com/ipad',
    more_custom: 'data',
    even_more_custom: true,
    this_is_custom: 321
};

var message = 'Check out this link';

// optional listeners (must be called before showShareSheet)
branchUniversalObj.onShareSheetLaunched(function(res) {
  // android only
  alert('Response: ' + JSON.stringify(res));
});
branchUniversalObj.onShareSheetDismissed(function(res) {
  alert('Response: ' + JSON.stringify(res));
});
branchUniversalObj.onLinkShareResponse(function(res) {
  alert('Response: ' + JSON.stringify(res));
});
branchUniversalObj.onChannelSelected(function(res) {
  // android only
  alert('Response: ' + JSON.stringify(res));
});

// share sheet
branchUniversalObj.showShareSheet(analytics, properties, message);
{% endhighlight %}

{% endif %}

{% if page.xamarin %}

{% highlight c# %}

Only supported on iOS currently.

BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$email_subject", "Therapists hate him");

{% endhighlight %}

{% endif %}

<!--- Unity -->

{% if page.unity %}

Only supported on iOS currently.

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$email_subject", "Therapists hate him");
{% endhighlight %}

{% endif %}

<!--- Adobe -->

{% if page.adobe %}

Since Adobe doesn't support the share sheet, this section is irrelevant.

{% endif %}

<!--- Titanium -->

{% if page.titanium %}

Only supported on iOS currently.

{% highlight js %}
branchUniversalObject.showShareSheet({
  "feature" : "share",
  "channel" : "facebook"
}, {
  "$email_subject" : "Therapists hate him",
}, 'You will never believe what happened next!');
{% endhighlight %}

{% endif %}

<!--- React -->

{% if page.react %}

{% highlight js %}
let shareOptions = {
  messageHeader: 'Therapists hate him',
  messageBody: 'You will never believe what happened next!'
}

let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
{% endhighlight %}

{% endif %}

{% endif %}
