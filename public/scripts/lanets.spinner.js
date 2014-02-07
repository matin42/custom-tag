lanets.spinner = (function(){ 
    
    //Private members
    var nmbTournament = 0; //<?php echo getNmbOfTournaments(); ?>;
    var spinnerOn = true;
    var currentIndice = 0;
    var millisecondsTimer = 3200;

    function spinIfSpinnerIsOn() {
        if(spinnerOn && (document.getElementById('tournament_0') !== null)) {
            showNewTournament(currentIndice);
            currentIndice ++;
            if(currentIndice == nmbTournament) {
                currentIndice = 0;
            }
            setTimeout('spinIfSpinnerIsOn();', millisecondsTimer);
        }
    }

    function showUserAskedTournament(indice) {
        spinnerOn = false;
        showNewTournament(indice);
    }

    function showNewTournament(indice) {
        for(var i=0;i<nmbTournament;i++) {
            document.getElementById('tournament_'+i).setAttribute('class', 'hide');
            document.getElementById('tournament_'+i).setAttribute('className', 'hide');
        }
        for(var i=0;i<nmbTournament;i++) {
            document.getElementById('tournamentlink_'+i).setAttribute('class', 'dn');
            document.getElementById('tournamentlink_'+i).setAttribute('className', 'dn');
        }
        document.getElementById('tournamentlink_'+indice).setAttribute('class', 'up');
        document.getElementById('tournamentlink_'+indice).setAttribute('className', 'up');
        document.getElementById('tournament_'+indice).setAttribute('class', 'show');
        document.getElementById('tournament_'+indice).setAttribute('className', 'show');
    }
        
    return{
        //Public members
        spinIfSpinnerIsOn: spinIfSpinnerIsOn,
        showUserAskedTournament:showUserAskedTournament 
    }
})();

$(document).ready(function() {
    lanets.spinner.spinIfSpinnerIsOn();
});


