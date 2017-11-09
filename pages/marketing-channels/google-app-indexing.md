---
type: recipe
directory: marketing-channels
title: "Firebase App Indexing"
page_title: "Index and track your content with Google's Firebase App Indexing"
description: Learn how to list your content in Google's Firebase App Index.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, iOS9, iOS 9, Apple Spotlight Search
platforms:
- ios
- android
- cordova
- xamarin
- unity
- titanium
- react
sections:
- overview
- guide
- advanced
alias: [ /features/google-app-indexing/, /features/google-app-indexing/overview/, /features/google-app-indexing/guide/ios/, /features/google-app-indexing/guide/android/, /features/google-app-indexing/guide/cordova/, /features/google-app-indexing/guide/xamarin/, /features/google-app-indexing/guide/unity/, /features/google-app-indexing/guide/titanium/, /features/google-app-indexing/guide/react/, /features/google-app-indexing/advanced/ios/, /features/google-app-indexing/advanced/android/, /features/google-app-indexing/advanced/cordova/, /features/google-app-indexing/advanced/xamarin/, /features/google-app-indexing/advanced/unity/, /features/google-app-indexing/advanced/titanium/, /features/google-app-indexing/advanced/react/ ] 
redirect: https://docs.branch.io/pages/organic-search/firebase
---

{% if page.overview %}

Google is investing significant resources into a project called App Indexing, where they will try to expose ‘app results’ in Google searches performed on mobile devices. Most recently, at the Google IO in 2016, they renamed this to Firebase App Indexing, although the functionality remained the same.

Here's how App Indexing works:

- *important detail:* Results, ranking and relevancy are based upon the web scrape. App Indexing does not improve relevancy.
- App Indexing makes that web result _also_ open up your app. There are a few ways to achieve this:

  - Make your existing website support Apple's Universal Links and Android's App Links. After this, all of your links will correctly open the app and you're done.
  - OR Add the undocumented header `<link rel="alternate" ..` tags to your website for when Google crawls the page. Branch can assist with this task through the WebSDK function `autoAppIndex()` described [here]({{base.url}}/marketing-channels/google-app-indexing/advanced/ios/#alternative-path-have-the-websdk-inject-app-indexing-tags-into-your-webpage). 

- If Google knows your website opens the app, when it shows up in a search result, and the user has the app installed, the app will open instead of the website

**Branch's App Indexing integration is designed for businesses that don't have a website, and want Branch to host their site for them. If you have a website, Branch can dynamically inject App Indexing tags through the WebSDK function `autoAppIndex()` described [here]({{base.url}}/marketing-channels/google-app-indexing/advanced/ios/#alternative-path-have-the-websdk-inject-app-indexing-tags-into-your-webpage).** Note that in order for you to get traffic from this feature, your Branch link will need to appear in search results. We've just now supercharged our app indexing feature with AMP tech to leverage Google's new prioritization of these pages.
{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% protip title="This guide is for developers without a website" %}

If you have a website, Branch can dynamically inject App Indexing tags through the WebSDK function `autoAppIndex()` described [here]({{base.url}}/features/google-app-indexing/advanced/#alternative-path-have-the-websdk-inject-app-indexing-tags-into-your-webpage).

{% endprotip %}

{% prerequisite %}

- For this to function as intended, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- We also recommend you enable [Deepviews]({{base.url}}/features/deepviews) so that users without your app will see a mobile web preview of this content.

{% endprerequisite %}

## Index your content with Branch

A `BranchUniversalObject` is a container that Branch uses to organize and track pieces of content within your app. As a single, self-contained object associated with each thing that you want to index with Google, it provides convenient methods for sharing, deep linking, and tracking how often that thing is viewed.

You build a `BranchUniversalObject` by assembling parameters. After the parameters are assembled, you call a method to ensure Branch adds the content to the index.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.canonicalUrl = "http://mypage.com/content/12345";
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];

// register a view to add the item to the index
[branchUniversalObject userCompletedAction:BNCRegisterViewEvent];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.canonicalUrl = "http://mypage.com/content/12345"
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"
branchUniversalObject.addMetadataKey("property1", value: "blue")
branchUniversalObject.addMetadataKey("property2", value: "red")

// register a view to add the item to the index
branchUniversalObject.userCompletedAction(BNCRegisterViewEvent)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setCanonicalUrl("http://mypage.com/content/12345") // optional
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                .addContentMetadata("property1", "blue")
                .addContentMetadata("property2", "red");

// call list on Google Search to add the item to the index
branchUniversalObject.listOnGoogleSearch();
{% endhighlight %}

{% endif %}

{% if page.cordova %}

{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'content/12345',
  canonicalUrl: 'http://mypage.com/content/12345', // optional
  title: 'My Content Title',
  contentDescription: 'My Content Description',
  contentImageUrl: 'https://example.com/mycontent-12345.png',
  contentMetadata: {
    'product_picture': '12345',
    'user_id': '6789'
  }
}).then(function (newBranchUniversalObj) {
  branchUniversalObj = newBranchUniversalObj;

  // register a view to add to the index
  branchUniversalObj.registerView();
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

// register a view to add to the index
Branch.registerView(universalObject);
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

// register a view to add to the index
Branch.registerView(universalObject);
{% endhighlight %}

{% endif %}

{% if page.titanium %}

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",
  "canonicalUrl": "http://mypage.com/content/12345", // optional
  "title" : "My Content Title",
  "contentDescription" : "My Content Description",
  "contentImageUrl" : "https://example.com/mycontent-12345.png",
  "contentIndexingMode" : "public",
  "contentMetadata" : {
      "product_picture" : "12345",
      "user_id" : "6789"
  },
});

// register a view to add to the index
branchUniversalObject.registerView();
{% endhighlight %}

{% endif %}

{% if page.react %}

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
	'content/12345', // canonical identifier
	{
		canonicalUrl: 'http://mypage.com/content/12345', // optional
		contentTitle: 'My Content Title!',
		contentImageUrl: 'https://example.com/mycontent-12345.png',
		contentDescription: 'Cool Content Description',
		metadata: {
			product_picture: '12345',
			user_id: '6789'
		}
	}
)

// register a view to add to the index
let viewResult = await branchUniversalObject.registerView()
{% endhighlight %}

{% endif %}

If you'd like to view all associated customizations with the Branch Universal Object, see [more details here]({{base.url}}/getting-started/branch-universal-object/guide/).

## Enable App Indexing for Google on Branch

If you have completed the prerequisites, you've done the hard part! Now you should go enable automatic sitemap generation on the [Organic Search](https://dashboard.branch.io/search) page of the Branch Dashboard. Check the `Automatic sitemap generation` checkbox.

{% image src="/img/pages/features/google-app-indexing/db-settings.png" 2-thirds center alt="Settings page" %}

Once you enable this, your app will be included in our nightly job to automatically generate sitemaps. These sitemaps can be scraped by Google, and all of the included links can then be indexed.

## When does Google scrape?

After you've enabled App Indexing, how can you know that Google has even seen your content? We've created a graph, which is currently located at the bottom of the Dashboard's [Summary](https://dashboard.branch.io) page. This graph lists four pieces of information:

1. The date the sitemap files were last generated (and included at least one of your links)
2. The total number of links to unique pieces content that Branch has included in sitemaps
3. The date Google last scraped your links
4. The total number of times that Google has scraped links to your content

Both the sitemap itself and statistics about Google scraping your links are updated via nightly map-reduce jobs.

{% image src="/img/pages/features/google-app-indexing/db-summary.png" 2-thirds center alt="Summary page" %}

{% elsif page.advanced %}

## How to configure your own website for App Indexing

If you already have your own website, we recommend that you configure your own site for App Indexing rather than use Branch's hosted App Indexing. You want your main website, with your domain and SEO juice to appear in Google rather than try to push your `app.link` domain into search results. Therefore, we recommend you go through a few steps to configure your site for App Indexing.

App Indexing, despite the confusing amount of literature out there, simply opens up your app when installed and falls back to your website when not. You actually don't need to use any of Google's tools (Firebase App Indexing) to accomplish this. Merely configuring your domain for Universal Links on iOS and App Links on Android will do the trick. Here are more details:

### Recommended path: Add Universal Link and App Link support to your domain

This is by far the easiest way to take advantage of Google App Indexing, and the recommended way per conversations that we've had with their team. All you need to do is configure Universal Links and Android App Links on your domain and your corresponding apps.

We've put together some handy guides on our blogs:
- [Enable Universal Links on your domain](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
- [Enable Android App Links on your domain](https://blog.branch.io/how-to-set-up-android-m-6.0-marshmallow-app-links-with-deep-linking)

Feel free to drop us a line if you need help with this stuff.

### Alternative path: Have the WebSDK inject App Indexing tags into your Webpage

If you don’t want to implement Universal or App Links then you can allow the WebSDK to inject App Indexing meta tags between the head section of your webpage. These tags allow Google's web crawling bots to index your app content by launching your app through URI schemes.

This requires:

1. Branch to be integrated for URI based deep linking. Please ensure that steps 1, 2, 3 and 4 (*iOS* only) of the following guides are completed:
    - [Android SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/android/)
    - [iOS SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/ios/)

2. A call to `autoAppIndex()` (a WebSDK function) to be made with the appropriate parameters (see below).

 Ensure that you've placed the snippet from [here](https://github.com/BranchMetrics/web-branch-deep-linking#quick-install) somewhere between the `<head></head>` tags of your webpage. Then position `branch.autoAppIndex({..})` below `branch.init()` and with the optional parameters below:

| Key | Value
| --- | ---
| "androidPackageName" | Android App's package name
| "androidURL" | A custom scheme for your Android App such as: `example/home/cupertino/12345` where `example` is the App's URI scheme and `home/cupertino/12345` routes to unique content in the App
| "iosAppId" | iTunes App Store ID for your iOS App
| "iosURL" | A custom scheme for your iOS App such as: `example/home/cupertino/12345`
| "data" | Any additional deep link data that you would like to pass to your App

**Example:**
{% highlight html %}
branch.autoAppIndex({
    iosAppId:'123456789',
    iosURL:'example/home/cupertino/12345',
    androidPackageName:'com.somecompany.app',
    androidURL:'example/home/cupertino/12345',
    data:{"walkScore":65, "transitScore":50}
}, function(err) { console.log(err); });
{% endhighlight %}

After the WebSDK has initialized, the function will inject Firebase App Indexing tags between the head section of your webpage with the following format:

{% highlight html %}
<html>
<head>
  ...
  <link rel="alternate" href="android-app://{androidPackageName}/{androidURL}?{branch_tracking_params_and_additional_deep_link_data}"/>
  <link rel="alternate" href="ios-app://{iosAppId}/{iosURL}?{branch_tracking_params_and_additional_deep_link_data}"/>
  ...
</head>
<body> … </body>
{% endhighlight %}

**Note**: If optional parameters from above are not specified, Branch will try to build Firebase App Indexing tags using your page's [App Links](http://applinks.org/documentation/) tags. 

Alternatively, if optional parameters are specified but Firebase App Indexing tags already exist then this function will append Branch tracking params to the end of those tags and ignore what is passed into `.autoAppIndex()`.

For debugging purposes, you can check that the method is correctly inserting these tags by right clicking anywhere on your webpage in Chrome then clicking on inspect. After that, toggle the head section of your page's HTML and you should see the dynamically generated Firebase App Indexing tags.

Analytics related to Google's attempts to index your App's content via these tags can be found from Source Analytics in Dashboard where `channel` is `Firebase App Indexing` and `feature` is `Auto App Indexing`.

{% protip title="Testing with Webmaster Tools" %}
We have read on Google's official blog that Googlebot renders javascript before it indexes webpages however, there are times where it may choose not to. The reasons why are unclear to us. Therefore, dynamically generated App Indexing meta tags created as part of this function may or may not appear in your tests with Webmaster Tools when you try to fetch and render as Googlebot.{% endprotip %}

## For Branch hosting: Attribute app traffic to organic search

Curious as to how well your content is performing -- how many clicks and installs it is driving?

We automatically tag clicks on these links as coming from Google App Indexing. In the Click Flow section of our Dashboard's [Summary](http://dashboard.branch.io/#) page, you can filter for these clicks. Just select either `channel: google_search` or `feature: google_app_index`.

## For Branch hosting: Hiding content from the index

Not all content is public, and not all content should be publicly indexed. If you want to enable Branch's automatic sitemap generation but exclude certain pieces of content, you can mark that content as private. You should set the content indexing mode for the individual Branch Universal Object.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.contentIndexMode = ContentIndexModePrivate;
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.contentIndexMode = ContentIndexModePrivate
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE)
{% endhighlight %}

{% endif %}

## How to - prevent - links from being listed on Google

By default, all Branch Universal Objects are marked as eligible for indexing publicly on Google or other search engines. If you feel that you have personal content that you don't want exposed, you can mark the content as private using the flag shown below. Please do this before creating links or registering views.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.canonicalUrl = "http://mypage.com/content/12345";
branchUniversalObject.contentIndexMode = ContentIndexModePrivate;
...
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.canonicalUrl = "http://mypage.com/content/12345"
branchUniversalObject.contentIndexMode = ContentIndexModePrivate
...
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE)
                ...;
{% endhighlight %}

{% endif %}

{% if page.cordova %}

{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'content/12345',
  contentIndexMode: 'private'
  ...
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "content/12345";
universalObject.contentIndexMode = ContentIndexModePrivate;
...
{% endhighlight %}

{% endif %}

{% if page.unity %}

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "content/12345";
universalObject.contentIndexMode = ContentIndexModePrivate;
...
{% endhighlight %}

{% endif %}

{% if page.titanium %}

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",
  "contentIndexMode": "private"
  ...
});
{% endhighlight %}

{% endif %}

{% if page.react %}

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'content/12345', // canonical identifier
  {
    ...
    metadata: {
      '$publicly_indexable': 0
    }
  }
)
{% endhighlight %}

{% endif %}

{% endif %}
