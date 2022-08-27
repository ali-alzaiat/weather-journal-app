// const { response } = require("express");

/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=f21440277e4920afc4bd9fb952639bf1&units=imperial';

const generate = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth()+1;
let newDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get the data from the API.
const getData = async (url,zip,apiKey) => {
    const response = await fetch(url+zip+apiKey);
    try{
        let data = await response.json();
        return data;
    }
    catch(e){
        console.log("error",e);
    }
};
// Post the data and the user input to the local server.
const postData = async (url, data) => {
    const response = await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try{
        const weatherData = await response.json();
        return weatherData;
    }
    catch(e){
        console.log("error",e);
    }
};
//Update the UI
const retrieveData = async () => {
    const request = await fetch("/all");
    try{
        const data = await request.json();
        document.getElementById("temp").innerHTML = "tempreture: "+Math.round(data.temp)+" degrees";
        document.getElementById("date").innerHTML = "date: "+data.date;
        document.getElementById("content").innerHTML = "feelings: "+data.content;
    }
    catch(e){
        console.log("error",e);
    }
};
// When the button is clicked get the data foem the API then Post it and the user input to the server the retrieve the data from the server and display it on the UI.
function clicked() {
    const zip = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    if(!feel || !zip){
        alert("enter the zip code and youe feelings");
    }
    else{
        getData(url,zip,apiKey)
        .then((data) => {
            postData('/weather',{temp: data.main.temp,
                date: newDate,
                content: feel
            }).then(retrieveData());
        })    
    }
}
//Events
generate.addEventListener('click',clicked);
