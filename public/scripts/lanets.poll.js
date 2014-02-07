$('#poll').submit(function() {
    var vote = $('input[name=vote]:checked').val();	
    var poll = $('input[name=poll]').val();
		
    $.post("vote.php", {
        poll: poll, 
        vote: vote
    }, function(){
        location.reload();
    });
    return false;
});
	
$('#poll a').click(function() {
    var poll = $('#poll a').attr('href').replace('#','');
		
    $.post("vote.php", {
        poll: poll,             
        vote: -1
    }, function(){
        location.reload();
    });
    return false;
});