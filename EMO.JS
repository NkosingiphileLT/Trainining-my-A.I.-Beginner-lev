function load(){
   if('speechSynthesis' in window){
     var speechRecognition = new webkitSpeechRecognition();
     speechRecognition.lang = 'en-US';
     speechRecognition.onstart = function(){
       console.log('listening for speech');
     };
     speechRecognition.onresult = function(event){
       console.log('heard speech');
       var text = event.results[0][0].transcript;
       document.getElementById('speech-text').innerHTML = text;

       let msg = new SpeechSynthesisUtterance();
       msg.text = text;
       window.speechSynthesis.speak(msg);
     };
     speechRecognition.start();
   }
 }

 const bot = {
   responses: {
     base: [
       'I am not sure I understand what you mean. Can you explain it to me?',
       'I am not sure I have an answer to that.',
       'I can see why you would think that, but lets explore that question further.'
     ],
     greetings: [
       'Hello, how can I help you today?',
       'Hi, what can I help you with?',
       'Hey, what do you need help with?'
     ],
     goodbye: [
       'Goodbye! Hope to see you again soon!',
       'Bye, hope to hear from you soon!',
       'Have a great day!'
     ]
   },
   getRandomResponse: function(responses) {
     const responseIndex = Math.floor(Math.random() * responses.length);
     return responses[responseIndex];
   },
   respondToUser: function(message) {
     let response;
     if (message.toLowerCase().includes('hello')) {
       response = this.getRandomResponse(this.responses.greetings);
     } else if (message.toLowerCase().includes('goodbye')) {
       response = this.getRandomResponse(this.responses.goodbye);
     } else {
       response = this.getRandomResponse(this.responses.base);
     }
     return response;
   }
 }

 function load(){
   if('speechSynthesis' in window){
     var speechRecognition = new webkitSpeechRecognition();
     speechRecognition.lang = 'en-US';
     speechRecognition.onstart = function(){
       console.log('listening for speech');
     };
     speechRecognition.onresult = function(event){
       console.log('heard speech');
       var text = event.results[0][0].transcript;
       document.getElementById('speech-text').innerHTML = text;
       let userMessageDiv = document.createElement('div');
       userMessageDiv.innerHTML = text;
       document.querySelector('#user-message').appendChild(userMessageDiv);
       let response = bot.respondToUser(text);
       let msg = new SpeechSynthesisUtterance();
       msg.text = response;
       window.speechSynthesis.speak(msg);
       let botMessageDiv = document.createElement('div');
       botMessageDiv.innerHTML = response;
       document.querySelector('#bot-message').appendChild(botMessageDiv);
     };
     speechRecognition.start();
   }
 }

 let messageForm = document.querySelector('#chat-form');
 messageForm.addEventListener('submit', (e) => {
   e.preventDefault();
   let userMessage = document.querySelector('#message').value;
   let userMessageDiv = document.createElement('div');
   userMessageDiv.innerHTML = userMessage;
   document.querySelector('#user-message').appendChild(userMessageDiv);
   let response = bot.respondToUser(userMessage);
   let botMessageDiv = document.createElement('div');
   botMessageDiv.innerHTML = response;
   document.querySelector('#bot-message').appendChild(botMessageDiv);
 });
 window.onload = load;
///////////////////////////////////////////////////////////////////
 