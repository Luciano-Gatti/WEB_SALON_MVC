<?php 
namespace Model;

class CitaServicio extends ActiveRecord{
    protected static $tabla = 'citasServicios';
    protected static $columnasDB = ['id', 'citaID', 'servicioID'];

    public $id;
    public $citaID;
    public $servicioID;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->citaID = $args['citaID'] ?? '';
        $this->servicioID = $args['servicioID'] ?? '';
    }
}