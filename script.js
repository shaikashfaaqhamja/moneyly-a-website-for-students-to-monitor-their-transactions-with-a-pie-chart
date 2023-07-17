const incomeInput = document.getElementById('income-input');
const paymentInput = document.getElementById('payment-input');
const paymentList = document.getElementById('payment-list');
const totalPayments = document.getElementById('total-payments');
const warningMessage = document.getElementById('warning-message');
const pieChartCanvas = document.getElementById('pie-chart-canvas');

let income = 0;
let payments = [];

function setIncome() {
  income = parseFloat(incomeInput.value);
  incomeInput.value = '';
  updateTotalPayments();
  drawPieChart();
}

function addPayment() {
  const payment = parseFloat(paymentInput.value);
  if (!isNaN(payment)) {
    payments.push(payment);
    paymentInput.value = '';
    const paymentItem = document.createElement('li');
    paymentItem.classList.add('payment-item');
    paymentItem.innerText = `$${payment}`;
    paymentList.appendChild(paymentItem);
    updateTotalPayments();
    checkWarning();
    payments.push(payment);
    payments.push(parseInt(payment));
    console.log('Payments:', payments);
    drawPieChart();
  }
}

function updateTotalPayments() {
  const total = payments.reduce((acc, payment) => acc + payment, 0);
  totalPayments.innerText = total.toFixed(2);
  drawPieChart();
}

function checkWarning() {
  const total = payments.reduce((acc, payment) => acc + payment, 0);
  if (total >= income * 0.6) {
    warningMessage.innerText = 'Warning: 60% of income spent!';
    warningMessage.classList.add('warning');
  } else {
    warningMessage.innerText = '';
    warningMessage.classList.remove('warning');
  }
}
function drawPieChart() {
  const ctx = pieChartCanvas.getContext('2d');
  const total = payments.reduce((acc, payment) => acc + payment, 0);
  const incomeLeft = income - total;
  const incomePercentage = incomeLeft / income;
  const paymentsPercentage = 1 - incomePercentage;
  console.log('Total:', total);
  console.log('Income left:', incomeLeft);
  console.log('Income percentage:', incomePercentage);
  console.log('Payments percentage:', paymentsPercentage);

  console.log(pieChartCanvas);
  console.log('Pie chart canvas:', pieChartCanvas);

  const chartData = {
    datasets: [{
      data: [incomePercentage, paymentsPercentage],
      backgroundColor: [
        '#2ecc71', // green
        '#e74c3c', // red
      ],
      borderColor: '#fff',
    }],
    labels: [
      'Income',
      'Payments',
    ],
  };
  const chartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'white',
        fontSize: 16,
      },
    },
  };
  new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: chartOptions,
  });
}