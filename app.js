window.addEventListener("load",()=>{
    let longitude;
    let latitude;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            const apikey = "50a7aa80fa492fa92e874d23ad061374";
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;

            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                console.log(data);
                document.querySelector(".location").textContent = data['timezone'];
                document.querySelector(".temp").textContent = `${data['current']['temp']}° C`;
                url =  `http://openweathermap.org/img/wn/${data['current']['weather'][0]['icon']}@2x.png`;
                document.querySelector(".icon").setAttribute("src",url) ;
                document.querySelector(".description").textContent = data['current']['weather'][0]['description'];
                
                const isoString = new Date().toISOString();
                const options = { month: "long", day: "numeric", year: "numeric" };
                const date = new Date(isoString);
                const americanDate = new Intl.DateTimeFormat("en-US", options).format(date);
                const time = document.createElement("time");
                time.setAttribute("datetime", isoString);
                document.querySelector(".time").textContent = americanDate;
            });
        });
      
    }
});


 