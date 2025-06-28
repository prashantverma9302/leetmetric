document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-btn");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardStatsContainer=document.querySelector(".stats-cards");

    function validateUsername(username){
        if(username.trim()===""){
            alert("username should not be empty");
            return false;
        }
        const regex = /^[A-Za-z0-9_-]{1,15}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;
// true

    }
    async function fetchUserDetails(username){
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true; 
            const response=await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the details");
            }
            const data=await response.json();
            console.log("Logging data: ",data);
        }
        catch(error){

        }
        finally{

        }
    }
    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("logging username:",username);
        if (validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})