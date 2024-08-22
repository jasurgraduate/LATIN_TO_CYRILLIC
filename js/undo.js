let undoStack = [];
let redoStack = [];

// Initialize stacks from localStorage
function initializeStacks() {
    const savedUndoStack = localStorage.getItem("undoStack");
    const savedRedoStack = localStorage.getItem("redoStack");
    const savedLatinText = localStorage.getItem("latin_text");

    if (savedUndoStack) {
        undoStack = JSON.parse(savedUndoStack);
    }
    if (savedRedoStack) {
        redoStack = JSON.parse(savedRedoStack);
    }

    // Update textarea with saved Latin text if available
    if (savedLatinText) {
        document.getElementById('latin_textarea').value = savedLatinText;
        onLatinTextChange(savedLatinText);
    }
}

document.addEventListener('DOMContentLoaded', initializeStacks);

// Handle text input and update stacks
document.getElementById('latin_textarea').addEventListener('input', function (event) {
    undoStack.push(event.target.value);
    redoStack = []; // Clear redo stack whenever there's new input
    saveStacksToLocalStorage();
});

// Handle clear button click
document.getElementById('clearButton').addEventListener('click', function () {
    const textarea = document.getElementById('latin_textarea');
    const cyrillicTextarea = document.getElementById('cyrillic_textarea');
    
    if (textarea.value !== "") {
        undoStack.push(textarea.value); // Save current state before clearing
        redoStack = []; // Clear redo stack when clearing
        textarea.value = ""; // Clear the Latin text area
        cyrillicTextarea.value = ""; // Clear the Cyrillic text area
        localStorage.removeItem("latin_text");
        localStorage.removeItem("cyrillic_text");
        saveStacksToLocalStorage();
    }
    onLatinTextChange(""); // Ensure conversion is cleared
    updateButtonText('clearButton', '🚮 Cleared!', '🗑️ Clear!');
});

// Undo functionality
document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('redoButton').addEventListener('click', redo);

// Keyboard shortcuts for undo, redo, copy, clear
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
    } else if (event.ctrlKey && event.key === 'x') { // Use Ctrl+X for redo
        event.preventDefault();
        redo();
    } else if (event.ctrlKey && event.shiftKey && event.key === 'z') {
        event.preventDefault();
        redo();
    } else if (event.ctrlKey && event.key === 'c') { // Use Ctrl+C to trigger copy button click
        event.preventDefault();
        document.getElementById('copyButton').click();
    } else if (event.ctrlKey && event.key === 'q') { // Use Ctrl+Q to trigger clear button click and focus Latin text area
        event.preventDefault();
        document.getElementById('clearButton').click();
        document.getElementById('latin_textarea').focus(); // Focus the Latin text area
    }
});

function undo() {
    if (undoStack.length > 0) {
        const currentValue = undoStack.pop();
        redoStack.push(currentValue);
        const previousValue = undoStack[undoStack.length - 1] || "";
        document.getElementById('latin_textarea').value = previousValue;
        onLatinTextChange(previousValue);
        saveStacksToLocalStorage();
    }
}

function redo() {
    if (redoStack.length > 0) {
        const redoValue = redoStack.pop();
        undoStack.push(redoValue);
        document.getElementById('latin_textarea').value = redoValue;
        onLatinTextChange(redoValue);
        saveStacksToLocalStorage();
    }
}

// Function to handle text change
function onLatinTextChange(txt) {
    const cyrillicTextareaElem = document.getElementById("cyrillic_textarea");
    const div = document.createElement("div");
    const cyrillicHtmlEntities = getCyrillicText(txt);
    div.innerHTML = cyrillicHtmlEntities;
    cyrillicTextareaElem.value = div.innerText;
    saveToLocalStorage(txt, div.innerText);
}

// Save the current state to localStorage
function saveToLocalStorage(latinText, cyrillicText) {
    localStorage.setItem("latin_text", latinText);
    localStorage.setItem("cyrillic_text", cyrillicText);
}

// Save stacks to localStorage
function saveStacksToLocalStorage() {
    localStorage.setItem("undoStack", JSON.stringify(undoStack));
    localStorage.setItem("redoStack", JSON.stringify(redoStack));
}

// Function to clear both Latin and Cyrillic text
async function clearText() {
    document.getElementById("latin_textarea").value = "";
    document.getElementById("cyrillic_textarea").value = "";
    localStorage.removeItem("latin_text");
    localStorage.removeItem("cyrillic_text");
    saveStacksToLocalStorage();
    updateButtonText('clearButton', '🚮 Cleared!', '🗑️ Clear!');
}

// Update button text temporarily
async function updateButtonText(buttonId, newText, originalText) {
    const button = document.getElementById(buttonId);
    button.innerText = newText;
    await delay(2000);
    button.innerText = originalText;
}

// Utility to copy Cyrillic text
function copyCyrillicText() {
    const input = document.getElementById("cyrillic_textarea");
    input.select();
    document.execCommand("copy");
    updateButtonText('copyButton', '☑ Copied!', '✄ Copy!');
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
