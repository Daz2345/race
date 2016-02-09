SimpleRest.configure({
  collections: []
});

Meteor.methods({
    'getEnvironment' : function(){
        return process.env.NODE_ENV;
    }
})