function showSection(section) {
    const sections = ['stats', 'users', 'professionals', 'transactions'];
    const titles = {
        'stats': 'نظرة عامة',
        'users': 'إدارة المستخدمين',
        'professionals': 'إدارة المهنيين',
        'transactions': 'العمليات المالية'
    };

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
        link.classList.remove('bg-indigo-600');
        link.classList.add('hover:bg-slate-700');
    });

    event.target.closest('.nav-link').classList.add('bg-indigo-600');
    event.target.closest('.nav-link').classList.remove('hover:bg-slate-700');

    document.getElementById('section-title').textContent = titles[section];
}

function approvePro(id) {
    if (confirm('هل أنت متأكد من الموافقة على هذا المهني؟')) {
        showNotification('تمت الموافقة بنجاح', 'success');
        setTimeout(() => {
            event.target.closest('tr').remove();
        }, 500);
    }
}

function rejectPro(id) {
    if (confirm('هل أنت متأكد من رفض هذا المهني؟')) {
        showNotification('تم الرفض', 'error');
        setTimeout(() => {
            event.target.closest('tr').remove();
        }, 500);
    }
}

function viewUser(id) {
    showNotification('عرض تفاصيل المستخدم #' + id, 'info');
}

function viewPro(id) {
    showNotification('عرض تفاصيل المهني #' + id, 'info');
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