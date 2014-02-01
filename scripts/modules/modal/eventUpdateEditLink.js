define(['modules/modal/modal'], function(modal) {

    'use strict';

    var eventUpdateEditLink;

    // Fn: Updating the "Edit" link of the preview modal
    eventUpdateEditLink = function(model) {

        // Return false if the model is not defined
        if(!model) { return false; }

        // Defining the edit button
        var editButton = modal.Data.els.edit;

        // Return false if the edit button is not defined
        if(!editButton) { return false; }

        // Updating the edit button's href attribute with the model's edit URL
        editButton.href = model.get('editUrl');

        // Return true
        return true;

    };

    return eventUpdateEditLink;

});