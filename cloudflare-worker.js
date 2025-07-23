// 🛒 WORKER PARA CARRITO INGENIO RED
// Este worker procesa pedidos y envía emails automáticos

export default {
  async fetch(request, env) {
    // 🔒 Solo aceptar pedidos POST (por seguridad)
    if (request.method !== 'POST') {
      return new Response('❌ Método no permitido', { status: 405 });
    }

    // 🛡️ Verificar que venga de tu dominio
    const origin = request.headers.get('Origin');
    if (origin && !origin.includes('ingeniored.org') && !origin.includes('localhost')) {
      return new Response('❌ Origen no autorizado', { status: 403 });
    }

    try {
      // 📦 Recibir datos del carrito
      const cartData = await request.json();
      console.log('📦 Pedido recibido:', cartData.customer.name);
      
      // 📊 Resultado que enviaremos de vuelta
      const results = {
        whatsapp: 'processed',
        email: null,
        status: 'success',
        timestamp: new Date().toISOString(),
        customer: cartData.customer.name
      };

      // 📧 Enviar email backup usando Resend
      try {
        const emailContent = generateEmailContent(cartData);
        
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'carrito@ingeniored.org', // Email emisor
            to: ['pedidos.entregas@ingeniored.org'], // Tu email receptor
            subject: `🛒 NUEVO PEDIDO - ${cartData.customer.name} - $${cartData.total.toLocaleString()}`,
            html: emailContent
          }),
        });

        if (emailResponse.ok) {
          results.email = 'sent';
          console.log('✅ Email backup enviado exitosamente');
        } else {
          results.email = 'failed';
          const errorText = await emailResponse.text();
          console.error('❌ Error enviando email:', errorText);
        }
      } catch (emailError) {
        results.email = 'error';
        console.error('❌ Error en email backup:', emailError);
      }

      // 🎉 Respuesta exitosa
      return new Response(JSON.stringify(results), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Permitir desde cualquier origen por ahora
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });

    } catch (error) {
      console.error('💥 Error procesando pedido:', error);
      
      return new Response(JSON.stringify({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

// 🎨 Función para crear el email bonito
function generateEmailContent(cartData) {
  const { customer, items, total } = cartData;
  
  // 🛍️ Crear lista de productos
  let itemsList = '';
  items.forEach(item => {
    itemsList += `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px; text-align: left;">
        <strong>${item.name}</strong><br>
        <small style="color: #64748b;">Código: ${item.id}</small>
      </td>
      <td style="padding: 12px; text-align: center; font-weight: 600;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right; color: #059669; font-weight: 600;">
        $${item.price.toLocaleString()}
      </td>
      <td style="padding: 12px; text-align: right; color: #0f172a; font-weight: 700;">
        $${(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>`;
  });

  // 🎨 Email HTML hermoso
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Nuevo Pedido - Ingenio Red</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8fafc;">
    <div style="max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <!-- 🎯 Header -->
      <div style="background: linear-gradient(135deg, #0d1b2a 0%, #1a3a52 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🛒 NUEVO PEDIDO</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
          ${new Date().toLocaleDateString('es-CO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      <!-- 👤 Información del Cliente -->
      <div style="padding: 30px; border-bottom: 3px solid #e2e8f0;">
        <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 22px;">📋 Información del Cliente</h2>
        <div style="display: grid; gap: 15px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #ffe600; color: #0d1b2a; padding: 8px; border-radius: 50%; font-weight: bold; min-width: 35px; text-align: center;">👤</span>
            <div>
              <strong style="color: #0f172a;">Nombre:</strong> ${customer.name}<br>
              <strong style="color: #0f172a;">Email:</strong> ${customer.email}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #00b0fa; color: white; padding: 8px; border-radius: 50%; font-weight: bold; min-width: 35px; text-align: center;">📱</span>
            <div>
              <strong style="color: #0f172a;">Teléfono:</strong> ${customer.phone}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #10b981; color: white; padding: 8px; border-radius: 50%; font-weight: bold; min-width: 35px; text-align: center;">📍</span>
            <div>
              <strong style="color: #0f172a;">Dirección:</strong> ${customer.address}
            </div>
          </div>
          ${customer.comments ? `
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <span style="background: #8b5cf6; color: white; padding: 8px; border-radius: 50%; font-weight: bold; min-width: 35px; text-align: center;">💬</span>
            <div>
              <strong style="color: #0f172a;">Comentarios:</strong><br>
              <em style="color: #64748b;">${customer.comments}</em>
            </div>
          </div>` : ''}
        </div>
      </div>

      <!-- 🛍️ Productos -->
      <div style="padding: 30px;">
        <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 22px;">🛍️ Productos Solicitados</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f1f5f9; color: #475569;">
              <th style="padding: 15px; text-align: left; font-weight: 600;">Producto</th>
              <th style="padding: 15px; text-align: center; font-weight: 600;">Cant.</th>
              <th style="padding: 15px; text-align: right; font-weight: 600;">Precio Unit.</th>
              <th style="padding: 15px; text-align: right; font-weight: 600;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr style="background: #0d1b2a; color: white;">
              <td colspan="3" style="padding: 20px; text-align: right; font-size: 18px; font-weight: 700;">
                TOTAL DEL PEDIDO:
              </td>
              <td style="padding: 20px; text-align: right; font-size: 24px; font-weight: 900; color: #ffe600;">
                $${total.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- ⚡ Acciones Rápidas -->
      <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
        <h3 style="color: #0f172a; margin: 0 0 20px 0;">⚡ Acciones Rápidas</h3>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="https://wa.me/57${customer.phone.replace(/[^0-9]/g, '')}" 
             style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
            📱 Contactar Cliente
          </a>
          <a href="mailto:${customer.email}?subject=Confirmación de Pedido - Ingenio Red&body=Hola ${customer.name}, hemos recibido tu pedido por $${total.toLocaleString()}. Te contactaremos pronto para coordinar el envío." 
             style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
            📧 Enviar Email
          </a>
        </div>
      </div>

      <!-- 🎯 Footer -->
      <div style="background: #0d1b2a; color: white; padding: 20px; text-align: center;">
        <p style="margin: 0; font-size: 14px; opacity: 0.8;">
          Este pedido fue generado automáticamente desde <strong>www.ingeniored.org</strong><br>
          Sistema híbrido: WhatsApp + Email backup activado ✅
        </p>
      </div>
    </div>
  </body>
  </html>`;
}
