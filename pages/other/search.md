---
type: recipe
directory: other
title: "In-App Search"
page_title: "Content Indexing & In-App Search"
description: Learn how to enable your app to support a Branch powered In-App Search Experience. With this functionality you can list in-app content on the on-device search index. This also gives you insight via analytics into content that your users are interacting with to let you build out powerful re-engagement experiences.
keywords: Search, Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking
hide_platform_selector: true
sections:
- overview
- guide
- advanced
exclude_from_google_search: true
alias: [ /features/search/, /features/search/overview/, /features/search/guide/, /features/search/advanced/ ]
redirect: https://docs.branch.io
---

{% if page.overview %}

Branch is now building a powerful search interface that will allow your users to discover personalized content within your app. With a few lines of code you can allow your users to discover and interact with relevant in-app content via an external search interface. This provides you an opportunity to re-engage with your users via content and preserve a rich experience by deep linking them directly to content within your app. This is the first step to building a more open mobile ecosystem where in-app content is delivered to the right users at the right time. 

## A new personalized search powered by Branch

This is what the Branch search experience might look like on an Android Device. Note that this is currently a proof of concept and will be soon available in the App Store. 


{% image src='/img/pages/features/search/search_overview.png' full center alt='Search Overview' %}

### Preview the experience below:

<video width="640" controls>
<source src="/img/pages/features/search/search_demo.mp4" >
</video>


Come help us build a more open mobile ecosystem by integrating the SDK today and listing your content in search.

## Benefits for you:
1. This will allow your users to discover and engage with your app via an additional channel, also enabling them to deep link into your app directly from the search results.
2. This integration will also provide you insight into the most interacted content within your app allowing you to build powerful re-engagement experiences. 
3. In the future Branch will also provide developers with a search API to surface their trending content as well as ranked search results. This will enable you to build out personalized discovery experiences within your app.

## How in-app search works

Branch registers and manages a private search index that resides on the users device. This index is installed with the Branch Smart Finder app and by other distribution channels. The Branch SDK exposes a method to allow developers to add content to this on-device index with just a few lines of code. As your users interact with content within your app (for example: share a piece of content, watch a video or even add an item to the cart), we recommend you call this SDK method to add content to the index and register the user interaction. This allows Branch to determine the best relevance for the content when users search. 

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% protip title="This is available on Android only" %}

For now, this is an Android only feature.

{% endprotip %}

{% prerequisite %}

- For this to function as intended, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

In order for Branch to surface the most relevant in-app content to its users, it needs to understand what content you as a developer would like to surface to your users. You need to create an object that represents your content, signaling to Branch what that content is about. Then, all you do, is call a method on the SDK to add it to the index. Doing these two steps will allow your users to discover personalized relevant content via an external search interface powered by Branch. 

Our most basic recommendation is, whenever any user _views_ a piece of content within your app, you should add that piece of content to the Branch hosted on-device index. You can view more guidelines on when to index content in the sections below.

## Index your content with Branch

A `BranchUniversalObject` represents a single, self-contained object associated with a piece of content in your app. it provides convenient methods for sharing, deep linking, tracking views as well as indexing. Think of `BranchUniversalObject` as equivalent piece of content within your app. You build this object by assembling parameters that represent your content.

At a minimum you must supply the following parameters:

- **canonicalIdentifier** : this represents a unique identifier for a piece of content. For example, it could be a productID, videoID, contentID. Anything that is unique within your entire application
- **title** : This represents the title of the content
- **description** : A one to two line description of the piece of content. This will be a searchable field by a user and will also be used to render a snippet of the result in the search interface
- **contentImageUrl** : This represnts the image url for the content. This will be used as a thumbnail in the search results
- **contentIndexingMode** : `CONTENT_INDEX_MODE.PUBLIC`, `CONTENT_INDEX_MODE.PRIVATE`, `CONTENT_INDEX_MODE.NO_INDEX`. This is used to indicate if this content is allowed to be publically accessible or is private to this specific user only. In the case of private mode, this information will always be kept on-device only and never shared with third party servers. You can also disable any indexing of this content by specifying NO_INDEX.

After the parameters are assembled, you call `listOnBranchSearch` on this object to add content to the index.

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345") // unique identifier for a piece of content
                .setCanonicalUrl("http://mypage.com/content/12345") // optional
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC);

// Add the item to the index specifying the user event that triggered this interaction
branchUniversalObject.listOnBranchSearch(BranchEvent.VIEW);

{% endhighlight %}

To learn more about how to use and customize the Branch Universal Object for content, see [more details here]({{base.url}}}/features/search/advanced/#representing-your-content-using-the-branchuniversalobject).

## Guidelines for when to index your content with Branch

We don't recommend adding every piece of content in your app to the on-device Branch index in order to honor resource constraints on device as well as preserve the search user experience. What is most valuable from an on-device interaction and search experience is for users to be able to discover relevant content that they have engaged with in the past. We only recommend adding content that you think is valuable for a specific user based on their interaction with content within your app. Here are a few guidelines to help you determine when to add content to the index.

### 1. Index content on every user interaction with content

The most basic recommendation we give our users is to index content with Branch on every user interaction with a specific piece of content. Make sure you add the appropriate user interaction signals as part of the index method to allow Branch to incorporate the significance of the event in ranking. For example, a user that adds an item to their cart has a stronger affinity to that item vs just viewing it.  

Here are some examples of when you might index content:

- A user views the content by clicking on the piece of content. 
- A user watches a video
- A user adds an item to the cart
- A user purchases an item
- A user favorites an item
- A user reviews an item

For a complete list of user interaction events see our [BranchUniversalObject documentation]({{base.url}}}/getting-started/branch-universal-object/guide/android/#usercompletedaction)

### 2. Index content when a user is viewing a specific colleciton of items in your app

When a user is viewing a collection of items (i.e. a list of search results or a set of red shoes), they have expressed interest in the collection of items. All of the items in the list are relevant to a user and encouraged to be surfaced via an external search interace. In this situation, we recommend indexing up to _1-2 pages_ of the collection results or a _max of 20 results_ whichever is fewer. 

The reason we recommend limiting how much content you put into the index is that we think this interface should be curated to a user rather than over-populating the index. We have checks and limits in place to avoid an app from over-populating an index. 

Here are some examples when you might choose to index collections of items (In all of these cases you would index upto 1-2 pages of the results or 20 results whichever is lower):

- A user searches for something in your app and gets a collection of results. 
- A user browses for a particular collection of results, example - black dress or red shoes
- A user views a category of items in your app, example - headphones

## Tips to improve your content ranking

Here are some things you can do to ensure that your content gets boosted appropriately:

- Always specify the appropriate user interaction signal. e.g. ADD_TO_CART, PURCHASE, FAVORITE, that will indicate to branch an enhanced interaction with a piece of content
- Err on the side of always calling the index method on every user interaction with a piece of content. This helps branch gauge the relevance of a specific item for that user

{% getstarted %}{% endgetstarted %}

{% elsif page.advanced %}

## Representing your content using the BranchUniversalObject

A `BranchUniversalObject` is a container that Branch uses to represent content within your app. It is a single, self-contained object associated with a piece of content in your app and provides convenient methods for you to invoke sharing, indexing for search and deep linking.

Here are the key properties from a content standpoint and things to consider when building this object. For a full list of methods and properties see our [BranchUniversalObject documentation]({{base.url}}}/getting-started/branch-universal-object/guide/android/)

Parameter | Usage
--- | ---
setCanonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
setTitle | The name for the piece of content. This is added to the search index and enables a user to find the content by its title.
setContentDescription | A description for the content. This is added to the search index and enables a user to find the content on its description.
imageUrl | The image URL for the content. This is used as the thumbnail image in the Search interface and adds a great visual element for your content.
setKeywords | Used to indicate significant keywords for SEO to be used for this content. For example, a restaurant listing could specify the cuisine as a keyword.
setContentIndexingMode | Can be set to either `BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC` or `BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE` or `BranchUniversalObject.CONTENT_INDEX_MODE.NO_INDEX` . Public indicates that you'd like this content to be discovered in search.
setLocale | Should be set the the locale that best represents this content
setContentExpiration | The date when the content will not longer be available or valid. Set in milliseconds. After this date, the content will no longer be discoverable via search. Use content expiration when you have time sensitive content.
setContentType | The type of content that this represents, for example, `BranchUniversalObject.CONTENT_TYPE.BUSINESS_RESTAURANT` , `BranchUniversalObject.CONTENT_TYPE.TEXT_ARTICLE_NEWS`.

### Specifying the content type

In order for Branch to better understand the type of content, it is very important that you to specify the type that your content represents (e.g. a Movie or a Restaurant or a News article). You can specify a list of optional paramters for each content type to be able to better render your content in the Search interface. For example, a movie might have ratings, and a restaurant might have a place associated with it. 

Here is a complete list of support content types that will be available as part of the `BranchUniversalObject.CONTENT_TYPE` enum. The below enum is coming soon to the SDK.

Parameter | Usage
--- | ---
CONTENT_TYPE.COMMERCE_PRODUCT | This represents an ecommerce Product or Item. For example, this could be a pair of headphones, or a dress or any such thing.
CONTENT_TYPE.TEXT_ARTICLE | This represents a generic article
CONTENT_TYPE.TEXT_ARTICLE_NEWS | This represents a news article
CONTENT_TYPE.TEXT_BLOG | This represents a more specific text article that is a blog post
CONTENT_TYPE.TEXT_RECIPE | This represents a recipe
CONTENT_TYPE.MEDIA_AUDIO | This represents audio content
CONTENT_TYPE.MEDIA_VIDEO | This represents video content
CONTENT_TYPE.MEDIA_IMAGE | This represents an image (for example, a photo sharing app)
CONTENT_TYPE.BUSINESS | This represents a generic type of business establishment
CONTENT_TYPE.BUSINESS_RESTAURANT | This represents a restaurant
CONTENT_TYPE.BUSINESS_ACCOMODATION | This represents an establishment providing accomodation like a hotel

### Best practices for using Branch Universal Object for content

Here are a set of best practices to ensure that your in-app content gets effectively indexed and retrieved as part of an external search interface

1. Set the `canonicalIdentifier` to a unique, de-duped value across instances of the app. The `canonicalIdentifier` should represent a unique id for this piece of content. For example a productId, or contentId. If you don't have anything within your app that uniquely represents your content, we recommend using either a hash function on your unique properties.
2. Ensure that the `title`, `contentDescription` and `imageUrl` are set (required fields) and that they represent the object. These are used to index your content as well as search against when a user tries to discover content. The imageUrl will be the thumbnail that is rendered in the search interface and setting this will help your content be more visually eye-catching.
3. Set the `contentType` to indicate the type of content that this represents. This is important to enable Branch to be able to render your content appropriate to the type of content it is. For example a movie might show ratings, while a restaurant might show the location. This also helps rank and surface your content well.

Practices to _avoid_:

1. Don't set the **same** `title`, `contentDescription` and `imageUrl` across semantically different objects
2. Don't set the **same** `canonicalIdentifier` across semantically different objects

## Indexing API's and usage recommendations

### (instance of BUO).listOnBranchSearch(BranchEvent.*)

You should call this method on an instance of a `BranchUniversalObject` when a user interacts with a piece of content in your app. This method adds this piece of content to the on-device index. Note that it is safe to call this function repeatedly as it will simply register a new user interaction against the content, increasing its relevancy.

A user interaction is any interaction with a piece of content, for example a user viewing a content, watching a video, adding an item to the cart, favoriting an item, etc. For a complete list of User interaction events see our [BranchUniversalObject documentation]({{base.url}}}/getting-started/branch-universal-object/guide/android/#usercompletedaction).

{% highlight java %}
// Add the item to the index specifying the user event that triggered this interaction
branchUniversalObject.listOnBranchSearch(BranchEvent.VIEW);
{% endhighlight %}

### (instance of BUO).deleteFromBranchSearch()

This method deletes the content from the on-device index using the canonical identifier as the reference.

You should call this method on an instance of a `BranchUniversalObject` when you no longer want this piece of content in the index. This should rarely be called by a developer but if you want more control on content in the index, you can use this method to delete content as you see fit. 

{% highlight java %}
// Add the item to the index specifying the user event that triggered this interaction
branchUniversalObject.deleteFromBranchSearch();
{% endhighlight %}

### BranchUniversalObject.deleteAllFromBranchSearch()

This static method deletes all associated content from your app in the on-device index. 

You should call this method when a user logs out of your app and your app has personal content in it. For example a note taking application, when a user logs out, you can delete all associated content in the on-device index to prevent leaking personal information

{% highlight java %}
// Add the item to the index specifying the user event that triggered this interaction
BranchUniversalObject.deleteAllFromBranchSearch();
{% endhighlight %}

## Usage limits and guidelines

The on-device index will proactively prevent developers from indexing content beyond our rate limits to preserve the user experience on resource constraints on-device.

This is to prevent against the following conditions:

- An infinite loop on the index call that keeps adding content to the on-device index
- A developer adding their entire inventory of information to the index

The limits that we have in place are:

- listOnBranchSearch can be called a maximum of 20 times a minute
- No more than 10000 pieces of content / app to preserve resource constraints

## A note on user privacy

Branch places a lot of control in the developers hands and takes user data privacy very seriously. As a developer, you can indicate via the SDK method whether the piece of content is: 

- private - which means it stays on the users device at all times and is never sent to any servers;
- public - which means that its aggregated use will be available to you via analytics.

Branch also allows users to indicate the level of privacy they are comfortable with enabling users to prevent any tracking and usage statistics from being sent outside their device.


{% endif %}


