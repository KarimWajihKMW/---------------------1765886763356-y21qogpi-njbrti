function showProSection(section) {
    const sections = ['overview', 'schedule', 'earnings'];
    
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
        link.classList.remove('bg-indigo-600', 'text-white');
        link.classList.add('hover:bg-slate-800');
    });

    event.target.closest('.nav-link').classList.add('bg-indigo-600', 'text-white');
    event.target.closest('.nav-link').classList.remove('hover:bg-slate-800');
}

function acceptRequest(id) {
    if (confirm('هل تريد قبول هذا الطلب؟')) {
        showNotification('تم قبول الطلب بنجاح! سيتم إضافته إلى جدولك', 'success');
        setTimeout(() => {
            event.target.closest('.grid > div').remove();
        }, 500);
    }
}

function rejectRequest(id) {
    if (confirm('هل تريد رفض هذا الطلب؟')) {
        showNotification('تم رفض الطلب', 'error');
        setTimeout(() => {
            event.target.closest('.grid > div').remove();
        }, 500);
    }
}

function viewAppointment(id) {
    showNotification('عرض تفاصيل الموعد #' + id, 'info');
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