
Meteor.publish('hipaa', function () {
  return Hipaa.find();
});

//=============================================================================
// INITIALIZATION

Meteor.startup(function () {

  if (Hipaa.find().count() === 0) {
    console.log('No events in hipaa audit log!  Initializing audit log...');

    // HipaaLogger.logEvent("init", null, "System", null, null, null);
    // HipaaLogger.logEvent("access", null, "Jane Doe", null, null, null);
    // HipaaLogger.logEvent("create", null, "Jane Doe", null, null, null);
    // HipaaLogger.logEvent("modify", null, "Jane Doe", null, null, null);
    // HipaaLogger.logEvent("delete", null, "John Doe", null, null, null);
    // HipaaLogger.logEvent("denied", null, "John Doe", null, null, null);
    // HipaaLogger.logEvent("notfound", null, "Jane Doe", null, null, null);
    // HipaaLogger.logEvent("viewed", null, "Jane Doe", null, null, null);

  }
});
