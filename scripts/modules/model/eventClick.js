define([
    'helper/eachModel',
    'modules/model/eventRender'
    ], function(eachModel, render) {

    'use strict';

    var eventClick;

    // Event: Creating the post preview click action
    eventClick = function() {
        // Looping through each model
        eachModel(function(model, i){

            if(model.events) {
                // Adding the click event to the model
                model.events.preview.addEventListener('click', function(event) {
                    // Activating the render method
                    render(event, model);
                }, false);
            }

            // Adding the render method to the model
            model.override('render', function() {
                render(false, model);
            });

        });

        // Returning true
        return true;
    };

    return eventClick;

});