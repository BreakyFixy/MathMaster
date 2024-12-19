const MathGame = {
    currentTopic: null,
    currentAnswer: null,

    topics: {
        decimals: {
            title: "Decimals",
            generate: function() {
                try {
                    const a = Number((Math.random() * 10).toFixed(2));
                    const b = Number((Math.random() * 10).toFixed(2));
                    const operation = ['+', '-'][Math.floor(Math.random() * 2)];
                    const question = `Calculate: ${a} ${operation} ${b}`;
                    const answer = operation === '+' ? 
                                 Number((a + b).toFixed(2)) : 
                                 Number((a - b).toFixed(2));
                    return { question, answer };
                } catch (error) {
                    console.error('Error generating decimal question:', error);
                    return {
                        question: 'Calculate: 5.25 + 3.75',
                        answer: 9.00
                    };
                }
            }
        },
        operations: {
            title: "Order of Operations",
            generate: () => {
                const a = Math.floor(Math.random() * 10);
                const b = Math.floor(Math.random() * 10);
                const c = Math.floor(Math.random() * 10);
                return {
                    question: `Calculate: ${a} + ${b} × ${c}`,
                    answer: a + b * c
                };
            }
        },
        rounding: {
            title: "Rounding and Significant Figures",
            generate: function() {
                try {
                    const num = (Math.random() * 1000).toFixed(3);
                    const places = Math.floor(Math.random() * 3);
                    const roundedAnswer = Number(Number(num).toFixed(places));
                    
                    return {
                        question: `Round ${num} to ${places} decimal place${places !== 1 ? 's' : ''}`,
                        answer: roundedAnswer
                    };
                } catch (error) {
                    console.error('Error in rounding generator:', error);
                    return {
                        question: 'Round 12.345 to 2 decimal places',
                        answer: 12.35
                    };
                }
            }
        },
        scientific: {
            title: "Scientific Notation",
            generate: function() {
                try {
                    const base = Math.floor(Math.random() * 90) + 10;
                    const exp = Math.floor(Math.random() * 6) - 3;
                    const num = base * Math.pow(10, exp);
                    const formattedNum = num.toExponential(2);
                    
                    return {
                        question: `Convert ${formattedNum} to scientific notation (enter the coefficient only, e.g., for 1.23 × 10^4, enter 1.23)`,
                        answer: Number((base / 10).toFixed(2))
                    };
                } catch (error) {
                    console.error('Error generating scientific notation question:', error);
                    return {
                        question: 'Convert 123.45 to scientific notation (enter coefficient only)',
                        answer: 1.23
                    };
                }
            }
        },
        ratios: {
            title: "Ratios and Proportions",
            generate: () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 10) + 1;
                return {
                    question: `If ${a}:${b} = x:${c}, what is x?`,
                    answer: (a * c) / b
                };
            }
        },
        percentages: {
            title: "Percentages",
            generate: () => {
                const whole = Math.floor(Math.random() * 1000) + 100;
                const percent = Math.floor(Math.random() * 100) + 1;
                return {
                    question: `What is ${percent}% of ${whole}?`,
                    answer: (whole * percent) / 100
                };
            }
        },
        fractions: {
            title: "Fractions",
            generate: function() {
                try {
                    const fraction1 = { 
                        numerator: Math.floor(Math.random() * 10) + 1,
                        denominator: Math.floor(Math.random() * 10) + 1
                    };
                    const fraction2 = {
                        numerator: Math.floor(Math.random() * 10) + 1,
                        denominator: Math.floor(Math.random() * 10) + 1
                    };
                    const operation = Math.random() < 0.5 ? '+' : '-';
                    
                    const answer = operation === '+' ? 
                        ((fraction1.numerator * fraction2.denominator + fraction1.denominator * fraction2.numerator) / 
                         (fraction1.denominator * fraction2.denominator)) : 
                        ((fraction1.numerator * fraction2.denominator - fraction1.denominator * fraction2.numerator) / 
                         (fraction1.denominator * fraction2.denominator));
                    
                    return {
                        question: `Calculate: \\(\\frac{${fraction1.numerator}}{${fraction1.denominator}}\\) ${operation} \\(\\frac{${fraction2.numerator}}{${fraction2.denominator}}\\) (Enter as a fraction like 3/4 or decimal)`,
                        answer: Number(answer.toFixed(2))
                    };
                } catch (error) {
                    console.error('Error in fraction generation:', error);
                    return {
                        question: 'Calculate: \\(\\frac{1}{2}\\) + \\(\\frac{1}{4}\\) (Enter as a fraction like 3/4 or decimal)',
                        answer: 0.75
                    };
                }
            }
        },
        integers: {
            title: "Positive and Negative Integers",
            generate: function() {
                try {
                    const a = Math.floor(Math.random() * 21) - 10;
                    const b = Math.floor(Math.random() * 21) - 10;
                    const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
                    const question = `Calculate: ${a} ${operation} ${b}`;
                    
                    let answer;
                    switch(operation) {
                        case '+': answer = a + b; break;
                        case '-': answer = a - b; break;
                        case '*': answer = a * b; break;
                        default: throw new Error('Invalid operation');
                    }
                    
                    return { question, answer };
                } catch (error) {
                    console.error('Error generating integer question:', error);
                    return {
                        question: 'Calculate: 5 + 3',
                        answer: 8
                    };
                }
            }
        },
        powers: {
            title: "Powers and Roots",
            generate: () => {
                const base = Math.floor(Math.random() * 10) + 1;
                const exp = Math.floor(Math.random() * 3) + 2;
                const isRoot = Math.random() < 0.5;
                if (isRoot) {
                    return {
                        question: `Calculate the ${exp}th root of ${Math.pow(base, exp)}`,
                        answer: base
                    };
                }
                return {
                    question: `Calculate ${base}^${exp}`,
                    answer: Math.pow(base, exp)
                };
            }
        },
        expressions: {
            title: "Arithmetic Expressions",
            generate: () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 10) + 1;
                return {
                    question: `Evaluate: ${a} + ${b} × ${c} - ${b}`,
                    answer: a + b * c - b
                };
            }
        },
        algebra: {
            title: "Algebra",
            generate: () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 20) - 10;
                const c = a * Math.floor(Math.random() * 10) - b;
                return {
                    question: `Solve for x: ${a}x + ${b} = ${c}`,
                    answer: (c - b) / a
                };
            }
        },
        geometry: {
            title: "Area and Volume",
            generate: function() {
                try {
                    const shapes = [
                        {type: 'rectangle', w: Math.floor(Math.random() * 10) + 1, h: Math.floor(Math.random() * 10) + 1},
                        {type: 'circle', r: Math.floor(Math.random() * 5) + 1}
                    ];
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    
                    let question, answer;
                    if (shape.type === 'rectangle') {
                        question = `Calculate the area of a rectangle with width ${shape.w} and height ${shape.h}`;
                        answer = shape.w * shape.h;
                    } else {
                        question = `Calculate the area of a circle with radius ${shape.r} (use 3.14 for π and round to 2 decimal places)`;
                        answer = Number((3.14159 * shape.r * shape.r).toFixed(2));
                    }
                    
                    return { question, answer };
                } catch (error) {
                    console.error('Error generating geometry question:', error);
                    return {
                        question: 'Calculate the area of a rectangle with width 4 and height 5',
                        answer: 20
                    };
                }
            }
        },
        quadratic: {
            title: "Quadratic Formula",
            generate: function() {
                // Generate coefficients that result in real solutions
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) - 5;
                const c = Math.floor(Math.random() * 5) - 2;
                
                // Calculate solutions using quadratic formula
                const discriminant = b * b - 4 * a * c;
                const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                
                return {
                    question: `Solve the quadratic equation: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0\nEnter the larger solution (round to 2 decimal places)`,
                    answer: Number(Math.max(x1, x2).toFixed(2))
                };
            }
        },
        graphing: {
            title: "Graphing",
            generate: function() {
                const m = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) - 5;
                const x = Math.floor(Math.random() * 10) - 5;
                
                return {
                    question: `For the line y = ${m}x ${b >= 0 ? '+' : ''}${b}, what is y when x = ${x}?`,
                    answer: m * x + b
                };
            }
        }
    },

    generateQuestion: function() {
        try {
            if (!this.currentTopic || !this.topics[this.currentTopic]) {
                throw new Error('No topic selected');
            }

            const topic = this.topics[this.currentTopic];
            const exercise = topic.generate();

            if (!exercise || typeof exercise.question !== 'string' || exercise.answer === undefined) {
                throw new Error('Invalid exercise format');
            }

            const questionElement = document.getElementById('question');
            const answerInput = document.getElementById('answer');
            const feedback = document.getElementById('feedback');

            if (!questionElement) {
                throw new Error('Question element not found');
            }

            // Reset UI state
            if (answerInput) answerInput.value = '';
            if (feedback) feedback.textContent = '';

            // Update question and answer
            questionElement.innerHTML = exercise.question;
            this.currentAnswer = exercise.answer;

            // Render math expressions if MathJax is available
            if (window.MathJax) {
                MathJax.typesetPromise();
            }

            return true;
        } catch (error) {
            console.error('Question generation failed:', error);
            const questionElement = document.getElementById('question');
            
            if (questionElement) {
                questionElement.innerHTML = 'Error generating question. Please try again or select a different topic.';
            }
            
            this.currentAnswer = null;
            this.showFeedback('There was an error generating the question. Please try another topic.', 'danger');
            
            return false;
        }
    },

    showFeedback: function(message, type) {
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `alert alert-${type}`;
        }
    },

    checkAnswer: async function() {
        try {
            const answerInput = document.getElementById('answer').value.trim();
            
            if (!answerInput) {
                this.showFeedback('Please enter an answer before checking', 'warning');
                return;
            }

            let userAnswer;
            if (answerInput.includes('/')) {
                const [numerator, denominator] = answerInput.split('/').map(Number);
                if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
                    this.showFeedback('Please enter a valid fraction or decimal', 'warning');
                    return;
                }
                userAnswer = numerator / denominator;
            } else {
                userAnswer = Number(answerInput);
                if (isNaN(userAnswer)) {
                    this.showFeedback('Please enter a valid fraction or decimal', 'warning');
                    return;
                }
            }
            const correctAnswer = this.currentAnswer;

            const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.01;
            
            this.questionCount = (this.questionCount || 0) + 1;
            if (isCorrect) {
                this.currentScore = (this.currentScore || 0) + 1;
                this.showFeedback('Correct!', 'success');
            } else {
                this.showFeedback(`Incorrect. The correct answer is ${correctAnswer}`, 'danger');
            }
            
            document.getElementById('score').textContent = `Score: ${this.currentScore || 0}/${this.questionCount}`;
            
            if (this.questionCount === 10) {
                const topicButton = document.querySelector(`[data-topic="${this.currentTopic}"]`);
                if (topicButton) {
                    topicButton.className = 'list-group-item list-group-item-action';
                    if (this.currentScore >= 9) {
                        topicButton.classList.add('list-group-item-success');
                    } else if (this.currentScore >= 7) {
                        topicButton.classList.add('list-group-item-warning');
                    } else if (this.currentScore >= 5) {
                        topicButton.classList.add('list-group-item-warning', 'orange');
                    } else {
                        topicButton.classList.add('list-group-item-danger');
                    }
                }
                
                setTimeout(() => {
                    this.showFeedback(`Topic Complete!\nFinal Score: ${this.currentScore}/10\n\nGreen: Perfect Score\nYellow: 7-9 Correct\nRed: 4-6 Correct\nGray: 0-3 Correct\n\nClick 'Back to Topics' to continue`, 'success');
                    document.getElementById('checkAnswer').style.display = 'none';
                    document.getElementById('answer').disabled = true;
                    document.getElementById('back-to-topics').focus();
                }, 1500);
            } else {
                setTimeout(() => this.generateQuestion(), 1500);
            }
        } catch (error) {
            console.error('Error checking answer:', error);
            this.showFeedback('Error checking answer. Please try again.', 'danger');
        }
    },

    async updateProgress(isCorrect) {
        try {
            if (isCorrect) {
                this.currentScore++;
            }
            
            // After 10 questions, update the final score
            if (this.currentScore === 10) {
                const response = await fetch(`/api/progress/${this.currentTopic}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        score: this.currentScore
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update progress');
                }
                
                const data = await response.json();
                
                // Update topic button color based on score
                const topicButton = document.querySelector(`[data-topic="${this.currentTopic}"]`);
                if (topicButton) {
                    topicButton.className = 'list-group-item list-group-item-action';
                    if (this.currentScore >= 9) {
                        topicButton.classList.add('list-group-item-success');
                    } else if (this.currentScore >= 7) {
                        topicButton.classList.add('list-group-item-warning');
                    } else if (this.currentScore >= 5) {
                        topicButton.classList.add('list-group-item-warning', 'orange');
                    } else {
                        topicButton.classList.add('list-group-item-danger');
                    }
                }
                return data;
            }
        } catch (error) {
            console.error('Error updating progress:', error);
            this.showFeedback('Error saving progress', 'warning');
        }
    }
};

// Initialize MathGame
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing MathGame...');
    
    // Set up event listeners
    console.log('Setting up event listeners...');
    
    const topicButtons = document.querySelectorAll('[data-topic]');
    topicButtons.forEach(button => {
        button.addEventListener('click', () => {
            MathGame.currentTopic = button.dataset.topic;
            MathGame.currentScore = 0;
            MathGame.questionCount = 0;
            document.getElementById('practice-area').style.display = 'block';
            document.getElementById('current-topic').textContent = MathGame.topics[button.dataset.topic].title;
            document.getElementById('score').textContent = `Score: ${MathGame.currentScore}/${MathGame.questionCount}`;
            document.getElementById('checkAnswer').style.display = 'block';
            document.getElementById('answer').disabled = false;
            MathGame.generateQuestion();
        });
    });

    const checkButton = document.getElementById('checkAnswer');
    if (checkButton) {
        checkButton.addEventListener('click', () => MathGame.checkAnswer());
    }

    const answerInput = document.getElementById('answer');
    if (answerInput) {
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                MathGame.checkAnswer();
            }
        });
    }
    
    console.log('Event listeners setup complete');
});