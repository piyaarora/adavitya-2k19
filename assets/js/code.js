$(document).ready(function () {
    $("#popup").css("display", "none");
});

var eventId;
var eventName = 'Register Yourself for Event';
// $("#idcard").click(function(){
//   $("#cardModal").show();
// });

const BASEURL = "https://adavitya.predot.co.in/";
const API_ID = "6d8e710f9b34dc5e705f46f30da44c87";
$(document).ready(function () {
    getCategories();
});

function getCategories() {
    $.post(
        BASEURL + "Categories/getAll",
        { api_id: API_ID },
        function (res) {
            res = JSON.parse(res);
            categories = res.categories;
            var elem = "";
            elem += `<div class="setheads">`;
            elem += `<p style="font-size:1.3rem;line-height:2.8rem">Category List</p>`;
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

function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}


function getEventCard(category_id) {
    $("#accordion")
        .html("Loading ...")
        .css("opacity", "0.5");
    $.post(
        BASEURL + "Events/getByCategoryId",
        {
            api_id: API_ID,
            category_id: category_id
        },
        function (res) {
            res = JSON.parse(res);
            var events = res.events;
            // console.log(res.events);
            var elem = "";
            if (res.events == undefined) {
                elem += getEmptyCard();
            }
            else {
                elem += `<div class="setheads">`;
                elem += `<p style="font-size:1.3rem;line-height:2.8rem">Events List</p>`;
                elem += `</div>`;
                for (i = 0; i < events.length; i++) {
                    var event_des = nl2br(events[i].event_des);
                    elem += `<div class="card">`;
                    elem += `<div id="headingOne">`;
                    elem += `<div class="collapsed card-header" data-toggle="collapse"`;
                    elem += `data-target="${"#event" + events[i].event_id}" aria-expanded="false"`;
                    elem += `aria-controls="collapseOne">`;
                    // elem += `<div class="images-box"><img class="img-fluid' src="assets/img/speaker/speakers-1.jpg" alt=""></div>`;
                    elem += `<span class="time">${events[i].event_date + ', ' + events[i].event_time}</span>`;
                    // elem += `<span class="time"><button onclick="register(${events[i]})">Register</button></span>`;
                    elem += `<span class="regis"><button type="button" class="btn btn-common" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="setEventId(${events[i].event_id},'${events[i].event_name}')">Register</button></span>`;
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


function registerStudent(event) {
    event.preventDefault();
    console.log(eventId);
    $.post(BASEURL + "Registration/registerByEventId", {
        api_id: API_ID,
        full_name: $("#student_name").val(),
        phone_number: $("#phone_number").val(),
        clg_name: $("#university_name").val(),
        event_id: $("#event_id").val(),
    }, function (res) {
        console.log(res);
        res = JSON.parse(res);
        if(res.response == false){
            alert(res.msg);
        }else if(res.response === true){
            alert("Thanks for registering");
            $('#exampleModal').modal().hide();
            $(".modal-backdrop").css('display','none');
            // $("#exampleModal .close").click();
            clearEventInputs();
        }
    });
}

function clearEventInputs(){
    $("#event_id, #student_name,#university_name, #phone_number").val("");
}


function setEventId(eventId, eventName) {
    $("#event_name").html(eventName);
    $("#event_id").val(eventId);
}

function displayform() {
    // alert("working");
    $("#popup").css({ "display": "block" });
    $("html, body").animate(
        {
            scrollTop: $("#popup").offset().top
        }, 0
    );
}

$("#backToEvents").click(function () {
    $("#popup").hide();
});

function register(event_id) { }

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
