Template.user.events({
  'click button[name="login"]': function(e, tpl) {
    initLogin(e,tpl);
  },
  'keyup input' : function (e, tpl){
    if (e.keyCode == 13){ //If Enter Key Pressed
        initLogin(e,tpl);
      }
  },
  'click button[name="logout"]': function(e) {
    Meteor.logout();
    FlowRouter.go('signin');
  }
});