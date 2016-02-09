SimpleRest.configure({
  collections: []
});

Meteor.methods({
    'getEnvironment' : function(){
        return Meteor.Settings.public.mode;
    }
})