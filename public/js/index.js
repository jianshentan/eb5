console.log("test");

/* -----------------------------
	 ------------- Loading Overlay
	 ----------------------------- */
	
$( window ).on('load', function() {
  /*
  setTimeout( function() {
    $(".eb5-loading-overlay").fadeOut();
  }, 200);
  */
});

/* -----------------------------
	 -- Navbar hide on scroll down
	 ----------------------------- */
	 
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navHeight = $('.eb5-nav').outerHeight();
var nav = $(".eb5-nav");

$(window).on('scroll', function(event){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();
    
  // Make sure they scroll more than delta
  if(Math.abs(lastScrollTop - st) <= delta)
    return;
    
  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navHeight){
    // Scroll Down
    nav.slideUp("fast");
  } else {
    // Scroll Up
    if(st + $(window).height() < $(document).height()) {
    	nav.slideDown("fast");
    }
  }
    
  lastScrollTop = st;
}

/* -----------------------------
	 ----------------- Submit form 
	 ----------------------------- */

var firstname = $("#firstname"), 
    lastname = $("#lastname"), 
    email = $("#email"), 
    phone = $("#phone"),
    description = $("#description");
    
firstname.on('input', function(){
  $(this).removeClass("warning");
});
lastname.on('input', function(){
  $(this).removeClass("warning");
});
email.on('input', function(){
  $(this).removeClass("warning");
});
phone.on('input', function(){
  $(this).removeClass("warning");
});
description.on('input', function(){
  $(this).removeClass("warning");
});
    
    
function validateFields() {
  var isValid = true;
  if (firstname.val().length === 0) {
    firstname.addClass("warning");  
    isValid = false;
  }
  if (lastname.val().length === 0) {
    lastname.addClass("warning");
    isValid = false;
  }
  if (!isValidEmailAddress(email.val())) {
    email.addClass("warning");
    isValid = false;
  }
  if (phone.val().length === 0) {
    phone.addClass("warning");
    isValid = false;
  }
  if (!description.val()) {
    description.addClass("warning");
    isValid = false;
  }
  return isValid;
}

$("#submit").click(function(){ 
  // disable click event after it has been clicked
  $(this).attr('onclick', '');
  
  // show loading label
  $("#loadingLabel").fadeIn();
  
  // validate fields and submit!
  if (validateFields()) {    
    var data = {
      firstname: firstname.val(),
      lastname: lastname.val(),
      email: email.val(),
      phone: phone.val(),
      description: description.val()
    };
    
    $.get('/submit', data)
    .done(function() {
      $("#loadingLabel").hide();
      $("#successLabel").fadeIn();
    })
    .fail(function() {
      $("#loadingLabel").hide();
      $("#errorLabel").fadeIn();
    })
    .always(function() {
      $("#submit").prop("disabled", true);  
      $("#loadingLabel").hide();
    });
    
  } else {
    $("#loadingLabel").hide();
    $("#invalidLabel").fadeIn();
  }
    
});

function isValidEmailAddress(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
};