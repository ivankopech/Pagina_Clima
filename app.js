var buscar = document.querySelector('.lupa');
var grados = document.querySelector('.grados');
var tempMaxima = document.querySelector('.temp-maxima');
var tempMinima = document.querySelector('.temp-minima');
var texto = document.querySelector('.busqueda');
var clima = document.querySelector('.descripcion');
var fecha = document.querySelector('.dia');
var viento = document.querySelector('.viento');
var amanecer = document.querySelector('.amanecer');
var atardecer = document.querySelector('.anochecer');
var presion = document.querySelector('.presion');
var humedad = document.querySelector('.humedad');
var visibilidad = document.querySelector('.visibilidad');

buscar.addEventListener('click', climaHoy);

function climaHoy(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ texto.value + '&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var gradosValor = data.list[0].main.temp;
        var climaValor = data.list[0].weather[0].description;
        var vientoValor = data.list[0].wind.speed;


        var amanecerValor = data.city.sunrise;
        var atardecerValor = data.city.sunset;
        var amanecerFecha = new Date(amanecerValor * 1000);
        var amanecerHora = amanecerFecha.getHours();
        var amanecerMinutos = amanecerFecha.getMinutes();
        var atardecerFecha = new Date(atardecerValor * 1000);
        var atardecerHora = atardecerFecha.getHours();
        var atardecerMinutos = atardecerFecha.getMinutes();

        var humedadValor = data.list[0].main.humidity;
        var visibilidadValor = data.list[0].visibility;
        var tempMaximaValor = data.list[0].main.temp_max;
        var tempMinimaValor = data.list[0].main.temp_min;
        var presionValor = data.list[0].main.pressure;
        
        var fechaValor = data.list[0].dt;
        var date = new Date(fechaValor * 1000);
        var dia = date.getDate().toString();
        var mes = date.getMonth()+1;
        var año = date.getFullYear();
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;

        grados.innerHTML = gradosValor + '°C';
        clima.innerHTML = climaValor;
        viento.innerHTML = vientoValor + ' km/h';
        amanecer.innerHTML = amanecerHora +':'+ amanecerMinutos +' AM';
        atardecer.innerHTML = atardecerHora +':'+ atardecerMinutos +' PM';
        humedad.innerHTML = humedadValor + '%';
        presion.innerHTML = presionValor + 'Pa';
        tempMaxima.innerHTML = tempMaximaValor + 'C°';
        tempMinima.innerHTML = tempMinimaValor + 'C°';
        visibilidad.innerHTML = visibilidadValor + ' m';
        fecha.innerHTML = dia +'-'+ mes +'-'+ año;
        climaFuturo(lat, lon);
    })

.catch(error => alert("No existe la ciudad o no se encuentra registrado en la API"));
}

function climaFuturo(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.daily.forEach(function(dayInfo, index) {
            let gradoHoy = document.querySelector('#grados' + index);
            let grado = (dayInfo.temp.day).toString(); 
            gradoHoy.innerHTML = grado + '°C';
        })
    })
}
