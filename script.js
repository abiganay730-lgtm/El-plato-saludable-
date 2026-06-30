// Game State and Data
let soundEnabled = true;
let currentPhase = 'welcome';
let placedHealthyCount = 0;
let selectedHygieneCount = 0;
let draggedItem = null;

// Food & Drinks database
const foods = [
    // Healthy Foods (8 items)
    {
        id: 'apple',
        name: 'Manzana',
        type: 'healthy-food',
        info: '¡Manzana deliciosa y crujiente!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M50 35 C40 20 20 25 20 45 C20 70 45 85 50 85 C55 85 80 70 80 45 C80 25 60 20 50 35 Z" fill="#FF5252"/>
            <path d="M50 30 Q53 15 62 12" stroke="#795548" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M54 22 C62 20 68 28 60 30 C56 31 54 26 54 22 Z" fill="#8BC34A"/>
            <circle cx="36" cy="46" r="4.5" fill="#333"/>
            <circle cx="34" cy="44" r="1.5" fill="#FFF"/>
            <circle cx="64" cy="46" r="4.5" fill="#333"/>
            <circle cx="62" cy="44" r="1.5" fill="#FFF"/>
            <circle cx="30" cy="52" r="4" fill="#FF8A80" opacity="0.8"/>
            <circle cx="70" cy="52" r="4" fill="#FF8A80" opacity="0.8"/>
            <path d="M44 56 Q50 62 56 56" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'banana',
        name: 'Plátano',
        type: 'healthy-food',
        info: '¡El plátano te da mucha energía!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M22 30 C38 22 70 32 78 68 C62 68 40 52 22 30 Z" fill="#FFEB3B"/>
            <path d="M20 28 C22 25 25 28 22 30" fill="#795548"/>
            <path d="M74 65 C77 68 80 73 78 75 C76 77 71 73 69 70 Z" fill="#795548"/>
            <circle cx="42" cy="42" r="4.5" fill="#333"/>
            <circle cx="56" cy="46" r="4.5" fill="#333"/>
            <circle cx="38" cy="45" r="4" fill="#FF8A80" opacity="0.8"/>
            <circle cx="60" cy="49" r="4" fill="#FF8A80" opacity="0.8"/>
            <path d="M46 51 Q50 56 54 52" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'carrot',
        name: 'Zanahoria',
        type: 'healthy-food',
        info: '¡Zanahoria para ver mejor!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M30 20 Q40 5 50 20 Q42 12 30 20 M45 22 Q58 8 65 25 Q55 15 45 22" fill="#4CAF50"/>
            <path d="M30 25 L70 25 L50 85 Z" fill="#FF9800" stroke="#FF9800" stroke-width="4" stroke-linejoin="round"/>
            <circle cx="43" cy="42" r="4.5" fill="#333"/>
            <circle cx="57" cy="42" r="4.5" fill="#333"/>
            <circle cx="38" cy="46" r="3.5" fill="#FF5722" opacity="0.6"/>
            <circle cx="62" cy="46" r="3.5" fill="#FF5722" opacity="0.6"/>
            <path d="M47 50 Q50 55 53 50" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M36 38 H44 M56 38 H64 M34 55 H42" stroke="#E65100" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'tomato',
        name: 'Jitomate',
        type: 'healthy-food',
        info: '¡Jitomate rojo y jugoso!',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="55" r="35" fill="#FF3D00"/>
            <path d="M48 20 L52 20 L50 10 Z" fill="#4CAF50"/>
            <path d="M50 20 L40 15 L50 25 L60 15 Z" fill="#4CAF50"/>
            <circle cx="40" cy="50" r="4.5" fill="#333"/>
            <circle cx="60" cy="50" r="4.5" fill="#333"/>
            <circle cx="34" cy="54" r="4" fill="#FF8A80" opacity="0.8"/>
            <circle cx="66" cy="54" r="4" fill="#FF8A80" opacity="0.8"/>
            <path d="M45 58 Q50 64 55 58" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'beans',
        name: 'Frijoles',
        type: 'healthy-food',
        info: '¡Frijoles ricos en hierro!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M15 50 C15 75 30 85 50 85 C70 85 85 75 85 50 Z" fill="#AB47BC"/>
            <rect x="10" y="42" width="80" height="8" rx="4" fill="#8E24AA"/>
            <ellipse cx="35" cy="55" rx="8" ry="5" fill="#795548" transform="rotate(-15, 35, 55)"/>
            <ellipse cx="50" cy="62" rx="8" ry="5" fill="#795548" transform="rotate(10, 50, 62)"/>
            <ellipse cx="65" cy="53" rx="8" ry="5" fill="#795548" transform="rotate(-30, 65, 53)"/>
            <circle cx="47" cy="53" r="3" fill="#333"/>
            <circle cx="53" cy="53" r="3" fill="#333"/>
            <path d="M48 57 Q50 60 52 57" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'fish',
        name: 'Pescado',
        type: 'healthy-food',
        info: '¡El pescado ayuda a tu cerebro!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M85 50 C70 30 30 30 15 50 C30 70 70 70 85 50 Z" fill="#29B6F6"/>
            <path d="M15 50 L2 38 L8 50 L2 62 Z" fill="#0288D1"/>
            <path d="M50 34 Q58 20 66 33" fill="#0288D1"/>
            <path d="M50 66 Q58 80 66 67" fill="#0288D1"/>
            <circle cx="65" cy="45" r="4.5" fill="#333"/>
            <circle cx="67" cy="43" r="1.5" fill="#FFF"/>
            <path d="M74 53 Q71 55 68 53" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <circle cx="61" cy="49" r="3" fill="#FF8A80" opacity="0.8"/>
        </svg>`
    },
    {
        id: 'egg',
        name: 'Huevo',
        type: 'healthy-food',
        info: '¡El huevo tiene mucha proteína!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M25 50 C20 30 40 15 60 20 C80 25 85 55 70 75 C55 90 30 70 25 50 Z" fill="#F5F5F5" stroke="#E0E0E0" stroke-width="2"/>
            <circle cx="52" cy="48" r="18" fill="#FFB300"/>
            <circle cx="47" cy="44" r="3.5" fill="#333"/>
            <circle cx="57" cy="44" r="3.5" fill="#333"/>
            <circle cx="43" cy="48" r="3" fill="#FF8A80" opacity="0.8"/>
            <circle cx="61" cy="48" r="3" fill="#FF8A80" opacity="0.8"/>
            <path d="M50 51 Q52 55 54 51" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'tortilla',
        name: 'Tortilla',
        type: 'healthy-food',
        info: '¡Una tortilla calientita para comer rico!',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="#FFF59D" stroke="#FFE082" stroke-width="3"/>
            <circle cx="28" cy="42" r="2" fill="#D7CCC8"/>
            <circle cx="72" cy="46" r="2" fill="#D7CCC8"/>
            <circle cx="46" cy="24" r="2" fill="#D7CCC8"/>
            <circle cx="58" cy="74" r="2.5" fill="#D7CCC8"/>
            <circle cx="42" cy="44" r="4.5" fill="#333"/>
            <circle cx="58" cy="44" r="4.5" fill="#333"/>
            <circle cx="36" cy="49" r="3.5" fill="#FF8A80" opacity="0.6"/>
            <circle cx="64" cy="49" r="3.5" fill="#FF8A80" opacity="0.6"/>
            <path d="M47 52 Q50 57 53 52" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>`
    },

    // Healthy Drinks (2 items)
    {
        id: 'water',
        name: 'Agua',
        type: 'healthy-drink',
        info: '¡El agua fresca te hidrata mejor!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M35 25 L40 80 C40 85 60 85 60 80 L65 25 Z" fill="#E0F7FA" stroke="#B2EBF2" stroke-width="3"/>
            <path d="M37 45 L40 80 C40 82 60 82 60 80 L63 45 Z" fill="#4DD0E1" opacity="0.8"/>
            <circle cx="45" cy="52" r="3.5" fill="#333"/>
            <circle cx="55" cy="52" r="3.5" fill="#333"/>
            <path d="M48 57 Q50 60 52 57" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <circle cx="41" cy="55" r="2.5" fill="#FF8A80" opacity="0.8"/>
            <circle cx="59" cy="55" r="2.5" fill="#FF8A80" opacity="0.8"/>
            <path d="M48 35 Q50 31 52 35" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'milk',
        name: 'Leche',
        type: 'healthy-drink',
        info: '¡Leche para tener huesos y dientes fuertes!',
        svg: `<svg viewBox="0 0 100 100">
            <rect x="30" y="30" width="40" height="55" rx="5" fill="#FFF" stroke="#E0E0E0" stroke-width="2"/>
            <path d="M30 32 L50 15 L70 32 Z" fill="#BBDEFB" stroke="#E0E0E0" stroke-width="2"/>
            <rect x="35" y="40" width="30" height="20" fill="#42A5F5" rx="3"/>
            <path d="M42 45 Q50 52 58 45" stroke="#FFF" stroke-width="3" fill="none"/>
            <circle cx="45" cy="65" r="3.5" fill="#333"/>
            <circle cx="55" cy="65" r="3.5" fill="#333"/>
            <path d="M48 70 Q50 73 52 70" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M50 15 L53 8 Q56 3 50 3" stroke="#FF5252" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>`
    },

    // Junk Foods / Excess Sugar (5 items)
    {
        id: 'soda',
        name: 'Refresco',
        type: 'junk',
        info: 'El refresco tiene demasiada azúcar y no es saludable.',
        svg: `<svg viewBox="0 0 100 100">
            <rect x="32" y="25" width="36" height="60" rx="6" fill="#E91E63" stroke="#C2185B" stroke-width="2"/>
            <ellipse cx="50" cy="25" rx="18" ry="4" fill="#B0BEC5"/>
            <rect x="42" y="42" width="16" height="16" rx="2" fill="#FFF" opacity="0.7"/>
            <text x="46" y="55" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="12" fill="#E91E63">X</text>
            <circle cx="43" cy="68" r="3.5" fill="#333"/>
            <circle cx="57" cy="68" r="3.5" fill="#333"/>
            <path d="M46 76 Q50 71 54 76" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <line x1="39" x2="43" y1="62" y2="64" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="61" x2="57" y1="62" y2="64" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'fries',
        name: 'Papas fritas',
        type: 'junk',
        info: 'Las papas fritas tienen mucha grasa y sal.',
        svg: `<svg viewBox="0 0 100 100">
            <rect x="33" y="15" width="6" height="35" rx="2" fill="#FFEB3B"/>
            <rect x="41" y="10" width="6" height="40" rx="2" fill="#FFEB3B"/>
            <rect x="49" y="12" width="6" height="38" rx="2" fill="#FFEB3B"/>
            <rect x="57" y="18" width="6" height="32" rx="2" fill="#FFEB3B"/>
            <rect x="63" y="14" width="6" height="36" rx="2" fill="#FFEB3B"/>
            <path d="M30 45 L70 45 L62 85 L38 85 Z" fill="#F44336"/>
            <circle cx="43" cy="60" r="3.5" fill="#333"/>
            <circle cx="57" cy="60" r="3.5" fill="#333"/>
            <path d="M46 68 Q50 63 54 68" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'candy',
        name: 'Dulces',
        type: 'junk',
        info: 'Los dulces pican tus dientes y causan caries.',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M15 50 L30 38 L30 62 Z M85 50 L70 38 L70 62 Z" fill="#FF4081"/>
            <circle cx="50" cy="50" r="22" fill="#FF80AB" stroke="#FF4081" stroke-width="2"/>
            <path d="M36 50 C36 30 64 30 64 50 C64 70 36 70 36 50 Z" fill="#FF4081" opacity="0.3"/>
            <circle cx="43" cy="46" r="3" fill="#333"/>
            <circle cx="57" cy="46" r="3" fill="#333"/>
            <path d="M46 55 Q50 51 54 55" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'cake',
        name: 'Pastel',
        type: 'junk',
        info: 'El pastel tiene demasiada azúcar. ¡Mejor comer fruta!',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M15 65 L85 65 L70 30 L30 30 Z" fill="#8D6E63"/>
            <path d="M30 30 Q50 25 70 30 L85 65 L75 65 L60 62 L40 62 L15 65 Z" fill="#EC407A"/>
            <rect x="47" y="10" width="6" height="20" fill="#FFF59D"/>
            <path d="M50 5 Q46 0 50 -3 Q54 0 50 5" fill="#FF5252"/>
            <circle cx="42" cy="45" r="3.5" fill="#333"/>
            <circle cx="58" cy="45" r="3.5" fill="#333"/>
            <path d="M46 52 Q50 48 54 52" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'burger',
        name: 'Hamburguesa',
        type: 'junk',
        info: 'La comida chatarra rápida no nos alimenta bien.',
        svg: `<svg viewBox="0 0 100 100">
            <path d="M20 50 C20 25 80 25 80 50 Z" fill="#FFA726"/>
            <rect x="16" y="50" width="68" height="6" fill="#4CAF50" rx="3"/>
            <rect x="18" y="56" width="64" height="12" fill="#795548" rx="4"/>
            <rect x="20" y="68" width="60" height="10" fill="#FFA726" rx="3"/>
            <circle cx="40" cy="38" r="3.5" fill="#333"/>
            <circle cx="60" cy="38" r="3.5" fill="#333"/>
            <path d="M46 45 Q50 41 54 45" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    }
];

// Hygiene Actions (4 Correct, 2 Distractors)
const hygieneActions = [
    {
        id: 'wash-hands',
        name: 'Lavarse las manos',
        correct: true,
        info: '¡Muy bien! Lavarse las manos con agua y jabón quita los microbios.',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#E0F7FA"/>
            <!-- Cute soap bubbles -->
            <circle cx="35" cy="30" r="8" fill="#B2EBF2" opacity="0.6"/>
            <circle cx="68" cy="28" r="6" fill="#B2EBF2" opacity="0.6"/>
            <circle cx="30" cy="70" r="10" fill="#B2EBF2" opacity="0.6"/>
            <!-- Hands -->
            <path d="M42 45 C35 45, 30 50, 30 58 C30 68, 40 70, 48 70 C48 62, 45 55, 42 45 Z" fill="#FFCCBC"/>
            <path d="M58 45 C65 45, 70 50, 70 58 C70 68, 60 70, 52 70 C52 62, 55 55, 58 45 Z" fill="#FFCCBC"/>
            <!-- Water Drops -->
            <path d="M50 15 Q46 25 50 30 Q54 25 50 15" fill="#4FC3F7"/>
            <circle cx="48" cy="58" r="2.5" fill="#333"/>
            <circle cx="52" cy="58" r="2.5" fill="#333"/>
            <path d="M47 62 Q50 65 53 62" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'wash-food',
        name: 'Lavar frutas y verduras',
        correct: true,
        info: '¡Excelente! Lavamos las frutas y verduras antes de comerlas.',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#E8F5E9"/>
            <!-- Tomato being washed -->
            <circle cx="45" cy="60" r="22" fill="#FF3D00"/>
            <path d="M45 38 L43 32 L47 32 Z" fill="#4CAF50"/>
            <!-- Water tap -->
            <path d="M65 20 L50 20 C45 20, 45 30, 45 32 L45 38" fill="none" stroke="#B0BEC5" stroke-width="8" stroke-linecap="round"/>
            <path d="M42 38 L48 38 L45 42 Z" fill="#B0BEC5"/>
            <!-- Water streams -->
            <line x1="45" y1="42" x2="45" y2="52" stroke="#4FC3F7" stroke-width="4" stroke-linecap="round"/>
            <line x1="41" y1="44" x2="38" y2="50" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round"/>
            <line x1="49" y1="44" x2="52" y2="50" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round"/>
            <!-- Cute face on tomato -->
            <circle cx="38" cy="60" r="2.5" fill="#333"/>
            <circle cx="48" cy="60" r="2.5" fill="#333"/>
            <path d="M41 64 Q43 66 45 64" stroke="#333" stroke-width="2" fill="none"/>
        </svg>`
    },
    {
        id: 'clean-dishes',
        name: 'Usar platos y vasos limpios',
        correct: true,
        info: '¡Muy bien! Comer en platos limpios nos mantiene sanos.',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#FFFDE7"/>
            <!-- Shiny plate -->
            <circle cx="45" cy="55" r="25" fill="#FFF" stroke="#E0E0E0" stroke-width="3"/>
            <circle cx="45" cy="55" r="18" fill="#FFF" stroke="#F5F5F5" stroke-width="2"/>
            <!-- Sparkles -->
            <path d="M75 25 L78 30 L83 31 L78 33 L76 38 L74 33 L69 31 L74 30 Z" fill="#FFD54F"/>
            <path d="M22 28 L24 31 L28 32 L24 33 L23 37 L21 33 L17 32 L21 31 Z" fill="#FFD54F"/>
            <!-- Clean Cup -->
            <path d="M68 45 L72 65 C72 68, 80 68, 80 65 L76 45 Z" fill="#80DEEA"/>
            <!-- Happy face on plate -->
            <circle cx="40" cy="52" r="2.5" fill="#333"/>
            <circle cx="50" cy="52" r="2.5" fill="#333"/>
            <path d="M42 57 Q45 60 48 57" stroke="#333" stroke-width="2" fill="none"/>
        </svg>`
    },
    {
        id: 'eat-calmly',
        name: 'Sentarse a comer tranquilamente',
        correct: true,
        info: '¡Excelente! Masticar despacio y sentados ayuda a la digestión.',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#EDE7F6"/>
            <!-- Table edge -->
            <rect x="15" y="70" width="70" height="20" fill="#FFB74D" rx="4"/>
            <!-- Plate -->
            <ellipse cx="50" cy="74" rx="20" ry="6" fill="#FFF"/>
            <!-- Happy Kid Face -->
            <circle cx="50" cy="40" r="20" fill="#FFE082"/>
            <path d="M30 40 C30 25, 70 25, 70 40 Z" fill="#795548"/> <!-- Hair -->
            <circle cx="43" cy="40" r="3" fill="#333"/>
            <circle cx="57" cy="40" r="3" fill="#333"/>
            <path d="M45 47 Q50 52 55 47" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'play-mud',
        name: 'Jugar con lodo al comer',
        correct: false,
        info: '¡Uy, no! El lodo tiene mucha tierra y microbios que nos enferman.',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#EFEBE9"/>
            <!-- Mud pile -->
            <path d="M15 80 Q50 45 85 80 Z" fill="#8D6E63"/>
            <ellipse cx="50" cy="78" rx="35" ry="10" fill="#70574E"/>
            <!-- Dirty hand -->
            <path d="M45 60 C40 60, 36 64, 36 72 L64 72 C64 64, 60 60, 55 60 Z" fill="#D7CCC8"/>
            <circle cx="48" cy="63" r="2.5" fill="#333"/>
            <circle cx="52" cy="63" r="2.5" fill="#333"/>
            <path d="M47 67 Q50 65 53 67" stroke="#333" stroke-width="2" fill="none"/>
        </svg>`
    },
    {
        id: 'dirty-floor',
        name: 'Comer comida del suelo',
        correct: false,
        info: '¡No, no! La comida que cae al suelo se llena de gérmenes.',
        svg: `<svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#ECEFF1"/>
            <!-- Floor line -->
            <line x1="10" y1="75" x2="90" y2="75" stroke="#CFD8DC" stroke-width="6" stroke-linecap="round"/>
            <!-- Apple on floor -->
            <path d="M50 75 C42 63, 27 67, 27 80 C27 92, 47 97, 50 97 C53 97, 73 92, 73 80 C73 67, 58 63, 50 75 Z" fill="#FF5252" transform="scale(0.8) translate(12, 18)"/>
            <!-- Ants/bugs -->
            <circle cx="30" cy="72" r="2" fill="#37474F"/>
            <line x1="28" y1="72" x2="32" y2="74" stroke="#37474F"/>
            <circle cx="70" cy="76" r="2" fill="#37474F"/>
            <!-- Sad eyes -->
            <circle cx="44" cy="76" r="3" fill="#333"/>
            <circle cx="56" cy="76" r="3" fill="#333"/>
            <path d="M47 82 Q50 79 53 82" stroke="#333" stroke-width="2" fill="none"/>
        </svg>`
    }
];

// Success phrases for correct actions
const successPhrases = [
    "¡Excelente!",
    "¡Muy bien!",
    "¡Lo lograste!",
    "¡Eso es súper saludable!",
    "¡Qué buena elección!"
];

// HTML Element selectors
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const hygieneScreen = document.getElementById('hygiene-screen');
const winScreen = document.getElementById('win-screen');

const startBtn = document.getElementById('start-btn');
const soundBtn = document.getElementById('sound-btn');
const foodGrid = document.getElementById('food-grid');
const plateTarget = document.getElementById('plate-target');
const glassTarget = document.getElementById('glass-target');
const glassFill = document.getElementById('glass-fill');
const plateItems = document.getElementById('plate-items');
const toPhase2Btn = document.getElementById('to-phase2-btn');
const hygieneGrid = document.getElementById('hygiene-grid');
const finishBtn = document.getElementById('finish-btn');
const restartBtn = document.getElementById('restart-btn');

const feedbackToast = document.getElementById('feedback-toast');
const toastIcon = document.getElementById('toast-icon');
const toastMessage = document.getElementById('toast-message');

const celebrationCanvas = document.getElementById('celebration-canvas');
let canvasCtx = celebrationCanvas.getContext('2d');
let animationFrameId = null;

// Sound and Speech Synthesis Engine
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Synthesize fun sound effects
function playSoundEffect(type) {
    if (!soundEnabled) return;
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'correct') {
        // High cheery chime sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'incorrect') {
        // Sad boing/buzz sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(110, now + 0.25); // A2
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'success') {
        // Winner fanfare chord
        const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord
        notes.forEach((freq, index) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.connect(g);
            g.connect(audioCtx.destination);
            o.type = 'sine';
            o.frequency.setValueAtTime(freq, now + index * 0.08);
            g.gain.setValueAtTime(0.1, now + index * 0.08);
            g.gain.exponentialRampToValueAtTime(0.01, now + 0.4 + index * 0.08);
            o.start(now + index * 0.08);
            o.stop(now + 0.5 + index * 0.08);
        });
    }
}

// Speech synthesis support in Spanish
function speak(text) {
    if (!soundEnabled) return;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel current speaking
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-MX'; // Mexican Spanish (or default Spanish)
        utterance.rate = 0.95; // Slightly slower for kids
        utterance.pitch = 1.2; // Slightly higher pitch for friendly tone
        window.speechSynthesis.speak(utterance);
    }
}

// Confetti Particle Engine
let particles = [];
function resizeCanvas() {
    celebrationCanvas.width = celebrationCanvas.parentElement.clientWidth;
    celebrationCanvas.height = celebrationCanvas.parentElement.clientHeight;
}

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * celebrationCanvas.width;
        this.y = Math.random() * -100 - 20;
        this.size = Math.random() * 8 + 6;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 6 - 3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.y > celebrationCanvas.height) {
            this.y = -20;
            this.x = Math.random() * celebrationCanvas.width;
        }
    }
    draw() {
        canvasCtx.save();
        canvasCtx.translate(this.x, this.y);
        canvasCtx.rotate((this.rotation * Math.PI) / 180);
        canvasCtx.fillStyle = this.color;
        canvasCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        canvasCtx.restore();
    }
}

function startCelebration() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new ConfettiParticle());
    }
    animateCelebration();
}

function animateCelebration() {
    canvasCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    animationFrameId = requestAnimationFrame(animateCelebration);
}

function stopCelebration() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    canvasCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
}

// Show friendly feedback banner
function showToast(message, type = 'correct', icon = '✨') {
    feedbackToast.className = `feedback-toast show ${type}`;
    toastIcon.textContent = icon;
    toastMessage.textContent = message;
    
    setTimeout(() => {
        feedbackToast.classList.remove('show');
    }, 3000);
}

// Screen Routing
function showScreen(screenId) {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    hygieneScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    stopCelebration();

    if (screenId === 'welcome') {
        welcomeScreen.classList.remove('hidden');
        currentPhase = 'welcome';
    } else if (screenId === 'game') {
        gameScreen.classList.remove('hidden');
        currentPhase = 'game';
        speak("¡Fase uno! Arrastra la comida saludable al plato y la bebida al vaso. Deja fuera la comida chatarra.");
    } else if (screenId === 'hygiene') {
        hygieneScreen.classList.remove('hidden');
        currentPhase = 'hygiene';
        speak("¡Casi listo! ¿Qué debemos hacer antes de comer? Toca las cuatro acciones correctas.");
    } else if (screenId === 'win') {
        winScreen.classList.remove('hidden');
        currentPhase = 'win';
        playSoundEffect('success');
        startCelebration();
        speak("¡Excelente! Eres un campeón de la alimentación saludable. Cuidas tu salud comiendo alimentos nutritivos y manteniendo todo limpio.");
    }
}

// Predefined slots for foods inside the plate (to keep it organized and beautiful)
const plateSlots = [
    { top: 25, left: 25 }, // Fruits
    { top: 25, left: 60 }, // Vegetables
    { top: 60, left: 25 }, // Grains
    { top: 60, left: 60 }, // Proteins
    { top: 42, left: 18 }, // Middle left
    { top: 42, left: 68 }, // Middle right
    { top: 18, left: 42 }, // Top middle
    { top: 68, left: 42 }  // Bottom middle
];

// Initialize Game Phase 1
function initFoodGame() {
    placedHealthyCount = 0;
    toPhase2Btn.classList.add('hidden');
    plateItems.innerHTML = '';
    glassFill.style.height = '0%';
    glassFill.style.backgroundColor = '#80DEEA';
    
    // Reset targets
    plateTarget.classList.remove('drag-over');
    glassTarget.classList.remove('drag-over');

    // Shuffle foods and render cards
    const shuffledFoods = [...foods].sort(() => Math.random() - 0.5);
    foodGrid.innerHTML = '';
    
    shuffledFoods.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.dataset.id = item.id;
        card.dataset.type = item.type;
        card.dataset.name = item.name;
        card.innerHTML = `${item.svg}<span>${item.name}</span>`;
        
        // Custom Pointer Event Dragging
        card.addEventListener('pointerdown', onPointerDown);
        
        foodGrid.appendChild(card);
    });
}

// Custom Touch & Mouse Pointer Dragging Implementation
let activePointerId = null;
let startX = 0;
let startY = 0;
let dragClone = null;

function onPointerDown(e) {
    if (dragClone) return; // Only allow one drag at a time
    initAudio(); // Warm up Audio Context

    const card = e.currentTarget;
    draggedItem = card;
    activePointerId = e.pointerId;

    // Record starting position
    const rect = card.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    // Create a dragging clone
    dragClone = card.cloneNode(true);
    dragClone.classList.add('dragging');
    dragClone.style.position = 'fixed';
    dragClone.style.left = `${rect.left}px`;
    dragClone.style.top = `${rect.top}px`;
    dragClone.style.width = `${rect.width}px`;
    dragClone.style.height = `${rect.height}px`;
    dragClone.style.pointerEvents = 'none'; // Avoid interception
    document.body.appendChild(dragClone);

    card.style.opacity = '0.3';

    // Attach moving/releasing event listeners to window
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    card.setPointerCapture(e.pointerId);
}

function onPointerMove(e) {
    if (!dragClone || e.pointerId !== activePointerId) return;

    // Update clone position
    dragClone.style.left = `${e.clientX - startX}px`;
    dragClone.style.top = `${e.clientY - startY}px`;

    // Visual feedback for targets
    const x = e.clientX;
    const y = e.clientY;
    
    // Temporarily hide clone to check element below
    dragClone.style.display = 'none';
    const hoveredElement = document.elementFromPoint(x, y);
    dragClone.style.display = 'flex';

    if (!hoveredElement) return;

    const hitPlate = hoveredElement.closest('#plate-target');
    const hitGlass = hoveredElement.closest('#glass-target');

    if (hitPlate) {
        plateTarget.classList.add('drag-over');
    } else {
        plateTarget.classList.remove('drag-over');
    }

    if (hitGlass) {
        glassTarget.classList.add('drag-over');
    } else {
        glassTarget.classList.remove('drag-over');
    }
}

function onPointerUp(e) {
    if (!dragClone || e.pointerId !== activePointerId) return;

    const x = e.clientX;
    const y = e.clientY;

    // Find dropped target element
    dragClone.style.display = 'none';
    const hitElement = document.elementFromPoint(x, y);
    dragClone.style.display = 'flex';

    const hitPlate = hitElement ? hitElement.closest('#plate-target') : null;
    const hitGlass = hitElement ? hitElement.closest('#glass-target') : null;

    const foodId = draggedItem.dataset.id;
    const foodType = draggedItem.dataset.type;
    const foodName = draggedItem.dataset.name;
    const foodDef = foods.find(f => f.id === foodId);

    let processed = false;

    // Release pointer capture safely and clean up listeners
    if (draggedItem) {
        try {
            draggedItem.releasePointerCapture(activePointerId);
        } catch (err) {
            console.log("Pointer capture release handled");
        }
    }
    
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);

    if (hitPlate && foodType === 'healthy-food') {
        // Place on plate
        placeOnPlate(foodDef);
        draggedItem.remove(); // Remove original card
        processed = true;
    } else if (hitGlass && foodType === 'healthy-drink') {
        // Place in glass
        placeInGlass(foodDef);
        draggedItem.remove(); // Remove original card
        processed = true;
    } else if (hitPlate || hitGlass) {
        // Incorrect match (junk food dragged to plate/glass, or wrong target)
        playSoundEffect('incorrect');
        draggedItem.classList.add('shake');
        setTimeout(() => {
            if (draggedItem) draggedItem.classList.remove('shake');
        }, 500);

        if (foodType === 'junk') {
            speak(`¡Oh no! El ${foodName} es comida chatarra con exceso de azúcar. ¡Déjalo fuera del plato!`);
            showToast(`El ${foodName} no es saludable. ¡Déjalo fuera!`, 'incorrect', '⚠️');
        } else {
            const correctTarget = foodType === 'healthy-food' ? 'el plato' : 'el vaso';
            speak(`¡Inténtalo otra vez! El ${foodName} va en ${correctTarget}.`);
            showToast(`El ${foodName} va en ${correctTarget}.`, 'incorrect', '💡');
        }
    }

    // Clean up drag helpers
    if (draggedItem && !processed) {
        draggedItem.style.opacity = '1';
    }
    if (dragClone) {
        dragClone.remove();
        dragClone = null;
    }
    plateTarget.classList.remove('drag-over');
    glassTarget.classList.remove('drag-over');
    
    draggedItem = null;
    activePointerId = null;

    checkPhase1Completion();
}

// Place element inside the Plate target
function placeOnPlate(foodDef) {
    playSoundEffect('correct');
    
    // Choose pre-defined slot depending on index to spread food nicely
    const slot = plateSlots[placedHealthyCount % plateSlots.length];
    
    const element = document.createElement('div');
    element.className = 'placed-item';
    element.style.left = `${slot.left}%`;
    element.style.top = `${slot.top}%`;
    element.style.transform = `translate(-50%, -50%) scale(1)`;
    element.innerHTML = foodDef.svg;
    
    plateItems.appendChild(element);
    placedHealthyCount++;

    const phrase = successPhrases[Math.floor(Math.random() * successPhrases.length)];
    speak(`${phrase} ¡${foodDef.name} saludable!`);
    showToast(`¡Agregaste ${foodDef.name}!`, 'correct', '✨');
}

// Place element in the Glass target
function placeInGlass(foodDef) {
    playSoundEffect('correct');
    
    // Fill effect
    glassFill.style.height = '85%';
    if (foodDef.id === 'milk') {
        glassFill.style.backgroundColor = '#F5F5F5'; // White milk
    } else {
        glassFill.style.backgroundColor = '#80DEEA'; // Light blue water
    }
    
    // Append a mini placed item inside the glass
    const element = document.createElement('div');
    element.className = 'placed-item';
    element.style.left = '50%';
    element.style.top = '40%';
    element.style.transform = 'translate(-50%, -50%) scale(0.9)';
    element.innerHTML = foodDef.svg;
    
    // Remove previous item inside glass if any
    const existing = glassTarget.querySelector('.placed-item');
    if (existing) existing.remove();

    glassTarget.appendChild(element);
    placedHealthyCount++;

    speak(`¡Muy bien! ¡${foodDef.name} para beber!`);
    showToast(`¡Serviste ${foodDef.name}!`, 'correct', '🥛');
}

// Check if all 10 healthy foods/drinks are sorted
function checkPhase1Completion() {
    // Total healthy elements to place is 10 (8 foods, 2 drinks)
    if (placedHealthyCount >= 10) {
        setTimeout(() => {
            speak("¡Excelente! Armaste tu plato saludable. Haz clic en el botón de abajo para seguir.");
            toPhase2Btn.classList.remove('hidden');
            toPhase2Btn.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    }
}

// Initialize Phase 2: Hygiene Actions Checklist
function initHygieneGame() {
    selectedHygieneCount = 0;
    finishBtn.classList.add('hidden');
    
    // Shuffle actions
    const shuffledActions = [...hygieneActions].sort(() => Math.random() - 0.5);
    hygieneGrid.innerHTML = '';
    
    shuffledActions.forEach(action => {
        const card = document.createElement('div');
        card.className = 'hygiene-card';
        card.dataset.id = action.id;
        card.dataset.correct = action.correct ? 'true' : 'false';
        card.dataset.name = action.name;
        
        card.innerHTML = `
            ${action.svg}
            <span>${action.name}</span>
            <div class="check-badge">✓</div>
        `;
        
        card.addEventListener('click', onHygieneClick);
        hygieneGrid.appendChild(card);
    });
}

function onHygieneClick(e) {
    const card = e.currentTarget;
    if (card.classList.contains('selected')) return; // Already correctly selected

    const isCorrect = card.dataset.correct === 'true';
    const actionId = card.dataset.id;
    const actionDef = hygieneActions.find(a => a.id === actionId);

    if (isCorrect) {
        card.classList.add('selected');
        playSoundEffect('correct');
        selectedHygieneCount++;
        
        speak(actionDef.info);
        showToast(actionDef.name, 'correct', '✓');

        // Check if all 4 correct hygiene habits are selected
        if (selectedHygieneCount >= 4) {
            setTimeout(() => {
                speak("¡Muy bien! Ya sabemos cómo comer de forma segura y limpia. ¡Toca el botón dorado para terminar!");
                finishBtn.classList.remove('hidden');
                finishBtn.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    } else {
        // Incorrect
        playSoundEffect('incorrect');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
        
        speak(actionDef.info);
        showToast("¡Prueba otra vez!", 'incorrect', '❌');
    }
}

// Event Listeners
startBtn.addEventListener('click', () => {
    initAudio();
    showScreen('game');
    initFoodGame();
});

toPhase2Btn.addEventListener('click', () => {
    showScreen('hygiene');
    initHygieneGame();
});

finishBtn.addEventListener('click', () => {
    showScreen('win');
});

restartBtn.addEventListener('click', () => {
    showScreen('welcome');
});

soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
    if (!soundEnabled) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    } else {
        initAudio();
    }
});

// Run orientation and resizing checks
window.addEventListener('resize', resizeCanvas);

// Welcome message on load (activated by clicking anywhere if browser block)
window.addEventListener('DOMContentLoaded', () => {
    // Start canvas resize prep
    resizeCanvas();
});
