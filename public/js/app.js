var herokuUrl = 'https://shrouded-bastion-13556.herokuapp.com/';


function upload(file, signed_request, url, done) {
//   $.ajax({
//     url: url,
//     contentType: 'application/json',
//     type: 'PUT',
//     dataType: 'json',
//     headers: {
//       'x-amz-acl': 'public-read',
//     },
//     data: JSON.stringify({file: file, signed_request: signed_request}),
//     success: function(data) {
//       done(data);
//     },
//     error: function(error) {
//       console.log(error);
//     }
// });  


  var xhr = new XMLHttpRequest()
  xhr.open("PUT", signed_request)
  xhr.setRequestHeader('x-amz-acl', 'public-read')
  xhr.onload = function() {
    if (xhr.status === 200) {
      done()
    }
  }

  xhr.send(file)
}

function sign_request(file, done) {
  $.ajax({
    url: "/sign?file_name=" + file.name + "&file_type=" + file.type,
    contentType: 'application/json',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      done(response);
    },
    error: function(error) {
      console.log(error);
    }
});  


  // var xhr = new XMLHttpRequest()
  // xhr.open("GET", "/sign?file_name=" + file.name + "&file_type=" + file.type)

  // xhr.onreadystatechange = function() {
  //   if(xhr.readyState === 4 && xhr.status === 200) {
  //     var response = JSON.parse(xhr.responseText)
  //     done(response)
  //     }
  //   }

  //     xhr.send()
}

function printLabelsTest(responses){
  $('#pic-labels').empty();
  var intro;
  
  $('#pic-labels').append('<span class="underline">'+'Your photo '+'</span>');
  for(var i=0; i < responses.Labels.length; i++){
    var theLabel = responses.Labels[i].Name[0]; 
    // console.log(theLabel);
    if(theLabel.match(/[aeiouAEIOU]/)){
      intro = "<span> has an: </span>";
    } 
    else{
      intro = "<span> has a: </span>";
    }
    $('#pic-labels').append('<li>'+intro+responses.Labels[i].Name)+'</li>';
  }
   $('#pic-labels').append('<span class="underline">'+' in it.'+'</span>'); 
   $('#pic-labels').append('</br><p id="explain">'+
    'These are the data labels you can search for and organize your photos with.'+'</p>');  
}
// push labels and url to user database TEST
function pushPicData(picData, linkUrl){

  console.log('Here is your pic link: ' + linkUrl);
  console.log('Here is your response: ' + JSON.stringify(picData));
  $.ajax({
    url: "http://localhost:8080/users/addPicData",
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(
    {
      linkUrl: linkUrl,
      picData: picData
    }
  ),
    success: function(data) {
      if(data.message){
        alert('You are not logged in');
      }
      else{
        // need them to do something if everything went good
      }
      console.log('check your postman for: ' + JSON.stringify(data));
    },
    error: function(error) {
      console.log(error);
    }
  });
}
// *****************************************

function addUser(firstName, email, username, password, callback) {
  $.ajax({
    // url: "http://localhost:8080/users/",
    url: herokuUrl + 'users/',
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(
      {
      firstName: firstName,
      email: email,
      username: username,
      password: password
      }
    ),
    success: function(data) {
      callback(data);
      window.location = '/';
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function logIn(username, password, callback) {
  $.ajax({
    // url: "http://localhost:8080/users/login",
    url: herokuUrl + 'login',
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({ username: username, password: password}), 
    success: function(data) {
      // callback(data);
      console.log(data);
      window.location = '/';
      offerLogout();
      // alert('Welcome back' + data);
    },
    error: function(error) {
      console.log(error);
      // window.location = '/login';
    }
  });
}

function setPlaySpeed() { 
  var vid = document.getElementById("banner-vid");
  vid.playbackRate = 0.70;
} 

function offerLogout(){
  $('.signIn-button').hide();
  $('.logout-button').fadeIn(100);
}

$(document).ready( function(){
    $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start) {
          $("#header-container").css('background-color', '#0099e5');
          $("#header-container").css('background-image', 
            'radial-gradient(circle farthest-side at center bottom,#009cde,#003087 125%)');
          $("#header-container").css('height', '70px');
          $("#header-container").css('border-bottom', 'none');
          $("#logo").css('font-size', '31px');
          $("#logo-div").css('background-color', 'transparent');
          $("#logo-div").css('background-image', 'none');
          $("li a").css('font-size', '21px');
          $(".mobile-menu-trigger a").css('font-size', '30px');
      } else {
         $('#header-container').css('background-color', 'transparent');
         $("#header-container").css('background-image', 'none');
         $("#header-container").css('height', '58px');
         $("#header-container").css('border-bottom', 'solid 0.5px white');
         $("#logo").css('font-size', '28px');
         $("#logo-div").css('background-color', '#0099e5');
         $('#logo-div').css('background-image', 
          'radial-gradient(circle farthest-side at center bottom,#009cde,#003087 125%)')
         $("li a").css('font-size', '20px');
         $(".mobile-menu-trigger a").css('font-size', '26px');
      }
    });
    // video playrate control
    setPlaySpeed();
    // mobile menu functionality using sidr
    $('#right-menu').sidr({
      name: 'sidr-right',
      side: 'right',
    });

    $('.mobile-button').bind("click", function(){
      $.sidr('close', 'sidr-right');
    });

    $('.rekog-button').click(function(){
      $('#story-section').fadeOut(300);
      $('#header-container').fadeOut(300);
      $('#vid-container').fadeOut(300);
      $('#story-content').fadeOut(300);
      $('#foot-div').fadeOut(300);
      $('#rekog-link').fadeOut(300);
      $('#signIn-link').fadeOut(300);
      $('#rekog-block').fadeIn(600);
      $('#rekog-intro').fadeIn(600);
    });
    // form animation for signIn or register
    $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

    $('.signIn-button').click(function(){
      $('#story-section').fadeOut(300);
      $('#header-container').fadeOut(300);
      $('#vid-container').fadeOut(300);
      $('#story-content').fadeOut(300);
      $('#foot-div').fadeOut(300);
      $('#signIn-link').fadeOut(300);
      $('#rekog-link').fadeOut(300);
      $('#signIn-block').fadeIn(600);
    });

    $('.about-button').click(function(){
      $('#story-section').fadeOut(300);
      $('#header-container').fadeOut(300);
      $('#vid-container').fadeOut(300);
      $('#story-content').fadeOut(300);
      $('#foot-div').fadeOut(300);
      $('#signIn-link').fadeOut(300);
      $('#rekog-link').fadeOut(300);
      $('#about-block').fadeIn(600);
    })


    $('.back-button').click(function(){
      $('.register-form')[0].reset();
      $('.login-form')[0].reset();
      $('#signIn-block').fadeOut(300);
      $('#rekog-block').fadeOut(300);
      $('#sign-up').fadeOut(300);
      $('#about-block').fadeOut(300);
      $('#header-container').fadeIn(300);
      $('#story-content').fadeIn(300);
      $('#foot-div').fadeIn(300);
      $('#vid-container').fadeIn(300);
      $('#signIn-link').fadeIn(600);
      $('#rekog-link').fadeIn(600);
      $('#story-section').fadeIn(600);
      $('#pic-labels').empty();
      $('#preview').css('display', 'none');
      $('.container').css('display', 'none');
      $('#preview')[ 0 ].src = '#';
      $("#preview").css('height', '0px');
      $("#preview").css('width', '0px');
      $("#preview").css('opacity', '.01');
    });

    $('.file-upload').click(function(){
      $('#rekog-intro').fadeOut(2000);
      $("#preview").css('height', 'auto');
      $("#preview").css('width', 'auto');
      $("#preview").css('opacity', '1');
      $('#preview').fadeIn(1000);
      $('.container').fadeIn(1000);
    });
    // Image scanning effect
    $('.file-upload').click(function () {
      $('#preview-container').addClass('scanning');
      setTimeout(function () {
        $('#preview-container').removeClass('scanning');
      }, 10 * 1000);
    });

    $('.register-form').submit(function(event) {
      event.preventDefault();
      let firstName = $('.register').find('#firstName').val();
      console.log(firstName);
      let email = $('.register').find('#email').val();
      console.log(email);
      let username = $('.register').find('#username').val();
      console.log(username);
      let password = $('.register').find('#password').val();
      // console.log(password);
      addUser(firstName, email, username, password, function(data){
        console.log(data);
      });
    });

    $('.login-form').submit(function(event) {
      event.preventDefault();
      let username = $('.login-form').find('#login-username').val();
      // console.log(username);
      let password = $('.login-form').find('#login-pw').val();
      // console.log(password);
      logIn(username, password, function(loginData){
        // console.log(loginData);
      });
    });

    document.getElementById("image").onchange = function() {
      var file = document.getElementById("image").files[0]
      if (!file) return

      sign_request(file, function(response) {
        upload(file, response.signed_request, response.url, function() {
          document.getElementById("preview").src = response.url
          var picUrl = response.url;
          $.ajax({
            url: "/api/rekog?file_name=" + file.name,
            contentType: 'application/json',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
              printLabelsTest(response);
              pushPicData(response, picUrl);
            },
            error: function(error) {
              console.log(error);
            }
          });  

        })
      })
    }
})
