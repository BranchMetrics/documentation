---
type: recipe
directory: data-exchange
title: Query API
repo: Deferred-Deep-Linking-Public-API
page_title: Export API Reference
description: This Branch Metrics Export API reference lists the specifications for pulling data from Branch via API.
keywords:  
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
alias: [ /methods-endpoints/data-export-api/guide/ ]
redirect: https://docs.branch.io/pages/exports/api/
---

## Data Export API

The data export API can be used to pull the data visible via the Liveview & Exports tab directly via an API. A couple important notes worthy of mention of this API:

- The data will only be retrievable for 7 days (but can be extended for very special use cases)
- The data will only appear after end of day since it's processed every 24 hours
- The data will not be visible prior to your whitelisting date
- The data will only be visible for your live key (not your test key)

#### Configuration

In order to use this API you must have an App ID and a Branch Public Key. You must also be whitelisted to use the API. If you'd like to be whitelisted for the Export API, please contact [integrations@branch.io](mailto:integrations@branch.io).

You can find your keys at: https://dashboard.branch.io/#/settings

#### Base URL:
https://api.branch.io/v2/export/

#### Endpoint
	GET https://api.branch.io/v2/export
	Content-Type: application/json

#### Parameters

**branch_key** _required_
: The Branch key of the originating app

**branch_secret** _required_
: The Branch secret key of the originating app

**export_date** _required_
: The UTC date of the requested data export

Format the URL as follows: 
https://api.branch.io/v2/export/XXXXX?branch_secret=XXXXX&export_date=2015-11-15

> **Example:**
https://api.branch.io/v2/export/key_live_gcASshuadd7l39m36NhdsDPWRjmkdcgh12jsg1?branch_secret=secret_live_ztPsdKIjUtcjkUYF732nsl81HJ75BJqiv24J86&export_date=2015-11-15

#### Response

The response payload will be in JSON format and for each export it will have an array of paths to files on s3 to download. Note that there may be multiple files (depending on the size of the day's export) and that each csv file will be gzipped.


	{
	 "links_export_url": ["https://branch-exports.s3.amazonaws.com/YOUR_APP_ID-2015-10-23-link[-OPTIONAL_FILE_NUMBER]-v2-HASH.csv.gz"],
	 "events_export_url": ["https://branch-exports.s3.amazonaws.com/YOUR_APP_ID-2015-10-23-event[-OPTIONAL_FILE_NUMBER]-v2-HASH.csv.gz"],
	 "clicks_export_url": ["https://branch-exports.s3.amazonaws.com/YOUR_APP_ID-2015-10-23-click[-OPTIONAL_FILE_NUMBER]-v2-HASH.csv.gz"]
	}


{% protip title='Note:' %}
A full day's files will be available on our S3 bucket at that location to download around 8:00am UTC. It will return a blank array from s3 for any empty files until the UTC day is over and the data has been transfered to s3, therefore it is recommended you schedule any ETLs to fetch the data for the previous day around 8:00am UTC.
{% endprotip %}

####Time Limits
Data will be available through the API for 7 days after the date it's posted. It will be also available for 90 days after that upon request. After 90 days, we may delete the data to reduce unnecessary storage. If you need a record of your data for longer than 90 days, please set up a recurring export and store data in your systems. 


##Link Export

| Key | Value
| --- | ---
|creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|link_id| int |
|branch_identity_id| int |
|channel| string |
|feature| string |
|campaign| string |
|stage| string |
|tags| string |
|data| stringified JSON |
|creation_source| string |
|alias| string |
|domain| string |
|url| string |


##Link Click Export

| Key | Value
| --- | --- 
|click_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_link_click_id| int |
|branch_browser_fingerprint_id| int |
|os| string |
|os_version| string |
|model| string |
|browser| string |
|user_agent| string |
|ip_address| string |
|stage| string |
|sms_from_desktop| boolean |
|phone_number| string | 
|redirect_method| string |
|link_creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|link_channel| string |
|link_feature| string |
|link_campaign| string |
|link_stage| string |
|link_tags| string |
|link_data| stringified JSON |
|link_creation_source| string |
|link_url| string |
|link_branch_identity_id| int |
|link_id| int |
|query_params| stringified JSON |


##Event Export

| Key | Value
| --- | ---
|id| int |
|name| string | 
|metadata| stringified JSON |
|timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_identity_id| int |
|developer_identity| string |
|identity_creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_session_id| int | 
|app_version| string |
|ip_address| string |
|session_start_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_device_fingerprint_id| int |
|device_first_seen_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|device_os| string |
|device_os_version| string |
|device_metadata|stringified JSON |
|hardware_id|string |
|google_advertising_id|string |
|branch_browser_fingerprint_id| string|
|browser_first_seen_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|browser_os| string |
|browser_os_version|string|
|user_agent| string |
|first_referring_click_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|first_referring_click_query_params| stringified JSON |
|first_referring_branch_identity_id| int |
|first_referring_developer_identity| string |
|first_referring_hardware_id| string |
|first_referring_branch_link_id| int |
|first_referring_link_creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|first_referring_link_channel| string |
|first_referring_link_feature|string |
|first_referring_link_campaign|string |
|first_referring_link_stage|string |
|first_referring_link_tags|string |
|first_referring_link_data|stringified JSON |
|first_referring_link_creation_source|string |
|first_referring_link_url|string |
|session_referring_click_timestamp|datetime %Y-%m-%dT%H:%M:%S |
|session_referring_click_query_params| stringified JSON |
|session_referring_branch_identity_id| int |
|session_referring_developer_identity| int |
|session_referring_hardware_id|string |
|session_referring_branch_link_id|string |
|session_referring_link_creation_timestamp|datetime %Y-%m-%dT%H:%M:%S |
|session_referring_link_channel| string |
|session_referring_link_feature|string |
|session_referring_link_campaign|string |
|session_referring_link_stage|string |
|session_referring_link_tags|string |
|session_referring_link_data|stringified JSON |
|session_referring_link_creation_source| string |
|session_referring_link_url|string |
|first_referring_click_id|int |
|session_referring_click_id|int |
