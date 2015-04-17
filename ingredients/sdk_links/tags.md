### Adding Tags

Are you a tag person? You can add as many simply tags as you want to a link. Note that these are **not** key-value pairs -- those belong in the [TODO] [data dictionary]().

<!--- iOS -->
{% if page.ios %}

No mysteries here:

~~~ objc
[[Branch getInstance] getShortURLWithParams:@{} andTags:@[@"any", @"other", @"tags", @"you", @"want"] andChannel:nil andFeature:nil andStage:nil andAlias:nil andCallback:^(NSString *url, NSError *error) {
    if (!error) NSLog(@"got my Branch link to share: %@", url);
}];
~~~

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

You'll want to use any of the `getShortUrl` methods that accept the paramter of type `Collection<String>` for tags. Check the following example:

~~~ java
ArrayList<String> tags = new ArrayList<String>();
tags.add("tag1");
tags.add("tag2");
Branch.getInstance(getApplicationContext()).getShortUrl(tags, "channel1", null /*params dictionary */, new BranchLinkCreateListener() {
	@Override
	public void onLinkCreate(String url, BranchError error) {
		if (error == null) {
		    Log.d("MyTag", "Url = " + url);
		}
	}
});
~~~

{% endif %}
<!--- /Android -->