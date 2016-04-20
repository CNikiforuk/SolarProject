<?php

	$user = 'root';
	$pass = '';


	$json = '{"stars":['."\n";
	try{
		$db = new PDO("mysql:host=localhost;dbname=project", $user, $pass);
	}
	catch(Exception $e){die($e->getMessage());}
	$stars = $db -> query("select name,radius from star;");

	//query to get planets for each star, create json string from it for use in javascript.
	foreach($stars as $star){
		$json = $json."\t".'{"name":"'.$star["name"].'", ';
		$json = $json.'"radius":"'.$star["radius"].'", ';
		$qstring = 'select ord,name,radius,orbit,semimajor from planet where star="'.$star["name"].'" order by ord';
		$planets = $db -> query('select ord,name,radius,orbit,semimajor from planet where star="'.$star["name"].'" order by ord');
		$json = $json.'"planets":[';		
		foreach($planets as $planet){
			$json = $json.'{"ord":"'.$planet["ord"].'", ';
			$json = $json.'"name":"'.$planet["name"].'", ';
			$json = $json.'"radius":"'.$planet["radius"].'", ';
			$json = $json.'"orbit":"'.$planet["orbit"].'", ';
			$json = $json.'"semimajor":"'.$planet["semimajor"].'"},';
		}
		$json = substr($json, 0, -2);
		$json = $json."}]},"."\n";
	}
	
	$json = substr($json, 0, -2)."\n"."]}";

	//Never do this again ^^^^^ it is nonsensical

	print($json);

/*
{"stars":[
	{"name":"sun'", 'radius":val, "planets":[{"ord":val, "name":"name'", 'radius":"radius'", 'orbit":"orbit'", 'semimajor":"semimajor"}]}
]}
*/

?>

