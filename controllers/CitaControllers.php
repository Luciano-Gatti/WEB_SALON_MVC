<?php
namespace Controllers;
use MVC\Router;

class CitaControllers{
    public static function index(Router $router){
        session_start();
        isAuth();
        $nombre = $_SESSION['nombre'];
        $id = $_SESSION['id'];
        $router->render('cita/index', [
            'nombre'=>$nombre,
            'id'=>$id
        ]);
    }
}