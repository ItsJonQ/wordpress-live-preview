define(['helper/eachModel'], function(eachModel) {

    'use strict';

    var eventUpdateViewStatus;

    // Fn: Updating the viewStatus of the model
    eventUpdateViewStatus = function(model) {

        if(!model) { return false; }

        eachModel(function(m, i){
            m.attributes.viewStatus = false;
        });


        model.attributes.viewStatus = true;

    };

    return eventUpdateViewStatus;

});