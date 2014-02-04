define([
    'api',
    'modules/modal/modal',
    'modules/modal/eventNavigation'
    ], function(Api, modal, navigation) {

    'use strict';

    var eventClickNavigation;

    // Fn: Click navigation for the modal's arrows
    eventClickNavigation = function() {
        var header = modal.Data.els;

        if(!header) { return false; }

        var edit = header.edit;
        var previous = header.previous;
        var next = header.next;

        // Setup click handlers if the page is the post list
        if(Api.check.postList()) {

            previous.addEventListener('click', function(e) {
                e.preventDefault();
                navigation('previous');
            }, false);

            next.addEventListener('click', function(e) {
                e.preventDefault();
                navigation('next');
            }, false);

        } else {

            // Remove the click handlers if the page is an edit page
            if(Api.check.postEdit()) {

                previous.parentNode.removeChild(previous);
                next.parentNode.removeChild(next);
                edit.parentNode.removeChild(edit);

            }

        }


        return true;

    };

    return eventClickNavigation;

});