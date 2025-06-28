document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[A-Za-z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the details");
            }

            const parsedData = await response.json();
            console.log("Logging data: ", parsedData);
            displayUserData(parsedData); // ✅ call after fetching
        } catch (error) {
            console.error("Fetch error:", error);
            alert("User not found or error fetching data");
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }



    function displayUserData(parsedData) {
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;

        const totalEasySolved = parsedData.easySolved;
        const totalMediumSolved = parsedData.mediumSolved;
        const totalHardSolved = parsedData.hardSolved;

        updateProgress(totalEasySolved, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(totalMediumSolved, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(totalHardSolved, totalHardQues, hardLabel, hardProgressCircle);
    }
        function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progressDegree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});

