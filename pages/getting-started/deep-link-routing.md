---
type: recipe
directory: getting-started
title: "4. Deep Link Routing"
page_title: Set up deep link routing in your app
description: This page will tell you how to set up your Android, iOS, Cordova, Phonegap, Xamarin, Unity, Air, Titanium, or React Native app for deep link routing.
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
sections:
- overview
- guide
- advanced
redirect: https://docs.branch.io/pages/deep-linking/routing/#overview
---

{% if page.overview %}

When a Branch link is opened, either your app launches or users are taken to the App/Play store to download it. Deep links improve this process by routing users directly to specific content after your app launches. With Branch, this still works even if users have to stop and download the app first (a.k.a., "deferred deep links").

Deep links are an incredibly important part of delivering a high quality user experience. With deep links, you can take users to the exact thing they clicked on or even offer a customized onboarding experience.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## Building a custom deep link routing method

{% if page.ios %}

Inside the `andRegisterDeepLinkHandler` callback in your AppDelegate, you will want to examine the params dictionary to determine whether the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  // initialize the session, setup a deep link handler
  [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                          andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {

    // start setting up the view controller hierarchy
    UINavigationController *navC = (UINavigationController *)self.window.rootViewController;
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    UIViewController *nextVC;

    // If the key 'pictureId' is present in the deep link dictionary
    // then load the picture screen with the appropriate picture
    NSString *pictureId = [params objectForKey:@"pictureId"];
    if (pictureId) {
      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"PicVC"];
      [nextVC setNextPictureId:pictureId];
    } else {
      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
    }

    // navigate!
    [navC setViewControllers:@[nextVC] animated:YES];
  }];

  return YES;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    let branch: Branch = Branch.getInstance()
		branch.initSession(launchOptions: launchOptions, andRegisterDeepLinkHandler: {params, error in
        // If the key 'pictureId' is present in the deep link dictionary
        if error == nil && params["+clicked_branch_link"] != nil && params["pictureId"] != nil {
            print("clicked picture link!")
            // load the view to show the picture
        } else {
            // load your normal view
        }
    })
    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android %}

Inside `onStart` in the Activity that initializes Branch, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight java %}

@Override
public void onStart() {
    super.onStart();

    Branch branch = Branch.getInstance();

    // If NOT using automatic session management
    // Branch branch = Branch.getInstance(getApplicationContext());

    branch.initSession(new BranchReferralInitListener(){
        @Override
        public void onInitFinished(JSONObject referringParams, Branch.BranchError error) {
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked before showing up
                // params will be empty if no data found
                String pictureID = referringParams.optString("picture_id", "");
                if (pictureID.equals("")) {
                    startActivity(new Intent(this, HomeActivity.class));
                }
                else {
                    Intent i = new Intent(this, ViewerActivity.class);
                    i.putExtra("picture_id", pictureID);
                    startActivity(i);
                }
            } else {
                Log.e("MyApp", error.getMessage());
            }
        }
    }, this.getIntent().getData(), this);
}
{% endhighlight %}

{% endif %}

{% if page.cordova %}

Inside the callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight js %}
// for development and debugging only
Branch.setDebug(true);

// sync with Mixpanel if installed
Branch.setMixpanelToken('your_mixpanel_token');

// Branch initialization
Branch.initSession(function(data) {
  // read deep link data on click
  alert('Deep Link Data: ' + JSON.stringify(data)); 
}).then(function(res) {
  alert('Response: ' + JSON.stringify(res));
}).catch(function(err) {
  alert('Error: ' + JSON.stringify(err));
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}
Inside the `InitSessionComplete` callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight c# %}
public class App : Application, IBranchSessionInterface
{
    public void InitSessionComplete (Dictionary<string, object> data)
    {
        if (data.ContainsKey("picture_id")) {
            // load the view to show the picture
        } else {
            // load your normal view
        }
    }
}
{% endhighlight %}

{% endif %}

{% if page.unity %}
Inside the `initSession` callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight c# %}
public class MyCoolBehaviorScript : MonoBehaviour {
    void Start () {
        Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
            if (parameters.ContainsKey("picture_id") {
                // load the view to show the picture
            } else {
                // load your normal view
            }
        });
    }
}
{% endhighlight %}
{% endif %}

{% if page.adobe %}
Inside the `initSuccessed` callback, when Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight java %}
private function initSuccessed(bEvt:BranchEvent):void {
    var referringParams:Object = JSON.parse(bEvt.informations);
    if (referringParams.picture_id) {
        // load the view to show the picture
    } else {
        // load your normal view
    }
}
{% endhighlight %}
{% endif %}

{% if page.titanium %}
Inside the callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight js %}
branch.getAutoSession();
{% endhighlight %}

To implement the callback, you must add a listener to the event `bio:initSession`.

{% highlight js %}
branch.addEventListener("bio:initSession", $.onInitSessionFinished);
{% endhighlight %}

{% highlight js %}
$.onInitSessionFinished = function(data) {
    Ti.API.info("inside onInitSessionFinished");
    for (key in data) {
        if ((key != "type" && key != "source" && key != "bubbles" && key != "cancelBubble") && data[key] != null) {
            Ti.API.info(key + data["key"]);
        }
    }

    if (data["picture_id"]) {
        // load the view to show the picture
    } else {
        // load your normal view
    }
}
{% endhighlight %}
{% endif %}

{% if page.react %}
Inside the callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight js %}
import branch from 'react-native-branch'

//Receives the initSession's result as soon as it becomes available
// Subscribe to incoming links (both branch & non-branch)
branch.subscribe((bundle) => {
  if (bundle && bundle.params && !bundle.error) {
    // grab deep link data and route appropriately.
  }
})
{% endhighlight %}

{% endif %}

{% if page.mparticle_ios %}
{% tabs %}
{% tab objective-c %}
Inside the callback for `checkForDeferredDeepLinkWithCompletionHandler` method in your AppDelegate, examine the params dictionary to determine whether the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight objc %}
- (void)checkForDeeplink {
    MParticle * mParticle = [MParticle sharedInstance];

    [mParticle checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
        if (params) {
                // Start setting up the view controller hierarchy
                UINavigationController *navC = (UINavigationController *)self.window.rootViewController;
                UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
                UIViewController *nextVC;

                // If the key 'pictureId' is present in the deep link dictionary
                // then load the picture screen with the appropriate picture
                NSString *pictureId = [params objectForKey:@"pictureId"];

                if (pictureId) {
                    nextVC = [storyboard instantiateViewControllerWithIdentifier:@"PicVC"];
                    [nextVC setNextPictureId:pictureId];
                } else {
                    nextVC = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
                }

                // navigate!
                [navC setViewControllers:@[nextVC] animated:YES];
            }
    }];
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
Inside the callback for `checkForDeferredDeepLink` method in your AppDelegate, examine the linkInfo dictionary to determine whether the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight swift %}
func checkForDeepLink() {
    MParticle.sharedInstance().checkForDeferredDeepLink { linkInfo, error in
        guard let linkInfo = linkInfo else {return }

        if error == nil && linkInfo["+clicked_branch_link"] != nil && linkInfo["pictureId"] != nil {
            print("Clicked picture link!")

            // Load the view to show the picture
        } else {
            // Load your normal view
        }
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.mparticle_android %}
Inside the callback for your call to `checkDeeplink`, examine the `DeepLinkResult` to determine whether the user opened a link to content. Below is an example assuming that the links correspond to pictures.
{% highlight java %}
@Override
public void onStart() {}
  MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
    @Override
    public void onResult(DeepLinkResult result) {
        String pictureId = result.getParameters().get("picture_id");

        if ((pictureId != null) && (!pictureId.equals("")) {
            Intent i = new Intent(this, ViewerActivity.class);
            i.putExtra("picture_id", pictureId);
            startActivity(i);
        } else {
            startActivity(new Intent(this, HomeActivity.class));
        }
    }

    @Override
    public void onError(DeepLinkError error) {
        //if an integration has an error, it will be surfaced via a DeepLinkError.
        Log.d("my log tag", error.toString());
    }
  });
}
{% endhighlight %}
{% endif %}

{% if page.android or page.mparticle_android %}

## Be notified when deep link Activity finishes

In your Manifest, you can specify a custom code for the deep link Activity like so:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
{% endhighlight %}

To be notified when the deep link Activity finishes, use the `onActivityResult` parameter to check for the custom code you inserted in the Manifest:

{% highlight java %}
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);

	//Checking if the previous activity is launched on branch Auto deep link.
	if(requestCode == getResources().getInteger(R.integer.AutoDeeplinkRequestCode)){
		//Decide here where  to navigate  when an auto deep linked activity finishes.
		//For e.g. Go to HomeActivity or a  SignUp Activity.
		Intent i = new Intent(getApplicationContext(), CreditHistoryActivity.class);
		startActivity(i);
	}
}
{% endhighlight %}

{% endif %}

## Branch-provided data parameters in callback

In addition to any custom key/value pairs specified in the link data dictionary, Branch also returns some other useful parameters every time a session is initialized. These parameters will be returned every time `initSession` is called, even if the user has not clicked on a Branch link. Here is a list, and a description of what each represents.

* `~` denotes analytics
* `+` denotes information added by Branch
* (for the curious, `$` denotes reserved keywords used for controlling how the Branch service behaves. Read more about control parameters on the [Configuring Links page]({{base.url}}/getting-started/configuring-links))


| **Parameter** | **Meaning** |
| ---: | --- |
| **~channel** | The channel on which the link was shared, specified at link creation time
| **~feature** | The feature, such as `invite` or `share`, specified at link creation time
| **~tags** | Any tags, specified at link creation time
| **~campaign** | The campaign the link is associated with, specified at link creation time
| **~stage** | The stage, specified at link creation time
| **~creation_source** | Where the link was created ('API', 'Dashboard', 'SDK', 'iOS SDK', 'Android SDK', or 'Web SDK')
| **~referring_link** | The referring link that drove the install/open, if present
| **~id** | Automatically generated 18 digit ID number for the link that drove the install/open, if present (0 for dynamic and 3P links)
| **+match_guaranteed** | True or false as to whether the match was made with 100% accuracy
| **+referrer** | The referrer for the link click, if a link was clicked
| **+phone_number** | The phone number of the user, if the user texted himself/herself the app
| **+is_first_session** | Denotes whether this is the first session (install) or any other session (open)
| **+clicked_branch_link** | Denotes whether or not the user clicked a Branch link that triggered this session
| **+click_timestamp** | Epoch timestamp of when the click occurred
| **+url** | The full URL of the link that drove the install/open, if present (e.g. bnc.lt/m/abcde12345)

## Support existing deep link routes

If your app already supports deep linking using URI paths, you can populate the `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` link parameters with the URI path of the content to be displayed within the app. When the Branch SDK receives a link containing one of these parameters it will automatically load the specified URI path.

{% if page.android or page.mparticle_android %}

In your app's Manifest, add this meta-data key to the definition of the Activity you want to show when a link to content is opened:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_path" android:value="custom/path/*,another/path/" />
{% endhighlight %}

{% endif %}
{% if page.android or page.mparticle_android %}{% else %}

{% caution title="Incomplete support on iOS" %}
[Universal Links]({{base.url}}/getting-started/universal-app-links) and [Spotlight]({{base.url}}/features/spotlight-indexing) do not support deep linking via URI paths. If you use `$deeplink_path` or `$ios_deeplink_path`, you will need to implement some custom logic. [Click here for more information]({{base.url}}/getting-started/universal-app-links/advanced/ios/#how-to-handle-uri-paths-with-universal-links).
{% endcaution %}

{% endif %}

### How to insert custom deep link routes into a Branch link

All of the examples below create links that will cause Branch to display `myapp://content/1234` after launch.

{% example title="When creating links dynamically" %}

If you're creating a link by appending query parameters, just append the control parameters to the URL. Please make sure to URL encode everything, lest the link will break.

{% highlight javascript %}
"https://[branchsubdomain]?%24deeplink_path=content%2F1234"
{% endhighlight %}

{% endexample %}

{% example title="When using a mobile SDK" %}

When you create links via a mobile SDK, you simply need to set the control parameters.

{% if page.ios or page.mparticle_ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$deeplink_path" withValue:@"content/1234"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$deeplink_path", withValue: "content/1234")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android or page.mparticle_android %}

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$deeplink_path", "content/1234");
{% endhighlight %}

{% endif %}

<!--- Cordova -->

{% if page.cordova %}

{% highlight js %}
// optional fields
var analytics = {
    channel: 'channel',
    feature: 'feature',
    campaign: 'campaign',
    stage: 'stage',
    tags: ['one', 'two', 'three']
};

// optional fields
var properties = {
    $fallback_url: 'http://www.example.com/fallback',
    $desktop_url: 'http://www.example.com/desktop',
    $android_url: 'http://www.example.com/android',
    $ios_url: 'http://www.example.com/ios',
    $ipad_url: 'http://www.example.com/ipad',
    $deeplink_path: 'content/123',
    more_custom: 'data',
    even_more_custom: true,
    this_is_custom: 321
};

branchUniversalObj.generateShortUrl(analytics, properties).then(function(res) {
    alert('Response: ' + JSON.stringify(res.url));
}).catch(function(err) {
    alert('Error: ' + JSON.stringify(err));
});
{% endhighlight %}
{% endif %}

<!--- Xamarin -->

{% if page.xamarin %}
{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$deeplink_path", "content/1234");
{% endhighlight %}
{% endif %}

<!--- Unity -->

{% if page.unity %}

{% highlight objective-c %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$deeplink_path", "content/1234");
{% endhighlight %}

{% endif %}

<!--- Adobe -->

{% if page.adobe %}

{% highlight java %}
var dataToInclude:Object = {
	"article_id": "1234",
	"$deeplink_path": "content/1234"
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
}, {
  "$deeplink_path" : "content/1234",
});
{% endhighlight %}

{% endif %}

<!--- React -->

{% if page.react %}

{% highlight js %}
let linkProperties = {
  feature: 'share',
  channel: 'facebook'
}

let controlParams = {
  $desktop_url: 'http://desktop-url.com/monster/12345'
}

let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

{% endif %}

{% endexample %}

{% example title="When creating Quick Links on the Branch dashboard" %}

You can specify the control parameters for individual Quick Links by inserting the keys and values into the _Deep Link Data (Advanced)_ section.

{% image src='/img/pages/getting-started/deep-link-routing/deep-link_path.png' 3-quarters center alt='deeplink path' %}

{% endexample %}

## Retrieve deep link params after initialization

You can retrieve the deep link data at any time from the Branch singleton by calling one of the below methods.

### Get current referring params

This returns the latest set of deep link data from the most recent link that was clicked. If you minimize the app and reopen it, the session will be cleared and so will this data.

{% if page.ios or page.mparticle_ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
NSDictionary *params = [[Branch getInstance] getLatestReferringParams];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let sessionParams = Branch.getInstance().getLatestReferringParams()
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android or page.mparticle_android %}
{% highlight java %}
JSONObject sessionParams = Branch.get{% if page.mparticle_android %}Auto{% endif %}Instance().getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
Branch.getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> sessionParams = branch.GetLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> sessionParams = Branch.getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
var sessionParams:String = branch.getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
var sessionParams = branch.getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight js %}
let lastParams = await branch.getLatestReferringParams()
{% endhighlight %}
{% endif %}

### Get first referring params

This returns the first set of deep link data that ever referred the user. Once it's been set for a given user, it can never be updated. This is useful for referral programs.

{% if page.ios or page.mparticle_ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
NSDictionary *params = [[Branch getInstance] getFirstReferringParams];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let firstParams = Branch.getInstance().getFirstReferringParams()
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android or page.mparticle_android %}
{% highlight java %}
JSONObject installParams = Branch.get{% if page.mparticle_android %}Auto{% endif %}Instance().getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
Branch.getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> installParams = branch.GetFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> installParams = Branch.getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
var installParams:String = branch.getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
var installParams = branch.getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight js %}
let installParams = await branch.getFirstReferringParams()
{% endhighlight %}
{% endif %}

{% if page.ios %}
## Branch links in push notifications

You can use Branch links with push notifications. When creating a push notification, you should specify the Branch link in the `userInfo` dictionary. It should be an NSString, and the key in `userInfo` should be Branch. So, for example: `@{ @"branch" : @"https://[branchsubdomain]/ALMc/e03OVEJLUq" }`.

{% ingredient branchsubdomain %}{% endingredient %}

You must also configure your app to allow Branch to handle push notifications:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [[Branch getInstance] handlePushNotification:userInfo];

    // ... handle push notifications that do not include Branch links
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(_ application: UIApplication, didReceiveRemoteNotification launchOptions: [AnyHashable: Any]) -> Void {
    Branch.getInstance().handlePushNotification(userInfo)

    // ... handle push notifications that do not include Branch links
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android or page.mparticle_android %}
## Branch links in GCM push notifications

You can use Branch links inside your GCMs sent from your server, especially if you're looking for a good way to deliver someone to a specific page and want to attribute these "deep linked push notifications" back to a Branch Link. We assume that you've already set up Branch deep linking in the Android SDK.

The specific flow, if done properly, is as follows:

1. Your server creates a message delivered via GCM.
1. Your app locally receives message via Intent.
1. You construct payload and present notification.
1. User clicks, and Branch's SDK handles the rest.

Assuming you have the right permissions for push notifications and can reliably deliver messages, all you need to do is add a key value pair inside your intent as so:

{% highlight java %}

Intent resultIntent = new Intent(this, DeepLinkActivity.class);
intent.putExtra("branch","http://[branchsubdomain]/abcde12345");
PendingIntent resultPendingIntent =  PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);

{% endhighlight %}

If you would like to support push notification based routing while your app already in foreground, please add the following to your notification intent.

{% highlight java %}

intent.putExtra("branch_force_new_session",true);

{% endhighlight %}

And we'll take care of the rest once the user clicks your notification!
{% endif %}

{% elsif page.advanced %}

{% if page.ios %}

{% elsif page.android %}

{% elsif page.mparticle_android %}

{% else %}

{% protip title="Automatic routing not yet available" %}
*Automatic* deep link routing is currently supported in only the native iOS and Android SDKs. Please see the [Guide page]({{base.url}}/getting-started/deep-link-routing/guide/) to set up a custom routing solution.
{% endprotip %}

{% endif %}

{% if page.ios %}

## Configure View Controller to accept deep links

Open the view controller that you want to appear when a user clicks a link. For example, this could be a view to show a product.

Import the Branch framework:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
#import "Branch.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
import Branch
{% endhighlight %}
{% endtab %}
{% endtabs %}

Register your view controller for the delegate `BranchDeepLinkingController`:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
@interface ExampleDeepLinkingController : UIViewController <BranchDeepLinkingController>
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
class ExampleDeepLinkingController: UIViewController, BranchDeepLinkingController {
{% endhighlight %}
{% endtab %}
{% endtabs %}

Receive the delegate method that will be called when the view controller is loaded from a link click:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
@synthesize deepLinkingCompletionDelegate;
- (void)configureControlWithData:(NSDictionary *)data {
	NSString *pictureUrl = data[@"product_picture"];

	// show the picture
	dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
		NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:pictureUrl]];
		UIImage *image = [UIImage imageWithData:imageData];
		dispatch_async(dispatch_get_main_queue(), ^{
			self.productImageView.image = image;
		});
	});
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func configureControl(withData params: [AnyHashable: Any]!) {
    let dict = params as Dictionary
    if dict["product_picture"] != nil {
	   // show the picture
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip title="What is a link data key?" %}
The example key `product_picture` is a parameter from the [data dictionary]({{base.url}}/getting-started/configuring-links) of the link that was clicked, and would have been defined when the link [was created]({{base.url}}/getting-started/creating-links/apps).
{% endprotip %}

Since the view controller is displayed modally, you should add a close button:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (IBAction)closePressed {
    [self.deepLinkingCompletionDelegate deepLinkingControllerCompleted];
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
func closePressed() {
    self.deepLinkingCompletionDelegate!.deepLinkingControllerCompleted()
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Register View Controller for deep link routing

Lastly, you need to tell Branch about the view controller you just configured, and which key it is using from the link's data dictionary.

{% tabs %}
{% tab objective-c %}

In your **AppDelegate.m** file, find this method inside `didFinishLaunchingWithOptions` (you would have added it in the [SDK Configuration Guide]({{base.url}}/getting-started/sdk-integration-guide)):

{% highlight objc %}
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    if (!error && params) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        print(@"params: %@", params.description);
    }
}];
{% endhighlight %}
{% endtab %}

{% tab swift %}

In your **AppDelegate.swift** file, find this method inside `didFinishLaunchingWithOptions` (you would have added it in the [SDK Configuration Guide]({{base.url}}/getting-started/sdk-integration-guide)):

{% highlight swift %}
branch.initSession(launchOptions: launchOptions, deepLinkHandler: { params, error in
    if error == nil {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        print("params: %@", params.description)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

Remove it, and insert this snippet in the same place:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
ExampleDeepLinkingController *controller = [[UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]] instantiateViewControllerWithIdentifier:@"DeepLinkingController"];

[branch registerDeepLinkController:controller forKey:@"product_picture" withPresentation:BNCViewControllerOptionShow];
[branch initSessionWithLaunchOptions:launchOptions automaticallyDisplayDeepLinkController:YES];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
var controller = UIStoryboard.init("Main", NSBundle.mainBundle()).instantiateViewControllerWithIdentifier("DeepLinkingController")

branch.registerDeepLinkController(controller, forKey: "product_picture", withPresentation: .optionShow)
branch.initSession(launchOptions: launchOptions, automaticallyDisplayDeepLinkController: true)
{% endhighlight %}
{% endtab %}
{% endtabs %}

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, the `ExampleDeepLinkingController` view controller will be displayed!

| **Option** | **Meaning** |
| ---: | --- |
| **BNCViewControllerOptionShow** | This option pushes view controller onto the navigation stack in a similar way as the showViewController
| **BNCViewControllerOptionPush** | This option pushes view controller onto the navigation stack in a similar way as the pushViewController
| **BNCViewControllerOptionPresent** | This option presents view controller onto the root view controller of window in a similar way as the presentViewController

{% protip title="Note" %}

**BNCViewControllerOptionShow** or **BNCViewControllerOptionPush** option would only push a view controller if the root view controller of window is of type **UINavigationViewController**. Or else, the view controller would be presented by default.

{% endprotip %}

{% endif %}
{% if page.android or page.mparticle_android %}

## Configure Activity to accept deep links

Open the Activity that you want to appear when a user clicks a link. For example, this could be an Activity to show a product.

Insert the following code snippet to display your content when the Activity is loaded from a link click:

{% highlight java %}
@Override
protected void onResume() {
    super.onResume();
    if (Branch.isAutoDeepLinkLaunch(this)) {
        try {
            String autoDeeplinkedValue = Branch.getInstance().getLatestReferringParams().getString("product_picture");
            launch_mode_txt.setText("Launched by Branch on auto deep linking!"
                    + "\n\n" + autoDeeplinkedValue);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    } else {
        launch_mode_txt.setText("Launched by normal application flow");
    }
}
{% endhighlight %}

{% protip title="What is a link data key?" %}
The example key `product_picture` is a parameter from the [data dictionary]({{base.url}}/getting-started/configuring-links) of the link that was clicked, and would have been defined when the link [was created]({{base.url}}/getting-started/creating-links/apps).
{% endprotip %}

## Register Activity for deep link routing

Lastly, you need to tell Branch about the Activity you just configured, and which key it is using from the link's data dictionary.

In your Manifest file, locate the definition for the Activity above and add this meta-data tag:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_keys" android:value="product_picture" />
{% endhighlight %}

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, this Activity will be displayed!

{% endif %}

## Next steps

Now that your Branch links are set up to send users exactly where they expect to go inside your app, you will want make it easy to [**Create Links**]({{base.url}}/getting-started/creating-links) that do this!


{% endif %}
