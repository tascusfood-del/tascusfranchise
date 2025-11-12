// ===================== SIMPLE STORE LOCATOR JS =====================

let map;
let markers = [];
let currentInfoWindow = null;

// Dữ liệu cửa hàng (thay bằng data thật của bạn)
const stores = [
    {
        id: 1,
        name: "HIGHLANDS COFFEE 270 VÕ THỊ SÁU - QUẬN 3",
        address: "270L Võ Thị Sáu, Phường 7, Quận 3, TP. Hồ Chí Minh",
        phone: "028 7300 3426",
        hours: "7:00 – 23:00 • 7 ngày/tuần",
        lat: 10.7833,
        lng: 106.6904,
        features: ["wifi", "card"],
        status: "OPEN"
    },
    {
        id: 2,
        name: "HIGHLANDS COFFEE LƯƠNG KHẢI SIÊU - THỦ ĐỨC",
        address: "6 Lương Khải Siêu, Phường Bình Thọ, Tp. Thủ Đức, TP Hồ Chí Minh",
        phone: "028 7300 3007",
        hours: "7:00 – 23:00 • 7 ngày/tuần",
        lat: 10.8468,
        lng: 106.7627,
        features: ["wifi", "card"],
        status: "OPEN"
    },
    {
        id: 3,
        name: "HIGHLANDS COFFEE TRẦN HƯNG ĐẠO - QUẬN 1",
        address: "123 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
        phone: "028 7300 3008",
        hours: "6:30 – 23:30 • 7 ngày/tuần",
        lat: 10.7626,
        lng: 106.6879,
        features: ["wifi", "card", "parking"],
        status: "OPEN"
    },
    {
        id: 4,
        name: "HIGHLANDS COFFEE NGUYỄN HUỆ - QUẬN 1",
        address: "45 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
        phone: "028 7300 3009",
        hours: "7:00 – 23:00 • 7 ngày/tuần",
        lat: 10.7744,
        lng: 106.7033,
        features: ["wifi", "card"],
        status: "OPEN"
    },
    {
        id: 5,
        name: "HIGHLANDS COFFEE LÊ LỢI - QUẬN 1",
        address: "78 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
        phone: "028 7300 3010",
        hours: "7:00 – 22:30 • 7 ngày/tuần",
        lat: 10.7724,
        lng: 106.6988,
        features: ["wifi", "card"],
        status: "OPEN"
    },
    {
        id: 6,
        name: "HIGHLANDS COFFEE PASTEUR - QUẬN 1",
        address: "145 Pasteur, Quận 1, TP. Hồ Chí Minh",
        phone: "028 7300 3011",
        hours: "7:00 – 23:00 • 7 ngày/tuần",
        lat: 10.7813,
        lng: 106.6954,
        features: ["wifi", "card"],
        status: "OPEN"
    }
];

// Khởi tạo bản đồ
function initMap() {
    // Tâm bản đồ là TP.HCM
    const centerLocation = { lat: 10.7769, lng: 106.7009 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: centerLocation,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });
    
    // Render danh sách cửa hàng
    renderStoreList();
    
    // Thêm markers lên bản đồ
    addMarkersToMap();
}

// Render danh sách cửa hàng
function renderStoreList() {
    const storeListDiv = document.getElementById('store-list');
    document.getElementById('total-stores').textContent = stores.length;
    
    stores.forEach((store, index) => {
        const storeItem = document.createElement('div');
        storeItem.className = 'store-item';
        storeItem.id = `store-${store.id}`;
        
        // Tạo HTML cho mỗi cửa hàng
        storeItem.innerHTML = `
            <h3>${store.name}</h3>
            <p class="address">📍 ${store.address}</p>
            <p class="phone">📞 ${store.phone}</p>
            <p class="hours">🕐 ${store.hours}</p>
            <span class="status">${store.status}</span>
            <div class="features">
                ${store.features.includes('wifi') ? '<span class="feature-badge">📶 Wifi</span>' : ''}
                ${store.features.includes('card') ? '<span class="feature-badge">💳 Thẻ</span>' : ''}
                ${store.features.includes('parking') ? '<span class="feature-badge">🅿️ Đỗ xe</span>' : ''}
            </div>
        `;
        
        // Khi click vào cửa hàng, bản đồ sẽ chuyển đến vị trí đó
        storeItem.addEventListener('click', () => {
            selectStore(store, index);
        });
        
        storeListDiv.appendChild(storeItem);
    });
}

// Thêm markers lên bản đồ
function addMarkersToMap() {
    stores.forEach((store, index) => {
        const marker = new google.maps.Marker({
            position: { lat: store.lat, lng: store.lng },
            map: map,
            title: store.name,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        // Tạo info window cho marker
        const infoContent = `
            <div style="font-family: 'Nunito', sans-serif; padding: 10px; max-width: 250px;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333;">${store.name}</h3>
                <p style="margin: 5px 0; font-size: 13px; color: #666;">📍 ${store.address}</p>
                <p style="margin: 5px 0; font-size: 13px; color: #962b2d; font-weight: 600;">📞 ${store.phone}</p>
                <p style="margin: 5px 0; font-size: 12px; color: #888;">🕐 ${store.hours}</p>
            </div>
        `;
        
        const infoWindow = new google.maps.InfoWindow({
            content: infoContent
        });
        
        // Click vào marker cũng chọn cửa hàng
        marker.addListener('click', () => {
            selectStore(store, index);
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });
        
        markers.push({ marker: marker, infoWindow: infoWindow });
    });
}

// Chọn cửa hàng
function selectStore(store, index) {
    // Bỏ active class khỏi tất cả items
    document.querySelectorAll('.store-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Thêm active class cho item được chọn
    const selectedItem = document.getElementById(`store-${store.id}`);
    selectedItem.classList.add('active');
    
    // Scroll đến item trong list
    selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Di chuyển bản đồ đến vị trí cửa hàng
    map.setCenter({ lat: store.lat, lng: store.lng });
    map.setZoom(16);
    
    // Tạo hiệu ứng bounce cho marker
    const markerObj = markers[index];
    markerObj.marker.setAnimation(google.maps.Animation.BOUNCE);
    
    // Dừng bounce sau 2 giây
    setTimeout(() => {
        markerObj.marker.setAnimation(null);
    }, 2000);
    
    // Mở info window
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }
    markerObj.infoWindow.open(map, markerObj.marker);
    currentInfoWindow = markerObj.infoWindow;
}
