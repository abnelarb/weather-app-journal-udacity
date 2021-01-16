/* Global Variables */

//my api credentials on the openweathermap website
//convert the temperature from the API from Kevin to Celesius &units=metric
const baseURL ='http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&units=metric&appid=fbeb4dbd126ba25da15bb0e6566ed111';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//function to look for the generate button element and listen to it's click to get the data
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    e.preventDefault();
    const userFeeling = document.getElementById('feelings').value;
    const newZip = document.getElementById('zip').value;
    getWeather(baseURL, newZip, apiKey) 
    //add the data to POST
    .then(function (data) {
        console.log(data);
        let currentTemp = data.list[0].main.temp;
        postData('/add', {
            date: d ,
            temp: currentTemp ,
            content: userFeeling,
        })
            UpdateUI();
    })
}
// function to get currentweather API data 
const getWeather = async (baseURL, newZip, apiKey) => {
const res = await fetch(baseURL + newZip + apiKey)
try {
    const newData = await res.json();
    return newData;
}catch(error) {
    console.log("error",error);
    }
}
//function to post the Data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        } ,
        body:JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        return newData;
    } catch(error) {
        console.log("error " ,error);
    }
};
//function to update the current UI of the index dynamically according to entered data
// the temperature is converted from kevin to cellesius and changed to tofixed(2) to make the result shorter
const UpdateUI = async () => {
    const request = await fetch('/all');
    try {
        const weatherData = await request.json();
        document.getElementById('date').innerHTML = `Date : ${weatherData.date}`;
        document.getElementById('content').innerHTML = `your Feeling : ${weatherData.content}`;
        document.getElementById('temp').innerHTML = `Your Area Zip :${document.getElementById('zip').value} current temperature is : ${weatherData.temp.toFixed(2)} °C`;
    //to catch current errors if there is errors
    }catch(error){
    console.log("error" , error);
    }
}
