define([
    'util/getPost',
    'modules/modal/modal',
    'modules/model/eventUpdateViewStatus',
    'modules/modal/eventUpdateEditLink',
    ],function(getPost, modal, updateViewStatus, updateEditLink) {

   'use strict';

    var eventRender;

    // Event: Rendering the Model's UI in the popup
    eventRender = function(e, model) {

        // Return false if the model is not defined
        if(!model) {
            return false;
        }

        // If Event is defined, execute preventDefault() on the event
        if(e) { e.preventDefault(); }

        // Defining the model's ID
        var id = model.get('id');

        // Updating the viewStatus attribute of the model
        updateViewStatus(model);

        // Updating the edit link of the preview modal
        updateEditLink(model);

        // Optimization: Return the template if the template is defined
        if(model.get('template')) {

            // Activate the pop up modal
            modal.events.activate();
            // Render the modal(model, nonFalse value)
            modal.render(model, true);
            // Return true
            return true;

        }

        // Initializing the Wordpress ajax call
        getPost(id, function(data) {
            // Defining "post" from the response data
            var post = data.post;
            // Activate the pop up modal
            modal.events.activate();
            // Render the modal(model, responseData)
            modal.render(model, post);

        });
        // Return true
        return true;
    };

    return eventRender;

});