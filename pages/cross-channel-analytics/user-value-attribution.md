---
type: recipe
directory: cross-channel-analytics
title: User Value Attribution
page_title: User value attribution in the Branch dashboard
description: "Use the Branch dashboard track high-value users with custom in-app event tracking"
android_description: "Learn about some advanced features of the Branch dashboard: How to set up a custom link domain and identify your best users."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
hide_section_selector: true
platforms:
- ios
- android
- web
- cordova
- xamarin
- unity
- adobe
- titanium
- react
sections:
- guide
contents: list
alias: [ /getting-started/user-value-attribution/, /getting-started/user-value-attribution/guide/, /getting-started/user-value-attribution/guide/ios/, /getting-started/user-value-attribution/guide/android/, /getting-started/user-value-attribution/guide/web/, /getting-started/user-value-attribution/guide/cordova/, /getting-started/user-value-attribution/guide/xamarin/, /getting-started/user-value-attribution/guide/unity/, /getting-started/user-value-attribution/guide/adobe/, /getting-started/user-value-attribution/guide/titanium/, /getting-started/user-value-attribution/guide/react/ ]
redirect: https://docs.branch.io/pages/dashboard/analytics/#user-value-attribution
---

{% ingredient quickstart-prerequisite %}{% endingredient %}

In-app engagement and user value metrics are just as important as the click, install, and re-open metrics that Branch [automatically provides]({{base.url}}/getting-started/growth-attribution#automatic-event-tracking). You can define your own post-install events for Branch to track, and view them in the dashboard.

## Custom event tracking

In addition the default Branch events, you can track any custom user action you wish. Recording a custom event in your app is accomplished via a simple call to the SDK as shown in the examples below.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:"Share Started"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction("Share Started")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.web %}
{% highlight javascript %}
branch.track("Share Started");
{% endhighlight %}
{% endif %}
<!--- /Web -->

{% if page.cordova %}
{% highlight js %}
Branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.UserCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight js %}
branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% caution title="Names reserved for Branch events" %}
`click`, `view`, `served`, `install`, `open`, `install_bypass`, `open_bypass`, `install_assist`, and `open_assist` are reserved for Branch events, and these are filtered out of [custom events in the dashboard](#measuring-custom-events). Please choose distinct names for your custom events.
{% endcaution %}


{% if page.ios %}## Commerce event tracking{% elsif page.android %}## Commerce event tracking{% elsif page.web %}## Commerce event tracking{% endif %}
{% ingredient revenue-snippets %}{% endingredient %}

## Measuring custom events and commerce events

You can see data for one custom event at a time in the dashboard by using the dropdown picker above [Marketing](https://dashboard.branch.io/#/marketing){:target="_blank"} and [Source Analytics](https://dashboard.branch.io/#/analytics/source){:target="_blank"} data. 

{% image src='/img/pages/getting-started/user-value-attribution/events-dropdown.png' third center alt='Branch dashboard' %}

Custom events columns on these pages show total events count and events %, where the percentage is total events over total Branch-referred app sessions (installs + re-opens). You can see these metrics for individual links, campaigns, channels, tags, stages, and features.

{% image src='/img/pages/getting-started/user-value-attribution/custom-events-source.png' full center alt='Branch dashboard' %}

There’s no hard limit to tracking custom events data, but Branch will only allow you to see your first 100 custom events in the Branch dashboard. Most apps track 5-10 of the most important custom events they care about.

{% protip title="What attribution logic does Branch use for reporting on custom events in the dashboard?" %}
 
- *90-day attribution window*: Branch will include counts of events that happen within 90 days of a user’s most recent Branch-referred session.

- *Last-session attribution*: We’ll attribute a custom event to the link click and resulting Branch-referred session that occurs most recently prior to a custom event.

For more information on how Branch attributes custom events, see this [FAQ](https://support.branch.io/solution/articles/6000116662-branch-dashboard-custom-events-overview-and-how-to){:target="_blank"}.

{% endprotip %}

You can also see custom events as they occur on the [Live View > Events](https://dashboard.branch.io/#/liveview/events/view){:target="_blank"} page. 

{% image src='/img/pages/getting-started/user-value-attribution/live-view-events.png' full center alt='Live View Events' %}
