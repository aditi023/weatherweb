const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const dateSection= document.querySelector('.datesection');

search.addEventListener('click',() =>{
	const APIKey = 'bf1edd7f80b38215ba88cbad4d06901c';
	const city = document.getElementById('search-btn').value;
	if(city==''){
		return ;
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
	
	if(json.cod == '404'){
		container.style.height = '450px';
		weatherBox.classList.remove('active');
		weatherDetails.classList.remove('active');
		error404.classList.add('active');
		return;
	}

	container.style.height = '560px';
	weatherBox.classList.add('active');
	weatherDetails.classList.add('active');
	error404.classList.remove('active');

	const image = document.querySelector('.weather-box img');
	const temperature = document.querySelector('.weather-box .temperature');
	const description = document.querySelector('.weather-box .description');
	const humidity = document.querySelector('.weather-details .humidity span');
	const wind = document.querySelector('.weather-details .wind span');
    const currentDate= new Date();
    dateSection.textContent=currentDate.toDateString();

		switch(json.weather[0].main){
			case 'Clear':
				image.src = 'images/Sunny-icon.png';
				break;
			case 'Rain':
				image.src = 'images/rain-icon-512.png';
				break;
			case 'Snow':
				image.src = 'images/snow-icon-512.png';
				break;
			case 'Clouds':
				image.src = 'images/partly-cloudy-day-icon-512.png';
				break;
			case'Night clouds':
				image.src ='images/cloudy-night-icon-512.png'	 
				break;
			case 'Mist':
				image.src = 'images/mist.png';
				break;				 
			case 'Haze':
				image.src = 'images/mist.png';
				break;	 
			default:
				image.src = 'images/Sunny-icon.png';
		}
		temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
		description.innerHTML = `${json.weather[0].description}`;
		humidity.innerHTML = `${json.main.humidity}%`;
		wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
	});
});
