# Digital Electronics Project - Subtractors

This project demonstrates interactive half and full subtractor circuits with a clean white and orange theme.

## Features

- **Interactive Half Subtractor**: Visual representation with two inputs (A and B) and two outputs (Difference and Borrow)
- **Interactive Full Subtractor**: Visual representation with three inputs (A, B, and Borrow In) and two outputs (Difference and Borrow Out)
- **Truth Tables**: Complete truth tables for both subtractors
- **Real-time Updates**: The circuit diagrams update in real-time as you toggle the inputs
- **Responsive Design**: Works on both desktop and mobile devices

## Files

- `index.html`: The main HTML structure
- `styles.css`: CSS styling with white and orange theme
- `script.js`: JavaScript functionality for the interactive circuits

## How to Use

1. Open `index.html` in a web browser
2. Toggle the input switches to see how the circuits behave
3. Observe the changes in the circuit diagram and output values

## Half Subtractor

A half subtractor performs subtraction on two binary digits and produces two outputs:
- **Difference (D)**: The result of the subtraction
- **Borrow (B)**: Indicates if a borrow was needed

### Logic Equations
- D = A ⊕ B (XOR)
- B = Ā · B (NOT A AND B)

## Full Subtractor

A full subtractor performs subtraction on three binary digits (including a borrow in) and produces two outputs:
- **Difference (D)**: The result of the subtraction
- **Borrow Out (Bout)**: Indicates if a borrow was needed

### Logic Equations
- D = A ⊕ B ⊕ Bin
- Bout = (Ā · B) + (Bin · (Ā + B̄))

## Technologies Used

- HTML5
- CSS3
- JavaScript
- SVG for circuit visualization 