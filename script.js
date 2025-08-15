// DaisyUI Character Analyzer JavaScript

// Theme management - Light/Dark only
function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme controller checkbox
    const themeController = document.querySelector('.theme-controller');
    if (themeController) {
        themeController.checked = savedTheme === 'dark';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('selectedTheme', newTheme);
}

// Character count update
function updateCharCount() {
    const input = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${input.value.length} chars`;
}

// Show loading
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('loading').classList.add('flex');
    document.getElementById('results').classList.add('hidden');
}

// Hide loading
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('loading').classList.remove('flex');
}

// Main analysis function
function analyzeText() {
    const input = document.getElementById('textInput').value;
    if (!input.trim()) {
        // Show error toast
        showToast('⚠️ Please enter some text!', 'alert-warning');
        return;
    }

    showLoading();

    // Simulate processing time for better UX
    setTimeout(() => {
        const results = document.getElementById('results');
        const summary = document.getElementById('summary');
        const charGrid = document.getElementById('charGrid');
        
        // Clear previous results
        charGrid.innerHTML = '';
        summary.innerHTML = '';
        
        // Initialize stats
        let stats = {
            total: input.length,
            ascii: 0,
            unicode: 0,
            korean: 0,
            special: 0,
            whitespace: 0,
            digits: 0,
            alphabets: 0,
            emoji: 0
        };

        // Analyze each character
        for (let i = 0; i < input.length; i++) {
            const char = input.charAt(i);
            const charCode = input.charCodeAt(i);
            const codePoint = input.codePointAt(i);
            
            // Classify character types
            const types = getCharTypes(char, charCode);
            types.forEach(type => stats[type]++);

            // Create character card
            const card = createCharCard(char, charCode, codePoint, i, types);
            charGrid.appendChild(card);
        }

        // Create summary
        summary.innerHTML = createSummary(stats);
        
        // Show results with animation
        hideLoading();
        results.classList.remove('hidden');
        results.scrollIntoView({ behavior: 'smooth' });
        
        // Show success toast
        showToast(`✅ Analysis complete for ${stats.total} characters!`, 'alert-success');
    }, 300);
}

// Character type classification
function getCharTypes(char, charCode) {
    const types = [];
    
    // ASCII vs Unicode
    if (charCode <= 127) {
        types.push('ascii');
    } else {
        types.push('unicode');
    }
    
    // Korean characters
    if (/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char)) {
        types.push('korean');
    }
    
    // Emoji detection
    if (/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu.test(char)) {
        types.push('emoji');
    }
    
    // Character categories
    if (/\s/.test(char)) {
        types.push('whitespace');
    } else if (/[0-9]/.test(char)) {
        types.push('digits');
    } else if (/[a-zA-Z]/.test(char)) {
        types.push('alphabets');
    } else if (!/[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]/.test(char) && !types.includes('emoji')) {
        types.push('special');
    }
    
    return types;
}

// Create character card
function createCharCard(char, charCode, codePoint, index, types) {
    const card = document.createElement('div');
    card.className = 'card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300';
    
    // Display character with special handling
    const displayChar = char === ' ' ? 'Space' : 
                       char === '\n' ? 'Newline' : 
                       char === '\t' ? 'Tab' : 
                       char === '\r' ? 'Carriage Return' : char;
    
    // Create type badges
    const typeBadges = types.map(type => {
        const typeInfo = getTypeInfo(type);
        return `<span class="badge ${typeInfo.class} badge-sm">${typeInfo.label}</span>`;
    }).join('');

    card.innerHTML = `
        <div class="card-body p-4">
            <div class="text-center mb-4">
                <div class="bg-primary/10 rounded-lg p-4 mb-2">
                    <div class="text-4xl font-bold text-primary">${displayChar}</div>
                </div>
                <div class="flex flex-wrap gap-1 justify-center">
                    ${typeBadges}
                </div>
            </div>
            
            <div class="space-y-2">
                <div class="flex justify-between items-center p-2 bg-base-200 rounded">
                    <span class="font-medium text-sm">Position</span>
                    <span class="font-mono text-sm">${index}</span>
                </div>
                
                <div class="flex justify-between items-center p-2 bg-base-200 rounded">
                    <span class="font-medium text-sm">Character</span>
                    <span class="font-mono text-sm">'${char}'</span>
                </div>
                
                <div class="flex justify-between items-center p-2 bg-base-200 rounded">
                    <span class="font-medium text-sm">ASCII/UTF-16</span>
                    <span class="font-mono text-sm">${charCode}</span>
                </div>
                
                <div class="flex justify-between items-center p-2 bg-base-200 rounded">
                    <span class="font-medium text-sm">Hexadecimal</span>
                    <span class="font-mono text-sm">0x${charCode.toString(16).toUpperCase()}</span>
                </div>
                
                <div class="flex justify-between items-center p-2 bg-base-200 rounded">
                    <span class="font-medium text-sm">Unicode</span>
                    <span class="font-mono text-sm">U+${charCode.toString(16).toUpperCase().padStart(4, '0')}</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Get type information for badges
function getTypeInfo(type) {
    const typeMap = {
        ascii: { label: 'ASCII', class: 'badge-success' },
        unicode: { label: 'Unicode', class: 'badge-info' },
        korean: { label: 'Korean', class: 'badge-warning' },
        special: { label: 'Special', class: 'badge-error' },
        whitespace: { label: 'Whitespace', class: 'badge-neutral' },
        digits: { label: 'Digits', class: 'badge-accent' },
        alphabets: { label: 'Alphabets', class: 'badge-primary' },
        emoji: { label: 'Emoji', class: 'badge-secondary' }
    };
    return typeMap[type] || { label: type, class: 'badge-ghost' };
}

// Create summary statistics
function createSummary(stats) {
    const statItems = [
        { label: 'Total Characters', value: stats.total },
        { label: 'ASCII', value: stats.ascii },
        { label: 'Unicode', value: stats.unicode },
        { label: 'Korean', value: stats.korean },
        { label: 'Alphabets', value: stats.alphabets },
        { label: 'Digits', value: stats.digits }
    ];

    // Add non-zero categories
    if (stats.special > 0) {
        statItems.push({ label: 'Special Characters', value: stats.special });
    }
    if (stats.whitespace > 0) {
        statItems.push({ label: 'Whitespace', value: stats.whitespace });
    }
    if (stats.emoji > 0) {
        statItems.push({ label: 'Emoji', value: stats.emoji });
    }

    return statItems.map(item => `
        <div class="stat">
            <div class="stat-title text-sm">${item.label}</div>
            <div class="stat-value text-2xl text-primary">${item.value}</div>
            <div class="stat-desc">${((item.value / stats.total) * 100).toFixed(1)}%</div>
        </div>
    `).join('');
}

// Show toast notification
function showToast(message, alertClass = 'alert-info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = 'toast toast-top toast-center z-50';
    toast.innerHTML = `
        <div class="alert ${alertClass} shadow-lg">
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load theme
    loadTheme();
    
    // Theme controller event listener
    const themeController = document.querySelector('.theme-controller');
    if (themeController) {
        themeController.addEventListener('change', toggleTheme);
    }
    
    // Text input event listeners
    const textInput = document.getElementById('textInput');
    if (textInput) {
        // Character count update
        textInput.addEventListener('input', updateCharCount);
        
        // Keyboard shortcuts
        textInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                analyzeText();
            }
        });
    }
});