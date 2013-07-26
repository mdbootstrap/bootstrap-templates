$('.example_typeahead > > input').tagsinput({
  source: function(query) {
    return $.getJSON('citynames.json')
            .success(function(citynames) {
              return citynames;
            });
  }
});

$('.example_objects_as_tags > > input').tagsinput({
  itemValue: 'value',
  itemText: 'text',
  source: function(query) {
    return $.getJSON('cities.json')
            .success(function(cities) {
              return cities;
            });
  }
});
$('.example_objects_as_tags > > input').tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
$('.example_objects_as_tags > > input').tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
$('.example_objects_as_tags > > input').tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
$('.example_objects_as_tags > > input').tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
$('.example_objects_as_tags > > input').tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });

$('.example_tagclass > > input').tagsinput({
  tagClass: function(item) {
    switch (item.continent) {
      case 'Europe'   : return 'badge badge-info';
      case 'America'  : return 'label label-important';
      case 'Australia': return 'badge badge-success';
      case 'Africa'   : return 'label label-inverse';
      case 'Asia'     : return 'badge badge-warning';
    }
  },
  itemValue: 'value',
  itemText: 'text',
  source: function(query) {
    return $.getJSON('cities.json')
            .success(function(cities) {
              return cities;
            });
  }
});
$('.example_tagclass > > input').tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
$('.example_tagclass > > input').tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
$('.example_tagclass > > input').tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
$('.example_tagclass > > input').tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
$('.example_tagclass > > input').tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });

prettyPrint();

$(function() {
  $('input, select').on('change', function(event) {
    var $element = $(event.target),
      $container = $element.closest('.example');

    if (!$element.data('tagsinput'))
      return;

    var val = $element.val();
    $('pre.val', $container).html( ($.isArray(val) ? JSON.stringify(val) : val ));
    $('pre.items', $container).html(JSON.stringify($element.tagsinput('items')));
  }).trigger('change');
});