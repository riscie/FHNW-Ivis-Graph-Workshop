<?php
	
class JsonModel
{
	public $people;
	public $awards;
	public $edges;

	public static function createJsonModelWithAttrs($_people, $_awards, $_edges) {
		
		$jsonModel = new JsonModel();
		$jsonModel -> people = $_people;
		$jsonModel -> awards = $_awards;
		$jsonModel -> edges = $_edges;

		return $jsonModel;
	}
}

?>