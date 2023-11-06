const loanAmount = document.querySelector('.loan-input');
const annualInterest = document.querySelector('.interest-input');
const repaymentYeats = document.querySelector('.years-input');
const calcBtn = document.querySelector('.calculate-btn');
const container = document.querySelector('.container');

let error = false;
let errorMessage = false

calcBtn.addEventListener('click', () => {
   error = errorHandling();
   if (error) {
       return;
   }
   if (errorMessage) {
       console.log(container.children[1]);
       container.children[1].remove();
       errorMessage = false;
   }
   const principal = parseFloat(loanAmount.value);
   const calculatedInterest = parseFloat(annualInterest.value) / 100 / 12;
   const calculatedPayments = parseFloat(repaymentYeats.value) * 12;
   const x = Math.pow(calculatedInterest + 1, calculatedPayments);
   const monthly = (principal * x * calculatedInterest) / (x - 1);
   const icon = document.querySelector('.icon');
   icon.removeAttribute('hidden');
   setTimeout(() => {
       icon.setAttribute('hidden','');
       if (!!document.querySelector('.result-container')) {
           document.querySelector('.monthly-payment-result').value = monthly.toFixed(2);
           document.querySelector('.total-payment-result').value = (monthly * calculatedPayments).toFixed(2);
           document.querySelector('.total-interest-result').value = ((monthly * calculatedPayments) - principal).toFixed(2);

       } else {
           const div = document.createElement('div');
           div.className = 'result-container';
           const h2 = document.createElement('h2');
           h2.appendChild(document.createTextNode('Result'));
           div.appendChild(h2);
           const monthlyPayment = document.createElement('input');
           monthlyPayment.className = 'monthly-payment-result';
           monthlyPayment.setAttribute('disabled', '');
           monthlyPayment.setAttribute('type', 'text');
           monthlyPayment.value = monthly.toFixed(2);
           div.appendChild(monthlyPayment);
           const totalPayment = document.createElement('input');
           totalPayment.className = 'total-payment-result';
           totalPayment.setAttribute('disabled', '');
           totalPayment.setAttribute('type', 'text');
           div.appendChild(totalPayment),
           totalPayment.value = (monthly * calculatedPayments).toFixed(2);
           const totalInterest = document.createElement('input');
           totalInterest.className = 'total-interest-result';
           totalInterest.setAttribute('disabled', '');
           totalInterest.setAttribute('type', 'text');
           totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
           div.appendChild(totalInterest);
           document.querySelector('body').appendChild(div);
       }
       }, 2000);
});

function errorHandling() {
    if (loanAmount.value.search(/\d/) === -1) {
        console.log('error')
        displayError();
        return true;
    }
    if (annualInterest.value.search(/\d/) === -1) {
        displayError();
        return false;
    }
    if (repaymentYeats.value.search(/\d/) === -1) {
        displayError();
        return false;
    }
    return false;
}

function displayError() {
    if (!errorMessage) {
        const div = document.createElement('div');
        div.className = 'error-container';
        const p = document.createElement('p');
        p.appendChild(document.createTextNode('Check the Number entered'));
        div.appendChild(p);
        container.insertBefore(div, container.children[1]);
        errorMessage = true;
    }
}

