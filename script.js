        let display = document.getElementById('display');
        let currentInput = '';
        let previousInput = '';
        let operator = '';
        let shouldResetDisplay = false;

        function appendToDisplay(value) {
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            
            // Handle decimal point
            if (value === '.' && currentInput.includes('.')) {
                return;
            }
            
            // Handle operators
            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '' && value === '-') {
                    currentInput = '-';
                } else if (currentInput !== '') {
                    if (operator && previousInput !== '') {
                        calculateResult();
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
            } else {
                currentInput += value;
            }
            
            updateDisplay();
        }

        function updateDisplay() {
            if (currentInput === '' && previousInput !== '' && operator) {
                display.value = previousInput + ' ' + (operator === '*' ? '×' : operator) + ' ';
            } else {
                display.value = currentInput || '0';
            }
        }

        function clearDisplay() {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '0';
            display.classList.remove('error');
        }

        function clearEntry() {
            currentInput = '';
            display.value = '0';
            display.classList.remove('error');
        }

        function deleteLast() {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            }
            display.classList.remove('error');
        }

        function calculateResult() {
            if (previousInput === '' || currentInput === '' || operator === '') {
                return;
            }

            try {
                let result;
                const prev = parseFloat(previousInput);
                const current = parseFloat(currentInput);

                switch (operator) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '*':
                        result = prev * current;
                        break;
                    case '/':
                        if (current === 0) {
                            throw new Error('Cannot divide by zero');
                        }
                        result = prev / current;
                        break;
                    default:
                        return;
                }

                // Round to avoid floating point precision issues
                result = Math.round(result * 100000000) / 100000000;
                
                display.value = result;
                currentInput = result.toString();
                previousInput = '';
                operator = '';
                shouldResetDisplay = true;
                display.classList.remove('error');
            } catch (error) {
                display.value = 'Error';
                display.classList.add('error');
                currentInput = '';
                previousInput = '';
                operator = '';
                shouldResetDisplay = true;
                
                // Auto clear error after 2 seconds
                setTimeout(() => {
                    if (display.value === 'Error') {
                        clearDisplay();
                    }
                }, 2000);
            }
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '+' || key === '-') {
                appendToDisplay(key);
            } else if (key === '*') {
                appendToDisplay('*');
            } else if (key === '/') {
                event.preventDefault(); // Prevent browser search
                appendToDisplay('/');
            } else if (key === '.') {
                appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                calculateResult();
            } else if (key === 'Escape') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            }
        });

        // Add button click sound effect (optional)
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function() {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });

        // Initialize display
        clearDisplay();

















// let display = document.getElementById('display');
// let currentInput = '';
// let previousInput = '';
// let operator = '';
// let shouldResetDisplay = false;

// function appendToDisplay(value) {
//     if (shouldResetDisplay) {
//         currentInput = '';
//         shouldResetDisplay = false;
//     }

//     if (value === '.' &&  currentInput.includes('.')) {
//         return;
//     }

    
//     if (['+', '-', '*', '/'].includes(value)) {
//         if (currentInput === '' && value === '-'){
//             currentInput = '-';
//         } else if (currentInput !== '') {
//             if (operator && previousInput !== '') {
//                 calculateResult();
//             }
//             operator = value;
//             previousInput = currentInput;
//             currentInput = '';
//         }
//     } else {
//         currentInput += value;
//     }
//     updateDisplay();
// }


// function updateDisplay() {
//     if (currentInput === '' && previousInput !== '' & operator) {
//         display.value = previousInput + ' ' + (operator === '*' ? 'x': operator) + ' ';
//     } else {
//         display.value = currentInput || '0';
//     }
// }

// function clearDisplay() {
//     currentInput = '';
//     previousInput = '';
//     operator = '';
//     display.value = 0;
//     display.classList.remove('error');
// }

// function clearEntry() {
//     currentInput = '';
//     display.value = '0';
//     display.classList.remove('error');
// }

// function deleteLast() {
//     if (currentInput.length > 0) {
//         currentInput = currentInput.slice(0, -1);
//         updateDisplay();
//     }
//     display.classList.remove('error');
// }

// function calculateResult() {
//     if (previousInput === '' || currentInput === '' || operator === ''){
//         return;
//     }

//     try {
//         let result;
//         const prev = parseFloat(previousInput);
//         const current = parseFloat(currentInput);

//         switch (operator) {
//             case '+':
//                 result = prev + current;
//                 break;
//             case '-': 
//                 result = prev - current;
//                 break;
//             case '*':
//                 result = prev * current;
//                 break;
//             case '/':
//                 if (current === 0) {
//                     throw new Error('Cannot Divide By Zero');
//                 }
//                 result = prev / current;
//                 break;

//             default:
//                 return;
//         }
//         result = Math.round(result * 100000000) / 100000000;

//         display.value = result;
//         currentInput = result.toString();

//         previousInput = '';
//         operator = '';
//         shouldResetDisplay = true;
//         display.classList.remove('error');
//     } catch (error) {
//         display.value = 'Error';
//         display.classList.add('error');
//         currentInput = '';
//         previousInput = '';
//         operator = '';
//         shouldResetDisplay = true;

//         setTimeout(() => {
//             if (display.value === 'Error') {
//                 clearDisplay();
//             }
//         }, 2000);
//     }
// }


// document.addEventListener('keydown', function(event) {
//     let key = event.key;

//     if (key >= '0' && key <= '9') {
//         appendToDisplay(key);
//     } else if (key === '+' || key === '-') {
//         appendToDisplay(key);
//     } else if (key === '*') {
//         appendToDisplay('*');
//     } else if (key === '/') {
//         event.preventDefault();
//         appendToDisplay('/');
//     } else if (key === '.') {
//         appendToDisplay(key);
//     } else if (key === 'Enter' || key === '=') {
//         calculateResult();
//     } else if (key === 'Escape') {
//         clearDisplay();
//     } else if (key === 'Backspace') {
//         deleteLast();
//     }
// });

// document.querySelectorAll('btn').forEach(button => {
//     button.addEventListener('click', function() {
//         this.style.transform = 'scale(0.95)';
//         setTimeout(() => {
//             this.style.transform = '';
//         }, 100);
//     });
// });

// clearDisplay();





