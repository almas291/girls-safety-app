let currentLocation = null;

let dangerZones = [
  { lat: 17.3297, lng: 76.8343, name: "Kalaburagi Station" },
  { lat: 17.3290, lng: 76.8270, name: "Old Bus Stand" }
];

let reportedZones = [];

function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        updateStatus(`Your location: (${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)})`);
      },
      (error) => {
        updateStatus("❌ Location access denied or failed.");
        console.error(error);
      }
    );
  } else {
    updateStatus("❌ Geolocation not supported.");
  }
}

function checkSafety() {
  if (!currentLocation) {
    updateStatus("Please track your location first.");
    return;
  }

  let allDangerZones = dangerZones.concat(reportedZones);

  let unsafe = allDangerZones.some((zone) => {
    let dist = Math.sqrt(
      Math.pow(zone.lat - currentLocation.lat, 2) +
      Math.pow(zone.lng - currentLocation.lng, 2)
    );
    return dist < 0.01;
  });

  updateStatus(unsafe ? "⚠️ This area is marked as dangerous." : "✅ This area appears safe.");
}

function reportDanger() {
  if (!currentLocation) {
    alert("Please track your location first.");
    return;
  }

  reportedZones.push(currentLocation);
  updateStatus("⚠️ Location reported as dangerous.");
}

function sendCustomLocation() {
  const phone = document.getElementById("phoneNumber").value;
  if (!currentLocation) {
    alert("Please track your location first.");
    return;
  }

  if (!phone || phone.length < 10) {
    alert("Enter a valid 10-digit phone number.");
    return;
  }

  let message = `Emergency! I'm here: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
  let url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  updateStatus("📤 Location sent via WhatsApp.");
}

function updateStatus(text) {
  let statusEl = document.getElementById("status");
  if (statusEl) statusEl.innerText = text;
}
