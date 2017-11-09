---
type: recipe
directory: marketing-channels
title: "Android Instant Apps"
page_title: "Deep Linking and Attributing your Android Instant App"
description: A guide to enable Branch links to your Android Instant App, in addition to deferred deep linking to your full Android app.
hide_platform_selector: true
sections:
- overview
- guide
alias: [ /features/android-instant-apps/, /features/android-instant-apps/guide/, ]
redirect: https://docs.branch.io/pages/app-to-app/android-instant-apps
---

{% if page.overview %}

At the 2017 Google IO, Google launched the public version of Instant Apps for developers to adopt and build on. Instant Apps are a way to load a partial section (or `split` as Google refers to them), without the user having to visit the Play Store and install your app. In effect, it's instant access to your native app. If you have been using a website as a fallback when your full Android app is not installed, an Instant App is an alternative. You'll have to choose between mobile web and your Instant App on Android so make sure you plan out your integration!

Branch has made it incredibly easy to start using your basic Branch links in your Instant Apps as shown below. The guide on this page will walk you through the full configuration process to enable Branch in your new Instant App.

{% image src='/img/pages/features/android-instant-apps/android_instant_apps.png' full center alt='instant app diagram' %}

**Note:** This guide is not about how to configure your Android app to be an Instant App. Please see [Google's documentation for detailed instructions](https://developer.android.com/topic/instant-apps/index.html) on how to do this. Come back to this guide when you're ready to enable Branch.

## Why use Branch for your Instant Apps

If you follow Google's guide, they'll have you integrate your own web links as Android App Links, that will trigger Instant Apps. What can Branch do for you then? First off, let me explain how Branch works with Instant Apps. Branch will act as a _new_ web domain that you'll register for Android App Links in addition to your own web domain or as your only domain in the manifest. We act as your link.

Here's a list of the potential use cases for Branch links and Instant Apps:

1. Branch will host personalized web links for you since we provision a custom domain (yourapp.app.link or whitelabeled) for every app. If you don't have a website, this means that we can take care of all your Android App Links needs, automatically configuring and hosting the assetlinks.json file on your behalf.
2. If you have a popular website and have configured Android App Links, you likely don't want 100% of your web links triggering your Instant App. Your Instant App will only support a fraction of your full app functionality. You can configure your Instant App to only trigger on your Branch link domains and paths, then use the usage of Branch to control when users are linked to Instant Apps.
3. Branch can measure and attribute `clicks`, `installs` and custom conversion events back to the Branch tracking link for _all visits to your Instant App_, which are visible on the dashboard.
4. You can use Branch links to deferred deep link from the Android Instant App to the full Android App. You'll likely build a feature that pushes users from the Instant App to the full Android app, and Branch can do its magic on this transition.
5. Branch can measure and attribute `clicks`, `installs` and custom conversion events inside your full native Android App for users who were referred from an Instant App, showing the conversion from click -> Instant App -> Full App on the dashboard.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## Integrating Branch for your Instant App

So you're convinced. Let's get started! If at any time, you need a real example, you can check out a [full demo application](https://github.com/BranchMetrics/Branch-Monster-Factory-Example-Android-Instant-Apps) on our Github. We've replicated our [original Android demo application](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android) and modified it to support Android Instant Apps.

## Initialize the Branch SDK

Head to your _core library project_, where your Application class is defined and drop in the snippet of code to the onCreate() method as follows. If you plan on deep linking from your Android Instant App to your full Android app after its installed, you'll need to add the line `enablePlayStoreReferrer`. This adds a delay to the initialization to wait for the Google Play Referrer, which can take up to a second.

{% highlight java %}
public void onCreate() {
  super.onCreate();
  // This is needed to deferred deep link from an Android Instant App to a full app
  // It tells the Branch initialization to wait for the Google Play Referrer before proceeding.
  Branch.enablePlayStoreReferrer(1000L);

  // Initialize the Branch SDK
  Branch.getAutoInstance(this);
}
{% endhighlight %}

## Add your Branch keys and register for Install Referrer

Instant Apps can be rather confusing as there are many different manifests, but you want to find the Manifest that contains your `application` tags. Make sure your Application class name is defined here, and then specify the Branch keys _inside_ the `application` element.

{% highlight xml %}
<application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        android:supportsRtl="true"
        android:name=".MyApplication">

  <meta-data android:name="io.branch.sdk.TestMode" android:value="false" /> <!-- Set to true to use Branch_Test_Key -->
  <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_my_live_key" />
  <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_my_test_key" />

  <receiver android:name="io.branch.referral.InstallListener" android:exported="true">
    <intent-filter>
       <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
  </receiver>
</application>
{% endhighlight %}

## Configure your Branch links as Android App Links

This guide presumes that you've already configured Branch for Android App Links in the past. If you haven't configured your full native app to use Branch as Android App Links, [please complete this guide]({{base.url}}/getting-started/universal-app-links/guide/android/) which will correctly configure the dashboard and manifest.

Now, you simply need to edit the above manifest and paste in the following snippet _inside_ the `application` element. Then you'll need to replace the `xxxx` with your own custom subdomain which will be visible on [the Branch link settings dashboard](https://dashboard.branch.io/link-settings) at the bottom of the page. If you're using a custom subdomain, you can find the advanced instructions in the above link regarding configuring Android App Links.

{% highlight xml %}
<application
  ......>

  ......

  <intent-filter android:autoVerify="true">
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="https" android:host="xxxx.app.link" />
      <data android:scheme="https" android:host="xxxx-alternate.app.link" />
  </intent-filter>

</application>
{% endhighlight %}

## Retrieve Branch deep link data

Add Branch initSession in Activities which are configured to open from a link click in order to receive the deep link params. This will return the deep link data from the referring link.

{% highlight java %}
protected void onStart() {
	super.onStart();
	Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
		@Override
		public void onInitFinished(JSONObject referringParams, BranchError error) {
			Log.d("Branch", "onInitFinished() with deep link data: " + referringParams);
		}
	});
}
{% endhighlight %}

## Configure the deep linking from Instant App to your Full App

Now, the user has arrived in your Instant App and you're ready to convert them to install your full native app. Don't worry, Branch as got your covered! We have overridden the default `showInstallPrompt` with a method that auto configures the Google Play prompt with all of the deep link data you need to carry context through install. Additionally, we can provide you the full set of attribution on how many users conver through this prompt.

Branch SDK provides convenient methods to check for app types and full app conversion. This eliminates the dependency on Google IA support SDK ('com.google.android.instantapp'). Here are some of the methods that makes life easy

- `Branch#isInstantApp()`

This convenience methods checks whether the current version of app running is Instant App or Full Android App to allow you convenience

- `Branch#showInstallPrompt()`

This methods shows an install prompt for the full Android app, allowing you an easy way to pass Branch referring deep data to the full app through the install process. Similar to how deferred deep linking works for Branch normally, the full app will receive the deep link params in the handle callback.

The below example shows how to create a custom Branch Universal Object, the associate it with the installation prompt that will be passed through to your full native Android app after the user installs.

{% highlight java %}
if (Branch.isInstantApp(this)) {
  myFullAppInstallButton.setVisibility(View.VISIBLE);
  myFullAppInstallButton.setOnClickListener(new OnClickListener() {
    @Override
    public void onClick(View v) {
       BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
            .setCanonicalIdentifier("item/12345")
            .setTitle("My Content Title")
            .setContentDescription("My Content Description")
            .setContentImageUrl("https://example.com/mycontent-12345.png")
            .addContentMetadata("property1", "blue")
            .addContentMetadata("property2", "red");

      Branch.showInstallPrompt(myActivity, activity_ret_code, branchUniversalObject);
    }
  });
} else {
  myFullAppInstallButton.setVisibility(View.GONE);
}
{% endhighlight %}

## Test Instant Apps

You can create Branch links in [a million different ways]({{base.url}}/getting-started/creating-links/overview/), but to quickly test your Branch integration, head to the [quick links section](https://dashboard.branch.io/quick-links) on our dashboard and create a link. If you configured deep linking via a specific key in the deep link data, make sure that you add it to your quick link to properly simulate a real live Branch link.

{% endif %}
