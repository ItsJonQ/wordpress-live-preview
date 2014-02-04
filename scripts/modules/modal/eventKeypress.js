define([
    'api',
    'modules/modal/modal',
    'modules/modal/eventNavigation'
    ], function(Api, modal, eventNavigation) {

    'use strict';

    var eventKeypress;
    var postEditStatus = Api.check.postEdit();

    // Event: Keyboard left/right navigation
    eventKeypress = function() {

        document.body.onkeydown = (function(e){

            // Return false if the modal isn't active
            if(!modal.status) return;

            if(!postEditStatus) {
                // Left for previous posts
                if((e.keyCode || e.which) === 37)
                {
                    eventNavigation('previous');
                }

                // Right for next post
                if((e.keyCode || e.which) === 39)
                {
                    eventNavigation('next');
                }
            }

            // Escape to Close the modal
            if((e.keyCode || e.which) === 27)
            {
                modal.events.deactivate();
            }

        });

    };

    return eventKeypress;

});