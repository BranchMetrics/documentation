---
type: recipe
directory: getting-started
title: 2. Universal and App Links
page_title: "Set up Universal & App Links with Branch"
description: "Learn how to enable iOS Universal Links and Android App Links with Branch deep links for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
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
- ios_imessage
sections:
- overview
- guide
- advanced
- support
redirect: https://docs.branch.io/pages/deep-linking/universal-links/
---

{% if page.overview %}

iOS Universal Links and Android App Links both route directly to your app when opened, bypassing the web browser and URI scheme combination typically used for the redirection process. App Links were introduced with Android M, and enabling them results in a more seamless experience for your users. Universal Links were introduced with iOS 9, and became the only fully-functional deep linking option on iOS after [Apple stopped supporting URI schemes for deep linking in iOS 9.2](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links).

{% caution title="Universal Links are critical on iOS!" %}
You must enable Universal Links before Branch can function correctly on iOS 9.2+ but note that pure iMessage apps don't support Universal Links.
{% endcaution %}

Branch makes it simple to enable Universal Links and App Links, and even improves on them since you also get all the other benefits of Branch links when the visitor does not yet have your app installed:

{% image src='/img/pages/getting-started/universal-app-links/how_branch_improves.png' 3-quarters center alt='branch improves universal links' %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% if page.xamarin %}

For Xamarin, we're trying something new where our docs will live in the [README of Github](https://github.com/BranchMetrics/xamarin-branch-deep-linking). Please visit this URL to integrate the service.

{% else %}

{% if page.ios_imessage %}

**Universal Links are not supported by iOS iMessage apps unfortunately!**

{% endif %}

{% if page.android or page.mparticle_android or page.ios_imessage %}
<!-- do nothing -->
{% else %}

## Enable Universal Links on the Branch dashboard

1. Navigate to [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch Dashboard.
1. Check the box to `Enable Universal Links` from iOS redirects.
1. Type in your App’s Bundle Identifier.
{% if page.unity %}
{% protip title="Looking for the Bundle Identifier in Unity?" %}
- Click on Edit
- Scroll down to Project Settings
- Click on Player
- Find the Bundle Identifier on the Inspector Panel
{% image src='/img/pages/getting-started/universal-app-links/branch-universal-links-unity.png' 3-quarters center alt='unity bundle identifier location' %}
{% endprotip %}
{% protip title="Looking for the Package name your Android app in Unity" %}
The package name for your Android app in Unity is the same as the Bundle Identifier
{% endprotip %}
{% endif %}
1. Type in your Apple App Prefix (found by clicking your app on [this page](https://developer.apple.com/account/ios/identifier/bundle) in Apple's Developer Portal).
1. Scroll down and click on the `Save` button.

{% image src='/img/pages/getting-started/universal-app-links/dashboard_enable_universal_links.png' 3-quarters center alt='enable Universal Links on Branch dashboard' %}

## Add the Associated Domains entitlement to your project

{% if page.ios or page.unity or page.adobe or page.react or page.mparticle_ios %}
### Enable Associated Domains in Xcode

1. Go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains`. {% image src='/img/pages/getting-started/universal-app-links/enable_ass_domains.png' 3-quarters center alt='enable xcode associated domains' %}

{% protip title="If you see an error after this step" %}

{% image src='/img/pages/getting-started/universal-app-links/enable_ass_domains_error.png' 3-quarters center alt='xcode associated domains errors' %}

Please ensure...

- The right team selected for your Xcode project.
- The Bundle Identifier of your Xcode project matches the one used to register the App Identifier with Apple.
{% endprotip %}

### Add your Branch link domains

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name.{% image src='/img/pages/getting-started/universal-app-links/subdomain-setting.png' full center alt='retrieving the default link subdomain' %}
1. In the `Domains` section, click the `+` icon and add the following entries: (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself)
   * `applinks:xxxx.app.link`
   * `applinks:xxxx-alternate.app.link`
   * `applinks:xxxx.test-app.link`
   * `applinks:xxxx-alternate.test-app.link`

{% image src='/img/pages/getting-started/universal-app-links/add_domain.png' 3-quarters center alt='xcode add domain' %}

{% caution title="Support for legacy links" %}
If the **Default domain name** box shows the legacy `bnc.lt` domain, you should use the following entry instead: `applinks:bnc.lt`
{% endcaution %}

{% protip title="Using a custom domain or subdomain?" %}
If you use a [custom domain or subdomain for your Branch links]({{base.url}}/getting-started/link-domain-subdomain/guide/#setting-a-custom-link-domain), you should instead add entries for `applinks:[mycustomdomainorsubdomain]` and `XXXX-alternate.app.link`. If you're unsure of your Branch-assigned app.link subdomain, contact integrations@branch.io, and we can provide it.
{% endprotip %}

{% endif %}

{% if page.cordova %}

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name.{% image src='/img/pages/getting-started/universal-app-links/subdomain-setting.png' full center alt='retrieving the default link subdomain' %}
1. Add the following entry to your application's `config.xml` (replace the `xxxx` with values from your [Branch Settings Dashboard](https://dashboard.branch.io/settings/link))

{% highlight xml %}
<!-- sample config.xml -->
<widget id="xxxx" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
  <branch-config>
    <ios-team-id value="xxxx"/>
    <host name="xxxx.app.link" scheme="https" />
    <host name="xxxx-alternate.app.link" scheme="https" />
    <host name="xxxx.test-app.link" scheme="https" />
    <host name="xxxx-alternate.test-app.link" scheme="https" />
  </branch-config>
  <preference name="AndroidLaunchMode" value="singleInstance" />
{% endhighlight %}

{% caution title="Support for legacy links" %}
If the **Default domain name** box shows the legacy `bnc.lt` domain, you should use the following entry instead:

{% highlight xml %}
<branch-config>
    <ios-team-id value="your_ios_team_id" />
    <host name="bnc.lt" scheme="https" />
</branch-config>
{% endhighlight %}

{% endcaution %}

{% protip title="Notes" %}
- You can get your **iOS Team ID** from the Your Account page on the [Apple Developer Portal](https://developer.apple.com/membercenter/index.action#accountSummary).
- If you use a custom domain or subdomain for your Branch links, you should also add a key for:

{% highlight xml %}
<host name="mycustomdomainorsubdomain" scheme="https" />
{% endhighlight %}

{% endprotip %}

{% endif %}


{% if page.titanium %}

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name.{% image src='/img/pages/getting-started/universal-app-links/subdomain-setting.png' full center alt='retrieving the default link subdomain' %}
1. Create a new file named `Entitlements.plist` in the same directory as your Titanium app's `tiapp.xml`
1. Insert the following snippet (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself)

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.developer.associated-domains</key>
    <array>
        <string>applinks:xxxx.app.link</string>
        <string>applinks:xxxx-alternate.app.link</string>
        <string>applinks:xxxx.test-app.link</string>
        <string>applinks:xxxx-alternate.test-app.link</string>
    </array>
</dict>
</plist>
{% endhighlight %}

{% caution title="Support for legacy links" %}
If the **Default domain name** box shows the legacy `bnc.lt` domain, you should use the following entry instead: `<string>applinks:bnc.lt</string>`
{% endcaution %}

{% protip title="Using a custom domain or subdomain?" %}
If you use a [custom domain or subdomain for your Branch links]({{base.url}}/getting-started/link-domain-subdomain/guide/#setting-a-custom-link-domain), you should also add a key for `<string>[mycustomdomainorsubdomain]</string>`.
{% endprotip %}

#### Support Universal Links on Cold Start

Due to some certain limitations (at the time of writing), the module will not be able to handle data when clicking Universal Links while the app is not running at all. To solve this issue, you have to implement a listener to the 'continueactivity' on your Titanium app, retrieve the parameters and pass it to the module's `continueUserActivity` method. You can see an example of how this is implemented in [our testbed code](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK/blob/master/testbed/app/controllers/index.js#L86).

To implement, first add an entry to `NSUserActivityTypes` in your plist file.

{% highlight xml %}
<plist>
  <dict>
    ....
    <key>NSUserActivityTypes</key>
    <array>
      <string>io.branch.testbed.universalLink</string> // This is only a sample. Use reverse domain.
    </array>
  </dict>
</plist>
{% endhighlight %}

Now, before you call initSession, create a User Activity with the same name as you registered above and then add a listener to the event `continueactivity`. Note that the Universal Link data will be available in the initSession callback - this mechanism is just to work around a Titanium deficiency.

{% highlight js %}
if (OS_IOS) { // Don't forget this condition.
    var activity = Ti.App.iOS.createUserActivity({
        activityType:'io.branch.testbed.universalLink'
    });

    activity.becomeCurrent();

    Ti.App.iOS.addEventListener('continueactivity', function(e) {
        if (e.activityType === 'io.branch.testbed.universalLink') {
            branch.continueUserActivity(e.activityType, e.webpageURL, e.userInfo);
        }
    });
}
{% endhighlight %}

{% endif %}

{% if page.ios or page.react or page.mparticle_ios %}
## Make your app aware of incoming Universal Links
{% endif %}

{% if page.ios %}

{% tabs %}
{% tab objective-c %}

Open your **AppDelegate.m** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];

    return handledByBranch;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}

Open your **AppDelegate.swift** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight swift %}
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
    // pass the url to the handle deep link call
    return Branch.getInstance().continue(userActivity);
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% caution title="Issues with Facebook SDK" %}

In certain situations, the Facebook SDK can cause `application:didFinishLaunchingWithOptions:` to return `NO`. When this happens, handling for all Universal Links is blocked. Please ensure that `application:didFinishLaunchingWithOptions:` always returns `YES`/`true`.

Previously we included a method in our SDK, `accountForFacebookSDKPreventingAppLaunch`, that handled this edge case. However, due to Swift+Objective-C interoperability issues, this has been removed.

{% endcaution %}

{% endif %}

{% if page.xamarin %}

<!--Moved to Github README-->

{% endif %}
{% if page.unity %}

<!--Does this step occur on Unity?-->

{% endif %}
{% if page.adobe %}

<!--Does this step occur on Air ANE?-->

{% endif %}
{% if page.titanium %}

<!--Does this step occur on Titanium?-->

{% endif %}

{% if page.react %}

Open your **AppDelegate.m** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  return [RNBranch continueUserActivity:userActivity];
}
{% endhighlight %}

{% endif %}

{% if page.mparticle_ios %}
{% tabs %}
{% tab objective-c %}
Open your **AppDelegate.m** file and add the following methods (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), these are likely already present).

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    [self checkForDeeplink];
    return YES;
}

- (void)checkForDeeplink {
    MParticle * mParticle = [MParticle sharedInstance];

    [mParticle checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
        //
        // A few typical scenarios where this block would be invoked:
        //
        // (1) Base case:
        //     - User does not tap on a link, and then opens the app (either after a fresh install or not)
        //     - This block will be invoked with Branch Metrics' response indicating that this user did not tap on a link
        //
        // (2) Deferred deep link:
        //     - User without the app installed taps on a link
        //     - User is redirected from Branch Metrics to the App Store and installs the app
        //     - User opens the app
        //     - This block will be invoked with Branch Metrics' response containing the details of the link
        //
        // (3) Deep link with app installed:
        //     - User with the app already installed taps on a link
        //     - Application opens via openUrl/continueUserActivity, mParticle forwards launch options etc to Branch
        //     - This block will be invoked with Branch Metrics' response containing the details of the link
        //
        // If the user navigates away from the app without killing it, this block could be invoked several times:
        // once for the initial launch, and then again each time the user taps on a link to re-open the app.

        if (params) {
            //Insert custom logic to inspect the params and route the user/customize the experience.
            NSLog(@"params: %@", params.description);
        }
    }];
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
Open your **AppDelegate.swift** file and add the following methods (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), these are likely already present).

{% highlight swift %}
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
    checkForDeeplink()
    return true
}

func checkForDeeplink() {
    MParticle.sharedInstance().checkForDeferredDeepLink { linkInfo, error in
        // A few typical scenarios where this block would be invoked:
        //
        // (1) Base case:
        //     - User does not tap on a link, and then opens the app (either after a fresh install or not)
        //     - This block will be invoked with Branch Metrics' response indicating that this user did not tap on a link
        //
        // (2) Deferred deep link:
        //     - User without the app installed taps on a link
        //     - User is redirected from Branch Metrics to the App Store and installs the app
        //     - User opens the app
        //     - This block will be invoked with Branch Metrics' response containing the details of the link
        //
        // (3) Deep link with app installed:
        //     - User with the app already installed taps on a link
        //     - Application opens via openUrl/continueUserActivity, mParticle forwards launch options etc to Branch
        //     - This block will be invoked with Branch Metrics' response containing the details of the link
        //
        // If the user navigates away from the app without killing it, this block could be invoked several times:
        // once for the initial launch, and then again each time the user taps on a link to re-open the app.

        guard let linkInfo = linkInfo else { return }

        print("params:" + linkInfo)
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

## Test your Universal Links implementation

After completing this guide and installing a new build of your app on your testing device, you can verify Universal Links are working correctly by following these steps:

1. [Create a new Quick Link](https://dashboard.branch.io/#/marketing/new) on the Branch dashboard. Leave all configuration items at their default options.
1. Open this link on your testing device via Messages, Mail, Notes, or one of the other apps listed as **works** on [this page]({{base.url}}/getting-started/universal-app-links/support/#appsbrowsers-that-support-universal-links).
1. If successful, your app should launch immediately without routing through Safari. If not, please check the [Troubleshooting section]({{base.url}}/getting-started/universal-app-links/support/#troubleshooting-universal-links).

{% endif %}

{% if page.ios or page.mparticle_ios or page.ios_imessage %}
<!-- do nothing -->
{% else %}

## Generate signing certificate fingerprint

{% if page.android or page.mparticle_android %}

{% else %}
{% protip %}
The following steps are only required if you wish you enable Android App Links.
{% endprotip %}
{% endif %}

Start by generating a SHA256 fingerprint of your app's signing certificate. This is the file that you use to build the debug and production version of your APK file before deploying it.

1. Navigate to your keystore file.
1. Run this command on it to generate the fingerprint: `keytool -list -v -keystore my-release-key.keystore`
1. You'll see a value like `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5` come out the other end. Copy this.

## Enable App Links on the Branch dashboard

1. Head to the [Link Settings page](https://dashboard.branch.io/#/settings/link) on the Branch dashboard.
1. Toggle the **Enable App Links** checkbox in the Android section.
1. Paste the copied fingerprint value into the **SHA256 Cert Fingerprints** field that appears. {% image src='/img/pages/getting-started/universal-app-links/enable_app_links.png' full center alt='enable app links' %}
1. Scroll down and click `Save`.

{% protip title="Using multiple fingerprints" %}
You can insert both your debug and production fingerprints for testing. Simply separate them with a comma.
{% endprotip %}

{% if page.cordova %}

## Configure project

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name.{% image src='/img/pages/getting-started/universal-app-links/subdomain-setting.png' full center alt='retrieving the default link subdomain' %}
1. Add the following entry to your application's `config.xml` (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself)

{% highlight xml %}
<branch-config>
    <host name="xxxx.app.link" scheme="https" />
    <host name="xxxx-alternate.app.link" scheme="https" />
    <host name="xxxx.test-app.link" scheme="https" />
    <host name="xxxx-alternate.test-app.link" scheme="https" />
</branch-config>
{% endhighlight %}

{% caution title="Support for legacy links" %}
If the **Default domain name** box shows the legacy `bnc.lt` domain, you should use the following entry instead:

{% highlight xml %}
<branch-config>
    <android-prefix value="READ_FROM_DASHBOARD" />
    <host name="bnc.lt" scheme="https" />
</branch-config>
{% endhighlight %}

`READ_FROM_DASHBOARD` is the four-character value in front of all your links. You can find it underneath the field labeled **SHA256 Cert Fingerprints** on the dashboard. It will look something like this: `/WSuf` (the initial `/` character should be included).

{% image src='/img/pages/getting-started/universal-app-links/app_links_prefix.png' full center alt='app links prefix' %}

{% endcaution %}

{% protip title="Notes" %}
- If you enabled iOS Universal Links, some of these keys will already exist and should not be entered again.
- If you use a custom domain or subdomain for your Branch links, you should also add a key for:

{% highlight xml %}
<android-prefix value="READ_FROM_DASHBOARD" />
<host name="mycustomdomainorsubdomain" scheme="https" />
{% endhighlight %}
{% endprotip %}

{% elsif page.xamarin %}

<!-- Moved to Github README -->

{% else %}

{% if page.unity %}

## Add Intent Filter to Manifest (if not using Prefab)

{% else %}

## Add Intent Filter to Manifest

{% endif %}

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name.{% image src='/img/pages/getting-started/universal-app-links/subdomain-setting.png' full center alt='retrieving the default link subdomain' %}
1. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from (and likely the same one you selected in the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide)).
1. Inside your `AndroidManifest.xml`, locate where the selected `Activity` is defined.
1. Within the `Activity` definition, insert the intent filter provided below (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself). Be sure to add this as its own separate intent filter.

{% highlight xml %}
<!-- AppLink example -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="xxxx.app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.app.link" />
    <data android:scheme="https" android:host="xxxx.test-app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.test-app.link" />
</intent-filter>
{% endhighlight %}

{% caution title="Support for legacy links" %}
If the **Default domain name** box shows the legacy `bnc.lt` domain, you should use the following entry instead:

{% highlight xml %}
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="READ_FROM_DASHBOARD" />
</intent-filter>
{% endhighlight %}

`READ_FROM_DASHBOARD` is the four-character value in front of all your links. You can find it underneath the field labeled **SHA256 Cert Fingerprints** on the dashboard. It will look something like this: `/WSuf` (the initial `/` character should be included).

{% image src='/img/pages/getting-started/universal-app-links/app_links_prefix.png' full center alt='app links prefix' %}

{% endcaution %}

{% protip title="Using a custom domain or subdomain?" %}
If you use a [custom domain or subdomain for your Branch links]({{base.url}}/getting-started/link-domain-subdomain/guide/#setting-a-custom-link-domain), you should also add an entry for:

{% highlight xml %}
<data android:scheme="https" android:host="mycustomdomainorsubdomain" android:pathPrefix="READ_FROM_DASHBOARD" />
{% endhighlight %}

`READ_FROM_DASHBOARD` is the four-character value in front of all your links. You can find it underneath the field labeled **SHA256 Cert Fingerprints** on the dashboard. It will look something like this: `/WSuf` (the initial `/` character should be included).

{% image src='/img/pages/getting-started/universal-app-links/app_links_prefix.png' full center alt='app links prefix' %}

{% endprotip %}

{% endif %}

## Test your App Links implementation

After completing this guide and installing a new build of your app on your testing device, you can verify App Links are working correctly by following these steps:

1. [Create a new Quick Link](https://dashboard.branch.io/#/marketing/new) on the Branch dashboard. Leave all configuration items at their default options.
1. Open this link on your testing device.
1. If successful, your app should launch immediately without routing through the web browser, showing an **Open With...** dialog.

{% endif %}

## Next steps

Your Branch links are now configured to open your app in the most user-friendly way possible.

Here are some recommended next steps:

- **Learn about [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps)** — let your users share content and invite friends from inside your app.
- **Set up [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing)** — send incoming visitors directly to specific content in your app based on the Branch link they opened.

{% endif %}

{% elsif page.advanced %}

{% if page.android or page.mparticle_android %}
<!-- No advanced info except note on click-tracking -->
{% else %}

## Custom continueUserActivity configuration

When users enter your app via a Universal Link, we check to see to see if the link URL contains `bnc.lt`. If so, `handledByBranch` will return `YES`. If not, `handledByBranch` will return `NO`. This allows us to explicitly confirm the incoming link is from Branch without making a server call.

For most implementations this will never be an issue, since your deep links will be routed correctly either way. However, if you use a custom link domain *and* you rely on `handledByBranch` to return `YES` for every incoming Branch-generated Universal Link, you can inform the Branch SDK by following these steps:

1. In your **Info.plist** file, create a new key called `branch_universal_link_domains`.
1. Add your custom domain(s) as a string. {% image src='/img/pages/getting-started/universal-app-links/branch-universal-link-domain.png' 3-quarters center alt='cloudflare TLS' %}
1. Save the file.

{% protip title="Multiple custom domains" %}
If you have an unusual situation with multiple custom link domains, you may also configure `branch_universal_link_domains` as an array of strings. {% image src='/img/pages/getting-started/universal-app-links/branch-universal-link-domains.png' 3-quarters center alt='cloudflare TLS' %}
{% endprotip %}

## How to handle URI paths with Universal Links

Prior to iOS 9, URI schemes with URI paths (e.g., `myapp://path/to/content`) were the standard approach to deep linking. Branch supports URI paths using the **$deeplink_path**, **$ios_deeplink_path**, and **$android_deeplink_path** [link properties]({{base.url}}/getting-started/configuring-links/guide/#link-behavior-customization). When the Branch SDK receives a link with one of these parameters set (and assuming the platform is correct), it will automatically load that URI path.

Note, however, that Universal Links and Spotlight do not use URI schemes for deep link routing. If you populate **$deeplink_path** or **$ios_deeplink_path** with a URI path on iOS 9+, you will also need to introduce custom logic to ensure that your links work as expected in all situations.

To do this, add a `self.ignoreDeeplinkPath` conditional flag in `application:didFinishLaunchingWithOptions:launchOptions:` and handle these link separately.

### How to handle non-Universal Links (links relying on custom URI schemes)

When Branch links are used on iOS prior to version 9, and in some situations on later versions of iOS, the links do not act as Universal Links but instead rely on the app's custom URI scheme. While Universal links are handled by the AppDelegate's `application:continueUserActivity:restorationHandler:` function, the  `application:openURL:sourceApplication:annotation:` function is used to process non-Universal Links.

1. In `application:didFinishLaunchingWithOptions:launchOptions:`, set the `self.ignoreDeeplinkPath` conditional flag to `YES`. This will ensure that users do not get deep linked twice (once automatically by the Branch SDK and a second time via the logic you are about to add).
1. Look for the **$deeplink_path** or **$ios_deeplink_path** parameter in your link data use the value to route users to the correct place in your app

### How to handle Universal Links

Since the release of iOS 9, Branch links have functioned as Universal Links on iOS. Universal links are handled by the AppDelegate's `application:continueUserActivity:restorationHandler:` function.

1. The `self.ignoreDeeplinkPath` conditional flag in `application:didFinishLaunchingWithOptions:launchOptions:` defaults to `NO`.
1. Look for the **$deeplink_path** or **$ios_deeplink_path** parameter in your link data, and then use the path within to route users to the correct place in your app.

{% example title="Sample AppDelegate" %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}

Here is a generic **AppDeledate.m** snippet with these methods implemented:

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

Branch *branch = [Branch getInstance];

   [branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
      if (!error && params) {
         if (params[@"$deeplink_path"] && !self.ignoreDeeplinkPath) {
            NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"your-uri-scheme://%@", params[@"$deeplink_path"]]];
            // handle the URL!
            [self routeUrl:url];
         }
      }
      self.ignoreDeeplinkPath = NO;
   }];
   return YES;
}

// Entry point for users on iOS 8 and lower

-(BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [[Branch getInstance]
        application:application
            openURL:url
  sourceApplication:sourceApplication
         annotation:annotation];
   self.ignoreDeeplinkPath = YES;

   // ... your other logic here, such as ...
   [self routeUrl:url];

   return YES;
}

// Entry point for users on iOS 9+

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
   [[Branch getInstance] continueUserActivity:userActivity];

   // ... your other logic here, such as ...
   [self continueUserActivity:userActivity];

	return YES;
}
{% endhighlight %}

{% endtab %}
{% tab swift %}

{% highlight swift %}

Here is a generic **AppDeledate.swift** snippet with these methods implemented:


func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {

   let branch = Branch.getInstance()

   branch.initSessionWithLaunchOptions(launchOptions, andRegisterDeepLinkHandler: {(params: [NSObject : AnyObject], error: NSError) -> Void in
      if !error && params {
         if params["$deeplink_path"] && !self.ignoreDeeplinkPath {
            var url = NSURL(string: "your-uri-scheme://\(params["$deeplink_path"])")!
            // handle the URL!
            self.routeUrl(url)
         }
      }
      self.ignoreDeeplinkPath = false
   })
   return true
}

// Entry point for users on iOS 8 and lower

func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject) -> Bool {
   Branch.getInstance().application(application,
        open: url,
        sourceApplication: sourceApplication,
        annotation: annotation
   )
   self.ignoreDeeplinkPath = true

   // ... your other logic here, such as ...
   self.routeUrl(url)

   return true
}

// Entry point for users on iOS 9+

func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
   Branch.getInstance().continueUserActivity(userActivity)

   // ... your other logic here, such as ...
   self.continueUserActivity(userActivity)

   return true
}

{% endhighlight %}

{% endtab %}
{% endtabs %}

{% endexample %}

{% endif %}

{% ingredient disable-click-tracking %}{% endingredient %}

{% elsif page.support %}

{% if page.android or page.mparticle_android %}
No support information available for this platform.
{% else %}

## What happens to existing links?

### If your links use the legacy bnc.lt domain
Universal Links are of the form `https://bnc.lt/«four-letter-identifier»/«link-hash»`. Existing links created prior to enabling Universal Links are of the form `https://bnc.lt/m/«link-hash»` or `https://bnc.lt/l/«link-hash»` and will continue to function as non-Universal Links.

Aliased links on the bnc.lt domain (e.g., `bnc.lt/download`) are not compatible with Universal Links.

### If you use a custom domain or subdomain
Branch links with custom domains are always enabled for Universal Links, even if generated prior to when you enable the feature.

## Apps/browsers that support Universal Links

Unfortunately Universal Links don't work everywhere yet. We have compiled the Universal Links support status of some of the more popular apps.

#### Apps that always work

If you open a Universal Link in one of these apps, it should work correctly all the time.

| App/Browser | Status
| --- | ---
| Messages | works
| Mail | works
| WhatsApp | works
| Gmail | works
| Inbox | works

#### Apps limited by Apple

Apple has limited Universal Links in certain situations, apparently to avoid confusing users:

- Universal Links will not work if you paste the link into the browser URL field.
- Universal Links work with a user driven `<a href="...">` element click *across domains*. Example: if there is a Universal Link on google.com pointing to bnc.lt, it will open the app.
- Universal Links will not work with a user driven `<a href="...">` element click on the *same domain*. Example: if there is a Universal Link on google.com pointing to a different Universal Link on google.com, it will not open the app.
- Universal Links cannot be triggered via Javascript (in `window.onload` or via a `.click()` call on an `<a>` element), unless it is part of a user action.

| App/Browser | Status
| --- | ---
| Safari | works conditionally
| Chrome | works conditionally

#### Apps that work sometimes

Apps with built-in webviews (Google, Twitter, Facebook, Facebook Messenger, WeChat, etc.) work with Universal Links only when a webview is already open. In other words, Universal Links do not work in-app from the feed or main app views.

To work around this limitation, your links must have [deepviews]({{base.url}}/features/deepviews) or something similar enabled, with a call-to-action link/button that has a Universal Link behind it. This way, clicking a link from the app feed will open a webview containing your deepview page, and the user can then click the link/button to launch your app. All of Apple's limitations (in the section above) still apply for the deepview page.

| App/Browser | Status
| --- | ---
| Google | works conditionally
| Facebook | works conditionally
| Facebook Messenger | works conditionally
| WeChat | works conditionally
| Twitter | works conditionally
| LinkedIn | works conditionally
| Any app using `SFSafariViewController` | works conditionally

#### Apps with special cases

| App/Browser | Status
| --- | ---
| Slack | works if configured to open links in Safari. Otherwise, works conditionally as in the above section.


#### Apps that do not work

| App/Browser | Status
| --- | ---
| Pinterest | broken
| Instagram | broken
| Telegram | broken


## Links with custom labels/aliases

| Example | Link Domain/Subdomain | Link Alias | Universal Links Support |
| --- | --- | --- | --- |
| bnc.lt/oTLf/x7daC5fDzs | default | default | Yes |
| bnc.lt/app-download | default | custom | No |
| yourdomain.com/oTLf/x7daC5fDzs | custom | default | Yes |
| yourdomain.com/app-download | custom | custom | Yes |

### Using the bnc.lt domain

When a Universal Link is opened, iOS searches for any app on the device that has registered to handle that URL. Because the bnc.lt domain is used by hundreds of apps, Branch appends a unique four-letter identifer (i.e., `mGmA`) that ties links to the correct app. Links with custom labels/aliases (i.e., `bnc.lt/yourapp`) do not have this four-letter identifier, so these links are incompatible with Universal Links.

### Using a custom domain or subdomain

Custom domains and subdomains are unique to your app and not shared. All links on a custom domain or subdomain are compatible with Universal Links, including those with link labels/aliases (i.e., `yourdomain.com/yourapp`).

## Troubleshooting Universal Links

{% protip title="Automated Validation for Your Xcode Project" %}

You can check if your Xcode project is correctly configured by using our [Universal Links Validator](/getting-started/universal-linking-validator/).

{% endprotip %}


##### Are you testing by manually entering into Safari?
Universal Links don't work properly when entered into Safari. Use Notes or iMessage for testing.

##### Are you wrapping Branch links with another link and redirecting?
In most cases, Universal Links won't open the app when they are "wrapped" by click tracking links. Universal links, including Branch links, must be freestanding. If you want Universal Links to work in all situations, do not use other links that redirect to your Branch links.

##### Do your Team ID & Bundle ID match those on your dashboard?
You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to "Enable Universal Links." They should match your Team ID and Bundle ID. Team ID can be found here [https://developer.apple.com/membercenter/index.action#accountSummary](https://developer.apple.com/membercenter/index.action#accountSummary). Your Bundle ID is found in Xcode, in the `General` tab for the correct build target. If your Apple App Prefix is different from your Team ID, you should use your App Prefix. Your app prefix can be found from App IDs on Apple's Developer Portal.

##### Have you deleted the app and reinstalled it?
iOS does not re-scrape the apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the applinks entitlement, Universal Links will start working for them.)

##### Universal Links can be disabled, unfortunately.
If you are successfully taken into your app via a Universal Link, you'll see "bnc.lt" (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages (iOS 9 only due to iMessage revamp in 10) or Notes (iOS 10/9) and choose 'Open in <<App>>'.

##### Using a custom domain?
Make sure it's configured correctly. You can find configuration issues by using our [Universal Link Validator](http://branch.io/resources/aasa-validator/).

If you're using a custom subdomain, your CNAME should point to `custom.bnc.lt` under [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch dashboard.

The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

{% highlight js %}
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
{% endhighlight %}

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.

##### Using Facebook's SDK?
In certain situations, the Facebook SDK can cause `application:didFinishLaunchingWithOptions:` to return `NO`. When this happens, handling for all Universal Links is blocked. Please ensure that `application:didFinishLaunchingWithOptions:` always returns `YES`/`true`.

##### `bnc.lt` links with your Test Key?
Due to a change in iOS 9.3.1, Universal Links will not work on *Test* apps using the `bnc.lt` domain. We're working on resolving this. Please test Universal Links with your Live app, where they will work as expected. [Read more](http://status.branch.io/incidents/b0c19p6hpq58){:target="_blank"}.

## What changed in iOS 9 and 9.2?

Apple introduced Universal Links in iOS 9.0, as an alternative to the conventional method of JavaScript/URL-scheme link routing. Apple made it impossible to use JavaScript/URL-scheme routing beginning with iOS 9.2, leaving Universal Links as the only supported method.

We have published a number of resources that can help you understand the changes and how it impacts your app:

* How to Setup Universal Links to Deep Link on Apple iOS 9 - [Original Blog Release](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
* iOS 9.2 Update: [The Fall of URI Schemes](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links)
* iOS 9.2 Transition Guide - [Original Blog](https://blog.branch.io/ios-9.2-deep-linking-guide-transitioning-to-universal-links)
* Why You Should Use Branch for [Universal Links](https://blog.branch.io/why-you-should-use-branch-for-universal-links)

{% endif %}

{% endif %}
