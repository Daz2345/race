
FlowRouter.route('/', {
    name: 'home',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "welcome"});
    }
});

FlowRouter.route('/user', {
    name: 'user',
    // action: function(params) {
    //     BlazeLayout.render("layout", {left: "left", main: "welcome"});
    // }
});

