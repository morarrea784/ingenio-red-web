<?php
// 🛠️ SOLUCIÓN ALTERNATIVA - MAIL() NATIVO MEJORADO
echo "<h2>🛠️ Prueba con mail() nativo (alternativa)</h2>";
echo "<p>Si SMTP falla, usamos el método tradicional mejorado</p>";
echo "<hr>";

// Datos de prueba
$nombre = 'Jefferson - Prueba Alternativa';
$telefono = '318-580-1243';
$email_cliente = 'jefferson.test@ingeniored.org';
$mensaje = '🛠️ PRUEBA ALTERNATIVA CON MAIL() NATIVO

Este email fue enviado usando el método mail() tradicional de PHP como alternativa al SMTP.

✅ Sistema funcionando
✅ Email receptor: proyecto.sostenible@ingeniored.org
✅ Fecha: ' . date('d/m/Y H:i:s') . '

Si recibes este email, el sistema básico funciona correctamente.';

$para = 'proyecto.sostenible@ingeniored.org';
$asunto = '[ALTERNATIVO] ' . $nombre . ' - Tel: ' . $telefono;

// Headers mejorados
$headers = array(
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Ingenio Red <noreply@ingeniored.org>',
    'Reply-To: ' . $email_cliente,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 3'
);

$headerString = implode("\r\n", $headers);

// HTML básico
$mensaje_html = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family: Arial; padding: 20px;'>
    <div style='background: #f59e0b; color: white; padding: 20px; border-radius: 8px;'>
        <h2>🛠️ Email Alternativo - Ingenio Red</h2>
        <p>Método: mail() nativo de PHP</p>
    </div>
    <div style='padding: 20px; background: #f8fafc; margin: 10px 0;'>
        <p><strong>👤 Nombre:</strong> $nombre</p>
        <p><strong>📞 Teléfono:</strong> $telefono</p>
        <p><strong>📧 Email:</strong> $email_cliente</p>
        <p><strong>💬 Mensaje:</strong></p>
        <div style='background: white; padding: 15px; border-radius: 4px;'>
            " . nl2br($mensaje) . "
        </div>
    </div>
    <div style='background: #64748b; color: white; padding: 10px; text-align: center; font-size: 12px;'>
        Sistema alternativo de Ingenio Red
    </div>
</body>
</html>";

echo "<div style='background: #f59e0b; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
echo "<h3>📧 Enviando con mail() nativo...</h3>";
echo "<p>Para: proyecto.sostenible@ingeniored.org</p>";
echo "<p>Asunto: $asunto</p>";
echo "</div>";

// Intentar envío
try {
    $resultado = mail($para, $asunto, $mensaje_html, $headerString);
    
    if ($resultado) {
        echo "<div style='background: #10b981; color: white; padding: 20px; border-radius: 8px; margin: 15px 0;'>";
        echo "<h3>🎉 ¡EMAIL ENVIADO CON ÉXITO!</h3>";
        echo "<p>✅ Método alternativo funcionando</p>";
        echo "<p>📧 Email enviado a: proyecto.sostenible@ingeniored.org</p>";
        echo "<p>🔍 Buscar asunto: <strong>[ALTERNATIVO] Jefferson - Prueba Alternativa</strong></p>";
        echo "<hr style='border-color: rgba(255,255,255,0.3);'>";
        echo "<p><strong>Si llega este email:</strong> Tu servidor soporta mail() básico</p>";
        echo "<p><strong>Podemos usar este método</strong> como respaldo del SMTP</p>";
        echo "</div>";
    } else {
        echo "<div style='background: #ef4444; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
        echo "<h3>❌ Error con mail() nativo</h3>";
        echo "<p>El método alternativo también falló</p>";
        echo "<p>Problema: Configuración del servidor de correo</p>";
        echo "</div>";
    }
    
} catch (Exception $e) {
    echo "<div style='background: #ef4444; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
    echo "<h3>❌ Excepción capturada</h3>";
    echo "<p>Error: " . $e->getMessage() . "</p>";
    echo "</div>";
}

echo "<hr>";
echo "<p><em>Prueba alternativa ejecutada el " . date('d/m/Y H:i:s') . "</em></p>";
?>
