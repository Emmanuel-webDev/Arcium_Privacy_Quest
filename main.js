const questions = [
  {
    question:
      "What is the main problem that Arcium solves in blockchain applications?",
    answers: [
      { text: "Slow transaction speeds", correct: false },
      { text: "High gas fees", correct: false },
      { text: "Lack of privacy in data processing", correct: true },
      { text: "Limited storage capacity", correct: false },
    ],
    explanation:
      "Arcium solves the privacy problem in blockchain. While blockchains are transparent and secure, this transparency means sensitive data can be seen by everyone. Arcium enables computation on encrypted data, keeping your information private even while it's being processed!",
  },
  {
    question: "How does Arcium's confidential computing work?",
    answers: [
      { text: "It stores data in a secret location", correct: false },
      {
        text: "It processes encrypted data without decrypting it",
        correct: true,
      },
      { text: "It deletes data after processing", correct: false },
      { text: "It uses stronger passwords", correct: false },
    ],
    explanation:
      "Arcium uses confidential computing to process encrypted data without ever decrypting it! Imagine doing math on locked boxes without opening them - that's the power of confidential computing. Your data stays encrypted from start to finish.",
  },
  {
    question: "What does MPC (Multi-Party Computation) allow you to do?",
    answers: [
      { text: "Share your password with multiple people", correct: false },
      {
        text: "Compute results together without revealing individual inputs",
        correct: true,
      },
      { text: "Store data across multiple computers", correct: false },
      { text: "Mine cryptocurrency faster", correct: false },
    ],
    explanation:
      "MPC is like a group of friends calculating their average salary without anyone revealing their actual salary! Each person contributes their encrypted data, and the computation happens without anyone seeing the individual inputs. Pretty cool, right?",
  },
  {
    question: "Why is decentralization important for Arcium's privacy network?",
    answers: [
      { text: "It makes the network faster", correct: false },
      {
        text: "It eliminates single points of failure and trust",
        correct: true,
      },
      { text: "It reduces electricity costs", correct: false },
      { text: "It makes setup easier", correct: false },
    ],
    explanation:
      "Decentralization means no single company or entity controls your data or computation. It's distributed across many nodes, so there's no central point that could be compromised or that you need to trust. Your privacy isn't dependent on one organization being trustworthy!",
  },
  {
    question:
      "Which real-world scenario would benefit most from Arcium's technology?",
    answers: [
      { text: "Posting photos on social media", correct: false },
      { text: "Medical records sharing between hospitals", correct: true },
      { text: "Watching streaming videos", correct: false },
      { text: "Playing online games", correct: false },
    ],
    explanation:
      "Medical records are perfect for Arcium! Hospitals need to share patient data for research and treatment, but patient privacy is critical. With Arcium, hospitals can collaboratively analyze medical data and compute results without exposing individual patient information. Lives can be saved while privacy is protected!",
  },
  {
    question: "What makes Arcium different from traditional encryption?",
    answers: [
      { text: "Arcium uses longer passwords", correct: false },
      { text: "Arcium allows computation on encrypted data", correct: true },
      { text: "Arcium encrypts data twice", correct: false },
      { text: "Arcium doesn't use encryption", correct: false },
    ],
    explanation:
      "Traditional encryption is like putting your data in a locked safe - you need to unlock it to use it! Arcium is revolutionary because it lets you compute and process data WHILE it's still encrypted. It's like doing work inside a locked safe without ever opening it. This means your data never has to be exposed, even during processing!",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  const question = questions[currentQuestionIndex];

  document.getElementById("current-question").textContent =
    currentQuestionIndex + 1;
  document.getElementById("total-questions").textContent = questions.length;
  document.getElementById("question-text").textContent = question.question;

  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className =
      "w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-cyan-500 hover:bg-gray-800 transition-all duration-300 transform hover:scale-102";
    button.innerHTML = `<span class="font-semibold text-gray-300">${answer.text}</span>`;
    button.onclick = () => selectAnswer(index);
    answersContainer.appendChild(button);
  });

  document.getElementById("explanation-card").classList.add("hidden");
  document.getElementById("wrong-card").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const question = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll("#answers-container button");

  buttons.forEach((button, i) => {
    button.disabled = true;
    if (question.answers[i].correct) {
      button.classList.add("border-green-500", "bg-green-900/30");
    } else if (i === index && !question.answers[i].correct) {
      button.classList.add("border-red-500", "bg-red-900/30");
    }
  });

  if (question.answers[index].correct) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("explanation-card").classList.remove("hidden");
    document.getElementById("explanation-text").textContent =
      question.explanation;
  } else {
    document.getElementById("wrong-card").classList.remove("hidden");
    document.getElementById("wrong-text").textContent = question.explanation;
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("results-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = score;
  document.getElementById("final-total").textContent = questions.length;

  const percentage = (score / questions.length) * 100;
  let message = "";

  if (percentage === 100) {
    message = "Perfect! You're an Arcium privacy expert! 🎉";
  } else if (percentage >= 80) {
    message = "Excellent! You understand privacy computing very well! 🌟";
  } else if (percentage >= 60) {
    message = "Good job! You're getting the hang of confidential computing! 👍";
  } else {
    message =
      "Keep learning! Privacy is important and you're on the right track! 💪";
  }

  document.getElementById("result-message").textContent = message;
}

function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("results-screen").classList.add("hidden");
  loadQuestion();
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", restartGame);

// Start the game
loadQuestion();
