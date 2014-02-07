
lanets.ticketAssigner = (function(){
    
    var inputText;
    var inputId;
    
    var ticketType;
    var ticketId;
    
    var btnClear;
    var btnAssign;
    var btnAutoAssign;
    
    var confirmationMsg;
    
    var searchFunction;
    var validationFunction;
    var onAutoAssignClick;
    var onAssignClick;
    
    function init(options) {
            
        inputText = $('#ticketAssignerUserName');
        inputId = $('#ticketAssignerUserId');
        ticketType = $('#ticketAssignerTicketType');
        ticketId = $('#ticketAssignerTicketId');
        
        confirmationMsg = $('#ticketAssignerConfirmation');
        
        btnClear= $('#btnClearUser');
        btnAssign = $('#btnAssign');
        btnAutoAssign = $('#btnAutoAssign');
        
        searchFunction = options.searchFunction;  
        validationFunction = options.validationFunction;
       
        initAutoComplete();
        initEvents();
    }
    
    function initEvents(){
        btnClear.click(function(){
            clearInputs();
        });
        
        btnAssign.click(function() {
            if($.isFunction(onAssignClick)){
                onAssignClick();
            }
        });
            
        btnAutoAssign.click(function() {
            if($.isFunction(onAutoAssignClick)){
                onAutoAssignClick();
            }
        });
        
        inputId.change(function () {
            clearConfirmation();
            validateUser();
        });
        
        inputText.keyup(function () {
            clearConfirmation();
        });
    }
    
    function onValidationSuccess() {
        btnAssign.show();
        btnAssign.removeClass('disabled');
    }
    
    function onUserDeselected() {
        btnAssign.show();
        btnAssign.addClass('disabled');
    }
    
    function onValidationFail() {
        btnAssign.hide();
    }
    
    function clearInputs() {
        $(inputId).val("").change();
        $(inputText).val("");
        $(inputText).focus();
    }
        
    function clearConfirmation() {
        confirmationMsg.text('');
        onUserDeselected();
    }
  
    function validateUser() {
        
        var userId = inputId.val();
        var tId = ticketId.val();
        var tType = ticketType.val();
                
        if(userId > 0 && (tId > 0 || tType > 0)) {
            $.ajax({
                url: validationFunction({
                    userId: userId,
                    ticketId: tId,
                    ticketType: tType
                }),
                dataType: 'json',
                success: function(result) {
                    if(result.success) {
                        confirmationMsg.html('<img src="/medias/green_check_mark.gif" alt="ok" />');
                        onValidationSuccess();
                    } else {
                        confirmationMsg.html('<div class="fail">'+result.errorMsg+'</div>');
                        onValidationFail();
                    }
                }
            });
        }
    }
    
    function initAutoComplete() {
        
        inputText.autocomplete({ 
            minLength: 3,
            autoSelect: true,
            source: searchFunction(),
            search: function (event, ui) {
                inputText.autocomplete('option','source', searchFunction());
            },
            select: function(event, ui) {
                // Save the selection item and value in the two inputs.
                inputText.val(ui.item.label);
                inputId.val(ui.item.value).change();
                return false;
            }
        });    
    }
    
    return{
        //Public members
        init: init,
        setTicketType: function(type) {
            ticketType.val(type > 0 ? type : 0);
        },
        setTicketId: function(id) {
            ticketId.val(id > 0 ? id : 0);
        },
        onAssignClick: function(func) {
            if($.isFunction(func)) {
                onAssignClick = func;
            }
        },
        onAutoAssignClick: function(func) {
            if($.isFunction(func)) {
                onAutoAssignClick = func;
            }
        },
        getSelectedUserId: function() {
            return inputId.val();
        },
        setSelectedUserId: function(id) {
            inputId.val(id);
        },
        clear: clearInputs
    }
})();