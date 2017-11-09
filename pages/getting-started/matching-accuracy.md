---
type: recipe
directory: getting-started
title: Matching Platform
page_title: How to get the most out of Branch deep linking
description: How does Branch matching work? Learn about mechanisms we use to pass data through to the app and attribute app sessions back to the source.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, matching, fingerprint, snapshot, accuracy, direct deep linking
hide_platform_selector: true
sections:
- overview
- guide
redirect: https://docs.branch.io/pages/resources/matching/
---

{% if page.overview %}

There are several mechanisms Branch uses to pass data through to the app and attribute app sessions back to the source. We always use the method with the highest match confidence rate.

## Methods with 100% match accuracy

### Direct deeplinking

If the app is currently installed on the phone, and you've configured your Branch links with your app's URI scheme (`myapp://`) or to use Universal or App Links, we will open the app immediately and pass a click identifier through to our native library. This click identifier is then sent to the Branch servers to retrieve the dictionary of data associated with the link.

For example, we'd call `myapp://open?link_click_id=123456` to open the app immediately. The Branch native library parses out `link_click_id: 123456` and passes it back to the Branch API to retrieve the data dictionary associated with that link click.

### IDFA token matching across the Branch Network

When a user clicks a Branch link for your app, and we've seen them click a link for another app on our partner network, we've already matched them up to a corresponding device identifier. This means that when they install the app, we know with 100% certainty that they just came from that link click.

The fact that we have such a global network of apps with hundreds of millions of users clicking links, means that when you join the platform, you can benefit from the crowd-sourced accuracy gained through all our apps contributing the browser-app profiles. Read more about how important this is on [our blog](https://blog.branch.io/the-importance-of-matching-accuracy-in-deep-linking).

### Leveraging other match techniques

We've built out custom deep linking mechanisms that are specific to each platform to ensure that deep linking is accurate. Here are some of those techniques we use:

| Match Method | Implementation Details
| :--- | ---
| **Facebook deferred deep linking API** | We've built a custom integration with Facebook where if a user originates from an app invite or advertisement, we connect with Facebook's API to know with 100% certainty if the install originated from this source. You'll need to authenticate with Facebook on the Branch dash if you want to support this.
| **Android Google Play referrer** | Google Play supports passing a referrer through the install process that we listen for. It's notoriously unreliable and currently unsupported when redirecting from Chrome. However, we'll use it when available. Enabling this method is covered in the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/android/#configure-manifest).
| **iOS 9/10 Safari cookie passthrough** | We built a custom technique into our iOS SDK that will guarantee 100% accuracy on iOS 9/10 when a user clicks from the Safari browser. This only applies if you include SafariServices.framework in your app. Note that this method has some risks due to a recent (9/1/16) policy change on iOS. Please see our new recommended [path to use this feature]({{base.url}}/getting-started/matching-accuracy/guide/#configuring-your-ios-app-for-100-match-from-safari).
| **Android Chrome Tabs cookie passthrough** | We built a custom technique into our Android SDK that will guarantee 100% accuracy when a user originates from the Chrome browser. We're automatically cookie match based on app.link, but you can configure the domain depending on your use case. Please see [the guide here]({{base.url}}/getting-started/matching-accuracy/guide/#configuring-your-android-app-for-100-match-from-chrome).

## Methods without 100% match accuracy

### Browser to app snapshot match

Branch collects information about devices both when a user is in the browser -- via a click on a Branch link -- and then after they open the app. This information includes **IP Address**, **OS**, **OS version**, **device model** and other parameters. This is the user's **_digital snapshot_** and can be obtained in the browser and in the app.

When no 100% match method is available, we connect the unique snapshot collected in the app to the unique snapshot collected in the browser to determine where user originated.

{% protip title="Customize the snapshot matching criteria" %}

If you are concerned that users may potentially have the same snapshot, you can choose to have us not match users if two identical snapshots are outstanding. On the Dashboard's [Link Settings](https://dashboard.branch.io/#/settings/link) page, under advanced options, you should set **Match Type** to `Unique`. You can also modify the 7200 second (2 hour) default expiration for all links, or [configure it for individual links]({{base.url}}/getting-started/configuring-links) by using the `$match_duration` control parameter.

{% image src="/img/pages/getting-started/matching-accuracy/match_type.png" center full alt="match_type" %}

This means that if two users with the same snapshot, on the same wifi, were to click a Branch link for your app, we would blacklist those digital snapshots for the expiration duration. Therefore, when either user opens up your app, no match would be made.

{% endprotip %}

{% elsif page.guide %}

## Configuring your iOS app for 100% match from Safari

100% match is a bit of a misnomer, as it is only 100% match from when a user clicks from the Safari browser. According to our analysis, clicking through Safari happens about 50-75% of the time depending on the use case. For example, clicking from Facebook, Gmail or Chrome won't trigger a 100% match here. However, it's still beneficial to the matching accuracy, so we recommend employing it.

### Include SafariServices.framework

First off, you'll need to include the `SafariServices.framework` into your app to leverage this. Currently, as soon as you add the Framework, Branch will start triggering the Safari-based 100% match technique. Note that this can be **disabled* using the following method, which should be called _before_ `initSession`.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] disableCookieBasedMatching];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().disableCookieBasedMatching()
{% endhighlight %}
{% endtab %}
{% endtabs %}

To add the framework, simply go to your Xcode project:

- Select the right build target
- Select the `General` tab
- Scroll down to `Linked Frameworks and Libraries`
- Click the `+` button
- Add `SafariServices.framework`

### *Recommended:* Display the SFSafariViewController to your user

With recent the change in [Apple's App Store policy](https://github.com/saniul/AppStoreGuidelines/commit/fa416010a9fe6ec5eb462e6d6956a69370cb3fa6#diff-9244bf30c63719c70ca91152bc28ff54R277), Apple requires that the Safari View Controller must be used to display information to users and cannot be loaded behind the scenes. Because of this, to use Branch's Safari View Controller code, we **highly** recommend you comply with policy.

In showing a SafariViewController to your users, you likely are going to load a website with information on it. We've built some functionality that allows you load the Branch matching URL in your Safari View Controller and specify the URL for us to redirect to afterwards. Here is the recommended pathway:

**1)** Tell Branch to wait to initialize until you've displayed the Safari View Controller to the user. We recommend only doing this conditionally, since it will block the initialization of Branch in all cases until you call the corresponding `resumeInit`.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
// Call this before initSession
[[Branch getInstance] enableDelayedInit];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
// Call this before initSession
Branch.getInstance().enableDelayedInit()
{% endhighlight %}
{% endtab %}
{% endtabs %}

**2)** Retrieve the 100% match URL from Branch by passing in the desired redirect URL. This will create a URL like `https://app.link?branch_key=key_live_1234&hardware_id=IDFAstuff&redirect_url=http://mysite.com/welcometotheapp`. It will quickly redirect from app.link to the destination URL, displaying it in the view controller while simultaneously checking the cookie for Branch to do 100% matching.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
NSURL *updatedUrlForOnboarding = [[Branch getInstance] getUrlForOnboardingWithRedirectUrl:[NSURL URLWithString:@"http://mysite.com/welcometotheapp"]];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let updatedUrlForOnboarding = Branch.getInstance().getUrlForOnboardingWithRedirectUrl(NSURL.URLWithString("http://mysite.com/welcometotheapp"))
{% endhighlight %}
{% endtab %}
{% endtabs %}

**3)** Display your SFSafariViewController with the Branch matching URL. You can display the view controller any way that works with your particular application.

**4)** Catch the appropriate delegate method for the redirect or the loading complete and tell Branch it can resume initialization. This will call the Branch servers and return your deep link data with `+match_guaranteed` set to true if the cookies matched.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
// Call this before initSession
[[Branch getInstance] resumeInit];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
// Call this before initSession
Branch.getInstance().resumeInit()
{% endhighlight %}
{% endtab %}
{% endtabs %}


## Configuring your Android app for 100% match from Chrome

Similar to iOS, 100% match is a bit of a misnomer since this method will only work if a user clicks via the Chrome browser. Other browsers such as Facebook and Twitter will not benefit from this method. We haven't pull the stats on usage like we do on iOS, but we'd assume it's similar to Safari (50-75% of clicks).

### Enable cookie matching

Add `compile 'com.android.support:customtabs:23.3.0'` to the dependencies section of your `build.gradle` file.

### Set the domain for cookie matching

Because our Chrome Tabs matching method works based on comparing the cookie Branch set on a click to the cookie set with the Chrome Tab, it's critical that the domain match the link being clicked. By default, we assume that your domain is on the `app.link` domain. If you want to override it, you must set the domain you want via a call to Branch like so:

{% highlight java %}
// call before calling getAutoInstance in the Application class
Branch.enableCookieBasedMatching("your.customdomain.com"); // or "bnc.lt" if you use that
Branch.getAutoInstance(this);
{% endhighlight %}

## Handling personally identifiable information

{% caution %}
Branch's matching algorithm has not been designed to function as a security solution. We recommend against relying exclusively on Branch deep linking for authentication or authorization, and we advise against embedding sensitive or personally-identifiable information in Branch links.
{% endcaution %}

Our advice is to ensure that users are not able to abuse your system if they are deep linked incorrectly to your app. Examples of use cases to avoid are:

1. Automatically logging users into your app by including usernames and passwords in Branch links.
1. Deep linking users to items they have purchased, or allowing them to change the state of their order without having them log into your app first.
1. Deep linking to explicit content.

In the event that you choose to move forward with a usecase that does include sensitive information in your Branch links, you should check for the `+match_guaranteed: true` key-value pair in your initial Branch session callback, prior to routing to the deep linked content. Matching methods that provide `+match_guaranteed: true` are discussed in the [Methods with 100% match accuracy]({{base.url}}/getting-started/matching-accuracy/overview/#methods-with-100-match-accuracy) section above. Methods that return `+match_guaranteed: false` is discussed in [Methods without 100% match accuracy]({{base.url}}/getting-started/matching-accuracy/overview/#methods-without-100-match-accuracy).

{% endif %}
