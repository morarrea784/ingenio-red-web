<?php
// 🧪 PRUEBA DE CONFIGURACIÓN SMTP INGENIO RED
// Configuración real con tu contraseña

echo "<h2>🧪 Probando SMTP de Ingenio Red</h2>";
echo "<p><strong>Email emisor:</strong> formulario.contacto@ingeniored.org</p>";
echo "<p><strong>Email receptor:</strong> proyecto.sostenible@ingeniored.org</p>";
echo "<p><strong>Contraseña configurada:</strong> ✓ PcaZaNsEBYJc</p>";
echo "<hr>";

// Incluir PHPMailer simplificado
require_once 'phpmailer/PHPMailer.php';

$mail = new PHPMailer(true);

try {
    // Configuración SMTP con tus datos reales
    $mail->isSMTP();
    $mail->Host = 'smtp.zoho.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'formulario.contacto@ingeniored.org';  // Tu email emisor
    $mail->Password = 'PcaZaNsEBYJc';                        // Tu contraseña real
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    
    // Configurar email de prueba
    $mail->setFrom('formulario.contacto@ingeniored.org', 'Ingenio Red - Prueba SMTP');
    $mail->addAddress('proyecto.sostenible@ingeniored.org', 'Proyectos Sostenibles');
    
    $mail->isHTML(true);
    $mail->Subject = '✅ Prueba SMTP Exitosa - ' . date('d/m/Y H:i:s');
    $mail->Body = '
    <div style="font-family: Arial; padding: 30px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 10px; text-align: center;">
        <h2>🎉 ¡SMTP configurado perfectamente!</h2>
        <p><strong>Sistema:</strong> Ingenio Red Contact Form</p>
        <p><strong>Emisor:</strong> formulario.contacto@ingeniored.org</p>
        <p><strong>Receptor:</strong> proyecto.sostenible@ingeniored.org</p>
        <p><strong>Contraseña SMTP:</strong> ✓ Funcionando</p>
        <p><strong>Fecha/Hora:</strong> ' . date('d/m/Y H:i:s') . '</p>
        <hr style="border-color: rgba(255,255,255,0.3);">
        <p><em>Si recibes este email, tu formulario web está 100% listo para ser profesional 🚀</em></p>
    </div>';
    
    // ¡ENVIAR!
    $result = $mail->send();
    
    if ($result) {
        echo "<div style='color: white; padding: 25px; border: 3px solid #10b981; background: linear-gradient(135deg, #10b981, #059669); border-radius: 10px; text-align: center;'>";
        echo "<h3>🎉 ¡ÉXITO TOTAL!</h3>";
        echo "<p>✅ <strong>SMTP configurado y funcionando perfectamente</strong></p>";
        echo "<p>📧 <strong>Email enviado desde:</strong> formulario.contacto@ingeniored.org</p>";
        echo "<p>📥 <strong>Email recibido en:</strong> proyecto.sostenible@ingeniored.org</p>";
        echo "<p>🔑 <strong>Contraseña SMTP:</strong> ✓ PcaZaNsEBYJc (funcionando)</p>";
        echo "<p>🚀 <strong>¡Tu formulario está listo para ser súper profesional!</strong></p>";
        echo "<hr style='border-color: rgba(255,255,255,0.3); margin: 20px 0;'>";
        echo "<p><strong>✅ Próximo paso:</strong> Actualizar contact-handler.php</p>";
        echo "</div>";
    } else {
        throw new Exception("Error en envío");
    }
    
} catch (Exception $e) {
    echo "<div style='color: white; padding: 25px; border: 3px solid #ef4444; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 10px;'>";
    echo "<h3>❌ Error de configuración</h3>";
    echo "<p><strong>Problema:</strong> " . $mail->ErrorInfo . "</p>";
    echo "<p><strong>Email emisor:</strong> formulario.contacto@ingeniored.org</p>";
    echo "<p><strong>Contraseña usada:</strong> PcaZaNsEBYJc</p>";
    echo "<hr style='border-color: rgba(255,255,255,0.3);'>";
    echo "<p><strong>Posibles soluciones:</strong></p>";
    echo "<ul style='text-align: left;'>";
    echo "<li>Verificar que formulario.contacto@ingeniored.org existe en Zoho</li>";
    echo "<li>Verificar que la contraseña de aplicación sea correcta</li>";
    echo "<li>Verificar que proyecto.sostenible@ingeniored.org existe</li>";
    echo "</ul>";
    echo "</div>";
}

echo "<br><p><a href='contacto.html' style='color: blue; font-size: 16px;'>← Volver al formulario de contacto</a></p>";
?>
