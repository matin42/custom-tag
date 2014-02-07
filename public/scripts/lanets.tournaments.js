lanets.tournaments = (function(){ 
    
    //Private members
    var actionSaveTeam;
    var actionCreateNewTeam;
    var actionTransferLeader;
    var actionRemoveTeam;
    var actionRefreshMyTournamentTag;
    var actionRemoveMember;
    var actionTeamNameValid;
    var actionCreateAddDialog;
    var actionCreateRemoveDialog;
    var actionGetAvailablePlayer;
    var actionSingleTournament;
    var actionAvailableList;

    function init(options)
    {
        actionSaveTeam = options.actionSaveTeam;
        actionCreateNewTeam = options.actionCreateNewTeam;
        actionTransferLeader = options.actionTransferLeader;
        actionRemoveTeam = options.actionRemoveTeam;
        actionRefreshMyTournamentTag = options.actionRefreshMyTournamentTag;
        actionRemoveMember = options.actionRemoveMember;
        actionTeamNameValid = options.actionTeamNameValid;
        actionCreateAddDialog = options.actionCreateAddDialog;
        actionCreateRemoveDialog = options.actionCreateRemoveDialog;
        actionGetAvailablePlayer = options.actionGetAvailablePlayer;
        actionSingleTournament = options.actionSingleTournament;
        actionAvailableList = options.actionAvailableList;
    }
    
    function addLine(tournamentId)
    {
        $.ajax({
            url: actionCreateAddDialog({
                tournamentId: tournamentId
            }),
            dataType: 'html',
            success: function(result) {
                $("#addLine").html(result);
            }
        });   
    }
    
    function removeLine(tournamentId)
    {
        $.ajax({
            url: actionCreateRemoveDialog({
                tournamentId: tournamentId
            }),
            dataType: 'html',
            success: function(result) {
                $("#removeLine").html(result);
            }
        });   
    }
    
    function adminRemovePlayer(t)
    {
        $("#userId").val($(t).find("input").val());
        $(".clanMemberBox").removeClass("clanMemberBoxSelectable");
        $(t).addClass("clanMemberBoxSelectable");
    }
    
    function adminRemoveTeam(t)
    {
        $("#teamId").val($(t).find("input").val());
        $(".clanMemberBox").removeClass("clanMemberBoxSelectable");
        $(t).addClass("clanMemberBoxSelectable");
    }
    
    function saveLine()
    {
        var teamName = $("#teamNameSelection").val();
        var min_player = $("#tournamentMinPlayer").val();
        var player_count = $("#formSaveBlock").find("li").size();

        $("#teamNameError").hide();
        $("#minPlayerMessage").hide();
        $("#emptyNameMessage").hide();

        if(min_player == 1)
        {
            $("#formSaveBlock").submit();
        }
        else if(player_count < min_player)
        {
            $("#minPlayerMessage").show();
        }
        else if(teamName === "")
        {
            $("#emptyNameMessage").show();
        }
        else
        {                             
            $.ajax({
                url: actionTeamNameValid({
                    teamName: teamName
                }),
                dataType: 'html',
                success: function(result) {
                    if(result === 'true')
                    {
                        $("#formSaveBlock").submit();
                    }
                    else
                    {
                        $("#teamNameMessage").show();
                    }
                }
            })
        }
    }
    
    function playerSearch()
    {
        var searchString = $("#playerSearch").val().toLowerCase();
        if($("#selectClanName").val() != 0)
        {
            $("#listAvailablePlayer").find("li").each(function() {
                var player_name = $(this).find(".username").html().toLowerCase();
                if(player_name.indexOf(searchString) !== -1 )
                {
                    $(this).show();
                }
                else
                {
                    $(this).hide();
                }
            })
        }
        else
        {   
            $.ajax({
                url: actionAvailableList({
                    searchString: searchString
                }),
                dataType: 'html',
                success: function(result) {
                    $("#listAvailablePlayer").html(result); 
                }
            })
        } 
    }
    
    function clanSelected()
    {
        $("#listAvailablePlayer").find("ul").remove();
        $("#tournamentBox").find("li").remove();
        
        $.ajax({
            url: actionGetAvailablePlayer({
                clanId: $("#selectClanName").val()
            }),
            dataType: 'html',
            success: function(result) {
                $("#listAvailablePlayer").html(result);
                $("#clan_member .clanMemberBox, #tournamentBox .clanMemberBox").addClass("clanMemberBoxSelectable");
                $("#clan_member, #tournamentBox").sortable({
                    connectWith: ".clanMemberList"
                }); 
            }
        });
    }

    function saveAllTeams()
    {
        var valid = true;
           
        $("#tournamentBlockList").children(".titled_box").each(function() {
            showStatus(this);
            
            $.ajax({
                url: actionSaveTeam(),
                    dataType: 'POST',
                data: $(this).children(".body").children("form").serialize()
            });
        });

        $("#errorMessage").hide();

        refreshMyTournamentTag();
        disableButtons();
    }
    
    function showStatus(t)
    {
        var min_player = $(t).find('.minPlayer').val();
        var current_number = $(t).find('li').size();
        
        if(min_player != 1)
        {
            if(current_number < min_player)
            {
                $(t).find(".player_low").show();
                $(t).find(".player_ok").hide();
                $(t).find(".player_high").hide();
            }
            else if (current_number > min_player)
            {
                $(t).find(".player_low").hide();
                $(t).find(".player_ok").hide();
                $(t).find(".player_high").show();
            }
            else
            {
                $(t).find(".player_low").hide();
                $(t).find(".player_ok").show();
                $(t).find(".player_high").hide();
            }
        }
    }
    
    function isSingleTournament(tournamentId)
    {
        $.ajax({
            url: actionSingleTournament({
                tournamentId: tournamentId
            }),
            dataType: 'html',
            success: function(result) {
                if(result === 'true')
                {
                    $('#teamNameContainer').hide();
                }
                else
                {
                    $('#teamNameContainer').show();
                }
            }
        });
    }
    
    function createNewTeam()
    {   
        var teamName = $('#teamNameSelection').val();
        
        if(!$('#teamNameContainer').is(':visible'))
        {
            createAjaxTeam("");
        }
        else if(teamName == "")
        {
            $("#emptyTeamError").show();
        }
        else
        {
            $.ajax({
                url: actionTeamNameValid({
                    teamName: teamName
                }),
                dataType: 'html',
                success: function(result) {
                    if(result === 'true')
                    {
                        createAjaxTeam(teamName);
                    }
                    else
                    {
                        $("#nameTeamError").show();
                    }
                }
            });
        }

        $('#teamNameSelection').val("");
    }
    
    function createAjaxTeam(teamName)
    {
        $.ajax({
            url: actionCreateNewTeam({
                tournamentId: $("#multiplayerSelection").val(),
                clanId: $("#clanId").val(),
                currentBoxCount: $("#tournamentBlockList").find(".tournamentTeamBox").size(),
                teamName: teamName
            }),
            dataType: 'html',
            success: function(result) {
                $("#tournamentBlockList").append(result);
                activateButtons();
                $( "#createTeamConfirm" ).dialog("close");
            }
        });
    }

    function refreshMyTournamentTag()
    {
        $.ajax({
            url: actionRefreshMyTournamentTag(),
            dataType: 'html',
            success: function(result) {
                $("#myTournamentTag").html(result);
            }
        });
    }

    function transferLeader()
    {
        $.ajax({
            url: actionTransferLeader({
                clanId: $("#clanId").val()
            }),
            dataType: 'html',
            success: function(result) {
                $("#clanLeaderContainer").html(result);
            }
        });
    }

    function disableButtons()
    {
        $("#clan_member .clanMemberBox, #tournamentBox .clanMemberBox").removeClass("clanMemberBoxSelectable");
        
        $(".clanMemberBox span").hide();
        $(".title h2 span").hide();
        
        $("#clan_member, #tournamentBox").sortable("disable");

        $("#buttonModify").show();
        $("#buttonAdd").hide();
        $("#buttonSave").hide();
        $("#buttonCancel").hide();
    }

    function activateButtons()
    {
        $("#clan_member .clanMemberBox, #tournamentBox .clanMemberBox").addClass("clanMemberBoxSelectable");
        
        $(".clanMemberBoxSelectable span").show();
        $(".title h2 span").show();

        $("#clan_member, #tournamentBox").sortable("enable");
        $("#clan_member, #tournamentBox").sortable({
            connectWith: ".clanMemberList"
        }); 
        
        $("#buttonSave").show();
        $("#buttonCancel").show();
        $("#buttonModify").hide();
        $("#buttonAdd").show();
    }

    function removeMember(userId)
    {
        $.ajax({
            url: actionRemoveMember({
                userId: userId
            }),
            dataType: 'html'
        });
        
        $("#clanMember" + userId).remove();
    }

    function removeTeam(boxId)
    {
        $.ajax({
            url: actionRemoveTeam(),
            dataType: 'POST',
            data: $("#tournamentBox" + boxId).find("form").serialize()
        });

        $("#tournamentBox" + boxId).find("ul").each(function() {
            $("#clan_member").append($(this).html());
        });

        $("#tournamentBox" + boxId).remove();
        
        var number_box = $("#tournamentBlockList").find(".titled_box").size();
        if(number_box == 0)
        {
            $("#buttonModify").hide();
        }
        refreshMyTournamentTag();
    }

    function modifyTeams()
    {
        activateButtons();
    }

    //Public members
    return {
        init: init,
        saveAllTeams: saveAllTeams,
        createNewTeam: createNewTeam,
        modifyTeams: modifyTeams,
        transferLeader: transferLeader,
        removeTeam: removeTeam,
        removeMember: removeMember,
        isSingleTournament: isSingleTournament,
        addLine: addLine,
        removeLine: removeLine,
        saveLine: saveLine,
        playerSearch: playerSearch,
        clanSelected: clanSelected,
        adminRemoveTeam: adminRemoveTeam,
        adminRemovePlayer: adminRemovePlayer
    }
})(); 

