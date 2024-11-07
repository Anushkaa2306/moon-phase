console.log("Script Loaded"); // Check if the script is loaded

function calculateMoonPhase() {
  const birthdateInput = document.getElementById('birthdate').value;
  const resultDiv = document.getElementById('moonDescription');
  const moonImage = document.getElementById('moonImage');

  console.log("Date Input:", birthdateInput); // Check if date is captured

  if (!birthdateInput) {
    resultDiv.innerHTML = "<p>Please enter a birthdate.</p>";
    moonImage.style.display = "none"; // Hide image if no date
    return;
  }

  const birthDate = new Date(birthdateInput);
  console.log("Parsed Date:", birthDate); // Confirm date is parsed correctly
  
  const moonPhase = getMoonPhase(birthDate);
  console.log("Calculated Moon Phase:", moonPhase); // Check moon phase result

  // Set the description and image based on the moon phase
  resultDiv.innerHTML = `<p>Your Moon Phase: <strong>${moonPhase.name}</strong></p> 
                         <p>${moonPhase.description}</p>`;
  moonImage.src = `images/${moonPhase.image}`;
  moonImage.style.display = "block"; // Show the image
}

// Function to calculate moon phase
function getMoonPhase(date) {
  const knownNewMoon = new Date('2020-06-21'); // Reference new moon date
  const daysInLunarCycle = 29.53; // Average length of lunar cycle
  
  // Calculate days since the known new moon date
  const daysSinceNewMoon = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  
  // Normalize to ensure it wraps around the 29.53-day cycle
  const normalizedDays = ((daysSinceNewMoon % daysInLunarCycle) + daysInLunarCycle) % daysInLunarCycle;
  
  // Determine the phase based on normalized days
  const phaseIndex = Math.floor(normalizedDays / (daysInLunarCycle / 8));

  const moonPhases = [
    { name: "New Moon", description: "The moon is not visible.", image: "new_moon.png" },
    { name: "Waxing Crescent", description: "The moon is starting to show.", image: "waxing_crescent.png" },
    { name: "First Quarter", description: "Half of the moon is visible.", image: "first_quarter.png" },
    { name: "Waxing Gibbous", description: "More than half of the moon is visible.", image: "waxing_gibbous.png" },
    { name: "Full Moon", description: "The entire face of the moon is visible.", image: "full_moon.png" },
    { name: "Waning Gibbous", description: "The moon is starting to wane.", image: "waning_gibbous.png" },
    { name: "Last Quarter", description: "Half of the moon is visible, waning.", image: "last_quarter.png" },
    { name: "Waning Crescent", description: "Only a small crescent is visible.", image: "waning_crescent.png" }
  ];

  return moonPhases[phaseIndex];
}

// Adding event listener for button
document.getElementById("calculateButton").addEventListener("click", calculateMoonPhase);
