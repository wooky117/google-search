const suggestionsContainer = document.getElementById("suggestions");

function handleInput() {
    const query = document.getElementById("search-box").value;
    if (query.length > 2) { // Trigger autocomplete when input is longer than 2 characters
        fetchSuggestions(query);
    } else {
        clearSuggestions();
    }
}

function fetchSuggestions(query) {
    const url = `http://localhost:3000/autocomplete?q=${encodeURIComponent(query)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data[1]);
        })
        .catch(err => {
            console.error("Error fetching suggestions:", err);
        });
}

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = ""; // Clear old suggestions
    suggestions.forEach(suggestion => { // Directly iterate over the suggestions array
        const div = document.createElement("div");
        div.textContent = suggestion; // Use the suggestion directly
        div.onclick = () => selectSuggestion(suggestion);
        suggestionsContainer.appendChild(div);
    });
}

function selectSuggestion(suggestion) {
    document.getElementById("search-box").value = suggestion;
    clearSuggestions();
}

function clearSuggestions() {
    suggestionsContainer.innerHTML = "";
}

function performSearch() {
    const query = document.getElementById("search-box").value;
    if (query) {
        // Redirect to Google Search
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
}
