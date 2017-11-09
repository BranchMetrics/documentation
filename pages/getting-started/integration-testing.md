---
type: recipe
directory: getting-started
title: Integration Testing
page_title: Testing your Branch deep link integration
ios_description: Learn how to test your iOS Branch integration, debug individual deep links and simulate fresh app installs. Plus some advice on fraud protection.
android_description: Learn how to test your Android Branch integration, debug individual deep links and simulate fresh app installs. Also, some advice on fraud protection.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Testing, integration, debugging, fraud protection, setDebug
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Testing, integration, debugging, fraud protection, setDebug
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
contents: list
redirect: https://docs.branch.io/pages/apps/ios/#simulate-an-install
---

Testing Branch functionality can be challenging. Many functions require two parties to complete, and some tests can inadvertently affect your analytics data. Here are a few workarounds to help you test Branch features to your satisfaction.


## The Test sandbox environment

Branch maintains both a **Live** environment and a **Test** sandbox for every app. You can think of these as separate apps in the Branch system that are simply available from the same Dashboard for convenience. There is no data crossover between the **Live** environment and the **Test** sandbox, both offer identical configuration options, and you use different Branch keys to access each one. Links respect the configuration settings of the Branch key under which they are created.

### Link domains

- Links created with your **Live** key will begin with `XXXX.app.link`
- Links created with your **Test** key will begin with `XXXX.test-app.link`

{% if page.ios %}

{% protip title="Universal Links in the Test environment" %}
To enable Universal Link behavior for links created with your **Test** key, you need to add the following Associated Domains entries:

- `applinks:xxxx.test-app.link`
- `applinks:xxxx-alternate.test-app.link`

[See here]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.
{% endprotip %}

{% elsif page.android %}

{% protip title="App Links in the Test environment" %}
To enable App Links behavior for links created with your **Test** key, you need to add the following Intent Filter tag to your Activity definition:

- `<data android:scheme="https" android:host="xxxx.test-app.link" />`

[See here]({{base.url}}/getting-started/universal-app-links/guide/android/#add-intent-filter-to-manifest) for more detailed instructions.
{% endprotip %}

{% elsif page.cordova %}

{% protip title="Universal & App Links in the Test environment" %}
To enable Universal Link and App Link behavior for links created with your **Test** key, you need to add the following keys to your `config.xml` file:

- `<host name="xxxx.app.link" scheme="https" />`
- `<host name="xxxx-alternate.app.link" scheme="https" />`

[See here]({{base.url}}/getting-started/universal-app-links/guide/cordova/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.

{% endprotip %}

{% elsif page.xamarin %}

{% protip title="Universal & App Links in the Test environment" %}
To enable Universal Link behavior for links created with your **Test** key, you need to add the following Associated Domains entries:

- `applinks:xxxx.test-app.link`
- `applinks:xxxx-alternate.test-app.link`

[See here]({{base.url}}/getting-started/universal-app-links/guide/xamarin/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.

To enable App Links behavior for links created with your **Test** key, you need to add the following Intent Filter tag to your Activity definition:

{% highlight c# %}
[IntentFilter(new [] { Android.Content.Intent.ActionView },
    DataScheme="https",
    DataHost="xxxx.test-app.link",
    Categories=new [] { Android.Content.Intent.CategoryDefault, Android.Content.Intent.CategoryBrowsable })]
{% endhighlight %}

[See here]({{base.url}}/getting-started/universal-app-links/guide/xamarin/#add-intent-filter-to-activity) for more detailed instructions.

{% endprotip %}

{% elsif page.unity %}

{% protip title="Universal & App Links in the Test environment" %}
To enable Universal Link behavior for links created with your **Test** key, you need to add the following Associated Domains entries:

- `applinks:xxxx.test-app.link`
- `applinks:xxxx-alternate.test-app.link`

[See here]({{base.url}}/getting-started/universal-app-links/guide/unity/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.

To enable App Links behavior for links created with your **Test** key, you need to add the following Intent Filter tag to your Activity definition:

- `<data android:scheme="https" android:host="xxxx.test-app.link" />`

[See here]({{base.url}}/getting-started/universal-app-links/guide/unity/#add-intent-filter-to-manifest) for more detailed instructions.

{% endprotip %}

{% elsif page.adobe %}

{% protip title="Universal & App Links in the Test environment" %}
To enable Universal Link behavior for links created with your **Test** key, you need to add the following Associated Domains entries:

- `applinks:xxxx.test-app.link`
- `applinks:xxxx-alternate.test-app.link`

[See here]({{base.url}}/getting-started/universal-app-links/guide/adobe/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.

To enable App Links behavior for links created with your **Test** key, you need to add the following Intent Filter tag to your Activity definition:

- `<data android:scheme="https" android:host="xxxx.test-app.link" />`

[See here]({{base.url}}/getting-started/universal-app-links/guide/adobe/#add-intent-filter-to-manifest) for more detailed instructions.

{% endprotip %}

{% elsif page.titanium %}

{% protip title="Universal & App Links in the Test environment" %}
To enable Universal Link behavior for links created with your **Test** key, you need to add the following keys to your `Entitlements.plist` file:

- `<string>applinks:xxxx.app.link</string>`
- `<string>applinks:xxxx-alternate.app.link</string>`

[See here]({{base.url}}/getting-started/universal-app-links/guide/titanium/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.

To enable App Links behavior for links created with your **Test** key, you need to add the following Intent Filter tag to your Activity definition:

- `<data android:scheme="https" android:host="xxxx.test-app.link" />`

[See here]({{base.url}}/getting-started/universal-app-links/guide/unity/#add-intent-filter-to-manifest) for more detailed instructions.

{% endprotip %}

{% elsif page.react %}

{% protip title="Universal & App Links in the Test environment" %}
To enable Universal Link behavior for links created with your **Test** key, you need to add the following Associated Domains entries:

- `applinks:xxxx.test-app.link`
- `applinks:xxxx-alternate.test-app.link`

[See here]({{base.url}}/getting-started/universal-app-links/guide/adobe/#add-the-associated-domains-entitlement-to-your-project) for more detailed instructions.

To enable App Links behavior for links created with your **Test** key, you need to add the following Intent Filter tag to your Activity definition:

- `<data android:scheme="https" android:host="xxxx.test-app.link" />`

[See here]({{base.url}}/getting-started/universal-app-links/guide/adobe/#add-intent-filter-to-manifest) for more detailed instructions.

{% endprotip %}

{% endif %}

### Switching environments on the dashboard

Toggling between these two modes on the Branch dashboard is simple:

{% image src="/img/pages/getting-started/integration-testing/dashboard-test-mode.png" actual center alt="environment toggle" %}

{% caution title="Configuring the Test App" %}
Since the **Test** and **Live** environments are completely separate, you will need check that your [Settings](https://dashboard.branch.io/#/settings)
(especially your [Link Settings](http://dashboard.branch.io/#/settings/link)) are properly configured.
{% endcaution %}

### Switching environments in your app

Using the **Test** environment in your app is easy:

{% if page.cordova %}

1. Go to [Settings](https://dashboard.branch.io/#/settings)
1. Make sure the toggle switch is in "Test" mode
1. Grab the Branch Key (it will start with `key_test_`).
1. Rerun the [plugin installation command]({{base.url}}/getting-started/sdk-integration-guide/guide/cordova/#command-line-module-install):
	- For the `BRANCH_KEY` value, use the test environment key you just retrieved from the dashboard.
	- Use the same URI scheme as when you originally installed the plugin.

Here is an example of the full plugin installation command:

{% tabs %}
{% tab cordova %}
{% highlight sh %}
cordova plugin install https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_test_xxxxxxxxxxxxxxx --variable URI_SCHEME=yourapp
{% endhighlight %}

{% endtab %}

{% tab phonegap %}
{% highlight sh %}
phonegap plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_test_xxxxxxxxxxxxxxx --variable URI_SCHEME=yourapp
{% endhighlight %}

{% endtab %}

{% tab npm %}
{% highlight sh %}
npm install branch-cordova-sdk --variable BRANCH_KEY=key_test_xxxxxxxxxxxxxxx --variable URI_SCHEME=yourapp
{% endhighlight %}

{% endtab %}
{% endtabs %}

{% protip title="App Links and the Test Environment" %}
Your **live** and **test** environments have different four-digit link prefixes. If you have enabled App Links in the Android version of your app, and want them to function for links created in your test environment, you need to [replace the link prefix]({{base.url}}/getting-started/universal-app-links/guide/cordova/#configure-project) from your live environment with the one from your test environment in your `config.xml` file.
{% endprotip %}

{% else %}

1. Go to [Settings](https://dashboard.branch.io/#/settings)
1. Make sure the toggle switch is in "Test" mode
1. Grab the Branch Key (it will start with `key_test_`).
1. Simply replace the **Live** key in your app with this one (but be sure to switch it back before release!)

{% if page.ios %}
<!-- do nothing -->
{% elsif page.android %}
{% protip title="App Links and the Test Environment" %}
Your **live** and **test** environments have different four-digit link prefixes. If you have enabled App Links and want them to function for links created in your test environment, you need to [add the link prefix]({{base.url}}/getting-started/universal-app-links/guide/android/#add-intent-filter-to-manifest) for your test environment to your `AndroidManifest.xml` file.
{% endprotip %}
{% else %}
{% protip title="App Links and the Test Environment" %}
Your **live** and **test** environments have different four-digit link prefixes. If you have enabled App Links in the Android version of your app, and want them to function for links created in your test environment, you need to [add the link prefix]({{base.url}}/getting-started/universal-app-links/guide/android/#add-intent-filter-to-manifest) for your test environment to your `AndroidManifest.xml` file.
{% endprotip %}
{% endif %}
{% endif %}

{% if page.unity or page.cordova %}
<!-- do nothing -->
{% else %}
### Specifying both Test and Live keys in your app

For more advanced implementations, you may want to specify keys for both **Test** and **Live** environments (for example, if you are building a custom switch to automatically select the correct key depending on compiler schemes).

{% if page.ios %}

Open your **Info.plist** file in Xcode, change the `branch_key` entry to a Dictionary, and create two subentries for your keys:

{% image src="/img/pages/getting-started/integration-testing/branch-multi-key-plist.png" actual center alt="environment toggle" %}

To use your test key with Branch, set the `Branch.useTestBranchKey` class variable to `YES` before initializing Branch, as shown below:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[Branch setUseTestBranchKey:YES];
Branch *branch = [Branch getInstance];
[branch initSession.....
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.useTestBranchKey = true
let branch: Branch = Branch.getInstance()
branch.initSession.....
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
{% if page.android %}

In your Manifest file, find:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey" android:value="your_live_key" />
{% endhighlight %}

and underneath it add:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey.test" android:value="your_test_key" />
{% endhighlight %}

{% endif %}
{% if page.xamarin or page.react %}

#### iOS Projects

Open your **Info.plist** file in Xcode, change the `branch_key` entry a Dictionary, and create two subentries for your keys:

{% image src="/img/pages/getting-started/integration-testing/branch-multi-key-plist.png" actual center alt="environment toggle" %}

#### Android Projects

In your Manifest file, find:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey" android:value="your_live_key" />
{% endhighlight %}

and underneath it add:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey.test" android:value="your_test_key" />
{% endhighlight %}

{% endif %}
{% if page.adobe %}

#### iOS Projects

In your project's `*-app.xml` file, find:

{% highlight xml %}
<key>branch_key</key>
<string>your_live_key</string>
{% endhighlight %}

and replace it with:

{% highlight xml %}
<key>branch_key</key>
<dict>
	<key>live</key>
	<string>your_live_key</string>
	<key>test</key>
	<string>your_test_key</string>
</dict>
{% endhighlight %}

#### Android Projects

In your project's `*-app.xml` file, find:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey" android:value="your_live_key" />
{% endhighlight %}

and underneath it add:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey.test" android:value="your_test_key" />
{% endhighlight %}

{% endif %}
{% if page.titanium %}

#### iOS Projects

In your project's `tiapp.xml` file, find:

{% highlight xml %}
<key>branch_key</key>
<string>your_live_key</string>
{% endhighlight %}

and replace it with:

{% highlight xml %}
<key>branch_key</key>
<dict>
	<key>live</key>
	<string>your_live_key</string>
	<key>test</key>
	<string>your_test_key</string>
</dict>
{% endhighlight %}

#### Android Projects

In your project's `tiapp.xml` file, find:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey" android:value="your_live_key" />
{% endhighlight %}

and underneath it add:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.BranchKey.test" android:value="your_test_key" />
{% endhighlight %}

{% endif %}
{% endif %}

## Debugging an individual link

At any time after you create a link, you can see all the information about the that link by appending `?debug=1`. Make sure you are logged into the dashboard, are on the correct app, and that the proper **Live** or **Test** environment is selected. The link debugger allows you to select a platform and browser, and see what will happen on link click. The debugger will also show you all of the data associated with that specific link.

{% image src='/img/pages/getting-started/integration-testing/question_mark_debug.png' center alt='dashboard debug' %}

## Use debug mode to simulate fresh installs

{% if page.adobe %}
Debug mode is currently not supported on Air ANE :(
{% else %}

Branch intentionally adds a lot of restrictions to prevent `install` events from being triggered on app updates and reinstalls. Of course this can make it a challenge to simulate fresh installs while testing, so we have created a debug mode to help you manually override these restrictions.

{% if page.android or page.ios %}
<!-- do nothing -->
{% else %}
{% protip title="Debug mode and the Test Environment" %}
If you have [configured your app with both **test** and **live** keys](#switching-environments-in-your-app), using `setDebug` will *also* cause all links created in the iOS version of your app to use your **test** environment.

*The Android version of your app will continue to use the* ***live*** *environment*.
{% endprotip %}
{% endif %}

{% if page.ios %}

{% tabs %}
{% tab objective-c %}

To enable this mode in your test builds, add a `setDebug` call to your **AppDelegate.m** file after you create the Branch singleton, but *before* you call `initSession`. Your code will end up looking something like this:

{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch setDebug];
[branch initSession.....
{% endhighlight %}
{% endtab %}
{% tab swift %}

To enable this mode in your test builds, add a `setDebug` call to your **AppDelegate.swift** file after you create the Branch singleton, but *before* you call `initSession`. Your code will end up looking something like this:

{% highlight swift %}
let branch: Branch = Branch.getInstance()
branch.setDebug()
branch.initSession.....
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android %}
To enable this mode in your test builds, add the following `<meta-data>` tag to your Manifest file, near where you added your Branch key. Your code will end up looking something like this:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
<meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_abc123" />
{% endhighlight %}
{% endif %}

{% if page.cordova %}
To enable this mode in your test builds, add a `setDebug()` call *before* you call `initSession()`. Your code will end up looking something like this:

{% highlight js %}
Branch.setDebug(true);
Branch.initSession();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}

The process is different depending on whether you are using Xamarin Forms or not. Please make sure to follow the correct instructions!

{% tabs %}
{% tab forms %}

#### Xamarin Forms Projects

To enable this mode in your test builds, add a `.Debug` call to the `App` class in your **App.cs** file *before* you call `InitSessionAsync`.  Your code will end up looking something like this:

{% highlight c# %}
public class App : Application, IBranchSessionInterface
{
    protected override void OnResume ()
    {
        Branch branch = Branch.GetInstance ();
        Branch.Debug = true;
        branch.InitSessionAsync (this);
    }
}
{% endhighlight %}

{% endtab %}
{% tab non-forms %}

#### Android Projects

To enable this mode in your test builds, add a `.Debug` call to your `OnCreate` method *before* you call `Init`.  Your code will end up looking something like this:

{% highlight c# %}
protected override void OnCreate (Bundle savedInstanceState)
{
    base.OnCreate (savedInstanceState);

    BranchAndroid.GetInstance().Debug = true;
    BranchAndroid.Init (this, "branch_key", Intent.Data);
}
{% endhighlight %}

#### iOS Projects

To enable this mode in your test builds, add a `.Debug` call to your `FinishedLaunching` method *before* you call `Init`.  Your code will end up looking something like this:

{% highlight c# %}
public override bool FinishedLaunching (UIApplication uiApplication, NSDictionary launchOptions)
{
    NSUrl url = null;
    if ((launchOptions != null) && launchOptions.ContainsKey(UIApplication.LaunchOptionsUrlKey)) {
        url = (NSUrl)launchOptions.ValueForKey (UIApplication.LaunchOptionsUrlKey);
    }

    BranchIOS.GetInstance().Debug = true;
    BranchIOS.Init ("branch_key", url, true);
}

{% endhighlight %}

{% endtab %}
{% endtabs %}

{% endif %}

{% if page.unity %}

To enable this mode in your test builds, add a `setDebug()` call function *before* you call `initSession()`. Your code will end up looking something like this:

{% highlight c# %}
public class MyCoolBehaviorScript : MonoBehaviour {
    void Start () {
        Branch.setDebug();
        Branch.initSession(CallbackWithParams);
    }
}
{% endhighlight %}
{% endif %}

{% if page.titanium %}

To enable this mode in your test builds, add a `setDebug()` call function *before* you call `initSession()`. Your code will end up looking something like this:

{% highlight js %}
$.initialize = function(params) {
    $.window.open();

    $.initializeViews();
    $.initializeHandlers();

    Ti.API.info("start initSession");
    branch.setDebug(true);
    branch.initSession();
    branch.addEventListener("bio:initSession", $.onInitSessionFinished);

    if (OS_ANDROID) {
        Ti.Android.currentActivity.addEventListener("newintent", function(e) {
            Ti.API.info("inside newintent: " + e);
            $.window.open();
            branch.initSession();
        });
    }
};
{% endhighlight %}
{% endif %}

{% if page.react %}

To enable this mode in your test builds, add a `setDebug()` call function. Your code will end up looking something like this:

{% highlight js %}
import branch from 'react-native-branch'

// Subscribe to incoming links (both branch & non-branch)
branch.subscribe(({params, error, uri}) => {
  if (params) { /* handle branch link */ }
  else { /* handle uri */ }
})

branch.setDebug();
{% endhighlight %}
{% endif %}

{% caution title="Disable debug mode before release!" %}
Make sure to disable debug mode before releasing your app. You can do this simply by removing the code you added{%if page.ios %}.{% else %} or by setting its value to `false`.{% endif %}
{% endcaution %}

After debug mode is enabled, do the following steps to verify your new installs are being tracked as expected:

1. Uninstall your app from your device
1. On your device, open any Branch link
1. Re-install your app
1. Confirm an install event occurs by looking through the SDK's session initialization callbacks

{% endif %}
