<?php
function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function isAuth(){
    if(!isset($_SESSION['login'])){
        header('Location: /');
    }
}

function esUltimo($actual, $proximo){
    return $actual!==$proximo;
}

function isAdmin(){
    if(!isset($_SESSION['admin'])){
        header('Location: /');
    }
}