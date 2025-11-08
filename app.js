// Relative Clauses Learning App - Main Application
// Google Sheets Integration - Permanent Leaderboard

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbykQRM34b5hHS4xBlKuPyUJr_BAf2QS-rKlDcPmrntbNCOfyBL51usULV9bGL1C4kRV0w/exec'; // Tu URL de Google Apps Script

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
        showPreviousFeedback: false,
        isAuthenticated: false,
        password: 'nuriaLEGEND',
        startTime: null,
        leaderboard: [],
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

        if (!this.state.isAuthenticated) {
            app.innerHTML = this.renderAuthScreen();
            return;
        }

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
            case 'finalResults':
                app.innerHTML = this.renderFinalResults();
                this.attachResultsListeners();
                break;
            case 'leaderboard':
                app.innerHTML = this.renderLeaderboard();
                this.attachMenuListeners();
                break;
        }
    }

    renderAuthScreen() {
        return `
            <main style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <div style="text-align: center; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); max-width: 400px;">
                    <h1 style="color: #333; margin-bottom: 30px;">Relative Clauses App</h1>
                    <p style="color: #666; margin-bottom: 20px; font-size: 16px;">Enter the access code:</p>
                    <input type="password" id="accessCode" placeholder="Code" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 5px; box-sizing: border-box; margin-bottom: 15px;">
                    <button onclick="app.checkPassword()" style="width: 100%; padding: 12px; background-color: #3b82f6; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;">Access</button>
                </div>
            </main>
        `;
    }

    checkPassword() {
        const code = document.getElementById('accessCode').value;
        if (code === this.state.password) {
            this.setState({ isAuthenticated: true, currentScreen: 'login' });
        } else {
            alert('❌ Incorrect code. Try again.');
            document.getElementById('accessCode').value = '';
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
                        <button class="menu-btn" onclick="app.showLeaderboard()" style="background-color: #f59e0b;">
                            <span style="font-size: 32px;">🏆</span>
                            <span>Leaderboard</span>
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
                <div id="feedbackContainer">
                    ${this.state.showPreviousFeedback ? this.renderPreviousFeedback() : ''}
                </div>
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
            <input type="text" class="fill-input" id="answerInput" value="${currentAnswer?.text || ''}" placeholder="Type your answer here" ${answered ? 'disabled' : ''} onkeypress="if(event.key==='Enter' && !this.disabled) app.submitAnswer()">
            <button class="submit-btn" onclick="app.submitAnswer()" style="margin-top: 15px;" ${answered ? 'disabled' : ''}>Submit Answer</button>
        </div>
    `;
}

renderRephrasing(exercise, currentAnswer) {
    const answered = this.state.answers[this.state.currentQuestion] !== undefined;
    const textValue = currentAnswer?.text || '';
    return `
        <div class="exercise-question">
            <h3>${exercise.instruction}</h3>
            <textarea class="textarea-input" id="answerInput" placeholder="Type your answer here" ${answered ? 'disabled' : ''} onkeypress="if(event.ctrlKey && event.key==='Enter' && !this.disabled) app.submitAnswer()">${textValue}</textarea>
            <button class="submit-btn" onclick="app.submitAnswer()" style="margin-top: 15px;" ${answered ? 'disabled' : ''}>Submit Answer</button>
        </div>
    `;
}


    renderFinalResults() {
        const mcScore = this.calculateSectionScore('multipleChoice');
        const fgScore = this.calculateSectionScore('fillInGaps');
        const rpScore = this.calculateSectionScore('rephrasing');
        const totalScore = mcScore + fgScore + rpScore;

        const mcPercent = Math.round((mcScore / 20) * 100);
        const fgPercent = Math.round((fgScore / 40) * 100);
        const rpPercent = Math.round((rpScore / 40) * 100);
        const totalPercent = Math.round((totalScore / 100) * 100);

        const passed = totalPercent >= 80;

        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.state.startTime) / 1000);
        this.saveToLeaderboard(totalScore, timeSpent);

        return `
            ${this.renderHeader(true)}
            <main>
                <div class="results-screen">
                    <div class="results-header">
   			 <h1>${passed ? '🎉 Congratulations! 🎉' : '📚 Keep Practicing! 📚'}</h1>
   			 <div class="student-header">
   		     <div class="student-name">${this.state.student.firstName} ${this.state.student.lastName}</div>
    		    <div class="student-course">${this.state.student.course}</div>
   		 </div>
		</div>

                    <div class="results-scores">
                        <div class="score-section" style="border-left-color: #3b82f6;">
                            <div class="score-section-name">Final Score</div>
                            <div class="score-section-detail">
                                <div class="score-section-value">${totalScore}/100</div>
                                <div class="score-section-percentage" style="font-size: 32px; font-weight: bold; color: ${passed ? '#10b981' : '#ef4444'};">${totalPercent}%</div>
                            </div>
                        </div>
                    </div>

                    <div class="results-message ${passed ? 'passed' : 'failed'}">
                        ${passed ? `
                            <h2>🎉 Excellent Performance! 🎉</h2>
                            <p style="font-size: 18px; margin: 20px 0;">You have achieved <strong>${totalPercent}%</strong> in the Relative Clauses test!</p>
                            <p style="font-size: 16px; color: #666;">You have mastered relative clauses. Great job!</p>
                            <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 5px;">
                                <p style="margin: 0; color: #047857;"><strong>📊 Detailed Results:</strong></p>
                                <p style="margin: 5px 0; color: #047857;">Multiple Choice: ${mcPercent}%</p>
                                <p style="margin: 5px 0; color: #047857;">Fill in the Gaps: ${fgPercent}%</p>
                                <p style="margin: 5px 0; color: #047857;">Rephrasing: ${rpPercent}%</p>
                            </div>
                            <p style="margin-top: 20px; font-size: 14px; color: #999;">⏱️ Time spent: ${timeSpent}s</p>
                        ` : `
                            <h2>Keep Trying! 💪</h2>
                            <p style="font-size: 18px; margin: 20px 0;">You scored <strong>${totalPercent}%</strong>, but you need <strong>80%</strong> to master this topic.</p>
                            <p style="font-size: 16px; color: #666;">Review the theory and practice again to improve your understanding of relative clauses.</p>
                            <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
                                <p style="margin: 0; color: #92400e;"><strong>📊 Your Results:</strong></p>
                                <p style="margin: 5px 0; color: #92400e;">Multiple Choice: ${mcPercent}%</p>
                                <p style="margin: 5px 0; color: #92400e;">Fill in the Gaps: ${fgPercent}%</p>
                                <p style="margin: 5px 0; color: #92400e;">Rephrasing: ${rpPercent}%</p>
                            </div>
                            <p style="margin-top: 20px; font-size: 14px; color: #999;">⏱️ Time spent: ${timeSpent}s</p>
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

    renderLeaderboard() {
        const entries = this.state.leaderboard.slice(0, 10);

        return `
            ${this.renderHeader(true)}
            <main>
                <div style="padding: 20px; max-width: 900px; margin: 0 auto;">
                    <h1 style="text-align: center; margin-bottom: 10px;">🏆 Top 10 Rankings 🏆</h1>
                    <div style="background-color: #ecfdf5; border: 2px solid #10b981; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                        <p style="margin: 0; font-weight: bold; color: #047857;">
                            📊 All-time rankings (permanent records)
                        </p>
                    </div>

                    ${entries.length === 0 ? `
                        <div style="text-align: center; padding: 40px; color: #999;">
                            <p>No rankings yet. Be the first! 🚀</p>
                        </div>
                    ` : `
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: #3b82f6; color: white;">
                                    <th style="padding: 12px; text-align: left;">Rank</th>
                                    <th style="padding: 12px; text-align: left;">Name</th>
                                    <th style="padding: 12px; text-align: left;">Course</th>
                                    <th style="padding: 12px; text-align: right;">Score</th>
                                    <th style="padding: 12px; text-align: right;">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${entries.map((entry, idx) => `
                                    <tr style="border-bottom: 1px solid #ddd; ${idx % 2 === 0 ? 'background-color: #f9f9f9;' : ''}">
                                        <td style="padding: 12px; font-weight: bold;">
                                            ${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : ''}
                                            #${idx + 1}
                                        </td>
                                        <td style="padding: 12px;">${entry.firstName} ${entry.lastName}</td>
                                        <td style="padding: 12px;">${entry.course}</td>
                                        <td style="padding: 12px; text-align: right; font-weight: bold; color: #10b981;">${entry.score}/100</td>
                                        <td style="padding: 12px; text-align: right;">${entry.timeSpent}s</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}

                    <button class="btn-primary" onclick="app.goHome()" style="margin-top: 20px; display: block; margin: 20px auto 0;">Back to Menu</button>
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

    renderPreviousFeedback() {
    const currentAnswer = this.state.answers[this.state.currentQuestion];
    const currentExercise = this.getCurrentExercise();

    if (!currentAnswer) {
        return '';
    }

    const feedback = this.generateFeedback(currentAnswer.correct, currentExercise, currentAnswer.text);

    return `
        <div class="feedback show ${currentAnswer.correct ? 'correct' : 'incorrect'}">
            <div class="feedback-header">
                <span class="feedback-icon">${currentAnswer.correct ? '✓' : '✗'}</span>
                <span>${currentAnswer.correct ? 'CORRECT!' : 'INCORRECT'}</span>
            </div>
            <div class="feedback-text">${feedback}</div>
            <div class="feedback-buttons">
                <button class="btn-nav btn-prev" ${this.state.currentQuestion === 0 ? 'disabled' : ''} onclick="app.previousQuestion()">← Previous</button>
                <button class="btn-nav btn-next" ${this.state.currentQuestion === 49 ? 'disabled' : ''} onclick="app.nextQuestion()">Next →</button>
            </div>
        </div>
    `;
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

    loadLeaderboard() {
    // Cargar desde Google Sheets SIN hacer render() aquí
    fetch(GOOGLE_SHEETS_URL)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                this.state.leaderboard = data.sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent).slice(0, 10);
            }
        })
        .catch(err => {
            console.log('Google Sheets no disponible, usando local');
            const saved = localStorage.getItem('leaderboard');
            this.state.leaderboard = saved ? JSON.parse(saved) : [];
        });
}


    saveToLeaderboard(totalScore, timeSpent) {
        const newEntry = {
            firstName: this.state.student.firstName,
            lastName: this.state.student.lastName,
            course: this.state.student.course,
            score: totalScore,
            timeSpent: timeSpent,
            date: new Date().toLocaleDateString()
        };

        // Enviar a Google Sheets
        fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            body: JSON.stringify(newEntry)
        }).then(() => {
            console.log('Resultado guardado en Google Sheets');
            // Recargar leaderboard
            setTimeout(() => this.loadLeaderboard(), 500);
        }).catch(err => {
            console.log('Error al guardar en Google Sheets, usando local');
            // Guardar localmente como respaldo
            const leaderboard = [...this.state.leaderboard, newEntry]
                .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
                .slice(0, 10);
            this.state.leaderboard = leaderboard;
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        });
    }

    showLeaderboard() {
		this.loadLeaderboard();  // Carga aquí
        this.setState({ currentScreen: 'leaderboard' });
    }

    goHome() {
        this.setState({ currentScreen: 'menu' });
    }

    goToTheory() {
        this.setState({ currentScreen: 'theory' });
    }

    goToExercises() {
        this.setState({ 
            currentScreen: 'exercises',
            startTime: Date.now()
        });
    }

	getFirstUnansweredInSection(start, end) {
    for (let i = start; i < end; i++) {
        if (!this.state.answers[i] || !this.state.answers[i].correct) {
            return i;
        }
    }
    return end - 1;
	}

    jumpTo(questionIndex) {
        this.setState({ currentQuestion: questionIndex });
    }

	previousQuestion() {
    if (this.state.currentQuestion > 0) {
        this.setState({ 
            currentQuestion: this.state.currentQuestion - 1,
            showPreviousFeedback: true
        });
    }
}

nextQuestion() {
    const currentQ = this.state.currentQuestion;

    if (currentQ === 49) {
        this.setState({ currentScreen: 'finalResults' });
        return;
    }

    if (currentQ < 49) {
        let nextQuestion = currentQ + 1;

        while (nextQuestion < 50 && this.state.answers[nextQuestion] !== undefined) {
            nextQuestion++;
        }

        if (nextQuestion >= 50) {
            this.setState({ currentScreen: 'finalResults' });
        } else {
            this.setState({ 
                currentQuestion: nextQuestion,
                showPreviousFeedback: false
            });
        }
    }
}


    tryAgain() {
        this.setState({
            currentQuestion: 0,
            answers: [],
            currentScreen: 'exercises',
            startTime: Date.now()
        });
    }
}

const app = new RelativeClausesApp();
