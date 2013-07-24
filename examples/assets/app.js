$('#example_typeahead > > input').tagsinput({
	source: ['Amsterdam', 'New York', 'Sydney', 'Caïro', 'Beijing']
});

$('#example_objects_as_tags > > input').tagsinput({
	itemValue: 'value',
	itemText: 'text',
	source: [
		{ value: 1, text: 'Amsterdam' },
		{ value: 2, text: 'New York'  },
		{ value: 3, text: 'Sydney'    },
		{ value: 4, text: 'Caïro'     },
		{ value: 5, text: 'Beijing'   }
	]
});
$('#example_objects_as_tags > > input').tagsinput('add', { value: 1, text: 'Amsterdam' });
$('#example_objects_as_tags > > input').tagsinput('add', { value: 2, text: 'New York'  });

$('#example_tagclass > > input').tagsinput({
	itemValue: 'value',
	itemText: 'text',
	source: [
		{ value: 1, text: 'Amsterdam', continent: 'Europe'    },
		{ value: 2, text: 'New York' , continent: 'America'   },
		{ value: 3, text: 'Sydney'   , continent: 'Australia' },
		{ value: 4, text: 'Caïro'    , continent: 'Africa'    },
		{ value: 5, text: 'Beijing'  , continent: 'Asia'      }
	],
	tagClass: function(item) {
		switch (item.continent) {
			case 'Europe'   : return 'badge badge-info';
			case 'America'  : return 'label label-important';
			case 'Australia': return 'badge badge-success';
			case 'Africa'   : return 'label label-inverse';
			case 'Asia'     : return 'badge badge-warning';
		}
	}
});
$('#example_tagclass > > input').tagsinput('add', { value: 2, text: 'New York', continent: 'America'   });
$('#example_tagclass > > input').tagsinput('add', { value: 3, text: 'Sydney'  , continent: 'Australia' });

window.prettyPrint && prettyPrint();