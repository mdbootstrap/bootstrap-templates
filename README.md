# Bootstrap Tags Input [![Build Status](https://travis-ci.org/timschlechter/bootstrap-tagsinput.svg?branch=master)](https://travis-ci.org/TimSchlechter/bootstrap-tagsinput)
Bootstrap Tags Input is a jQuery plugin providing a Twitter Bootstrap user interface for managing tags.

## Usage
Examples can be found [here](http://timschlechter.github.com/bootstrap-tagsinput/examples/).

## Features
* Objects as tags
* True multi value
* Typeahead
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

## Development
Install dependencies:
<pre>
npm install
bower install
</pre>
Test:
<pre>
grunt test
</pre>
Build:
<pre>
grunt build
</pre>

## History
- 0.5
  - [Added an optional 3rd parameter to the "add" and "remove" methods](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/298)
- 0.4
  - [Fix typeahead when using Bootstrap 3](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/73)
- 0.3.13
  -  [#5: Trigger events on original input/select](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/5)
  -  Loads of fixes merged with help of @janvt, @rlidwka and @kuraga: thanks for helping me out!
- 0.3.9
  -  [#48: Type ahead stops when entering second character](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/48)
- 0.3.8
  -  [#43: Add support for placeholder](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/43)
  -  [#46: ie 8 compatibility, replace indexOf method](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/46)
- 0.3.7
  -  [#39: flash when duplicate is entered](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/39)
- 0.3.6
  -  [#34: Error in ReloadPage](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/34)
- 0.3.5
  -  [#10: confirmKeys option](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/10)
- 0.3.4
  -  [#24: Add bsTagsInput angular directive & example for bootstrap3 with typeahea...](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/24)
  -  [#28: Limit number of tags, enable/disable input](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/28)
  -  [#33: Avoid conflict with other selects when checking for value presence](https://github.com/TimSchlechter/bootstrap-tagsinput/pull/33)

## License
This project is licensed under [MIT](https://raw.github.com/TimSchlechter/bootstrap-tagsinput/master/LICENSE "Read more about the MIT license").
