<?php
	
class Award
{
	public $id;
	public $name;

	public static function createAwardWithAttrs($_id, $_name) {
		
		$award = new Award();
		$award -> id = $_id;
		$award -> name = $_name;

		return $award;
	}

	// needed for array_unique
	public function __toString() {
        return $this -> id.$this -> name;
    }
}

?>