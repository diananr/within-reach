var cargaPag = function() {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(exito, problema);
	}

	$.get("http://ip-api.com/json/", function (response) {
 	country = response.country;
	}, "jsonp");

	$( "#botonuno" ).click(function() {
		$("#principal").addClass("ocultar");
 		buscarOfertas($("#ciudad").val(),$("#trabajo").val(),country,0,limit);
	});
}

$(document).ready(cargaPag);

var exito = function(pos){
	var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    var latlon = new google.maps.LatLng(lat, lon);
    var mapa = document.getElementById('mapa');
    mapa.style.height = '100vh';
    mapa.style.width = '100vw';

    var myOptions = {
	    center:latlon,
	    zoom:14,
	    mapTypeId:google.maps.MapTypeId.ROADMAP,
	    mapTypeControl:false,
	    navigationControlOptions:{
	    	style: google.maps.NavigationControlStyle.SMALL
	   	}
    };
    
    var map = new google.maps.Map(document.getElementById('mapa'), myOptions);

    var marker = new google.maps.Marker({
    	position:latlon,
    	map:map,
    	title:"You are here!"
    });
}
var problema = function(error){
	console.log(error);
}

var location, country, limit = 10;

function buscarOfertas(location, data, country, start, end) {
	var buscarData = data;
		$.ajax({
			cache: false,
			data: $.extend({
			publisher:5807287673008948,
			v: '2',
			format: 'json',
			q: data,
			l: location,
			radius: 50,
			limit: limit,
			sort: 'date',
			highlight: 1,
			filter: 1,
			latlong: 1,
			co: country.toLowerCase(),
			userip: '',
			useragent: ''
			}, {
			start: start,
			end: end
			}),
			dataType: 'jsonp',
			type: 'GET',
			timeout: 5000,
			url: 'http://api.indeed.com/ads/apisearch'
		})
 		.done(function(data) {
		  var result = "",
		  pagination = "",
		  i = 2,
		  style, url, paginationLimit = Math.ceil((data.totalResults) / limit);
 
		  $.each(data.results, function(i, item) {
		  style = ((i % 2) == 0) ? "articaljoblistinggray" : "articaljoblistingwhite"
		  result = result + '<a target="_blank" href="' + item.url + '"><li class="articaljoblisting ' + style + '" style="margin-bottom:3px;">' + item.jobtitle + '<br /><span style="color:black;">' + item.source + ' - ' + item.formattedLocation + '</span></li></a>';
		  i++;
		  // Get current location indeed url
		  url = item.url;
		  });
		 
		 for (i = 1; i <= paginationLimit; i++) {
		  pagination = pagination + '<li>' + i + '</li>';
		 }
		 
		 $('#resultado').html('<ul style="list-style: none;margin: 0;padding:0;">' + result + '</ul>  ;<a style="float: right;" target="_blank" href="http://' + extractDomain(url) + '/jobs?q=' +  buscarData + '&l=' + location + '">Find more jobs</a>');
		 $('#paginacion').html('<ul class="pagination" style="list-style: none;margin: 0;padding:0;">' + pagination + '</ul>');
		 });
};
function extractDomain(url) {
 var domain;
 //find & remove protocol (http, ftp, etc.) and get domain
 if (url.indexOf("://") > -1) {
  domain = url.split('/')[2];
 }
 else {
  domain = url.split('/')[0];
 }
 //find & remove port number
 domain = domain.split(':')[0];
 return domain;
};

// var ofertas = function(){
// 	var rutaApi = "<http://api.indeed.com/ads/apisearch?publisher=5807287673008948&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co = nosotros y CHNL = & userip = 1.2.3.4 y useragent = Mozilla / 2F4.0%%% 29 28Firefox & v = 2";

// }
// var generarCiudad = function(){
// 	var ciudad = $("#ciudad").val();
// 	var geocoder = new google.maps.Geocoder();
// 	geocoder.geocode({ "address": ciudad} , ciuResultado);

// 	$("#principal").addClass("ocultar");
// }
// var ciuResultado = function(resultado, estado){
// 	if (estado){
// 		var opMap = {
// 			center: resultado[0].geometry.location,
// 			mapTypeId: google.maps.MapTypeId.ROADMAP,
// 		};

// 		var mapa = new google.maps.Map(document.getElementById("mapa"), opMap);
// 		mapa.fitBounds(resultado[0].geometry.viewport);

// 		var markerOptions = { position: resultado[0].geometry.location }
//         var marker = new google.maps.Marker(markerOptions);
//         marker.setMap(mapa);
// 	}
// }