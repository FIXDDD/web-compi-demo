window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
$(document).ready(function () {
  //localStorage.clear();
  for (var i = 0; i < localStorage.length; i++) {
    var index = i.toString();
    var job = localStorage.getItem(index);
    console.log(job);
    var job1 = JSON.parse(job)[index];
    console.log(job1);
    var newblog = document.createElement('div');
    newblog.innerHTML = "<p>" + job1.name + "</p>" + "<p>" + job1.description + "</p>" + "<p>" + job1.location + "</p>" + "<p>" + job1.useraddress + "</p>";
    console.log(job1.image);
    for (var k = 0; k < job1.image.length; k++) {
      newblog.innerHTML = newblog.innerHTML + "<img src=\"" + job1.image[k] + "\" class=\"img-responsive\"><p></p>"
    }
    blog.appendChild(newblog);
  }

  $('img').each(function (i, e) {
    $(e).wrap('<div class="img-wrapper"></div>')
  })

  var allimg = document.getElementsByTagName('img');
  for (var a = 0; a < allimg.length; a++) {
    allimg[a].addEventListener('click', function (el) {
      appendimg(el);
    })
  }
})

// map variable
var map;

//Init map function for map https://stackoverflow.com/questions/32496382/typeerror-window-initmap-is-not-a-function
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 8
  });
}


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

//functions

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
  eleme.className = "img-responsive"
  document.getElementById("picture").appendChild(eleme)
  //try append image
};


function handleSuccess(stream) {
  video.style.display = "block";
  screenshotButton.disabled = false;
  video.srcObject = stream;
}

//get address
function findAddress() {
  var addrout = document.getElementById("myaddr");

  if (!navigator.geolocation) {
    addrout.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    //get lat and long and save place for save local addresss
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var addressnow = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        addressnow = JSON.parse(this.responseText).results[0].formatted_address;
        addrout.innerHTML = '<p id=\"address\">' + addressnow + '</p>' + '<p id=\"lat\">' + latitude + '</p><p id=\"lng\">' + longitude + '</p>';
      }
    };
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&key=AIzaSyADrKlMX6jdT_T7sLhb77h2r_QxMCcoyMc", true);
    xhttp.send();
  }

  function error() {
    addrout.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);

}

// get location
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation) {
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    //get lat and long and save place for save local addresss
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    //remove previous presented information
    if (document.getElementById("addinfo")) {
      document.getElementById("addinfo").remove();
    }

    // For create interactive map and show user location

    // show init map
    document.getElementById("map").style.display = "block";
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();

    //show location
    var latlng = {
      lat: latitude,
      lng: longitude
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          map.setZoom(15);
          const marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
    //Method 2: for create Map static image
    /*
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false&key=AIzaSyADrKlMX6jdT_T7sLhb77h2r_QxMCcoyMc";
    output.appendChild(img);
*/
  }
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);

}


// submit action

submitbtn.onclick = function () {
  //get all information need for blog
  var nameinfo = document.getElementById('bname').value;
  var descriptioninfo = document.getElementById('bdescription').value;
  var latinfo = (document.getElementById('lat') == null) ? "" : document.getElementById('lat').innerText;
  var lnginfo = (document.getElementById('lng') == null) ? "" : document.getElementById('lng').innerText;
  var useraddressinfo = (document.getElementById('address') == null) ? "" : document.getElementById("address").innerText;
  var blogcount = (localStorage.length === undefined) ? 0 : localStorage.length;
  var allimage = document.querySelectorAll("#picture img");
  var imageinfo = []
  for (var j = 0; j < allimage.length; j++) {
    imageinfo.push(allimage[j].src);
  }
  console.log(imageinfo);

  if (nameinfo == "" || descriptioninfo == "" || useraddressinfo == "" || latinfo == "" || lnginfo == "" || imageinfo == []) {
    return alert("variable empty");
  }

  console.log(blogcount);
  // get the number of blogs in localstorage
  var blogcountstr = blogcount.toString();
  console.log(blogcountstr);

  //create the blog object to local storage
  var obj = {};
  obj[blogcountstr] = { name: nameinfo, description: descriptioninfo, lat: latinfo, lng: lnginfo, useraddress: useraddressinfo, image: imageinfo };
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
    newblog.innerHTML = "<p>" + job1.name + "</p>" + "<p>" + job1.description + "</p>" + "<p>" + job1.location + "</p>" + "<p>" + job1.useraddress + "</p>";
    console.log(job1.image);
    for (var k = 0; k < job1.image.length; k++) {
      newblog.innerHTML = newblog.innerHTML + "<img src=\"" + job1.image[k] + "\" class=\"img-responsive\"><p></p>"
    }
    blog.appendChild(newblog);
  }

  //reset number of blog in localstorage
  /*
  var blogcount = localStorage.length;
  */
  // init form
  /*
  document.getElementById('bname').value = "";
  document.getElementById('bdescription').value = "";
  document.getElementById('map').style.display = "none";
  while (document.getElementById('picture').firstChild) {
    document.getElementById('picture').removeChild(document.getElementById('picture').firstChild)
  }
  while (document.getElementById('myaddr').firstChild) {
    document.getElementById('myaddr').removeChild(document.getElementById('myaddr').firstChild)
  }

  video.style.display = "none";
  screenshotButton.disabled = true;
  video.srcObject = "";
  document.getElementById("form").style.display = "none";
*/
  location.reload();
}

//show form
function showform() {
  document.getElementById("form").style.display = "block";
}



function appendimg(el) {
  var ele = el.target;
  document.getElementById('imgViewer').innerHTML = "";
  var addingimg = document.createElement('img');
  addingimg.setAttribute("src", ele.src);
  document.getElementById('imgViewer').appendChild(addingimg);
  document.getElementById('viewImg').style.display = "block";
}

document.getElementById("close-imgshow").onclick = ()=>{
  document.getElementById('viewImg').style.display = "none";
}


