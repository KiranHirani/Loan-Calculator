//Listen for submit 
document.getElementById('loan-form').addEventListener('submit', function (event) {
    //Hide results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    event.preventDefault();
});

//Calculate Results
function calculateResults() {
    //UI variables 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); // To convert the string into float
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //Monthly payments 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    //After it does this calculation, we want to check if this monthly value is a finite number using a method in JS, isFinite()

    if (isFinite(monthly)) {

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';

        //Hide Loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers')
    }
}


function showError(error) {
    //Show Results
    document.getElementById('results').style.display = 'none';

    //Hide Loader
    document.getElementById('loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = "alert alert-danger";

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading 
    card.insertBefore(errorDiv, heading);

    //Clear Error after 3 secs 
    setTimeout(clearError, 3000);
}


function clearError() {
    document.querySelector('.alert').remove();
}