function sendSOS() {
    // Get user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Create message with location
        var message = "Emergency! I need help. My location is: \n"
            + "Latitude: " + latitude + "\n"
            + "Longitude: " + longitude;

        // Send message to emergency contacts
        sendMessage(message);
    });
}

function sendMessage(message) {
    // Replace with your actual emergency contact numbers
    var contacts = ["9870306895", "9389405875"];

    // Loop through contacts and send message
    for (var i = 0; i < contacts.length; i++) {
        // Use your preferred messaging method (SMS, email, API, etc.)
        console.log("Sending message to " + contacts[i] + ": " + message);
    }

    alert("SOS message sent to emergency contacts!");
}
