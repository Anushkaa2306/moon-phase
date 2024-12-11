console.log("Script Loaded"); // Check if the script is loaded

function calculateMoonPhase() {
  const birthdateInput = document.getElementById('birthdate').value;
  const resultDiv = document.getElementById('moonDescription');
  const moonImage = document.getElementById('moonImage');
  const result = document.getElementById('result');
  console.log(result);
  

  

  console.log("Date Input:", birthdateInput); // Check if date is captured

  if (!birthdateInput) {
    resultDiv.innerHTML = "<p>Please enter a birthdate.</p>";
    result.style.display = "none"; // Hide image if no date
    return;
  }
  else{
    moonImage.style.boxShadow = "0 0 30px 10px rgba(255, 255, 255, 0.9), 0 0 60px 20px rgba(173, 216, 230, 0.7)";
  }

  const birthDate = new Date(birthdateInput);
  console.log("Parsed Date:", birthDate); // Confirm date is parsed correctly
  
  const moonPhase = getMoonPhase(birthDate);
  console.log("Calculated Moon Phase:", moonPhase); // Check moon phase result

  // Set the description and image based on the moon phase
  resultDiv.innerHTML = `<p>Your Moon Phase: <strong>${moonPhase.name}</strong></p> 
                         <p>${moonPhase.description}</p>`;
  moonImage.src = `./image/${moonPhase.image}`;
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
    { name: "New Moon", description: "Your Head and Heart are aligned. You know what you want, you might not always admit it to yourself, or follow through on getting or doing it, but you know! Lots of ideas, creativity, strong personality. The lack of inner friction between head and heart can make you a little impulsive, like once to decide you Go!      Some of the difficult part… being quick to start you might lose steam rather quickly, a better sprinter than marathon runner (figuratively). You might also lack insight into yourself. You can profit from using others as a mirror to perhaps point out where you might be a little selfish, callous or otherwise unconscious of your own behavior.. ", image: "new_moon.png" },
    { name: "Waxing Crescent", description: "you are the embodiment of strength and perseverance. Meaning the loved ones in your life definitely lean on you! Out of the darkness comes the Waxing Crescent, and through difficult times you are like a light that never yields but continues to shine. You are ambitious and extremely productive. Although this is an envious quality, we might add that at times these traits can definitely be viewed as slightly stubborn and maybe a tad argumentative ( No biggie though). You love being firm in your beliefs and ideals to fight for what is right, and that is a good thing. But knowing this about your lunar personality also means you have an obligation to take a step back and make sure you’re not being blinded by your own strength. Take time to assess your behaviors and reflect on whether you are using your incredible driving force to do good for yourself and others.beige background with waxing crescent description It will always be beneficial for you to rely on those in your inner circles for guidance and direction, be sure to listen to those who may see the world a little bit differently than yourself. Never be afraid to improve yourself and you will go on to accomplish incredible things.Professions suited for those who are born under the Waxing Crescent moon phase are those where you can be your own boss. Perhaps starting your own business, whether it be something like freelancing, product-based or a service. With the standards you set for yourself, accountability and the satisfaction of accomplishing your goals, we know that you will shine in whatever you undertake.Embrace your lunar personality by treating yourself to a piece that will showcase your Waxing Crescent. With hundreds of styles to choose from we know that you will wear your new jewels proudly for the whole world to see.Don’t forget to snap a photo and share it with us for a chance to be featured on our socials by using #MoonglowMoment.", image: "waxing_crescent.png" },
    { name: "First Quarter", description: "you are a builder, a pioneer, a born leader - a getting stuff done kind of person. In your world – all is possible. You are highly aware of your potential and the potential of others and you have the ability to see what to others still remains unseen.You are a person of action who loves a good, juicy challenge. The more difficult the challenge, the more excited you get – and the better you perform. ", image: "first_quarter.png" },
    { name: "Waxing Gibbous", description: "You have an incredible capacity to create, and support others to do the same. Maybe your dreams are realized as you support others and you understand that the material realm is a place to express everyone’s desires, beliefs and ideas. If you are born during the Waxing Gibbous Moon phase you are attuned to the Earth and the material plain. You are born a mentor. A perfectionist. A person in search of meaning and purpose.Humans born under this Moon are known to be caring, nurturing, and calming. You likely excel at developing relationships with other people, guiding them and inspiring them to reach new personal heights in their lives. You are incredibly loved and respected for the care and nurture that you exude.", image: "waxing_gibbous.png" },
    { name: "Full Moon", description: "have an Opposition Aspect between the Sun and Moon. Bearing in mind that they have to be within 6° of one another for the Aspect to become effective, and therefore more noticeable.This means that usually the Sun and Moon are in OPPOSITE SIGNS of the Zodiac.This is said to be an indication of Objectivity when the subject is continually forced to take into account OPPOSITE POINTS OF VIEW. With the Moon indicating the mother, and the Sun indicating the father (among other things) this usually means that the father and mother do not get along with one another very well.", image: "full_moon.png" },
    { name: "Waning Gibbous", description: "Focus is just beginning to turn from the building tide of the new Moon to the dissemination of its fruition. You have a foot in both camps. You have an innate confidence in who you are and take pride in your skills and abilities. You thrive on appreciation; it’s like fuel to your fire. You make a lasting impression on those you make contact with and they tend to defer to you. But you must guard against self-centeredness and start to think collective rather than personal. The challenge you face is that of discovering the appropriate way in which you can use your innate strengths to the benefit of others. There is something you possess that must be passed on and communicated. ", image: "waning_gibbous.png" },
    { name: "Last Quarter", description: " The future speaks through your Moon tribe. You’re visionary, revolutionary, and deeply thoughtful—which means you’re frequently frustrated with the way things are. That’s the problem with being ahead of your time. You have to somehow come to terms with the turgid pace at which reality actually changes. You may often find yourself planting seeds for a future that’s still years away from blooming. ", image: "last_quarter.png" },
    { name: "Waning Crescent", description: "You will learn how to give folks what they want in order that they will leave this deeper part of you in peace. You feel different and apart and not really in the swim with all the rest. It’s all too easy for others to project the shadow onto you so that you find yourself frequently scapegoated and carrying the guilt or blame. But you are not to blame and will not be abandoned by higher forces. Even though you may often feel ignored or victimised, you are not invisible or weak, just very subtle and good at shape shifting! You are in fact, extremely sensitive and empathetic, easily tuning in to collective moods and the feelings of others so that too much exposure to the electrical excitements of the outer world can actually make you feel ill..", image: "waning_crescent.png" }
  ];

  return moonPhases[phaseIndex];
}

// Adding event listener for button
document.getElementById("calculateButton").addEventListener("click", calculateMoonPhase);
