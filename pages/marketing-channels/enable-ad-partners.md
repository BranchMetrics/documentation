---
type: recipe
directory: marketing-channels
title: "Ad Network Integrations"
page_title: "Advertising with Deep Links: Ad Network Integrations"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/google-search-ads/, /features/google-search-ads/overview/, /features/google-search-ads/guide/, /features/google-search-ads/support/ ]
redirect: https://docs.branch.io/
---

{% if page.overview %}
Branch Universal Ads help you drive results for web and app campaigns. 

- Create Ad Links with tracking parameters and deep linking
- Enable Ad Partners to send them preconfigured conversion postbacks
- View ad performance with web and app analytics

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality. 
{% endprerequisite %}

## Enable an ad partner

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
1. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
{% image src="/img/pages/marketing-channels/deep-linked-ads/ads-partner-management.png" center 3-quarters alt='Ads Partner Management' %}
1. Search for the Ad Partner that you'd like to enable.
{% image src="/img/pages/marketing-channels/deep-linked-ads/find-applovin.png" center 3-quarters alt='Find your ad partner' %}
1. Enter any credentials that may be required, and click **Save and Enable** in the bottom right hand corner.
{% image src="/img/pages/marketing-channels/deep-linked-ads/save-and-enable.png" center 3-quarters alt='Save and Enable' %}

## Create an ad link

Once you've enabled an ad partner, it's time to create a tracking link.

First, set your ad format. If you're using an ad network integration for an **App Install** or 


{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Additional Analytic parameters" %}

It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. Look for the "Analytics" subtab of "Configure Options to ad analytics parameters"

{% endprotip %}

## Configure an ad

When you create your ad, paste your ad link into 

{% protip %}
If you are running **Search Install Ads** on **Android** only, you'll need to modify your Play Store URL and be on v2.6.0 of the Branch Android SDK. Simply append &referrer=google_search_install_referrer%3D\<link-id\> to the end of your Play Store URL, but be sure to replace \<link-id\> with the ID of the link created above. The Play Store URL should not have brackets, and would look like this: https://play.google.com/io.branch.branchster?referrer=google_search_install_referrer%3D123456789. In order to get the link id follow the steps mentioned below:
	
**1)** Grab the Branch link off of the dashboard and append `?debug=true` to the end of it. For example:{% highlight sh %}https://branchster.app.link/znlg7dlCJD{% endhighlight %} would become {% highlight sh %}https://branchster.app.link/znlg7dlCJD?debug=true{% endhighlight %}

**2)** Paste the link with `?debug=true` into your desktop browser’s address bar.

**3)** You can read the link ID from the redirected URL in the browser address bar, as well as the “~id” parameter in the “Data” section on the page. In example below, `400316647170355019` is the link ID.{% highlight sh %}https://dashboard.branch.io/link-debug/400316647170355019{% endhighlight %}
{% endprotip %}

{% image src="/img/pages/features/google-search-ads/link-configuration.png" half center alt='Example Ad' %}

{% protip %}
Because the **Final URL** for your app install campaigns must match your domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.
{% endprotip %}

## View your data using the Branch dashboard

The [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard shows the performance of each individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs.

{% image src='/img/pages/features/google-search-ads/marketing_link_row.png' full center alt='Facebook Example Ad' %}

To view more detailed stats, click the _small button that looks like a bar chart_ on the far right. Note that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

{% image src='/img/pages/features/google-search-ads/click_flow_analytics.png' full center alt='Facebook Example Ad' %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% endif %}
