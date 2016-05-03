<?php
	
class Edge
{
	public $source;
	public $target;
	public $years;

	private function __construct() {
		$this -> $years = [];
	}

	public static function createEdgeWithAttrs($_source, $_target) {
		
		$edge = new Edge();
		$edge -> source = $_source;
		$edge -> target = $_target;

		return $edge;
	}

	// needed for array_unique
	public function __toString() {
        return $this -> source."-".$this -> target;
    }
}

?>