define(function(define, exports, module) {

    'use strict';

    // Fn: Method to Check Page List
    var checkPageListPage = function() {
        if(window.pagenow === 'edit-page') {
            return true;
        } else {
            return false;
        }
    };

    // Fn: Method to Check Post List Page
    var checkPostListPage = function() {

        // Return false if page is Page list
        if(checkPageListPage()) { return false; }

        // Return false if the page is not a post-edit page
        if(window.pagenow !== undefined && window.pagenow.indexOf('edit-') !== -1) {
            return true;
        } else {
            return false;
        }
    };

    // Fn: Method to Check Post Edit Page
    var checkPostEditPage = function() {

        // Return false if page is Page list
        if(checkPageListPage()) { return false; }

        // Return false if the page is not
        if(window.edCanvas) {
            return true;
        } else {
            return false;
        }
    };

    exports = {
        pageList: checkPageListPage,
        postEdit: checkPostEditPage,
        postList: checkPostListPage
    };

    return exports;

});