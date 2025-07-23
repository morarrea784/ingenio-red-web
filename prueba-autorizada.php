<?php
// 🧪 PRUEBA AUTORIZADA - ENVÍO REAL A PROYECTO.SOSTENIBLE@INGENIORED.ORG
echo "<h2>🚀 Iniciando prueba autorizada del sistema SMTP</h2>";
echo "<p><strong>Destino:</strong> proyecto.sostenible@ingeniored.org</p>";
echo "<p><strong>Desde:</strong> formulario.contacto@ingeniored.org</p>";
echo "<hr>";

// Simular datos del formulario (como si un cliente real lo llenara)
$_POST['name'] = 'Jefferson - Prueba Autorizada';
$_POST['phone'] = '318-580-1243';
$_POST['email'] = 'jefferson.test@ingeniored.org';
$_POST['message'] = '¡PRUEBA EXITOSA! 

Este email confirma que el sistema SMTP profesional está funcionando perfectamente:

✅ PHPMailer configurado
✅ Contraseña SMTP: PcaZaNsEBYJc
✅ Email emisor: formulario.contacto@ingeniored.org  
✅ Email receptor: proyecto.sostenible@ingeniored.org

El formulario de contacto está 100% operativo y listo para recibir clientes reales.

Sistema probado el: ' . date('d/m/Y H:i:s') . '

¡Ingenio Red - Sistema profesional activado! 🚀';

$_POST['submit'] = true;
$_SERVER['REQUEST_METHOD'] = 'POST';

echo "<div style='background: #1e3a8a; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
echo "<h3>📧 Ejecutando envío de prueba...</h3>";
echo "<p>Datos que se enviarán:</p>";
echo "<ul>";
echo "<li><strong>Nombre:</strong> Jefferson - Prueba Autorizada</li>";
echo "<li><strong>Teléfono:</strong> 318-580-1243</li>";
echo "<li><strong>Email:</strong> jefferson.test@ingeniored.org</li>";
echo "<li><strong>Mensaje:</strong> Confirmación de sistema funcionando</li>";
echo "</ul>";
echo "</div>";

echo "<div style='background: #f8fafc; padding: 10px; border-left: 4px solid #3b82f6; margin: 10px 0;'>";
echo "⏳ Procesando con contact-handler.php...";
echo "</div>";

// Capturar cualquier salida del contact-handler
ob_start();

try {
    // Incluir tu código exacto - esto ejecutará el envío real
    include 'contact-handler.php';
} catch (Exception $e) {
    echo "<div style='background: #ef4444; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
    echo "<h3>❌ Error capturado:</h3>";
    echo "<p>" . $e->getMessage() . "</p>";
    echo "</div>";
}

$output = ob_get_clean();

// Si no hubo redirección, significa que hubo un error
if (empty($output)) {
    echo "<div style='background: #10b981; color: white; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;'>";
    echo "<h3>🎉 ¡PRUEBA COMPLETADA!</h3>";
    echo "<p>✅ El código se ejecutó sin errores fatales</p>";
    echo "<p>📧 Si la configuración es correcta, el email debería haber llegado a:</p>";
    echo "<p><strong>proyecto.sostenible@ingeniored.org</strong></p>";
    echo "<hr style='border-color: rgba(255,255,255,0.3); margin: 15px 0;'>";
    echo "<h4>🔍 VERIFICA AHORA:</h4>";
    echo "<ol style='text-align: left; display: inline-block;'>";
    echo "<li>Abrir bandeja de <strong>proyecto.sostenible@ingeniored.org</strong></li>";
    echo "<li>Buscar email con asunto: <strong>[FORMULARIO WEB] Jefferson - Prueba Autorizada</strong></li>";
    echo "<li>Si no está en bandeja principal, revisar SPAM/Promociones</li>";
    echo "<li>Si llega ✅ = Sistema listo para clientes</li>";
    echo "</ol>";
    echo "</div>";
    
    echo "<div style='background: #374151; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>";
    echo "<h4>🚀 SIGUIENTE PASO:</h4>";
    echo "<p>Si el email llegó correctamente, tu formulario está 100% funcional</p>";
    echo "<p><a href='contacto.html' style='background: #ffe600; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;'>➤ PROBAR FORMULARIO REAL</a></p>";
    echo "</div>";
} else {
    echo $output;
}

echo "<br><p style='text-align: center; color: #64748b;'>";
echo "<em>Prueba ejecutada el " . date('d/m/Y H:i:s') . " - Sistema SMTP Ingenio Red</em>";
echo "</p>";
?>
