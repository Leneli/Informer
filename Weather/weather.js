'use strict';

var xhr = new XMLHttpRequest(),
	info = document.getElementById('info');

xhr.open('GET', 'gismeteo.xml', true); //false - запрос производится синхронно (лучше не использовать), true – асинхронно
xhr.send();

xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		Weather(xhr);
	}
};

function Weather(xml) {
	var xmlDoc = xml.responseXML,
		town = xmlDoc.getElementById('town'),
		forecast = town.children,
		name = town.attributes[2].nodeValue,
		ul = '<h3>' + name + '</h3><ul>',
		dates,
		temperature,
		wind;

	for (var i = 0; i < forecast.length; i++) {

		dates = forecast[i].attributes[0].nodeValue + '-' + forecast[i].attributes[1].nodeValue + '-' + forecast[i].attributes[2].nodeValue + ':' + forecast[i].attributes[3].nodeValue;
		ul += '<li><b>' + dates + '</b><br>';

		temperature = forecast[i].children[2];
		ul += 'Temperature: max ' + temperature.attributes[0].nodeValue + ', min ' + temperature.attributes[1].nodeValue + '<br>';

		wind = forecast[i].children[3];
		ul += 'Wind: ' + wind.attributes[0].nodeValue + ' - ' + wind.attributes[1].nodeValue + '</li>';
	}

	info.innerHTML = ul + '</ul>';
};