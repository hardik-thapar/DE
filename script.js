document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Initialize the circuit diagrams
    initHalfSubtractor();
    initFullSubtractor();
    
    // Set up event listeners for half subtractor inputs
    const halfInputA = document.getElementById('half-input-a');
    const halfInputB = document.getElementById('half-input-b');
    
    if (halfInputA) {
        halfInputA.addEventListener('change', function() {
            console.log('Half subtractor input A changed:', this.checked);
            updateHalfSubtractor();
            animateOutput('half-diff');
            animateOutput('half-borrow');
        });
    } else {
        console.error('Could not find half-input-a element');
    }
    
    if (halfInputB) {
        halfInputB.addEventListener('change', function() {
            console.log('Half subtractor input B changed:', this.checked);
            updateHalfSubtractor();
            animateOutput('half-diff');
            animateOutput('half-borrow');
        });
    } else {
        console.error('Could not find half-input-b element');
    }
    
    // Set up event listeners for full subtractor inputs
    const fullInputA = document.getElementById('full-input-a');
    const fullInputB = document.getElementById('full-input-b');
    const fullInputBin = document.getElementById('full-input-bin');
    
    if (fullInputA) {
        fullInputA.addEventListener('change', function() {
            console.log('Full subtractor input A changed:', this.checked);
            updateFullSubtractor();
            animateOutput('full-diff');
            animateOutput('full-borrow');
        });
    } else {
        console.error('Could not find full-input-a element');
    }
    
    if (fullInputB) {
        fullInputB.addEventListener('change', function() {
            console.log('Full subtractor input B changed:', this.checked);
            updateFullSubtractor();
            animateOutput('full-diff');
            animateOutput('full-borrow');
        });
    } else {
        console.error('Could not find full-input-b element');
    }
    
    if (fullInputBin) {
        fullInputBin.addEventListener('change', function() {
            console.log('Full subtractor input Bin changed:', this.checked);
            updateFullSubtractor();
            animateOutput('full-diff');
            animateOutput('full-borrow');
        });
    } else {
        console.error('Could not find full-input-bin element');
    }
    
    // Also add click events to the toggle switches for better mobile support
    document.querySelectorAll('.toggle-switch').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            // Only trigger if the click was on the toggle itself, not the checkbox
            if (e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    // Manually trigger the change event
                    const event = new Event('change');
                    checkbox.dispatchEvent(event);
                    
                    // Update the aria-checked attribute for accessibility
                    this.setAttribute('aria-checked', checkbox.checked);
                    
                    // Add visual feedback
                    const valueDisplay = this.parentNode.querySelector('.input-value');
                    if (valueDisplay) {
                        valueDisplay.textContent = checkbox.checked ? '1' : '0';
                        animateElement(valueDisplay);
                    }
                }
            }
        });
        
        // Add keyboard support for accessibility
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    // Manually trigger the change event
                    const event = new Event('change');
                    checkbox.dispatchEvent(event);
                    
                    // Update the aria-checked attribute for accessibility
                    this.setAttribute('aria-checked', checkbox.checked);
                }
            }
        });
    });
    
    // Wait for SVG objects to load
    const halfSubtractorObj = document.getElementById('half-subtractor-img');
    const fullSubtractorObj = document.getElementById('full-subtractor-img');
    
    if (halfSubtractorObj) {
        halfSubtractorObj.addEventListener('load', function() {
            console.log('Half subtractor SVG loaded');
            updateHalfSubtractor();
        });
    }
    
    if (fullSubtractorObj) {
        fullSubtractorObj.addEventListener('load', function() {
            console.log('Full subtractor SVG loaded');
            updateFullSubtractor();
        });
    }
    
    // Initial update
    updateHalfSubtractor();
    updateFullSubtractor();
});

// Half Subtractor Functions
function initHalfSubtractor() {
    const svg = document.getElementById('half-subtractor-svg');
    
    if (!svg) {
        console.error('Could not find half-subtractor-svg element');
        return;
    }
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Draw the circuit diagram
    const svgContent = `
        <!-- Input wires -->
        <path d="M 50,80 L 150,80" class="wire" id="half-wire-a" />
        <path d="M 50,170 L 150,170" class="wire" id="half-wire-b" />
        
        <!-- Input points -->
        <circle cx="50" cy="80" r="5" class="input-point" />
        <circle cx="50" cy="170" r="5" class="input-point" />
        
        <!-- XOR Gate for Difference -->
        <path d="M 150,50 Q 170,80 150,110 Q 190,80 150,50 Z" class="gate" />
        <text x="170" y="85" text-anchor="middle" font-size="12">XOR</text>
        
        <!-- AND Gate for Borrow -->
        <path d="M 150,140 L 150,200 L 180,200 Q 200,170 180,140 L 150,140 Z" class="gate" />
        <text x="175" y="175" text-anchor="middle" font-size="12">AND</text>
        
        <!-- NOT Gate for AND input -->
        <circle cx="130" cy="150" r="10" class="gate" />
        <text x="130" y="154" text-anchor="middle" font-size="12">NOT</text>
        <path d="M 50,80 L 100,80 L 100,150 L 120,150" class="wire" id="half-wire-a-not" />
        
        <!-- Output wires -->
        <path d="M 200,80 L 350,80" class="wire" id="half-wire-diff" />
        <path d="M 200,170 L 350,170" class="wire" id="half-wire-borrow" />
        
        <!-- Output points -->
        <circle cx="350" cy="80" r="5" class="output-point" />
        <circle cx="350" cy="170" r="5" class="output-point" />
        
        <!-- Labels -->
        <text x="30" y="85" text-anchor="end" font-size="12">A</text>
        <text x="30" y="175" text-anchor="end" font-size="12">B</text>
        <text x="370" y="85" text-anchor="start" font-size="12">Difference (D)</text>
        <text x="370" y="175" text-anchor="start" font-size="12">Borrow (Bout)</text>
    `;
    
    svg.innerHTML = svgContent;
    console.log('Half subtractor SVG initialized');
}

function updateHalfSubtractor() {
    console.log('Updating half subtractor');
    
    // Get input values
    const halfInputA = document.getElementById('half-input-a');
    const halfInputB = document.getElementById('half-input-b');
    
    if (!halfInputA || !halfInputB) {
        console.error('Could not find half subtractor input elements');
        return;
    }
    
    const inputA = halfInputA.checked ? 1 : 0;
    const inputB = halfInputB.checked ? 1 : 0;
    
    console.log('Half subtractor inputs:', inputA, inputB);
    
    // Update input value displays
    const halfAValue = document.getElementById('half-a-value');
    const halfBValue = document.getElementById('half-b-value');
    
    if (halfAValue) halfAValue.textContent = inputA;
    if (halfBValue) halfBValue.textContent = inputB;
    
    // Calculate outputs
    // Difference = A XOR B
    const difference = inputA ^ inputB;
    // Borrow = NOT A AND B
    const borrow = (!inputA) & inputB;
    
    console.log('Half subtractor outputs - Difference:', difference, 'Borrow:', borrow);
    
    // Update output displays
    const halfDiff = document.getElementById('half-diff');
    const halfBorrow = document.getElementById('half-borrow');
    
    if (halfDiff) {
        const oldValue = halfDiff.textContent;
        halfDiff.textContent = difference;
        if (oldValue != difference) {
            highlightTruthTableRow('half-subtractor', inputA, inputB);
        }
    }
    
    if (halfBorrow) {
        halfBorrow.textContent = borrow;
    }
    
    // Update signal indicators on the image
    updateHalfSubtractorSignals(inputA, inputB, difference, borrow);
    
    // Update toggle switch aria-checked attributes
    const halfToggleA = halfInputA.parentNode;
    const halfToggleB = halfInputB.parentNode;
    
    if (halfToggleA) halfToggleA.setAttribute('aria-checked', halfInputA.checked);
    if (halfToggleB) halfToggleB.setAttribute('aria-checked', halfInputB.checked);
    
    // Update SVG elements if possible
    updateHalfSubtractorSVG(inputA, inputB, difference, borrow);
}

// Function to update signal indicators on half subtractor image
function updateHalfSubtractorSignals(inputA, inputB, difference, borrow) {
    const overlay = document.getElementById('half-subtractor-overlay');
    if (!overlay) return;
    
    // Clear previous indicators
    overlay.innerHTML = '';
    
    // Define signal positions (percentages of the image) for our custom SVG
    const signalPositions = {
        inputA: { x: 14, y: 27 },
        inputB: { x: 14, y: 67 },
        xorGate: { x: 42, y: 27 },
        andGate: { x: 42, y: 67 },
        difference: { x: 76, y: 27 },
        borrow: { x: 76, y: 67 }
    };
    
    // Add signal indicators
    addSignalIndicator(overlay, signalPositions.inputA, inputA === 1);
    addSignalIndicator(overlay, signalPositions.inputB, inputB === 1);
    addSignalIndicator(overlay, signalPositions.xorGate, difference === 1);
    addSignalIndicator(overlay, signalPositions.andGate, borrow === 1);
    addSignalIndicator(overlay, signalPositions.difference, difference === 1);
    addSignalIndicator(overlay, signalPositions.borrow, borrow === 1);
}

// Function to update the SVG elements directly if possible
function updateHalfSubtractorSVG(inputA, inputB, difference, borrow) {
    const svgObject = document.getElementById('half-subtractor-img');
    if (!svgObject || !svgObject.contentDocument) return;
    
    try {
        const svgDoc = svgObject.contentDocument;
        
        // Update wires and gates based on signal values
        // This is optional and depends on the structure of your SVG
    } catch (e) {
        console.error('Error updating half subtractor SVG:', e);
    }
}

// Full Subtractor Functions
function initFullSubtractor() {
    const svg = document.getElementById('full-subtractor-svg');
    
    if (!svg) {
        console.error('Could not find full-subtractor-svg element');
        return;
    }
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Draw the circuit diagram
    const svgContent = `
        <!-- Input wires -->
        <path d="M 50,60 L 120,60" class="wire" id="full-wire-a" />
        <path d="M 50,150 L 120,150" class="wire" id="full-wire-b" />
        <path d="M 50,240 L 120,240" class="wire" id="full-wire-bin" />
        
        <!-- Input points -->
        <circle cx="50" cy="60" r="5" class="input-point" />
        <circle cx="50" cy="150" r="5" class="input-point" />
        <circle cx="50" cy="240" r="5" class="input-point" />
        
        <!-- First XOR Gate (A XOR B) -->
        <path d="M 120,30 Q 140,60 120,90 Q 160,60 120,30 Z" class="gate" />
        <text x="140" y="65" text-anchor="middle" font-size="12">XOR</text>
        
        <!-- Second XOR Gate for Difference -->
        <path d="M 200,60 Q 220,90 200,120 Q 240,90 200,60 Z" class="gate" />
        <text x="220" y="95" text-anchor="middle" font-size="12">XOR</text>
        
        <!-- First AND Gate -->
        <path d="M 120,120 L 120,180 L 150,180 Q 170,150 150,120 L 120,120 Z" class="gate" />
        <text x="145" y="155" text-anchor="middle" font-size="12">AND</text>
        
        <!-- Second AND Gate -->
        <path d="M 200,150 L 200,210 L 230,210 Q 250,180 230,150 L 200,150 Z" class="gate" />
        <text x="225" y="185" text-anchor="middle" font-size="12">AND</text>
        
        <!-- OR Gate for Borrow -->
        <path d="M 280,180 Q 300,150 320,180 Q 300,210 280,180 Z" class="gate" />
        <text x="300" y="185" text-anchor="middle" font-size="12">OR</text>
        
        <!-- Connecting wires -->
        <path d="M 160,60 L 200,60" class="wire" id="full-wire-xor1" />
        <path d="M 160,60 L 180,60 L 180,120 L 120,120" class="wire" id="full-wire-xor1-to-and1" />
        <path d="M 170,150 L 200,150" class="wire" id="full-wire-and1" />
        <path d="M 50,240 L 180,240 L 180,90 L 200,90" class="wire" id="full-wire-bin-to-xor2" />
        <path d="M 50,240 L 180,240 L 180,180 L 200,180" class="wire" id="full-wire-bin-to-and2" />
        <path d="M 250,180 L 280,180" class="wire" id="full-wire-and2-to-or" />
        <path d="M 170,150 L 190,150 L 190,210 L 280,210" class="wire" id="full-wire-and1-to-or" />
        
        <!-- Output wires -->
        <path d="M 240,90 L 350,90" class="wire" id="full-wire-diff" />
        <path d="M 320,180 L 350,180" class="wire" id="full-wire-borrow" />
        
        <!-- Output points -->
        <circle cx="350" cy="90" r="5" class="output-point" />
        <circle cx="350" cy="180" r="5" class="output-point" />
        
        <!-- Labels -->
        <text x="30" y="65" text-anchor="end" font-size="12">A</text>
        <text x="30" y="155" text-anchor="end" font-size="12">B</text>
        <text x="30" y="245" text-anchor="end" font-size="12">Bin</text>
        <text x="370" y="95" text-anchor="start" font-size="12">Difference (D)</text>
        <text x="370" y="185" text-anchor="start" font-size="12">Borrow (Bout)</text>
    `;
    
    svg.innerHTML = svgContent;
    console.log('Full subtractor SVG initialized');
}

function updateFullSubtractor() {
    console.log('Updating full subtractor');
    
    // Get input values
    const fullInputA = document.getElementById('full-input-a');
    const fullInputB = document.getElementById('full-input-b');
    const fullInputBin = document.getElementById('full-input-bin');
    
    if (!fullInputA || !fullInputB || !fullInputBin) {
        console.error('Could not find full subtractor input elements');
        return;
    }
    
    const inputA = fullInputA.checked ? 1 : 0;
    const inputB = fullInputB.checked ? 1 : 0;
    const inputBin = fullInputBin.checked ? 1 : 0;
    
    console.log('Full subtractor inputs:', inputA, inputB, inputBin);
    
    // Update input value displays
    const fullAValue = document.getElementById('full-a-value');
    const fullBValue = document.getElementById('full-b-value');
    const fullBinValue = document.getElementById('full-bin-value');
    
    if (fullAValue) fullAValue.textContent = inputA;
    if (fullBValue) fullBValue.textContent = inputB;
    if (fullBinValue) fullBinValue.textContent = inputBin;
    
    // Calculate intermediate values
    const xor1 = inputA ^ inputB;
    const and1 = (!inputA) & inputB;
    
    // Calculate outputs
    // Difference = (A XOR B) XOR Bin
    const difference = xor1 ^ inputBin;
    // Borrow = (NOT A AND B) OR (NOT(A XOR B) AND Bin)
    const and2 = (!xor1) & inputBin;
    const borrow = and1 | and2;
    
    console.log('Full subtractor outputs - Difference:', difference, 'Borrow:', borrow);
    
    // Update output displays
    const fullDiff = document.getElementById('full-diff');
    const fullBorrow = document.getElementById('full-borrow');
    
    if (fullDiff) {
        const oldValue = fullDiff.textContent;
        fullDiff.textContent = difference;
        if (oldValue != difference) {
            highlightTruthTableRow('full-subtractor', inputA, inputB, inputBin);
        }
    }
    
    if (fullBorrow) {
        fullBorrow.textContent = borrow;
    }
    
    // Update signal indicators on the image
    updateFullSubtractorSignals(inputA, inputB, inputBin, difference, borrow);
    
    // Update toggle switch aria-checked attributes
    const fullToggleA = fullInputA.parentNode;
    const fullToggleB = fullInputB.parentNode;
    const fullToggleBin = fullInputBin.parentNode;
    
    if (fullToggleA) fullToggleA.setAttribute('aria-checked', fullInputA.checked);
    if (fullToggleB) fullToggleB.setAttribute('aria-checked', fullInputB.checked);
    if (fullToggleBin) fullToggleBin.setAttribute('aria-checked', fullInputBin.checked);
    
    // Update SVG elements if possible
    updateFullSubtractorSVG(inputA, inputB, inputBin, difference, borrow);
}

// Function to update signal indicators on full subtractor image
function updateFullSubtractorSignals(inputA, inputB, inputBin, difference, borrow) {
    const overlay = document.getElementById('full-subtractor-overlay');
    if (!overlay) return;
    
    // Clear previous indicators
    overlay.innerHTML = '';
    
    // Define signal positions (percentages of the image) for our custom SVG
    const signalPositions = {
        inputA: { x: 12, y: 25 },
        inputB: { x: 12, y: 50 },
        inputBin: { x: 12, y: 75 },
        xorGate1: { x: 30, y: 25 },
        xorGate2: { x: 52, y: 25 },
        andGate1: { x: 30, y: 50 },
        andGate2: { x: 52, y: 50 },
        orGate: { x: 72, y: 50 },
        difference: { x: 80, y: 25 },
        borrow: { x: 80, y: 50 }
    };
    
    // Add signal indicators
    addSignalIndicator(overlay, signalPositions.inputA, inputA === 1);
    addSignalIndicator(overlay, signalPositions.inputB, inputB === 1);
    addSignalIndicator(overlay, signalPositions.inputBin, inputBin === 1);
    addSignalIndicator(overlay, signalPositions.xorGate1, (inputA ^ inputB) === 1);
    addSignalIndicator(overlay, signalPositions.xorGate2, difference === 1);
    addSignalIndicator(overlay, signalPositions.andGate1, ((!inputA) & inputB) === 1);
    addSignalIndicator(overlay, signalPositions.andGate2, ((!(inputA ^ inputB)) & inputBin) === 1);
    addSignalIndicator(overlay, signalPositions.orGate, borrow === 1);
    addSignalIndicator(overlay, signalPositions.difference, difference === 1);
    addSignalIndicator(overlay, signalPositions.borrow, borrow === 1);
}

// Function to update the SVG elements directly if possible
function updateFullSubtractorSVG(inputA, inputB, inputBin, difference, borrow) {
    const svgObject = document.getElementById('full-subtractor-img');
    if (!svgObject || !svgObject.contentDocument) return;
    
    try {
        const svgDoc = svgObject.contentDocument;
        
        // Update wires and gates based on signal values
        // This is optional and depends on the structure of your SVG
    } catch (e) {
        console.error('Error updating full subtractor SVG:', e);
    }
}

// Helper function to add a signal indicator to the overlay
function addSignalIndicator(overlay, position, isActive) {
    const indicator = document.createElement('div');
    indicator.className = 'signal-indicator';
    if (isActive) {
        indicator.classList.add('active');
    }
    
    indicator.style.left = position.x + '%';
    indicator.style.top = position.y + '%';
    indicator.style.opacity = isActive ? '1' : '0.2';
    
    overlay.appendChild(indicator);
}

// Helper function to animate output changes
function animateOutput(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        animateElement(element);
    }
}

// Helper function to add animation to an element
function animateElement(element) {
    // Add a pulse animation class
    element.classList.add('pulse-animation');
    
    // Remove the class after animation completes
    setTimeout(function() {
        element.classList.remove('pulse-animation');
    }, 500);
}

// Helper function to highlight the corresponding truth table row
function highlightTruthTableRow(sectionId, ...inputs) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const table = section.querySelector('.truth-table table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    // Remove highlight from all rows
    rows.forEach(row => row.classList.remove('highlighted-row'));
    
    // Find the matching row based on inputs
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        let match = true;
        
        for (let j = 0; j < inputs.length; j++) {
            if (parseInt(cells[j].textContent) !== inputs[j]) {
                match = false;
                break;
            }
        }
        
        if (match) {
            rows[i].classList.add('highlighted-row');
            break;
        }
    }
} 