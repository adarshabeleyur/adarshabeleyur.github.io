// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults(e) {
  // console.log('Calculating...');

  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const prinicipal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (prinicipal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - prinicipal).toFixed(
      2
    );

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide laoder
    document.getElementById('loading').style.display = 'none';
  } else {
    showErrors('Please check your numbers');
  }
}

// show errors
function showErrors(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide laoder
  document.getElementById('loading').style.display = 'none';
  // Create div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3s
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
