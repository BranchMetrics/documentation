---
type: recipe
directory: cross-channel-analytics
title: Growth Attribution
page_title: Growth attribution in the Branch dashboard
description: "Use the Branch dashboard to grow your app with event and user identity tracking"
android_description: "Learn about some advanced features of the Branch dashboard: How to set up a custom link domain and identify your best users."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
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
alias: [ /getting-started/setting-identities/, /getting-started/growth-attribution/guide/, /getting-started/growth-attribution/guide/ios/, /getting-started/growth-attribution/guide/android/, /getting-started/growth-attribution/guide/cordova/, /getting-started/growth-attribution/guide/xamarin/, /getting-started/growth-attribution/guide/unity/, /getting-started/growth-attribution/guide/adobe/, /getting-started/growth-attribution/guide/titanium/, /getting-started/growth-attribution/guide/react/ ]
redirect: https://docs.branch.io/pages/dashboard/analytics/#user-value-attribution
---

{% ingredient quickstart-prerequisite %}{% endingredient %}

You can measure your app growth in the [Dashboard](https://dashboard.branch.io){:target="_blank"} through automatic event tracking and user identity tracking.

## Automatic event tracking

Branch _automatically_ creates events whenever a user accesses your site or your app. We measure installs, re-opens and web page visits with separate events. Here is a list of the auto-created ones:

| Event | Description
| --- | ---
| `install` | Triggered the first time a user launches your app
| `open` | Triggered whenever the app becomes active (includes reinstalls)
| `referred session` | Triggered *in addition* to install, open or web session start if a user comes from a Branch link
| `web session start` | Triggered when the user views a webpage using the Branch Web SDK.

{% protip title="Receiving Postbacks" %}
You can be notified via a postback to your server every time that an event occurs. Visit the [Webhooks](/getting-started/webhooks/) page for more information on configuring postbacks.
{% endprotip %}

You can also define as many custom events (signups, purchases, shares, etc.) as you wish - see the [User Value Attribution]({{base.url}}/getting-started/user-value-attribution) guide for more on tracking custom events. You can see these events as they occur on the [Live View > Events](https://dashboard.branch.io/#/liveview/events/view){:target="_blank"} page.

## Setting identities

Identifying your users will help you associate all activities and links created to a particular person. This can show you which of your users are the most influential.

{% if page.ios %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
// your app's userId, 127 chars or less
[[Branch getInstance] setIdentity:@"your user id"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
// your app's userId, 127 chars or less
Branch.getInstance().setIdentity("your user id")
{% endhighlight %}
{% endtab %}
{% endtabs %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] logout];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().logout()
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- iOS identify and logout -->

{% if page.android %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight java %}
// your app's userId, 127 chars or less
Branch.getInstance().setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight java %}
Branch.getInstance().logout();
{% endhighlight %}
{% endif %}
<!--- Android identify and logout -->

{% if page.cordova %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
Branch.setIdentity("your user id").then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.error(err);
});
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
Branch.logout();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}

### Log in

Add a `SetIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `SetIdentityAsync` when the user first logs in. We will cache the identity for future sessions.

{% highlight c# %}
Branch branch = Branch.GetInstance ();
branch.SetIdentity("your user id", this);
{% endhighlight %}

### Log out

Add a `LogoutAsync` call anywhere you allow the user to logout. `LogoutAsync` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `LogoutAsync` can likewise lead to bugs if multiple users log in on the same device.

{% highlight c# %}
Branch.GetInstance(getApplicationContext()).LogoutAsync(this);
{% endhighlight %}

{% endif %}

{% if page.unity %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight c# %}
Branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight c# %}
Branch.logout();
{% endhighlight %}
{% endif %}

{% if page.adobe %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight java %}
branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight java %}
branch.logout();
{% endhighlight %}
{% endif %}

{% if page.titanium %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
branch.logout();
{% endhighlight %}
{% endif %}

{% if page.react %}

## Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
branch.setIdentity("your user id");
{% endhighlight %}

## Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
branch.logout();
{% endhighlight %}
{% endif %}

{% caution %}

The length of the User ID you assign to identify your users should not be more than 127 characters.

{% endcaution %}

{% protip title="Retroactive event attribution" %}
The **first** time an identity is set for each unique user ID, it will retroactively associate any previously recorded events from the current device with that user ID. This only occurs once.
{% endprotip %}

## Measuring influencers

The [Influencers page](https://dashboard.branch.io/#/referrals/influencers){:target="_blank"} on the dashboard will show you who is driving the most new signups.

{% image src='/img/pages/getting-started/growth-attribution/influencers.png' full center alt='analytics filtering options' %}

{% protip %}
You must [identify your users](/cross-channel-analytics/growth-attribution/guide/ios/#setting-identities) in order for the `User ID` column to be populated. The `Branch ID` refers to the internal Branch ID associated with that user. It is set automatically in the SDK.
{% endprotip %}
