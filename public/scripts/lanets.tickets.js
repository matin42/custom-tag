lanets.tickets = (function(){ 
    
    //Private members
    var cart;
    var actionAddTicket;
    var actionRemoveTicket;
    var selectedTicketType;
    
    function init(option){
              
        if(option.cart != undefined) {
            cart = option.cart;
            currentUserId = cart.ownerId;
        
            updateCart();
            updateTotals();
        }
        
        if(option.actionAddTicket != undefined){
            actionAddTicket = option.actionAddTicket;
        }
        if(option.actionRemoveTicket != undefined) {
            actionRemoveTicket = option.actionRemoveTicket;
        }
        
        $('.step2').hide();
        
        $('#btnSubmitCart').click(function(){
            if(cart.items.length == 0){
                msgError(option.msgCartEmpty);
                return false;    
            }
        });
        
        if(lanets.ticketAssigner != undefined) {
            lanets.ticketAssigner.onAssignClick(function() {
                var user = lanets.ticketAssigner.getSelectedUserId();    
                if(user > 0) {
                    addTicket(user, selectedTicketType);
                }
            });

            lanets.ticketAssigner.onAutoAssignClick(function() {
                autoAssignTicket();
            });
        }
        
        $('.options span.remove').live("click", function() {
            var id = $(this).data('id');
            if(id != null){
                removeTicket(id);
            }
        });
    }
    
    function updateCart() {
        $('#scbody').html("");
    
        $.each(cart.items, function(i,item) {
            appendCartItem(item);
        });
    }
    
    function updateTotals() {
        var fees = cart.paymentFees == undefined ? 0 : cart.paymentFees;
        
        $('#totPrice').html(getCartTotal());
        $('#pmprice').html(fees.toFixed(2));
        $('#gtot').html((getCartTotal()+fees).toFixed(2));
    }
    
    function appendCartItem(item) {
        $('#scbody').append(tmpl('item_template', {
            item: item
        }));
    }
    
    function getCartTotal() {
        var total = 0;
        $.each(cart.items, function(i,item) {
            total += item.cost;
        });
        return total;
    }
    
    function getTicketLabel(type){
        return $('#tickettypes input[name="'+type+'"]').val();
    }
    
    function msgError(msg) {
        $('#ticketmsg').html('<div style="ui-corner-all"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'+msg+'</p></div>');
        $('#ticketmsg').addClass('ui-state-error');
    }
    
    function msgClear() {
        $('#ticketmsg').html("");
        $('#ticketmsg').removeClass('ui-state-error');
    }   
    
    function addTicket(userId, typeId) {
        $.ajax({
            url: actionAddTicket({
                user: userId, 
                type: typeId
            }),
            dataType: 'json',
            success: function(item) {
                if(item != null) {
                    if(item.error == null) {
                        cart.items.push(item);
                        appendCartItem(item);
                        updateTotals();
                        msgClear();
                    } else {
                        msgError(item.error);
                    }
                }
            } ,
            error: function(msg) {
                alert('An error occurred!');
                if(console) {
                    console.log(msg);
                }
            }
        });
    }
    
    function removeTicket(id){
        $.ajax({
            url: actionRemoveTicket({
                id: id
            }),
            dataType: 'json',
            success: function(data) {
                cart = data;
                updateCart();
                updateTotals();
                msgClear();
            }
        });
    }
    
    function autoAssignTicket() {
        addTicket(currentUserId, selectedTicketType);
    }
    
    function selectTicketType(type) {

        $('[id^=ticketType_]').animate({
            backgroundColor: "#404040",
            borderColor: "#1E1E1E"
        }, 0);
        $('#ticketType_' + type).animate({
            backgroundColor: "#969695",
            borderColor: "#211403"
        }, 300);
        
        selectedTicketType = type;
        
        $('.step2').fadeIn();
        
        lanets.ticketAssigner.setTicketType(type);
        lanets.ticketAssigner.clear();
    }

    //Public members
    return{
        init: init,
        selectTicketType: selectTicketType,
        removeTicket: removeTicket,
        getTicketLabel: getTicketLabel
    }
})();