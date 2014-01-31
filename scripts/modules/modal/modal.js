define(function(exports) {

    'use strict';

    // Defining the require scripts
    // var blogTemplate = require('modules/templates/template.blog');
    var templatePostFeatured = document.getElementById('templatePostFeatured');
    var templatePostBlog = document.getElementById('templatePostBlog');
    var templateMobilePostBlog = document.getElementById('templateMobilePostBlog');
    var templatePostList = document.getElementById('templatePostList');

    // Defining the modal status for activation
    var initStatus = false;
    var modalStatus = false;

    var modalData = {};

    // Fn: Adding the preview modal to the DOM
    var addModal = function() {

        // Check modalStatus, return false if it's true
        if(modalStatus) {
            return false;
        }

        var templateHeader = document.getElementById('templatePreviewHeader');

        // Switching the modalStatus to true
        modalStatus = true;

        // Create the modal wrapper div element
        var modalWrapper = document.createElement('div');
        modalWrapper.id = 'preview-modal-wrapper';
        modalWrapper.classList.add('preview-modal-wrapper');

        // Create the modal div element
        var modal = document.createElement('div');
        modal.id = 'preview-modal';
        modal.classList.add('preview-modal');

        // Create the modal container element
        var modalContainer = document.createElement('div');
        modalContainer.id = 'preview-modal-container';
        modalContainer.classList.add('preview-modal-container');

        // Create the modal UI element
        var modalUi = document.createElement('div');
        modalUi.id = 'preview-modal-ui';
        modalUi.classList.add('preview-modal-ui');

        // Create the modal header element
        var modalHeader = document.createElement('div');
        modalHeader.id = 'preview-modal-header';
        modalHeader.classList.add('preview-modal-header');

        modalHeader.innerHTML = templateHeader.innerHTML;

        // Append the header and UI elements into the container
        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalUi);

        // Append the modal and modal container into the wrapper
        modalWrapper.appendChild(modal);
        modalWrapper.appendChild(modalContainer);

        // Append the modal wrapper into the body of the DOM
        document.body.appendChild(modalWrapper);

        var modalClose = document.getElementById('preview-modal-close');
        var modalEdit = document.getElementById('preview-edit-post-link');
        var previous = document.getElementById('preview-previous-post');
        var next = document.getElementById('preview-next-post');

        // Pushing the eles to the Data API
        modalData.els = {
            close: modalClose,
            container: modalContainer,
            edit: modalEdit,
            header: modalHeader,
            modal: modal,
            next: next,
            previous: previous,
            wrapper: modalWrapper,
            ui: modalUi
        };

        // Returning true
        return true;

    };

    // Fn: Method to generate the preview UI inside the preview modal
    var modalCreateUi = function(data) {
        if(!data) {
            return false;
        }

        var articleWrapContent = '';
        var articleWrap = document.createElement('div');
        articleWrap.classList.add('article-wrap', 'preview-modal-ui-container');

        // Templating the data using underscore
        var featured = _.template(templatePostFeatured.innerHTML);
        var blog = _.template(templatePostBlog.innerHTML);
        var mobile = _.template(templateMobilePostBlog.innerHTML);
        var list = _.template(templatePostList.innerHTML);

        // Adding the templated DOM elements to the articleWrap innerHTML
        articleWrapContent += featured(data);
        articleWrapContent += blog(data);
        articleWrapContent += mobile(data);
        articleWrapContent += list(data);

        // Updating the articleWrap with the templated data
        articleWrap.innerHTML = articleWrapContent;

        return articleWrap;

    };

    // Fn: Rendering the modal's UI
    var modalRender = function(model, data) {

        // Return false if model and data are not defined
        if(!model || !data) {
            return false;
        }

        // Set the memoized template
        var memoTemplate = model.get('template');

        var modalUi = modalData.els.ui;

        // Defining the new template. Use memoized if avaialble
        var modalUiTemplate = memoTemplate ? memoTemplate : modalCreateUi(data);

        // Clearing the modal UI DOM
        modalUi.innerHTML = '';

        // Injecting the template
        modalUi.appendChild(modalUiTemplate);

        // Set the template into the model if not already set
        if(!memoTemplate) {
            model.set('template', modalUiTemplate);
        }

        // Return the new modal UI
        return modalUi;

    };

    // Fn: Setting up the events for the preview modal
    var modalEventSetup = function() {

        // Return false if Data.els are not defined
        if(!modalData.els) {
            return false;
        }

        var modalEls = modalData.els;

        modalEls.close.addEventListener('click', modalEventTriggerDeactivate, true);

        // Bind a click event to the modal to deactivate it
        // modal.addEventListener('click', modalEventTriggerDeactivate, true);
    };

    // Event: Activating the preview modal
    var modalEventTriggerActivate = function() {
        var wrapper = modalData.els.wrapper;
        wrapper.classList.add('active');

        modalData.els.ui.focus();
        modalData.els.ui.setAttribute('tabindex', -1);

        document.body.classList.add('preview-modal-lock');

        exports.status = true;

        return this;
    };

    // Event: Deactivating the preview moal
    var modalEventTriggerDeactivate = function() {
        var wrapper = modalData.els.wrapper;
        wrapper.classList.remove('active');

        modalData.els.ui.blur();
        modalData.els.ui.removeAttribute('tabindex');

        document.body.classList.remove('preview-modal-lock');

        exports.status = false;

        return this;
    };

    // Fn: Setting up the preview modal
    var init = function() {
        if(initStatus) {
            return false;
        }
        initStatus = true;

        addModal();
        modalEventSetup();

    };

    // Initializing the modal setup
    init();

    exports = {
        add: addModal,
        Data: modalData,
        events: {
            activate: modalEventTriggerActivate,
            deactivate: modalEventTriggerDeactivate
        },
        init: init,
        render: modalRender,
        status: false
    };

    return exports;

});