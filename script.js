const generateButton = document.getElementById('generateButton');
const weatherQueryInput = document.getElementById('weatherQuery'); // Changed ID
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const inferredMoodSpan = document.getElementById('inferredMood');
const musicPlayerContainer = document.getElementById('musicPlayerContainer');
const musicPlayer = document.getElementById('musicPlayer');
const errorMessage = document.getElementById('errorMessage');

// Orchestration Layer API URL (ensure this matches where your orchestration service is running)
const ORCHESTRATION_API_URL = 'http://127.0.0.1:8000/orchestrate/weather-to-music';

generateButton.addEventListener('click', async () => {
    const naturalLanguageQuery = weatherQueryInput.value; // Changed variable name

    if (!naturalLanguageQuery.trim()) {
        displayMessage('Please describe the weather.', 'error');
        return;
    }

    // Reset UI
    displayMessage('', 'clear');
    resultsDiv.classList.add('hidden');
    musicPlayerContainer.classList.add('hidden');
    musicPlayer.src = '';
    musicPlayer.pause();
    musicPlayer.load(); // Reload to ensure it resets fully

    loadingDiv.classList.remove('hidden');
    generateButton.disabled = true;

    try {
        const response = await fetch(ORCHESTRATION_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                natural_language_query: naturalLanguageQuery, // Send natural language query
                duration_seconds: 90 // Default duration, could be user input
            }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.music_url) {
                inferredMoodSpan.textContent = data.mood || 'N/A';
                musicPlayer.src = data.music_url;
                musicPlayerContainer.classList.remove('hidden');
                resultsDiv.classList.remove('hidden');
                displayMessage('Music generated successfully!', 'success');
            } else if (data.error) {
                displayMessage(`Error: ${data.error}`, 'error');
                resultsDiv.classList.remove('hidden');
            } else {
                 displayMessage('Unexpected response from server.', 'error');
                 resultsDiv.classList.remove('hidden');
            }
        } else {
            const errorDetail = data.detail || 'Unknown error occurred.';
            displayMessage(`API Error (${response.status}): ${errorDetail}`, 'error');
            resultsDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Network or unexpected error:', error);
        displayMessage(`Network error: ${error.message}. Please check console for details.`, 'error');
        resultsDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
        generateButton.disabled = false;
    }
});

function displayMessage(message, type) {
    errorMessage.classList.add('hidden');
    if (type === 'error') {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    } else if (type === 'success') {
        // Could display success in a different area if desired, for now only errors use errorMessage div
    } else if (type === 'clear') {
        errorMessage.textContent = '';
    }
}