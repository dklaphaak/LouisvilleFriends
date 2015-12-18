//*** Trying to adapt this code to generate top-level navigation menus on the fly. Ideally, updates to the navigation of a site
//would be much easier if I only have to create or destroy a new object in data array. I forget where the original code came
//from, but it was originally intended to dynamically generate static menus on web page.
//
//

//*************************************************************
//Start of JSON data for dynamic menu generator 
//*************************************************************
var data = [
{
    "text": "Chocolate Beverage",
    "id": "1",
    "parentid": "-1"
}, {
    "id": "2",
    "parentid": "1",
    "text": "Hot Chocolate"
}, {
    "id": "3",
    "parentid": "1",
    "text": "Peppermint Hot Chocolate"
}, {
    "id": "4",
    "parentid": "1",
    "text": "Salted Caramel Hot Chocolate"
}, {
    "id": "5",
    "parentid": "1",
    "text": "White Hot Chocolate"
}, {
    "id": "6",
    "text": "Espresso Beverage",
    "parentid": "-1"
}, {
    "id": "7",
    "parentid": "6",
    "text": "Caffe Americano"
}, {
    "id": "8",
    "text": "Caffe Latte",
    "parentid": "6"
}, {
    "id": "9",
    "text": "Caffe Mocha",
    "parentid": "6"
}, {
    "id": "10",
    "text": "Cappuccino",
    "parentid": "6"
}, {
    "id": "11",
    "text": "Pumpkin Spice Latte",
    "parentid": "6"
}, {
    "id": "12",
    "text": "Frappuccino",
    "parentid": "-1"
}, {
    "id": "13",
    "text": "Caffe Vanilla Frappuccino",
    "parentid": "12"
}, {
    "id": "15",
    "text": "450 calories",
    "parentid": "13"
}, {
    "id": "16",
    "text": "16g fat",
    "parentid": "13"
}, {
    "id": "17",
    "text": "13g protein",
    "parentid": "13"
}, {
    "id": "14",
    "text": "Caffe Vanilla Frappuccino Light",
    "parentid": "12"
}]

// End of JSON data 



//*************************************************************
//Begin JavaScript to dynamically generate menus from JSON data
//*************************************************************

//Walk through the JSON objects to build a heirarchic data string 
var builddata = function () {
    var source = [];
    var items = [];
    // build hierarchical source.
    for (i = 0; i < data.length; i++) {
        var item = data[i];
        var label = item["text"];
        var parentid = item["parentid"];
        var id = item["id"];

        if (items[parentid]) {
            var item = { parentid: parentid, label: label, item: item };
            if (!items[parentid].items) {
                items[parentid].items = [];
            }
            items[parentid].items[items[parentid].items.length] = item;
            items[id] = item;
        }
        else {
            items[id] = { parentid: parentid, label: label, item: item };
            source[id] = items[id];
        }
    }
    //console.log(source);
    return source;
}
var source = builddata();

//Travese the data, build the UL and LIs
var buildUL = function (parent, items) {
    $.each(items, function () {
        if (this.label) {
            // create LI element and append it to the parent element.
            var anchorHREF = "../"+this.label+".html";
            var li = $("<li><a href="+"'"+anchorHREF+"'"+">"+this.label+"</a></li>");
            li.appendTo(parent);
            // if there are sub items, call the buildUL function.
            if (this.items && this.items.length > 0) {
                var ul = $("<ul></ul>");
                ul.appendTo(li);
                buildUL(ul, this.items);
            }
        }
    });
}
var ul = $("<ul></ul>");
ul.appendTo("#jqxMenu");
buildUL(ul, source);


//Create the menu
$("#jqxMenu").jqxMenu({ width: '600', height: '30px'});
//$("#jqxMenu", { width: '600', height: '30px'});

//document.write(ul);