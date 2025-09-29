let currentPlaca = '';
let currentData = {};

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

function validateAndGenerate() {
    const placa = document.getElementById('placa-input').value.trim();
    const nombre = document.getElementById('nombre-input').value.trim();
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
    
    const autorizacion = document.getElementById('autorizacion-input').value.trim();
    const caducidad = document.getElementById('caducidad-input').value;
    const message = document.getElementById('result-message');
    const qrContainer = document.getElementById('qr-container');
    const authDetails = document.getElementById('auth-details');

    message.textContent = '';
    message.className = '';
    qrContainer.style.display = 'none';
    authDetails.style.display = 'none';

    if (!nombre || !autorizacion || !caducidad || !tipoID ||
        (tipoID === 'cedula' && !cedula) ||
        (tipoID === 'ruc' && !ruc) ||
        (tipoID === 'ambos' && (!cedula || !ruc))) {
        message.textContent = 'Por favor, complete todos los campos requeridos.';
        message.className = 'error';
        return;
    }

    // Validar que la fecha no sea del pasado
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer a inicio del día
    const selectedDate = new Date(caducidad);
    
    if (selectedDate < today) {
        message.textContent = 'La fecha de vigencia no puede ser anterior a la fecha actual.';
        message.className = 'error';
        return;
    }

    if (tipoID === 'cedula' || tipoID === 'ambos') {
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
    }
    if (tipoID === 'ruc' || tipoID === 'ambos') {
        if (ruc.length !== 13) {
            message.textContent = 'El RUC debe tener exactamente 13 dígitos.';
            message.className = 'error';
            return;
        }
    }

    currentPlaca = placa;
    currentData = { placa, nombre, cedula, ruc, autorizacion, caducidad };

    // Actualizar detalles mostrados
    document.getElementById('auth-placa').textContent = placa;
    document.getElementById('auth-nombre').textContent = nombre;
    document.getElementById('auth-cedula').textContent = cedula || 'No disponible';
    document.getElementById('auth-ruc').textContent = ruc || 'No disponible';
    document.getElementById('auth-autorizacion').textContent = autorizacion;
    document.getElementById('auth-caducidad').textContent = caducidad;

    message.textContent = '✅ Placa autorizada. Generando QR...';
    message.className = 'success';

    // Simular un pequeño delay como si fuera una API real
    setTimeout(() => {
        generateQR();
        authDetails.style.display = 'block';
        message.textContent = '';
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
    baseUrl = baseUrl.replace('localhost', '192.168.137.213').replace('127.0.0.1', '192.168.137.213');
    const authUrl = `${baseUrl}?placa=${encodeURIComponent(currentPlaca)}&nombre=${encodeURIComponent(currentData.nombre)}&cedula=${encodeURIComponent(currentData.cedula)}&ruc=${encodeURIComponent(currentData.ruc)}&autorizacion=${encodeURIComponent(currentData.autorizacion)}&caducidad=${encodeURIComponent(currentData.caducidad)}`;

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
    doc.text('AUTORIZACIÓN', 105, 25, { align: 'center' });

    // Número de autorización
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(currentData.autorizacion, 105, 35, { align: 'center' });

    // Línea separadora
    doc.line(20, 45, 190, 45);

    // Mensaje principal - unificado
    doc.setFontSize(12);
    
    // Determinar qué mostrar en cédula/RUC
    let identificacion = '';
    if (currentData.cedula && currentData.ruc) {
        identificacion = `cédula ${currentData.cedula} / RUC ${currentData.ruc}`;
    } else if (currentData.cedula) {
        identificacion = `cédula ${currentData.cedula}`;
    } else if (currentData.ruc) {
        identificacion = `RUC ${currentData.ruc}`;
    } else {
        identificacion = 'No disponible';
    }

    const mensaje = `Estimado/a ${currentData.nombre} con la ${identificacion}, este mensaje es para indicarle que se ha emitido la autorización correspondiente desde la autoridad de tránsito Emovip EP Ecuador.`;

    const lines = doc.splitTextToSize(mensaje, 150);
    doc.text(lines, 20, 60);

    // Detalles de la autorización
    let y = 60 + (lines.length * 6) + 15;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text('DETALLES DE LA AUTORIZACIÓN:', 20, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`• Placa: ${currentData.placa}`, 25, y);
    y += 8;
    doc.text(`• Nombres: ${currentData.nombre}`, 25, y);
    y += 8;
    doc.text(`• Cédula: ${currentData.cedula || 'No disponible'}`, 25, y);
    y += 8;
    doc.text(`• RUC: ${currentData.ruc || 'No disponible'}`, 25, y);
    y += 8;
    doc.text(`• Vigencia: ${currentData.caducidad}`, 25, y);

    // Pie de página
    doc.line(20, 260, 190, 260);
    doc.setFontSize(8);
    doc.text('Emovip EP Ecuador', 105, 270, { align: 'center' });
    doc.text('gerencia@act.gob.ec', 105, 275, { align: 'center' });

    // Fecha actual
    const now = new Date();
    doc.text(`Fecha de emisión: ${now.toLocaleDateString('es-EC')} ${now.toLocaleTimeString('es-EC')}`, 105, 285, { align: 'center' });

    // Descargar PDF
    doc.save(`Autorizacion_${currentData.placa}_${currentData.nombre}.pdf`);
}

// Mostrar detalles si se accede con parámetros de URL (cuando se escanea el QR)
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const placa = urlParams.get('placa');
    const nombre = urlParams.get('nombre');
    const cedula = urlParams.get('cedula');
    const ruc = urlParams.get('ruc');
    const autorizacion = urlParams.get('autorizacion');
    const caducidad = urlParams.get('caducidad');

    // Mostrar detalles si hay placa, nombre, autorizacion, caducidad y al menos uno de cedula o ruc
    if (
        placa && nombre && autorizacion && caducidad &&
        (cedula || ruc)
    ) {
        currentData = { placa, nombre, cedula, ruc, autorizacion, caducidad };
        currentPlaca = placa;

        document.getElementById('input-section').style.display = 'none';
        document.getElementById('auth-details').style.display = 'block';
        document.getElementById('qr-container').style.display = 'none';

        document.getElementById('auth-placa').textContent = placa;
        document.getElementById('auth-nombre').textContent = nombre;
        document.getElementById('auth-cedula').textContent = cedula || 'No disponible';
        document.getElementById('auth-ruc').textContent = ruc || 'No disponible';
        document.getElementById('auth-autorizacion').textContent = autorizacion;
        document.getElementById('auth-caducidad').textContent = caducidad;

        document.getElementById('result-message').textContent = `✅ Autorización válida para placa: ${placa}`;
        document.getElementById('result-message').className = 'success';
    }

    // Establecer fecha mínima como hoy en el input de fecha
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('caducidad-input').min = today;

    // Actualizar fecha actual en el footer
    const now = new Date();
    const fechaActual = now.toLocaleDateString('es-EC') + ', ' + now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-date').textContent = `Fecha: ${fechaActual}`;
};