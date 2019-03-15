var socialMedia = {
  pinterest : 'https://www.pinterest.com/',
  twitter : 'https://twitter.com/',
  facebook : 'http://facebook.com/',
  yahoo : 'https://www.yahoo.com/'
};

var socialList = function() {
  var output = '<ul>',
  myList = document.querySelectorAll('.socialmediaicons');

  for (var key in arguments[0]) {
    output += '<li><a href="' + socialMedia[key] + '" target ="_blank">' +
      '<img src="img/' + key + '.png" alt="icon for '+key+'">' +
      '</a></li>';
  }
  output += '</ul>';
  
  for (var i = myList.length - 1; i >= 0; i--) {
    myList[i].innerHTML = output;
  };
}(socialMedia);

/*blue block*/

function Blueblock(id) {
     var div = document.getElementById(id);
  if(div.style.display =='block') {
    div.style.display = 'none';
  }
  else{
    div.style.display = 'block';
  }
}
function Close(id) {
     var div = document.getElementById(id);
  if(div.style.display =='none') {
    div.style.display = 'block';
  }
  else{
    div.style.display = 'none';
  }
}
 
// When the user clicks on div, open the popup
function Popup(id) {
    var x = document.getElementById(id);
    x.classList.toggle("show");
}
//form send message
function myFunction(id){
  document.getElementById(id).submit();
}


