const tempfield = document.querySelector(".temp");
const locationField = document.querySelector(".location p");
const timeField = document.querySelector(".location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');
const image = document.getElementById("icon");

form.addEventListener('submit', searchLocation);


let target = 'Hosur';
const fetchResults = async (targetlocation) =>{
    let url = `https://api.weatherapi.com/v1/current.json?key=d663c59129ac4af6b13122143241310&q=${targetlocation}&aqi=no`;

    const res = await fetch(url);

    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let temp = data.current.temp_c;
    let Time = data.location.localtime;
    let cond = data.current.condition.text;
    let imageURL = data.current.condition.icon;
    


    updateDetails(temp,locationName,Time,cond,imageURL);
    

}
function updateDetails(temp,loc,time,condition,imgurl){

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = DayName(new Date(splitDate).getDay());

    tempfield.innerText = temp;
    locationField.innerText = loc;
    timeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
    image.src = imgurl;


}

function searchLocation(e){
    e.preventDefault();

    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);

function DayName(number){
    switch(number){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}
