define(['api'], function(Api) {

    var eachModel;

    // Fn: Helper method to loop through each model
    eachModel = function(callback) {

        // Defining the collection
        var collection = Api.Data.posts.collection;

        // Return false if collection is not defined
        if(!collection) { return false; }

        // Defining the models from the collection
        var models = collection.models;

        // Make sure the collection is valid and has models in it
        if(models.length === 0) {
            return false;
        }

        // Looping through all the models and initializing the callback, if defined
        for(var i = 0, len = models.length; i < len; i++) {
            var model = models[i];
            if(callback !== undefined && typeof callback === 'function') {
                callback(model, i);
            }
        }
        // Returning true
        return true;

    };

    return eachModel;

});