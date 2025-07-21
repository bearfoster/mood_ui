const generateButton = document.getElementById('generateButton');
const promptQueryInput = document.getElementById('promptQuery');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const inferredMoodSpan = document.getElementById('inferredMood');
const musicPlayerContainer = document.getElementById('musicPlayerContainer');
const musicPlayer = document.getElementById('musicPlayer');
const errorMessage = document.getElementById('errorMessage');
const themeButtons = document.querySelectorAll('.theme-button');

// Orchestration Layer API URL (ensure this matches where your orchestration service is running)
const ORCHESTRATION_API_URL = 'http://127.0.0.1:8000/orchestrate/weather-to-music';

// --- THEME SWITCHING LOGIC ---
function applyTheme(themeName) {
    // A single class on the body controls the theme
    document.body.className = `theme-${themeName}`;

    // Update active state on buttons
    themeButtons.forEach(button => {
        if (button.dataset.theme === themeName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Save the theme to local storage for persistence
    localStorage.setItem('selectedTheme', themeName);
}

// Add event listeners to theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        applyTheme(button.dataset.theme);
    });
});

// On page load, apply the saved theme or default to psychedelic
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'psychedelic';
    applyTheme(savedTheme);
});


// --- MUSIC GENERATION LOGIC ---
generateButton.addEventListener('click', async () => {
    const naturalLanguageQuery = promptQueryInput.value;

    if (!naturalLanguageQuery.trim()) {
        displayMessage('Please enter a description.', 'error');
        return;
    }

    // Reset UI
    displayMessage('', 'clear');
    resultsDiv.classList.add('hidden');
    musicPlayerContainer.classList.add('hidden');
    musicPlayer.src = '';
    musicPlayer.pause();
    musicPlayer.load();

    loadingDiv.classList.remove('hidden');
    generateButton.disabled = true;

    try {
        const response = await fetch(ORCHESTRATION_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                natural_language_query: naturalLanguageQuery,
                duration_seconds: 90
            }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.music_url) {
                inferredMoodSpan.textContent = data.mood || 'N/A';
                musicPlayer.src = data.music_url;
                musicPlayerContainer.classList.remove('hidden');
                resultsDiv.classList.remove('hidden');
                displayMessage('', 'clear');
            } else if (data.error) {
                displayMessage(`Error: ${data.error}`, 'error');
                resultsDiv.classList.remove('hidden');
            } else {
                 displayMessage('An unexpected error occurred. The server response was incomplete.', 'error');
                 resultsDiv.classList.remove('hidden');
            }
        } else {
            const errorDetail = data.detail || 'An unknown error occurred on the server.';
            displayMessage(`API Error (${response.status}): ${errorDetail}`, 'error');
            resultsDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Network or unexpected error:', error);
        displayMessage(`Network error: ${error.message}. Is the orchestration service running?`, 'error');
        resultsDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
        generateButton.disabled = false;
    }
});

function displayMessage(message, type) {
    errorMessage.textContent = message;
    if (type === 'error' && message) {
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
    }
}
