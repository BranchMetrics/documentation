{% section header %}
### Starting a Branch Session
{% endsection %}

The Branch session starts every single time your app opens up, and checks if the user came from a link. You register a callback method here that will return any deep link parameters upon link click. Please note that the callback function is called 100% of the time, even when the network is out. 

We also bundle in a [bunch of other stuff](#branch-provided-data-parameters-in-callback) that you might find useful.

### Initialize SDK And Register Deep Link Routing Function

<!---    iOS -->
{% if page.ios %}

There are a few pieces of code that must be in place. First, open your project's **AppDelegate.m** (or **AppDelegate.swift**) file.

* Add `#import "Branch.h"` at the top of the file (Objective-C only)
* Find the line which reads:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions:
{% endhighlight %}
{% endtab %}
{% endtabs %}

and paste the following:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
Branch *branch = [Branch getInstance];
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    if (!error) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        NSLog(@"params: %@", params.description);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
For **Swift, you will need to add a bridging header in order to use Branch in your project. For help on adding a bridging header, see [this StackOverflow answer](http://stackoverflow.com/a/28486246/1914567).

{% highlight swift %}
let branch: Branch = Branch.getInstance()
branch.initSessionWithLaunchOptions(launchOptions, andRegisterDeepLinkHandler: { params, error in
    if (error == nil) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        NSLog("params: %@", params.description)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

**NOTE** If you are seeing a "Branch.h file not found" error but you've imported the SDK, or it's breaking during compiling--and you're **using Xcode 6.3 or newer**--[click here](https://support.branch.io/discussions/topics/6000008855).

{% endif %}
<!---    /iOS -->

{% if page.android %}

Open up your **splash activity** (or the activity you registered the intent for above), then add the onStart lifecycle method:

{% highlight java %}
@Override
public void onStart() {
    super.onStart();
    // Lifecycle callback method
}
{% endhighlight %}

Initialize the session and register your deep link router. Take note of how the instance is retrieved. If you are **not** using automatic session management, then you will need to use `getInstance(Context context)`.

{% highlight java %}

Branch branch = Branch.getInstance();

// ONLY use the line below IF you ARE NOT using automatic session management.
// Branch branch = Branch.getInstance(getApplicationContext());

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

{% endhighlight %}

**NOTE** if you're calling this inside a fragment, please use getActivity() instead of passing in `this`. Also, `this.getIntent().getData()` refers to the data associated with an incoming intent.

Next, you'll need to hook into the `onNewIntent` method specified inside the Activity lifecycle and set the intent. This is required for conformity with Facebook's AppLinks.

{% highlight java %}
@Override
public void onNewIntent(Intent intent) {
    this.setIntent(intent);
}
{% endhighlight %}

{% endif %}

{% if page.cordova %}

Initialize the session and register your deep link router. You should call this when the ‘deviceready’ event fires and each time the ‘resume’ event fires. The callback here will contain the deeplink data associated with the link you clicked. You will need your Branch Key from the Branch dashboard.

{% highlight js %}
branch.init("YOUR BRANCH KEY HERE", function(err, data) {
    if (!err && data.data) {
        var parsed_data = JSON.parse(data.data);
        if (parsed_data['+clicked_branch_link']) {
            // data are the deep linked params associated with the link that the user clicked -> was re-directed to this app
            // data will be empty if no data found
            // ... insert custom routing logic here ...
        }
    }
});
{% endhighlight %}

If data is null and err contains a string denoting a request timeout then inspect your app's [content security policies](https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy) as they may block your app from communicating with Branch's servers.

Structure of the callback `data_parsed` object:

{% highlight js %}
{
    data_parsed: {
        '+clicked_branch_link': true | false,
        '+is_first_session': true | false,
        // If the user was referred from a link, and the link has associated data, the data is passed in here.
    },
    referring_identity: '12345',      // If the user was referred from a link, and the link was created by a user with an identity, that identity is here.
}
{% endhighlight %}


**[Formerly `getInstance() and initSession()`](CORDOVA_UPGRADE_GUIDE.md)**

Here is the location of the Branch Key that you will need for the `branch.init` call above (_formerly app id, which is now depreciated_):

![app id](https://raw.githubusercontent.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/master/resources/app_id.png)

The session close will be sent automatically on any 'pause' event.
{% endif %}

{% if page.web %}
### Initialization and Event Handling

You should initialize the Branch SDK session once the 'deviceready' event fires and each time the 'resume' event fires.  See the example code below. You will need your Branch Key from the Branch dashboard.

{% highlight js %}
  branch.init("YOUR BRANCH KEY HERE", function(err, data) {
    app.initComplete(err, data);
  });
{% endhighlight %}

The session close will be sent automatically on any 'pause' event.
{% endif %}

{% if page.cordova or page.titanium or page.web %}

### SDK Method Queue

Initializing the SDK is an asynchronous method with a callback, so it may seem as though you would need to place any method calls that will execute immediately inside the `branch.init()` callback. We've made it even easier than that, by building in a queue to the SDK! The only thing that is required is that `branch.init()` is called prior to any other methods. All SDK methods called are guaranteed to: 1. be executed in the order that they were called, and 2. wait to execute until the previous SDK method finishes. Therefore, it is 100% allowable to do something like:

```js
branch.init(...);
branch.banner(...);
```

If `branch.init()` fails, all subsequent branch methods will fail.
{% endif %}


{% if page.xamarin %}

Before starting, it's important to understand that we require a generic Xamarin initialization in addition to the Android and iOS initialization. That initialization is different depending on whether you're using Xamarin Forms or not. Please click one of the following to be linked to the appropriate init path to follow:

- [Click here](#generic-init-with-forms) if you're using Xamarin Forms
- [Click here](#xamarin-without-forms) if you're not using Xamarin Forms

#### Generic Init with Forms

The following code will make a request to the Branch servers to initialize a new session, and retrieve any referring link parameters if available. Think of `InitSessionComplete` as your "deep link router". If your app opens with some data, you want to route the user depending on the data you passed in. Otherwise, send them to a generic install flow.

This deep link routing callback is called 100% of the time when the app opens, with your link params or an empty dictionary if none present.

{% highlight c# %}
public class App : Application, IBranchSessionInterface
{
    protected override void OnResume ()
    {
        Branch branch = Branch.GetInstance ();
        branch.InitSessionAsync (this);
    }

    protected override async void OnSleep ()
    {
        Branch branch = Branch.GetInstance ();
        // Await here ensure the thread stays alive long enough to complete the close.
        await branch.CloseSessionAsync ();
    }

    #region IBranchSessionInterface implementation

    public void InitSessionComplete (Dictionary<string, object> data)
    {
        // Do something with the referring link data...
    }

    public void CloseSessionComplete ()
    {
        // Handle any additional cleanup after the session is closed
    }

    public void SessionRequestError (BranchError error)
    {
        // Handle the error case here
    }

    #endregion
}
{% endhighlight %}

#### Xamarin Android with Forms

For Android add the call to the `onCreate` of either your Application class or the first Activity you start. This just creates the singleton object with the appropriate Branch key but does not make any server requests. Note also the addition of `OnNewIntent`. This is needed to get the latest link identifier when the app is opened from the background by following a deep link.

{% highlight c# %}
public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
{
    protected override void OnCreate (Bundle savedInstanceState)
    {
        base.OnCreate (savedInstanceState);

        global::Xamarin.Forms.Forms.Init (this, savedInstanceState);

        BranchAndroid.Init (this, "your branch key here", Intent.Data);

        LoadApplication (new App ());
    }

    // Ensure we get the updated link identifier when the app is opened from the
    // background with a new link.
    protected override void OnNewIntent(Intent intent) {
        BranchAndroid.GetInstance().SetNewUrl(intent.Data);
    }
}
{% endhighlight %}

#### Xamarin iOS with Forms

For iOS add the code to your AppDelegate. This just creates the singleton object with the appropriate Branch key but does not make any server requests. Note also the addition of the `OpenUrl` method. This is needed to get the latest link identifier when the app is opened from the background by following a deep link.

{% highlight c# %}
[Register ("AppDelegate")]
public class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
{
    public override bool FinishedLaunching (UIApplication uiApplication, NSDictionary launchOptions)
    {
        global::Xamarin.Forms.Forms.Init ();

        NSUrl url = null;
        if ((launchOptions != null) && launchOptions.ContainsKey(UIApplication.LaunchOptionsUrlKey)) {
            url = (NSUrl)launchOptions.ValueForKey (UIApplication.LaunchOptionsUrlKey);
        }

        BranchIOS.Init ("your branch key here", url);

        LoadApplication (new App ());
        return base.FinishedLaunching (uiApplication, launchOptions);
    }

    // Ensure we get the updated link identifier when the app is opened from the
    // background with a new link.
    public override bool OpenUrl(UIApplication application,
        NSUrl url,
        string sourceApplication,
        NSObject annotation)
    {
        Console.WriteLine ("New URL: " + url.ToString ());
        BranchIOS.getInstance ().SetNewUrl (url);
        return true;
    }
}
{% endhighlight %}

Note that in both cases the first argument is the Branch key found in your app from the Branch dashboard (see the screenshot below).  The second argument allows the Branch SDK to recognize if the application was launched from a content URI.


### Generic init with Forms

The following code will make a request to the Branch servers to initialize a new session, and retrieve any referring link parameters if available. For example, If you created a custom link with your own custom dictionary data, you probably want to know when the user session init finishes, so you can check that data. Think of this callback as your "deep link router". If your app opens with some data, you want to route the user depending on the data you passed in. Otherwise, send them to a generic install flow.

This deep link routing callback is called 100% of the time on init, with your link params or an empty dictionary if none present.

{% highlight csharp %}
public class App : Application, IBranchSessionInterface
{
    protected override void OnResume ()
    {
        Branch branch = Branch.GetInstance ();
        branch.InitSessionAsync (this);
    }
    
    protected override async void OnSleep ()
    {
        Branch branch = Branch.GetInstance ();
        // Await here ensure the thread stays alive long enough to complete the close.
        await branch.CloseSessionAsync ();
    }
    
    #region IBranchSessionInterface implementation
    
    public void InitSessionComplete (Dictionary<string, object> data)
    {
        // Do something with the referring link data...
    }

    public void CloseSessionComplete ()
    {
        // Handle any additional cleanup after the session is closed
    }

    public void SessionRequestError (BranchError error)
    {
        // Handle the error case here
    }

    #endregion
}
{% endhighlight %}

#### Close session

Required: this call will clear the deep link parameters when the app is closed, so they can be refreshed after a new link is clicked or the app is reopened.

In a Forms App CloseSession is done in the OnSleep method of your App class. See the example above.

### Non-Forms Xamarin Setup

The following code will make a request to the Branch servers to initialize a new session, and retrieve any referring link parameters if available. For example, If you created a custom link with your own custom dictionary data, you probably want to know when the user session init finishes, so you can check that data. Think of this callback as your "deep link router". If your app opens with some data, you want to route the user depending on the data you passed in. Otherwise, send them to a generic install flow.

This deep link routing callback is called 100% of the time on init, with your link params or an empty dictionary if none present.

#### iOS without Forms

The iOS device specific code can register notification listeners to handle the init and close of sessions when the app is sent to the background or resumed.  The BranchIOS.Init call takes an optional third parameter that will enable this automatic close session behavior if the parameter is set to true.  If your iOS app is not a Forms app, use the following device specific init.

{% highlight csharp %}
[Register ("AppDelegate")]
public class AppDelegate : UIApplicationDelegate, IBranchSessionInterface
{
    public override bool FinishedLaunching (UIApplication uiApplication, NSDictionary launchOptions)
    {
        NSUrl url = null;
        if ((launchOptions != null) && launchOptions.ContainsKey(UIApplication.LaunchOptionsUrlKey)) {
            url = (NSUrl)launchOptions.ValueForKey (UIApplication.LaunchOptionsUrlKey);
        }

        BranchIOS.Init ("your branch key here", url, true);
        
        Branch branch = Branch.GetInstance ();
        branch.InitSessionAsync (this);

        // Do your remaining launch stuff here...
    }
    
    // Ensure we get the updated link identifier when the app is opened from the
    // background with a new link.
    public override bool OpenUrl(UIApplication application,
        NSUrl url,
        string sourceApplication,
        NSObject annotation)
    {
        BranchIOS.getInstance ().SetNewUrl (url);
        return true;
    }

    #region IBranchSessionInterface implementation
    
    public void InitSessionComplete (Dictionary<string, object> data)
    {
        // Do something with the referring link data...
    }

    public void CloseSessionComplete ()
    {
        // Handle any additional cleanup after the session is closed
    }

    public void SessionRequestError (BranchError error)
    {
        // Handle the error case here
    }

    #endregion
}
{% endhighlight %}

#### Android without Forms

For Android add the call to the onCreate of either your Application class or the first Activity you start. This just creates the singleton object on Android with the appropriate Branch key but does not make any server requests

{% highlight csharp %}
public class MainActivity : Activity, IBranchSessionInterface
{
    protected override void OnCreate (Bundle savedInstanceState)
    {
        base.OnCreate (savedInstanceState);

        global::Xamarin.Forms.Forms.Init (this, savedInstanceState);

        BranchAndroid.Init (this, "your branch key here", Intent.Data);

        Branch branch = Branch.GetInstance ();
        branch.InitSessionAsync (this);

        LoadApplication (new App ());
    }

    protected override void OnStop (Bundle savedInstanceState)
    {
        base.OnStop (savedInstanceState);

        Branch branch = Branch.GetInstance ();
        // Await here ensure the thread stays alive long enough to complete the close.
        await branch.CloseSessionAsync ();
    }
    
    // Ensure we get the updated link identifier when the app is opened from the
    // background with a new link.
    protected override void OnNewIntent(Intent intent) {
        BranchAndroid.GetInstance().SetNewUrl(intent.Data);
    }

    #region IBranchSessionInterface implementation
    
    public void InitSessionComplete (Dictionary<string, object> data)
    {
        // Do something with the referring link data...
    }

    public void CloseSessionComplete ()
    {
        // Handle any additional cleanup after the session is closed
    }

    public void SessionRequestError (BranchError error)
    {
        // Handle the error case here
    }

    #endregion
}
{% endhighlight %}

#### Close session

Required: this call will clear the deep link parameters when the app is closed, so they can be refreshed after a new link is clicked or the app is reopened.

For Android this should be done in OnStop. See the example above.

{% endif %}

{% if page.unity %}
Called when app first initializes a session, ideally in a *class that is initiated with the start of your scene*. 

If you created a custom link with your own custom dictionary data, you probably want to know when the user session init finishes, so you can check that data. Think of this callback as your "deep link router". If your app opens with some data, you want to route the user depending on the data you passed in. Otherwise, send them to a generic install flow.

This deep link routing callback is called 100% of the time on init, with your link params or an empty dictionary if none present.

{% highlight c# %}
using UnityEngine;
using System.Collections.Generic;

public class MyCoolBehaviorScript : MonoBehaviour {
    void Start () {
        Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
            if (error != null) {
                System.Console.WriteLine("Oh no, something went wrong: " + error);
            }
            else if (parameters.Count > 0) {
                System.Console.WriteLine("Branch initialization completed with the following params: " + parameters.Keys);
            }
        });
    }
}
{% endhighlight %}


{% endif %}

{% if page.adobe %}
Inside your `Main.as` make the following import:

{% highlight java %}
import io.branch.nativeExtensions.branch.Branch;
import io.branch.nativeExtensions.branch.BranchEvent;
{% endhighlight %}

Then create a Branch instance:
`var branch:Branch = new Branch();`
Note that Branch is a Singleton, it can only have one instance which can also be used thanks to a static:
`Branch.getInstance();`

{% highlight java %}
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
{% endhighlight %}

Once is done, initialize the SDK:

{% highlight java %}
branch.init();
{% endhighlight %}

Be sure to have the INIT_SUCCESSED event called, otherwise read the bEvt.informations from the INIT_FAILED event.
{% endif %}

{% if page.titanium %}
The SDK can be initialized by calling `branch.init()`, just as with the Web SDK. A sample app can be found in `testbeds/Titanium`, that demonstrates this.

Initialize the session and register your deep link router. The callback here will contain the deeplink data associated with the link you clicked.

{% highlight js %}
branch.init("YOUR BRANCH KEY HERE", function(err, data) {
    if (!err && data.data) {
        var parsed_data = JSON.parse(data.data);
        if (parsed_data['+clicked_branch_link']) {
            // data are the deep linked params associated with the link that the user clicked -> was re-directed to this app
            // data will be empty if no data found
            // ... insert custom routing logic here ...
        }
    }
});
{% endhighlight %}

Structure of the callback `data_parsed` object:

{% highlight js %}
{
    data_parsed: {
        '+clicked_branch_link': true | false,
        '+is_first_session': true | false,
        // If the user was referred from a link, and the link has associated data, the data is passed in here.
    },
    referring_identity: '12345',      // If the user was referred from a link, and the link was created by a user with an identity, that identity is here.
}
{% endhighlight %}

### Close the session

Close session must be called whenever the app goes into the background, as it tells the native library that on the next app open, it should check if a new link had been clicked. If you don't call it, you'll notice that the deep link parameters will not be delivered reliably.

{% highlight js %}
branch.close(function(err) {
  if (err) { console.log(err); }
});
{% endhighlight %}

### Android and iOS differences for init and close

Titanium life cycle events and callbacks differ between Android and iOS.  Since we want to initialize the branch session anytime the app starts up (either on open or when resuming from background) and close the session when the app goes into the background, init and close need to be handled differently for Android and iOS.

Titanium generates a 'pause' and 'resume' event for iOS when the app goes into and returns from the background.  For iOS you can init the session and set event handlers on app startup.  This can be done in alloy.js for an Alloy app.  See the sample code below.

{% highlight js %}

// In the Android case, we get the URL used to open the app here
// but we wait for the Titanium Window, which corresponds to an
// activity, to open to start the session.
if (Ti.Platform.osname === "android") {
    Alloy.Globals.open_url = Ti.Android.currentActivity.intent.data;
}

// If this is not Android, we want to initialize the branch session
// at app startup.  Close it when we go into the background and
// open it again when the app comes back to the foreground.
else if (Ti.Platform.osname.match(/i(os|p(hone|od|ad))/i)) {
    var url = Ti.App.getArguments().url;
    branch.init(BranchKey, { "isReferrable" : true, "url": url }, initDone);

    Ti.App.addEventListener('resume', function(e) {
        console.log("Resume");
        branch.init(BranchKey, { isReferrable : true }, initDone);
    });

    Ti.App.addEventListener('pause', function(e) {
        console.log("Pause");
        branch.close(function(err) {
            if (err) { console.log("Error with close: " + err.message); }
            else { console.log("Close complete"); }
        });
    });
}

{% endhighlight %}

In Android Titanium gives you access to the onStart and onStop Activity life cycle callbacks which are part of the Android environment.  In the Javascript for each Titanium Window, before the window is opened, you can set a callback for these.  You can init the session in onStart and close it in onStop.  The code below is an example from the testbed app.  Note that the SDK will handle detecting the case where these are called in an activity transition and ensure that the session stays open.

{% highlight js %}

// In Android, we start the branch session in onStart and close it
// in onStop.  This should be done in every Window used in the app
// since a Window corresponds to an Android Activity.  The
// SDK will "smartly" handle the case where we are transitioning from
// one activity to another and not send excess inits or close the session
// accidentally.
if (Ti.Platform.osname === "android") {
    $.index.activity.onStart = function() {
        branch.init('BRANCH KEY',
        { "isReferrable" : true, "url": Alloy.Globals.open_url },
        function(err, data) {
            if (err != null) {
                console.log("Init error: " + JSON.stringify(err));
                Alloy.Globals.status = err.message;
            } else {
                console.log("Init successful: " + JSON.stringify(data));
                Alloy.Globals.status = "Ok";
            }
            Ti.App.fireEvent("branch_init");
        });
    };

    $.index.activity.onStop = function() {
        branch.close(function(err) {
            if (err) {
                console.log("Error on close: " + err);
            }
        });
    };
}

{% endhighlight %}
{% endif %}
