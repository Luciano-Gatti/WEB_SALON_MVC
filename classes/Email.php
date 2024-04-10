<?php
namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token) {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion(){
        //Crear una instancia de PHPMailer
        $phpmailer = new PHPMailer();

        //Configurar SMTP
        $phpmailer->isSMTP();
        $phpmailer->Host = $_ENV['EMAIL_HOST'];
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = $_ENV['EMAIL_PORT'];
        $phpmailer->Username = $_ENV['EMAIL_USER'];
        $phpmailer->Password = $_ENV['EMAIL_PASS'];

        //Configurar el contenido del email
        $phpmailer->setFrom('cuentas@appsalon.com');
        $phpmailer->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $phpmailer->Subject = 'Confirma tu cuenta';

        //Habilitar HTML
        $phpmailer->isHTML(TRUE);
        $phpmailer->CharSet = 'UTF-8';

        //Definir el contenido
        $contenido = "<html>";
        $contenido.= "<p><strong>Hola ".$this->nombre ."</strong>, has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace.</p>";
        $contenido.= "<p>Presiona aqui: <a href='". $_ENV['APP_URL'] ."/confirmar-cuenta?token=".$this->token."'>Confirmar Cuenta</a> </p>";
        $contenido.= "<p>Si usted no solicito este correo puedes ignorar el mensaje.</p>";
        $contenido.= "</html>";
        $phpmailer->Body = $contenido;

        //Enviar el email
        $phpmailer->send();
    }

    public function enviarInstrucciones(){
        //Crear una instancia de PHPMailer
        $phpmailer = new PHPMailer();

        //Configurar SMTP
        $phpmailer->isSMTP();
        $phpmailer->Host = $_ENV['EMAIL_HOST'];
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = $_ENV['EMAIL_PORT'];
        $phpmailer->Username = $_ENV['EMAIL_USER'];
        $phpmailer->Password = $_ENV['EMAIL_PASS'];

        //Configurar el contenido del email
        $phpmailer->setFrom('cuentas@appsalon.com');
        $phpmailer->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $phpmailer->Subject = 'Reestablece tu contraseña';

        //Habilitar HTML
        $phpmailer->isHTML(TRUE);
        $phpmailer->CharSet = 'UTF-8';

        //Definir el contenido
        $contenido = "<html>";
        $contenido.= "<p><strong>Hola ".$this->nombre ."</strong>, has solicitado reestablecer tu contraseña, sigue el siguiente enlace para hacerlo.</p>";
        $contenido.= "<p>Presiona aqui: <a href='". $_ENV['APP_URL'] ."/recuperar?token=".$this->token."'>Reestablecer Contraseña</a> </p>";
        $contenido.= "<p>Si usted no solicito este correo puedes ignorar el mensaje.</p>";
        $contenido.= "</html>";
        $phpmailer->Body = $contenido;

        //Enviar el email
        $phpmailer->send();
    }
}