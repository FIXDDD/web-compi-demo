window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
$(document).ready(function () {
  //localStorage.clear();

  //add default blog
  var defaultblog = [{
    name: "Joy's coffee shop",
    description: "An amazing coffee shop with a comfortable atmosphere and good quality coffee. Great place spend chill out",
    location: "Street AAA, No.31, Macau",
    image: ['./default/img/ex1.jpg']
  }, {
    name: "Spot Thai restaurants",
    description: "Want to find the best Thai restaurant in Macau. Spot Thai restaurant is the place you are looking for.",
    location: "Street BBB, No.31, Macau",
    image: ['./default/img/ex2.png']
  },
  {
    name: "ClOTHES",
    description: "CLOTHES, a place where you can purchase modern fashion clothes",
    location: "Street CCC, No.31, Macau",
    image: ['./default/img/ex3.jpg']
  }
  ];

  if (localStorage.length == 0) {
    for (var u = 0; u < defaultblog.length; u++) {
      var blogobj = {};
      blogobj[u] = { name: defaultblog[u].name, description: defaultblog[u].description, lat: -34.397, lng: 150.644, useraddress: defaultblog[u].location, image: [defaultblog[u].image[0]] };
      localStorage.setItem(u, JSON.stringify(blogobj));
    }
  }
  /*
  for (var u = 0; u < defaultblog.length; u++) {
    var templateblog = document.getElementById('card').innerHTML;
    var creatblog = document.createElement('div');
    creatblog.setAttribute('class', 'col mb-4');
    creatblog.innerHTML = templateblog;
    blog.appendChild(creatblog);
    blog.lastChild.getElementsByTagName('img')[0].src = defaultblog[u].image[0];
    blog.lastChild.getElementsByClassName('card-title')[0].innerText = defaultblog[u].name;
    blog.lastChild.getElementsByClassName('card-text')[0].innerText = defaultblog[u].description;
    blog.lastChild.getElementsByClassName('card-subtitle')[0].innerText = defaultblog[u].location;


  }
  */
  for (var i = localStorage.length - 1; i >= 0; i--) {
    var index = i.toString();
    var job = localStorage.getItem(index);
    console.log(job);
    var job1 = JSON.parse(job)[index];
    console.log(job1);
    var inittemplateblog = document.getElementById('card').innerHTML;
    var newblog = document.createElement('div');
    newblog.setAttribute('class', 'col mb-4');
    newblog.innerHTML = inittemplateblog;
    blog.appendChild(newblog);
    blog.lastChild.getElementsByTagName('img')[0].src = job1.image[0];
    blog.lastChild.getElementsByClassName('card-title')[0].innerText = job1.name;
    blog.lastChild.getElementsByClassName('card-text')[0].innerText = job1.description;
    blog.lastChild.getElementsByClassName('card-subtitle')[0].innerText = job1.useraddress;
    blog.lastChild.getElementsByTagName('a')[0].id = i.toString();

    /* Old way to append blog div
    newblog.innerHTML = "<p>" + job1.name + "</p>" + "<p>" + job1.description + "</p>" + "<p>" + job1.location + "</p>" + "<p>" + job1.useraddress + "</p>";
    console.log(job1.image);
    for (var k = 0; k < job1.image.length; k++) {
      newblog.innerHTML = newblog.innerHTML + "<img src=\"" + job1.image[k] + "\" class=\"img-fluid\"><p></p>"
    }
    blog.appendChild(newblog);
    */
  }

  var allblog = document.getElementById('show_blog').getElementsByTagName('a');
  for (var b = 0; b < allblog.length; b++) {
    allblog[b].addEventListener('click', function (el) {
      showview(el);
    })
  }

  /* old bootstrap
  $('img').each(function (i, e) {
    $(e).wrap('<div class="img-wrapper"></div>')
  })
  */

  /* Old way to apply onlclick to all image
  var allimg = document.getElementsByTagName('img');
  for (var a = 0; a < allimg.length; a++) {
    allimg[a].addEventListener('click', function (el) {
      appendimg(el);
    })
  }
  */

  /* Method to enlarge image
  $('img').on('click', function (e) {
    $('#imgViewer').html('').append($(e.currentTarget).clone().removeClass('img-fluid').removeClass('img-thumbnail'))
    $('#viewImg').modal('show');
  })
*/
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

  google.maps.event.addDomListener(window, "resize", function () {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}


// Get picture
const constraints = {
  video: { facingMode: "environment" }
};

// image variable
var imgcount = 0;
const captureVideoButton =
  document.querySelector('#screenshot #capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
//const img = document.querySelector('#screenshot img');
//var img = document.querySelector('#screenshot img');
const video = document.querySelector('#screenshot video');
const idvideo = document.getElementById('vidi');
const canvas = document.createElement('canvas');

// form variable
const submitbtn = document.querySelector('#form #submitbtn');
const mailbtn = document.querySelector('#form #mailbtn');
const showpicture = document.getElementById("picture");
const blog = document.getElementById('show_blog');
const postbtn = document.getElementById('postbtn');
var formshow = false;

// modal variable
const sharebtn = document.getElementById('savebtn');

//functions**********************************************************

function showpost() {
  document.getElementsByClassName('head')[0].style.display = 'none';
  document.getElementById('blog_place').style.display = 'block';
  document.getElementsByClassName('footer')[0].style.display = 'block';
}

// for nav brand
function reload_page() {
  location.reload();
}

captureVideoButton.onclick = function () {
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}


screenshotButton.onclick = function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  //img.src = canvas.toDataURL('image/webp');
  document.getElementById('tiptag').style.display = 'block';
  var formimgtemplate = document.getElementById("formimg").innerHTML;
  var eleme = document.createElement('div');
  eleme.className = "col";
  eleme.innerHTML = formimgtemplate;
  showpicture.appendChild(eleme);
  showpicture.lastChild.getElementsByTagName('img')[0].src = canvas.toDataURL('image/png');
  $('#picture img').on('click', function (e) {
    $('#imgViewer').html('').append($(e.currentTarget).clone().removeClass('card-img-top'));
    $('#viewImg').modal('show');
  });
  $('#picture a').on('click', function (e) {
    $(e.currentTarget).parent().parent().parent().remove();
  })

  /*
  var eleme = document.createElement('img');
  eleme.src = canvas.toDataURL('image/png');
  eleme.className = "img-fluid";
  document.getElementById("picture").appendChild(eleme);
  $('#picture img').on('click', function (e) {
    $('#imgViewer').html('').append($(e.currentTarget).clone().removeClass('img-fluid').removeClass('img-thumbnail'))
    $('#viewImg').modal('show');
  })*/
  //try append image
}


function handleSuccess(stream) {
  idvideo.style.display = "block";
  video.style.display = "block";
  screenshotButton.style.display = "inline";
  video.srcObject = stream;
  captureVideoButton.style.display = 'none';
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
        addrout.getElementsByTagName('input')[0].setAttribute('placeholder', addressnow);
        addrout.innerHTML = addrout.innerHTML + '<p id=\"address\">' + addressnow + '</p>' + '<p id=\"lat\">' + latitude + '</p><p id=\"lng\">' + longitude + '</p>';
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
          google.maps.event.trigger(map, "resize");
          map.setCenter(latlng);
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
  var imageinfo = [];
  for (var j = 0; j < allimage.length; j++) {
    imageinfo.push(allimage[j].src);
  }
  console.log(imageinfo);

  if (nameinfo == "" || descriptioninfo == "" || useraddressinfo == "" || latinfo == "" || lnginfo == "" || imageinfo.length == 0) {
    return alert(">>Require to fill in field with * and at least one take picture.");
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

  /* Duplicate code to fill show_blog
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
      newblog.innerHTML = newblog.innerHTML + "<img src=\"" + job1.image[k] + "\" class=\"img-fluid\"><p></p>"
    }
    blog.appendChild(newblog);
  }
  */

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
  alert('Your have post been submitted');
  location.reload();
}

//show form
function showform() {
  if (formshow == false) {
    document.getElementsByClassName('head')[0].style.display = 'none';
    document.getElementById('blog_place').style.display = 'block';
    document.getElementsByClassName('footer')[0].style.display = 'block';
    document.getElementById("form").style.display = "block";
    document.getElementById("detail").style.display = "none";
    var d = document.createElement('button');
    d.setAttribute('type', 'button');
    d.setAttribute('class', 'btn btn-danger');
    d.setAttribute('onclick', 'showform()');
    d.innerHTML = 'Cancel';
    postbtn.getElementsByTagName('button')[0].parentNode.replaceChild(d, postbtn.getElementsByTagName('button')[0]);
    formshow = true;
  } else {
    document.getElementsByClassName('head')[0].style.display = 'none';
    document.getElementById('blog_place').style.display = 'block';
    document.getElementsByClassName('footer')[0].style.display = 'block';
    document.getElementById("form").style.display = "none";
    var d = document.createElement('button');
    d.setAttribute('type', 'button');
    d.setAttribute('class', 'btn btn-danger');
    d.setAttribute('onclick', 'showform()');
    d.innerHTML = 'POST';
    postbtn.getElementsByTagName('button')[0].parentNode.replaceChild(d, postbtn.getElementsByTagName('button')[0]);
    formshow = false;
  }
}

//for share image
sharebtn.onclick = () => {
  /*
  var imgsrce = document.getElementById('imgViewer').getElementsByTagName('img')[0].src;
  if (navigator.share && navigator.canShare({ files: [imgsrce] })) {
    navigator.share({
      files: [imgsrce],
      title: 'Amazing business',
      text: 'Check out this amazing business',
    })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
  } else {
    console.log(`Your system doesn't support sharing files.`);
  }
  */
  var imgsrce = document.getElementById('imgViewer').getElementsByTagName('img')[0].src;
  var link = document.createElement('a');
  link.href = imgsrce;
  link.download = 'Download.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// send mail
mailbtn.onclick = function () {
  var nameinfo1 = document.getElementById('bname').value;
  var descriptioninfo1 = document.getElementById('bdescription').value;
  var useraddressinfo1 = (document.getElementById('address') == null) ? "" : document.getElementById("address").innerText;
  var imageinfo1 = [];
  var allimage1 = document.querySelectorAll("#picture img");
  for (var j = 0; j < allimage1.length; j++) {
    imageinfo1.push(allimage1[j].src);
  }

  if (nameinfo1 == "" || descriptioninfo1 == "" || useraddressinfo1 == "" || imageinfo1 == []) {
    return alert("variable empty");
  }

  document.location.href = 'mailto:' + "Youremail@email.com" + '?subject=' + "Amazing business: " + nameinfo1 + '&body=' + descriptioninfo1;

}

// show view
function showview(e) {
  window.scrollTo(0, 0);
  document.getElementsByClassName('head')[0].style.display = 'none';
  var viewjob = localStorage.getItem(e.target.id);
  var viewjob1 = JSON.parse(viewjob)[parseInt(e.target.id)];
  var viewblogtemplate = document.getElementById('viewblog').innerHTML;
  var viewplace = document.getElementById('detail');
  var createview = document.createElement('div');

  //remove previous detail view
  if (viewplace.firstChild) {
    viewplace.firstChild.remove();
  }

  //append new detail view
  createview.setAttribute('class', 'card');
  createview.innerHTML = viewblogtemplate;
  viewplace.appendChild(createview);
  document.getElementById('form').style.display = 'none';
  viewplace.style.display = 'block';
  viewplace.lastChild.getElementsByTagName('img')[0].src = viewjob1.image[0];
  viewplace.lastChild.getElementsByClassName('card-title')[0].innerText = viewjob1.name;
  viewplace.lastChild.getElementsByClassName('card-text')[0].innerText = viewjob1.description;
  viewplace.lastChild.getElementsByClassName('card-subtitle')[0].innerText = viewjob1.useraddress;

  //apend image
  for (var q = 0; q < viewjob1.image.length; q++) {
    var viewpicture = document.getElementById('viewpicture');
    var viewpicturetemplate = document.getElementById("viewimg").innerHTML;
    var piceleme = document.createElement('div');
    piceleme.className = "setsize";
    piceleme.innerHTML = viewpicturetemplate;
    viewpicture.appendChild(piceleme);
    viewpicture.lastChild.getElementsByTagName('img')[0].src = viewjob1.image[q];
  }

  //change form btn text
  /*
  if(formshow == true){
    document.getElementById("form").style.display = "none";
    document.getElementById('blog_place').style.display = 'block';
    document.getElementsByClassName('footer')[0].style.display = 'block';
    var d = document.createElement('button');
    d.setAttribute('type','button');
    d.setAttribute('class','btn btn-danger');
    d.setAttribute('onclick','showform()');
    d.innerHTML = 'POST';
    postbtn.getElementsByTagName('button')[0].parentNode.replaceChild(d, postbtn.getElementsByTagName('button')[0]);
    formshow = false;
    }
    */

  //show divider
  document.getElementById('divider').style.display = 'block';

  $('#viewpicture img').on('click', function (e) {
    $('#viewpic').attr('src', e.target.src);
  })

  //show all image
  viewplace.getElementsByTagName('a')[0].onclick = function () {
    document.getElementById('viewpicture').style.display = "flex";
    viewplace.getElementsByTagName('a')[0].style.display = 'none';
    viewplace.getElementsByTagName('a')[1].style.display = 'block';
  }

  viewplace.getElementsByTagName('a')[1].onclick = function () {
    document.getElementById('viewpicture').style.display = "none";
    viewplace.getElementsByTagName('a')[0].style.display = 'block';
    viewplace.getElementsByTagName('a')[1].style.display = 'none';
  }
}




/*
function appendimg(el) {
  var ele = el.target;
  document.getElementById('imgViewer').innerHTML = "";
  var addingimg = document.createElement('img');
  addingimg.setAttribute("src", ele.src);
  document.getElementById('imgViewer').appendChild(addingimg);
  document.getElementById('viewImg').style.display = "block";
}

document.getElementById("close-imgshow").onclick = () => {
  document.getElementById('viewImg').style.display = "none";
}
*/

// modal init
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})