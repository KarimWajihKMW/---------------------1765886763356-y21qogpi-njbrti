const professionals = [
    {
        id: 1,
        name: "أحمد محمد",
        job: "plumber",
        jobTitle: "سباك محترف",
        rating: 4.8,
        reviews: 124,
        price: "50 ر.س / ساعة",
        location: "الرياض",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["صيانة", "تركيبات", "طوارئ"]
    },
    {
        id: 2,
        name: "سعيد العلي",
        job: "electrician",
        jobTitle: "فني كهرباء",
        rating: 4.5,
        reviews: 89,
        price: "60 ر.س / ساعة",
        location: "جدة",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        tags: ["تأسيس", "إضاءة"]
    },
    {
        id: 3,
        name: "ورشة الأمانة (خالد)",
        job: "carpenter",
        jobTitle: "نجار وديكور",
        rating: 4.9,
        reviews: 210,
        price: "حسب الاتفاق",
        location: "الدمام",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        tags: ["غرف نوم", "أبواب", "مطابخ"]
    },
    {
        id: 4,
        name: "محمود حسن",
        job: "plumber",
        jobTitle: "سباك عام",
        rating: 4.2,
        reviews: 45,
        price: "45 ر.س / ساعة",
        location: "الرياض",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        tags: ["تسريبات", "خزانات"]
    },
    {
        id: 5,
        name: "مؤسسة النور",
        job: "electrician",
        jobTitle: "مهندس كهرباء",
        rating: 4.7,
        reviews: 156,
        price: "80 ر.س / ساعة",
        location: "مكة",
        image: "https://randomuser.me/api/portraits/men/64.jpg",
        tags: ["مخططات", "أحمال عالية"]
    },
    {
        id: 6,
        name: "يوسف العمري",
        job: "carpenter",
        jobTitle: "فني نجارة",
        rating: 3.9,
        reviews: 20,
        price: "40 ر.س / ساعة",
        location: "الرياض",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        tags: ["إصلاحات بسيطة"]
    },
    {
        id: 7,
        name: "شركة البرودة",
        job: "ac",
        jobTitle: "فني تكييف وتبريد",
        rating: 4.6,
        reviews: 312,
        price: "150 ر.س / زيارة",
        location: "جدة",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
        tags: ["سبليت", "مركزي", "صيانة"]
    },
    {
        id: 8,
        name: "أبو ماجد للدهانات",
        job: "painter",
        jobTitle: "دهان منازل",
        rating: 4.3,
        reviews: 55,
        price: "20 ر.س / متر",
        location: "الرياض",
        image: "https://randomuser.me/api/portraits/men/78.jpg",
        tags: ["ديكور", "خارجي", "ورق جدران"]
    },
    {
        id: 9,
        name: "سريع لمكافحة الحشرات",
        job: "pest_control",
        jobTitle: "خبير مكافحة",
        rating: 4.9,
        reviews: 420,
        price: "300 ر.س / شقة",
        location: "الدمام",
        image: "https://randomuser.me/api/portraits/men/90.jpg",
        tags: ["نمل أبيض", "صراصير", "ضمان"]
    },
    {
        id: 10,
        name: "نقليات السعادة",
        job: "mover",
        jobTitle: "نقل عفش",
        rating: 4.0,
        reviews: 15,
        price: "حسب الاتفاق",
        location: "الرياض",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
        tags: ["فك وتركيب", "تغليف", "نقل"]
    },
    {
        id: 11,
        name: "أمينة للنظافة",
        job: "cleaning",
        jobTitle: "عاملة نظافة بالساعة",
        rating: 4.8,
        reviews: 98,
        price: "35 ر.س / ساعة",
        location: "جدة",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        tags: ["منزل", "مكتب", "تعقيم"]
    }
];

// State
let currentCategory = 'all';
let currentRating = 0;
let currentCity = 'all';
let searchTerm = '';

// DOM Elements
const grid = document.getElementById('professionals-grid');
const countSpan = document.getElementById('count');
const emptyState = document.getElementById('empty-state');
const bookingModal = document.getElementById('booking-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalJob = document.getElementById('modal-job');
const searchInput = document.getElementById('searchName');
const cityFilter = document.getElementById('cityFilter');
const notification = document.getElementById('notification');
const bookingForm = document.getElementById('booking-form');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    if(grid) {
        renderList();
        
        // Search Listener
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            renderList();
        });

        // Form Submit
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            showNotification();
            bookingForm.reset();
        });
    }
});

// Render Function
function renderList() {
    grid.innerHTML = '';
    
    const filtered = professionals.filter(pro => {
        const matchCategory = currentCategory === 'all' || pro.job === currentCategory;
        const matchRating = pro.rating >= currentRating;
        const matchCity = currentCity === 'all' || pro.location === currentCity;
        const matchSearch = pro.name.toLowerCase().includes(searchTerm) || pro.jobTitle.toLowerCase().includes(searchTerm);
        return matchCategory && matchRating && matchSearch && matchCity;
    });

    countSpan.textContent = filtered.length;

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        filtered.forEach(pro => {
            const card = createCard(pro);
            grid.appendChild(card);
        });
    }
}

// Create HTML Card
function createCard(pro) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col';
    
    // Stars Generator
    const stars = Array(5).fill(0).map((_, i) => 
        `<svg class="w-4 h-4 ${i < Math.floor(pro.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
    ).join('');

    div.innerHTML = `
        <div class="p-6">
            <div class="flex items-start justify-between">
                <div class="flex gap-4">
                    <img src="${pro.image}" alt="${pro.name}" class="w-16 h-16 rounded-full object-cover border-2 border-indigo-50">
                    <div>
                        <h3 class="font-bold text-gray-900 text-lg">${pro.name}</h3>
                        <p class="text-indigo-600 text-sm font-medium mb-1">${pro.jobTitle}</p>
                        <div class="flex items-center gap-1 mb-1">
                            <div class="flex">${stars}</div>
                            <span class="text-xs text-gray-400">(${pro.reviews})</span>
                        </div>
                        <p class="text-xs text-gray-500 flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            ${pro.location}
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2">
                ${pro.tags.map(tag => `<span class="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="mt-auto bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span class="font-bold text-gray-900">${pro.price}</span>
            <button onclick="openModal(${pro.id})" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition transform active:scale-95">
                حجز موعد
            </button>
        </div>
    `;
    return div;
}

// Filter Handlers
function filterByCategory(category) {
    currentCategory = category;
    // Highlight active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        if(btn.textContent.includes(getCategoryLabel(category))) {
            // Basic logic to show active state roughly (UI handles better with CSS classes usually)
            btn.classList.add('bg-white', 'text-indigo-800');
            btn.classList.remove('bg-white/10', 'text-white');
        } else {
             // This part is simplified for demo; ideally we use ID or data-attributes
        }
    });
    renderList();
}

// Helper for labels (simplified)
function getCategoryLabel(cat) {
    // This is just a helper for the button logic above if needed
    return ''; 
}

function filterByRating(rating) {
    currentRating = rating;
    renderList();
}

function filterByCity() {
    currentCity = cityFilter.value;
    renderList();
}

function resetFilters() {
    currentCategory = 'all';
    currentRating = 0;
    currentCity = 'all';
    searchTerm = '';
    searchInput.value = '';
    cityFilter.value = 'all';
    
    const radios = document.getElementsByName('rating');
    for(let r of radios) r.checked = false;
    radios[2].checked = true; // Select 'All'

    renderList();
}

// Modal Handlers
function openModal(id) {
    const pro = professionals.find(p => p.id === id);
    if (!pro) return;

    modalName.textContent = pro.name;
    modalJob.textContent = pro.jobTitle;
    modalImg.src = pro.image;
    
    bookingModal.classList.remove('hidden');
}

function closeModal() {
    bookingModal.classList.add('hidden');
}

if(bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeModal();
    });
}

// Notification
function showNotification() {
    notification.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        notification.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}