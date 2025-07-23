# 📧 Configuración de EmailJS para Ingenio Red

## ✅ IMPLEMENTACIÓN COMPLETADA

El formulario de contacto ya está **100% configurado** para usar EmailJS + Netlify. Solo necesitas completar la configuración en EmailJS.

---

## 🚀 PASOS PARA ACTIVAR EMAILJS

### 1. Crear Cuenta en EmailJS

1. Ve a: **https://www.emailjs.com/**
2. Crea una cuenta gratuita (permite 200 emails/mes)
3. Verifica tu email

### 2. Conectar tu Email Zoho

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Custom SMTP"** o **"Other"**
4. Configura con estos datos:

```
Service Name: Zoho Ingenio Red
SMTP Server: smtp.zoho.com
Port: 587
Security: STARTTLS
Username: formulario.contacto@ingeniored.org
Password: PcaZaNsEBYJc
```

### 3. Crear Template de Email

1. Ve a **"Email Templates"**
2. Crea un nuevo template con este contenido:

**Subject:**

```
Nuevo contacto desde Ingenio Red - {{from_name}}
```

**Body:**

```
Nuevo mensaje de contacto desde el sitio web:

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
📱 Teléfono: {{phone}}

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enviado desde: https://ingenio-red.com/contacto.html
Fecha: {{current_date}}
```

### 4. Configurar IDs en el Código

En `contacto.html`, reemplaza estos valores:

```javascript
// Línea ~7 (en el head):
emailjs.init('TU_USER_ID_AQUI');

// Línea ~96 (en el JavaScript):
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams);
```

**Dónde encontrar los IDs:**

- **User ID**: En tu dashboard EmailJS → Account
- **Service ID**: En Email Services → el ID de tu servicio Zoho
- **Template ID**: En Email Templates → el ID de tu template

---

## 🎯 CONFIGURACIÓN DE ENVÍO

El formulario está configurado para enviar desde:

- **From:** `formulario.contacto@ingeniored.org`
- **To:** `proyecto.sostenible@ingeniored.org`

Exactamente como solicitaste ✅

---

## 🧪 PRUEBA DEL FORMULARIO

1. Abre: `http://localhost:3000/contacto.html` (o tu dominio)
2. Llena el formulario de prueba
3. Verifica que llegue el email a `proyecto.sostenible@ingeniored.org`

---

## 📊 LÍMITES DEL PLAN GRATUITO

- ✅ **200 emails/mes gratis**
- ✅ **Sin marca de agua**
- ✅ **Soporte por email**
- ✅ **Perfecto para tu volumen**

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Si no llegan los emails:

1. Verifica el User ID, Service ID y Template ID
2. Revisa la consola del navegador (F12) para errores
3. Confirma que la configuración SMTP sea correcta
4. Verifica que `proyecto.sostenible@ingeniored.org` no esté en spam

### Si hay errores de CORS:

- EmailJS maneja automáticamente CORS, no debería haber problemas

---

## 🌟 VENTAJAS DE ESTA IMPLEMENTACIÓN

- ✅ **Compatible con Netlify** (hosting estático)
- ✅ **Sin necesidad de servidor PHP**
- ✅ **Validación completa del formulario**
- ✅ **Mensajes de éxito/error profesionales**
- ✅ **Responsive y accesible**
- ✅ **Usa tu email corporativo Zoho**

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Una vez que configures los IDs en EmailJS, el formulario estará **100% funcional** y recibirás todos los contactos en `proyecto.sostenible@ingeniored.org`.

**Estado:** ✅ IMPLEMENTADO - Solo falta configurar IDs de EmailJS
