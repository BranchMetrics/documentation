---
type: recipe
directory: getting-started
title: 1. SDK Integration Guide
page_title: Add the Branch SDK to your app
description: This page will tell you how to quickly add the Branch SDK to your Android, iOS, Cordova, Phonegap, Xamarin, Unity, Air or Titanium app.
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
- guide
- advanced
---

{% if page.guide %}

{% if page.xamarin %}

For Xamarin, we're trying something new where our docs will live in the [README of Github](https://github.com/BranchMetrics/xamarin-branch-deep-linking). Please visit this URL to integrate the service.

{% else %}

{% prerequisite %}
Before using the Branch SDK, you must first [sign up for an account](https://dashboard.branch.io){:target="_blank"} and complete the [onboarding process](https://start.branch.io/){:target="_blank"}.
{% endprerequisite %}
{% if page.mparticle_ios or page.mparticle_android %}
{% prerequisite %}
Before enabling the Branch SDK on mParticle, you must first [sign up for an mParticle account](https://app.mparticle.com/){:target="_blank"} and complete the [setup and integration process](http://docs.mparticle.com/){:target="_blank"}.
{% endprerequisite %}
{% endif %}

{% if page.react %}

{% prerequisite %}
`react-native-branch` 1.0 requires `react-native` 0.40. If you require `react-native` < 0.40, please limit
`react-native-branch` to `0.9.*`. There are some differences in the installation and integration process
between 0.9 and 1.0, mentioned here. Please see
[the GitHub repository](https://github.com/BranchMetrics/react-native-branch-deep-linking#branch-metrics-react-native-sdk-reference)
for full details and more options.
{% endprerequisite %}

{% endif %}

## Get the SDK files

<!--- iOS -->
{% if page.ios %}

With extensive use, the iOS SDK footprint is **180 kb**.

### Install with CocoaPods

The recommended way to install the SDK is via CocoaPods:

1. Add `pod "Branch"` to your podfile.
1. Run `pod install` from the command line.
1. Run `pod update` from the command line. This updates the pod to the latest version of the SDK.

### Install with Carthage

Alternatively, you could install the SDK via Carthage:

1. Add `github "BranchMetrics/iOS-Deferred-Deep-Linking-SDK"` to your Cartfile.
1. Run `carthage update` from the command line.

{% protip title="If you do not use CocoaPods or Carthage" %}

You can [install the SDK manually]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios#install-the-sdk-manually){:target="_blank"}.

{% endprotip %}

{% endif %}

{% if page.ios_imessage %}

### Install the SDK manually

We're not sure if Cocoapods will support extensions, so in the meantime, just install the SDK manually into your project.

1. [Grab the latest SDK version](https://s3-us-west-1.amazonaws.com/branchhost/Branch-iOS-SDK.zip), or [clone our open-source GitHub repo](https://github.com/BranchMetrics/ios-branch-deep-linking).
1. Drag the `Branch.framework` file from the root of the SDK folder into the Frameworks folder of your Xcode project. Be sure that "Copy items if needed" and "Create groups" are selected.
1. Update the target's **Framework Search Paths**
    a. Select the project in Project Navigator
    b. In the PROJECT/TARGETS pane select the target you are building
    c. Click on the **Build Settings** tab
    d. Find: **User Header Search Paths**
    e. Add: **$(PROJECT_DIR)/Branch.framework/Headers**
1. Import the following frameworks under **Build Phases** for your app target:
    - `AdSupport.framework`
    - `CoreSpotlight.framework`
    - `MobileCoreServices.framework`

{% endif %}
<!--- /iOS -->

<!--- Android-->
{% if page.android %}

With extensive use, the Android SDK footprint is **187 kb**.

### Install with Gradle

Add `compile 'io.branch.sdk.android:library:2.+'` to the dependencies section of your `build.gradle` file.

### Add Google Play Services

To ensure full measurement and deferred deep linking, include the Google Play Services library in the same `build.gradle` file. Follow these steps to ensure you have added the Google Play Services library.

1. Add `compile 'com.google.android.gms:play-services-ads:9+'` or greater version in your dependencies section.
1. Add the following line in your Proguard settings:

{% highlight xml %}
-keep class com.google.android.gms.ads.identifier.** { *; }
{% endhighlight %}


{% protip %}
You can also find the [source and JAR file here](https://github.com/BranchMetrics/android-branch-deep-linking){:target="_blank"}.
{% endprotip %}

Note that if you don't plan to use the Fabric Answers integration, you can use the following line:

{% highlight sh %}
compile ('io.branch.sdk.android:library:2.+') {
  exclude module: 'answers-shim'
}
{% endhighlight %}
{% endif %}
<!--- /Android -->

<!--- Unity -->
{% if page.unity %}

### Get the files

1. [Download the latest SDK version](https://s3-us-west-1.amazonaws.com/branchhost/BranchUnityWrapper.unitypackage){:target="_blank"} or [clone our open-source GitHub repository](https://github.com/BranchMetrics/unity-branch-deep-linking){:target="_blank"}.
1. Import the `BranchUnityWrapper.unitypackage` into your project by clicking `Assets -> Import Package`.

### Configure the package and add Branch key

1. To allow Branch to configure itself, drag a **BranchPrefab** asset to your scene.
1. Fill out the following Prefab settings

| Field name | Description
| --- | ---
| `Simulate Fresh Installs` | This is a flag that enables or disables debug mode. In debug mode, your app will simulate fresh install each time and log to the console. This is just for testing so please remove this prior to launch.
| `Test Mode` | Switch set of parameters, if "Test mode" is enabled then app will use "test" Branch key if specified. Otherwise, the app will use the "live" Branch key.
| `Branch Key` | Get your live or test Branch key from [the Branch dashboard](https://dashboard.branch.io/#/settings){:target="_blank"}. You can toggle Live/Test at the top right hand side of the dashboard.
| `Branch Uri` | The URI scheme for your app, which must be the same value as you entered in [the Branch link settings](https://dashboard.branch.io/#/settings/link){:target="_blank"}. Do **not** include the `://` characters.
| `Android Path Prefix` | This only applies to you if you are on the `bnc.lt` domain or a custom, white labeled domain (`links.yoursite.com`). If you use `app.link` or even a custom subdomain, please ignore this field. This is the four-character value in front of all your links. You can find it underneath the field labeled **SHA256 Cert Fingerprints** on the dashboard once you've enabled App Links. It will look something like this: `/WSuf` (the initial `/` character should be included).
| `App Links` | This is where you specify the domains you would like to use for Android App Links (similar to Universal Links on iOS). Universal Links must be manually configured later as we couldn't figure out how to automate this.

{% image src='/img/pages/getting-started/sdk-integration-guide/unity_branch_key.png' full center alt='Unity plugin installation' %}

* `Update iOS Wrapper` : You should tap this button each time when you will change `Branch Key` and `Branch Uri`.
* `Update Android Manifest` : You should tap this button if you want to update your manifest to include the correct intent filters for deep linking. If you update your manifest manually just don't push this button. If you need to update your manifest manually, please review the guidelines on [our Github page](https://github.com/BranchMetrics/unity-branch-deep-linking#android-note-for-manual-manifest-changing).

### Overriding OnNewIntent for Android

The Branch SDK contains a custom activity that is extended from UnityPlayerActivity. This is required in order to fix Android's OnNewIntent() to allow the app retrieves right link when app is in background.

In the manifest file, you will need to replace:

{% highlight xml %}
<activity android:name="com.unity3d.player.UnityPlayerActivity">
{% endhighlight %}
with
{% highlight xml %}
<activity android:name="io.branch.unity.BranchUnityActivity" android:launchMode="singleTask">
{% endhighlight %}

If you will have your own custom activity, you just should override method `OnNewIntent` and add flag "singleTask".

{% protip title="Note for iOS projects" %}

When building an iOS project:

1. All required frameworks will be added automatically.
1. Objective C exceptions will be enabled automatically.
1. URI Scheme will be added into .plist automatically.

Branch requires ARC, and we don’t intend to add `if` checks throughout the SDK to try to support pre-ARC. However, for **Unity 4.6** you can add flags to the project to compile the Branch files with ARC, which should work fine for you. Simply add `-fobjc-arc` to all Branch files.
{% endprotip %}

{% endif %}
<!--- /Unity -->

<!--- Adobe -->
{% if page.adobe %}

1. [Download the latest SDK version](https://github.com/BranchMetrics/Branch-AIR-ANE-SDK/archive/master.zip){:target="_blank"} or clone [our open-source GitHub repository](https://github.com/BranchMetrics/AIR-ANE-Deferred-Deep-Linking-SDK){:target="_blank"}.
1. Import the `Branch.ane` file into your project. Depending your IDE you might need to import the `Branch.swc` as well.
1. Open your `*-app.xml` and add this line: `<extensionID>io.branch.nativeExtensions.Branch</extensionID>`

{% endif %}
<!--- /Adobe -->

<!--- Titanium -->
{% if page.titanium %}

### iOS module installation

1. [Download the latest SDK version](https://s3-us-west-1.amazonaws.com/branchhost/Branch-Titanium-iOS-SDK.zip){:target="_blank"} or [clone our open-source GitHub repository](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK){:target="_blank"} and locate the ZIP file inside the `iphone` folder.
1. Extract the contents.
3. Copy the `iphone` folder to your Titanium `modules` folder.

### Android module installation

1. [Download the latest SDK version](https://s3-us-west-1.amazonaws.com/branchhost/Branch-Titanium-Android-SDK.zip){:target="_blank"} or [clone our open-source GitHub repository](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK){:target="_blank"} and locate the ZIP file inside the `android/dist` folder.
1. Extract the contents.
3. Copy the `android` folder to your Titanium `modules` folder.

#### Android note

We've recently found that there is an issue involving the `WRITE_EXTERNAL_STORAGE` permission, Titanium and the Branch module on Android. If you have the `WRITE_EXTERNAL_STORAGE` permission enabled for your Titanium app, you will see failures to initialize Branch. *Please remove this permission.*

{% endif %}
<!--- /Titanium -->

{% if page.react %}

1. Navigate to your root project directory and download the Branch SDK package: `npm install --save react-native-branch`.
1. Configure the package: `react-native link react-native-branch`.

### iOS project installation

1. Add `pod "Branch"` as a dependency in your ios/Podfile. ([example](https://github.com/BranchMetrics/react-native-branch-deep-linking/blob/master/docs/installation.md#cocoa-pods))
1. Use CocoaPods to install dependencies: `pod install --repo-update`.

{% protip %}
As of CocoaPods v 1.0, `pod install` no longer automatically updates the local pod repository. Use the `--repo-update`
argument to `pod install` in order to make sure you install the latest SDK.
{% endprotip %}
{% protip %}
See
[the GitHub repository](https://github.com/BranchMetrics/react-native-branch-deep-linking#branch-metrics-react-native-sdk-reference)
for details on integrating dependencies, including other methods of adding the Branch SDK for iOS, such as Carthage.
{% endprotip %}

### Android project installation

Sometimes `react-native link` creates incorrect relative paths, leading to compilation errors. Ensure that the following files look as described and all linked paths are correct:

#### android/settings.gradle

{% highlight js %}
...

include ':react-native-branch', ':app'

// The relative path to the react-native-branch directory tends to often be prefixed with one too many "../"s
project(':react-native-branch').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-branch/android')
{% endhighlight %}

#### android/app/build.gradle

{% highlight js %}
...

dependencies {
    ...
    compile project(':react-native-branch')
}
{% endhighlight %}
{% endif %}
<!--- /React -->

<!-- mParticle iOS -->
{% if page.mparticle_ios %}

### Install with CocoaPods

The recommended way to install the SDK is via CocoaPods:

1. Add `pod 'mParticle-BranchMetrics', '~> 6.5.0'` to your podfile.
1. Run `pod install` from the command line.
1. Run `pod update` from the command line. This updates the pod to the latest version of the SDK.


### Install with Carthage

Alternatively, you could install the SDK via Carthage:

1. Add `github "mparticle-integrations/mparticle-apple-integration-branchmetrics" ~> 6.5.0` to your Cartfile.
1. Run `carthage update` from the command line.

{% endif %}
<!-- /mParticle iOS -->

<!-- mParticle Android -->

{% if page.mparticle_android %}

With extensive use, the Android SDK footprint is **187 kb**.

### Install with Gradle

Add `compile 'com.mparticle:android-branch-kit:4.+'` to the dependencies section of your `build.gradle` file.

{% endif %}
<!-- /mParticle Android -->

{% if page.mparticle_ios or page.mparticle_android %}
##  Enable Branch on mParticle

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. From your [mParticle dashboard](https://app.mparticle.com/){:target="_blank"} navigate to the Services page. (The paper airplane icon on the left side)
1. Scroll down to the Branch tile, or enter Branch in the search bar.
1. Click on the Branch tile and then select "Activate a Platform".
1. Click on the {% if page.mparticle_ios %}Apple{% else %}Android{% endif %} icon, then toggle the status ON.
1. Enter your Branch key in the marked field and click "Save".

{% endif %}

{% if page.xamarin %}

<!--Moved to Github README-->

{% endif %}

{% if page.android or page.cordova or page.titanium or page.unity or page.xamarin or page.react %}
{% protip title="Android build errors" %}
Occasionally, Android will barf after you add our library due to generic issues unrelated to Branch. Please see [this advanced section]({{base.url}}/getting-started/sdk-integration-guide/advanced/android#troubleshooting-android-build-errors)
{% endprotip %}
{% endif %}

{% if page.ios or page.react or page.mparticle_ios or page.ios_imessage %}
## {% if page.react %}iOS: {% endif %}Configure Xcode Project

{% if page.ios or page.react or page.ios_message %}
### Add your Branch key

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. Add new rows to your info.plist file with the following values, with the `String` entry inside the `Dictionary`:

| Key | Type | Value |
| :--- | --- | --- |
| branch_key | Dictionary | |
| live | String | [key_live_xxxxxxxxxxxxxxx] |

{% image src="/img/pages/getting-started/sdk-integration-guide/ios_add_branchKey.gif" actual center alt="Add the Branch Key" %}

{% endif %}
{% if page.ios or page.react or page.mparticle_ios %}

### Register a URI scheme

{% ingredient universal-links-requirement %}{% endingredient %}

Branch opens your app by using its URI scheme (`yourapp://`), which should be unique to your app.

1. On the [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard, ensure that **I have an iOS App** is checked and **iOS URI Scheme** is filled.
1. In Xcode: Click your project file, navigate to **Targets > Info > URL Types**, and add a new entry with your URI scheme.

{% image src='/img/pages/getting-started/sdk-integration-guide/ios_get_uriScheme.gif' full center alt='URL Scheme Demo' %}

{% endif %}
{% endif %}

{% if page.android or page.react or page.mparticle_android %}
## {% if page.react %}Android: {% endif %}Configure Manifest

{% if page.android or page.react %}
### Add your Branch key

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. Open your `AndroidManifest.xml` and add the following `<meta-data>` tag:

{% highlight xml %}
<application>
    <!-- Other existing entries -->

    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_xxxxxxxxxxxxxxx" />

</application>
{% endhighlight %}

{% protip title="Internet Permissions" %}
Your app needs to have internet permissions in order to communicate with the Branch service. Make sure you set `<uses-permission android:name="android.permission.INTERNET" />`
{% endprotip %}

### Register for Google Play Install Referrer

Add this snippet to your `AndroidManifest.xml`:

{% highlight xml %}
<receiver android:name="io.branch.referral.InstallListener" android:exported="true">
  <intent-filter>
    <action android:name="com.android.vending.INSTALL_REFERRER" />
  </intent-filter>
</receiver>
{% endhighlight %}

{% protip title="Alternative Configuration" %}
- [I already use the Install Referrer in my app]({{base.url}}/getting-started/sdk-integration-guide/advanced/android#custom-install-referrer-class){:target="_blank"}
{% endprotip %}
{% endif %}
### Register a URI scheme

Branch opens your app by using its URI scheme (`yourapp://`), which should be unique to your app.

1. On the [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard, ensure that **I have an Android App** is checked and **Android URI Scheme** is filled.
1. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from.
1. Inside your `AndroidManifest.xml`, locate where the selected `Activity` is defined.
1. Within the `Activity` definition, insert the intent filter provided below. Change `yourapp` under `android:scheme` to the URI scheme you've selected.

{% highlight xml %}
<intent-filter>
  <data android:scheme="yourapp" android:host="open" />
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
</intent-filter>
{% endhighlight %}

{% caution %}
To ensure proper deep linking from other apps such as Facebook, this Activity must be launched in `singleTask` mode. This is done in the Activity definition as so:

{% highlight xml %}
<activity
    android:name="com.yourapp.SplashActivity"
    android:label="@string/app_name"
    android:launchMode="singleTask">
{% endhighlight %}
{% endcaution %}

{% if page.android or page.react %}
### Enable Auto Session Management

If your app uses a custom Application class, add `Branch.getAutoInstance(this);` so that it matches the following:

{% if page.android %}
{% highlight java %}
public final class CustomApplicationClass {
  @Override
  public void onCreate() {
      super.onCreate();
      // initialize the Branch object
      Branch.getAutoInstance(this);
  }
}
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight java %}
// import Branch and RNBranch at the top
import io.branch.rnbranch.*;
import io.branch.referral.Branch;

public final class CustomApplicationClass {

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNBranchPackage(), // <-- add this
// ...


  @Override
  public void onCreate() {
      super.onCreate();
      // initialize the Branch object
      Branch.getAutoInstance(this);
  }
}
{% endhighlight %}
{% endif %}

{% caution title="Make sure this is the correct onCreate()!" %}
Your `Activity` also has an `onCreate()` method. Be sure you do not mix the two up!
{% endcaution %}

{% protip title="Alternative Configurations" %}
- [I don't use a custom application class]({{base.url}}/getting-started/sdk-integration-guide/advanced/android#using-the-default-application-class){:target="_blank"}
- [I need to support pre-15 Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android#supporting-pre-15-android){:target="_blank"}
{% endprotip %}

#### Optimize Performance

By default, Branch will delay the *install* call only for up to 1.5 seconds. We delay the install call in order to capture the install referrer string passed through Google Play, which increases attribution and deferred deep linking accuracy. We do not delay any other call, and the install call only occurs the first time a user opens your app.

If we receive the referrer string before 1.5 seconds, we will immediately fire the call, meaning this delay is up to 1.5 seconds, but not guaranteed to take that long.

If you'd like to optimize the first install call, simply paste the following code in your Application class, and we will not delay the first install call.

{% highlight java %}
public final class CustomApplicationClass {
  @Override
  public void onCreate() {
      super.onCreate();
      // initialize the Branch object
      Branch.setPlayStoreReferrerCheckTimeout(0);
      Branch.getAutoInstance(this);
  }
}
{% endhighlight %}

{% endif %}

{% endif %}
<!---       /Android-specific Branch Key -->

{% if page.xamarin %}

<!--Moved to Github README-->

{% endif %}

{% if page.adobe %}
## Add your Branch key

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. In your project's `*-app.xml` file, add the following platform-specific snippet(s):

### iOS Projects

{% highlight xml %}
<iPhone><InfoAdditions><![CDATA[
    <!-- other stuff -->
    <key>branch_key</key>
    <string>key_live_xxxxxxxxxxxxxxx</string>
]]></InfoAdditions></iPhone>
{% endhighlight %}

### Android Projects

{% highlight xml %}
<android><manifestAdditions><![CDATA[
    <!-- other stuff -->
    <application>
        <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_xxxxxxxxxxxxxxx" />
        <activity android:name="io.branch.nativeExtensions.branch.BranchActivity" android:launchMode="singleTask" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    </application>
]]></manifestAdditions></android>
{% endhighlight %}

## Register a URI scheme

{% ingredient universal-links-requirement %}{% endingredient %}

Branch opens your app by using its URI scheme (`yourapp://`), which should be unique to your app.

1. On the [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard, ensure that **I have an iOS App** and/or **I have an Android App** is checked and **iOS URI Scheme** and/or **Android URI Scheme** is filled.
1. In your project's `*-app.xml` file, insert the platform-specific snippet(s) below. Change `yourapp` to the URI scheme you've selected.

### iOS Projects

{% highlight xml %}
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>yourapp</string>
        </array>
    </dict>
</array>
{% endhighlight %}

### Android Projects

{% highlight xml %}
<activity>
    <intent-filter>
        <data android:scheme="yourapp" />
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
    </intent-filter>
</activity>
{% endhighlight %}
{% endif %}

{% if page.titanium %}

## Add your Branch key and register a URI scheme

### iOS Projects

{% ingredient universal-links-requirement %}{% endingredient %}

Branch opens your app by using its URI scheme (`yourapp://`), which should be unique to your app.

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. On the [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard, ensure that **I have an iOS App** is checked and **iOS URI Scheme** and is filled.
1. In your project's `tiapp.xml` file, insert the snippet below. Change `yourapp` to the URI scheme you've selected.

{% highlight xml %}
  <ios>
    <plist>
      <dict>
        <!-- Add branch key as key-value pair -->
        <key>branch_key</key>
        <string>key_live_xxxxxxxxxxxxxxx</string>
        <!-- Add unique string for direct deep links -->
        <key>CFBundleURLTypes</key>
        <array>
          <dict>
            <key>CFBundleURLSchemes</key>
            <array>
              <string>yourapp</string>
            </array>
          </dict>
        </array>
      </dict>
    </plist>
  </ios>
{% endhighlight %}

### Android Projects

#### Add your Branch key

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. Open your `tiapp.xml` and add the following `<meta-data>` tag:

{% highlight xml %}
<application>
    <!-- Other existing entries -->

    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_xxxxxxxxxxxxxxx" />

</application>
{% endhighlight %}

#### Register a URI scheme

Branch opens your app by using its URI scheme (`yourapp://`), which should be unique to your app.

1. On the [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard, ensure that **I have an Android App** is checked and **Android URI Scheme** is filled.
1. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from.
1. Inside your `tiapp.xml`, locate where the selected `Activity` is defined.
1. Within the `Activity` definition, insert the intent filter provided below. Change `yourapp` under `android:scheme` to the URI scheme you've selected.

{% highlight xml %}
<intent-filter>
  <data android:scheme="yourapp" android:host="open" />
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
</intent-filter>
{% endhighlight %}

{% caution %}
To ensure proper deep linking from other apps such as Facebook, this Activity must be launched in `singleTask` mode. This is done in the Activity definition as so:

{% highlight xml %}
<activity
    android:name="com.yourapp.SplashActivity"
    android:label="@string/app_name"
    android:launchMode="singleTask">
{% endhighlight %}
{% endcaution %}

{% endif %}

## Start a Branch session

{% if page.mparticle_ios or page.mparticle_android %}
As with any kit, mParticle will automatically handle initializing Branch sessions. At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.
{% else %}
A Branch session needs to be started every single time your app opens. We check to see if the user came from a link and if so, the callback method returns any deep link parameters for that link. Please note that the callback function is always called, even when the network is out.
{% endif %}

<!---    iOS -->
{% if page.ios or page.ios_imessage %}
{% if page.ios %}

{% tabs %}
{% tab objective-c %}

1. In Xcode, open your **App.Delegate.m** file.
1. Add `#import "Branch/Branch.h"` at the top to import the Branch framework.
1. Define and initialize Branch

{% image src='/img/pages/getting-started/sdk-integration-guide/objc_initSession.gif' center alt='Initialize the SDK'%}

{% endtab %}

{% tab swift %}
1. Add a bridging header to import the Branch framework into your project. For help on adding a bridging header, see [this StackOverflow answer](http://stackoverflow.com/a/28486246/1914567){:target="_blank"}.
1. In Xcode, open your **AppDelegate.swift** file.
1. Define and initialize Branch:

{% image src='/img/pages/getting-started/sdk-integration-guide/swift_initSession.gif' center alt='Initialize Branch'%}

{% endtab %}
{% endtabs %}

{% endif %}

{% if page.ios_imessage %}

{% tabs %}
{% tab objective-c %}
1. In Xcode, open your **MessagesViewController.m** file.
1. Add `#import "Branch.h"` at the top to import the Branch framework.
1. Find the line beginning with:

{% highlight objc %}
- (void)didBecomeActiveWithConversation:(MSConversation *)conversation
{% endhighlight %}
{% endtab %}

{% tab swift %}
1. Add a bridging header to import the Branch framework into your project. For help on adding a bridging header, see [this StackOverflow answer](http://stackoverflow.com/a/28486246/1914567){:target="_blank"}.
1. In Xcode, open your **MessagesViewController.swift** file.
1. Find the line beginning with:

{% highlight swift %}
func didBecomeActiveWithConversation(conversation: MSConversation)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}


{% if page.ios %}
In didFinishLaunchingWithOptions, add the following snippet:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    if (!error && params) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        NSLog(@"params: %@", params.description);
    }
}];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
Branch.getInstance().initSession(launchOptions: launchOptions) { params, error in
    // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
    // params will be empty if no data found
    // ... insert custom logic here ...
    print(params as? [String: AnyObject] ?? {})
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.ios_imessage %}
In this method, add the following snippet:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch initSessionWithLaunchOptions:@{} andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    if (!error && params) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        NSLog(@"params: %@", params.description);
    }
}];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
Branch.getInstance().initSession(launchOptions: launchOptions) { params, error in
    // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
    // params will be empty if no data found
    // ... insert custom logic here ...
    print(params as? [String: AnyObject] ?? {})
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% protip %}
If you're using **Xcode 6.3 or newer**, have imported the SDK, and are still seeing a "Branch.h file not found" or some other compiler error, please [read this support article](https://support.branch.io/support/solutions/articles/6000109874-xcode-error-branch-not-found){:target="_blank"}.
{% endprotip %}

{% if page.ios %}

## Handle incoming links

{% tabs %}
{% tab objective-c %}

Finally, add these two new methods to your **AppDelegate.m** file. The first responds to URI scheme links. The second responds to Universal Links, but will not be active until you [configure Universal Links]({{base.url}}/getting-started/universal-app-links){:target="_blank"}.

{% highlight objc %}
// Respond to URI scheme links
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    // pass the url to the handle deep link call
    [[Branch getInstance]
        application:app
            openURL:url
            options:options];

    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    return YES;
}

// Respond to Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];

    return handledByBranch;
}
{% endhighlight %}

{% endtab %}
{% tab swift %}

Finally, add these two new methods to your **AppDelegate.swift** file. The first responds to URI scheme links. The second responds to Universal Links and Spotlight listings, but will not be active until you [configure Universal Links]({{base.url}}/getting-started/universal-app-links){:target="_blank"}.

{% highlight swift %}
// Respond to URI scheme links
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    // pass the url to the handle deep link call
    Branch.getInstance().application(app,
        open: url,
        options:options
    )

    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    return true
}

// Respond to Universal Links
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
    // pass the url to the handle deep link call
    Branch.getInstance().continue(userActivity)

    return true
}
{% endhighlight %}

{% endtab %}
{% endtabs %}

{% protip %}
With your app now able to respond to Branch links, you will want to set up [deep link routing](https://dev.branch.io/getting-started/deep-link-routing/guide/ios/#building-a-custom-deep-link-routing-method){:target="_blank"} to start sending users to the correct places inside of your app.
{% endprotip %}

{% endif %}
{% endif %}
<!---    /iOS -->

<!-- Android -->
{% if page.android %}

Open the `Activity` for which you registered the `Intent` in the previous section, and hook into the `onStart` and `onNewIntent` lifecycle methods by adding these overrides:

{% highlight java %}
@Override
public void onStart() {
    super.onStart();
    Branch branch = Branch.getInstance();

    branch.initSession(new Branch.BranchReferralInitListener(){
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
                // params will be empty if no data found
                // ... insert custom logic here ...
            } else {
                Log.i("MyApp", error.getMessage());
            }
        }
    }, this.getIntent().getData(), this);
}

@Override
public void onNewIntent(Intent intent) {
    this.setIntent(intent);
}
{% endhighlight %}

{% protip title="If you are calling this method inside a fragment"%}
`this.getIntent().getData()` refers to the data associated with an incoming intent. Please use `getActivity()` instead of passing in `this`.
{% endprotip %}
{% endif %}
<!-- /Android -->

<!-- Cordova -->
{% if page.cordova %}

Use the the following methods to initialize a Branch session when the `deviceready` event fires and every time the `resume` event fires.

__Cordova and PhoneGap__
{% highlight js %}
// sample index.js
var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('resume', this.onDeviceResume, false);
  },
  onDeviceReady: function() {
    app.branchInit();
  },
  onDeviceResume: function() {
    app.branchInit();
  },
  branchInit: function() {
    // Branch initialization
    Branch.initSession(function(data) {
      // read deep link data on click
      alert('Deep Link Data: ' + JSON.stringify(data));
    });
  }
};

app.initialize();
{% endhighlight %}

__Ionic 1__
{% highlight js %}
// sample app.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Branch
    $ionicPlatform.on('deviceready', function(){
      branchInit();
    });
    $ionicPlatform.on('resume', function(){
      branchInit();
    });

    function branchInit() {
      // Branch initialization
      Branch.initSession(function(data) {
        // read deep link data on click
        alert('Deep Link Data: ' + JSON.stringify(data));
      });
    }
  });
})
// ...
{% endhighlight %}

__Ionic 2__
{% highlight js %}
// sample app.component.js
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

// Branch import
declare var Branch;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      branchInit();
    });

    platform.resume.subscribe(() => {
      branchInit();
    });

    // Branch initialization
    const branchInit = () => {
      // only on devices
      if (platform.is('core')) { return }
      Branch.initSession(data => {
        // read deep link data on click
        alert('Deep Link Data: ' + JSON.stringify(data));
      });
    }
  }
}
{% endhighlight %}

{% caution title="Watch out for content security policies" %}
If `data` is null and `err` contains a string denoting a request timeout, make sure to whitelist `api.branch.io` and `[branchsubdomain]` ([click here]({{base.url}}/getting-started/link-domain-subdomain/guide/#the-default-applink-subdomain){:target="_blank"} to read about `[branchsubdomain]`) in your app's [content security policies](https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy){:target="_blank"}.
{% endcaution %}

{% endif %}
<!-- /Cordova -->

<!-- Xamarin -->
{% if page.xamarin %}

<!--Moved to Github README-->

{% endif %}
<!-- /Xamarin -->

<!-- Unity -->
{% if page.unity %}
Insert the following methods into the main class of the scene to which you added BranchPrefab. The callback method should be visible from every scene in which you will use deep linked data.

{% caution title="Call initSession in first scene during initialization" %}
Please call initSession(..) in Start of your very first scene or onCreate of your main Activity. Branch needs time to register for all of the lifecycle calls before the application makes them, in order to intercept the deep link data. If you call it after, you'll potentially miss data.
{% endcaution %}

{% highlight c# %}
using UnityEngine;
using System.Collections.Generic;

public class MyCoolBehaviorScript : MonoBehaviour {
    void Start () {
        Branch.initSession(CallbackWithBranchUniversalObject);
    }

    void CallbackWithBranchUniversalObject(BranchUniversalObject universalObject, BranchLinkProperties linkProperties, string error) {
        if (error != null) {
            System.Console.WriteLine("Oh no, something went wrong: " + error);
        }
        else if (linkProperties.controlParams.Count > 0) {
            System.Console.WriteLine("Branch initialization completed with the following params: " + universalObject.ToJsonString() + linkProperties.ToJsonString());
        }
    }
}
{% endhighlight %}

{% endif %}
<!-- /Unity -->

<!-- Adobe Air -->
{% if page.adobe %}
Inside your `Main.as` file, insert the following:

{% highlight java %}
// Import
import io.branch.nativeExtensions.branch.Branch;
import io.branch.nativeExtensions.branch.BranchEvent;

// Then create a Branch instance:
var branch:Branch = new Branch();

// Register two events before initializing the SDK:
branch.addEventListener(BranchEvent.INIT_FAILED, initFailed);
branch.addEventListener(BranchEvent.INIT_SUCCESSED, initSuccessed);

private function initFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.INIT_FAILED", bEvt.informations);
}

private function initSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.INIT_SUCCESSED", bEvt.informations);

    // params are the deep linked params associated with the link that the user clicked before showing up
    // params will be empty if no data found
    var referringParams:Object = JSON.parse(bEvt.informations);

    //trace(referringParams.user);
}

// Initialize the SDK:
branch.init();
{% endhighlight %}

{% caution %}
Be sure to have the INIT_SUCCESSED event called, otherwise read the bEvt.informations from the INIT_FAILED event.
{% endcaution %}
{% endif %}

{% if page.titanium %}
Initialize the SDK by inserting the following snippet into your `index.js` file:

{% highlight js %}
$.initialize = function(params) {
    $.window.open();

    $.initializeViews();
    $.initializeHandlers();

    Ti.API.info("start initSession");
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

$.onInitSessionFinished = function(data) {
    Ti.API.info("inside onInitSessionFinished");
    for (key in data) {
        if ((key != "type" && key != "source" && key != "bubbles" && key != "cancelBubble") && data[key] != null) {
            Ti.API.info(key + data["key"]);
        }
    }
}
{% endhighlight %}
{% endif %}
<!-- /Adobe Air -->

<!-- React Native -->
{% if page.react %}

### iOS initialization

1. In Xcode, open your **App.Delegate.m** file.
2. Add `#import <react-native-branch/RNBranch.h>` at the top to import the Branch framework. (If you are using
  `react-native-branch` 0.9, use `#import "RNBRanch.h"` instead.)
3. Find the line beginning with:

{% highlight objc %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:
{% endhighlight %}

Underneath this line, add the following snippet:

{% highlight objc %}
[RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];

NSURL *jsCodeLocation;
{% endhighlight %}

Finally, add these two new methods. The first responds to URI scheme links. The second responds to Universal Links, but will not be active until you [configure Universal Links]({{base.url}}/getting-started/universal-app-links){:target="_blank"}.

{% highlight objc %}
// Respond to URI scheme links
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  if (![RNBranch handleDeepLink:url]) {
    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
  }
  return YES;
}

// Respond to Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  return [RNBranch continueUserActivity:userActivity];
}
{% endhighlight %}

### Android initialization

In **android/app/src/main/java/com/xxx/MainActivity.java**, add the following:

{% highlight java %}
import android.content.Intent; // <-- import
import io.branch.rnbranch.*; // <-- import

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "base";
    }

    // Override onStart, onNewIntent:
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(this.getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        this.setIntent(intent);
    }
    // ...
}
{% endhighlight %}

{% endif %}
<!-- /React Native -->

<!-- mParticle - iOS -->
{% if page.mparticle_ios %}

## Handle Incoming Links

{% tabs %}
{% tab objective-c %}
1. In Xcode, open your **AppDelegate.m** file.
1. In the `didFinishLaunchingWithOptions` method, before you initialize your mParticle session, add the following:

{% highlight objc %}
NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
[notificationCenter addObserver:self
                       selector:@selector(handleKitDidBecomeActive:)
                           name:mParticleKitDidBecomeActiveNotification
                         object:nil];
{% endhighlight %}
{% endtab %}
{% tab swift %}
1. In Xcode, open your **AppDelegate.swift** file.
1. In the `application:didFinishingLaunchingWithOptions:` method, before you initialize your mParticle session, add the following:

{% highlight swift %}
NotificationCenter.default.addObserver(self, selector: #selector(handleKitDidBecomeActive(_:)), name: Notification.Name.mParticleKitDidBecomeActive, object: nil)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% caution %}
This observer must be added _before_ initializing the mParticle session. Failure to do so will cause some deep links to be missed.
{% endcaution %}

{% tabs %}
{% tab objective-c %}
Add the following methods to your **AppDelegate.m** file:

{% highlight objc %}
- (void)handleKitDidBecomeActive:(NSNotification *)notification {
    NSDictionary *userInfo = [notification userInfo];
    NSNumber *kitNumber = userInfo[mParticleKitInstanceKey];
    MPKitInstance kitInstance = (MPKitInstance)[kitNumber integerValue];

    if (kitInstance == MPKitInstanceBranchMetrics) {
        [self checkForDeeplink];
    }
}

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
Add the following methods to your **AppDelegate.swift** file:

{% highlight swift %}
func handleKitDidBecomeActive(_ notification: Notification) {
    guard let kitNumber = notification.userInfo?[mParticleKitInstanceKey] as? NSNumber else { return }
    guard let kitInstance = MPKitInstance(rawValue: kitNumber.uintValue) else { return }

    switch kitInstance {
        case .branchMetrics:
            checkForDeeplink()
        default:
            break
    }
}

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
<!-- mParticle - iOS -->

<!-- mParticle - Android -->
{% if page.mparticle_android %}

## Handle Incoming Links

Open the `Activity` for which you registered the `Intent` in the previous section, and hook into the `onStart` lifecycle method by adding this override:

{% highlight java %}
@Override
public void onStart() {
  MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
    @Override
    public void onResult(DeepLinkResult result) {
        // Check for the existence of a given key in the link data and route accordingly.
        try {
            if ((result.getParameters().has("my_custom_key")) && (result.getParameters().get("my_custom_key").equals("custom value"))) {
                // Send user to intended path
            }
        } catch (JSONException e) {

        }
    }

    @Override
    public void onError(DeepLinkError error) {
        // If an error occurred, it will be surfaced via a DeepLinkError.
        Log.d("my log tag", error.toString());
    }
  });
}
{% endhighlight %}
{% endif %}
<!-- /mParticle Android -->

## Recommended: Track in-app events

In-app engagement and user value metrics are just as important as the click, install, and re-open metrics that Branch [automatically provides]({{base.url}}/getting-started/growth-attribution#automatic-event-tracking){:target="_blank"}. Branch has a fixed set of post-install events, like purchase, add to cart, and share, but you're free to add your own as well. Best of all, you can attribute these actions back to each link, campaign, or channel. Check out [that discussion here]({{base.url}}/getting-started/user-value-attribution){:target="_blank"}.

{% if page.mparticle_ios or page.mparticle_android %}
Every custom event that you track with mParticle will be automatically forwarded to Branch.
{% else %}
Track custom events in your app with a simple call to the Branch SDK:
{% endif %}
{% if page.ios or page.ios_imessage %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:"signup"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction("signup")
{% endhighlight %}
{% endtab %}
{% endtabs %}


{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).userCompletedAction("signup");
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
Branch.userCompletedAction("sign up");
{% endhighlight %}
{% endif %}

{% if page.xamarin %}

<!--Moved to Github README-->

{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.userCompletedAction("signup");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("signup");
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight js %}
branch.userCompletedAction("signup");
{% endhighlight %}
{% endif %}


{% ingredient revenue-snippets %}{% endingredient %}

For more information on tracking and configuring custom events, see the [user value attribution]({{base.url}}/getting-started/user-value-attribution){:target="_blank"} guide.

## Next steps

The Branch SDK is now integrated into your app, and you can use the [Branch dashboard](https://dashboard.branch.io/#){:target="_blank"} to track completed installs from [Quick Links](https://dashboard.branch.io/#/marketing){:target="_blank"}. However, this only scratches the surface of what is possible with Branch.

Here are some recommended next steps:

- **Enable [Universal & App Links]({{base.url}}/getting-started/universal-app-links)** — traditional URI scheme links are no longer supported in many situations on iOS 9.2+, and are a less than ideal solution on new versions of Android. To get full functionality from your Branch links on iOS devices, **you should enable Universal Links as soon as possible.**
- **Learn about [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps)** — let your users share content and invite friends from inside your app.
-  **Set up [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing)** — send incoming visitors directly to specific content in your app based on the Branch link they opened.
-  **Set up [Custom Event Tracking]({{base.url}}/getting-started/user-value-attribution#custom-event-tracking)** if you skipped the step above — make in-app activity beyond clicks, installs, and opens — like purchases and signups — available for analysis in the dashboard.
-  **Submit your app to the [App Store]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#submitting-to-the-app-store)** and **[Google Play Store]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#submitting-to-the-play-store)**
{% endif %}

{% elsif page.advanced %}

{% if page.android or page.cordova or page.titanium or page.unity or page.react %}

## Troubleshooting Android build errors

### ClassNotFoundException : Branch.Java

In case of having other SDKs along with Branch and exceeding the Dex limit, please make sure you have enabled multi-dex support for your application. Check the following to ensure multi-dex is configured properly

1. Make sure you have enabled multi-dex support in your build.gradle file

{% highlight java %}
 defaultConfig {
    multiDexEnabled true
}
{% endhighlight %}

2. Make sure your `Application` class is extending `MultiDexApplication`

3. Make sure dex files are properly loaded from .apk file. In your application class make sure you have the following

{% highlight java %}
@Override
protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
}
{% endhighlight %}

### InvalidClassException, ClassLoadingError or VerificationError

This is often caused by a Proguard bug with optimization. Please try to use the latest Proguard version or disable Proguard optimisation by setting `-dontoptimize` option.

{% endif %}

{% if page.ios %}

## Install the SDK manually

Follow these directions install the Branch SDK framework files without using CocoaPods:

1. [Grab the latest SDK version](https://s3-us-west-1.amazonaws.com/branchhost/Branch-iOS-SDK.zip), or [clone our open-source GitHub repo](https://github.com/BranchMetrics/ios-branch-deep-linking).
1. Drag the `Branch.framework` file from the root of the SDK folder into the Frameworks folder of your Xcode project. Be sure that "Copy items if needed" and "Create groups" are selected.
1. Update the target's **Framework Search Paths**
    a. Select the project in Project Navigator
    b. In the PROJECT/TARGETS pane select the target you are building
    c. Click on the **Build Settings** tab
    d. Find: **User Header Search Paths**
    e. Add: **$(PROJECT_DIR)/Branch.framework/Headers**
1. Import the following frameworks under **Build Phases** for your app target:
    - `AdSupport.framework`
    - `CoreSpotlight.framework`
    - `MobileCoreServices.framework`
    - `iAd.framework`

{% caution title="Considerations around using Frameworks" %}

`AdSupport.framework` allows us to use the IDFA to match your visitors across our entire network of apps, increasing matching accuracy. When you submit your app to the App Store, you need to let Apple know that you use the IDFA.

{% endcaution %}

[Back to the Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/ios/#get-the-sdk-files)

{% elsif page.android %}

## Using the default Application class

If your app doesn't use a custom Application class, simply add the `android:name="io.branch.referral.BranchApp"` parameter to your `<application>` definition in **AndroidManifest.xml**:

{% highlight xml %}
<application
    android:name="io.branch.referral.BranchApp">
{% endhighlight %}

[Back to the Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/android/#enable-auto-session-management)

## Supporting pre-15 Android

After and including SDK version `v2.0`, Branch only supports `minSdkVersion` 15 or above. If you need to support pre-15, you should lock to the Branch SDK version v1.14.5 and add methods in both `onStart()` and `onStop()` to avoid strange, difficult-to-diagnose behavior. Branch must know when the app opens or closes to properly handle the deep link parameters retrieval.

Please add this to every Activity for pre-15 support.

{% highlight java %}
@Override
protected void onStart() {
    super.onStart();
    Branch.getInstance(getApplicationContext()).initSession();
}

@Override
protected void onStop() {
    super.onStop();
    branch.closeSession();
}
{% endhighlight %}

[Back to the Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/android#enable-auto-session-management)

## Custom Install Referrer class

Google only allows one `BroadcastReceiver` class per application. If you already receive the install referrer for other purposes, you will need to create a custom receiver class in your `AndroidManifest.xml`:

{% highlight xml %}
<receiver android:name="com.myapp.CustomInstallListener" android:exported="true">
  <intent-filter>
    <action android:name="com.android.vending.INSTALL_REFERRER" />
  </intent-filter>
</receiver>
{% endhighlight %}

Then create an instance of `io.branch.referral.InstallListener` in `onReceive` and call this:

{% highlight java %}
InstallListener listener = new InstallListener();
listener.onReceive(context, intent);
{% endhighlight %}

[Back to the Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/android#register-for-google-play-install-referrer)

{% elsif page.xamarin %}

<!--Moved to Github README-->

{% else %}

{% endif %}

{% if page.android or page.mparticle_android %}{% else %}

## {% if page.ios or page.mparticle_ios %}{% else %}iOS: {% endif %}Submitting to the App Store

After integrating the Branch SDK, you need to let Apple know that you use the IDFA. To follow proper protocol when submitting your next release to the App Store, you should:

1. Answer `Yes` to the question **Does this app use the Advertising Identifier (IDFA)?**
1. Check the two boxes for:
   - **Attribute this app installation to a previously served advertisement**
   - **Attribute an action taken within this app to a previously served advertisement**

{% image src='/img/pages/getting-started/submitting-apps/idfa.png' center full alt='IDFA configuration on iTunes Connect' %}

{% protip title="Why does Branch use the IDFA?" %}
Branch uses the IDFA to identify users across our entire partner network, greatly increasing match accuracy rate. You can read more about this on the [Matching accuracy page]({{base.url}}/getting-started/matching-accuracy){:target="_blank"}.

You do not need to perform these steps if you installed the Branch framework manually and elected **not** to import `AdSupport.framework` or via Cocoapods and chose the Branch/without-IDFA subspec.
{% endprotip %}

{% endif %}

{% if page.mparticle_android %}

## Submitting to the Play Store

If you'd like Branch to collect the [Google Advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248) for advertising or tracking purposes instead of the Android ID, you must add Google Play Services to your app prior to release. After you complete these steps, Branch will handle the rest!

1. Add `compile 'com.google.android.gms:play-services-ads:9+'` or greater version to the dependencies section of your `build.gradle` file. You might already have it.
1. Add the following line in your Proguard settings:

{% highlight xml %}
-keep class com.google.android.gms.ads.identifier.** { *; }
{% endhighlight %}

{% endif %}

{% endif %}
