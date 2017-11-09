---
type: recipe
directory: marketing-channels
title: "App Store Ads"
page_title: "Apple Search Ads"
hide_platform_selector: true
sections:
- overview
- guide
alias: [ /features/apple-search-ads/, /features/apple-search-ads/overview/, /features/apple-search-ads/guide/ ] 
redirect: https://docs.branch.io/pages/deep-linked-ads/apple
---

{% if page.overview %}

Branch can help track your Apple Search Ad campaigns by fetching the search ad attribution from Apple at app install.  You can then use the parameters you've set in the Apple Search Ad dashboard, parameters such as the campaign name, and take special action in you app after an install, or simply track the effectiveness of a campaign in the Branch dashboard, along with other your other Branch statistics, such as total installs, referrals, and app link statistics.

+ [Apple Search Ads](https://searchads.apple.com/)
+ [Apple Search Ads for Developers](https://developer.apple.com/app-store/search-ads/)
+ [Apple Search Ads WWDC](https://developer.apple.com/videos/play/wwdc2016/302/)

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

In order to check if the user came from an Apple Search Ad, you must make the attribution call before Branch initializes. As a warning, Apple's API is extremely slow often taking more than 1 second round trip. This means that your call to Branch's initSession to the execution of the callback block will be delayed by this additional 1 second.

You must add Apple's iAd.framework to your project to enable Apple Search Ad checking.

## Enable Apple Search Ads Check

{% tabs %}
{% tab objective-c %}

To enable this check, add a `delayInitToCheckForSearchAds` call to your **AppDelegate.m** file after you create the Branch singleton, but *before* you call `initSession`. Your code will end up looking something like this:

{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch delayInitToCheckForSearchAds];
[branch initSession.....
{% endhighlight %}
{% endtab %}
{% tab swift %}

To enable this check, add a `delayInitToCheckForSearchAds` call to your **AppDelegate.swift** file after you create the Branch singleton, but *before* you call `initSession`. Your code will end up looking something like this:

{% highlight swift %}
let branch: Branch = Branch.getInstance()
branch.delayInitToCheckForSearchAds()
branch.initSession.....
{% endhighlight %}
{% endtab %}
{% endtabs %}

If you're concerned about the additional 1 second latency, the call to `delayInitToCheckForSearchAds` can be called conditionally at run time. So, if you want to only check on first install, or the like, then just don't call this method.

## Apple Search Ads Debug

We've also added a debug mode which will demonstrate the functionality. You can enable it like so, but just remember to remove this before release!

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch setAppleSearchAdsDebugMode];
[branch delayInitToCheckForSearchAds];
[branch initSession.....
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branch: Branch = Branch.getInstance()
branch.setAppleSearchAdsDebugMode()
branch.delayInitToCheckForSearchAds()
branch.initSession.....
{% endhighlight %}
{% endtab %}
{% endtabs %}

## View Attribution on Dashboard

All the attribution can be visible on the [Branch dashboard summary page](https://dashboard.branch.io/). All installs and opens registered from this channel will automatically be tagged with the `channel`: `Apple App Store` and the `feature`: `Search Ads`. The `campaign` will be set to the Campaign Name you've configured in the Apple Search Ads dashboard.

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

{% endif %}
