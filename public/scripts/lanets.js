var lanets = {}; //namespace

lanets = (function(){
    
    //Private members
    var progressValue;

    function emptyUsernameField() {
        var field = $("#loginusername");
        if(field.val() == "Nom d'utilisateur" || field.val() == "Username") {
            field.val("");
        }
    }
    function emptyPasswordField() {
        var field = $("#loginpassword");
        if(field.val() == "Mot de passe" || field.val() == "Password") {
            field.val("");
        }
    }
    
    function toggleClan() {
        //when the dropdown is visible, the text area is invisible
        $("#clanNameDropDown").toggle();
        $("#clanNameText").toggle();
        //if he's changing from creating a clan to choose a clan or vice versa, you empty the clan name in creating a clan
        $("#clanName").val("");
    }
    
    function animateProgressBar() {
        initProgressBar();
        updateProgressBar();
        setTimeout(updateProgressBar,100);
    }
    
    function initProgressBar() {
        progressValue = 0;
        $( "#progressbar" ).progressbar({
            value: progressValue
        });
    }
    
    function updateProgressBar(){           
        $( "#progressbar" ).progressbar({
            value: ++progressValue
        });
        if(progressValue < 100) {
            setTimeout(updateProgressBar, 150);
        }
    }
    
    return{
        //Public members
        emptyUsernameField: emptyUsernameField,
        emptyPasswordField: emptyPasswordField,
        toggleClan: toggleClan,
        initProgressBar: initProgressBar,
        animateProgressBar: animateProgressBar
    }
})();

$(document).ready(function() {

    var confirmation = $(".fadeOut");
    if(confirmation !== null) {
        confirmation.delay(5000).fadeOut();
    }

    $('#accountInfoConfirmation').change(function() {
        if( $('#accountInfoConfirmation2').is(':hidden') ) {
            $('#accountInfoConfirmation2').fadeIn();
            $('#accountInfoConfirmation').removeAttr('checked')
        } else {
            $('#accountInfoConfirmation2').fadeOut();
        }
    });
}); 


/*
 * jQuery UI Autocomplete Auto Select Extension
 *
 * Copyright 2010, Scott González (http://scottgonzalez.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/scottgonzalez/jquery-ui-extensions
 */
(function( $ ) {

    $.ui.autocomplete.prototype.options.autoSelect = true;
    $( ".ui-autocomplete-input" ).live( "blur", function( event ) {
        var autocomplete = $( this ).data( "autocomplete" );
        if ( !autocomplete.options.autoSelect || autocomplete.selectedItem ) {
            return;
        }

        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" );
        autocomplete.widget().children( ".ui-menu-item" ).each(function() {
            var item = $( this ).data( "item.autocomplete" );
            
            if (matcher.test( item.label || item.value || item ) ) {
                autocomplete.selectedItem = item;
                return false;
            }
        });
        if ( autocomplete.selectedItem ) {
            autocomplete._trigger( "select", event, {
                item: autocomplete.selectedItem
            } );
        }
    });

}( jQuery ));