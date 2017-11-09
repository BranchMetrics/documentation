---
type: recipe
directory: marketing-channels
title: "Referral Programs"
page_title: Creating referral programs for apps
description: How to set up App Invites, Referral Links and Reward Schemes for apps using deep links.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Referral Links, App Invites, Reward Schemes, Promotion codes, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Referral Links, App Invites, Reward Schemes, Promotion codes, Android
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
- overview
- guide
alias: [ /features/referral-programs/overview/, /features/referral-programs/overview/, /features/referral-programs/advanced/ios/, /features/referral-programs/advanced/android/, /features/referral-programs/advanced/cordova/, /features/referral-programs/advanced/xamarin/, /features/referral-programs/advanced/unity/, /features/referral-programs/advanced/titanium/, /features/referral-programs/advanced/react/ ]
redirect: https://docs.branch.io/pages/viral/referrals/
---

{% if page.overview %}

Branch allows you to reward users with credits, track those credits, and redeem them when appropriate. It is a unit-less currency available to your users without you having to build a system from scratch.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- You need to [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You should [identify your users]({{base.url}}/cross-channel-analytics/growth-attribution/guide/ios/#setting-identities) on both log in and log out.
- Your users should be able to [create links in your app]({{base.url}}/getting-started/creating-links/apps) so we can track referred-referring relationships.

{% endprerequisite %}

With every event that is recorded in Branch, we check automatically if that event is eligible for credits based on the rules that you configured, then deposit the credits if so. Reward rules can be based on both [automatic events](/getting-started/tracking-events#automatic-events) and [custom events](/getting-started/tracking-events#custom-events).

{% caution title="If you identify your users" %}
Because we do not merge identities, you should set rewards on custom events instead of using the events we automatically track (`install` and `open`), and do so only *after* you have identified a user using our [identity methods](/cross-channel-analytics/growth-attribution/guide/ios/#setting-identities). This will help avoid duplicate rewards and missing credits.
{% endcaution %}

## Awarding credits

{% protip title="Referral Fraud Protection" %}
Branch tracks the hardware ID and IDFA of every device we detect, and ties these to our concept of a user identity. However, this means that you may run into issues if you test repeatedly with the same devices. When testing referral programs and reward rules, you should [use debug mode](/getting-started/integration-testing#use-debug-mode-to-simulate-fresh-installs).
{% endprotip %}

To add a rule, go to the Dashboard Referrals page and click the [Rules tab](https://dashboard.branch.io/#/referrals/rules). Click the green "+ Add a new rule" button. Once there, you can select between two options:

### Give reward

You can automatically give awards based on events taken by users.

Properties you can define:

1. Who gets a reward
1. How many credits the reward is
1. Which `bucket` the credits go to
1. Whether the reward occurs the first time or every time
1. Which event triggers the reward

{% example %}
Let's say you want to give 10 credits to each new user who signs up through a friend, and 5 credits to the friend who referred him or her. That can be done through a combination of two rules:

### Rule 1: rewarding the referred user 10 credits

1. Who gets a reward: **"Referred acting users"**
1. How many credits the reward is: **10**
1. Which bucket the credits go to: **default**
1. Whether the reward occurs the first time or every time: **the first time**
1. Which event triggers the reward: **install**

{% image src='/img/pages/features/referral-programs/referred_rule.png' center 3-quarters alt='referred used' %}

### Rule 2: rewarding the referring user 5 credits

1. Who gets a reward: **"Referring users"**
1. How many credits the reward is: **5**
1. Which bucket the credits go to: **default**
1. Whether the reward occurs the first time or every time: **the first time**
1. Which event triggers the reward: **install**

{% image src='/img/pages/features/referral-programs/referring_rule.png' center 3-quarters alt='referring user' %}

{% endexample %}

### Promo code

Our promo code functionality was removed in iOS SDK version 0.12.4 and Android SDK version 2.0.0. The system still works but we will no longer be providing support or updates to this service. This tab will remain present to support legacy integrations dependent on promo code functionality.

## Viewing Credits

{% if page.react %}

Once users have credits, they should be able to redeem them. Checking the balance involves loading the most recent balance from the server and then checking the balance.

{% highlight js %}
let rewards = await branch.loadRewards()
{% endhighlight %}

{% else %}

Once users have credits, they should be able to redeem them. Checking the balance involves loading the most recent balance from the server and then checking the balance. These can be two separate steps but for the sake of simplicity we have combined them into one example:

<!-- iOS -->
{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *err) {
    if (!err) {
        NSLog(@"credit: %lu", [[Branch getInstance] getCredits]);
    }
}];
{% endhighlight %}
{% endif %}
<!-- end iOS -->

<!-- Android -->
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).loadRewards(new BranchReferralStateChangedListener() {
	@Override
	public void onStateChanged(boolean changed, Branch.BranchError error) {
		// changed boolean will indicate if the balance changed from what is currently in memory

		// will return the balance of the current user's credits
		int credits = branch.getCredits();
	}
});
{% endhighlight %}
{% endif %}
<!-- end Android -->

{% if page.cordova %}
{% highlight js %}
Branch.loadRewards().then(function (rewards) {
    console.log(rewards);
    // will return the balance of the current user's credits
    var credits = rewards['default'];
}).catch(function (err) {
    console.error(err);
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
branch.LoadRewards(this);
{% endhighlight %}

After you've registered the class as a delegate of `IBranchRewardsInterface`

{% highlight c# %}
#region IBranchRewardsInterface implementation

public void RewardsLoaded ()
{
    Device.BeginInvokeOnMainThread (() => {
    	// will return the balance of the current user's credits
        int credits = Branch.GetInstance().Credits["default"];
    });
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.loadRewards(delegate(bool changed, string error) {
	// will return the balance of the current user's credits
    int credits = Branch.getCredits();
});
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
private function creditSuccess(bEvt:BranchEvent):void {
	// Credits will be string in bEvt.informations.
	trace(bEvt.type, bEvt.informations);
}
{% endhighlight %}

Then register the callback and call `getCredits`

{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.GET_CREDITS_SUCCESSED, creditSuccess);
branch.getCredits();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.credits(function(err, data) {
	if (!err) {
		// will return the balance of the current user's credits
    	var credits = data['default'];
	}
});
{% endhighlight %}
{% endif %}

If you want to see the number of credits in a custom bucket you've specified, such as `myBucket`, then you can do the following:

<!-- iOS -->
{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *err) {
    if (!err) {
        NSString *bucket = @"myBucket";
        NSLog(@"credit for %@ bucket: %lu", bucket, [[Branch getInstance] getCreditsForBucket:bucket]);
    }
}];
{% endhighlight %}
{% endif %}
<!-- end iOS -->
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).loadRewards(new BranchReferralStateChangedListener() {
	@Override
	public void onStateChanged(boolean changed, Branch.BranchError error) {
		// changed boolean will indicate if the balance changed from what is currently in memory

		if (error == null) {
		    String bucket = "myBucket";
		    Branch.getInstance(getApplicationContext()).getCreditsForBucket(bucket);
		}
	}
});
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
Branch.loadRewards().then(function (rewards) {
    console.log(rewards);
    // will return the balance of the current user's credits
    var credits = rewards['myBucket'];
}).catch(function (err) {
    console.error(err);
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
#region IBranchRewardsInterface implementation

public void RewardsLoaded ()
{
    Device.BeginInvokeOnMainThread (() => {
    	// will return the balance of the current user's credits
        int credits = Branch.GetInstance().Credits["myBucket"];
    });
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.loadRewards(delegate(bool changed, string error) {
    // will return the balance of the current user's credits
    int credits = Branch.getCredits("myBucket");
});
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
private function creditSuccess(bEvt:BranchEvent):void {
	// Credits will be string in bEvt.informations.
	trace(bEvt.type, bEvt.informations);
}
{% endhighlight %}

Then register the callback and call `getCredits`

{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.GET_CREDITS_SUCCESSED, creditSuccess);
branch.getCredits("myBucket");
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.loadRewards();
{% endhighlight %}

Then register the callback on event `bio:loadRewards`

{% highlight js %}
branch.addEventListener("bio:loadRewards", $.onLoadRewardFinished);
{% endhighlight %}
{% endif %}

{% endif %}

## Redeeming Credits

{% if page.react %}

When users spend credits, you can make a simple call to redeem their credits.

{% highlight js %}
let redeemResult = await branch.redeemRewards(amount, "default")
{% endhighlight %}

{% else %}

When users spend credits, you can make a simple call to redeem their credits.

{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] redeemRewards:5 callback:^(BOOL success, NSError *error) {
    if (success) {
        NSLog(@"Redeemed 5 credits!");
    }
    else {
        NSLog(@"Failed to redeem credits: %@", error);
    }
}];
{% endhighlight %}
{% endif %}
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).redeemRewards(5);
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
Branch.redeemRewards(5, "default").then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.error(err);
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
branch.RedeemRewards(this, 5, "default");
{% endhighlight %}

After you've registered the class as a delegate of `IBranchRewardsInterface`

{% highlight c# %}
#region IBranchRewardsInterface implementation

public void RewardsRedeemed (string bucket, int count)
{
    Device.BeginInvokeOnMainThread (() => {
        // Do something with the data...
    });
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.redeemRewards(5);
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight c# %}
private function redeemSuccess(bEvt:BranchEvent):void {
    // Successful redemption
}
{% endhighlight %}

Then register the callback and call `redeemRewards`

{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.REDEEM_REWARDS_SUCCESSED, redeemSuccess);
branch.redeemRewards(5);
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.redeem(
    5,          // Amount of credits to be redeemed
    "default"  // String of bucket name to redeem credits from
);
{% endhighlight %}
{% endif %}

If you want to redeem credits in a custom bucket you've specified, such as `myBucket`, then you can do the following:

<!-- iOS -->
{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] redeemRewards:5 forBucket:@"myBucket" callback:^(BOOL success, NSError *error) {
    if (success) {
        NSLog(@"Redeemed 5 credits for myBucket!");
    }
    else {
        NSLog(@"Failed to redeem credits: %@", error);
    }
}];
{% endhighlight %}
{% endif %}
<!-- end iOS -->

<!-- Android -->
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).redeemRewards("myBucket", 5)
{% endhighlight %}
{% endif %}
<!-- end Android -->

{% if page.cordova %}
{% highlight js %}
Branch.redeemRewards(5, "myBucket").then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.error(err);
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
branch.RedeemRewards(this, 5, "myBucket");
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.redeemRewards(5, "myBucket");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.REDEEM_REWARDS_SUCCESSED, redeemSuccess);
branch.redeemRewards(5, "myBucket");
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.redeemRewards(5);
{% endhighlight %}

Then register the callback on event `bio:redeemRewards`

{% highlight js %}
branch.addEventListener("bio:redeemRewards", $.onRedeemRewardFinished);
{% endhighlight %}
{% endif %}

{% example title="Example redemption flow" %}

This is a simple three-part process:

1. Ensure credits are loaded.
1. Call the `redeemRewards` method and show a progress dialog.
1. Show a completion dialog and reflect updates in balance.

{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *error) {
    if (!error && [[Branch getInstance] getCredits] > 5) {
        [[Branch getInstance] redeemRewards:5 callback:^(BOOL success, NSError *err) {
            if (!err) {
                NSInteger newBalance = [[Branch getInstance] getCredits];
                NSString *successMsg = [NSString stringWithFormat:@"You redeemed 5 credits! You have %ld remaining.", (long)newBalance];
                [[[UIAlertView alloc] initWithTitle:@"Success" message:successMsg delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
            }
        }];
    }
}];
{% endhighlight %}

{% endif %}
{% if page.android %}
{% highlight java %}
Branch.getInstance().loadRewards(new BranchReferralStateChangedListener() {
    @Override
    public void onStateChanged(boolean changed, BranchError error) {
        if (error == null && Branch.getInstance().getCredits() > 5) {
            Branch.getInstance().redeemRewards(5);
        }
    }
});
{% endhighlight %}
{% endif %}
{% endexample %}

{% endif %}

{% endif %}
