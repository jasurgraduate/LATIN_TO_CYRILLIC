

document.addEventListener("DOMContentLoaded", function() {
    // Load saved text from localStorage on page load
    const savedLatinText = localStorage.getItem("latin_text");
    const savedCyrillicText = localStorage.getItem("cyrillic_text");

    if (savedLatinText) {
        document.getElementById("latin_textarea").value = savedLatinText;
        onLatinTextChange(savedLatinText); // Trigger conversion
    }

    if (savedCyrillicText) {
        document.getElementById("cyrillic_textarea").value = savedCyrillicText;
    }

    // Automatically save text on input
    document.getElementById("latin_textarea").addEventListener("input", function() {
        const latinText = document.getElementById("latin_textarea").value;
        const cyrillicText = document.getElementById("cyrillic_textarea").value;

        localStorage.setItem("latin_text", latinText);
        localStorage.setItem("cyrillic_text", cyrillicText);
    });
});
