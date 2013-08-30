# Bootstrap Tags Input [![Build Status](https://travis-ci.org/TimSchlechter/bootstrap-tagsinput.png?branch=master)](https://travis-ci.org/TimSchlechter/bootstrap-tagsinput)
Bootstrap Tags Input is a jQuery plugin providing a Twitter Bootstrap user interface for managing tags.

## Usage
Examples can be found [here](http://timschlechter.github.com/bootstrap-tagsinput/examples/).

## Features
* Objects as tags
* True multi value
* Typeahead
* AngularJS directive included
* Designed for Bootstrap 2.3.2 and 3

### Objects as tags
Not just support for using strings! This means you can use different values
for a tag's label and value. Each tag also holds a reference to the object
by which it was created, so by calling <code>tagsinput('items')</code> an
array of the original items is returned.
  
### True multi value support
Other implementations just concatenate the values to a comma separated string.
This results in <code>val()</code> returning just this string, and when
submitting the form, only one big, concatenated value is sent in the request.

Bootstrap Tags Input provides true multivalue support. Just use a 
<code>&lt;select multiple /&gt;</code> as your input element, and 
<code>val()</code> will return an array of the tag values. When submitting the
form, an array of values will be sent with the request.

### Typeahead support
Integrates with Twitter Bootstraps' 2.3.2 typeahead, or use custom typeahead when using Bootstrap 3.

### Angular JS directive
Include [bootstrap-tagsinput-angular.js](https://github.com/TimSchlechter/bootstrap-tagsinput/blob/master/src/bootstrap-tagsinput-angular.js) and register the 'bootstrap-tagsinput' in your Angular JS application to use the bootstrap-tagsinput directive. Look at [the examples page](http://timschlechter.github.io/bootstrap-tagsinput/examples/#angular) how to use the directive.

## License
This project is licensed under [MIT](https://raw.github.com/TimSchlechter/bootstrap-tagsinput/master/LICENSE "Read more about the MIT license").