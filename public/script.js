// Append value to the display
function appendValue(value) {
    const result = document.getElementById("result");
    result.value += value;
}

// Clear the display
function clearResult() {
    document.getElementById("result").value = "";
}

// Perform calculation and save history
function calculate() {
    const result = document.getElementById("result");
    try {
        const calculation = `${result.value} = ${eval(result.value)}`;
        result.value = eval(result.value);
        saveHistory(calculation);
    } catch (e) {
        result.value = "Error";
    }
}

// Save calculation history to the server
function saveHistory(calculation) {
    fetch("/save-history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ calculation }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.success) {
                console.error("Failed to save history");
            }
        })
        .catch((err) => console.error("Error:", err));
}

// Fetch and display calculation history
/*
function getHistory() {
    fetch("/get-history")
        .then((response) => response.json())
        .then((history) => {
            const historyDiv = document.getElementById("history");
            if (history.length === 0) {
                historyDiv.innerHTML = "<p>No history available.</p>";
                return;
            }

            historyDiv.innerHTML = "<h3>Calculation History:</h3>";
            history.forEach((entry) => {
                const p = document.createElement("p");
                p.textContent = `${entry.calculation} (at ${new Date(
                    entry.timestamp
                ).toLocaleString()})`;
                historyDiv.appendChild(p);
            });
        })
        .catch((err) => console.error("Error fetching history:", err));
}
*/


/*
function getHistory() {
    fetch("/get-history")
        .then((response) => response.json())
        .then((history) => {
            const historyDiv = document.getElementById("history");
            historyDiv.innerHTML = ""; // Clear old history

            if (history.length === 0) {
                historyDiv.innerHTML = "<p>No history available.</p>";
                return;
            }

            const header = document.createElement("h3");
            header.textContent = "Calculation History";
            historyDiv.appendChild(header);

            history.forEach((entry) => {
                const item = document.createElement("div");
                item.className = "history-item";

                const calculation = document.createElement("div");
                calculation.className = "calculation";
                calculation.textContent = entry.calculation;

                const timestamp = document.createElement("div");
                timestamp.className = "timestamp";
                timestamp.textContent = new Date(entry.timestamp).toLocaleString();

                item.appendChild(calculation);
                item.appendChild(timestamp);

                historyDiv.appendChild(item);
            });
        })
        .catch((err) => console.error("Error fetching history:", err));
}

*/

function getHistory() {
    const historyDiv = document.getElementById("history");
    const isVisible = historyDiv.classList.contains("show");

    // If history is already visible, hide it
    if (isVisible) {
        historyDiv.classList.remove("show");
        return;
    }

    // Otherwise, fetch and show the history
    fetch("/get-history")
        .then((response) => response.json())
        .then((history) => {
            historyDiv.innerHTML = ""; // Clear old history

            if (history.length === 0) {
                historyDiv.innerHTML = "<p>No history available.</p>";
            } else {
                const header = document.createElement("h3");
                header.textContent = "Calculation History";
                historyDiv.appendChild(header);

                history.forEach((entry) => {
                    const item = document.createElement("div");
                    item.className = "history-item";

                    const calculation = document.createElement("div");
                    calculation.className = "calculation";
                    calculation.textContent = entry.calculation;

                    const timestamp = document.createElement("div");
                    timestamp.className = "timestamp";
                    timestamp.textContent = new Date(entry.timestamp).toLocaleString();

                    item.appendChild(calculation);
                    item.appendChild(timestamp);
                    historyDiv.appendChild(item);
                });
            }

            // Show the history section
            historyDiv.classList.add("show");
        })
        .catch((err) => console.error("Error fetching history:", err));
}
