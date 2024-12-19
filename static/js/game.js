// Math topics and question generators
const generateNumber = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!Number.isFinite(num)) throw new Error('Failed to generate valid number');
    return num;
};

const topics = {
    fractions: {
        title: "Fractions",
        generate: function() {
            const generateFraction = () => {
                const numerator = generateNumber(1, 10);
                const denominator = generateNumber(1, 10);
                return { numerator, denominator };
            };

            try {
                const fraction1 = generateFraction();
                const fraction2 = generateFraction();
                const operation = Math.random() < 0.5 ? '+' : '-';
                
                // Calculate answer before generating question to validate
                const answer = operation === '+' ? 
                    ((fraction1.numerator * fraction2.denominator + fraction1.denominator * fraction2.numerator) / 
                     (fraction1.denominator * fraction2.denominator)) : 
                    ((fraction1.numerator * fraction2.denominator - fraction1.denominator * fraction2.numerator) / 
                     (fraction1.denominator * fraction2.denominator));
                
                // Validate calculation
                if (!Number.isFinite(answer)) {
                    throw new Error('Invalid fraction calculation result');
                }
                
                const question = `Calculate: \\(\\frac{${fraction1.numerator}}{${fraction1.denominator}}\\) ${operation} \\(\\frac{${fraction2.numerator}}{${fraction2.denominator}}\\)`;
                
                console.log('Generated fraction question:', {
                    fraction1: `${fraction1.numerator}/${fraction1.denominator}`,
                    fraction2: `${fraction2.numerator}/${fraction2.denominator}`,
                    operation,
                    answer
                });
                
                return { question, answer };
            } catch (error) {
                console.error('Error in fraction generation:', error);
                // Return a guaranteed valid fraction problem
                return {
                    question: 'Calculate: \\(\\frac{1}{2}\\) + \\(\\frac{1}{4}\\)',
                    answer: 0.75
                };
            }
        }
    },
    integers: {
        title: "Positive and Negative Integers",
        generate: function() {
            const a = Math.floor(Math.random() * 20) - 10;
            const b = Math.floor(Math.random() * 20) - 10;
            const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            const question = `Calculate: ${a} ${operation} ${b}`;
            const answer = operation === '+' ? a + b : 
                          operation === '-' ? a - b : a * b;
            return { question, answer };
        }
    },
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
                console.log('Generated decimal question:', { a, b, operation, answer });
                return { question, answer };
            } catch (error) {
                console.error('Error generating decimal question:', error);
                // Fallback to a simple decimal question if there's an error
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
                
                if (isNaN(roundedAnswer)) {
                    throw new Error('Generated invalid number');
                }
                
                console.log('Generated rounding question:', {
                    originalNumber: num,
                    decimalPlaces: places,
                    answer: roundedAnswer
                });
                
                return {
                    question: `Round ${num} to ${places} decimal place${places !== 1 ? 's' : ''}`,
                    answer: roundedAnswer
                };
            } catch (error) {
                console.error('Error in rounding generator:', error);
                // Fallback to a simple, reliable question
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
                
                // Format number with appropriate precision
                const formattedNum = num.toExponential(2);
                console.log('Generated scientific notation question:', {
                    originalNumber: num,
                    formattedNumber: formattedNum,
                    expectedCoefficient: base / 10
                });
                
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
                    const PI = 3.14159;
                    question = `Calculate the area of a circle with radius ${shape.r} (use 3.14 for π and round to 2 decimal places)`;
                    answer = Number((PI * shape.r * shape.r).toFixed(2));
                }
                
                console.log('Generated geometry question:', {
                    shapeType: shape.type,
                    dimensions: shape,
                    expectedAnswer: answer
                });
                
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
        generate: () => {
            const a = 1;
            const b = Math.floor(Math.random() * 10) - 5;
            const c = Math.floor(Math.random() * 10) - 5;
            const discriminant = b * b - 4 * a * c;
            if (discriminant >= 0) {
                return {
                    question: `Find the larger root of x² + ${b}x + ${c} = 0`,
                    answer: (-b + Math.sqrt(discriminant)) / (2 * a)
                };
            } else {
                return {
                    question: `Find the larger root of x² + 2x + 1 = 0`,
                    answer: -1
                };
            }
        }
    },
    graphing: {
        title: "Graphing",
        generate: function() {
            try {
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) - 5;
                const x = Math.floor(Math.random() * 5);
                
                // Create function for plotting
                const fn = (x) => a * x + b;
                
                // Only try to plot if we're in the graphing section
                const graphCanvas = document.getElementById('graphCanvas');
                if (graphCanvas && graphCanvas.style.display !== 'none') {
                    try {
                        const graphingTool = new GraphingTool('graphCanvas');
                        graphingTool.plotFunction(fn);
                    } catch (graphError) {
                        console.error('Error plotting graph:', graphError);
                        // Continue even if graphing fails
                    }
                }
                
                console.log('Generated graphing question:', {
                    slope: a,
                    yIntercept: b,
                    xValue: x,
                    expectedY: fn(x)
                });
                
                return {
                    question: `Looking at the graph of y = ${a}x + ${b}, find y when x = ${x}`,
                    answer: fn(x)
                };
            } catch (error) {
                console.error('Error generating graphing question:', error);
                return {
                    question: 'Find y when x = 2 for the function y = 2x + 1',
                    answer: 5
                };
            }
        }
    }
};

// Initialize MathJax configuration
window.MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']]
    }
};

class MathGame {
    constructor() {
        this.currentTopic = null;
        this.score = 0;
        this.questionCount = 0;
        this.loadProgress();
        this.setupEventListeners();
        this.showTopicSelection();
        this.updateTopicColors();
    }

    decimalToFraction(decimal) {
        if (isNaN(decimal)) return null;
        
        const tolerance = 1.0E-6;
        let h1 = 1;
        let h2 = 0;
        let k1 = 0;
        let k2 = 1;
        let b = decimal;
        
        do {
            let a = Math.floor(b);
            let aux = h1;
            h1 = a * h1 + h2;
            h2 = aux;
            aux = k1;
            k1 = a * k1 + k2;
            k2 = aux;
            b = 1 / (b - a);
        } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);
        
        return `\\(\\frac{${h1}}{${k1}}\\)`;
    }

    loadProgress() {
        try {
            const savedProgress = localStorage.getItem('mathGameProgress');
            if (savedProgress) {
                this.progress = JSON.parse(savedProgress);
            } else {
                this.progress = {};
                Object.keys(topics).forEach(topic => {
                    this.progress[topic] = {
                        completed: false,
                        score: 0
                    };
                });
                this.saveProgress();
            }
        } catch (error) {
            console.error('Error loading progress:', error);
            this.progress = {};
        }
    }

    saveProgress() {
        localStorage.setItem('mathGameProgress', JSON.stringify(this.progress));
    }

    generateQuestion() {
        const resetUIState = () => {
            // Reset all UI elements to a known state
            const elements = {
                graphContainer: document.getElementById('graphing-container'),
                questionElement: document.getElementById('question'),
                formatHelp: document.getElementById('answer-format-help'),
                answerInput: document.getElementById('answer')
            };

            // Hide all special UI elements by default
            if (elements.graphContainer) elements.graphContainer.style.display = 'none';
            if (elements.formatHelp) elements.formatHelp.style.display = 'none';
            
            return elements;
        };

        const validateTopic = () => {
            if (!this.currentTopic || !topics[this.currentTopic]) {
                throw new Error(`Invalid topic: ${this.currentTopic}`);
            }
            
            const topic = topics[this.currentTopic];
            if (!topic || typeof topic.generate !== 'function') {
                throw new Error(`Topic ${this.currentTopic} is missing generate function`);
            }
            
            return topic;
        };

        const generateExercise = (topic) => {
            try {
                const exercise = topic.generate();
                if (!exercise || typeof exercise.question !== 'string' || exercise.answer === undefined) {
                    throw new Error('Invalid exercise format');
                }
                return exercise;
            } catch (error) {
                console.error(`Error generating ${this.currentTopic} exercise:`, error);
                throw new Error(`Failed to generate ${this.currentTopic} question: ${error.message}`);
            }
        };

        try {
            // Step 1: Reset UI to known state
            const elements = resetUIState();
            
            // Step 2: Validate current topic
            const topic = validateTopic();
            console.log('Generating question for topic:', this.currentTopic);

            // Step 3: Generate the exercise
            const currentExercise = generateExercise(topic);
            console.log('Generated exercise:', currentExercise);

            // Step 4: Update UI with new exercise
            if (elements.questionElement) {
                elements.questionElement.innerHTML = currentExercise.question;
                this.currentAnswer = currentExercise.answer;

                // Topic-specific UI updates
                if (this.currentTopic === 'graphing') {
                    elements.graphContainer.style.display = 'block';
                    const canvas = document.getElementById('graphCanvas');
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        try {
                            const graphingTool = new GraphingTool('graphCanvas');
                            graphingTool.plotFunction(x => topic.currentFunction(x));
                        } catch (graphError) {
                            console.warn('Non-critical graphing error:', graphError);
                        }
                    }
                }

                if (this.currentTopic === 'fractions' && elements.formatHelp) {
                    elements.formatHelp.style.display = 'block';
                }

                // Render math expressions if MathJax is available
                if (window.MathJax) {
                    MathJax.typesetPromise([elements.questionElement])
                        .catch(err => console.warn('MathJax rendering failed:', err));
                }

                return true;
            } else {
                throw new Error('Question element not found in DOM');
            }
        } catch (error) {
            console.error('Question generation failed:', error);
            const elements = resetUIState();
            
            if (elements.questionElement) {
                elements.questionElement.innerHTML = 'Error generating question. Please try again or select a different topic.';
            }
            
            this.showFeedback(
                'There was an error generating the question. Please try another topic or refresh the page.',
                'danger'
            );
            
            return false;
        }
    }

    async checkAnswer() {
        try {
            console.log('Checking answer...');
            const answerInput = document.getElementById('answer').value.trim();
            
            if (!answerInput) {
                this.showFeedback('Please enter an answer before checking', 'warning');
                return;
            }

            let userAnswer;
            if (this.currentTopic === 'fractions') {
                if (answerInput.includes('/')) {
                    console.log('Processing fraction input:', answerInput);
                    const parts = answerInput.split('/');
                    if (parts.length !== 2) {
                        this.showFeedback('Please enter a valid fraction (e.g., 3/4)', 'warning');
                        return;
                    }
                    
                    const [numerator, denominator] = parts.map(num => {
                        const parsed = parseFloat(num.trim());
                        console.log('Parsing fraction part:', num.trim(), 'Result:', parsed);
                        return parsed;
                    });
                    
                    if (isNaN(numerator) || isNaN(denominator)) {
                        this.showFeedback('Please enter valid numbers for your fraction', 'warning');
                        return;
                    }
                    
                    if (denominator === 0) {
                        this.showFeedback('Cannot divide by zero', 'warning');
                        return;
                    }
                    
                    userAnswer = numerator / denominator;
                } else {
                    userAnswer = parseFloat(answerInput);
                    if (!Number.isFinite(userAnswer)) {
                        this.showFeedback('Please enter a valid number or fraction', 'warning');
                        return;
                    }
                }
            } else {
                userAnswer = parseFloat(answerInput);
            }
            
            if (isNaN(userAnswer) || !Number.isFinite(userAnswer)) {
                this.showFeedback('Please enter a valid number or fraction', 'warning');
                return;
            }

            console.log('Comparing answers:', {
                userInput: answerInput,
                parsedAnswer: userAnswer,
                expectedAnswer: this.currentAnswer,
                difference: Math.abs(userAnswer - this.currentAnswer)
            });
            
            console.log('Comparing answers:', {
                userAnswer: userAnswer,
                correctAnswer: this.currentAnswer,
                difference: Math.abs(userAnswer - this.currentAnswer)
            });
        
            const correct = Math.abs(userAnswer - this.currentAnswer) < 0.001;

            if (correct) {
                this.score += 1;
                this.showFeedback('Correct!', 'success');
            } else {
                const fractionDisplay = this.decimalToFraction(this.currentAnswer);
                const message = `Incorrect. The answer was ${this.currentAnswer} (decimal) or ${fractionDisplay} (fraction)`;
                this.showFeedback(message, 'danger');
                if (window.MathJax) {
                    setTimeout(() => {
                        MathJax.typesetPromise([document.getElementById('feedback')]).catch(err => {
                            console.error('MathJax typesetting error:', err);
                        });
                    }, 100);
                }
            }

            this.questionCount += 1;
            document.getElementById('answer').value = '';
            this.updateProgress();

            if (this.questionCount >= 10) {
                document.getElementById('answer').disabled = true;
                document.getElementById('checkAnswer').disabled = true;
                await this.saveTopic();
                this.showTopicCompletion();
            } else {
                setTimeout(() => {
                    document.getElementById('feedback').style.display = 'none';
                    this.generateQuestion();
                }, 2000);
            }
        } catch (error) {
            console.error('Error checking answer:', error);
            this.showFeedback('An error occurred while checking your answer', 'danger');
        }
    }

    resetProgress() {
        this.score = 0;
        this.questionCount = 0;
        this.currentTopic = null;
    }

    async saveTopic() {
        try {
            console.log('Saving topic progress:', this.currentTopic);
            const response = await fetch(`/api/progress/${this.currentTopic}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ score: this.score })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Topic progress saved:', data);
            
            // Force color update after saving
            await this.updateTopicColors();
            
            // Add a small delay before showing completion to ensure colors are updated
            await new Promise(resolve => setTimeout(resolve, 100));
            return data;
        } catch (error) {
            console.error('Error saving topic progress:', error);
            this.showFeedback('Error saving progress. Please try again.', 'danger');
            throw error; // Re-throw to handle in the calling function
        }
    }

    showTopicCompletion() {
        const feedback = document.getElementById('feedback');
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('answer').style.display = 'none';
        document.getElementById('checkAnswer').style.display = 'none';
        
        feedback.innerHTML = `
            <div class="text-center">
                <h3>Topic Completed!</h3>
                <p class="h4 mb-4">You got ${this.score} out of 10 questions correct.</p>
                ${this.score === 10 ? 
                    '<div class="alert alert-success">Perfect score! Excellent work!</div>' :
                    this.score >= 7 ?
                    '<div class="alert alert-warning">Good job! Keep practicing to improve.</div>' :
                    '<div class="alert alert-info">Keep practicing to improve your score!</div>'
                }
            </div>
        `;
        feedback.className = 'mt-4';
        feedback.style.display = 'block';
        
        const newTopicBtn = document.createElement('button');
        newTopicBtn.className = 'btn btn-primary btn-lg d-block mx-auto mt-4';
        newTopicBtn.textContent = 'Choose New Topic';
        newTopicBtn.onclick = () => {
            this.resetProgress();
            document.getElementById('question-container').style.display = 'block';
            document.getElementById('answer').style.display = 'block';
            document.getElementById('checkAnswer').style.display = 'block';
            document.getElementById('answer').disabled = false;
            document.getElementById('checkAnswer').disabled = false;
            this.showTopicSelection();
            this.updateTopicColors();
            feedback.style.display = 'none';
        };
        feedback.appendChild(newTopicBtn);
    }

    updateProgress() {
        document.getElementById('score').textContent = `Score: ${this.score} / ${this.questionCount} (${10 - this.questionCount} questions remaining)`;
    }

    showFeedback(message, type) {
        if (this.questionCount < 10) {
            const feedback = document.getElementById('feedback');
            feedback.textContent = message;
            feedback.className = `alert alert-${type}`;
            feedback.style.display = 'block';
        }
    }

    setupEventListeners() {
        try {
            console.log('Setting up event listeners...');
            
            document.querySelectorAll('.list-group-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    try {
                        console.log('Topic clicked:', e.target.dataset.topic);
                        this.currentTopic = e.target.dataset.topic;
                        this.score = 0;
                        this.questionCount = 0;
                        this.showPracticeArea();
                        this.generateQuestion();
                    } catch (error) {
                        console.error('Error handling topic click:', error);
                    }
                });
            });

            const backButton = document.getElementById('back-to-topics');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    try {
                        this.showTopicSelection();
                    } catch (error) {
                        console.error('Error returning to topics:', error);
                    }
                });
            }

            const checkAnswerButton = document.getElementById('checkAnswer');
            const answerInput = document.getElementById('answer');

            if (checkAnswerButton) {
                checkAnswerButton.addEventListener('click', () => this.checkAnswer());
            }

            if (answerInput) {
                answerInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.checkAnswer();
                    }
                });
            }
            
            console.log('Event listeners setup complete');
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    async updateTopicColors() {
        try {
            const response = await fetch('/api/progress');
            const progress = await response.json();
            
            progress.forEach(topic => {
                const element = document.querySelector(`[data-topic="${topic.topic}"]`);
                if (element) {
                    element.classList.remove(
                        'list-group-item-light',
                        'list-group-item-success',
                        'list-group-item-warning',
                        'list-group-item-danger',
                        'list-group-item-dark'
                    );
                    element.classList.add(topic.status_color);
                    
                    const baseText = element.textContent.split('(Best:')[0].trim();
                    element.innerHTML = topic.completed ? 
                        `${baseText} (Best: ${topic.best_score}/10)` : baseText;
                }
            });
        } catch (error) {
            console.error('Error updating topic colors:', error);
        }
    }

    async showTopicSelection() {
        try {
            document.getElementById('topic-selection').style.display = 'block';
            document.getElementById('practice-area').style.display = 'none';
            console.log('Updating topic colors on selection screen');
            
            // Force an immediate color update
            await this.updateTopicColors();
            
            // Add a small delay to ensure DOM updates are complete
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Double-check colors are applied
            const topics = document.querySelectorAll('.list-group-item');
            topics.forEach(topic => {
                if (!Array.from(topic.classList).some(cls => cls.startsWith('list-group-item-'))) {
                    console.warn('Topic missing color class:', topic);
                    this.updateTopicColors(); // Retry if any topic is missing color
                }
            });
        } catch (error) {
            console.error('Error showing topic selection:', error);
            // Attempt recovery
            this.updateTopicColors().catch(e => console.error('Color update retry failed:', e));
        }
    }

    showPracticeArea() {
        document.getElementById('topic-selection').style.display = 'none';
        document.getElementById('practice-area').style.display = 'block';
        document.getElementById('current-topic').textContent = topics[this.currentTopic].title;
        
        const formatHelp = document.getElementById('answer-format-help');
        formatHelp.style.display = this.currentTopic === 'fractions' ? 'block' : 'none';
        
        const graphingContainer = document.getElementById('graphing-container');
        graphingContainer.style.display = this.currentTopic === 'graphing' ? 'block' : 'none';
        
        const answerInput = document.getElementById('answer');
        answerInput.type = this.currentTopic === 'fractions' ? 'text' : 'number';
        answerInput.placeholder = this.currentTopic === 'fractions' ? 
            'Enter fraction (e.g., 3/4) or decimal' : 'Enter your answer';
            
        // Reset canvas for graphing
        if (this.currentTopic === 'graphing') {
            const canvas = document.getElementById('graphCanvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing MathGame...');
    const game = new MathGame();
});
