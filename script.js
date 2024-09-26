// Wait for the DOM to fully load
window.onload = function() {
    const form = document.getElementById('qrForm');
    const qrCanvas = document.getElementById('qrCanvas');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get user input
        const userInput = document.getElementById('user_input').value;

        // Clear any previous QR codes
        qrCanvas.innerHTML = '';

        // Generate QR code
        const qrCode = new QRCode(qrCanvas, {
            text: userInput,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Create PDF when the QR code is ready
        setTimeout(function() {
            const canvas = qrCanvas.querySelector('canvas');
            if (canvas) {
                const qrImage = canvas.toDataURL('image/png');

                // Create a PDF using jsPDF
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();

                // Add text and QR code image to PDF
                pdf.text('User Information:', 10, 10);
                pdf.text(userInput, 10, 20);
                pdf.addImage(qrImage, 'PNG', 10, 40, 50, 50);

                // Trigger download
                pdf.save('qr_code_info.pdf');
            }
        }, 1000);
    });
};
