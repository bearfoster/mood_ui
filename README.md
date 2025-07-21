# AI Mood to Music Generator (Frontend / UI)

This repository contains the user interface (UI) for an AI system that generates original music from a natural language prompt. It provides a simple, interactive web page that allows users to describe a scene, feeling, place, or idea and receive a unique piece of music based on the inferred mood.

This is a pure frontend application, built with HTML, CSS (Tailwind CSS), and JavaScript, and it directly interacts with the Orchestration Layer's API.

## Features

* **User-Friendly Interface:** A simple text area for any natural language input.
* **Dynamic Feedback:** Displays loading states, the mood inferred by the AI, and plays the generated music.
* **Error Reporting:** Provides clear error messages if issues occur during the music generation process.
* **Responsive Design:** Utilizes Tailwind CSS for a modern and responsive layout.

## File Structure

The UI is organized into three main files:

-   `index.html`: The main HTML document.
-   `style.css`: Contains all the custom CSS rules for the application.
-   `script.js`: Contains all the JavaScript logic for interacting with the backend and manipulating the DOM.

## Technologies Used

* **HTML5:** `index.html` for the structure of the web page.
* **CSS:** `style.css` for custom styling and layout.
* **JavaScript (ES6+):** `script.js` for handling user interaction, API calls, and dynamic content.
* **Tailwind CSS:** Used via CDN for utility-first styling.

## Interaction Flow

1.  The user enters a natural language query in the text area (e.g., "a city street at night after the rain").
2.  The user clicks "Generate Music".
3.  The JavaScript sends a `POST` request to the Orchestration Layer's API.
4.  The web app displays a loading spinner while the backend analyzes the mood and generates the music.
5.  Upon receiving a response from the Orchestration Layer:
    * If successful, it displays the inferred mood and plays the provided music URL.
    * If an error occurs, it displays an appropriate error message.

## Setup and Running

This is a static web application.

### Prerequisites

* A modern web browser (Chrome, Firefox, Edge, etc.)
* The backend services (Mood Analysis, Music Generation, Orchestration Layer) must be running and accessible at their specified ports.

### Steps

1.  Navigate to the application directory.
2.  Open `index.html` in your web browser (e.g., by double-clicking the file).

## Configuration

The web application needs to know the URL of the Orchestration Layer API. This is configured at the top of `script.js`.

* **`script.js`:**
    ```javascript
    const ORCHESTRATION_API_URL = '[http://127.0.0.1:8000/orchestrate/weather-to-music](http://127.0.0.1:8000/orchestrate/weather-to-music)';
    ```
    If your Orchestration Layer is running on a different host or port, you must update this URL.
