# 📧 Configuración del Formulario de Contacto

## ✅ ¿Qué hemos implementado?

### **Archivos modificados/creados:**

- ✅ `contact-handler.php` - Procesa el formulario y envía emails
- ✅ `contacto.html` - Formulario actualizado con notificaciones
- ✅ `.htaccess` - Configuración del servidor
- ✅ `CONFIGURACION_FORMULARIO.md` - Esta documentación

### **Funcionalidades:**

- ✅ Validación completa del formulario (cliente y servidor)
- ✅ Emails HTML profesionales con diseño
- ✅ Notificaciones de éxito/error
- ✅ Protección contra spam básica
- ✅ Responsive y accesible

---

## 🔧 **CONFIGURACIÓN REQUERIDA**

### **1. Modificar el email de destino:**

En el archivo `contact-handler.php`, línea 35:

```php
$para = 'contacto@ingenio-red.com'; // CAMBIAR POR TU EMAIL REAL
```

**Cambia por tu email corporativo de Zoho:**

```php
$para = 'tu-email@tu-dominio.com';
```

### **2. Verificar configuración de PHP mail():**

Tu servidor debe tener configurado el envío de emails. Si usas hosting compartido, esto suele estar habilitado.

**Para verificar si funciona, puedes probar:**

```php
<?php
if (mail('tu-email@gmail.com', 'Test', 'Mensaje de prueba')) {
    echo "Email enviado";
} else {
    echo "Error enviando email";
}
?>
```

---

## 🚀 **CONFIGURACIÓN CON ZOHO SMTP** (Recomendado)

Si quieres usar directamente tu cuenta de Zoho (más confiable):

### **Paso 1: Instalar PHPMailer**

```bash
composer require phpmailer/phpmailer
```

### **Paso 2: Reemplazar contact-handler.php**

Usar este código con tu configuración SMTP de Zoho:

```php
<?php
require_once 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    // ... código de validación ...

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP de Zoho
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tu-email@tu-dominio.com';
        $mail->Password = 'tu-contraseña-de-aplicacion';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // Configuración del email
        $mail->setFrom('tu-email@tu-dominio.com', 'Ingenio Red Contacto');
        $mail->addAddress('tu-email@tu-dominio.com');
        $mail->addReplyTo($email_cliente, $nombre);

        $mail->Subject = "[CONTACTO WEB] $nombre - Tel: $telefono";
        $mail->isHTML(true);
        $mail->Body = $mensaje_html; // El HTML que ya tenemos

        $mail->send();
        header('Location: contacto.html?status=success');

    } catch (Exception $e) {
        header('Location: contacto.html?status=error&msg=' . urlencode('Error técnico'));
        error_log("Error de email: " . $mail->ErrorInfo);
    }
}
?>
```

---

## 🔑 **CONFIGURACIÓN EN ZOHO MAIL**

### **Paso 1: Habilitar SMTP**

1. Ingresa a tu Zoho Mail
2. Ve a Configuración → Seguridad
3. Habilita "Contraseñas de aplicación"
4. Genera una nueva contraseña para "Aplicación de correo"
5. **Guarda esta contraseña** (la usarás en el código)

### **Paso 2: Configurar en el código**

```php
$mail->Username = 'contacto@ingenio-red.com'; // Tu email de Zoho
$mail->Password = 'la-contraseña-generada';   // NO tu contraseña normal
```

---

## 🧪 **CÓMO PROBAR**

### **1. Probar localmente:**

- Usar XAMPP/WAMP con servidor web y PHP
- Subir archivos a carpeta htdocs
- Ir a `localhost/tu-proyecto/contacto.html`

### **2. Probar en servidor:**

- Subir todos los archivos via FTP
- Verificar que PHP esté habilitado
- Probar el formulario

### **3. Verificación paso a paso:**

1. ¿El formulario se envía? → Verificar action y method
2. ¿Llega al PHP? → Agregar `echo "Llegó al PHP";` al inicio
3. ¿Se envía el email? → Verificar logs de error PHP
4. ¿Llega el email? → Revisar spam/promociones

---

## 🛡️ **SEGURIDAD IMPLEMENTADA**

- ✅ Sanitización de datos con `htmlspecialchars()`
- ✅ Validación de email con `filter_var()`
- ✅ Validación de longitud de campos
- ✅ Protección contra inyección HTML
- ✅ Headers de seguridad en .htaccess

---

## 📱 **FUNCIONALIDADES ADICIONALES**

### **Integración con WhatsApp:**

Puedes agregar un botón que también envíe por WhatsApp:

```javascript
// Después de enviar el email exitosamente
const whatsappMsg = `Hola! Soy ${nombre}. ${mensaje}. Mi email: ${email}, tel: ${telefono}`;
const whatsappUrl = `https://wa.me/573185801243?text=${encodeURIComponent(whatsappMsg)}`;
// window.open(whatsappUrl); // Opcional: abrir WhatsApp también
```

### **Guardar en base de datos:**

```php
// Agregar después del envío exitoso del email
$pdo = new PDO("mysql:host=localhost;dbname=tu_db", $usuario, $password);
$stmt = $pdo->prepare("INSERT INTO contactos (nombre, telefono, email, mensaje, fecha) VALUES (?, ?, ?, ?, NOW())");
$stmt->execute([$nombre, $telefono, $email_cliente, $mensaje]);
```

---

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### **Email no llega:**

1. Verificar carpeta SPAM
2. Revisar logs de PHP: `tail -f /var/log/php_errors.log`
3. Verificar configuración SMTP del servidor
4. Probar con Gmail primero para verificar

### **Formulario no envía:**

1. Verificar que los nombres de campos coincidan
2. Abrir DevTools → Console para ver errores JS
3. Verificar que el archivo PHP tenga permisos de ejecución

### **Error 500:**

1. Verificar sintaxis PHP: `php -l contact-handler.php`
2. Revisar logs de Apache/Nginx
3. Verificar que todas las extensiones PHP estén instaladas

---

## 📞 **CONTACTO CONFIGURADO:**

Una vez configurado correctamente:

1. **Cliente llena formulario** → `contacto.html`
2. **PHP procesa datos** → `contact-handler.php`
3. **Email llega a** → Tu Zoho Mail
4. **Respondes desde** → Tu bandeja de Zoho
5. **Cliente recibe respuesta** → Directamente a su email

¡Formulario totalmente funcional y profesional! 🚀
