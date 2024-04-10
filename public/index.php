<?php 
require_once __DIR__ . '/../includes/app.php';
use MVC\Router;
use Controllers\APIControllers;
use Controllers\CitaControllers;
use Controllers\AdminControllers;
use Controllers\LoginControllers;
use Controllers\ServicioControllers;

$router = new Router();

//Iniciar Sesión
$router->get('/', [LoginControllers::class, 'login']);
$router->post('/', [LoginControllers::class, 'login']);
$router->get('/logout', [LoginControllers::class, 'logout']);

//Recuperar Password
$router->get('/olvide', [LoginControllers::class, 'olvide']);
$router->post('/olvide', [LoginControllers::class, 'olvide']);
$router->get('/recuperar', [LoginControllers::class, 'recuperar']);
$router->post('/recuperar', [LoginControllers::class, 'recuperar']);

//Crear Cuenta
$router->get('/crear-cuenta', [LoginControllers::class, 'crear']);
$router->post('/crear-cuenta', [LoginControllers::class, 'crear']);

//Confirmar cuenta
$router->get('/confirmar-cuenta', [LoginControllers::class, 'confirmar']);
$router->get('/mensaje', [LoginControllers::class, 'mensaje']);

//Area privada
$router->get('/cita', [CitaControllers::class, 'index']);
$router->get('/admin', [AdminControllers::class, 'index']);

//API de Citas
$router->get('/api/servicios', [APIControllers::class, 'index']);
$router->post('/api/citas', [APIControllers::class, 'guardar']);
$router->post('/api/eliminar', [APIControllers::class, 'eliminar']);

//CRUD de Servicios
$router->get('/servicios', [ServicioControllers::class, 'index']);
$router->get('/servicios/crear', [ServicioControllers::class, 'crear']);
$router->post('/servicios/crear', [ServicioControllers::class, 'crear']);
$router->get('/servicios/actualizar', [ServicioControllers::class, 'actualizar']);
$router->post('/servicios/actualizar', [ServicioControllers::class, 'actualizar']);
$router->post('/servicios/eliminar', [ServicioControllers::class, 'eliminar']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();