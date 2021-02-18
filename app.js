let input = document.querySelector(".input");
let btn = document.querySelector(".btn");

input.addEventListener("keyup",e=>{
    if (e.key === 'Enter' || e.keyCode === 13) {
        if(document.querySelector(".response").hasChildNodes) removeCity();
        getCity(document.querySelector(".input").value);
    }
});

btn.addEventListener("click",()=>{
    if(document.querySelector(".response").hasChildNodes) removeCity();
    getCity(document.querySelector(".input").value);
})



const getCity = city =>{
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f0fa3c30c3cef7caeadc7494cc239b9d`)
    .then(res=>res.json())
    .then(data=>{
        /* console.log(data); */
        if(data.cod == "404"){
            let h1 = document.createElement("H1");
            h1.textContent = data.message;
            h1.classList.add("errorH1");
            document.querySelector(".response").appendChild(h1);
            return;
        }
        let temp = document.createElement("P");
        temp.textContent = data.main.temp+"°";
        let nameCity = document.createElement("P");
        nameCity.textContent = data.name +","+ data.sys.country;
        let desc = document.createElement("P");
        desc.textContent = data.weather[0].description;
        let img = document.createElement("IMG");
        img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector(".response").appendChild(img);
        document.querySelector(".response").appendChild(desc);
        document.querySelector(".response").appendChild(temp);
        document.querySelector(".response").appendChild(nameCity);
    });
    document.querySelector(".input").value = "";
}

const removeCity = () =>{
    let parent = document.querySelector(".response");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}