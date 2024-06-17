document.addEventListener('DOMContentLoaded', function() {
    var eurosInput = document.getElementById('euros');
    var pesetasInput = document.getElementById('pesetas');
    var historialUl = document.getElementById('historial');
    var borrarHistorialBtn = document.getElementById('borrarHistorial');
    var calcularBtn = document.querySelector('form button[type="submit"]');
  
    // Obtener historial de localStorage si existe
    var historialConversiones = JSON.parse(localStorage.getItem('historialConversiones')) || [];
  
    // Función para convertir de euros a pesetas
    function eurosToPesetas(euros) {
      return euros * 166.386; // 1 euro equivale a 166.386 pesetas
    }
  
    // Función para convertir de pesetas a euros
    function pesetasToEuros(pesetas) {
      return pesetas / 166.386; // 1 peseta equivale a 0.006 euros
    }
  
    // Función para agregar una conversión al historial y guardar en localStorage
    function agregarAlHistorial(euros, pesetas) {
      var fecha = new Date().toLocaleString(); // Obtener fecha y hora actual
      var conversion = {
        euros: euros.toFixed(2),
        pesetas: pesetas.toFixed(2),
        fecha: fecha
      };
      historialConversiones.push(conversion);
      localStorage.setItem('historialConversiones', JSON.stringify(historialConversiones)); // Guardar en localStorage
      actualizarHistorial();
    }
  
    // Función para actualizar el contenido del historial en la página
    function actualizarHistorial() {
      historialUl.innerHTML = ''; // Limpiar la lista antes de actualizar
      historialConversiones.forEach(function(conversion) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${conversion.euros}</strong> euros = <strong>${conversion.pesetas}</strong> pesetas (${conversion.fecha})`;
        historialUl.appendChild(li);
      });
    }
  
    // Escuchar el evento de submit del formulario
    calcularBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe
      var euros = parseFloat(eurosInput.value);
      var pesetas = parseFloat(pesetasInput.value);
  
      if (!isNaN(euros)) {
        pesetasInput.value = eurosToPesetas(euros).toFixed(2); // Mostrar pesetas con dos decimales
        agregarAlHistorial(euros, eurosToPesetas(euros)); // Agregar conversión al historial
      }
  
      if (!isNaN(pesetas)) {
        eurosInput.value = pesetasToEuros(pesetas).toFixed(2); // Mostrar euros con dos decimales
        agregarAlHistorial(pesetasToEuros(pesetas), pesetas); // Agregar conversión al historial
      }
    });
  
    // Escuchar el evento click en el botón de borrar historial
    borrarHistorialBtn.addEventListener('click', function() {
      historialConversiones = []; // Vaciar arreglo de historial
      localStorage.removeItem('historialConversiones'); // Eliminar historial de localStorage
      actualizarHistorial(); // Actualizar el contenido del historial en la página
    });
  
    // Cargar historial al cargar la página por primera vez
    actualizarHistorial();
  });
  