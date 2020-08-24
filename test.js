$(document).ready(function(){
    $("#hello").text("hello world")
})


// Get picture
const constraints = {
  video: true
};

var imgcount = 0;
const captureVideoButton =
  document.querySelector('#screenshot .capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
//const img = document.querySelector('#screenshot img');
//var img = document.querySelector('#screenshot img');
const video = document.querySelector('#screenshot video');
const submitbtn =  document.querySelector('#form a')



const canvas = document.createElement('canvas');

captureVideoButton.onclick = function() {
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
};

screenshotButton.onclick = video.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  //img.src = canvas.toDataURL('image/webp');
  var eleme = document.createElement('img');
  eleme.src = canvas.toDataURL('image/webp');
  document.getElementById("picture").appendChild(eleme)
  //try append image
};


function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}

// get location

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>'; 

    var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false&key=AIzaSyADrKlMX6jdT_T7sLhb77h2r_QxMCcoyMc";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

}

// submit action

submitbtn.onclick = function(){
  console.log("submited")
}