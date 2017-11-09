---
type: recipe
directory: other
exclude_from_google_search: true
title: Mixpanel Webhook
page_title: Mixpanel Webhook
redirect: https://docs.branch.io/pages/emails/get-started/
---

# Branch / Mixpanel Integration Guide

We recommend linking your Branch and Mixpanel accounts via webhooks so you can view your Branch event data alongside your other acquisition channels.

The below guide will describe exactly how to use the accompanying URL creator and our webhooks section to send your Branch data to your Mixpanel account.

## Build your postback URL ##

The below webhook builder will allow you to input basic identifying information about your Mixpanel account and create a postback URL templated to link your Mixpanel and Branch accounts.  Below are the steps for using the webhook builder.

1. Input your Mixpanel project token

2. Input the event token for the specific event you are creating the postback for

3. Add any optional query params you would like to include (such as query params required by your advertiser)

4. Click the "Create Link" button at the bottom.

## Add Webhook to your Branch dashboard ##

Now that you've created your Mixpanel Postback URL, you'll want to use it to [create a webhook](https://dashboard.branch.io/#/webhook) in your Branch dashboard. 

1. Click the "Add a new webhook" button
2. Insert the URL created in the previous section and paste it into the empty text box following the words "send a webhook to"
3. Select the "Post" request type
4. Select your desired frequency for the postback (most likely "every time" for a full account integration).
5. Select the Branch event you would like passed to Mixpanel

That’s it!  Branch will now send all Branch data to your Mixpanel account.

For more information on Branch’s webhooks, view our webhooks guide in the dev portal.  
