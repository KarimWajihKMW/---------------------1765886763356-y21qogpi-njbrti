function showClientSection(section) {
    const sections = ['dashboard', 'orders', 'profile'];
    
    sections.forEach(s => {
        const element = document.getElementById(`${s}-section`);
        if (element) {
            if (s === section) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('bg-indigo-50', 'text-indigo-700');
        link.classList.add('text-gray-600');
    });

    event.target.closest('.nav-link').classList.add('bg-indigo-50', 'text-indigo-700');
    event.target.closest('.nav-link').classList.remove('text-gray-600');
}

function contactPro() {
    showNotification('تم فتح نافذة المراسلة', 'info');
}

function cancelOrder() {
    if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
        showNotification('تم إلغاء الطلب بنجاح', 'success');
    }
}

function saveProfile(e) {
    e.preventDefault();
    showNotification('تم حفظ التغييرات بنجاح', 'success');
}

function showNotification(message, type = 'success') {
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'info': 'bg-blue-500'
    };

    const notification = document.createElement('div');
    notification.className = `fixed bottom-8 right-8 ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 transform transition-all duration-300`;
    notification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span class="font-bold">${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}