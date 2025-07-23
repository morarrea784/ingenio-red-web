<?php
// ARCHIVO DE PRUEBA - test-email.php
// Ejecutar este archivo para probar si el envío de emails funciona

echo "<h2>🧪 Prueba de Configuración de Email</h2>";
echo "<hr>";

// Información del servidor
echo "<h3>📊 Información del Servidor:</h3>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br>";
echo "<strong>Mail Function:</strong> " . (function_exists('mail') ? '✅ Disponible' : '❌ No disponible') . "<br>";
echo "<strong>Servidor:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "<br>";

// Prueba básica de envío
$test_email = 'servicioalcliente@ingeniored.org';
$test_subject = 'TEST - Formulario de Contacto';
$test_message = '
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
    <div style="background: #1e3a8a; color: white; padding: 20px; border-radius: 8px;">
        <h2>✅ Prueba de Email Exitosa</h2>
        <p>Si recibes este email, la configuración está funcionando correctamente.</p>
    </div>
    <div style="padding: 20px; background: #f8fafc; margin-top: 10px;">
        <p><strong>Fecha de prueba:</strong> ' . date('d/m/Y H:i:s') . '</p>
        <p><strong>Servidor:</strong> ' . $_SERVER['SERVER_NAME'] . '</p>
        <p><strong>IP:</strong> ' . $_SERVER['SERVER_ADDR'] . '</p>
    </div>
    <div style="background: #64748b; color: white; padding: 10px; text-align: center; font-size: 12px; margin-top: 10px;">
        Email de prueba generado automáticamente
    </div>
</body>
</html>';

$test_headers = "MIME-Version: 1.0\r\n";
$test_headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$test_headers .= "From: Test Ingenio Red <noreply@ingeniored.org>\r\n";

echo "<hr>";
echo "<h3>📧 Prueba de Envío:</h3>";

try {
    if (mail($test_email, $test_subject, $test_message, $test_headers)) {
        echo "✅ <span style='color: green; font-weight: bold;'>EMAIL DE PRUEBA ENVIADO EXITOSAMENTE</span><br>";
        echo "📬 Revisa la bandeja de entrada de: <strong>$test_email</strong><br>";
        echo "⚠️ Si no aparece en la bandeja principal, revisa SPAM/Promociones<br>";
    } else {
        echo "❌ <span style='color: red; font-weight: bold;'>ERROR AL ENVIAR EMAIL DE PRUEBA</span><br>";
        echo "🔧 Revisa la configuración del servidor o contacta a tu hosting<br>";
    }
} catch (Exception $e) {
    echo "❌ <span style='color: red; font-weight: bold;'>EXCEPCIÓN: " . $e->getMessage() . "</span><br>";
}

echo "<hr>";
echo "<h3>📋 Siguientes Pasos:</h3>";
echo "<ol>";
echo "<li>Si recibiste el email de prueba: <strong style='color: green;'>¡El formulario funcionará perfectamente!</strong></li>";
echo "<li>Si NO recibiste el email: Verifica configuración SMTP del servidor</li>";
echo "<li>Prueba el formulario en: <a href='contacto.html'>contacto.html</a></li>";
echo "<li>Una vez que funcione, <strong>elimina este archivo</strong> por seguridad</li>";
echo "</ol>";

echo "<hr>";
echo "<p><strong>⚠️ IMPORTANTE:</strong> Elimina este archivo una vez confirmado que funciona.</p>";
?>

<style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h2 { color: #1e3a8a; }
    h3 { color: #0d1b2a; margin-top: 30px; }
    hr { border: none; height: 2px; background: #e5e7eb; margin: 20px 0; }
</style>
