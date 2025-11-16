// RTL (Right-to-Left) languages
const rtlLanguages = ['ar', 'ur', 'fa', 'he'];

// Dark mode functionality
function detectPreferredTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        return savedTheme;
    }

    // Check browser/OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
}

function changeTheme(theme) {
    applyTheme(theme);

    // Regenerate QR code with new colors
    if (typeof generateQRCode === 'function') {
        generateQRCode();
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
}

// Apply theme immediately to prevent flash
(function() {
    const theme = detectPreferredTheme();
    document.documentElement.setAttribute('data-theme', theme);
})();

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('preferredTheme');
        if (!savedTheme) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            if (typeof generateQRCode === 'function') {
                generateQRCode();
            }
        }
    });
}

// Multi-language content
const translations = {
    en: {
        title: "Our Manifest",
        paragraphs: [
            "I take a day off on the 29th of February.",
            "Every four years, the calendar grants us an extra day. A day that exists outside the normal rhythm of our lives. A day that appears as a gift from time itself. Why should we spend it working?",
            "February 29th should be a global day of rest, celebration, and reflection. A day to break from routine, to spend time with loved ones, to pursue passions, or simply to breathe. It's a day that reminds us that time is precious and should be celebrated, not just counted.",
            "Join us in making this vision a reality. Declare your intention. Take the leap day off. Share this movement. Together, we can transform February 29th into a day that belongs to everyone, everywhere."
        ],
        qrTitle: "Scan to Learn More",
        voteTitle: "Support This Message",
        voteButton: "Vote",
        voteCount: "Current votes:",
        donationTitle: "Support Us",
        donationText: "Bitcoin:",
        copyButton: "Copy Address",
        disclaimerLink: "Disclaimer",
        shareTitle: "Share this movement",
        shareText: "Take February 29th off! Join the My Day 29 movement and support making leap day a global day off.",
        shareNative: "Share",
        shareTwitter: "Twitter",
        shareFacebook: "Facebook",
        shareWhatsApp: "WhatsApp",
        shareTelegram: "Telegram",
        addToCalendar: "Add to Calendar"
    },
    uk: {
        title: "Наш Маніфест",
        paragraphs: [
            "Я беру вихідний 29 лютого.",
            "Кожні чотири роки календар дарує нам додатковий день. День, який існує поза звичайним ритмом нашого життя. День, що з'являється як подарунок від самого часу. Чому ми повинні проводити його за роботою?",
            "29 лютого має стати глобальним днем відпочинку, святкування та роздумів. Днем, щоб вирватися з рутини, провести час з близькими, займатися улюбленими справами або просто дихати. Це день, який нагадує нам, що час дорогоцінний і його слід святкувати, а не просто рахувати.",
            "Приєднуйтесь до нас у втіленні цього бачення в реальність. Заявіть про свій намір. Візьміть високосний день вільним. Поділіться цим рухом. Разом ми можемо перетворити 29 лютого на день, який належить кожному, всюди."
        ],
        qrTitle: "Сканувати для детальної інформації",
        voteTitle: "Підтримати це повідомлення",
        voteButton: "Голосувати",
        voteCount: "Поточна кількість голосів:",
        donationTitle: "Підтримайте нас",
        donationText: "Bitcoin:",
        copyButton: "Копіювати адресу",
        disclaimerLink: "Дісклеймер",
        shareTitle: "Поділитися рухом",
        shareText: "Візьміть вихідний 29 лютого! Приєднуйтесь до руху My Day 29 і підтримайте перетворення високосного дня на глобальний вихідний.",
        shareNative: "Поділитися",
        shareTwitter: "Twitter",
        shareFacebook: "Facebook",
        shareWhatsApp: "WhatsApp",
        shareTelegram: "Telegram",
        addToCalendar: "Додати в календар"
    },
    es: {
        title: "Nuestro Manifiesto",
        paragraphs: [
            "Me tomo el día libre el 29 de febrero.",
            "Cada cuatro años, el calendario nos regala un día extra. Un día que existe fuera del ritmo normal de nuestras vidas. Un día que aparece como un regalo del tiempo mismo. ¿Por qué deberíamos pasarlo trabajando?",
            "El 29 de febrero debería ser un día global de descanso, celebración y reflexión. Un día para romper con la rutina, pasar tiempo con seres queridos, perseguir pasiones o simplemente respirar. Es un día que nos recuerda que el tiempo es precioso y debe celebrarse, no solo contarse.",
            "Únete a nosotros para hacer realidad esta visión. Declara tu intención. Tómate el día bisiesto libre. Comparte este movimiento. Juntos, podemos transformar el 29 de febrero en un día que pertenezca a todos, en todas partes."
        ],
        qrTitle: "Escanear para aprender más",
        voteTitle: "Apoyar este mensaje",
        voteButton: "Votar",
        voteCount: "Votos actuales:",
        donationTitle: "Apóyanos",
        donationText: "Bitcoin:",
        copyButton: "Copiar dirección",
        disclaimerLink: "Descargo de Responsabilidad",
        shareTitle: "Comparte este movimiento",
        shareText: "¡Tómate el 29 de febrero libre! Únete al movimiento My Day 29 y apoya hacer del día bisiesto un día libre global.",
        shareNative: "Compartir",
        shareTwitter: "Twitter",
        shareFacebook: "Facebook",
        shareWhatsApp: "WhatsApp",
        shareTelegram: "Telegram",
        addToCalendar: "Añadir al calendario"
    },
    fr: {
        title: "Notre Manifeste",
        paragraphs: [
            "Je prends congé le 29 février.",
            "Tous les quatre ans, le calendrier nous offre un jour supplémentaire. Un jour qui existe en dehors du rythme normal de nos vies. Un jour qui apparaît comme un cadeau du temps lui-même. Pourquoi devrions-nous le passer à travailler?",
            "Le 29 février devrait être un jour mondial de repos, de célébration et de réflexion. Un jour pour rompre avec la routine, passer du temps avec nos proches, poursuivre nos passions ou simplement respirer. C'est un jour qui nous rappelle que le temps est précieux et doit être célébré, pas seulement compté.",
            "Rejoignez-nous pour faire de cette vision une réalité. Déclarez votre intention. Prenez le jour bissextile de congé. Partagez ce mouvement. Ensemble, nous pouvons transformer le 29 février en un jour qui appartient à tous, partout."
        ],
        qrTitle: "Scanner pour en savoir plus",
        voteTitle: "Soutenir ce message",
        voteButton: "Voter",
        voteCount: "Votes actuels:",
        donationTitle: "Soutenez-nous",
        donationText: "Bitcoin:",
        copyButton: "Copier l'adresse",
        disclaimerLink: "Avertissement",
        shareTitle: "Partagez ce mouvement",
        shareText: "Prenez le 29 février de congé ! Rejoignez le mouvement My Day 29 et soutenez la transformation du jour bissextile en jour férié mondial.",
        shareNative: "Partager",
        shareTwitter: "Twitter",
        shareFacebook: "Facebook",
        shareWhatsApp: "WhatsApp",
        shareTelegram: "Telegram",
        addToCalendar: "Ajouter au calendrier"
    },
    de: {
        title: "Unser Manifest",
        paragraphs: [
            "Ich nehme mir den 29. Februar frei.",
            "Alle vier Jahre schenkt uns der Kalender einen zusätzlichen Tag. Ein Tag, der außerhalb des normalen Rhythmus unseres Lebens existiert. Ein Tag, der wie ein Geschenk der Zeit selbst erscheint. Warum sollten wir ihn mit Arbeiten verbringen?",
            "Der 29. Februar sollte ein globaler Tag der Ruhe, des Feierns und der Besinnung sein. Ein Tag, um aus der Routine auszubrechen, Zeit mit geliebten Menschen zu verbringen, Leidenschaften nachzugehen oder einfach zu atmen. Es ist ein Tag, der uns daran erinnert, dass Zeit kostbar ist und gefeiert werden sollte, nicht nur gezählt.",
            "Schließen Sie sich uns an, um diese Vision Wirklichkeit werden zu lassen. Erklären Sie Ihre Absicht. Nehmen Sie sich den Schalttag frei. Teilen Sie diese Bewegung. Gemeinsam können wir den 29. Februar in einen Tag verwandeln, der allen gehört, überall."
        ],
        qrTitle: "Scannen um mehr zu erfahren",
        voteTitle: "Diese Nachricht unterstützen",
        voteButton: "Abstimmen",
        voteCount: "Aktuelle Stimmen:",
        donationTitle: "Unterstütze uns",
        donationText: "Bitcoin:",
        copyButton: "Adresse kopieren",
        disclaimerLink: "Haftungsausschluss",
        shareTitle: "Teile diese Bewegung",
        shareText: "Nimm dir den 29. Februar frei! Schließe dich der My Day 29 Bewegung an und unterstütze die Umwandlung des Schalttags in einen weltweiten freien Tag.",
        shareNative: "Teilen",
        shareTwitter: "Twitter",
        shareFacebook: "Facebook",
        shareWhatsApp: "WhatsApp",
        shareTelegram: "Telegram",
        addToCalendar: "Zum Kalender hinzufügen"
    }
};

// Detect browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    return translations[langCode] ? langCode : 'en';
}

// Change language
function changeLanguage(lang) {
    const t = translations[lang];

    // Update content
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h1>${t.title}</h1>
        ${t.paragraphs.map(p => `<p>${p}</p>`).join('')}
    `;

    // Update other text
    document.getElementById('qr-title').textContent = t.qrTitle;
    document.getElementById('vote-title').textContent = t.voteTitle;
    document.getElementById('vote-btn').textContent = t.voteButton;
    document.getElementById('vote-count').previousSibling.textContent = t.voteCount + ' ';
    document.getElementById('disclaimer-link').textContent = t.disclaimerLink;

    // Update share section
    document.getElementById('share-title').textContent = t.shareTitle;
    document.getElementById('share-native-text').textContent = t.shareNative;
    document.getElementById('share-twitter-text').textContent = t.shareTwitter;
    document.getElementById('share-facebook-text').textContent = t.shareFacebook;
    document.getElementById('share-whatsapp-text').textContent = t.shareWhatsApp;
    document.getElementById('share-telegram-text').textContent = t.shareTelegram;
    document.getElementById('add-calendar-text').textContent = t.addToCalendar;

    // Update share links
    updateShareLinks(lang);

    // Set text direction for RTL languages
    if (rtlLanguages.includes(lang)) {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Copy wallet address
function copyWallet() {
    const walletAddress = document.querySelector('.wallet-address').textContent;
    navigator.clipboard.writeText(walletAddress).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Load vote count
async function loadVoteCount() {
    try {
        const response = await fetch('/api/votes');
        const data = await response.json();
        document.getElementById('vote-count').textContent = data.count || 0;
    } catch (error) {
        console.error('Error loading vote count:', error);
        document.getElementById('vote-count').textContent = '0';
    }
}

// Check if user has already voted
function hasVoted() {
    const voteTimestamp = localStorage.getItem('voted_at');
    if (!voteTimestamp) return false;

    // Allow voting again after 24 hours
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const timeSinceVote = Date.now() - parseInt(voteTimestamp);
    return timeSinceVote < ONE_DAY;
}

// Mark user as voted
function markAsVoted() {
    localStorage.setItem('voted_at', Date.now().toString());
}

// Submit vote
async function submitVote() {
    // Check if already voted
    if (hasVoted()) {
        alert('You have already voted. You can vote again in 24 hours.');
        return;
    }

    const captchaResponse = hcaptcha.getResponse();

    if (!captchaResponse) {
        alert('Please complete the captcha');
        return;
    }

    const btn = document.getElementById('vote-btn');
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                captcha: captchaResponse
            })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('vote-count').textContent = data.count;

            // Mark as voted in localStorage
            markAsVoted();

            // Hide the captcha widget
            const captchaContainer = document.querySelector('.h-captcha');
            if (captchaContainer) {
                captchaContainer.style.display = 'none';
            }

            // Keep button disabled and update text
            btn.disabled = true;
            btn.textContent = 'Voted!';

            setTimeout(() => {
                const t = translations[document.getElementById('lang').value];
                btn.textContent = 'Already Voted';
            }, 2000);
        } else {
            throw new Error(data.error || 'Failed to submit vote');
        }
    } catch (error) {
        console.error('Error submitting vote:', error);
        const errorMsg = error.message || 'Error submitting vote. Please try again.';
        alert(errorMsg);
        btn.disabled = false;
        const t = translations[document.getElementById('lang').value];
        btn.textContent = t.voteButton;
    }
}

// Generate QR code
function generateQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = ''; // Clear existing QR code

    const currentUrl = 'https://myday29.com/';

    // Update URL text
    document.getElementById('url-text').textContent = currentUrl;

    // Get current theme to set QR code colors
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const colorDark = currentTheme === 'dark' ? '#e8e8e8' : '#000000';
    const colorLight = currentTheme === 'dark' ? '#1a1a1a' : '#ffffff';

    // Generate QR code
    new QRCode(qrcodeContainer, {
        text: currentUrl,
        width: 150,
        height: 150,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Update share links
function updateShareLinks(lang) {
    const t = translations[lang];
    const url = encodeURIComponent(window.location.href || 'https://myday29.com');
    const text = encodeURIComponent(t.shareText);

    // Twitter/X
    document.getElementById('share-twitter').href =
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    // Facebook
    document.getElementById('share-facebook').href =
        `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    // WhatsApp
    document.getElementById('share-whatsapp').href =
        `https://wa.me/?text=${text}%20${url}`;

    // Telegram
    document.getElementById('share-telegram').href =
        `https://t.me/share/url?url=${url}&text=${text}`;
}

// Native share function (for mobile devices)
async function nativeShare() {
    const lang = document.getElementById('lang').value;
    const t = translations[lang];

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My Day 29',
                text: t.shareText,
                url: window.location.href || 'https://myday29.com'
            });
        } catch (err) {
            // User cancelled or error occurred
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
        }
    }
}

// Calculate the next February 29th (leap day)
function getNextLeapDay() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Check if current year is a leap year and if Feb 29 hasn't passed yet
    const thisYearLeapDay = new Date(currentYear, 1, 29);
    if (isLeapYear(currentYear) && now < thisYearLeapDay) {
        return thisYearLeapDay;
    }

    // Find the next leap year
    for (let year = currentYear + 1; year <= currentYear + 4; year++) {
        if (isLeapYear(year)) {
            return new Date(year, 1, 29);
        }
    }

    // Fallback (should never reach here)
    return new Date(currentYear + 4, 1, 29);
}

// Check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Format date for iCalendar (YYYYMMDD)
function formatICalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Format datetime for iCalendar (YYYYMMDDTHHMMSSZ)
function formatICalDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

// Add to calendar function
function addToCalendar() {
    const lang = document.getElementById('lang').value;
    const t = translations[lang];

    const leapDay = getNextLeapDay();
    const eventDate = formatICalDate(leapDay);
    const now = new Date();
    const timestamp = formatICalDateTime(now);

    // Create iCalendar content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//My Day 29//Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${eventDate}`,
        `DTEND;VALUE=DATE:${eventDate}`,
        `DTSTAMP:${timestamp}`,
        `UID:myday29-${eventDate}@myday29.com`,
        'SUMMARY:My Day 29 - Take February 29th Off!',
        'DESCRIPTION:Leap Day - A global day off! Join the My Day 29 movement.',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `my-day-29-${leapDay.getFullYear()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Detect and set theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || detectPreferredTheme();
    document.getElementById('theme').value = currentTheme;

    // Detect and set language
    const savedLang = localStorage.getItem('preferredLanguage');
    const detectedLang = detectLanguage();
    const lang = savedLang || detectedLang;

    document.getElementById('lang').value = lang;
    changeLanguage(lang);

    // Load vote count
    loadVoteCount();

    // Generate QR code
    generateQRCode();

    // Check if native share is supported (mostly mobile devices)
    if (navigator.share) {
        document.getElementById('native-share-btn').style.display = 'inline-flex';
    }

    // Check if user has already voted
    if (hasVoted()) {
        const btn = document.getElementById('vote-btn');
        btn.disabled = true;
        btn.textContent = 'Already Voted';

        // Hide the captcha widget
        const captchaContainer = document.querySelector('.h-captcha');
        if (captchaContainer) {
            captchaContainer.style.display = 'none';
        }
    }
});
