deza = {}

deza.load = function(name, url, callBack) {
    var parseAttr = function(data) {
        var attr = {};
        for (var i = 0; i < data.length; ++i) {
            attr[data[i].id] = data[i];
        }

        return attr;
    }

    var requestData = function(loadData) {
        $.ajax({
            dataType: 'json',
            method: 'GET',
            url: url,
            success: function (response) {
                localforage.setItem(url, response, loadData);
            }
        });
    }

    var loadData = function() {
        localforage.getItem(url, function(err, attr) {
            if(attr) {
                window.deza[name] = parseAttr(attr.data);
                if (callBack) {
                    callBack(name);
                }
            } else {
                requestData(loadData);
            }
        });
    }

    loadData();
}

deza.requireAttrs = function(attrs, callBack) {
    var queue = attrs;

    var ready = function(attr) {
        queue.splice(queue.indexOf(attr), 1);

        if (queue.length == 0) {
            callBack();
        }
    }

    attrs.forEach(function(attr) {
        deza.load(attr, "/graphs/dataviva/"+attr+"/", ready);
    });
}
