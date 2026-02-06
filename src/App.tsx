import React, { useState } from 'react';
import './App.css';

interface CalculationResult {
  percentage: number | null;
  grade: string;
  formula: string;
  isFail: boolean;
}

function App() {
  const [cgpa, setCgpa] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculatePercentage = (cgpaValue: number): CalculationResult => {
    if (cgpaValue < 4.0) {
      return {
        percentage: null,
        grade: 'F/Fail',
        formula: 'N/A',
        isFail: true
      };
    }

    if (cgpaValue >= 9.5 && cgpaValue <= 10.0) {
      return {
        percentage: (20 * cgpaValue) - 100,
        grade: 'O',
        formula: '(20 × CGPA) - 100',
        isFail: false
      };
    }

    if (cgpaValue >= 8.25 && cgpaValue < 9.5) {
      return {
        percentage: (12 * cgpaValue) - 24,
        grade: 'A+',
        formula: '(12 × CGPA) - 24',
        isFail: false
      };
    }

    if (cgpaValue >= 6.75 && cgpaValue < 8.25) {
      return {
        percentage: (10 * cgpaValue) - 7.5,
        grade: 'A',
        formula: '(10 × CGPA) - 7.5',
        isFail: false
      };
    }

    if (cgpaValue >= 5.75 && cgpaValue < 6.75) {
      return {
        percentage: (5 * cgpaValue) + 26.25,
        grade: 'B+',
        formula: '(5 × CGPA) + 26.25',
        isFail: false
      };
    }

    if (cgpaValue >= 5.25 && cgpaValue < 5.75) {
      return {
        percentage: (10 * cgpaValue) - 2.5,
        grade: 'B',
        formula: '(10 × CGPA) - 2.5',
        isFail: false
      };
    }

    if (cgpaValue >= 4.75 && cgpaValue < 5.25) {
      return {
        percentage: (10 * cgpaValue) - 2.50,
        grade: 'C',
        formula: '(10 × CGPA) - 2.50',
        isFail: false
      };
    }

    if (cgpaValue >= 4.0 && cgpaValue < 4.75) {
      return {
        percentage: (6.6 * cgpaValue) + 13.6,
        grade: 'D',
        formula: '(6.6 × CGPA) + 13.6',
        isFail: false
      };
    }

    return {
      percentage: null,
      grade: 'Invalid',
      formula: 'N/A',
      isFail: true
    };
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const cgpaNum = parseFloat(cgpa);

    if (isNaN(cgpaNum)) {
      setError('Please enter a valid CGPA value');
      return;
    }

    if (cgpaNum < 0 || cgpaNum > 10) {
      setError('CGPA must be between 0.00 and 10.00');
      return;
    }

    const calculationResult = calculatePercentage(cgpaNum);
    setResult(calculationResult);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCgpa(value);
      setError('');
      setResult(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>SPPU CGPA to Percentage Calculator</h1>
          <p className="subtitle">Savitribai Phule Pune University - 2024 Engineering Pattern</p>
        </header>

        <main className="main-content">
          <div className="calculator-card">
            <div className="input-section">
              <label htmlFor="cgpa-input" className="input-label">
                Enter Your CGPA
              </label>
              <div className="input-wrapper">
                <input
                  id="cgpa-input"
                  type="text"
                  value={cgpa}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="0.00 - 10.00"
                  className="cgpa-input"
                  step="0.01"
                  min="0"
                  max="10"
                />
                <button onClick={handleCalculate} className="calculate-btn">
                  Calculate
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>

            {result && (
              <div className="result-section">
                {result.isFail ? (
                  <div className="fail-result">
                    <h3>Failing Grade</h3>
                    <p>Percentage is not applicable - 40% minimum not achieved</p>
                  </div>
                ) : (
                  <div className="success-result">
                    <div className="percentage-display">
                      <span className="percentage-value">
                        {result.percentage?.toFixed(2)}%
                      </span>
                      <span className="percentage-label">Percentage of Marks</span>
                    </div>

                    <div className="result-breakdown">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Grade:</span>
                        <span className="grade-badge grade-{result.grade.toLowerCase().replace('+', '-plus')}">
                          {result.grade}
                        </span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Formula:</span>
                        <span className="formula">{result.formula}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grade-reference">
            <h3>Grade Reference Chart</h3>
            <div className="grade-table">
              <div className="table-header">
                <span>CGPA Range</span>
                <span>Grade</span>
                <span>Formula</span>
              </div>
              <div className="table-row">
                <span>9.5 - 10.0</span>
                <span className="grade-badge grade-o">O</span>
                <span>(20 × CGPA) - 100</span>
              </div>
              <div className="table-row">
                <span>8.25 - 9.5</span>
                <span className="grade-badge grade-a-plus">A+</span>
                <span>(12 × CGPA) - 24</span>
              </div>
              <div className="table-row">
                <span>6.75 - 8.25</span>
                <span className="grade-badge grade-a">A</span>
                <span>(10 × CGPA) - 7.5</span>
              </div>
              <div className="table-row">
                <span>5.75 - 6.75</span>
                <span className="grade-badge grade-b-plus">B+</span>
                <span>(5 × CGPA) + 26.25</span>
              </div>
              <div className="table-row">
                <span>5.25 - 5.75</span>
                <span className="grade-badge grade-b">B</span>
                <span>(10 × CGPA) - 2.5</span>
              </div>
              <div className="table-row">
                <span>4.75 - 5.25</span>
                <span className="grade-badge grade-c">C</span>
                <span>(10 × CGPA) - 2.50</span>
              </div>
              <div className="table-row">
                <span>4.0 - 4.75</span>
                <span className="grade-badge grade-d">D</span>
                <span>(6.6 × CGPA) + 13.6</span>
              </div>
              <div className="table-row fail-row">
                <span>&lt; 4.0</span>
                <span className="grade-badge grade-f">F</span>
                <span>Fail</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="disclaimer">
            <p>
              <strong>Disclaimer:</strong> Calculations are based on the Savitribai Phule Pune University (SPPU) 4 Years UG Engineering Programme Rules (2024 Pattern).
            </p>
            <p>Results are rounded to two decimal places as per university guidelines.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;