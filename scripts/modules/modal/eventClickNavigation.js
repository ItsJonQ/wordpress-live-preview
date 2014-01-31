define([
    'modules/modal/modal',
    'modules/modal/eventNavigation'
    ], function(modal, navigation) {

    'use strict';

    var eventClickNavigation;
    // Fn: Click navigation for the modal's arrows
    eventClickNavigation = function() {
        var header = modal.Data.els;

        if(!header) { return false; }

        var previous = header.previous;
        var next = header.next;

        previous.addEventListener('click', function(e) {
            e.preventDefault();
            navigation('previous');
        }, false);

        next.addEventListener('click', function(e) {
            e.preventDefault();
            navigation('next');
        }, false);

        return true;

    };

    return eventClickNavigation;

});