(function($) {
    $(document).on('ready', function() {
        require(['vendor/underscore', 'app'], function(_, App) {

            App.init();

        });
    });
})(jQuery);