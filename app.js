const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const content = document.querySelector('.content');
const btn = document.querySelector('.talk');

let isListening = false;

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    toggleListening();
});

function toggleListening() {
    if (isListening) {
        recognition.stop();
        isListening = false;
        btn.textContent = "Click here to speak";
    } else {
        content.textContent = "Listening...";
        recognition.start();
        isListening = true;
        btn.textContent = "Listening...";
    }
}

// Event listener to trigger microphone on pressing space bar
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
        toggleListening();
        // Prevent default spacebar behavior (scrolling the page)
        event.preventDefault();
    }
});

function speak(text) {
    const textToSpeak = new SpeechSynthesisUtterance(text);

    textToSpeak.rate = 1;
    textToSpeak.volume = 1;
    textToSpeak.pitch = 10;

    window.speechSynthesis.speak(textToSpeak);
}

function takeCommand(message) {
    switch (true) {
        case message.includes('hey') || message.includes('hello'):
            speak("Hello Boss, How may I help you");
            break;
        case message.includes('ok thank you'):
            speak("your welcome boss, please feel free for more assistance");
            break;
        case message.includes('calculator'):
            window.open('Calculator:///');
            const finalTextCalculator = "Just a Second";
            speak(finalTextCalculator);
            break;
        case message.includes('time'):
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            const finalTextTime = "The current time is " + time;
            speak(finalTextTime);
            break;
        case message.includes('date'):
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
            const finalTextDate = "Today's date is " + date;
            speak(finalTextDate);
            break;
        case message.includes('drive'):
            window.open('https://drive.google.com/', "_blank");
            speak("Opening Google Drive...");
            break;
        case message.includes('how old ') || message.includes('birthday'):
            const birthday = new Date(2024, 3, 20); // April is month 3 (0-indexed)
            const formattedBirthday = birthday.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
            const age = Math.floor((new Date() - birthday) / (365 * 24 * 60 * 60 * 1000)); // Calculating age in years
            const finalTextBirthday = `I was developed on ${formattedBirthday} & I'm ${age} years old`;
            speak(finalTextBirthday);
            break;
        case message.includes('incognito'):
            speak("I'm Sorry i can't open an incognito. U can open it by Pressing ctrl + shift + N");
            break;
        case message.includes("open"):
            const searchTerm = message.replace("open", "").trim();
            const url = `https://www.${encodeURIComponent(searchTerm.replace(/\s+/g, ''))}.com/`;
            window.open(url, "_blank");
            speak(`Sure Boss, Opening ${searchTerm}...`);
            //speak("Sure Boss, Opening");
            break;
        case message.includes('what is') || message.includes('who is') || message.includes('what are'):
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            const finalTextInternet = "This is what I found on the internet regarding " + message;
            speak(finalTextInternet);
            break;
        default:
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            const finalTextDefault = "Here u can find some information about" + message + " on Google";
            speak(finalTextDefault);
    }
    toggleListening()
}