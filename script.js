let currentPlaca = '';
let currentData = {};

function validateAndGenerate() {
    const placa = document.getElementById('placa-input').value.trim();
    const nombre = document.getElementById('nombre-input').value.trim();
    const apellido = document.getElementById('apellido-input').value.trim();
    const cedula = document.getElementById('cedula-input').value.trim();
    const message = document.getElementById('result-message');
    const qrContainer = document.getElementById('qr-container');
    const authDetails = document.getElementById('auth-details');

    message.textContent = '';
    message.className = '';
    qrContainer.style.display = 'none';
    authDetails.style.display = 'none';

    if (!placa || !nombre || !apellido || !cedula) {
        message.textContent = 'Por favor, complete todos los campos.';
        message.className = 'error';
        return;
    }

    // Validación de formato de placa ecuatoriana
    const placaRegex = /^[A-Z]{3}[0-9]{4}$/;
    if (!placaRegex.test(placa)) {
        message.textContent = 'La placa debe tener el formato ABC1234 (3 letras y 4 números).';
        message.className = 'error';
        return;
    }

    // Validación de cédula ecuatoriana (10 dígitos)
    if (cedula.length !== 10) {
        message.textContent = 'La cédula debe tener exactamente 10 dígitos.';
        message.className = 'error';
        return;
    }

    // Validación básica de cédula ecuatoriana
    if (!validateEcuadorianID(cedula)) {
        message.textContent = 'La cédula ingresada no es válida.';
        message.className = 'error';
        return;
    }

    // Simulación de validación exitosa (modo de prueba)
    // En lugar de hacer fetch a una API inexistente, validamos localmente
    currentPlaca = placa;
    currentData = { placa, nombre, apellido, cedula };

    document.getElementById('auth-placa').textContent = placa;
    document.getElementById('auth-nombre').textContent = nombre;
    document.getElementById('auth-apellido').textContent = apellido;
    document.getElementById('auth-cedula').textContent = cedula;

    message.textContent = '✅ Placa autorizada. Generando QR...';
    message.className = 'success';

    // Simular un pequeño delay como si fuera una API real
    setTimeout(() => {
        generateQR();
        authDetails.style.display = 'block';
    }, 1000);
}

function validateEcuadorianID(cedula) {
    // Solo verifica que tenga 10 dígitos y empiece con 09
    return /^\d{10}$/.test(cedula) && cedula.startsWith('09');
}

function generateQR() {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    qrContainer.style.display = 'flex';
    qrContainer.style.justifyContent = 'center';
    qrContainer.style.alignItems = 'center';

    // Reemplaza localhost y 127.0.0.1 por tu IP local
    let baseUrl = window.location.href.split('?')[0];
    baseUrl = baseUrl.replace('localhost', '192.168.137.86').replace('127.0.0.1', '192.168.137.86');
    const authUrl = `${baseUrl}?placa=${encodeURIComponent(currentPlaca)}&nombre=${encodeURIComponent(currentData.nombre)}&apellido=${encodeURIComponent(currentData.apellido)}&cedula=${encodeURIComponent(currentData.cedula)}`;

    new QRCode(qrContainer, {
        text: authUrl,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('qr-container').style.display = 'block';
}

function downloadQR() {
    if (!currentPlaca) {
        alert('Primero genere un QR válido.');
        return;
    }
    const qrCanvas = document.querySelector('#qrcode canvas');
    if (!qrCanvas) {
        alert('No se encontró el QR para descargar.');
        return;
    }
    const link = document.createElement('a');
    link.download = `placa_${currentPlaca}.png`;
    link.href = qrCanvas.toDataURL('image/png');
    link.click();
}

function generatePDF() {
    if (!window.jspdf) {
        alert('Error: La librería jsPDF no está disponible.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurar fuente
    doc.setFont("helvetica");

    // Encabezado
    doc.setFontSize(18);
    doc.setTextColor(0, 77, 153);
    doc.text('AUTORIZACIÓN DE CIRCULACIÓN', 105, 25, { align: 'center' });

    // Número de documento
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('No. ACT-EP-DPOTTM-016-2025-ACVIL', 105, 35, { align: 'center' });

    // Línea separadora
    doc.line(20, 45, 190, 45);

    // Mensaje principal
    doc.setFontSize(12);
    const mensaje = `Estimado/a ${currentData.nombre} ${currentData.apellido} con la cédula ${currentData.cedula}, este mensaje es para indicarle que queda autorizada su placa ${currentData.placa} desde la Autoridad de Control de Tránsito (ACT).`;

    const lines = doc.splitTextToSize(mensaje, 150);
    doc.text(lines, 20, 60);

    // Detalles de la autorización
    let y = 85;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text('DETALLES DE LA AUTORIZACIÓN:', 20, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`• Placa: ${currentData.placa}`, 25, y);
    y += 8;
    doc.text(`• Propietario: ${currentData.nombre} ${currentData.apellido}`, 25, y);
    y += 8;
    doc.text(`• Cédula: ${currentData.cedula}`, 25, y);
    y += 8;
    doc.text('• Validez: 1 al 30 de septiembre de 2025', 25, y);
    y += 8;
    doc.text('• Horario: 14:00 a 23:00', 25, y);

    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text('RUTA AUTORIZADA:', 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    const ruta = 'Av. Galo Plaza Lasso → Av. Cristóbal Colón (derecha) → Av. Julio Arosemena Monroy/Babahoyo → Av. Galo Plaza Lasso';
    const rutaLines = doc.splitTextToSize(ruta, 150);
    doc.text(rutaLines, 25, y);

    y += rutaLines.length * 6 + 10;
    doc.setFont("helvetica", "bold");
    doc.text('REPRESENTANTE:', 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text('Marco Ramiro Vargas Tixe', 25, y);

    // Condiciones
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text('CONDICIONES:', 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const condiciones = 'Los conductores deberán portar la autorización. Sanciones según Ordenanza GADMM #38-2023 y #40-2023.';
    const condicionesLines = doc.splitTextToSize(condiciones, 150);
    doc.text(condicionesLines, 25, y);

    // Pie de página
    doc.line(20, 260, 190, 260);
    doc.setFontSize(8);
    doc.text('EMOVIM-EP | Av. Simón Bolívar y Juan Montalvo | Milagro, Ecuador', 105, 270, { align: 'center' });
    doc.text('genercia@emovim-ep.gob.ec', 105, 275, { align: 'center' });

    // Fecha actual
    const now = new Date();
    doc.text(`Fecha de emisión: ${now.toLocaleDateString('es-EC')} ${now.toLocaleTimeString('es-EC')}`, 105, 285, { align: 'center' });

    // Descargar PDF
    doc.save(`Autorizacion_${currentData.placa}_${currentData.nombre}_${currentData.apellido}.pdf`);
}

// Mostrar detalles si se accede con parámetros de URL (cuando se escanea el QR)
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const placa = urlParams.get('placa');
    const nombre = urlParams.get('nombre');
    const apellido = urlParams.get('apellido');
    const cedula = urlParams.get('cedula');

    if (placa && nombre && apellido && cedula) {
        // Configurar datos para vista de QR escaneado
        currentData = { placa, nombre, apellido, cedula };
        currentPlaca = placa;

        // Mostrar solo los detalles y el botón para PDF
        document.getElementById('input-section').style.display = 'none';
        document.getElementById('auth-details').style.display = 'block';
        document.getElementById('qr-container').style.display = 'none';

        // Llenar los datos en la vista
        document.getElementById('auth-placa').textContent = placa;
        document.getElementById('auth-nombre').textContent = nombre;
        document.getElementById('auth-apellido').textContent = apellido;
        document.getElementById('auth-cedula').textContent = cedula;

        document.getElementById('result-message').textContent = `✅ Autorización válida para placa: ${placa}`;
        document.getElementById('result-message').className = 'success';
    }

    // Actualizar fecha actual en el footer
    const now = new Date();
    const fechaActual = now.toLocaleDateString('es-EC') + ', ' + now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-date').textContent = `Fecha: ${fechaActual}`;
};

