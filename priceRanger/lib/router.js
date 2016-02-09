var loggedIn = FlowRouter.group({})

    Meteor.call('getEnvironment', function(err, res) {
        if (res == "production") {
            loggedIn = FlowRouter.group({
                triggersEnter: [
                    function() {
                        var route;
                        if (!(Meteor.loggingIn() || Meteor.userId())) {
                            route = FlowRouter.current();
                            if (route.route.name !== 'signin') {
                                Session.set('redirectAfterLogin', route.path);
                            }
                            return FlowRouter.go('signin');
                        }
                    }
                ]

            });
        }
    });

    var exposed = FlowRouter.group({});

    FlowRouter.subscriptions = function() {
        this.register("ScenarioRunsCount", Meteor.subscribe('ScenarioRuns.all.Count'));
        this.register("ScenariosCount", Meteor.subscribe('Scenarios.all.Count'));
        if (Meteor.user()) {
            this.register("subMessages", Meteor.subscribe('liveMessages', Meteor.User()._id));
        }
    };

    loggedIn.route('/', {
        name: 'home',
        action: function(params) {
            BlazeLayout.render("layout", {
                left: "left",
                main: "welcome"
            });
        }
    });

    exposed.notFound = {
        action: function() {
            BlazeLayout.render("notFound");
        }
    };

    exposed.route('/signin', {
        name: 'signin',
        action: function(params) {
            BlazeLayout.render("layout", {
                left: "left",
                main: "login"
            });
        }
    });