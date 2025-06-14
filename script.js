let currentLocation = null;

// Predefined danger locations (you can update with real lat/lng)
const dangerZones = [
  { lat: 17.3297, lng: 76.8343, name: "Kalaburagi Station" }, // example
  { lat: 17.3290, lng: 76.8270, name: "Old Bus Stand" }
];

function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      document.getElementById("status").innerText =
        `Your location: (${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)})`;
    });
  } else {
    alert("Geolocation is not supported by your browser");
  }
}

function checkSafety() {
  if (!currentLocation) {
    alert("Please track your location first.");
    return;
  }

  let unsafe = dangerZones.some((zone) => {
    let dist = Math.sqrt(
      Math.pow(zone.lat - currentLocation.lat, 2) +
      Math.pow(zone.lng - currentLocation.lng, 2)
    );
    return dist < 0.01; // Rough distance threshold
  });

  document.getElementById("status").innerText = unsafe
    ? "⚠️ This area is marked as dangerous."
    : "✅ This area appears safe.";
}

function sendLocation() {
  if (!currentLocation) {
    alert("Please track your location first.");
    return;
  }

  // Simulate sending SMS - replace this with Twilio, WhatsApp API, etc.
  let message = `Emergency! I'm at https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
  console.log("Sending location to family:", message);

  document.getElementById("status").innerText = "📤 Location sent to your trusted contact!";
}


let smsNumber = "+91 9019261975";
let smsMessage = `I'm here: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
window.location.href = `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
function sendCustomLocation() {
  const phone = document.getElementById("phoneNumber").value;
  if (!currentLocation) {
    alert("Track your location first.");
    return;
  }

  if (!phone) {
    alert("Please enter a phone number.");
    return;
  }

  // WhatsApp method
  let message = `Emergency! I'm here: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
  let url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
