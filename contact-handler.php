<?php
// 🚀 SISTEMA SMTP PROFESIONAL PARA INGENIO RED
// Configuración actualizada con tu contraseña real

// Incluir PHPMailer para SMTP profesional
require_once 'phpmailer/PHPMailer.php';

// Configuración de error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de caracteres UTF-8
header('Content-Type: text/html; charset=UTF-8');

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    
    // Sanitizar y validar datos (mantengo tu código perfecto)
    $nombre = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');
    $telefono = htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8');
    $email_cliente = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
    
    // Validaciones básicas (igual que antes)
    $errores = [];
    
    if (empty($nombre)) {
        $errores[] = "El nombre es requerido";
    }
    
    if (empty($telefono)) {
        $errores[] = "El teléfono es requerido";
    }
    
    if (empty($email_cliente) || !filter_var($email_cliente, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "Email inválido";
    }
    
    if (empty($mensaje)) {
        $errores[] = "El mensaje es requerido";
    }
    
    // Si hay errores, redirigir con error
    if (!empty($errores)) {
        header('Location: contacto.html?status=error&msg=' . urlencode(implode(', ', $errores)));
        exit;
    }
    
    // 📧 CONFIGURACIÓN PROFESIONAL DE EMAILS (TUS DATOS REALES)
    $email_emisor = 'formulario.contacto@ingeniored.org';    // Email que envía
    $email_receptor = 'proyecto.sostenible@ingeniored.org';  // Email que recibe
    $contraseña_smtp = 'PcaZaNsEBYJc';                       // Tu contraseña real
    $asunto = "[FORMULARIO WEB] $nombre - Tel: $telefono";
    $fecha = date('d/m/Y H:i:s');
    
    
    // Crear el mensaje HTML profesional (mantengo tu diseño perfecto)
    $mensaje_html = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 25px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0 0 0; opacity: 0.9; }
            .content { padding: 30px; background: #f8fafc; }
            .info-grid { display: grid; gap: 15px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ffe600; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .info-box strong { color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 14px; }
            .info-value { font-size: 16px; color: #374151; }
            .message-box { background: white; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6; border: 1px solid #e5e7eb; }
            .footer { background: #374151; color: white; padding: 20px; text-align: center; font-size: 13px; }
            .footer a { color: #ffe600; text-decoration: none; }
            .urgency { background: #fef3c7; border-left-color: #f59e0b; }
            .smtp-badge { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🚀 Nuevo contacto desde Ingenio Red</h2>
                <p>Formulario procesado el $fecha <span class='smtp-badge'>SMTP Profesional</span></p>
            </div>
            <div class='content'>
                <div class='info-grid'>
                    <div class='info-box'>
                        <strong>👤 CLIENTE</strong>
                        <div class='info-value'>$nombre</div>
                    </div>
                    <div class='info-box'>
                        <strong>📞 TELÉFONO</strong>
                        <div class='info-value'>$telefono</div>
                    </div>
                    <div class='info-box urgency'>
                        <strong>📧 EMAIL DE CONTACTO</strong>
                        <div class='info-value'>$email_cliente</div>
                    </div>
                </div>
                <div class='info-box' style='margin-top: 20px;'>
                    <strong>💬 MENSAJE DEL CLIENTE</strong>
                    <div class='message-box'>$mensaje</div>
                </div>
            </div>
            <div class='footer'>
                <p>📧 Enviado desde: <strong>formulario.contacto@ingeniored.org</strong></p>
                <p>📥 Recibido en: <strong>proyecto.sostenible@ingeniored.org</strong></p>
                <p>Sistema SMTP profesional activado • <a href='https://www.ingeniored.org'>www.ingeniored.org</a></p>
            </div>
        </div>
    </body>
    </html>";
    
    // 🔥 NUEVA IMPLEMENTACIÓN CON PHPMAILER PROFESIONAL
    $mail = new PHPMailer(true);
    
    try {
        // Configuración SMTP con Zoho (tus datos reales)
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.com';
        $mail->SMTPAuth = true;
        $mail->Username = $email_emisor;       // formulario.contacto@ingeniored.org
        $mail->Password = $contraseña_smtp;    // PcaZaNsEBYJc
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';
        
        // Configuración del email profesional
        $mail->setFrom($email_emisor, 'Ingenio Red - Formulario Web');
        $mail->addAddress($email_receptor, 'Proyectos Sostenibles');
        $mail->addReplyTo($email_cliente, $nombre); // Para responder directo al cliente
        
        // Contenido del email
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $mensaje_html;
        
        // ¡ENVIAR CON SMTP PROFESIONAL!
        $result = $mail->send();
        
        if ($result) {
            // Log exitoso para estadísticas
            error_log("SMTP Exitoso: $nombre ($email_cliente) - $fecha");
            
            // Redirigir con éxito
            header('Location: contacto.html?status=success');
            exit;
        } else {
            throw new Exception("Error en envío SMTP");
        }
        
    } catch (Exception $e) {
        // Log detallado del error
        error_log("ERROR SMTP Ingenio Red: " . $mail->ErrorInfo . " | Cliente: $nombre ($email_cliente) - $fecha");
        
        // Redirigir con error específico
        header('Location: contacto.html?status=error&msg=' . urlencode('Error técnico en el sistema. Intente nuevamente o contáctenos directamente.'));
        exit;
    }
    
} else {
    // Acceso directo no permitido
    header('Location: contacto.html');
    exit;
}
?>
