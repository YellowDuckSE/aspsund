$(document).ready(function() {
    var lastID = -1;
    var interval = 5*60*1000;
    setInterval(function() {
        var now = (Date.now()-10000) % interval;
        if (now < 1000) {
            fetchTemp(lastID).then(id=>{lastID=id;});
        }
    }, 1000);
    fetchTemp(lastID).then(id=>{lastID=id;});
});

function fetchTemp(past_id = -1) {
    return $.ajax({
        url: "https://api.thingspeak.com/channels/701544/fields/3.json?results=1"
    }).then(function(data) {
        $('.temp-id').text(data.feeds[0].field3);
        var timeStamp = data.feeds[0].created_at;
        var localDate = new Date(timeStamp);
        var tempts = $('.temp-timestamp');
        tempts.text(localDate.toString().substring(0, 25));
        tempts.css("color");
        if (data.feeds[0].entry_id === past_id) {
            tempts.text("Temperaturuppdatering misslyckades!");
            tempts.css("color","red");
            return past_id;
        } else return data.feeds[0].entry_id;
    });
}