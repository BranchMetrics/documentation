---
type: recipe
directory: marketing-channels
title: "Content Sharing"
page_title: Deep Links for Content Sharing
description: How to create deep links programmatically to share content and how to route to content within your app. With code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Content Sharing, Content, Routing, SMS, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Content Sharing, Content, Routing, SMS, Android
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
alias: [ /features/content-sharing/, /features/content-sharing/overview/, /features/content-sharing/guide/ios/, /features/content-sharing/guide/android/, /features/content-sharing/guide/cordova/, /features/content-sharing/guide/xamarin/, /features/content-sharing/guide/unity/, /features/content-sharing/guide/adobe/, /features/content-sharing/guide/titanium/, /features/content-sharing/guide/react/, /features/content-sharing/advanced/ios/, /features/content-sharing/advanced/android/, /features/content-sharing/advanced/cordova/, /features/content-sharing/advanced/xamarin/, /features/content-sharing/advanced/unity/, /features/content-sharing/advanced/adobe/, /features/content-sharing/advanced/titanium/, /features/content-sharing/advanced/react/ ]
redirect: https://docs.branch.io/pages/apps/ios/#share-deep-link
---

{% if page.overview %}

If your users are creating content in your app, they will probably want to share that content with their friends. You can encourage this by making it easy to generate sharing links that open your app *and* route back exactly to the piece of content that was originally shared. This will even work when the user who opens the link doesn't have your app installed yet.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}


{% prerequisite %}
- To implement a content sharing flow, you will need to [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

Let's say you have developed an app called **Branch Monster Factory**. You want your users to share the monsters they create with their friends, and see the monster that was shared as soon as your app opens. Let's get started!

## Generate sharing links

The first thing we need to do is allow your users to create links. These links will contain references to the content being shared, which generate analytics data and allow your app to route straight back to that content when a link is opened.

<!--- iOS -->
{% if page.ios %}

Start by importing the relevant Branch frameworks into the view controller you will be using:

{% tabs %}
{% tab objective-c %}
In the view class where you will initialize sharing, add these imports at the top:

{% highlight objective-c %}
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
{% endhighlight %}
{% endtab %}

{% tab swift %}
In the Bridging Header, add the following:

{% highlight objective-c %}
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
#import "BranchConstants.h"
{% endhighlight %}
{% endtab %}
{% endtabs %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"monster/12345"];
branchUniversalObject.title = @"Meet Mr. Squiggles";
branchUniversalObject.contentDescription = @"Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
branchUniversalObject.imageUrl = @"https://example.com/monster-pic-12345.png";
[branchUniversalObject addMetadataKey:@"userId" value:@"12345"];
[branchUniversalObject addMetadataKey:@"userName" value:@"Josh"];
[branchUniversalObject addMetadataKey:@"monsterName" value:@"Mr. Squiggles"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "monster/12345")
branchUniversalObject.title = "Meet Mr. Squiggles"
branchUniversalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!"
branchUniversalObject.imageUrl = "https://example.com/monster-pic-12345.png"
branchUniversalObject.addMetadataKey("userId", value: "12345")
branchUniversalObject.addMetadataKey("userName", value: "Josh")
branchUniversalObject.addMetadataKey("monsterName", value: "Mr. Squiggles")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Then define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"share";
linkProperties.channel = @"facebook";
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "share"
linkProperties.channel = "facebook"
{% endhighlight %}
{% endtab %}
{% endtabs %}

Use Branch's preconfigured `UIActivityItemProvider` to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. Keep in mind, there are different `showShareSheetWithLinkProperties` functions based on device (iPad or iPhone).

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

Here's an example of what you'll see:

{% image src='/img/pages/getting-started/branch-universal-object/ios_share_sheet.png' actual center alt='ios share sheet' %}

{% endif %}
<!--- /iOS -->

<!--- Android -->
{% if page.android %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("monster/12345")
                .setTitle("Meet Mr. Squiggles")
                .setContentDescription("Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!")
                .setContentImageUrl("https://example.com/monster-pic-12345.png")
                .addContentMetadata("userId", "12345")
                .addContentMetadata("userName", "Josh")
                .addContentMetadata("monsterName", "Mr. Squiggles");
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. First, define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
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

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

{% highlight java %}
branchUniversalObject.showShareSheet(this,
                                      linkProperties,
                                      shareSheetStyle,
                                       new Branch.BranchLinkShareListener() {
    @Override
    public void onShareLinkDialogDismissed() {
    }
});
{% endhighlight %}

Here's an example of what you'll see:

{% image src='/img/pages/getting-started/branch-universal-object/android_share_sheet.png' actual center alt='android share sheets' %}


{% endif %}
<!--- /Android -->

{% if page.cordova %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'monster/12345',
  title: 'Meet Mr. Squiggles',
  contentDescription: 'Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!',
  contentImageUrl: 'https://example.com/monster-pic-12345.png',
  contentMetadata: {
    'userId': '12345',
    'userName': 'Josh',
    'monsterName': 'Mr. Squiggles'
  }
}).then(function (newBranchUniversalObj) {
  branchUniversalObj = newBranchUniversalObj;
  console.log(newBranchUniversalObj);
});
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% highlight js %}
branchUniversalObj.showShareSheet({
  // put your link properties here
  "feature" : "share",
  "channel" : "facebook"
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

Here's an example of what you'll see by platform:

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

The dismissed event fires when the share sheet is dismissed.

{% highlight js %}
branchUniversalObj.onShareSheetDismissed(function () {
  console.log('Share sheet dimissed');
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight c# %}

BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "monster/12345";
universalObject.title = "Meet Mr. Squiggles";
universalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
universalObject.imageUrl = "https://example.com/monster-pic-12345.png";
universalObject.metadata.Add("userId", "1234");
universalObject.metadata.Add("userName", "Josh");
universalObject.metadata.Add("monsterName", "Mr. Squiggles");

{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. First, define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}

BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";

{% endhighlight %}

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

{% highlight c# %}
Branch.GetInstance().ShareLink (IBranchLinkShareInterface callback,
           universalObject,
           linkProperties,
           "Check this out!")
{% endhighlight %}

Here's an example of what you'll see by platform:

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

If you want to be notified when the user returns from the share sheet, implement the delegate of `IBranchLinkShareInterface`.

{% highlight c# %}
#region IBranchLinkShareInterface implementation

public void LinkShareResponse (string sharedLink, string sharedChannel)
{
    // handle completion
}
#endregion
{% endhighlight %}
{% endif %}

<!--- Unity -->

{% if page.unity %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "monster/12345";
universalObject.title = "Meet Mr. Squiggles";
universalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
universalObject.imageUrl = "https://example.com/monster-pic-12345.png";
universalObject.metadata.Add("userId", "12345");
universalObject.metadata.Add("userName", "Josh");
universalObject.metadata.Add("monsterName", "Mr. Squiggles");
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. In order to initiate a share, define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Lastly, share the link by referencing the `BranchUniversalObject` and `LinkProperties`:

{% highlight c# %}
Branch.shareLink(universalObject, linkProperties, "hello there with short url", (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.shareLink failed: " + error);
    } else {
        Debug.Log("Branch.shareLink shared params: " + url);
    }
});
{% endhighlight %}

Here's an example of what you'll see by platform:

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

{% endif %}

<!--- Adobe -->

{% if page.adobe %}

Build a link containing details about the user who is inviting friends. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "got my Branch invite link to share: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
    "userId": "12345",
    "userName": "Josh",
    "monsterName": "Mr. Squiggles",
    "$og_title": "Meet Mr. Squiggles",
    "$og_description": "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!"
    "$og_image_url": "https://example.com/monster-pic-12345.png"
};

branch.getShortUrl(tags, "facebook", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}

{% endif %}

<!--- Titanium -->

{% if page.titanium %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "monster/12345",
  "title" : "Meet Mr. Squiggles",
  "contentDescription" : "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!",
  "contentImageUrl" : "https://example.com/monster-pic-12345.png",
  "contentMetadata" : {
      "userId" : "12345",
      "userName" : "Josh",
      "monsterName" : "Mr. Squiggles"
  },
});
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. In order to initiate a share, use the following `showShareSheet` method on your `branchUniversalObject`

{% highlight js %}
branchUniversalObject.showShareSheet({
  "feature" : "share",
  "channel" : "facebook"
}, {
  "$desktop_url" : "http://desktop-url.com/monster/12345",
});
{% endhighlight %}

#### Share sheet callbacks

To implement the callback, you must add listeners to the following events:

##### shareLinkDialogDismissed

The event fires when the share sheet is dismissed.

{% highlight js %}
branchUniversalObject.shareLinkDialogDismissed(function () {
  console.log('Share sheet dimissed');
});
{% endhighlight %}

Here's an example of what you'll see by platform:

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

{% endif %}

<!--- React -->

{% if page.react %}

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'monster/12345', // canonical identifier
  {
    contentTitle: 'Meet Mr. Squiggles',
    contentImageUrl: 'https://example.com/monster-pic-12345.png',
    contentDescription: 'Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!',
    metadata: {
      userId: '12345',
      userName: 'Josh',
      monsterName : "Mr. Squiggles"
    }
  }
)
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. First, define the properties of the link.

{% highlight js %}
let linkProperties = {
  feature: 'share',
  channel: 'facebook'
}

let controlParams = {
  $desktop_url: 'http://desktop-url.com/monster/12345'
}
{% endhighlight %}

Then, lastly, customize and show the share sheet.

{% highlight js %}
let shareOptions = {
  messageHeader: 'Check this out',
  messageBody: 'No really, check this out!'
}

let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
{% endhighlight %}

Here's an example of what you'll see by platform:

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

{% endif %}

{% protip title="To learn more about the concepts we used, visit these pages:" %}

- [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps)
- [Configuring Links]({{base.url}}/getting-started/configuring-links)
- [Branch Universal Object]({{base.url}}/getting-started/branch-universal-object)
- [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing)

{% endprotip %}

## Route incoming users directly to content

Now that your user has created a link and sent it to a friend, you should detect the incoming link when that friend opens your app, and route directly to the shared content. Read more about how to do this on the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page.

If you want to give a preview of the content to users who have not yet downloaded your app, try out [Deepviews]({{base.url}}/features/deepviews).

## Viewing live data on the Branch dashboard

The [Analytics page](https://dashboard.branch.io/#/analytics/content) on the Branch dashboard allows you to see data on content your users are sharing, and which pieces of content are the most popular. You can also use the dashboard's [Live View page](https://dashboard.branch.io/#/liveview) to see links and link clicks in real time.

{% protip %}
The [Influencers page](https://dashboard.branch.io/#/referrals/influencers) on the dashboard will show you who is driving the most new signups.
{% endprotip %}

{% elsif page.advanced %}

## Creating dynamic links without the share sheet

If you've built your own share sheet and you want to just create a Branch link for an individual share message or have another use case, you can create deep links directly with the following call:

<!--- iOS -->
{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"got my Branch invite link to share: %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrl(with: linkProperties) { (url, error) in
    if (error == nil) {
        print("Got my Branch link to share: (url)")
    } else {
        print(String(format: "Branch error : %@", error! as CVarArg))
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

You can find examples of `linkProperties` on the previous guide page. You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

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

You can find examples of `linkProperties` on the previous guide page. You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}
<!--- /Android -->

{% if page.cordova %}

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

{% endif %}

{% if page.xamarin %}

{% highlight c# %}
Branch.GetInstance().GetShortURL (callback,
                              universalObject,
                              linkProperties);

{% endhighlight %}

You can find examples of `linkProperties` and the `universalObject` on the previous guide page. After you've registered the class as a delegate of `IBranchUrlInterface`, you would next use the returned link and help the user post it to (in this example) Facebook.

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

{% highlight c# %}
Branch.getShortURL(universalObject, linkProperties, (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.getShortURL failed: " + error);
    } else {
        Debug.Log("Branch.getShortURL shared params: " + url);
    }
});
{% endhighlight %}

You can find examples of `linkProperties` and the `universalObject` on the previous guide page. You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}

<!--- Adobe -->

{% if page.adobe %}

{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "got my Branch invite link to share: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
  "userId": "12345",
  "userName": "Josh",
  "monsterName": "Mr. Squiggles",
  "$og_title": "Meet Mr. Squiggles",
  "$og_description": "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!",
  "$og_image_url": "https://example.com/monster-pic-12345.png",
  "$desktop_url" : "http://desktop-url.com/monster/12345"
};

branch.getShortUrl(tags, "facebook", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}

<!--- Titanium -->

{% if page.titanium %}

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "share",
  "channel" : "facebook"
}, {}
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com/monster/12345"
});
{% endhighlight %}

To implement the callback, you must add a listener to the event `bio:generateShortUrl`. The event returns a string object containing the generated link. You would next use the returned link and help the user post it to (in this example) Facebook.

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

{% endif %}

<!--- React -->

{% if page.react %}

{% highlight js %}
let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

You can find examples of `linkProperties` and the `controlParams` on the previous guide page. You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}

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
branchUniversalObj.showShareSheet({
  // put your link properties here
  "feature" : "share",
  "channel" : "facebook"
}, {
  "$email_subject" : "Therapists hate him", // title of email on iOS
}, {
  "shareText": "You will never believe what happened next!", // body of email
  "shareTitle": "Therapists hate him", // title of email on Android
  "copyToClipboard": "Copy",
  "clipboardSuccess": "Added to clipboard",
  "more": "Show More",
  "shareWith": "Share With"
});
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

## Previewing and debugging links

If you want to get an idea of what your links will look when shared on social media, Facebook's [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) can be useful.

This will show you all the meta data for your link, and a preview of what it will look like when shared on Facebook.

{% endif %}
