---
type: recipe
directory: marketing-channels
title: "Appboy push service"
page_title: Appboy push service
description: We’ve partnered with Appboy to provide deep linking with Appboy's push service. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Appboy
hide_platform_selector: true
premium: false
sections:
- guide
alias: [ /third-party-integrations/appboy/, /third-party-integrations/appboy/overview/, /third-party-integrations/appboy/guide/, /third-party-integrations/appboy/support/ ] 
redirect: https://docs.branch.io/pages/integrations/appboy
---

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [sign up for an Appboy account](https://dashboard.appboy.com/developers/sign_up) and [install the Appboy SDK](https://documentation.appboy.com/).
- Ensure Appboy's SDK is [collecting the IDFA](https://documentation.appboy.com/iOS/#optional-idfa-collection).

{% endprerequisite %}

## How to use Branch Links to Deep Link from Appboy's In-App Message Campaigns on iOS

1. Ensure that the type of campaign you are running is an **In-App Message** campaign.
2. From Appboy's Dashboard, **Edit** your campaign.
3. From the **Compose** tab scroll down to **iOS**.
4. Within the **On-click Behavior** section, select **Deep Link Into App**.
5. Insert the Branch Quick Link you would like users to get deep linked to.
6. **Update** your campaign.

## Handle Branch links in Appboy delegate

{% tabs %}
{% tab objective-c %}

Open your **AppDelegate.m** file and add the following method (if you completed the SDK Integration Guide of Appboy, this is likely already present).

{% highlight objc %}
- (BOOL)handleAppboyURL:(NSURL *)url fromChannel:(ABKChannel)channel withExtras:(NSDictionary *)extras {
    BOOL handledByBranch = [[Branch getInstance] handleDeepLinkWithNewSession:url];
    if (handledByBranch) {
        return YES;
    }
  // Let Appboy handle links otherwise
    return NO; 
}
{% endhighlight %}
{% endtab %}
{% tab swift %}

Open your **AppDelegate.swift** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight swift %}
func handleAppboyURL(_ url: URL, from channel: ABKChannel, withExtras extras: [AnyHashable : Any]) -> Bool {
    let handleByBranch = Branch.getInstance().handleDeepLinkWithNewSession(url)
    if handleByBranch {
        return true
    }
    // Let Appboy handle links otherwise
    return false
}
{% endhighlight %}
{% endtab %}
{% endtabs %}
