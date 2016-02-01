// Scenarios API end point

Picker.route('/api/scenarios/', function(params, req, res, next) {

    var limitVal = (params.query.limit !== undefined) ? parseInt(params.query.limit, 10) : 200;
    var sortVal = (params.query.sort !== undefined) ? parseInt(params.query.sort, 10) : 1;
    var statusVal = (params.query.status !== undefined) ? parseInt(params.query.status, 10) : 0;

    var parameters = {
        status: statusVal
    };

    var options = {
        sort: {
            createdAt: sortVal
        },
        limit: limitVal
    };

    var result = Scenarios.find(parameters, options).fetch();

    if (params.query.pretty) {
        res.end(JSON.stringify(result, null, '\t'));
    }
    else {
        res.end(JSON.stringify(result));
    }

});

// ScenarioRuns API end point

Picker.route('/api/scenarioruns/', function(params, req, res, next) {

    var limitVal = (params.query.limit !== undefined) ? parseInt(params.query.limit, 10) : 200,
        sortVal = (params.query.sort !== undefined) ? parseInt(params.query.sort, 10) : 1,
        statusVal = (params.query.status !== undefined) ? parseInt(params.query.status, 10) : 0,

        parameters = {
            status: statusVal
        },

        options = {
            sort: {
                createdAt: sortVal
            },
            limit: limitVal
        };

    var result = ScenarioRuns.find(parameters, options).fetch();
    if (params.query.pretty) {
        res.end(JSON.stringify(result, null, '\t'));
    }
    else {
        res.end(JSON.stringify(result));
    }

});