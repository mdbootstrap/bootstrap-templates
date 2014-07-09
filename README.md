# Bootstrap Tags Input [![Build Status](https://travis-ci.org/TimSchlechter/bootstrap-tagsinput.png?branch=master)](https://travis-ci.org/TimSchlechter/bootstrap-tagsinput)
Bootstrap Tags Input is a jQuery plugin providing a Twitter Bootstrap user interface for managing tags.

## Usage
Examples can be found [here](http://timschlechter.github.com/bootstrap-tagsinput/examples/).

## Development
This plugin got more populair than I anticipated. The last couple of months I could not find the time to maintain it, sorry for all pull requests that are not handled yet.
I'm trying to pick things up again but could use some help. If you like to help working on this plugin please join [this conversation](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/158).


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

## History

__0.3.9__
* [#48: Type ahead stops when entering second character](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/48)

__0.3.8__
* [#43: Add support for placeholder](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/43)
* [#46: ie 8 compatibility, replace indexOf method](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/46)

__0.3.7__
* [#39: flash when duplicate is entered](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/39)

__0.3.6__

* [#34: Error in ReloadPage](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/34)

__0.3.5__

* [#10: confirmKeys option](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/10)

__0.3.4__

* [#24: Add bsTagsInput angular directive & example for bootstrap3 with typeahea...](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/24)
* [#28: Limit number of tags, enable/disable input](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/28)
* [#33: Avoid conflict with other selects when checking for value presence](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/33)

## License
This project is licensed under [MIT](https://raw.github.com/TimSchlechter/bootstrap-tagsinput/master/LICENSE "Read more about the MIT license").