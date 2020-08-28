$(document).ready(function () {
  //localStorage.clear();
  for (var i = 0; i < localStorage.length; i++) {
    var index = i.toString();
    var job = localStorage.getItem(index);
    console.log(job);
    var job1 = JSON.parse(job)[index];
    console.log(job1);
    var newblog = document.createElement('div');
    newblog.innerHTML = "<p>" + job1.name + "</p>" + "<p>" + job1.description + "</p>" + "<p>" + job1.location + "</p>";
    blog.appendChild(newblog);
  }
})


// Get picture
const constraints = {
  video: true
};

// image variable
var imgcount = 0;
const captureVideoButton =
  document.querySelector('#screenshot .capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
//const img = document.querySelector('#screenshot img');
//var img = document.querySelector('#screenshot img');
const video = document.querySelector('#screenshot video');
const canvas = document.createElement('canvas');

// form variable
const submitbtn = document.querySelector('#form a');
const blog = document.getElementById('show_blog');

captureVideoButton.onclick = function () {
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
};

screenshotButton.onclick = video.onclick = function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  //img.src = canvas.toDataURL('image/webp');
  var eleme = document.createElement('img');
  eleme.src = canvas.toDataURL('image/webp');
  eleme.className = "rounded"
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

  if (!navigator.geolocation) {
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
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

submitbtn.onclick = function () {
  //get all information need for blog
  var nameinfo = document.getElementById('bname').value;
  var descriptioninfo = document.getElementById('bdescription').value;
  var locationinfo = document.querySelector('#out p').innerText;
  var blogcount = (localStorage.length === undefined)? 0: localStorage.length;
  var allimage = document.querySelectorAll("#picture img");
  var imageinfo = []
  for (var j = 0; j < allimage.length; i++) {
    imageinfo.push(allimage[j].src);
}

  console.log(imageinfo);


  if(nameinfo == "" || descriptioninfo == "" || localStorage == ""){
    return alert("variable empty");
  }

  console.log(blogcount);
  // get the number of blogs in localstorage
  var blogcountstr = blogcount.toString();
  console.log(blogcountstr);

  //create the blog object to local storage
  var obj = {};
  obj[blogcountstr] = { name: nameinfo, description: descriptioninfo, location: locationinfo };
  console.log(obj);
  localStorage.setItem(blogcountstr, JSON.stringify(obj));

  // clear shown blog
  while (blog.firstChild) {
    blog.removeChild(blog.firstChild);
  }

  //show all blog in localstorage
  for (var i = 0; i < localStorage.length; i++) {
    var index = i.toString();
    var job = localStorage.getItem(index);
    console.log(job);
    var job1 = JSON.parse(job)[index];
    console.log(job1);
    var newblog = document.createElement('div');
    newblog.innerHTML = "<p>" + job1.name + "</p>" + "<p>" + job1.description + "</p>" + "<p>" + job1.location + "</p>";
    blog.appendChild(newblog);
  }

  //reset number of blog in localstorage
  var blogcount = localStorage.length;

  // init form
  nameinfo = ""
  descriptioninfo = ""
  while(document.getElementById('out').firstChild){
    document.getElementById('out').removeChild(document.getElementById('out').firstChild)
  }
  while(document.getElementById('picture').firstChild){
    document.getElementById('picture').removeChild(document.getElementById('picture').firstChild)
  }

}