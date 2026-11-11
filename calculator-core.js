/**
 * Calculator Platform Core Engine - v1.0
 * Handles calculations, input validation, and result formatting.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Mortgage / Loan Calculator Example
    const calcBtn = document.getElementById("calculate-mortgage");
    const resetBtn = document.getElementById("reset-mortgage");

    if (calcBtn) {
        calcBtn.addEventListener("click", function () {
            // Get input values
            const principal = parseFloat(document.getElementById("loan-amount").value);
            const annualRate = parseFloat(document.getElementById("interest-rate").value);
            const years = parseFloat(document.getElementById("loan-term").value);

            // Error handling & validation
            const errorBox = document.getElementById("calc-error");
            if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
                if (errorBox) {
                    errorBox.style.display = "block";
                    errorBox.innerText = "Please enter valid positive numbers for all required fields.";
                }
                return;
            }

            if (errorBox) errorBox.style.display = "none";

            // Calculation Logic
            const monthlyRate = annualRate / 100 / 12;
            const totalPayments = years * 12;
            
            let monthlyPayment = 0;
            if (monthlyRate === 0) {
                monthlyPayment = principal / totalPayments;
            } else {
                monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                 (Math.pow(1 + monthlyRate, totalPayments) - 1);
            }

            const totalPayment = monthlyPayment * totalPayments;
            const totalInterest = totalPayment - principal;

            // Display Results
            document.getElementById("res-monthly").innerText = monthlyPayment.toFixed(2);
            document.getElementById("res-total").innerText = totalPayment.toFixed(2);
            document.getElementById("res-interest").innerText = totalInterest.toFixed(2);
            document.getElementById("results-container").style.display = "block";
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            document.getElementById("loan-amount").value = "";
            document.getElementById("interest-rate").value = "";
            document.getElementById("loan-term").value = "";
            document.getElementById("results-container").style.display = "none";
            const errorBox = document.getElementById("calc-error");
            if (errorBox) errorBox.style.display = "none";
        });
    }
});