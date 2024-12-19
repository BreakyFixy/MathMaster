# MARTECH S2 + S3 Basic Maintainer Math Practice

An interactive mathematics learning platform designed specifically for military maintenance personnel, focusing on developing precise technical mathematical skills through adaptive digital learning technologies.

## Features

- Multiple math topics with adaptive difficulty
- Interactive question generation
- Real-time graphing capabilities
- Progress tracking
- Score tracking and performance analytics

## Requirements

- Python 3.11 or higher
- Flask
- SQLAlchemy
- Additional Python packages (listed in requirements.txt)

## Installation

1. Clone or download this repository
2. Install Dependencies
   ```bash
   pip install flask
   ```
   ```bash
   pip install flask_sqlalchemy
   ``` 
3. Run the application:
   ```bash
   python main.py
   ```
4. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

- `app.py`: Main Flask application
- `models.py`: Database models
- `static/`: Static files (JavaScript, images)
  - `js/game.js`: Core game logic
  - `js/graphing.js`: Graphing functionality
- `templates/`: HTML templates
  - `base.html`: Base template
  - `index.html`: Main page template

## Topics Covered

- Positive and Negative Integers
- Order of Operations
- Fractions
- Rounding and Significant Figures
- Scientific Notation
- Ratios and Proportions
- Decimals
- Percentages
- Powers and Roots
- Arithmetic Expressions
- Algebra
- Area and Volume
- Quadratic Formula
- Graphing
