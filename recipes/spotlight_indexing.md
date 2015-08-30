---
type: recipe
title: "iOS9 Spotlight Deep Links"
page_title: "Index and track your content in iOS 9 Spotlight"
description: Learn how to list your content in Apple's new Spotlight searhc.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, iOS9, iOS 9, Apple Spotlight Search
hide_platform_selector: true
---

Listing your app content on Apple's new Spotlight search with Branch is easy. Note that this guide will list on both _cloud search_ in addition to _local spotlight search_.

## Listing your content

Content can be added to Spotlight search with a single line of code. We'd recommend that you put this on every page that renders a piece of content for your users. This way, a user could rediscover a previous thing that they had viewed.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch createDiscoverableContentWithTitle:@"Kindred"
                               description:@"My app is disrupting apps"
                              thumbnailUrl:[NSURL URLWithString:@"https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png"]
                                  userInfo:@{@"object_id": @"1234",
                              				 @"deeplink": @"data"}
                         publiclyIndexable:YES];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branch: Branch = Branch.getInstance()
branch.createDiscoverableContentWithTitle("Kindred",
                                        description: "My app is disrupting apps",
                                        thumbnailUrl: NSUrl.init("https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png"),
                                        userInfo: ["deeplink": "data",
                                                   "object_id": "1234"],
                                        publiclyIndexable: true)
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Other tips and best practices

### Deep link from Spotlight

What's more delightful than searching for a particular something on your phone, and then clicking it to open the app immediately. You'll need to setup deep linking to allow for this.

1. Add a custom key in your Branch dictionary to deeplink from when click (`picture_id`, `article_id`, etc)
2. Let Branch open the view controller automatically when the key is detected. [**Here's how to set it up.**](/recipes/easy_deep_linking/ios)

### Use deepviews for user acquisition

If the user doesn't have the app installed and finds your content through search, Spotlight will open up the browser. You can show a deepview, which is an automatically-generated, mobile web render of the app content. [**Here's how to set it up.**](/recipes/deepviews/ios)

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}