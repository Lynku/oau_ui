(function($) {

    $.fn.displayUsers = function(options) {

        // Default options
        var settings = $.extend({
            url: null,
            fields: [],
            styles: ""
        }, options);
        if (settings.url == null) return;

        var table = $('<table>');
        table.addClass(settings.styles);
        //create each td
        function createCell(key, val, isHeder = false) {
            var cell = null;
            //if we have specific fields  create td only for them
            if (settings.fields.length > 0) {
                //for heard comper only the values for the rest compere the keys
                var ckecker = isHeder ? val : key;
                //get onlt the specific fields
                if (settings.fields.indexOf(ckecker) > -1) {
                    cell = isHeder ? $('<th/>') : $('<td/>');
                    cell.text(val);
                }
            } else {
                cell = isHeder ? $('<th/>') : $('<td/>');
                cell.text(val);
            }
            return cell;
        }

        //create each tr
        function createRow(array, heder = false) {
            var tr = $('<tr/>');
            $.each(array, function(key, val) {
                var td = createCell(key, val, heder);
                if (td != null) {
                    tr.append(td);
                }
            });
            return tr;
        }
        //get data
        $.ajax({
                url: settings.url,
                method: 'GET',
                dataType: "json"
            }).done(function(jsonData) {
                if (jsonData.length) {
                    //create table heder
                    var heder = createRow(Object.keys(jsonData[0]), true);
                    table.append(heder);
                    //create table body
                    $.each(jsonData, function(i, obj) {
                        var row = createRow(obj);
                        table.append(row);
                    });
                } else {
                    var row = createRow(['No data found'], true);
                    table.append(row);
                }
            }).fail(function(jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            })
            // Apply options

        return this.append(table);

    };

}(jQuery));


$(document).ready(function() {
    $("#listShort").displayUsers({ url: "http://api.vhsoft.ro/v1/users?name=clark", styles: "table table-striped", fields: ['ud', 'lastname', 'firstname'] });
    $("#list").displayUsers({ url: "http://api.vhsoft.ro/v1/users?name=clark", styles: "table table-striped" });
    $("#unq").displayUsers({ url: "http://api.vhsoft.ro/v1/user/78", styles: "table table-dark" });
    $("#nothing").displayUsers({ url: "http://api.vhsoft.ro/v1/user/178", styles: "table" });
});