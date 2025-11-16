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
        }
    });
}

// Multi-language content for disclaimer
const translations = {
    en: {
        title: "Disclaimer",
        paragraphs: [
            "Replace this paragraph with your first disclaimer section. You can write about privacy, data collection, or the purpose of your site.",
            "Replace this paragraph with your second disclaimer section. Add information about liability, accuracy, or terms of use.",
            "Replace this paragraph with your third disclaimer section. Include any legal notices, copyright information, or contact details.",
            "Replace this paragraph with your final disclaimer section. Add any additional terms or conditions you want to communicate."
        ],
        backLink: "← Back to Main Page"
    },
    uk: {
        title: "Дісклеймер",
        paragraphs: [
            "Замініть цей абзац на ваш перший розділ дісклеймера. Ви можете написати про конфіденційність, збір даних або мету вашого сайту.",
            "Замініть цей абзац на ваш другий розділ дісклеймера. Додайте інформацію про відповідальність, точність або умови використання.",
            "Замініть цей абзац на ваш третій розділ дісклеймера. Включіть будь-які юридичні повідомлення, інформацію про авторські права або контактні дані.",
            "Замініть цей абзац на ваш останній розділ дісклеймера. Додайте будь-які додаткові умови, які ви хочете повідомити."
        ],
        backLink: "← Назад до головної сторінки"
    },
    es: {
        title: "Descargo de Responsabilidad",
        paragraphs: [
            "Reemplace este párrafo con su primera sección de descargo de responsabilidad. Puede escribir sobre privacidad, recopilación de datos o el propósito de su sitio.",
            "Reemplace este párrafo con su segunda sección de descargo de responsabilidad. Agregue información sobre responsabilidad, precisión o términos de uso.",
            "Reemplace este párrafo con su tercera sección de descargo de responsabilidad. Incluya avisos legales, información de derechos de autor o datos de contacto.",
            "Reemplace este párrafo con su sección final de descargo de responsabilidad. Agregue cualquier término o condición adicional que desee comunicar."
        ],
        backLink: "← Volver a la página principal"
    },
    fr: {
        title: "Avertissement",
        paragraphs: [
            "Remplacez ce paragraphe par votre première section d'avertissement. Vous pouvez écrire sur la confidentialité, la collecte de données ou l'objectif de votre site.",
            "Remplacez ce paragraphe par votre deuxième section d'avertissement. Ajoutez des informations sur la responsabilité, l'exactitude ou les conditions d'utilisation.",
            "Remplacez ce paragraphe par votre troisième section d'avertissement. Incluez les avis juridiques, les informations sur les droits d'auteur ou les coordonnées.",
            "Remplacez ce paragraphe par votre dernière section d'avertissement. Ajoutez tous les termes ou conditions supplémentaires que vous souhaitez communiquer."
        ],
        backLink: "← Retour à la page principale"
    },
    de: {
        title: "Haftungsausschluss",
        paragraphs: [
            "Ersetzen Sie diesen Absatz durch Ihren ersten Haftungsausschlussabschnitt. Sie können über Datenschutz, Datenerfassung oder den Zweck Ihrer Website schreiben.",
            "Ersetzen Sie diesen Absatz durch Ihren zweiten Haftungsausschlussabschnitt. Fügen Sie Informationen über Haftung, Genauigkeit oder Nutzungsbedingungen hinzu.",
            "Ersetzen Sie diesen Absatz durch Ihren dritten Haftungsausschlussabschnitt. Fügen Sie rechtliche Hinweise, Urheberrechtsinformationen oder Kontaktdaten hinzu.",
            "Ersetzen Sie diesen Absatz durch Ihren letzten Haftungsausschlussabschnitt. Fügen Sie weitere Bedingungen hinzu, die Sie mitteilen möchten."
        ],
        backLink: "← Zurück zur Hauptseite"
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

    // Update back link
    document.getElementById('back-link').textContent = t.backLink;

    // Set text direction for RTL languages
    if (rtlLanguages.includes(lang)) {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Detect and set theme
    const theme = detectPreferredTheme();
    document.getElementById('theme').value = theme;

    // Detect and set language
    const savedLang = localStorage.getItem('preferredLanguage');
    const detectedLang = detectLanguage();
    const lang = savedLang || detectedLang;

    document.getElementById('lang').value = lang;
    changeLanguage(lang);
});
