//Author: Carlos Nikiforuk
//Date: Feb 11, 2016

var canvas;
var active;
var cx, cy;
var tx=0;
var ty=0;
var sx=1;
var sy=1;

var planetScale = 4;	//4 times larger
var starScale = 110/4;	//4 times smaller (110 is for solar radius to earth radius conversion)
var distScale = 50;
var starIndex = [];
var planets;

var timeScale = 36000.0;
var fps = 30;


function loadContent(){

	console.log("Loading Content!");

	$("#timeSlider").slider({
		min: 500,
		max: 360000,
		value: timeScale,
		step: 500,
		change: function(event, ui){timeChange(event, ui);}
	});
	$("#time").val(timeScale)

	$("#sizeSlider").slider({
		min: 0.5,
		max: 25.0,
		value: planetScale,
		step: 0.5,
		change: function(event, ui){sizeChange(event, ui);}
	});
	$("#size").val(planetScale);

	$("#distSlider").slider({
		min: 10.0,
		max: 200.0,
		value: distScale,
		step: 5,
		change: function(event, ui){distChange(event, ui);}
	});
	$("#dist").val(distScale);

	ajax = new XMLHttpRequest();
	ajax.onload = handler;
	ajax.open("GET", "db.php");
	ajax.send();
}

function handler(){

	if(ajax.status==200) console.log(ajax.response);

	solar = JSON.parse(ajax.response)["stars"];
	console.log(solar[0]);

	nav = document.getElementById("solarNav");
	for(i=0;i<solar.length;i++){
		system = document.createElement("li");
		text = document.createElement("p");
		text.innerHTML = solar[i].name;
		text.setAttribute('onclick','changeActive(this)');
		text.id="st"+i;
		if(i==1){text.className = "active"; active=text;}
		system.appendChild(text);
		nav.appendChild(system);

		starIndex[String(solar[i].name)] = i; //index of star

	}

	start();

}

function start(){

	loadCanvas();
	animate();
	setInterval(animate, 1000/fps); //30 fps

}

function animate(){
	
	//clear and draw star
	drawCircle(context, cx,cy, solar[starIndex[active.innerHTML]]["radius"]*starScale+1, "rgb(0,0,0)");
	drawCircle(context, cx,cy, solar[starIndex[active.innerHTML]]["radius"]*starScale, "rgb(255,255,0)");


	//clear and draw planets
	for(it=0; it<planets.length;it++){
		drawCircle(context, cx+(planets[it][3]*distScale+solar[starIndex[active.innerHTML]]["radius"]*starScale)*Math.cos(planets[it][0])+tx, cy+(planets[it][3]*distScale+solar[starIndex[active.innerHTML]]["radius"]*starScale)*Math.sin(planets[it][0])+ty, planets[it][2]*planetScale+1, "rgb(0,0,0)");
		planets[it][0] += planets[it][1]*timeScale;
		drawCircle(context, cx+(planets[it][3]*distScale+solar[starIndex[active.innerHTML]]["radius"]*starScale)*Math.cos(planets[it][0]), cy+(planets[it][3]*distScale+solar[starIndex[active.innerHTML]]["radius"]*starScale)*Math.sin(planets[it][0]), planets[it][2]*planetScale, planets[it][4]);

	}

	

}

function changeActive(sol){
	active.className = "";
	sol.className = "active";
	active = sol;
	loadCanvas();
}

function loadCanvas(){

	canvas = document.getElementById("solarCanvas");
    canvas.addEventListener("wheel", function(event){ handleScroll(event);}, false);

	context = canvas.getContext("2d");
	console.log(solar[0]["radius"]);

	cx = canvas.getAttribute("width")/2;
	cy = canvas.getAttribute("height")/2;


	context.clearRect(0,0,800, 600);

	planets = [];
	count = solar[starIndex[active.innerHTML]]["planets"].length;
	for(i=0;i<count;i++){
		planet = solar[starIndex[active.innerHTML]]["planets"][i];
		period = planet.orbit * 24 * 360;
		inc = ((Math.PI*2)/period)/fps;		//REAL TIME
		
		r = g = b = 0;
		r = (255/count)*(i+1);
		if((i+1)>count/4) g = 255 - (255/count)*((i+1)-count/4);
		if((i+1)>(count/2)) b = (count/255)*((i+1));
		//console.log(r+" "+g+" "+b);

		//holds info for animating. add sun radius space to orbit distance
		planets[i] = [0, inc, planet.radius, planet.semimajor, "rgb("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+")"];
	}

}

function handleScroll(event){

	/*
	context.clearRect(0,0,800,600);
	sx=Math.pow(1.1, event.deltaY);
	sy=Math.pow(1.1, event.deltaY);
	context.translate(cx, cy);	
	context.scale(sx,sy);
	context.clearRect(0,0,800,600);	
	context.translate(-cx, -cy);
	event.preventDefault();
	*/
	//console.log(event);

}

function drawCircle(ctx, x, y, rad, color){

	ctx.beginPath();
	ctx.arc(x, y, rad, 0, 2*Math.PI);
	ctx.fillStyle = color;
	ctx.fill();

}

function timeChange(event, ui){
	timeScale = ui.value;
	$("#time").val(timeScale);	
}

function sizeChange(event, ui){
	planetScale = ui.value;
	$("#size").val(planetScale);
	context.clearRect(0,0,800, 600);
}
function distChange(event, ui){

	distScale = ui.value;
	$("#dist").val(distScale);
	context.clearRect(0,0,800, 600);

}


