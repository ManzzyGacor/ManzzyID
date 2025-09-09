// Menunggu hingga DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi komponen
    initLoadingScreen();
    initSmoothScrolling();
    initMobileMenu();
    initProductButtons();
    initPopupClose();
    initFloatingElements();
});

// Fungsi untuk mengatur loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulasi loading
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3500);
}

// Fungsi untuk smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Tutup mobile menu jika terbuka
                const nav = document.querySelector('.nav ul');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
}

// Fungsi untuk mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav ul');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
}

// Fungsi untuk animasi elemen mengambang
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
        // Set random delay untuk setiap elemen
        const randomDelay = Math.random() * 5;
        element.style.animationDelay = `${randomDelay}s`;
    });
}

// Variabel untuk menyimpan data produk yang dipilih
let selectedProduct = null;

// Fungsi untuk tombol produk
function initProductButtons() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const purchasePopup = document.getElementById('purchase-popup');
    const loadingPopup = document.getElementById('loading-popup');
    const popupProductName = document.getElementById('popup-product-name');
    const popupProductPrice = document.getElementById('popup-product-price');
    const confirmPurchaseBtn = document.getElementById('confirm-purchase');
    const cancelBtn = document.querySelector('.cancel-btn');
    const closePopupBtn = document.querySelector('.close-popup');
    
    // Buka popup saat tombol beli diklik
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            // Simpan data produk yang dipilih
            selectedProduct = {
                name: productName,
                price: formatPrice(productPrice)
            };
            
            // Tampilkan data di popup
            popupProductName.textContent = productName;
            popupProductPrice.textContent = formatPrice(productPrice);
            
            // Tampilkan popup
            purchasePopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Tombol konfirmasi pembelian
    confirmPurchaseBtn.addEventListener('click', function() {
        if (selectedProduct) {
            // Redirect ke WhatsApp
            redirectToWhatsApp(selectedProduct);
        }
    });
    
    // Tombol batal
    cancelBtn.addEventListener('click', closePopup);
    closePopupBtn.addEventListener('click', closePopup);
    
    // Tutup popup saat klik di luar konten
    window.addEventListener('click', function(e) {
        if (e.target === purchasePopup) {
            closePopup();
        }
    });
}

// Fungsi untuk menutup popup
function closePopup() {
    const purchasePopup = document.getElementById('purchase-popup');
    purchasePopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fungsi untuk format harga
function formatPrice(price) {
    return 'Rp ' + parseInt(price).toLocaleString('id-ID');
}

// Fungsi untuk redirect ke WhatsApp
function redirectToWhatsApp(product) {
    // Nomor WhatsApp (ganti dengan nomor yang sesuai)
    const phoneNumber = '62895605053911';
    
    // Pesan yang akan dikirim
    const message = `Halo, saya ingin membeli produk:\n\n*${product.name}*\nHarga: ${product.price}\n\nSaya akan melakukan pembayaran melalui QRIS.`;
    
    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect ke WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Tambahkan styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ?
        'linear-gradient(135deg, var(--anemo), var(--electro))' :
        'linear-gradient(135deg, var(--pyro), #e53935)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '1002';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    document.body.appendChild(notification);
    
    // Tampilkan notifikasi
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Efek parallax pada hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
    }
});