<?php
	
class Person
{
	public $id;
	public $name;

	public static function createPersonWithAttrs($_id, $_name, $_firstname) {
		
		$person = new Person();
		$person -> id = $_id;
		$person -> name = $_name." ".$_firstname;

		return $person;
	}

	// needed for array_unique
	public function __toString() {
        return $this -> id.$this -> name;
    }
}

?>