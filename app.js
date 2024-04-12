document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate tax
    function calculateTax(age, income, extraIncome, deductions) {
      var tax = 0;
      var taxableIncome = income + extraIncome - deductions;
      if (taxableIncome > 800000) {
        if (age === "<40") {
          tax = 0.3 * (taxableIncome - 800000);
        } else if (age === "≥ 40 &lt; 60") {
          tax = 0.4 * (taxableIncome - 800000);
        } else if (age === "≥ 60") {
          tax = 0.1 * (taxableIncome - 800000);
        }
      }
      return tax;
    }

    // Form submission
    document.getElementById("taxForm").addEventListener("submit", function(event) {
      event.preventDefault();
      var age = document.getElementById("age").value;
      var income = parseFloat(document.getElementById("income").value);
      var extraIncome = parseFloat(document.getElementById("extraIncome").value);
      var deductions = parseFloat(document.getElementById("deductions").value);

      // Check for errors and display error icons
      if (isNaN(income)) {
        document.getElementById("incomeError").style.display = "block";
      } else {
        document.getElementById("incomeError").style.display = "none";
      }
      if (isNaN(extraIncome)) {
        document.getElementById("extraIncomeError").style.display = "block";
      } else {
        document.getElementById("extraIncomeError").style.display = "none";
      }
      if (isNaN(deductions)) {
        document.getElementById("deductionsError").style.display = "block";
      } else {
        document.getElementById("deductionsError").style.display = "none";
      }
      if (age === "") {
        document.getElementById("ageError").style.display = "block";
      } else {
        document.getElementById("ageError").style.display = "none";
      }

      // If no errors, calculate tax and display result in modal
      if (!isNaN(income) && !isNaN(extraIncome) && !isNaN(deductions) && age !== "") {
        var tax = calculateTax(age, income, extraIncome, deductions);
        document.getElementById("modalBody").innerHTML = "<p>Tax to be paid: " + (tax / 100000)+ " Lakhs</p>";
        var modal = new bootstrap.Modal(document.getElementById('resultModal'));
        modal.show();
      }
    });
  });