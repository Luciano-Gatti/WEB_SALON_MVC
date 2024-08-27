<?php
namespace Classes;

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

class Emails {
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token) {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion(){
        // Crear el transporte para Gmail
        // Asegúrate de codificar la contraseña y otros valores si es necesario
        $emailUser = $_ENV['EMAIL_USER'];
        $emailPass = $_ENV['EMAIL_PASS']; // Codificación de la contraseña
        $emailSmtp = $_ENV['EMAIL_SMTP'];
        $emailPort = $_ENV['EMAIL_PORT'];

        // Construcción del DSN
        $dsn = sprintf('smtp://%s:%s@%s:%s', $emailUser, $emailPass, $emailSmtp, $emailPort);

        // Crear el transporte de correo
        $transport = Transport::fromDsn($dsn);

        // Crear el Mailer usando el transporte
        $mailer = new Mailer($transport);

        // Crear el mensaje
        $email = (new Email())
        ->from('tuemail@gmail.com') // Cambia esto a tu dirección de correo
        ->to($this->email)
        ->subject('Confirma tu cuenta')
        ->html("
            <html>
                <p><strong>Hola " . $this->nombre . "</strong>, has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace.</p>
                <p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a> </p>
                <p>Si usted no solicitó este correo, puedes ignorar el mensaje.</p>
            </html>
        ");

        // Enviar el mensaje
        $mailer->send($email);
    }

    public function enviarInstrucciones(){
         // Crear el transporte para Gmail
        // Asegúrate de codificar la contraseña y otros valores si es necesario
        $emailUser = $_ENV['EMAIL_USER'];
        $emailPass = $_ENV['EMAIL_PASS']; // Codificación de la contraseña
        $emailSmtp = $_ENV['EMAIL_SMTP'];
        $emailPort = $_ENV['EMAIL_PORT'];

        // Construcción del DSN
        $dsn = sprintf('smtp://%s:%s@%s:%s', $emailUser, $emailPass, $emailSmtp, $emailPort);

        // Crear el transporte de correo
        $transport = Transport::fromDsn($dsn);
        
        // Crear el Mailer usando el transporte
        $mailer = new Mailer($transport);

        // Crear el mensaje
        $email = (new Email())
        ->from('tuemail@gmail.com') // Cambia esto a tu dirección de correo
        ->to($this->email)
        ->subject('Reestablece tu contraseña')
        ->html("
            <html>
                <p><strong>Hola " . $this->nombre . "</strong>, has solicitado restablecer tu contraseña, sigue el siguiente enlace para hacerlo.</p>
                <p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>Restablecer Contraseña</a> </p>
                <p>Si usted no solicitó este correo, puedes ignorar el mensaje.</p>
            </html>
        ");

        // Enviar el mensaje
        $mailer->send($email);
    }
}