// script.js (no changes needed for this specific request)
const questions = [
    // Type 1: Myth shown, user selects truth
    {
        type: "myth_to_truth",
        statement: "Black fathers are largely absent.",
        correct: "Over half of unmarried Black fathers were classified as highly involved in caregiving, play, and social activities.",
        incorrect1: "Most Black fathers live far from their children.",
        incorrect2: "Black fathers rarely participate in school activities.",
        incorrect3: "Black fathers are less involved than fathers of other races.",
        source: "Yoon et al. (2025)"
    },
    // Type 2: Truth shown, user selects myth
    {
        type: "truth_to_myth",
        statement: "Over half of unmarried Black fathers were classified as highly involved in caregiving, play, and social activities.",
        correct: "Black fathers are largely absent.",
        incorrect1: "Black fathers are more involved than fathers of other races.",
        incorrect2: "Black fathers only provide financial support.",
        incorrect3: "Black fathers don't participate in emotional caregiving.",
        source: "Yoon et al. (2025)"
    },
    // Type 1: Myth shown, user selects truth
    {
        type: "myth_to_truth",
        statement: "Unmarried Black fathers rarely provide emotional care.",
        correct: "Many unmarried Black fathers show high emotional and social engagement, not just financial support.",
        incorrect1: "Black fathers focus only on discipline.",
        incorrect2: "Black fathers avoid emotional conversations with children.",
        incorrect3: "Black fathers don't attend parent-teacher conferences.",
        source: "Yoon et al. (2025)"
    },
    // Type 2: Truth shown, user selects myth
    {
        type: "truth_to_myth",
        statement: "Children of high-involvement Black fathers show better social–emotional functioning.",
        correct: "Father involvement doesn't affect children's emotions.",
        incorrect1: "Father involvement only affects academic performance.",
        incorrect2: "Father involvement has no impact on behavior.",
        incorrect3: "Mother involvement is the only factor that matters.",
        source: "Yoon et al. (2025)"
    },
    // Type 1: Myth shown, user selects truth
    {
        type: "myth_to_truth",
        statement: "Nonresident fathers don't help young children.",
        correct: "Early nonresident father involvement predicts fewer behavior problems later in development.",
        incorrect1: "Nonresident fathers have no influence on child development.",
        incorrect2: "Nonresident fathers only visit on holidays.",
        incorrect3: "Nonresident fathers don't maintain regular contact.",
        source: "Lee et al. (2014)"
    },
    // Type 2: Truth shown, user selects myth
    {
        type: "truth_to_myth",
        statement: "Greater father involvement is linked to reduced exposure to adverse childhood experiences (ACEs).",
        correct: "Black fathers increase children's exposure to risk.",
        incorrect1: "Father involvement has no effect on childhood trauma.",
        incorrect2: "Only mothers can protect children from adverse experiences.",
        incorrect3: "Father involvement sometimes increases family stress.",
        source: "Lee et al. (2014)"
    },
    // Type 1: Myth shown, user selects truth
    {
        type: "myth_to_truth",
        statement: "Black fathers don't support mothers' mental health.",
        correct: "Nonresident father involvement is associated with lower maternal depression.",
        incorrect1: "Black fathers often create additional stress for mothers.",
        incorrect2: "Black fathers don't communicate with mothers about childcare.",
        incorrect3: "Black fathers avoid co-parenting responsibilities.",
        source: "Jackson et al. (2011)"
    },
    // Type 2: Truth shown, user selects myth
    {
        type: "truth_to_myth",
        statement: "Fathers emphasize 'being there,' nurturing, and teaching values as core roles.",
        correct: "Black fathers only provide money, not care.",
        incorrect1: "Black fathers focus primarily on financial provision.",
        incorrect2: "Black fathers don't participate in daily childcare routines.",
        incorrect3: "Black fathers avoid emotional involvement with children.",
        source: "Threlfall et al. (2013)"
    },
    // Type 1: Myth shown, user selects truth
    {
        type: "myth_to_truth",
        statement: "Black fathers are less engaged than other fathers.",
        correct: "Black fathers are as engaged or more engaged in talking, reading, and play than fathers from other racial groups.",
        incorrect1: "Black fathers spend less time with their children than other fathers.",
        incorrect2: "Black fathers are less likely to attend school events.",
        incorrect3: "Black fathers don't read to their children regularly.",
        source: "Hofferth (2003)"
    },
    // Type 2: Truth shown, user selects myth
    {
        type: "truth_to_myth",
        statement: "Social fathers (grandfathers, uncles, mentors) positively shape youths' relational schemas.",
        correct: "Father figures outside the home don't matter.",
        incorrect1: "Only biological fathers have significant impact on children.",
        incorrect2: "Extended family members don't influence child development.",
        incorrect3: "Mentorship has no effect on youth outcomes.",
        source: "Barton et al. (2016)"
    }
];

// Gallery images - replace with your actual image paths
const galleryImages = [
    'gallery1.jpg',
    'gallery2.jpg',
    'gallery3.jpg',
    'gallery4.jpg',
    'gallery5.jpg',
    'gallery6.jpg',
    'gallery7.jpg',
    'gallery8.jpg',
    'gallery9.jpg',
    'gallery10.jpg'
];

let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let gameActive = true;

// DOM elements for home page
const homePage = document.getElementById('home-page');
const gamePage = document.getElementById('game-page');
const galleryPage = document.getElementById('gallery-page');
const startGameBtn = document.getElementById('start-game-btn');
const viewGalleryBtn = document.getElementById('view-gallery-btn');
const returnHomeBtn = document.getElementById('return-home-btn');
const galleryToGameBtn = document.getElementById('gallery-to-game');
const galleryToHomeBtn = document.getElementById('gallery-to-home');

// DOM elements for game page
const progressFill = document.getElementById('progress-fill');
const questionsCompleted = document.getElementById('questions-completed');
const totalQuestions = document.getElementById('total-questions');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const questionText = document.getElementById('question-text');
const statementText = document.getElementById('statement-text');
const statementContainer = document.querySelector('.statement-container');
const optionsContainer = document.getElementById('options-container');
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const sourceElement = document.querySelector('.source');
const nextBtn = document.getElementById('next-btn');

// DOM elements for gallery page
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Initialize the application
function initApp() {
    // Set total questions in progress indicator
    totalQuestions.textContent = questions.length;
    updateProgress();
    
    // Create gallery thumbnails
    createGallery();
    
    // Add event listeners
    startGameBtn.addEventListener('click', showGamePage);
    viewGalleryBtn.addEventListener('click', showGalleryPage);
    returnHomeBtn.addEventListener('click', showHomePage);
    galleryToGameBtn.addEventListener('click', showGamePage);
    galleryToHomeBtn.addEventListener('click', showHomePage);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Show home page
function showHomePage() {
    homePage.style.display = 'flex';
    gamePage.style.display = 'none';
    galleryPage.style.display = 'none';
}

// Show game page
function showGamePage() {
    homePage.style.display = 'none';
    gamePage.style.display = 'flex';
    galleryPage.style.display = 'none';
    
    // Reset game state if starting fresh
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
        score = 0;
        streak = 0;
        scoreElement.textContent = score;
        streakElement.textContent = streak;
        updateProgress();
    }
    
    showQuestion();
}

// Show gallery page
function showGalleryPage() {
    homePage.style.display = 'none';
    gamePage.style.display = 'none';
    galleryPage.style.display = 'flex';
}

// Create gallery thumbnails
function createGallery() {
    galleryGrid.innerHTML = '';
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${image}" alt="Gallery image ${index + 1}">`;
        galleryItem.addEventListener('click', () => openLightbox(image));
        galleryGrid.appendChild(galleryItem);
    });
}

// Open lightbox with large image
function openLightbox(imageSrc) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Display current question
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // Set statement text based on question type (no color coding)
    if (question.type === "myth_to_truth") {
        statementText.textContent = `Myth: ${question.statement}`;
        questionText.textContent = "Select the truth that counters this myth:";
    } else {
        statementText.textContent = `Truth: ${question.statement}`;
        questionText.textContent = "Select the myth that this truth addresses:";
    }
    
    // Create options array
    const options = [
        { text: question.correct, isCorrect: true },
        { text: question.incorrect1, isCorrect: false },
        { text: question.incorrect2, isCorrect: false },
        { text: question.incorrect3, isCorrect: false }
    ];
    
    // Shuffle options
    shuffleArray(options);
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        // For myth_to_truth, options are truths. For truth_to_myth, options are myths.
        const prefix = (question.type === "myth_to_truth") ? "Truth: " : "Myth: ";
        button.textContent = prefix + option.text;
        button.addEventListener('click', () => selectOption(option, button, question));
        optionsContainer.appendChild(button);
    });
}

// Update progress bar
function updateProgress() {
    const percentage = (currentQuestionIndex / questions.length) * 100;
    progressFill.style.width = `${percentage}%`;
    questionsCompleted.textContent = currentQuestionIndex;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Handle option selection
function selectOption(option, button, question) {
    if (!gameActive) return;
    
    gameActive = false;
    
    if (option.isCorrect) {
        // Correct answer
        score += 10 + streak;
        streak++;
        button.classList.add('correct');
        feedbackTitle.textContent = 'Correct!';
        feedbackTitle.className = 'feedback-title';
        
        // Feedback text depends on question type
        if (question.type === "myth_to_truth") {
            feedbackText.textContent = `Truth: ${question.correct}`;
        } else {
            feedbackText.textContent = `Myth: ${question.correct}`;
        }
        sourceElement.textContent = `Source: ${question.source}`;
    } else {
        // Incorrect answer
        streak = 0;
        button.classList.add('incorrect', 'shake');
        feedbackTitle.textContent = 'Not quite!';
        feedbackTitle.className = 'feedback-title wrong';
        
        // Show correct answer in feedback
        if (question.type === "myth_to_truth") {
            feedbackText.textContent = `Truth: ${question.correct}`;
        } else {
            feedbackText.textContent = `Myth: ${question.correct}`;
        }
        sourceElement.textContent = `Source: ${question.source}`;
    }
    
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    
    // Show feedback overlay
    feedbackOverlay.classList.add('active');
}

// Move to next question
nextBtn.addEventListener('click', () => {
    feedbackOverlay.classList.remove('active');
    currentQuestionIndex++;
    updateProgress();
    gameActive = true;
    showQuestion();
});

// End game and show final score
function endGame() {
    statementText.innerHTML = "Game Completed!";
    questionText.textContent = "Final Score:";
    statementContainer.className = "statement-container";
    
    optionsContainer.innerHTML = `
        <div style="text-align: center; font-size: 4rem; font-weight: bold; margin: 20px 0;">${score}</div>
        <button id="restart-btn" class="option-btn">Play Again</button>
    `;
    
    document.getElementById('restart-btn').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        streak = 0;
        scoreElement.textContent = score;
        streakElement.textContent = streak;
        updateProgress();
        showQuestion();
    });
}

// Initialize the app when page loads
window.addEventListener('DOMContentLoaded', initApp);