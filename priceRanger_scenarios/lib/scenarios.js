Scenarios = new Mongo.Collection("scenarios");

ScenariosSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Scenarios.basic = {
      priceStrat_ce:0,
      priceStrat_de:0,
      npEvaluation:0,
      shelfReview:0,
      stores:0,
      products:0
};

Scenarios.withProducts = {
      priceStrat_ce:0,
      priceStrat_de:0,
      npEvaluation:0,
      shelfReview:0,
      stores:0
};