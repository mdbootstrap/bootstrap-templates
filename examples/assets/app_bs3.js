var elt = $('.example_typeahead > > input');

elt.tagsinput();
elt.tagsinput('input').typeahead({
  prefetch: 'citynames.json'
}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	this.tagsinput('add', datum.value);
	this.tagsinput('input').typeahead('setQuery', '');
}, elt));

elt = $('.example_objects_as_tags > > input');
elt.tagsinput({
  itemValue: 'value',
  itemText: 'text'
});
elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });

elt.tagsinput('input').typeahead({
  valueKey: 'text',
  prefetch: 'cities.json',
  template: '<p>{{text}}</p>',                                       
  engine: Hogan

}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	this.tagsinput('add', datum);
	this.tagsinput('input').typeahead('setQuery', '');
}, elt));

elt = $('.example_tagclass > > input');
elt.tagsinput({
  tagClass: function(item) {
    switch (item.continent) {
      case 'Europe'   : return 'label label-primary';
      case 'America'  : return 'label label-danger label-important';
      case 'Australia': return 'label label-success';
      case 'Africa'   : return 'label label-default';
      case 'Asia'     : return 'label label-warning';
    }
  },
  itemValue: 'value',
  itemText: 'text'
});
elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });

elt.tagsinput('input').typeahead({
  valueKey: 'text',
  prefetch: 'cities.json',
  template: '<p>{{text}}</p>',                                       
  engine: Hogan
}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	this.tagsinput('add', datum);
	this.tagsinput('input').typeahead('setQuery', '');
}, elt));