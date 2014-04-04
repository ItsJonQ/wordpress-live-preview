(function($) {

    'use strict';

    // Execute the modulated App after jQuery and Document is ready
    $(document).on('ready', function() {
        require(['app'], function(App) {
            // Initializing the App
            App.init();

        });
    });

})(jQuery);