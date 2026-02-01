const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
  }
});
function orderPlaced() {
  alert("Your order is placed ✅");
}



//contact form
var Submit = document.getElementById("submit")
Submit.addEventListener("click",function(){
    event.preventDefault()


    var nameRegex = /^[a-zA-Z ]+$/
    var emailRegex = /^[a-zA-z0-9]+@gmail.com/
    var subjectRegex = /\b\w+\b/
    var messageRegex =/\b\w+\b/

    var name = document.getElementById("name")
    var email = document.getElementById("email")
    var subject = document.getElementById("subject")
    var message = document.getElementById("message")
    var validate = true

    if(nameRegex.test(name.value)==false)
    {
        document.querySelector(".nameError").style.display="inline"
        validate=false
    }
    else{
        document.querySelector(".nameError").style.display="none"
    }

    if(emailRegex.test(email.value)==false)
    {
        document.querySelector(".emailError").style.display="inline"
        validate=false
    }
    else{
        document.querySelector(".emailError").style.display="none"
    }

    if(subjectRegex.test(subject.value)==false)
    {
        document.querySelector(".subjectError").style.display="inline"
        validate=false
    }
    else{
        document.querySelector(".subjectError").style.display="none"
    }

    if(messageRegex.test(message.value)==false)
    {
        document.querySelector(".messageError").style.display="inline"
        validate=false
    }
    else{
        document.querySelector(".messageError").style.display="none"
    }

    if(validate==true)
    {
        alert("Message Sent Successfully")
    }
})


//map

function initMap() {
  // Map options for New York
  var mapOptions = {
    center: { lat: 40.7128, lng: -74.0060 }, // New York City coordinates
    zoom: 12,
    mapTypeId: 'roadmap',
    gestureHandling: 'greedy' // allows dragging/zoom on mobile
  };

  // Create the map
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Add a marker in New York
  var marker = new google.maps.Marker({
    position: { lat: 40.7128, lng: -74.0060 },
    map: map,
    title: "New York City"
  });

  // Recenter map on window resize
  window.addEventListener("resize", function() {
    map.setCenter({ lat: 40.7128, lng: -74.0060 });
  });
}

// Initialize the map on page load
window.onload = initMap;