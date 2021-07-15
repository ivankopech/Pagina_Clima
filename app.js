var buscar = document.querySelector('#Buscar');
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
var nombre = document.querySelector('.ciudad-imagen');
var lluvia = document.querySelector('.lluvia');

buscar.addEventListener('click', climaHoy);

function climaSemanal(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon + '&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.daily.forEach(function(informacion, indice) {
            var hoyTemperatura = document.getElementById('degree'+ indice);
            var temperatura = (informacion.temp.day).toString(); 
            hoyTemperatura.innerHTML = temperatura + '°C';
            
        })
    })
}

function climaHoy(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ texto.value + '&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var gradosValor = data.list[0].main.temp;
        var climaValor = data.list[0].weather[0].description;
        var lluviaValor = data.list[0].clouds.all;
        var ciudadValor = data.city.name;
        
        var tempMaximaValor = data.list[0].main.temp_max;
        var tempMinimaValor = data.list[0].main.temp_min;
        var amanecerValor = data.city.sunrise;
        var atardecerValor = data.city.sunset;
        var presionValor = data.list[0].main.pressure;
        var visibilidadValor = data.list[0].visibility;
        var humedadValor = data.list[0].main.humidity;
        var vientoValor = data.list[0].wind.speed;

        
        
        var amanecerFecha = new Date(amanecerValor * 1000);
        var atardecerFecha = new Date(atardecerValor * 1000);
        var atardecerHora = atardecerFecha.getHours();
        var atardecerMinutos = atardecerFecha.getMinutes();
        var amanecerHora = amanecerFecha.getHours();
        var amanecerMinutos = amanecerFecha.getMinutes();

        
        var fechaValor = data.list[0].dt;
        var date = new Date(fechaValor * 1000);
        var dia = date.getDate().toString();
        var mes = date.getMonth()+1;
        var año = date.getFullYear();
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;

        nombre.innerHTML = ciudadValor;
        fecha.innerHTML = dia + '/' + mes + '/' + año;
        lluvia.innerHTML = lluviaValor + '%';
        grados.innerHTML = gradosValor + '°C';
        clima.innerHTML = climaValor;
        
        
        tempMaxima.innerHTML = tempMaximaValor + 'C°';
        tempMinima.innerHTML = tempMinimaValor + 'C°';
        amanecer.innerHTML = amanecerHora +':'+ amanecerMinutos +' AM';
        atardecer.innerHTML = atardecerHora +':'+ atardecerMinutos +' PM';
        presion.innerHTML = presionValor + 'Pa';
        visibilidad.innerHTML = visibilidadValor + ' m';
        humedad.innerHTML = humedadValor + '%';
        viento.innerHTML = vientoValor + ' km/h';


        climaSemanal(lat, lon);
        
    })

.catch(error => alert("Se produjo un error al buscar esa ciudad"));
}


 
