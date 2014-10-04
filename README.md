# Bootstrap Tags Input w/ itemValue & freeinput
Bootstrap Tags Input is a jQuery plugin providing a Twitter Bootstrap user interface for managing tags. I have made a small feature addition in order to use *object value/text* with *free input*.
This makes each freeinput tag addition attempt with a new event *beforeFreeInputItemAdd* 

# Difference
* beforeFreeInputItemAdd event
* When itemValue is set, freeInput can still be used

# Example
    var myTags = []

    var tagToken = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: [{'text': 'Choice1', 'value': 1}, {'text': 'Choice2', 'value': 2}, {'text': 'Choice3', 'value': 3}]
    });

    options = {
        itemValue: 'value',
        itemText: 'text',
        trimValue: true,
        freeInput: true,
        typeaheadjs: {
            hint: true,
            highlight: true,
            name: 'myinput',
            displayKey: 'text',
            source: tagToken.ttAdapter(),
        },
    };

    $('#myinput').tagsinput(options);

    $('#myinput').on('beforeFreeInputItemAdd', function(event) {
        //event.item is the freeinput text
        // we should convert that into acceptable item
        // and change "cancel" to false that is default behaviour
        $.newTagIds_forThisElement==undefined ? $.newTagIds_forThisElement = [1000] : ""; // I would like my new addition tags start with index 1001
        lastId = $.newTagIds_forThisElement.pop();
        $.newTagIds_forThisElement.push(lastId);
        $.newTagIds_forThisElement.push(lastId+1);
        event.item = {'text': event.item, 'value': lastId+1};
        event.cancel = false;  
    });


# Warning
* Already imported tag list and new free input may collide because of new *ID*s
