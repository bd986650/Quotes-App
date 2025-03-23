document.addEventListener("DOMContentLoaded", () => {
    const changeModeBtn = document.querySelector(".change-mode i");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        changeModeBtn.classList.replace("fa-quote-right", "fa-quote-left")
    }

    changeModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            changeModeBtn.classList.replace("fa-quote-right", "fa-quote-left")
        } else {
            localStorage.setItem("theme", "light");
            changeModeBtn.classList.replace("fa-quote-left", "fa-quote-right")

        }
    });
});

const quoteText = document.querySelector(".quote-box .quote-text");
const quoteAuthor = document.querySelector(".quote-box .quote-author");
const generateQuoteBtn = document.querySelector(".generate-new-quote");

generateQuoteBtn.addEventListener("click", () => {
    quoteText.classList.add("hide");
    quoteAuthor.classList.add("hide");

    setTimeout(() => {

        fetch('https://api.api-ninjas.com/v1/quotes', {
            method: 'GET',
            headers: {
                'X-Api-Key': 'YOUR_API_KEY'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                quoteText.textContent = json[0].quote;
                quoteAuthor.textContent = json[0].author;

                quoteText.classList.remove("hide");
                quoteAuthor.classList.remove("hide");
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
            });
    });
});


