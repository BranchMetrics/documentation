---
type: recipe
directory: marketing-channels
title: "Doubleclick"
page_title: "Advertising with Deep Links: Doubleclick"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
contents:
  number:
  - guide
redirect: https://docs.branch.io/
---

{% if page.overview %}

Track your Doubleclick campaigns using Branch's Universal Ads product. Branch's Ad Product will enable you to update your Doubleclick Campaign Manager (DCM) campaigns with deep links that send data back to Doubleclick's servers.

You can now run campaigns on a variety of in-app and mobile web publishing sites, and provide your users with the smoothest experience with Branch's deep links. Read on to learn how to set everything up.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## Doubleclick Campaign Manager Set Up

Before we start anything on the Branch side, we need to configure options on the DCM side. Start by heading to your DCM dashboard, and navigating to the advertisers section.

### Grab Advertiser ID

First, we'll need to grab the advertiser ID. Select the advertiser you want to track with, and grab the Advertiser ID. In this example, it is 6637276. This is the advertiser you will track campaigns with. Please keep note of it.

{% image src="/img/pages/marketing-channels/deep-linked-ads/google/advertiser.png" center 3-quarters alt='Floodlight settings.' %}

### Grab Server to Server Token

Once you've captured the advertiser ID and selected the advertiser, navigate to **Floodlight Configuration**. From there, go to "server to server", and make sure "in-app attribution tracking" is check-marked. Click new token, call it “Branch token”, and save it. Copy this value, as well.

{% image src="/img/pages/marketing-channels/deep-linked-ads/google/server-token.png" center 3-quarters alt='Floodlight settings.' %}

Now that you have **Advertiser ID** and **Server to Server Token**, the last step is to find the events you need to track.

### Grab Tags for Events

Go to the **Floodlight activities** tab. For all the events you want to track, grab the **Activity tag String** and **Group tag String**.

{% image src="/img/pages/marketing-channels/deep-linked-ads/google/cat-type.png" center 3-quarters alt='Floodlight settings.' %}

In the above screenshot, the two values for **Activity tag String** are *act-ios* and *act-android*. The one value for **Group tag String** is *sales*. Do this for all activities you want to track.

Once you're done with this exercise, you should have at least 4 unique values:

- Server to Server token
- Advertiser ID
- Activity tag String (per event)
- Group tag String (per event)

## Branch Dashboard Setup

Let's take these values and place them in Branch's dashboard. Begin by navigating to the [partners page](https://dashboard.branch.io/ads/partner-management/a_doubleclick).

### Enable

Find doubleclick in the search box. Hit enable. In the **Account Settings** tab, insert your **Server to Server token**.

### Map Events

At this point, you have enabled Branch to communicate with Doubleclick. Now we need to map Branch events to **Floodlight Activities** found on the Doubleclick dashboard. Click the **Postback Config** tab. You should see a URL for the event **Install**. For demonstration purposes, we will assume you have a corresponding Install event on the Doubleclick dashboard, but this applies to any event you add.

Start by grabbing your **Advertiser ID**, **Activity tag String**, and **Group tag String**.

In the screenshot above, we have two events, "In App Activations - Android", and "In App Activations - iOS", which correspond to the Branch Install event. For this example, the **Activity tag Strings** are *act-and* and *act-ios*. The **Group tag String** is *sales*.

Copy the existing URL in Install, and replace the *src*, *cat*, and *type* variables. Your end result should look exactly like this:

`https://ad.doubleclick.net/ddm/s2s/appactivity/src=6637276;cat=<#if user_data.os=="IOS">act-ios</#if><#if user_data.os=="ANDROID">act-and</#if>;type=sales;ord=${ (id)! }`

If you don't have two different tags for iOS and Android, then it will look simpler:

`https://ad.doubleclick.net/ddm/s2s/appactivity/src=6637276;cat=act-tag;type=sales;ord=${ (id)! }`

{% image src="/img/pages/marketing-channels/deep-linked-ads/google/final-postback-doubleclick.png" center 3-quarters alt='Floodlight settings.' %}

Simply update and hit save.

## Run campaigns

At this point, you can now create a link for the Doubleclick network and send data back.

{% endif %}
