clinical-ui-hipaa-log
====================================================

HIPAA logging and audit features for Meteor Apps.

====================================================
#### Installation

````
meteor add jeffpatzer:hipaa-audit-log
````

Or if you prefer to put directly into your project

````
$ cd /path/to/project/packages
$ git clone git@github.com:jpatzer/clinical-hipaa-audit-log.git
````

When adding this to your project it depends on a few packages: 

- iron:router
- nemo64:bootstrap
- mrt:momentjs
- less
- fortawesome:fontawesome
- alanning:roles

So if you already have those, great. If not, it will add them. If you have something similar, you might consider just using these for that. 

====================================================
#### Data Model

At installation, a Mongo collection is created named 'Hipaa'. This collection is not yet published. **It is your responsiblity to lock down access to a path of your choosing and publish the collection.** 

You can lock down access via a couple places. Make use of the roles package for ease.

Add a route to your Router

````js
Router.map(function() {
  this.route("hipaaLogRoute", {
    path: "/audit", // path of your choosing
    template: "hipaaLogPage", // don't change this
    waitOn: function() { // only subscribes to the collection on this page
      return [
        Meteor.subscribe('hipaa'),
      ];
    },
    onBeforeAction: function () { // secures access to the page
      if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        this.render("accessDenied");
      }else {
        this.next();
      }
    },
  });
});
````

Then also in your publication

````js
Meteor.publish('hipaa', function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Hipaa.find();
  }else{
    return []; // won't publish a thing if the user doesn't have the right role
  }
});
````

This makes it an audit log that only admins can refer to later to find out what clinically relevant privacy events have occurred.


====================================================
#### Controllers - Logging Clinically Significant Events

All adding, removing, and more is meant to be done on the server, not the client. 

Next, you'll want to actually log a clinically significant privacy event.  The basic syntax looks something like this:

The function prototype is

    function logEvent (eventType, userId, collectionName, recordId, message, patientId, patientName)

The available eventTypes are:

- error
- unpublish
- publish
- viewed
- denied
- delete
- clone
- modify
- create
- access
- init

Note the use of the `HippaLogger.logEvent` in the callback functions to the database update functions. This helper is only available on the server. How many and what type of events to log is ultimately up to you to determine. 

````js

// Example
MyCollection.update({_id: this._id},{$set:{
  stared: true
}}, function(error, result){
  if(error){
    HipaaLogger.logEvent("error", Meteor.userId(), Meteor.user().profile.name, "Forms", null, error);
  }
  if(result){
    HipaaLogger.logEvent("create", Meteor.userId(), Meteor.user().profile.name, "Forms", self._id, null);
  }
});
````

------------------------
### Enhancements

* Export the log on a recurring basis to a secure backup. For instance, every week, spool out the audit to an S3 bucket for backup. Then clean up the log in the database to keep it small in size.

------------------------
### HIPAA Compliant Applications

Meteor comes very close to being HIPAA compliant out-of-the-box.  The general principle of HIPAA is to protect patient privacy.  But what does that mean?  Well, each patient is an individual, and privacy implies that personal details aren't shared indiscriminately or in ways that interlocutors may become privy to.

In practice, HIPAA compliancy boils down to three things:  individual user accounts, encrypted transmission of data, and audit logs.  It turns out that Meteor provides two of those features out-of-the-box, with the accounts-ui and force-ssl packages.  

So, putting everything together, and it appears that a recipe for a HIPAA compliant Meteor application would look something like this:

````
meteor add accounts-ui
meteor add force-ssl
meteor add jeffpatzer:hipaa-audit-log
````

------------------------
### License

MIT License. Use as you wish, including for commercial purposes.  
See license.mit.txt for full details.  
