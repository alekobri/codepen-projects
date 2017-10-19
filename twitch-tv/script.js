function displayHTML(logo, channel_name, description, url, status) {
  
  var link= '<a href="' + url + '" target="_blank"><div class="' + status +'"><img src="' + logo + '" class="logo img-responsive"><span id="name">' + channel_name + '</span><span id="streaming">' + description + '</span></div></a>';

  if (status === "online") {
    $("#display").prepend(link);
  } else {
    $("#display").prepend(link);
  } 
}

function handleStreamFetch(streamURL, channelURL, streamer) {
  return function(data) {
      var description, status;
      
      if (data.stream === null) {
        description = "offline";
        status = "offline";
      }  else {
        status = "online";
        description = data.stream.game + " - " + status;
      };
      
      $.getJSON(channelURL, function(data) {
        var logo = [];
        var name = data.display_name;
        
        if (name === undefined) {
            name = streamer;
            status = "offline";
            description = "R.I.P.";
        }
        
        if (data.logo != undefined) {
        	logo = data.logo;
        } else {
        	logo = "http://thinkjarcollective.com/wp-content/uploads/2012/06/Surprise-fosters-creativity.jpg";
        }
     
        displayHTML(logo, name, description, data.url, status);
      });
    };
}

function getChannelsInfo() {
  console.log("in getChannelsInfo");
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];
  
  for (var i = 0; i < channels.length; i++) { 
    var streamURL = "https://wind-bow.gomix.me/twitch-api/streams/" + channels[i] + "?callback=?";
    var channelURL = "https://wind-bow.gomix.me/twitch-api/channels/" + channels[i] + "?callback=?";
    var streamer = channels[i];
    
    $.getJSON(streamURL, handleStreamFetch(streamURL, channelURL, streamer));
  }; // loop
}; // function getChannelsInfo

$('#allButton').on('click', function() {
    $('.online').show();
    $('.offline').show();
    $('.closed').show();
  });

  $('#onlineButton').on('click', function() {
    $('.offline').hide();
    $('.online').show();
    $('.closed').hide();
  });

  $('#offlineButton').on('click', function() {
    $('.offline').show();
    $('.online').hide();
    $('.closed').hide();
  });

$(document).ready(function() {
  getChannelsInfo();
  
});