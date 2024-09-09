import questions from "./questions.js";


// onloead funktion beim Laden der Webseite
document.addEventListener('DOMContentLoaded', function() {
    // Test div in den alle Fragen enthalten sind
    const testDiv = document.getElementsByClassName('test')[0];
    for (let i = 0; i < questions.length; i++) {

        // erstellen des Fragen Divs
        const fragenDiv = document.createElement('div');
        fragenDiv.className = 'fragenDiv';

        // Erstellen des Head Bereichs der Frage
        const fragenHead = document.createElement('div');
        fragenHead.className = 'fragenHead';
/*         fragenHead.innerText = (i + 1) + ': ' + questions[i].question + ' (Erreichbare Punktzahl: ' + questions[i].score + ')';
 */        fragenDiv.appendChild(fragenHead);
 

        const fragenNumber = document.createElement('div')
        fragenNumber.className = 'fragenNumber'
        fragenNumber.innerText = i+1;
        fragenHead.appendChild(fragenNumber);


        const fragenTitel = document.createElement('h3');
        fragenTitel.className = 'fragenTitel';
        fragenTitel.innerText = questions[i].question;
        fragenHead.appendChild(fragenTitel)

        const fragenPoints = document.createElement('div');
        fragenPoints.className = 'fragenPoints';
        fragenPoints.innerHTML = '1 Pt.';
        fragenHead.appendChild(fragenPoints);


        // Erstellen der Antwortmöglichkeiten
        const questionAnswers = document.createElement('div');
        questionAnswers.className = 'questionAnswers';

        for (let j = 0; j < questions[i].answers.length; j++) {
            const answerInput = document.createElement('input');
            answerInput.type = questions[i].correct.length > 1 ? 'checkbox' : 'radio';
            answerInput.name = 'question' + i;
            answerInput.value = j;

            const answerLabel = document.createElement('label');
            answerLabel.appendChild(answerInput);
            answerLabel.innerHTML += questions[i].answers[j];
            questionAnswers.appendChild(answerLabel);
            questionAnswers.appendChild(document.createElement('br'));
        }
        fragenDiv.appendChild(questionAnswers);

        // Erstellen des "Ergebnisses" der Antwort auf die Frage
        const questionResult = document.createElement('div');
        questionResult.className = 'questionResult';
        fragenDiv.appendChild(questionResult);
        testDiv.appendChild(fragenDiv);
    }
});

// Hilffunktion die überprüft ob beide arrays übereinstimmen
function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}


// Funktion die ausgeführt wird beim button click
function checkAnswers() {
    let score = 0;
    let fragen = questions.length
    for (let i = 0; i < fragen; i++) {
        const userAnswers = [];
        const inputs = document.getElementsByName('question' + i);
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
                userAnswers.push(Number(inputs[j].value));
            }
        }
        if (arraysEqual(userAnswers, questions[i].correct)) {
            score += questions[i].score;
            document.getElementsByClassName('questionResult')[i].innerText = 'Richtig';
            document.getElementsByClassName('questionResult')[i].style.color = 'green';
        } else {
            document.getElementsByClassName('questionResult')[i].innerText = 'Falsch';
            document.getElementsByClassName('questionResult')[i].style.color = 'red';
        }
    }
    document.getElementsByTagName('span')[0].innerText = 'Gesamtpunktzahl: ' + score + ' / ' + fragen;
}

//Notiz für mich selber: In Modulen sind Funktionen und Variablen standardmäßig nicht im globalen Scope verfügbar.
// Mit der window. funktion kann ich sie aber global verfügbar machen.
window.checkAnswers = checkAnswers;