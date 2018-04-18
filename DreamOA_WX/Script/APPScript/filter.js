angular.module('app.filters', [])
.filter("columnDisplayFilter", function ($filter) {
    return function (input) {
        if (input.filter != "") {
            if (input.filter == "date") {
                return inputdate = $filter("date")(input.value, input.format);
            }
            else {
                return input.value;
            }
        }
        else {
            return input.value;
        }
    }
})
.filter("queryItem", function () {
    return function (list, query) {
        if (query) {
            var returnVal = new Array();
            for (var j = 0; j < list.length; j++) {
                item = list[j];
                for (var i = 0; i < item.rowListColumnData.length; i++) {
                    if (item.rowListColumnData[i].istitle == true) {
                        if (item.rowListColumnData[i].value.indexOf(query) > -1) {
                            returnVal.push(item);
                        }
                    }
                }
            }
            return returnVal;
        }
        else {
            return list;
        }
    }
})
.filter("queryStuList", function () {
    return function (list, query) {
        if (query) {
            var returnVal = new Array();
            for (var j = 0; j < list.length; j++) {
                var item = list[j];
                if (item.bt.indexOf(query) > -1 || (item.bt2!=undefined&& item.bt2.indexOf(query) > -1)) {
                    returnVal.push(item);
                }
            }
            return returnVal;
        }
        else {
            return list;
        }
    }
})
    .filter("queryOaList", function () {
        return function (list, query) {
            if (query) {
                console.log("[queryOaList] " + query);
                var returnVal = new Array();
                for (var j = 0; list && j < list.length; j++) {
                    var item = list[j];
                    if (item.modulename.indexOf(query) > -1 || item.itemscontent.indexOf(query) > -1 || item.name.indexOf(query) > -1) {
                        returnVal.push(item);
                    }
                }
                return returnVal;
            }
            else {
                return list;
            }
        }
    })
.filter("SPZTFilter", function ($filter) {
    return function (input) {
        var returnVal = "";
        switch (input) {
            case "0": returnVal = "未审核"; break;
            case "1": returnVal = "同意"; break;
            case "-1": returnVal = "不同意"; break;
        }
        return returnVal;
    }
})
.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
