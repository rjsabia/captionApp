function upload(file, signed_request, url, done) {
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
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "/sign?file_name=" + file.name + "&file_type=" + file.type)

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText)
      done(response)
      }
    }

      xhr.send()
}

function printLabelsTest(responses){
  $('#pic-labels').empty();
  var intro;
  
  $('#pic-labels').append('<span>'+'Your photo '+'</span>');
  for(var i=0; i < responses.Labels.length; i++){
    var theLabel = responses.Labels[i].Name[0]; 
    // console.log(theLabel);
    if(theLabel.match(/[aeiouAEIOU]/)){
      intro = " has an ";
    } 
    else{
      intro = " has a ";
    }
    $('#pic-labels').append('<span>'+intro+responses.Labels[i].Name)+'</span>';
  }
  $('#pic-labels').append('<span>'+' in it.'+'</span>');    
}

$(document).ready( function(){

    $('#rekog-button').click(function(){
      $('#rekog-link').fadeOut(300);
      $('#signIn-link').fadeOut(300);
      $('#rekog-block').fadeIn(600);
    });

    $('#signIn-button').click(function(){
      $('#signIn-link').fadeOut(300);
      $('#rekog-link').fadeOut(300);
      $('#signIn-block').fadeIn(600);
    });

    $('.back-button').click(function(){
      $('#signIn-block').fadeOut(300);
      $('#rekog-block').fadeOut(300);
      $('#signIn-link').fadeIn(600);
      $('#rekog-link').fadeIn(600);
    });

    document.getElementById("image").onchange = function() {
      var file = document.getElementById("image").files[0]
      if (!file) return

      sign_request(file, function(response) {
        upload(file, response.signed_request, response.url, function() {
          document.getElementById("preview").src = response.url
          var xhr = new XMLHttpRequest()
          
          xhr.open("GET", "/api/rekog?file_name=" + file.name)

          xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
              var response = JSON.parse(xhr.responseText)
            //RESPONSE IS MY OBJECT 
              printLabelsTest(response);

            }
          }

          xhr.send() 

        })
      })
    }
})
