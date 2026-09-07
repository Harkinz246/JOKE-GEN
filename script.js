const API_URL =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous?type=twopart&safe-mode";

const newJokeBtn = document.getElementById("newJokeBtn");
const copyBtn = document.getElementById("copyBtn");

const loading = document.getElementById("loading");
const jokeContent = document.getElementById("jokeContent");
const error = document.getElementById("error");

const setup = document.getElementById("setup");
const delivery = document.getElementById("delivery");

const requestCount = document.getElementById("requestCount");
const category = document.getElementById("category");
const type = document.getElementById("type");

let requests = 0;
let currentJoke = "";


// ===============================
// GET JOKE FROM API
// ===============================

async function getJoke() {

    // Show loading
    loading.classList.remove("hidden");
    jokeContent.classList.add("hidden");
    error.classList.add("hidden");

    newJokeBtn.disabled = true;
    newJokeBtn.classList.add("opacity-60", "cursor-not-allowed");

    try {

        // API request
        const response = await fetch(API_URL);

        // Check HTTP status
        if (!response.ok) {
            throw new Error("API request failed");
        }

        // Convert response to JSON
        const data = await response.json();

        console.log(data);


        // Make sure API returned a joke
        if (data.error) {
            throw new Error(data.message);
        }

        currentJoke = `${data.setup}\n\n${data.delivery}`;


        // Display joke
        setup.textContent = data.setup;
        delivery.textContent = data.delivery;


        // API information
        category.textContent = data.category;
        type.textContent = data.type;


        // Increase request counter
        requests++;

        requestCount.textContent = requests;


        // Show joke
        loading.classList.add("hidden");
        jokeContent.classList.remove("hidden");

    }

    catch (err) {

        console.error(err);

        loading.classList.add("hidden");
        jokeContent.classList.add("hidden");
        error.classList.remove("hidden");

    }

    finally {

        newJokeBtn.disabled = false;

        newJokeBtn.classList.remove(
            "opacity-60",
            "cursor-not-allowed"
        );
    }
}


// ===============================
// COPY JOKE
// ===============================

async function copyJoke() {

    if (!currentJoke) {
        return;
    }

    try {

        await navigator.clipboard.writeText(currentJoke);

        const originalText = copyBtn.innerHTML;

        copyBtn.innerHTML = "✅ Copied!";

        setTimeout(() => {

            copyBtn.innerHTML = originalText;

        }, 1500);

    }

    catch (err) {

        console.error("Copy failed:", err);

    }
}


// ===============================
// EVENTS
// ===============================

newJokeBtn.addEventListener("click", getJoke);

copyBtn.addEventListener("click", copyJoke);


// ===============================
// LOAD FIRST JOKE
// ===============================

getJoke();
console.log(navigator)