let currentPlaca = '';
let currentData = {};

<<<<<<< HEAD
function mostrarInputID() {
    const tipo = document.getElementById('tipo-id').value;
    const container = document.getElementById('input-id-container');
    container.innerHTML = '';
    if (tipo === 'cedula') {
        container.innerHTML = `
            <label for="cedula-input">Cédula (10 dígitos)</label>
            <input type="text" id="cedula-input" placeholder="Cédula" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="10">
        `;
    } else if (tipo === 'ruc') {
        container.innerHTML = `
            <label for="ruc-input">RUC (13 dígitos)</label>
            <input type="text" id="ruc-input" placeholder="RUC" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="13">
        `;
    } else if (tipo === 'ambos') {
        container.innerHTML = `
            <label for="cedula-input">Cédula (10 dígitos)</label>
            <input type="text" id="cedula-input" placeholder="Cédula" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="10">
            <label for="ruc-input" style="margin-top:10px;">RUC (13 dígitos)</label>
            <input type="text" id="ruc-input" placeholder="RUC" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="13">
        `;
    }
}

=======
<<<<<<< HEAD
function toggleIDInput() {
    const tipo = document.getElementById('tipo-id').value;
    document.getElementById('cedula-group').style.display = (tipo === 'cedula' || tipo === 'ambos') ? 'block' : 'none';
    document.getElementById('ruc-group').style.display = (tipo === 'ruc' || tipo === 'ambos') ? 'block' : 'none';
}

=======
>>>>>>> c0e6bf26aa503f04c036ee9fdd8b8faac0f73109
>>>>>>> 88c9f5eaed5c05485a48625413aac8eeca746f34
function validateAndGenerate() {
    const placa = document.getElementById('placa-input').value.trim();
    const nombre = document.getElementById('nombre-input').value.trim();
    const apellido = document.getElementById('apellido-input').value.trim();
<<<<<<< HEAD
    const tipoID = document.getElementById('tipo-id').value;
    let cedula = '';
    let ruc = '';
    if (tipoID === 'cedula') {
        cedula = document.getElementById('cedula-input') ? document.getElementById('cedula-input').value.trim() : '';
    } else if (tipoID === 'ruc') {
        ruc = document.getElementById('ruc-input') ? document.getElementById('ruc-input').value.trim() : '';
    } else if (tipoID === 'ambos') {
        cedula = document.getElementById('cedula-input') ? document.getElementById('cedula-input').value.trim() : '';
        ruc = document.getElementById('ruc-input') ? document.getElementById('ruc-input').value.trim() : '';
    }
=======
<<<<<<< HEAD
    const tipoID = document.getElementById('tipo-id').value;
=======
>>>>>>> c0e6bf26aa503f04c036ee9fdd8b8faac0f73109
    const cedula = document.getElementById('cedula-input').value.trim();
    const ruc = document.getElementById('ruc-input').value.trim();
>>>>>>> 88c9f5eaed5c05485a48625413aac8eeca746f34
    const autorizacion = document.getElementById('autorizacion-input').value.trim();
    const caducidad = document.getElementById('caducidad-input').value;
    const message = document.getElementById('result-message');
    const qrContainer = document.getElementById('qr-container');
    const authDetails = document.getElementById('auth-details');

    message.textContent = '';
    message.className = '';
    qrContainer.style.display = 'none';
    authDetails.style.display = 'none';

<<<<<<< HEAD
    if (!nombre || !apellido || !autorizacion || !caducidad || !tipoID ||
        (tipoID === 'cedula' && !cedula) ||
        (tipoID === 'ruc' && !ruc) ||
        (tipoID === 'ambos' && (!cedula || !ruc))) {
        message.textContent = 'Por favor, complete todos los campos requeridos.';
=======
<<<<<<< HEAD
    if (!nombre || !apellido || !autorizacion || !caducidad || !tipoID) {
        message.textContent = 'Por favor, complete todos los campos y seleccione tipo de identificación.';
=======
    if (!nombre || !apellido || !cedula || !ruc || !autorizacion || !caducidad) {
        message.textContent = 'Por favor, complete todos los campos excepto placa.';
>>>>>>> c0e6bf26aa503f04c036ee9fdd8b8faac0f73109
>>>>>>> 88c9f5eaed5c05485a48625413aac8eeca746f34
        message.className = 'error';
        return;
    }

<<<<<<< HEAD
    if (tipoID === 'cedula' || tipoID === 'ambos') {
=======
<<<<<<< HEAD
    if (tipoID === 'cedula') {
        if (!cedula) {
            message.textContent = 'Ingrese la cédula.';
            message.className = 'error';
            return;
        }
>>>>>>> 88c9f5eaed5c05485a48625413aac8eeca746f34
        if (cedula.length !== 10) {
            message.textContent = 'La cédula debe tener exactamente 10 dígitos.';
            message.className = 'error';
            return;
        }
        if (!validateEcuadorianID(cedula)) {
            message.textContent = 'La cédula ingresada no es válida.';
            message.className = 'error';
            return;
        }
<<<<<<< HEAD
=======
    } else if (tipoID === 'ruc') {
        if (!ruc) {
            message.textContent = 'Ingrese el RUC.';
            message.className = 'error';
            return;
        }
        if (ruc.length !== 13) {
            message.textContent = 'El RUC debe tener exactamente 13 dígitos.';
            message.className = 'error';
            return;
        }
    } else if (tipoID === 'ambos') {
        if (!cedula || !ruc) {
            message.textContent = 'Ingrese ambos: cédula y RUC.';
            message.className = 'error';
            return;
        }
        if (cedula.length !== 10) {
            message.textContent = 'La cédula debe tener exactamente 10 dígitos.';
            message.className = 'error';
            return;
        }
        if (!validateEcuadorianID(cedula)) {
            message.textContent = 'La cédula ingresada no es válida.';
            message.className = 'error';
            return;
        }
        if (ruc.length !== 13) {
            message.textContent = 'El RUC debe tener exactamente 13 dígitos.';
            message.className = 'error';
            return;
        }
    }

    // Simulación de validación exitosa (modo de prueba)
    currentPlaca = placa;
    currentData = { placa, nombre, apellido, cedula: tipoID !== 'ruc' ? cedula : '', ruc: tipoID !== 'cedula' ? ruc : '', autorizacion, caducidad };
=======
    // Sin validación de formato para placa, se permite cualquier texto

    // Validación de cédula ecuatoriana (10 dígitos)
    if (cedula.length !== 10) {
        message.textContent = 'La cédula debe tener exactamente 10 dígitos.';
        message.className = 'error';
        return;
>>>>>>> 88c9f5eaed5c05485a48625413aac8eeca746f34
    }
    if (tipoID === 'ruc' || tipoID === 'ambos') {
        if (ruc.length !== 13) {
            message.textContent = 'El RUC debe tener exactamente 13 dígitos.';
            message.className = 'error';
            return;
        }
    }

    currentPlaca = placa;
    currentData = { placa, nombre, apellido, cedula, ruc, autorizacion, caducidad };
>>>>>>> c0e6bf26aa503f04c036ee9fdd8b8faac0f73109

    document.getElementById('auth-placa').textContent = placa;
    document.getElementById('auth-nombre').textContent = nombre;
    document.getElementById('auth-apellido').textContent = apellido;
<<<<<<< HEAD
    document.getElementById('auth-cedula').textContent = tipoID !== 'ruc' ? cedula : '';
    document.getElementById('auth-ruc').textContent = tipoID !== 'cedula' ? ruc : '';
=======
    document.getElementById('auth-cedula').textContent = cedula;
    document.getElementById('auth-ruc').textContent = ruc;
>>>>>>> c0e6bf26aa503f04c036ee9fdd8b8faac0f73109
    document.getElementById('auth-autorizacion').textContent = autorizacion;
    document.getElementById('auth-caducidad').textContent = caducidad;

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
    const authUrl = `${baseUrl}?placa=${encodeURIComponent(currentPlaca)}&nombre=${encodeURIComponent(currentData.nombre)}&apellido=${encodeURIComponent(currentData.apellido)}&cedula=${encodeURIComponent(currentData.cedula)}&ruc=${encodeURIComponent(currentData.ruc)}&autorizacion=${encodeURIComponent(currentData.autorizacion)}&caducidad=${encodeURIComponent(currentData.caducidad)}`;

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
    doc.text(`• Nombres: ${currentData.nombre}`, 25, y);
    y += 8;
    doc.text(`• Apellidos: ${currentData.apellido}`, 25, y);
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
    const ruc = urlParams.get('ruc');
    const autorizacion = urlParams.get('autorizacion');
    const caducidad = urlParams.get('caducidad');

    if (placa && nombre && apellido && cedula && ruc && autorizacion && caducidad) {
        // Configurar datos para vista de QR escaneado
        currentData = { placa, nombre, apellido, cedula, ruc, autorizacion, caducidad };
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
        document.getElementById('auth-ruc').textContent = ruc;
        document.getElementById('auth-autorizacion').textContent = autorizacion;
        document.getElementById('auth-caducidad').textContent = caducidad;

        document.getElementById('result-message').textContent = `✅ Autorización válida para placa: ${placa}`;
        document.getElementById('result-message').className = 'success';
    }

    // Actualizar fecha actual en el footer
    const now = new Date();
    const fechaActual = now.toLocaleDateString('es-EC') + ', ' + now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-date').textContent = `Fecha: ${fechaActual}`;
};

