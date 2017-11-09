---
type: recipe
directory: marketing-channels
title: "iOS9/10 Spotlight Indexing"
page_title: "Index and track your content in iOS 9/10 Spotlight"
description: Learn how to list your content in Apple's new Spotlight search.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, iOS9, iOS 9, Apple Spotlight Search
hide_platform_selector: true
sections:
- overview
- guide
- advanced
alias: [ /features/spotlight-indexing/, /features/spotlight-indexing/overview/, /features/spotlight-indexing/guide/, /features/spotlight-indexing/advanced/ ] 
redirect: https://docs.branch.io/pages/organic-search/spotlight
---

{% if page.overview %}
Listing your app content on Apple's new Spotlight search with Branch is easy. Note that this guide will list on both _cloud search_ in addition to _local spotlight search_.

{% caution title="Legacy device support" %}
Some older devices cannot index content. iPad minis, for example, cannot use CoreSpotlight. The SDK includes a check for these devices and will return an error message if you attempt to index content on them.
{% endcaution %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- For Spotlight search results to function as intended, you should also [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Listing your content

Content can be added to Spotlight search by using the `BranchUniversalObject`. We'd recommend that you put this on every page that renders a piece of content for your users. This way, a user could rediscover a previous thing that they had viewed.

{% ingredient buo-overview %}{% endingredient %}

First, define the content that you'd like to be listed by customizing the `BranchUniversalObject`. We'd recommend that you do this in `viewDidLoad`

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];

// important to set this flag to true
branchUniversalObject.automaticallyListOnSpotlight = YES;
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

// important to set this flag to true
branchUniversalObject.automaticallyListOnSpotlight = true
{% endhighlight %}
{% endtab %}
{% endtabs %}

Then call the `userCompletedAction` method with the `View` event on your `BranchUniversalObject`. You will want to do this every single time a user goes to view a page in your app, so we recommend putting this in `viewDidAppear`, which means you must initialize the Branch Universal Object with all appropriate metadata before `viewDidAppear`.

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

This will create the appropriate NSUserActivity and tell Apple that a view occurred, adding it to the local Spotlight index if not already present in addition to increasing it's ranking in the global index. To read more about this, check out [this blog post](https://blog.branch.io/ios-10-spotlight-app-discovery-nsuseractivity-and-search-relevancy).

## Handle incoming traffic from Spotlight

{% tabs %}
{% tab objective-c %}

Open your **AppDelegate.m** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    [[Branch getInstance] continueUserActivity:userActivity];
    
    return YES;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}

Open your **AppDelegate.swift** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight swift %}
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
    // pass the url to the handle deep link call
    return Branch.getInstance().continueUserActivity(userActivity)

    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% elsif page.advanced %}

## Use deepviews for user acquisition

If the user doesn't have the app installed and finds your content through search, Spotlight will open up the browser. In this situation, you can [show a Deepview]({{base.url}}/features/deepviews), which is an automatically-generated, mobile web render of the app content.

## Further content customizations

You can use our identifier when indexing to perform advanced customizations of the content being listed. 

{% highlight objc %}
[branch getSpotlightUrlWithParams:@{@"$og_title": @"My App",
                                    @"$og_description": @"My app is disrupting apps",
                                    @"$og_thumb": @"https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png",
                                    @"object_id": @"1234"}
                         callback:^(NSDictionary *params, NSError *error) {
    if (!error && params) {
        // params will contain @"url" and @"spotlight_identifier"
        // the example below shows where to use them

        // Index via the NSUserActivity strategy
        // you must set the new NSUserActivity to the property of a UIViewController
        self.userActivity = [[NSUserActivity alloc] initWithActivityType:params[@"spotlight_identifer"]];
        self.userActivity.webpageURL = [NSURL URLWithString:params[@"url"]];
        [self.userActivity becomeCurrent];
    }
}];
{% endhighlight %}

## Indexing content at scale

If the goal is to simply index the content of the app without creating a `BranchUniversalObject` or if you want index content at scale then we recommend using the following method:

{% highlight objc %}

BranchCSSearchableItemAttributeSet *set = [[BranchCSSearchableItemAttributeSet alloc] init];
set.title = @"My Content Title";
set.contentDescription = @"My Content Description";
set.params = @{@"property1" : @"blue", @"property2" : @"red"};
set.keywords = [NSSet setWithArray:@["array", "of", "keywords"]];
set.thumbnailURL = @"https://example.com/mycontent-12345.png";
    
[set indexWithCallback:^(NSString * _Nullable url, NSString * _Nullable spotlightIdentifier, NSError * _Nullable error) {
        NSLog(@"url %@, spotlightIdentifier %@, error %@ ", url, spotlightIdentifier, error);
}];

{% endhighlight %}

{% endif %}
