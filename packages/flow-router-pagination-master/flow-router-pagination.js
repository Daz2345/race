var paginationBar;

Template.paginationBar.helpers({
  isRequired: function(count) {
    var total;
    total = Math.ceil(Counts.get(count) / this.itemsPerPage);
    return (total > 0);
  },
  pages: function(count) {
    var current, total;
    current = parseInt(FlowRouter.getQueryParam('page'), 10) || 0;
    total = Math.ceil(Counts.get(count) / this.itemsPerPage);
    return paginationBar(this.window, total, current);
  },
  pageNumber: function() {
    return this + 1;
  },
  selected: function() {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page'), 10) || 0;
    if (parseInt(this, 10) === current) {
      return 'active';
    } else {
      return '';
    }
  },
  showMinus: function() {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page'), 10) || 0;
    return current !== 0;
  },
  showPlus: function(count) {
    var all, current, total;
    current = parseInt(FlowRouter.getQueryParam('page'), 10) || 0;
    total = Math.ceil(Counts.get(count) / this.itemsPerPage);
    all = paginationBar(this.window, total, current);
    return current !== all.slice(-1)[0];
  }
});

Template.paginationBar.events({
  'click .first': function(e, t) {
    return FlowRouter.setQueryParams({
      page: 0
    });
  },
  'click .last': function(e, t) {
    var total;
    total = Math.ceil(Counts.get(this.count) / this.itemsPerPage);
    return FlowRouter.setQueryParams({
      page: total - 1
    });
  },
  'click .plus': function(e, t) {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page'), 10) || 0;
    return FlowRouter.setQueryParams({
      page: current + 1
    });
  },
  'click .minus': function(e, t) {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page'), 10) || 0;
    return FlowRouter.setQueryParams({
      page: current - 1
    });
  },
  'click .change-page': function(e, t) {
    var page;
    page = $(e.target).attr('page');
    page = parseInt(page, 10);
    return FlowRouter.setQueryParams({
      page: page
    });
  }
});

paginationBar = function(pwindow, total, current) {
  var end, ini, middle, _i, _results;
  middle = Math.ceil(pwindow / 2);
  ini = current - middle;
  end = current + middle;
  if (ini < 0) {
    ini = 0;
    if (total > pwindow) {
      end = pwindow;
    } else {
      end = total;
    }
  } else if (end >= total) {
    end = total;
    ini = end - pwindow;
    if (ini < 0) {
      ini = 0;
    }
  }
  return (function() {
    _results = [];
    for (var _i = ini; ini <= end ? _i < end : _i > end; ini <= end ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this);
};