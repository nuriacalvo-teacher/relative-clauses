// Relative Clauses Learning App - Main Application

class RelativeClausesApp {
    constructor() {
        this.state = {
            student: {
                firstName: '',
                lastName: '',
                course: ''
            },
            currentScreen: 'login',
            currentQuestion: 0,
            answers: [],
            scores: {
                multipleChoice: 0,
                fillInGaps: 0,
                rephrasing: 0
            }
        };

        this.init();
    }

    init() {
  	  this.shuffleExercises();
          this.render();
}


    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        const app = document.getElementById('app');

        switch (this.state.currentScreen) {
            case 'login':
                app.innerHTML = this.renderLogin();
                this.attachLoginListeners();
                break;
            case 'menu':
                app.innerHTML = this.renderMenu();
                this.attachMenuListeners();
                break;
            case 'theory':
                app.innerHTML = this.renderTheory();
                this.attachTheoryListeners();
                break;
            case 'exercises':
                app.innerHTML = this.renderExercises();
                this.attachExerciseListeners();
                break;
            case 'results':
                app.innerHTML = this.renderResults();
                this.attachResultsListeners();
                break;
        }
    }

    renderHeader(showNav = false) {
    if (!showNav) return '';

    return `
        <header>
            <div class="header-title">Relative Clauses</div>
            <div class="student-info-header">
                <span>${this.state.student.firstName} ${this.state.student.lastName}</span> - <span>${this.state.student.course}</span>
            </div>
            <div class="nav-buttons">
                    <button class="nav-btn nav-btn-home" onclick="app.goHome()">🏠 Home</button>
                    ${this.state.currentScreen !== 'theory' ? '<button class="nav-btn nav-btn-theory" onclick="app.goToTheory()">📖 Theory</button>' : ''}
                    ${this.state.currentScreen !== 'exercises' ? '<button class="nav-btn nav-btn-exercises" onclick="app.goToExercises()">✏️ Exercises</button>' : ''}
                </div>
            </header>
        `;
    }

    renderLogin() {
        return `
            ${this.renderHeader(false)}
            <main>
                <div class="login-screen">
                    <h1>Welcome!</h1>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input type="text" id="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" id="lastName" required>
                        </div>
                        <div class="form-group">
                            <label for="course">Course:</label>
                            <select id="course" required>
                                <option value="">Select a course</option>
                                <option value="3ESO">3ESO</option>
                                <option value="4ESO">4ESO</option>
                                <option value="1BTO">1BTO</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-primary">Start Learning</button>
                    </form>
                </div>
            </main>
        `;
    }

    renderMenu() {
        return `
            ${this.renderHeader(true)}
            <main>
                <div class="menu-screen">
                    <h1>Welcome, ${this.state.student.firstName}!</h1>
                    <div class="welcome-message">${this.state.student.firstName} ${this.state.student.lastName} - ${this.state.student.course}</div>
                    <div class="menu-buttons">
                        <button class="menu-btn menu-btn-theory" onclick="app.goToTheory()">
                            <span style="font-size: 32px;">📖</span>
                            <span>Theory</span>
                        </button>
                        <button class="menu-btn menu-btn-exercises" onclick="app.goToExercises()">
                            <span style="font-size: 32px;">✏️</span>
                            <span>Exercises</span>
                        </button>
                    </div>
                </div>
            </main>
        `;
    }

    renderTheory() {
        return `
            ${this.renderHeader(true)}
            <main>
                <div class="theory-screen">
                    ${theoryContent}
                </div>
            </main>
        `;
    }

    renderExercises() {
        const currentExercise = this.getCurrentExercise();
        const progressPercent = (this.state.currentQuestion / 50) * 100;

        return `
            ${this.renderHeader(true)}
            <main>
                <div class="exercises-container">
                    ${this.renderScorePanel()}
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="question-counter">Question ${this.state.currentQuestion + 1} of 50</div>
                    ${this.renderExerciseNavigation()}
                    <div class="exercise">
                        ${this.renderCurrentExercise()}
                    </div>
                    <div id="feedbackContainer"></div>
                </div>
            </main>
        `;
    }

    renderScorePanel() {
        const mcScore = this.calculateSectionScore('multipleChoice');
        const fgScore = this.calculateSectionScore('fillInGaps');
        const rpScore = this.calculateSectionScore('rephrasing');
        const totalScore = mcScore + fgScore + rpScore;

        return `
            <div class="score-panel">
                <div class="score-item ${mcScore >= 18 ? 'passing' : ''}">
                    <h4>Multiple Choice</h4>
                    <div class="score-value">${mcScore}/20</div>
                    <div class="score-percentage">${Math.round((mcScore / 20) * 100)}%</div>
                </div>
                <div class="score-item ${fgScore >= 36 ? 'passing' : ''}">
                    <h4>Fill in the Gaps</h4>
                    <div class="score-value">${fgScore}/40</div>
                    <div class="score-percentage">${Math.round((fgScore / 40) * 100)}%</div>
                </div>
                <div class="score-item ${rpScore >= 36 ? 'passing' : ''}">
                    <h4>Rephrasing</h4>
                    <div class="score-value">${rpScore}/40</div>
                    <div class="score-percentage">${Math.round((rpScore / 40) * 100)}%</div>
                </div>
                <div class="score-item">
                    <h4>Total</h4>
                    <div class="score-value">${totalScore}/100</div>
                    <div class="score-percentage">${Math.round((totalScore / 100) * 100)}%</div>
                </div>
            </div>
        `;
    }

	
 renderExerciseNavigation() {
    // Encontrar el primer ejercicio sin responder en cada sección
    const firstUnansweredMC = this.getFirstUnansweredInSection(0, 10);
    const firstUnansweredFG = this.getFirstUnansweredInSection(10, 30);
    const firstUnansweredRP = this.getFirstUnansweredInSection(30, 50);

    return `
        <div class="exercise-navigation">
            <button class="jump-link ${this.state.currentQuestion < 10 ? 'active' : ''}" onclick="app.jumpTo(${firstUnansweredMC})">
                Jump to Multiple Choice (Q1-10)
            </button>
            <button class="jump-link ${this.state.currentQuestion >= 10 && this.state.currentQuestion < 30 ? 'active' : ''}" onclick="app.jumpTo(${firstUnansweredFG})">
                Jump to Fill in the Gaps (Q11-30)
            </button>
            <button class="jump-link ${this.state.currentQuestion >= 30 ? 'active' : ''}" onclick="app.jumpTo(${firstUnansweredRP})">
                Jump to Rephrasing (Q31-50)
            </button>
        </div>
    `;
}


    renderCurrentExercise() {
        const currentExercise = this.getCurrentExercise();
        const currentAnswer = this.state.answers[this.state.currentQuestion];
        const questionIndex = this.state.currentQuestion;

        if (questionIndex < 10) {
            return this.renderMultipleChoice(currentExercise, currentAnswer);
        } else if (questionIndex < 30) {
            return this.renderFillInTheGaps(currentExercise, currentAnswer);
        } else {
            return this.renderRephrasing(currentExercise, currentAnswer);
        }
    }

	renderMultipleChoice(exercise, currentAnswer) {
    const answered = this.state.answers[this.state.currentQuestion] !== undefined;
    return `
        <div class="exercise-question">
            <h3>${exercise.question}</h3>
            <div class="exercise-options">
                ${exercise.options.map((option, idx) => `
                    <label class="option ${currentAnswer === option ? 'selected' : ''}">
                        <input type="radio" name="answer" value="${option}" ${currentAnswer === option ? 'checked' : ''} ${answered ? 'disabled' : ''}>
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            <button class="submit-btn" onclick="app.submitAnswer()" ${answered ? 'disabled' : ''}>Submit Answer</button>
        </div>
    `;
}

renderFillInTheGaps(exercise, currentAnswer) {
    const answered = this.state.answers[this.state.currentQuestion] !== undefined;
    return `
        <div class="exercise-question">
            <h3>${exercise.sentence}</h3>
            <input type="text" class="fill-input" id="answerInput" value="${currentAnswer?.text || ''}" placeholder="Type your answer here" ${answered ? 'disabled' : ''}>
            <button class="submit-btn" onclick="app.submitAnswer()" style="margin-top: 15px;" ${answered ? 'disabled' : ''}>Submit Answer</button>
        </div>
    `;
}

renderRephrasing(exercise, currentAnswer) {
    const answered = this.state.answers[this.state.currentQuestion] !== undefined;
    return `
        <div class="exercise-question">
            <h3>${exercise.instruction}</h3>
            <textarea class="textarea-input" id="answerInput" placeholder="Type your answer here" ${answered ? 'disabled' : ''}>${currentAnswer?.text || ''}</textarea>
            <button class="submit-btn" onclick="app.submitAnswer()" style="margin-top: 15px;" ${answered ? 'disabled' : ''}>Submit Answer</button>
        </div>
    `;
}


    renderResults() {
        const mcScore = this.calculateSectionScore('multipleChoice');
        const fgScore = this.calculateSectionScore('fillInGaps');
        const rpScore = this.calculateSectionScore('rephrasing');
        const totalScore = mcScore + fgScore + rpScore;

        const mcPercent = Math.round((mcScore / 20) * 100);
        const fgPercent = Math.round((fgScore / 40) * 100);
        const rpPercent = Math.round((rpScore / 40) * 100);
        const totalPercent = Math.round((totalScore / 100) * 100);

        const passed = mcPercent >= 90 && fgPercent >= 90 && rpPercent >= 90;

        return `
            ${this.renderHeader(true)}
            <main>
                <div class="results-screen">
                    <<div class="results-header">
   			 <h1>${passed ? '🎉 Congratulations!' : 'Results'}</h1>
   			 <div class="student-header">
   		     <div class="student-name">${this.state.student.firstName} ${this.state.student.lastName}</div>
    		    <div class="student-course">${this.state.student.course}</div>
   		 </div>
		</div>

                    <div class="results-scores">
                        <div class="score-section ${mcPercent >= 90 ? 'passing' : 'failing'}">
                            <div class="score-section-name">
                                <span>${mcPercent >= 90 ? '✓' : '✗'}</span> Multiple Choice
                            </div>
                            <div class="score-section-detail">
                                <div class="score-section-value">${mcScore}/20</div>
                                <div class="score-section-percentage">${mcPercent}%</div>
                            </div>
                        </div>

                        <div class="score-section ${fgPercent >= 90 ? 'passing' : 'failing'}">
                            <div class="score-section-name">
                                <span>${fgPercent >= 90 ? '✓' : '✗'}</span> Fill in the Gaps
                            </div>
                            <div class="score-section-detail">
                                <div class="score-section-value">${fgScore}/40</div>
                                <div class="score-section-percentage">${fgPercent}%</div>
                            </div>
                        </div>

                        <div class="score-section ${rpPercent >= 90 ? 'passing' : 'failing'}">
                            <div class="score-section-name">
                                <span>${rpPercent >= 90 ? '✓' : '✗'}</span> Rephrasing
                            </div>
                            <div class="score-section-detail">
                                <div class="score-section-value">${rpScore}/40</div>
                                <div class="score-section-percentage">${rpPercent}%</div>
                            </div>
                        </div>

                        <div class="score-section" style="border-left-color: #3b82f6;">
                            <div class="score-section-name">Total Score</div>
                            <div class="score-section-detail">
                                <div class="score-section-value">${totalScore}/100</div>
                                <div class="score-section-percentage">${totalPercent}%</div>
                            </div>
                        </div>
                    </div>

                    <div class="results-message ${passed ? 'passed' : 'failed'}">
                        ${passed ? `
                            <h2>🎉 You PASSED! 🎉</h2>
                            <p>Excellent work, ${this.state.student.firstName}!</p>
                            <p>Please take a SCREENSHOT of this result and submit it through Google Classroom.</p>
                            <div class="section-check">
                                <span class="check-icon pass">✓</span>
                                <span>Multiple Choice: ${mcPercent}%</span>
                            </div>
                            <div class="section-check">
                                <span class="check-icon pass">✓</span>
                                <span>Fill in the Gaps: ${fgPercent}%</span>
                            </div>
                            <div class="section-check">
                                <span class="check-icon pass">✓</span>
                                <span>Rephrasing: ${rpPercent}%</span>
                            </div>
                        ` : `
                            <h2>Keep Trying!</h2>
                            <p>You scored ${totalPercent}%, but you need 90% in EACH section to pass.</p>
                            <div class="section-check">
                                <span class="check-icon ${mcPercent >= 90 ? 'pass' : 'fail'}">
                                    ${mcPercent >= 90 ? '✓' : '✗'}
                                </span>
                                <span>Multiple Choice: ${mcPercent}% ${mcPercent < 90 ? '(Need 90%)' : ''}</span>
                            </div>
                            <div class="section-check">
                                <span class="check-icon ${fgPercent >= 90 ? 'pass' : 'fail'}">
                                    ${fgPercent >= 90 ? '✓' : '✗'}
                                </span>
                                <span>Fill in the Gaps: ${fgPercent}% ${fgPercent < 90 ? '(Need 90%)' : ''}</span>
                            </div>
                            <div class="section-check">
                                <span class="check-icon ${rpPercent >= 90 ? 'pass' : 'fail'}">
                                    ${rpPercent >= 90 ? '✓' : '✗'}
                                </span>
                                <span>Rephrasing: ${rpPercent}% ${rpPercent < 90 ? '(Need 90%)' : ''}</span>
                            </div>
                            <p style="margin-top: 20px;">Review the theory and try again. You can do it! 💪</p>
                        `}
                    </div>

                    <div class="results-buttons">
                        <button class="btn-large btn-large-secondary" onclick="app.goHome()">Back to Menu</button>
                        <button class="btn-large btn-large-primary" onclick="app.tryAgain()">Try Again</button>
                    </div>
                </div>
            </main>
        `;
    }

    attachLoginListeners() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const course = document.getElementById('course').value;

            if (firstName && lastName && course) {
                this.setState({
                    student: { firstName, lastName, course },
                    currentScreen: 'menu'
                });
            }
        });
    }

    attachMenuListeners() {}
    attachTheoryListeners() {}
    attachExerciseListeners() {}
    attachResultsListeners() {}

    submitAnswer() {
    const questionIndex = this.state.currentQuestion;
    const currentExercise = this.getCurrentExercise();
    let answer;

    if (questionIndex < 10) {
        const selected = document.querySelector('input[name="answer"]:checked');
        answer = selected ? selected.value : '';
    } else {
        answer = document.getElementById('answerInput').value.trim();
    }

    const isCorrect = this.checkAnswer(answer, currentExercise);
    const newAnswers = [...this.state.answers];
    newAnswers[questionIndex] = { text: answer, correct: isCorrect };

    this.state.answers = newAnswers;
    
    // Deshabilitar el botón Submit
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) submitBtn.disabled = true;
    
    this.showFeedback(isCorrect, currentExercise, answer);
}


        checkAnswer(answer, exercise) {
       	 if (this.state.currentQuestion < 10) {
       	 return exercise.correct.includes(answer);
    	 } else if (this.state.currentQuestion < 30) {
        	const normalized = this.normalizeAnswer(answer);
        	return exercise.correct.some(correct => 
           	 this.normalizeAnswer(correct) === normalized
        	);
 	   } else {
     	   // Rephrasing: preserve commas in validation
     	   const normalized = this.normalizeAnswerRephrasing(answer);
    	    return exercise.correct.some(correct => 
    	        this.normalizeAnswerRephrasing(correct) === normalized
   	     );
 	   }
	}

	normalizeAnswer(text) {
   	 return text.toLowerCase()
    	    .replace(/[^a-z0-9 ]/g, '')
    	    .trim()
     	   .replace(/  +/g, ' ');
	}
	normalizeAnswerRephrasing(text) {
    // For rephrasing: keep commas but remove final punctuation
    return text.toLowerCase()
        .replace(/[.!?;:]+$/, '')
        .replace(/[^a-z0-9 ,]/g, '')
        .trim()
        .replace(/  +/g, ' ')
        .replace(/ +, +/g, ', ')
        .replace(/, +/g, ', ');
}

	shuffleArray(array) {
   	  const shuffled = [...array];
  	  for (let i = shuffled.length - 1; i > 0; i--) {
  	  	const j = Math.floor(Math.random() * (i + 1));
  	  	[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    	  }
    	  return shuffled;
	}

	shuffleExercises() {
 	   const mc = this.shuffleArray(exercisesData.slice(0, 10));
 	   const fg = this.shuffleArray(exercisesData.slice(10, 30));
	    const rp = this.shuffleArray(exercisesData.slice(30, 50));
	    this.shuffledExercises = [...mc, ...fg, ...rp];
	}


    fuzzyMatch(answer, correct) {
        const answerWords = answer.split(' ').filter(w => w);
        const correctWords = correct.split(' ').filter(w => w);

        let matches = 0;
        for (let word of correctWords) {
            if (answerWords.includes(word)) {
                matches++;
            }
        }

        return matches / correctWords.length > 0.7;
    }

    showFeedback(isCorrect, exercise, answer) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedback = this.generateFeedback(isCorrect, exercise, answer);

        feedbackContainer.innerHTML = `
            <div class="feedback show ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-header">
                    <span class="feedback-icon">${isCorrect ? '✓' : '✗'}</span>
                    <span>${isCorrect ? 'CORRECT!' : 'INCORRECT'}</span>
                </div>
                <div class="feedback-text">${feedback}</div>
                <div class="feedback-buttons">
                    <button class="btn-nav btn-prev" ${this.state.currentQuestion === 0 ? 'disabled' : ''} onclick="app.previousQuestion()">← Previous</button>
                    <button class="btn-nav btn-next" ${this.state.currentQuestion === 49 ? 'disabled' : ''} onclick="app.nextQuestion()">Next →</button>
                </div>
            </div>
        `;

        feedbackContainer.scrollIntoView({ behavior: 'smooth' });
    }

    generateFeedback(isCorrect, exercise, answer) {
        if (isCorrect) {
            return 'Great job! Your answer is correct.';
        } else {
            const correct = exercise.correct[0];
            return `The correct answer is: <strong>${correct}</strong>`;
        }
    }

    calculateSectionScore(section) {
        let count = 0;
        let start, end;

        if (section === 'multipleChoice') {
            start = 0;
            end = 10;
        } else if (section === 'fillInGaps') {
            start = 10;
            end = 30;
        } else {
            start = 30;
            end = 50;
        }

        for (let i = start; i < end; i++) {
            if (this.state.answers[i] && this.state.answers[i].correct) {
                count++;
            }
        }

        return count * 2;
    }

    getCurrentExercise() {
    return this.shuffledExercises[this.state.currentQuestion];
    }


    goHome() {
        this.setState({ currentScreen: 'menu' });
    }

    goToTheory() {
        this.setState({ currentScreen: 'theory' });
    }

    goToExercises() {
        this.setState({ currentScreen: 'exercises' });
    }

	getFirstUnansweredInSection(start, end) {
    for (let i = start; i < end; i++) {
        // Si no hay respuesta, o la respuesta es incorrecta, retorna ese índice
        if (!this.state.answers[i] || !this.state.answers[i].correct) {
            return i;
        }
    }
    // Si todo está respondido, retorna el último de la sección
    return end - 1;
	}

    jumpTo(questionIndex) {
        this.setState({ currentQuestion: questionIndex });
    }


	previousQuestion() {
    if (this.state.currentQuestion > 0) {
        this.setState({ currentQuestion: this.state.currentQuestion - 1 });
        // Mostrar corrección y deshabilitar Inputs al volver atrás
        setTimeout(() => {
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) submitBtn.disabled = true;

            // Mostrar el feedback de la respuesta guardada
            const idx = this.state.currentQuestion;
            const currentAnswer = this.state.answers[idx];
            const currentExercise = this.getCurrentExercise();
            if (currentAnswer) {
                this.showFeedback(currentAnswer.correct, currentExercise, currentAnswer.text);
            } else {
                const feedbackContainer = document.getElementById('feedbackContainer');
                if (feedbackContainer) feedbackContainer.innerHTML = '';
            }
        }, 0);
    }
}

nextQuestion() {
    if (this.state.currentQuestion < 49) {
        this.setState({ currentQuestion: this.state.currentQuestion + 1 });
        // Habilitar input y botón para nueva pregunta, limpiar feedback
        setTimeout(() => {
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) submitBtn.disabled = false;
            const feedbackContainer = document.getElementById('feedbackContainer');
            if (feedbackContainer) feedbackContainer.innerHTML = '';
        }, 0);
    } else {
        this.setState({ currentScreen: 'results' });
    }
}


    tryAgain() {
        this.setState({
            currentQuestion: 0,
            answers: [],
            currentScreen: 'exercises'
        });
    }
}

const app = new RelativeClausesApp();
