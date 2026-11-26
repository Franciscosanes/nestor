  // Enviar formulario a Supabase
  const form = document.querySelector('.rsvp form');
  const mensajeExito = document.getElementById('mensaje-exito');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombre = form.querySelector('input[type="text"]').value.trim();
      const acompanantes = form.querySelector('select[name="acompanantes"]').value;
      const mensaje = form.querySelector('textarea').value.trim();

      if (!nombre || isNaN(acompanantes)) {
        alert('Por favor completa correctamente los campos.');
        return;
      }

      try {
        const res = await fetch('https://vtygmmjhbsjklrhqivrv.supabase.co/rest/v1/rsvp', {
          method: 'POST',
          headers: {
            'apikey': 'sb_publishable_TE0kZVLBCB79Nkgnq2mlNw_RDdV3jqq',
            'Authorization': 'Bearer sb_publishable_TE0kZVLBCB79Nkgnq2mlNw_RDdV3jqq',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            nombre,
            acompanantes: parseInt(acompanantes),
            mensaje
          })
        });

        if (res.ok) {
          const resumen = `
  <strong>¡Gracias por confirmar, ${nombre}!</strong><br><br>

  <u>Resumen de tu confirmación:</u><br><br>

  👤 <strong>Nombre:</strong> ${nombre}<br>
  👥 <strong>Acompañantes:</strong> ${acompanantes}<br>
  ✉️ <strong>Mensaje:</strong> ${mensaje || "Sin mensaje"}<br><br>

  ¡Nos vemos en mis XV!<br>
  <strong>Néstor Sebastián.</strong>
`;

      mensajeExito.innerHTML = resumen;
      mensajeExito.style.display = 'block';
          form.reset();
        } else {
          const error = await res.json();
          console.error('Error al enviar:', error);
          alert('Hubo un error. Intenta más tarde.');
        }

      } catch (err) {
        console.error('Error inesperado:', err);
        alert('No se pudo enviar tu confirmación. Revisa tu conexión.');
      }
    });
