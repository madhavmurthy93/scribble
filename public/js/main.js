document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#scribble-create").addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        const res = await fetch("/api/scribble", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject) // Send any necessary data here
        });

        if (res.status === 201) {
            const data = await res.json();
            window.location.href = data.redirectUrl;
            } else {
            console.error('Failed to create resource');
        }
    })

});