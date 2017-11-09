---
type: recipe
directory: cross-channel-analytics
title: "Revenue Analytics"
page_title: "Revenue Analytics"
sections:
- overview
- guide
- advanced
platforms:
- ios
- android
- web
alias: [ /features/revenue-analytics/, /features/revenue-analytics/overview/, /features/revenue-analytics/guide/ios/, /features/revenue-analytics/guide/android/, /features/revenue-analytics/guide/web/, /features/revenue-analytics/advanced/ios/, /features/revenue-analytics/advanced/android/, /features/revenue-analytics/advanced/web/ ] 
redirect: https://docs.branch.io/pages/dashboard/analytics/#sources
---

{% if page.overview %}

Branch allows you to easily track purchases and revenue in the Branch dashboard. With Branch links in every channel, it’s easy to compare the quality of traffic coming in from your marketing efforts. 

This week you can see commerce data in Source Analytics and Quick Links pages, allowing you to determine which campaigns, channels, features and links are resulting in the most revenue. From there, you can decide how to allocate resources and spend to most effectively achieve conversions.

{% image src="/img/pages/features/revenue-analytics/revenue-marketing-links.png" full center %}
**Viewing revenue driven by individual Quick Links ([go to Quick Links Page](https://dashboard.branch.io/quick-links)).**

{% getstarted %}{% endgetstarted %}


{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).

{% endprerequisite %}

## Tracking purchase events in the SDK

The first step to powerful, granular revenue tracking is ensuring that SDKs track purchase events. (We are deprecating old SDK methods for tracking purchases with revenue.) Be sure to include the field `revenue` anytime you track a purchase. All other fields are optional but may be used in the future to provide additional insights.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
To track purchases with Branch, add a `sendCommerceEvent:metadata:withCompletion:` call to be executed immediately after a purchase is complete:

{% highlight objc %}
BNCCommerceEvent *commerceEvent = [BNCCommerceEvent new];
commerceEvent.revenue = [NSDecimalNumber decimalNumberWithString:@"20.00"];
[[Branch getInstance] sendCommerceEvent:commerceEvent
                               metadata:nil
                         withCompletion:^ (NSDictionary *response, NSError *error) {
    if (error) { /* handle error here */ }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}

To track purchases with Branch, add a `sendCommerceEvent()` call to be executed immediately after a purchase is complete:

{% highlight swift %}
let commerceEvent = BNCCommerceEvent.init()
commerceEvent.revenue = NSDecimalNumber.init(string:"1101.99")
Branch.getInstance()?.send(
    commerceEvent,
    metadata: ["foo": "bar"],
    withCompletion: { (response, error) in
        if let e = error { /* handle error */ }
    }
)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% elsif page.android %}

To track purchases with Branch, add a `sendCommerceEvent()` call to be executed immediately after a purchase is complete:

{% highlight java %}
CommerceEvent commerceEvent = new CommerceEvent();
commerceEvent.setRevenue(1101.99);
Branch.getInstance().sendCommerceEvent(commerceEvent, null, null);
{% endhighlight %}

{% elsif page.web %}

Here is a fuller example of the `trackCommerceEvent()` call.

{% highlight javascript %}
var metadata =  { "foo": "bar" };
var commerce_data = { "revenue": 50.0 };
branch.trackCommerceEvent('purchase', commerce_data, metadata, function(err) {
    if (err) { /* handle error */ }
});
{% endhighlight %}

{% endif %}

For a more complete example that demonstrates what purchase- and product-related information Branch can receive, please see the [Advanced]({{base.url}}/features/revenue-analytics/advanced/) section.


## Testing

The best way to test is to trigger a purchase event (using the code snippet above) and then to visit the [Branch Dashboard's Live View page](https://dashboard.branch.io/liveview/commerce_events). Here is a screenshot of what commerce events look like:

{% image src="/img/pages/features/revenue-analytics/revenue-live-view.png" full center %}

To test end to end, first click on a Branch link, such as a Quick Link, then trigger a purchase. Then in Live View you can select `Columns`, check `Link Data`, and ensure the data is present for the link you clicked prior to purchase.


## Viewing Revenue Analytics in the Dashboard

Right now, revenue data is visible in two places:

- [Source Analytics](https://dashboard.branch.io/analytics/source)
- [Quick Links](https://dashboard.branch.io/quick-links)

On the [previous page](/features/revenue-analytics/overview/) we showed you a screenshot of revenue on the Quick Links page. Here's a quick look at how you can see revenue breakdowns on the Source Analytics page:

{% image src="/img/pages/features/revenue-analytics/revenue-source-analytics.png" full center %}

## Coming Soon: Journeys

In the coming weeks you will be able to set up Journeys to target users with a purchase history (e.g. “include users who have past purchases amounting to greater than $50”). It will be as simple as adding a filter:

{% image src="/img/pages/features/revenue-analytics/revenue-journeys.png" full center %}



{% elsif page.advanced %}

## Beta

Revenue Analytics is still in beta. We are currently actively working on supporting non-USD revenue, as well as making commerce events available via webhooks. Internally, we have decided to add support for commerce data in sustainable ways, meaning new infrastructure in certain places. If you are not seeing commerce events somewhere that you believe you should be seeing them, first check [Live View](https://dashboard.branch.io/liveview/commerce_events) to make sure you are sending them, then [contact us](https://support.branch.io/support/tickets/new) and include `Revenue Analytics` in the subject.

## Full Example Code

{% if page.ios %}

Here is a fuller example of the `sendCommerceEvent:metadata:withCompletion:` call.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BNCProduct *product = [BNCProduct new];
product.price = [NSDecimalNumber decimalNumberWithString:@"1000.99"];
product.sku = @"acme007";
product.name = @"Acme brand 1 ton weight";
product.quantity = @(1.0);
product.brand = @"Acme";
product.category = BNCProductCategoryMedia;
product.variant = @"Lite Weight";

BNCCommerceEvent *commerceEvent = [BNCCommerceEvent new];
commerceEvent.revenue = [NSDecimalNumber decimalNumberWithString:@"1101.99"];
commerceEvent.currency = @"USD";
commerceEvent.transactionID = @"tr00x8";
commerceEvent.shipping = [NSDecimalNumber decimalNumberWithString:@"100.00"];
commerceEvent.tax = [NSDecimalNumber decimalNumberWithString:@"1.00"];
commerceEvent.coupon = @"Acme weights coupon";
commerceEvent.affiliation = @"ACME by Amazon";
commerceEvent.products = @[ product ];

[[Branch getInstance] sendCommerceEvent:commerceEvent
                               metadata:@{ @"Meta": @"Never meta dog I didn't like." }
                         withCompletion:^ (NSDictionary *response, NSError *error) {
    if (error) { /* handle error */ }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}

Here is a fuller example of the `sendCommerceEvent()` call.

{% highlight swift %}
let product = BNCProduct.init()
product.price = NSDecimalNumber.init(string:"1000.99")
product.sku = "acme007"
product.name = "Acme brand 1 ton weight"
product.quantity = 1.0;
product.brand = "Acme";
product.category = BNCProductCategoryMedia;
product.variant = "Lite Weight";

let commerceEvent = BNCCommerceEvent.init()
commerceEvent.revenue = NSDecimalNumber.init(string:"1101.99")
commerceEvent.currency = "USD"
commerceEvent.transactionID = "tr00x8"
commerceEvent.shipping = NSDecimalNumber.init(string:"100.00")
commerceEvent.tax = NSDecimalNumber.init(string:"1.00");
commerceEvent.coupon = "Acme weights coupon"
commerceEvent.affiliation = "ACME by Amazon"
commerceEvent.products = [ product ];

Branch.getInstance()?.send(
    commerceEvent,
    metadata: ["Meta": "Never meta dog I didn't like." ],
    withCompletion: { (response, error) in
        if let e = error { /* handle error */ }
    }
)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% elsif page.android %}

Here is a fuller example of the `sendCommerceEvent()` call.

{% highlight java %}
Branch branch = Branch.getInstance();
Product product = new Product();
product.setPrice(100.99);
product.setSku("acme007");
product.setName("Acme brand 1 ton weight");
product.setQuantity(1);
product.setBrand("Acme");
product.setCategory(ProductCategory.MEDIA);
product.setVariant("Lite Weight");

CommerceEvent commerceEvent = new CommerceEvent();
commerceEvent.setRevenue(1101.99);
commerceEvent.setCurrencyType(CurrencyType.USD);
commerceEvent.setTransactionID("tr00x8");
commerceEvent.setShipping(100.00);
commerceEvent.setTax(1.00);
commerceEvent.setCoupon("Acme weights coupon");
commerceEvent.setAffiliation("ACME by Amazon");
commerceEvent.addProduct(product);

JSONObject jsonObject = new JSONObject();
try { jsonObject.put("Meta", "never meta dog I didn't like."); } catch ( JSONException e ) {}
branch.sendCommerceEvent(commerceEvent, jsonObject, null);
{% endhighlight %}

{% elsif page.web %}

Here is a fuller example of the `trackCommerceEvent()` call.

{% highlight javascript %}
var metadata =  { "foo": "bar" };
var commerce_data = {
    "revenue": 50.0,
    "currency": "USD",
    "transaction_id": "foo-transaction-id",
    "shipping": 0.0,
    "tax": 5.0,
    "affiliation": "foo",
    "products": [
        { "sku": "foo-sku-1", "name": "foo-item-1", "price": 45.00, "quantity": 1, "brand": "foo-brand", "category": "Electronics", "variant": "foo-variant-1" },
        { "sku": "foo-sku-2", "price": 2.50, "quantity": 2}
    ],
};

branch.trackCommerceEvent('purchase', commerce_data, metadata, function(err) {
    if (err) { /* handle error */ }
});
{% endhighlight %}

{% endif %}

[Below](#additional-values) is a description of the additional values present in this extended code snippet.

## Additional Values 

Here are some additional values you can send to Branch

| value | description 
| --- | ---
| revenue | revenue from the transaction
| currency | see [Currency](#currency) below
| transaction_id | your id for a transaction *
| shipping | shipping cost *
| tax | tax collected *
| coupon | coupon name *
| affiliation | affiliation name or code *
| product.sku | product sku or id *
| product.name | human readable product name *
| product.price | product price (per unit) *
| product.quantity | units purchased *
| product.brand | human readable brand *
| product.category | see [Product Category](#product-category) below *
| product.variant | human readable variant *

(*) optional, and not used at this time, but will potentially be used in the future

## Currency

If you do not specify a currency, we assume that `USD` is being used. Otherwise we convert to `USD` using a current exchange rate (no more than 24 hours old). This allows you to send revenue data to Branch in a wide range of currencies and still be able to see analytics for the totals.

Please use the three letter codes specified by ISO 4217. As of March 2017, there were 179 values, which can be found on the [Wikipedia page for ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).


## Product Category

Here is a list of acceptable product category values, based off a [taxonomy maintained by Google](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt):

- Animals & Pet Supplies
- Apparel & Accessories
- Arts & Entertainment
- Baby & Toddler
- Business & Industrial
- Cameras & Optics
- Electronics
- Food, Beverages & Tobacco
- Furniture
- Hardware
- Health & Beauty
- Home & Garden
- Luggage & Bags
- Mature
- Media
- Office Supplies
- Religious & Ceremonial
- Software
- Sporting Goods
- Toys & Games
- Vehicles & Parts

If you specify a value that does not exactly match one of the values above, we will ignore it and it will not be stored for future use.

{% endif %}
