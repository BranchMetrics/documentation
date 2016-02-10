
// You can manipulate the following values to test the generator.

var testValues = {
	'your_advertiser_id': '10000001',
	'site_id': '55300',
	'advertiser_id': '9999999',
	// 'action': '',
	// 'site_event_id': '',
	// 'site_event_name': '',
	'customQueryParams1': 'user_id=johnjoe',
	'customQueryParams2': 'company=branchmetrics',
	'customQueryParams3': 'role=bd',
	'customQueryParams4': 'location=palo_alto',
	'customQueryParams5': 'token=12345',
	'customQueryParams6': 'source=pla',
	'customQueryParams7': 'utm=unknown',
	'customQueryParams8': 'campaign_type=deeplinked',
	'customQueryParams9': 'month=january',
	'customQueryParams10': 'favorite_drink=appletini'
};

window.onload = function() {
	for (var i in testValues) {
		console.log(i);
		console.log(testValues[i]);
		window.document.getElementById(i).value = testValues[i];
	};

};
