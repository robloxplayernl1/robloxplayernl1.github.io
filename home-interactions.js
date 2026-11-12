const funFacts = [
    "Sil heeft Verschrikkelijke Ikke al ongeveer tien keer gezien, vooral omdat de Minions erin spelen.",
    "Paars is Sil's favoriete kleur. Dat zie je ook terug op deze website!",
    "Sil is graag bezig met coderen en heeft ook een eigen 3D-printer.",
    "In de herfst vindt Sil het heerlijk om binnen met een kaarsje en een chipje te coderen.",
    "Sil's favoriete dier is de wolf."
];

const factElement = document.querySelector("#fun-fact");
const nextFactButton = document.querySelector("#next-fact");

if (factElement && nextFactButton) {
    let currentFactIndex = 0;

    nextFactButton.addEventListener("click", () => {
        currentFactIndex = (currentFactIndex + 1) % funFacts.length;
        factElement.textContent = funFacts[currentFactIndex];
    });
}

const quizQuestions = [
    {
        question: "Wat is Sil's favoriete kleur?",
        answers: ["Blauw", "Paars", "Groen"],
        correctAnswer: 1
    },
    {
        question: "Welk seizoen vindt Sil het fijnst?",
        answers: ["Zomer", "Lente", "Herfst"],
        correctAnswer: 2
    },
    {
        question: "Wat is Sil's favoriete dier?",
        answers: ["Wolf", "Kat", "Pinguïn"],
        correctAnswer: 0
    },
    {
        question: "Welke game staat in Sil's top 3?",
        answers: ["Farming Simulator 25", "Rocket League", "The Sims 4"],
        correctAnswer: 0
    },
    {
        question: "Naar welk land gaat Sil graag op vakantie?",
        answers: ["Japan", "Canada", "Spanje"],
        correctAnswer: 1
    }
];

const quizProgress = document.querySelector("#quiz-progress");
const quizQuestion = document.querySelector("#quiz-question");
const quizAnswers = document.querySelector("#quiz-answers");
const quizStatus = document.querySelector("#quiz-status");
const quizNextButton = document.querySelector("#quiz-next");

if (quizProgress && quizQuestion && quizAnswers && quizStatus && quizNextButton) {
    let currentQuestionIndex = 0;
    let score = 0;

    function renderQuizQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        quizProgress.textContent = `Vraag ${currentQuestionIndex + 1} van ${quizQuestions.length}`;
        quizQuestion.textContent = question.question;
        quizStatus.textContent = "";
        quizNextButton.hidden = true;
        quizNextButton.textContent = "Volgende vraag";
        quizAnswers.replaceChildren(...question.answers.map((answer, answerIndex) => {
            const button = document.createElement("button");
            button.className = "quiz-answer";
            button.type = "button";
            button.textContent = answer;
            button.addEventListener("click", () => {
                const isCorrect = answerIndex === question.correctAnswer;
                if (isCorrect) score += 1;

                quizAnswers.querySelectorAll("button").forEach((answerButton, index) => {
                    answerButton.disabled = true;
                    if (index === question.correctAnswer) {
                        answerButton.classList.add("is-correct");
                    } else if (index === answerIndex) {
                        answerButton.classList.add("is-incorrect");
                    }
                });

                quizStatus.textContent = isCorrect
                    ? "Goed geraden!"
                    : `Helaas! Het juiste antwoord is: ${question.answers[question.correctAnswer]}.`;
                quizNextButton.hidden = false;
            });
            return button;
        }));
    }

    quizNextButton.addEventListener("click", () => {
        if (currentQuestionIndex >= quizQuestions.length) {
            currentQuestionIndex = 0;
            score = 0;
            renderQuizQuestion();
            quizQuestion.focus();
            return;
        }

        currentQuestionIndex += 1;
        if (currentQuestionIndex < quizQuestions.length) {
            renderQuizQuestion();
            quizQuestion.focus();
            return;
        }

        quizProgress.textContent = "Quiz afgelopen";
        quizQuestion.textContent = "Klaar met de quiz!";
        quizAnswers.replaceChildren();
        quizStatus.textContent = `Je had ${score} van de ${quizQuestions.length} vragen goed.`;
        quizNextButton.textContent = "Opnieuw spelen";
    });

    renderQuizQuestion();
}
