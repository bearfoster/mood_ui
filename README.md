# Web Application (Frontend / UI)

This repository contains the user interface (UI) for the "Weather to Mood to Music" agentic AI system. It provides a simple, interactive web page that allows users to describe weather conditions in natural language and receive generated music based on the inferred mood.

This is a pure frontend application, built with HTML, CSS (Tailwind CSS), and JavaScript, and it directly interacts with the Orchestration Layer's API.

## Features

* **User-Friendly Interface:** Simple form for natural language weather input.
* **Dynamic Feedback:** Displays loading states, inferred mood, and plays the generated music.
* **Error Reporting:** Provides clear error messages if issues occur during the music generation process.
* **Responsive Design:** Utilizes Tailwind CSS for a modern and responsive layout.

## Technologies Used

* **HTML5:** Structure of the web page.
* **CSS (Tailwind CSS):** Styling and responsive design.
* **JavaScript (ES6+):** Handles user interaction, API calls to the Orchestration Layer, and dynamic content updates.

## Interaction Flow

1.  User enters a natural language weather query in the text area.
2.  User clicks "Generate Music".
3.  The JavaScript sends a `POST` request to the Orchestration Layer's API (`/orchestrate/weather-to-music`).
4.  The web app displays a loading spinner.
5.  Upon receiving a response from the Orchestration Layer:
    * If successful, it displays the inferred mood and plays the provided music URL.
    * If an error occurs, it displays an appropriate error message.

## Setup and Running

This is a static web application, so it does not require a backend server in this repository.

### Prerequisites

* A web browser (Chrome, Firefox, Edge, etc.)
* The backend services (Mood Analysis, Music Generation, Orchestration Layer) must be running and accessible at their specified ports (`8001`, `8002`, `8003`).

### Steps

1.  **Clone the Repository (if applicable) or navigate to the application directory:**
    ```bash
    cd path/to/your/project/webapp
    ```

2.  **Open `index.html` in your web browser:**
    Simply double-click the `index.html` file in your file explorer, or drag it into your browser.
    Alternatively, from your terminal:
    * **Windows:** `start index.html`
    * **macOS:** `open index.html`
    * **Linux:** `xdg-open index.html`

## Configuration

The web application needs to know the URL of the Orchestration Layer API. This is configured directly in `index.html`.

* **`index.html`:**
    ```javascript
    const ORCHESTRATION_API_URL = '[http://127.0.0.1:8003/orchestrate/weather-to-music](http://127.0.0.1:8003/orchestrate/weather-to-music)';
    ```
    If your Orchestration Layer is running on a different host or port, you will need to update this URL in the JavaScript code.

## Development

* **Styling:** Uses Tailwind CSS via CDN. For development, you can use a local Tailwind setup or continue with the CDN.
* **JavaScript:** All logic is contained within the `<script>` tag in `index.html`. For larger applications, this would typically be split into separate `.js` files.
