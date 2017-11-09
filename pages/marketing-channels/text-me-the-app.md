---
type: recipe
directory: marketing-channels
title: Text Me The App
page_title: Text Me The App web pages for iOS or Android Apps
description: Give your web users the option to text themselves your app with a Text Me The App landing page. Learn how to set up the page and use our code for iOS apps.
android_description: Give your web users the option to text themselves your app with a Text Me The App landing page. Learn how to set it up and use our code for Android apps.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Text-Me-The-App, landing page, SMS, text an app
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Text-Me-The-App, landing page, SMS, text an app, Android
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
alias: [ /features/text-me-the-app/, /features/text-me-the-app/overview/, /features/text-me-the-app/guide/, /features/text-me-the-app/advanced/, /features/text-me-the-app/support/ ]
redirect: https://docs.branch.io/pages/web/text-me-the-app/
---

{% if page.overview %}

When users click your links on desktop, they have the option to text themselves a link to download your app. We provide this by default on every Branch link, but you can also create your own fully-branded Text Me The App page.

_**LEFT:** This default page is provided by Branch. **RIGHT:** This page was created by Drafted._

{% image src="/img/pages/features/text-me-the-app/default-and-drafted.png" center alt="Default and custom SMS pages" %}

{% protip title="Supports international SMS" %}
Branch uses Twilio to send SMS messages. Thanks to Twilio, users can text themselves your app around the world!
{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## Configure custom URL in Branch dashboard

1. Visit the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the Branch dashboard.
1. In the **Desktop** section select Custom Landing Page, and enter the URL on your site that will include a Text Me The App option.

{% image src="/img/pages/features/text-me-the-app/desktop-routing.png" full center alt="Default and custom SMS pages" %}

{% protip title="You may already be done!" %}Branch hosts a basic Text Me The App page for all of your links by default: just select Branch Hosted SMS Landing Page to use it. These steps are only necessary if you want to use a custom page.{% endprotip %}

## Insert SendSMS() snippet into your page

Create a new file at the URL above, and paste the following code snippet into it. This is a fully-functional web page that you can use as a template for your Text Me The App page. Customize to your heart's content.

{% highlight html %}

<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <script type="text/javascript">
            {% ingredient web-sdk-initialization %}{% endingredient %}
            function sendSMS(form) {
                var phone = form.phone.value;
                var linkData = {
                    tags: [],
                    channel: 'Website',
                    feature: 'TextMeTheApp',
                    data: {
                        'foo': 'bar'
                    }
                };
                var options = {};
                var callback = function(err, result) {
                    if (err) {
                        alert("Sorry, something went wrong.");
                    }
                    else {
                        alert("SMS sent!");
                    }
                };
                branch.sendSMS(phone, linkData, options, callback);
                form.phone.value = "";
            }
        </script>
    </head>
    <body>
    	Send SMS
        <form onsubmit="sendSMS(this); return false;">
        	<input id="phone" name="phone" type="tel" placeholder="(650) 123-4567" />
        	<br/>
        	<input type="submit"/>
        </form>
    </body>
</html>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Customizations

That’s all you need to add a custom Text Me The App page to your website! Go to [Advanced]({{base.url}}/features/text-me-the-app/advanced/) to read about more advanced implementations, or take a look at the [Method Reference](https://github.com/BranchMetrics/web-branch-deep-linking#sendsmsphone-linkdata-options-callback) for all available options.

{% elsif page.advanced %}

## Using a custom form with SendSMS()

Add the following code somewhere inside the `<head></head>` tags on your website.

{% highlight html %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
function sendSMS(form) {
  branch.sendSMS(
    phone: form.phone.text,
    {
      channel: 'Website',
      feature: 'Text-Me-The-App',
      data: {
        foo: 'bar'
      }
    },
    { make_new_link: false }, // Default: false. If set to true, sendSMS will generate a new link even if one already exists.
    function(err) { console.log(err); }
  }
});
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

### SendSMS() parameters.

The `sendSMS()` method requires a phone number and [link parameters]({{base.url}}/getting-started/configuring-links). You may optionally specify configuration options and a callback.

{% highlight javascript %}
branch.sendSMS(
    phone,
    linkData,
    options,
    callback (err, data)
);
{% endhighlight %}

{% example %}
Your call to this method, once filled in with the user's phone number, could look like the following:

{% highlight javascript %}
branch.sendSMS(
    phone: '9999999999',
    {
        tags: ['tag1', 'tag2'],
        channel: 'facebook',
        feature: 'dashboard',
        stage: 'new user',
        data: {
            foo: 'bar'
        }
    },
    { make_new_link: false }, // Default: false. If set to true, sendSMS will generate a new link even if one already exists.
    function(err) { console.log(err); }
});
{% endhighlight %}
{% endexample%}

_You can read more about the SendSMS() method in the [Method Reference](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#sendsmsphone-linkdata-options-callback)_

## Using your own SMS service

Branch uses Twilio to provide your users the ability to text themselves the app for free, but you can roll your own SMS service by using the following basic logic:

1. Does `~referring_link` exist? (a.k.a. did the user end up on this Text Me The App page because of a Branch link?) If so, use this link when sending the SMS.
2. If not (`~referring_link` is null), generate a new Branch link by making a call to the Web SDK's `link()` method. Use this link when sending the SMS.

The `~referring_link` parameter is returned in the Web SDK's init() callback, buried in the referring link data. See the code below:

{% highlight javascript %}
branch.init('YOUR-BRANCH-KEY', function(err, data) {
	if (data.data['~referring_link']) {
		console.log("data.data['~referring_link']:", data.data['~referring_link']);
	}
});
{% endhighlight %}

## Customizing SMS message content

The default text for SMS messages is **"Click here to download [App Name] {% raw %}{{ link }}{% endraw %}"**

If you want to customize this, Branch allows you to set a default for all messages, or customize the message for each link.

### Custom default for all messages
You can create your own custom default message that will be sent if the specific link someone clicks doesn't have a customized message itself. To do this, edit the form under the *Text me the app page* tab in the general settings area of the [Branch dashboard](https://dashboard.branch.io/#/settings).

{% image src="/img/pages/features/text-me-the-app/default-message.png" center 3-quarters alt="deep link data attributes" %}

### Link-specific messages
You can define a special SMS message for each individual link. Whether you want to switch the language of a message for a different region or include device specific date, you can specify the message in the *Deep Link Data* section at the bottom of the link editing screen.

{% image src="/img/pages/features/text-me-the-app/deeplink-data.png" center 2-thirds alt="deep link data attributes" %}

Use the {% raw %}**$custom_sms_text**{% endraw %} parameter and then enter your custom message in the value section. (Make sure to include the {% raw %}**{{ link }}**{% endraw %} tag in your custom message!)

{% example%}
The developer of FlowerPower wants to customize the SMS messages based on the country of the recipient. For each Branch link, they would specify in the *deep link data* a different custom message.

For ads in France:
**Cliquez pour télécharger FlowerPower ici {% raw %}{{ link }}{% endraw %}**

For ads in Spain:
**Haz click aquí para descargar FlowerPower {% raw %}{{ link }}{% endraw %}**

For ads in Germany:
**Klicken Sie auf das FlowerPower hier herunterladen {% raw %}{{ link }}{% endraw %}**
{% endexample%}

## Using liquid tags to access link data

You can access almost any value of your link's parameters by using liquid tags. The customization options are only limited to your imagination.

- The tag **{% raw %}{{ link }}{% endraw %}** is replaced with your Branch link
- **{% raw %}{{ link.channel }}{% endraw %}** and **{% raw %}{{ link.campaign }}{% endraw %}** output the channel and campaign, if these were set when creating the link.
- **{% raw %}{{ link.data.key }}{% endraw %}** will output a parameter of your link's data dictionary, where `key` is the name of the parameter

{% example%}
Dmitri is creating Branch links to deep link to each of the different flowers in his app FlowerPower. He creates each link with a key/value pair of the key `flower` and the flower name.

E.g. `Flower : Rose`, `Flower : Tulip`

He wants to customize his SMS messages based on name of the flower, so he sets his custom link messages as:

**{% raw %}{{ link.data.flower }}{% endraw %}**s on the mind? Click here to buy some for your home on FlowerPower! **{% raw %}{{ link }}{% endraw %}**
{% image src="/img/pages/features/text-me-the-app/key-value.png" center 2-thirds alt="Key/Value pairs" %}
{% endexample%}

### Setting default replacement values for liquid tags
If a specific tag isn't always going to be filled, you can use a `|` character to specify a default to fallback on if the tag is missing from your link dictionary.

E.g. `{% raw %}{{ link.data.author | default:"Alex" }}{% endraw %}`

If the `link.data.author` information isn't found, the tag will just be replaced with _Alex_ instead of being replaced by an empty string.

{% elsif page.support %}

## FAQ

##### Q: What are the limitations on sending SMS through your Text Me The App feature?
We enforce the following rate limits when sending SMS through Branch:

    1. 5 texts to the same number within an hour.
    1. 100 texts from the same IP within an hour.

Branch reserves the right to limit your use of the Text Me The App service and charge for SMS costs at its own discretion. To understand Branch's policies in this regard, please contact your Branch Account Manager or accounts@branch.io at any time for assistance.

##### Q: I've sent myself multiple texts just now and only received the first few, what's going on?

A: This occurs when a carrier filters you SMS out due to spam. We try our hardest to rate limit a specific user, however, if bypassed, carriers may block your SMS. The reason is that carriers will agressively block content if it's similar and repeatedly sent to the same number. The solution is to wait 24-48 hours.

##### Q: How come my (non US) phone number isn't working?

A: With full numbers, you are required to use "+" and the country code. If you know your users are only in a certain country, you can automatically prepend "+" and the country code so that they only need to enter their regular number. To do this, you must [configure a custom url](/features/text-me-the-app/guide/#configure-custom-url-in-branch-dashboard) and complete subsequent steps to create a custom text-me-the-app page. Then, you can alter the code snippet in [step 2](/features/text-me-the-app/guide/#insert-sendsms-snippet-into-your-page) with the following:

{% highlight js %}
    var phone = "+91" + form.phone.value;
{% endhighlight %}

In the example above, "+91" is the code for the country your users are based in.

##### Q: Why have the SMS links sent from Text Me The App expired?

A: All links links generated from the Text Me the App feature will expire after 7 days. 

{% endif %}
