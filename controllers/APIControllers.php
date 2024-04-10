<?php
namespace Controllers;
use Model\Cita;
use Model\Servicio;
use Model\CitaServicio;

class APIControllers{
    public static function index(){
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function guardar(){
        //Se incerta la nueva cita
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        //Se insertan los servicios para la cita en la bd
        $citaID = $resultado['id'];
        $serviciosID = explode(",", $_POST['servicios']);
        foreach($serviciosID as $servicioID){
            $args = [
                'citaID' => $citaID,
                'servicioID' => $servicioID 
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }

        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $idCita =  $_POST['id'];
            $citasServicios = CitaServicio::allWhere('citaID', $idCita);
            if($citasServicios){
                foreach($citasServicios as $citaServicio){
                    $citaServicio->eliminar();
                }
            }            
            $cita = Cita::find($idCita);
            $cita->eliminar();
            header('Location:'.$_SERVER['HTTP_REFERER']);
        }
    }
}