const morningNotes = [
    "Good morning, beautiful! Hope your day is as amazing as you are! 🌅",
    "Rise and shine! Sending you morning kisses! 💋",
    "Wishing you a wonderful morning filled with love! 🌞",
    "Good morning! You're the first thing I think of when I wake up! 💭",
    "Morning has broken, and my heart is full of love for you! 💖",
    "Start your day with a smile, knowing I'm thinking of you! 😊",
    "Good morning, my love! May your day be as sweet as you are! 🍯",
    "Morning coffee and thoughts of you - perfect start to the day! ☕",
    "Good morning, sunshine! You light up my world! 🌞",
    "Waking up to another day of loving you! 💝",
    "Morning vibes: thinking of you! 🌅",
    "Good morning! You're my favorite hello! 👋",
    "Rise and shine, my beautiful! 💫",
    "Morning has come, and I'm still crazy about you! 💖",
    "Good morning! Sending you virtual breakfast in bed! 🍳"
];

const afternoonNotes = [
    "Hope your day is going great! Sending you afternoon hugs! 🤗",
    "Just a reminder that you're amazing! Keep shining! ⭐",
    "Halfway through the day, but my love for you is full! 💝",
    "Taking a break? Here's a virtual kiss! 💋",
    "Hope your afternoon is as beautiful as you are! 🌸",
    "Sending you positive vibes for the rest of your day! ✨",
    "You're doing great! Keep being awesome! 🌟",
    "Afternoon pick-me-up: you're incredible! 💫",
    "Hope your day is as sweet as you are! 🍯",
    "Sending you afternoon sunshine! ☀️",
    "You're making this day better just by being you! 💖",
    "Afternoon thoughts of you make me smile! 😊",
    "Keep shining, beautiful! 🌟",
    "You're the highlight of my day! ✨",
    "Sending you virtual cookies and love! 🍪"
];

const eveningNotes = [
    "Hope you had a wonderful day! You're the best! 🌙",
    "Winding down? Here's a cozy evening hug! 🤗",
    "You made it through another day! I'm so proud of you! 🏆",
    "Evening thoughts of you make my heart smile! 💖",
    "Rest well, knowing you're loved! 💝",
    "Sweet dreams are made of you! 🌠",
    "Ending the day with thoughts of you! 💭",
    "Evening vibes: missing you! 🌆",
    "Hope your evening is as peaceful as you are! 🌅",
    "Sending you evening cuddles! 🛋️",
    "You're the best part of my day! 💫",
    "Evening has come, but my love for you never ends! 💖",
    "Winding down with thoughts of you! 🌙",
    "Hope your evening is filled with love! 💝",
    "Sending you virtual hot chocolate and love! ☕"
];

const generalNotes = [
    "Every time I see you, my heart skips a beat ❤️",
    "You make every day brighter just by being you ✨",
    "You're the best thing that's ever happened to me 💝",
    "I fall in love with you more and more each day 💑",
    "You're my favorite hello and my hardest goodbye 💕",
    "Life is better with you by my side 💖",
    "You're the reason I smile every day 😊",
    "My heart belongs to you forever 💗",
    "You're my everything 💘",
    "Every moment with you is a treasure 💎",
    "You're the missing piece to my puzzle 🧩",
    "My love for you grows stronger every day 💓",
    "You're the most beautiful person inside and out 🌟",
    "I'm so lucky to have you in my life 🍀",
    "You make my heart feel complete 💝",
    "You're my favorite notification! 📱",
    "Sending you virtual hugs and kisses! 💋",
    "You're the reason I believe in love! 💖",
    "Every day with you is a blessing! 🙏",
    "You're my favorite person in the whole world! 🌍"
];

const titles = [
    "💝 Love Note",
    "💖 Sweet Message",
    "💕 Thinking of You",
    "💗 Special Message",
    "💘 Love Reminder",
    "💓 Heart to Heart",
    "💞 Love You",
    "💟 My Love",
    "💌 Love Letter",
    "💋 Kisses"
];

function getTimeBasedNote() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return morningNotes[Math.floor(Math.random() * morningNotes.length)];
    } else if (hour >= 12 && hour < 17) {
        return afternoonNotes[Math.floor(Math.random() * afternoonNotes.length)];
    } else if (hour >= 17 && hour < 22) {
        return eveningNotes[Math.floor(Math.random() * eveningNotes.length)];
    } else {
        // Late night/early morning - use general notes
        return generalNotes[Math.floor(Math.random() * generalNotes.length)];
    }
}

function showRandomNote() {
    const note = getTimeBasedNote();
    const randomTitleIndex = Math.floor(Math.random() * titles.length);
    const title = titles[randomTitleIndex];
    
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.jpg',
        title: title,
        message: note,
        priority: 2
    });
}

// Show a note when the extension icon is clicked
chrome.action.onClicked.addListener(() => {
    showRandomNote();
});

// Set up alarm to show notes every 10 minutes
chrome.alarms.create('loveNote', {
    delayInMinutes: 1, // Show first note after 1 minute
    periodInMinutes: 10 // Then every 10 minutes
});

// Handle alarm to show notes
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'loveNote') {
        showRandomNote();
    }
});

// Show first note when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    showRandomNote();
}); 