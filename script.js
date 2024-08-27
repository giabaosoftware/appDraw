document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const captureButton = document.getElementById('captureButton');
    const resetButton = document.getElementById('resetButton');

    // Đặt kích thước canvas
    const scaleFactor = 2;
    canvas.width = window.innerWidth * scaleFactor;
    canvas.height = window.innerHeight * scaleFactor;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.scale(scaleFactor, scaleFactor);

    // Hàm để thiết lập nền trắng cho canvas
    function setCanvasBackground() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);
    }

    // Danh sách các đường dẫn tới các tệp SVG
    const svgUrls = [
        'icon1.svg',
        'icon2.svg',
        'icon3.svg',
        'icon4.svg',
        // Thêm các đường dẫn SVG khác vào đây
    ];

    // Hàm vẽ hình SVG lên canvas với khả năng xoay ngẫu nhiên
    function drawSVG(image, x, y, width, height, angle) {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.restore();
    }

    // Tải và vẽ SVG ngẫu nhiên
    function loadAndDrawSVG() {
        const svgUrl = svgUrls[Math.floor(Math.random() * svgUrls.length)];
        const image = new Image();
        image.src = svgUrl;

        image.onload = function() {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 20 + 20; // Kích thước từ 20 đến 40
            const angle = Math.random() * 2 * Math.PI; // Góc quay ngẫu nhiên từ 0 đến 2π
            drawSVG(image, x, y, size, size, angle);
        };
    }

    // Vẽ nền trắng và 100 SVG ngẫu nhiên
    function drawCanvas() {
        setCanvasBackground();
        for (let i = 0; i < 2500; i++) {
            loadAndDrawSVG();
        }
    }

    drawCanvas();

    // Tải lại canvas khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth * scaleFactor;
        canvas.height = window.innerHeight * scaleFactor;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.scale(scaleFactor, scaleFactor);
        drawCanvas();
    });

    // Chức năng chụp và lưu trữ hình ảnh
    captureButton.addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'hinh_canvas.png';
        link.click();
    });

    // Chức năng reset canvas
    resetButton.addEventListener('click', function() {
        drawCanvas();
    });
});
