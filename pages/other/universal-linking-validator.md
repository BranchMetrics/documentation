---
type: recipe
directory: other
title: Universal Linking Validator
page_title: Using the Universal Linking Validator
description: "Learn how to make use of this validator to check your Universal Linking setup"
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
hide_platform_selector: true
hide_section_selector: false
sections:
- overview
- guide
alias: [ /getting-started/universal-linking-validator/, /getting-started/universal-linking-validator/overview/, /getting-started/universal-linking-validator/guide/ ]
redirect: https://docs.branch.io/pages/resources/validation-tools/#universal-link-validator
---
{% if page.overview %}

## About The Universal Links Validator

With Apple's introduction of Universal Links in iOS 9, Branch links can take users into your app almost instantly. The introduction of Universal Links brings, however, an all new set of configuration complications. The  Universal Linking Validator compares an app's local project settings to its dashboard settings and helps pinpoint errors that may prevent Universal Links from functioning properly. This service verifies that:

  - the entries in the project's .entitlements file are correct
  - the entries in the project's info.plist file are correct
  - the .entitlements file has the correct build target selected
  - the Apple App Prefix on the Dashboard matches the Apple Developer ID specified for the project


{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## The Local Script

The script is run locally on your Xcode project, and gathers the following information for validation:

* The URI scheme(s) entered in the app's info.plist file
* The project's Bundle ID
* The project's Apple Developer ID (Apple App Prefix)
* The list of Associated Domains entered in the .entitlements file
* The build target selected for the .entitlements file
* The Branch Key(s) entered in the info.plist file

The script does not collect or store:

* Any of the app's code
* Any of the project's assets
* Email addresses or other developer information
* Any other information about your app, such as SDK's, app settings, or project structure

Once the configuration information is collected, the script generates and returns a Branch Link that can be used to view the test results.

## Running The Script

Download and extract the [latest version of the script](https://branch.io/resources/universal-links/static/twigScript/ulv_script.sh).

Once the file has finished downloading, open a terminal window and navigate to the location of the script. Enter:
{% highlight sh %}
$ bash ulv_script.sh
{% endhighlight %}

Before executing the script, drag and drop the project's .xcodeproj file into the terminal window (Note: you must use the .xcodeproj file, not the .xcworkspace file). The result should look something like this:

{% highlight sh %}
$ bash ulv_script.sh /Users/jbauer/Desktop/BranchStuff/Branch-TestBed-Swift/TestBed-Swift.xcodeproj
{% endhighlight %}

Upon execution, the script will echo back a message similar to the following:

{% highlight sh %}
#####################################################
 Click the link generated to test your configuration
#####################################################
{"url":"https://ulv.app.link/RPyaHjpYJd"}
{% endhighlight %}

Clicking the generated link, or copying & pasting it into a browser, will open the validator and display the test results.

## The Validator

The validator takes the information pulled from the local project files and performs a series of checks and comparisons. If a setting fails the validation tests, the setting will be displayed along with the recommended value.

In order to keep the Branch app and Xcode project information secure, the validator requires that the app's [Branch Secret](https://dashboard.branch.io/settings) be entered in the form. Once provided, the validator will display the results of the tests.

The validator will check the current status of the app's dashboard and can be run multiple times as changes are made. Changes to the local project will not be available to the validator, however, without again running the local script.

If you find any issues with the Universal Linking Validator, please reach out to [support@branch.io](mailto:support@branch.io)
{% endif %}
