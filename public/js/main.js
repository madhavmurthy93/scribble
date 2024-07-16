document.addEventListener('DOMContentLoaded', function() {
    makeDatesReadable();
    const scribbleCreate = document.querySelector("#scribble-create");
    if (scribbleCreate) {
        scribbleCreate.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const res = await fetch("/api/scribble", {
                method: "POST",
                body: formData
            });

            if (res.status === 201) {
                const data = await res.json();
                window.location.href = data.redirectUrl;
            } else {
                console.error('Failed to create resource');
            }
        });
    }

    const scribbleEdit = document.querySelector("#scribble-edit");
    if (scribbleEdit) {
        scribbleEdit.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const pathname = new URL(window.location.href).pathname;
            const uriPath = pathname.substring(0, pathname.lastIndexOf("/"));
            if (event.submitter.id === "update") {
                const res = await fetch("/api" + uriPath, {
                    method: "PUT",
                    body: formData
                });

                if (res.status === 200) {
                    const data = await res.json();
                    window.location.href = data.redirectUrl;
                } else {
                    console.error('Failed to update resource');
                }
            } else {
                const formObject = Object.fromEntries(formData.entries());
                const res = await fetch("/api" + uriPath, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json', 'X-Additional-Info': JSON.stringify(formObject) }
                });

                if (res.status === 200) {
                    const data = await res.json();
                    window.location.href = data.redirectUrl;
                } else {
                    console.error('Failed to delete resource');
                }
            }
        });
    }
});

function makeDatesReadable() {
    const originals = document.querySelectorAll(".datetime");
    for (let original of originals) {
        const date = new Date(original.textContent);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };

          const readableDate = date.toLocaleDateString("en-US", options);
          original.textContent = readableDate;
    }
}