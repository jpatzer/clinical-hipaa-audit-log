Hipaa =  new Meteor.Collection("hipaa");
Hipaa.allow({
  insert: function(){
    return false;
  },
  update: function () {
    return false;
  },
  remove: function(){
    return false;
  }
});
