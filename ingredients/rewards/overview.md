
{% section header %}### Overview: Credits and Reward Rules {% endsection %}

Branch allows you reward users with credits, track those credits, and redeem them when appropriate. It is a unit-less currency available to your users without you having to build a system from scratch.

If you decide to track user credits through the Branch platform, then you must configure reward rules on the dashboard and tie them to events that occur in your app (_signup_, _product_purchased_). With every event that is recorded in Branch, we check automatically if that event is eligible for credits based on the rules that you configured, then deposit the credits if so.

We recommend that you do not use the events we automatically track, such as _install_ and _open_. Becuase we do not merge identites anymore, we ask that you set a reward on any event after you have identified a user using out identity methods.
