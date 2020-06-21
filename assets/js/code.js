$(document).ready(function(){
  $("#popup").css("display", "none");
});

// $("#idcard").click(function(){
//   $("#cardModal").show();
// });

var url = "https://adavitya.predot.co.in/";
var api_id = "6d8e710f9b34dc5e705f46f30da44c87";
$(document).ready(function() {
  getCategories();
});

function getCategories() {
  $.post(
    url + "Categories/getAll",
    {api_id: api_id},
    function(res) {
      res = JSON.parse(res);
      categories = res.categories;
      var elem = "";
      elem += `<div class="setheads">`;
      elem += `<h5>Category List</h5>`;
      elem += `</div>`;
      for (i = 0; i < categories.length; i++) {
        elem += `<li class="nav-item" onclick="getCard(${categories[i].category_id})">`;
        elem += `<a class="nav-link ${i == 0 ? "active" : ""}" id="monday-tab" data-toggle="tab" href="#monday" role="tab"`;
        elem += `aria-controls="monday" aria-expanded="true">`;
        elem += `<div class="item-text">`;
        elem += `<h4>${categories[i].category_name}</h4>`;
        // elem += `<h5>Click for more</h5>`;
        elem += `</div>`;
        elem += `</a>`;
        elem += `</li>`;
      }
      $("#myTab")
        .html(elem)
        .css("opacity", "1");
      getEventCard(1);
    }
  );
}

function gotoDiv() {
  $("html, body").animate(
    {
      scrollTop: $("#myTabContent").offset().top - 100
    },
    1000
  );
}

function getCard(category_id) {
  gotoDiv();
  getEventCard(category_id);
}

function nl2br (str, is_xhtml) {   
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}


function getEventCard(category_id) {
  $("#accordion")
    .html("Loading ...")
    .css("opacity", "0.5");
  $.post(
    url + "Events/getByCategoryId",
    {
      api_id: api_id,
      category_id: category_id
    },
    function(res) {
      res = JSON.parse(res);
      var events = res.events;
      console.log(res.events);
      var elem = "";
      if (res.events == undefined) {
        elem += getEmptyCard();
      } 
      else 
      {  
        elem += `<div class="setheads">`;
        elem += `<h5>Events List</h5>`;
        elem += `</div>`;
        for (i = 0; i < events.length; i++) 
        {
          var event_des = nl2br(events[i].event_des);
          elem += `<div class="card">`;
          elem += `<div id="headingOne">`;
          elem += `<div class="collapsed card-header" data-toggle="collapse"`;
          elem += `data-target="${"#event" +events[i].event_id}" aria-expanded="false"`;
          elem += `aria-controls="collapseOne">`;
          // elem += `<div class="images-box"><img class="img-fluid' src="assets/img/speaker/speakers-1.jpg" alt=""></div>`;
          elem += `<span class="time">${events[i].event_date + ', ' + events[i].event_time}</span>`;
          // elem += `<span class="time"><button onclick="register(${events[i]})">Register</button></span>`;
          elem += `<span class="regis"><button type="button" class="btn btn-common" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Register</button></span>`;
          elem += `<h4>${events[i].event_name}</h4>`;
          elem += `<h5 class="name">${events[i].coordinators}</h5>`;
          elem += `<div class="aligning">`;
          elem += `<br><i class="fa fa-angle-down"></i>`;
          elem += `</div>`
          elem += `</div>`;
          elem += `</div>`;
          elem += `<div id="${"event" + events[i].event_id}" class="collapse" aria-labelledby="headingOne"`;
          // ${i == 0 ? "show" : ""}
          elem += `data-parent="#accordion">`;
          elem += `<div class="card-body">`;
          elem += `<p>${event_des}</p>`;
          elem += `<div class="location">`;
          elem += `<span>Venue:</span>`;
          elem += `${events[i].event_venue}`;
          elem += `</div>`;
          elem += `</div>`;
          elem += `</div>`;
          elem += `</div>`;
        }
      }
      $("#accordion")
        .html(elem)
        .fadeIn(2000)
        .css("opacity", "1");
    }
  );
}

function displayform(){
  // alert("working");
  $("#popup").css({"display": "block"});
  $("html, body").animate(
    {
      scrollTop: $("#popup").offset().top
    },0
  );
}

$("#backToEvents").click(function(){
  $("#popup").hide();
});

function register(event_id) {}

function getEmptyCard() {
  var elem = "";
  elem += `<div class="card">`;
  elem += `<div id="headingOne">`;
  elem += `<div class="collapsed card-header" data-toggle="collapse"`;
  elem += `data-target="mine" aria-expanded="false"`;
  elem += `aria-controls="collapseOne">`;
  elem += `<div class="images-box"><img class="img-fluid"`;
  elem += `src="assets/img/speaker/speakers-1.jpg" alt=""></div>`;
  elem += `<span class="time">NO Time Settled</span>`;
  elem += `<h4>No Event found</h4>`;
  elem += `<h5 class="name">David Warner</h5>`;
  elem += `</div>`;
  elem += `</div>`;
  elem += `<div id="mine" class="collapse show" aria-labelledby="headingOne"`;
  elem += `data-parent="#accordion">`;
  elem += `<div class="card-body">`;
  elem += `<p>Description</p>`;
  elem += `<div class="location">`;
  elem += `<span>Location:</span>`;
  elem += `No Location as of now`;
  elem += `</div>`;
  elem += `</div>`;
  elem += `</div>`;
  elem += `</div>`;
  return elem;
}
