async function loadLanguages() {
    try {
        const response = await fetch('../data/supported-languages.yml');
        const text = await response.text();
        const languages = text
            .split('\n')
            .filter(line => line && !line.startsWith('#')) // Remove empty lines and comments
            .sort();

        const gridContainer = document.getElementById('languagesGrid');
        languages.forEach(language => {
            const div = document.createElement('div');
            div.textContent = language;
            gridContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading languages:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadLanguages);
