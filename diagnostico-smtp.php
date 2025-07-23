<?php
// 🔍 DIAGNÓSTICO COMPLETO DEL SISTEMA SMTP
echo "<h2>🔍 Diagnóstico del Sistema SMTP - Ingenio Red</h2>";
echo "<p>Analizando por qué no llegó el email...</p>";
echo "<hr>";

// 1. Verificar PHPMailer
echo "<h3>📦 1. Verificación de PHPMailer</h3>";
if (file_exists('phpmailer/PHPMailer.php')) {
    echo "✅ PHPMailer encontrado: phpmailer/PHPMailer.php<br>";
    require_once 'phpmailer/PHPMailer.php';
    echo "✅ PHPMailer cargado correctamente<br>";
} else {
    echo "❌ PHPMailer NO encontrado<br>";
    echo "<strong>Problema:</strong> Falta la librería PHPMailer<br>";
}

// 2. Verificar configuración SMTP
echo "<h3>⚙️ 2. Configuración SMTP</h3>";
$config = [
    'host' => 'smtp.zoho.com',
    'port' => 587,
    'email' => 'formulario.contacto@ingeniored.org',
    'password' => 'PcaZaNsEBYJc',
    'receptor' => 'proyecto.sostenible@ingeniored.org'
];

foreach ($config as $key => $value) {
    echo "✅ <strong>" . ucfirst($key) . ":</strong> " . ($key === 'password' ? str_repeat('*', strlen($value)) : $value) . "<br>";
}

// 3. Prueba de conexión básica
echo "<h3>🌐 3. Prueba de Conexión</h3>";
$connection = @fsockopen('smtp.zoho.com', 587, $errno, $errstr, 10);
if ($connection) {
    echo "✅ Conexión exitosa a smtp.zoho.com:587<br>";
    fclose($connection);
} else {
    echo "❌ Error de conexión: $errstr ($errno)<br>";
}

// 4. Verificar función mail() nativa
echo "<h3>📧 4. Función mail() de PHP</h3>";
if (function_exists('mail')) {
    echo "✅ Función mail() disponible<br>";
    
    // Prueba con mail() nativo
    $test_subject = "Prueba mail() nativo - " . date('H:i:s');
    $test_message = "Prueba con función mail() nativa de PHP\nFecha: " . date('d/m/Y H:i:s');
    $test_headers = "From: noreply@ingeniored.org\r\nReply-To: test@test.com";
    
    echo "🧪 Probando mail() nativo...<br>";
    
    if (mail('proyecto.sostenible@ingeniored.org', $test_subject, $test_message, $test_headers)) {
        echo "✅ mail() nativo: Email enviado<br>";
    } else {
        echo "❌ mail() nativo: Falló<br>";
    }
} else {
    echo "❌ Función mail() NO disponible<br>";
}

// 5. Prueba SMTP completa con detalles
echo "<h3>🔥 5. Prueba SMTP Completa</h3>";

if (class_exists('PHPMailer')) {
    $mail = new PHPMailer(true);
    
    try {
        echo "📡 Configurando SMTP...<br>";
        
        // Configuración detallada
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'formulario.contacto@ingeniored.org';
        $mail->Password = 'PcaZaNsEBYJc';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';
        
        echo "✅ Configuración SMTP establecida<br>";
        
        // Configurar email de diagnóstico
        $mail->setFrom('formulario.contacto@ingeniored.org', 'Diagnóstico SMTP');
        $mail->addAddress('proyecto.sostenible@ingeniored.org');
        
        $mail->isHTML(true);
        $mail->Subject = '🔍 DIAGNÓSTICO SMTP - ' . date('H:i:s');
        $mail->Body = '
        <h3>🔍 Email de Diagnóstico</h3>
        <p><strong>Estado:</strong> Sistema SMTP funcionando</p>
        <p><strong>Fecha:</strong> ' . date('d/m/Y H:i:s') . '</p>
        <p><strong>Emisor:</strong> formulario.contacto@ingeniored.org</p>
        <p><strong>Receptor:</strong> proyecto.sostenible@ingeniored.org</p>
        <p><strong>Servidor:</strong> smtp.zoho.com:587</p>
        <p><strong>Autenticación:</strong> ✅ PcaZaNsEBYJc</p>
        <hr>
        <p><em>Si recibes este email, el problema anterior se ha solucionado.</em></p>
        ';
        
        echo "📧 Enviando email de diagnóstico...<br>";
        
        $result = $mail->send();
        
        if ($result) {
            echo "<div style='background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
            echo "<h4>🎉 ¡DIAGNÓSTICO EXITOSO!</h4>";
            echo "<p>✅ Email de diagnóstico enviado correctamente</p>";
            echo "<p>📧 Revisa proyecto.sostenible@ingeniored.org</p>";
            echo "<p>🔍 Busca: '[DIAGNÓSTICO SMTP]' en el asunto</p>";
            echo "</div>";
        } else {
            echo "<div style='background: #ef4444; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
            echo "<h4>❌ Error en envío</h4>";
            echo "<p>El método send() retornó false</p>";
            echo "</div>";
        }
        
    } catch (Exception $e) {
        echo "<div style='background: #ef4444; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
        echo "<h4>❌ Error SMTP Capturado</h4>";
        echo "<p><strong>Error:</strong> " . $mail->ErrorInfo . "</p>";
        echo "<p><strong>Excepción:</strong> " . $e->getMessage() . "</p>";
        echo "</div>";
        
        echo "<h4>🔧 Posibles soluciones:</h4>";
        echo "<ul>";
        echo "<li><strong>Error de autenticación:</strong> Verificar contraseña PcaZaNsEBYJc en Zoho</li>";
        echo "<li><strong>Email no existe:</strong> Verificar que formulario.contacto@ingeniored.org existe</li>";
        echo "<li><strong>Receptor no existe:</strong> Verificar que proyecto.sostenible@ingeniored.org existe</li>";
        echo "<li><strong>Conexión:</strong> Verificar conexión a internet</li>";
        echo "</ul>";
    }
} else {
    echo "❌ Clase PHPMailer no disponible<br>";
}

// 6. Información del sistema
echo "<h3>💻 6. Información del Sistema</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Sistema Operativo: " . php_uname() . "<br>";
echo "Servidor Web: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Desconocido') . "<br>";

echo "<hr>";
echo "<p><strong>📋 Resumen del diagnóstico ejecutado el:</strong> " . date('d/m/Y H:i:s') . "</p>";
echo "<p><a href='contacto.html' style='color: blue;'>← Volver al formulario</a></p>";
?>
