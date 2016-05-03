<?php
header('Content-Type: application/json; charset=UTF-8');

require_once('person.model.php');
require_once('award.model.php');
require_once('edge.model.php');
require_once('json.model.php');

// define vars to hold data array
$people = [];
$awards = [];
$edges = [];

// create path
$path = './data.json';

// load json data
$jsonString = file_get_contents($path);

// get data
$jsonData = json_decode($jsonString);

$counter = 0;

// fill data arrays
foreach($jsonData -> rows as $stdRowObject) {

	// get data from 
	$personName = $stdRowObject -> name;
	$personFirstname = $stdRowObject -> VORNAME;
	$personId = $stdRowObject -> person_id;
	$awardId = $stdRowObject -> award_id;
	$awardName = $stdRowObject -> INSTITUTION_NAMENSSUCHE;
	$year = $stdRowObject -> JAHR;
	
	// create person and add to array
	$person = Person::createPersonWithAttrs($personId, $personName, $personFirstname);
	$people[] = $person;

	// create award and add to array
	$award = Award::createAwardWithAttrs($awardId, $awardName);
	$awards[] = $award;
	 
	// create edge model and add to array, if not yet added
	$edge = Edge::createEdgeWithAttrs($personId, $awardId);
	$edges[] = $edge;

	if($counter > 100) {
		break;
	}

	$counter++;
}

// remove duplicates
$people = array_values(array_unique($people));
$awards = array_values(array_unique($awards));
$edges = array_values(array_unique($edges));

// create json object
$jsonModel = JsonModel::createJsonModelWithAttrs($people, $awards, $edges);

// create json return string
$jsonReturnString = json_encode($jsonModel);

echo $jsonReturnString;

// api function section
function loadJsonData() {
	// create path
	$path = './data.json';

	// load json data
	$jsonString = file_get_contents($path);

	return json_decode($jsonString);
}


