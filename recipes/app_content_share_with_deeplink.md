---
type: recipe
title: App Content Share with Deeplink
platforms:
- ios
- android
---

# App Content Share with Deeplink

------

## {% if page.ios %}Configuring the Dashboard for your iOS app{%endif%}{% if page.android %}Configuring the Dashboard for your Android app{%endif%}
{% ingredient configuring_the_dashboard/app_name %}{% endingredient %}
{% ingredient configuring_the_dashboard/web_url %}{% endingredient %}
{% ingredient configuring_the_dashboard/store_or_custom_url %}{% endingredient %}
{% ingredient configuring_the_dashboard/uri_scheme %}{% endingredient %}

That's the end of the required setup for the Dashboard! The dashboard is incredibly powerful, so if you want to dive in deeper, definitely check out [TODO] [Configuring the Dashboard](/ingredients/configuring_the_dashboard/{{ page.platform }}/index.html#advanced)'s advanced configurations.
<!--- /Configuring the Dashboard-->


## {% if page.ios %}Configuring your iOS app{%endif%}{% if page.android %}Configuring your Android app{%endif%}
{% ingredient configuring_the_client/installing_the_sdk %}{% endingredient %}
{% ingredient configuring_the_client/branch_key %}{% endingredient %}
{% ingredient configuring_the_client/uri_scheme %}{% endingredient %}
{% ingredient configuring_the_client/init_session %}{% endingredient %}
{% ingredient configuring_the_client/handle_deep_link %}{% endingredient %}
{% ingredient configuring_the_client/identify_and_logout %}
	{% override configuring_the_client_identify_and_logout_pre_explanation %}
If you want to know who is sharing your content, whether for internal purposes (i.e. analytics) or for customizing the experience of a user receiving a referral, you'll want to identify your users.
	{% endoverride %}
{% endingredient %}
<!--- /Configuring the Client-->


## Generating Links
{% ingredient links_and_sharing/creating_links %}{% endingredient %}
{% ingredient links_and_sharing/custom_data %}{% endingredient %}
{% ingredient links_and_sharing/channel %}{% endingredient %}
{% ingredient links_and_sharing/feature %}{% endingredient %}
{% ingredient links_and_sharing/alias %}{% endingredient %}
{% ingredient links_and_sharing/og_tags %}{% endingredient %}
<!--- /Links and Sharing-->