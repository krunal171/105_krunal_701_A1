// Import the readline module
const readline = require('readline');

const today = new Date();

// const API_KEY = '03bef4a67c44793d566bcd96d2f592a7'; // Replace with your actual API key
// const CITY_NAME = 'Surat';
// const COUNTRY_CODE = 'IN'; // India
// const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather`;
// const response = await fetch(WEATHER_API_URL);
// const weatherData = await response.json(); 
// const temperature = weatherData.main.temp;

const y = today.getFullYear();
const m = today.getMonth() + 1; 
const d = today.getDate();
const dmy = `${d.toString().padStart(2, '0')}-${m.toString().padStart(2, '0')}-${y}`;


const chatbotResponses = {
  "hello ai": "hey what's your day going on today,if you need any help, please tell me...",
  "gm": "good morning, krunal:)",
  "date?": `today date is ${dmy}`,
  "wather?": `curently i dont able to show you tempreature`,
  "default": "Sorry, I didn't quite understand that. Can you please rephrase your question? Try asking about workouts, diet, or general fitness tips."
};


function getResponse(query) {
  const normalizedQuery = query.toLowerCase();
  for (let key in chatbotResponses) {
    if (normalizedQuery.includes(key)) {
      return chatbotResponses[key];
    }
  }
  return chatbotResponses["default"];
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function startChatbotCLI() {
  console.log("my ai:");
  console.log("Ask me anything. Type 'exit' to quit.\n");

  rl.question('You: ', (query) => {
    if (query.toLowerCase() === 'exit') {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    const response = getResponse(query);
    console.log(`Bot: ${response}\n`);
    startChatbotCLI(); 
  });
}


startChatbotCLI();



