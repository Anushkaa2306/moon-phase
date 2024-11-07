async function getMoonPhase() {
    const date = document.getElementById('birth-date').value;
    const resultDiv = document.getElementById('result');

    if (!date) {
        resultDiv.innerHTML = "Please select a date.";
        return;
    }

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&start_date=${date}&end_date=${date}&daily=moonphase`;

    try {
        const response = await fetch(apiUrl);
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Log the response to inspect its structure
        console.log("API Response:", data);

        // Check if daily data and moonphase are present in the response
        if (!data.daily || !data.daily.moonphase || data.daily.moonphase.length === 0) {
            resultDiv.innerHTML = "Moon phase data is unavailable for the selected date.";
            return;
        }

        // Extract moonphase data for the selected date
        const moonPhaseValue = data.daily.moonphase[0];
        console.log("Moon Phase Value:", moonPhaseValue); // Log to verify
        
        // Map the moon phase value to a readable phase name
        const moonPhases = [
            "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
            "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
        ];
        
        // Convert moon phase value to an index
        const phaseIndex = Math.round(moonPhaseValue * 8) % 8; // Ensure index is within bounds
        const phaseName = moonPhases[phaseIndex];
        
        // Display the result
        resultDiv.innerHTML = `
            <h2>Moon Phase on ${date}</h2>
            <p>Phase: ${phaseName}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = "An error occurred while fetching moon data.";
        console.error("Fetch Error:", error);
    }
}
