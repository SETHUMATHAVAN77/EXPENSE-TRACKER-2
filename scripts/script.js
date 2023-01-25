const balanceEl = document.getElementById("balance");

const money_plus = document.getElementById("money-plus");

const money_minus = document.getElementById("money-minus");

const listEl = document.getElementById("list");

const formEl = document.getElementById("form");

const transactionEl = document.getElementById("transaction");

const amountEl = document.getElementById("amount");

// global variables
const data = JSON.parse(localStorage.getItem("transactions"));

let transactions = data.length > 0 ? data : [];
let income = 0;
let expense = 0;
let balance = 0;

// functions
function init() {
  listEl.innerHTML = null;

  // initial list loading
  transactions.forEach((transaction) => addTransactionToDom(transaction));

  // update value
  updateValue();
}
// update value
function updateValue() {
  income = transactions
    .map((transaction) => transaction.amount)
    .filter((val) => val > 0)
    .reduce((prev, val) => prev + val, 0);

  expense = transactions
    .map((transaction) => transaction.amount)
    .filter((val) => val < 0)
    .reduce((prev, val) => prev + val, 0);

  balance = transactions
    .map((transaction) => transaction.amount)
    .reduce((prev, val) => prev + val, 0);

  money_plus.innerText = `${income}`;
  money_minus.innerText = `${Math.abs(expense)}`;
  balanceEl.innerText = `${balance}`;
}
// delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  // initial settings
  init();
  // update localStorage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransactionToDom({ id, name, amount }) {
  // create li element
  const liEl = document.createElement("li");

  // add className to liEl

  liEl.className = amount > 0 ? "plus" : "minus";

  // innerHtml
  liEl.innerHTML = `<span>${name}</span><span>₹${amount}</span>
          <button class="delete-btn" onclick = deleteTransaction(${id})>X</button>`;
  // append child
  listEl.appendChild(liEl);
}

// event listeners
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    transactionEl.value.trim() === "" ||
    amountEl.value.trim() === ""
    // ||   Number(parseInt(amountEl.value === 0))
  ) {
    alert("please Enter a Value And Amount");
  } else {
    // create a transaction object
    const transaction = {
      id: Date.now(),
      name: transactionEl.value,
      amount: Number(amountEl.value),
    };
    // add transaction object to the transactions array
    transactions.push(transaction);

    // create a local storage transactions array
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // add transaction to dom
    addTransactionToDom(transaction);

    // update value

    updateValue();

    // clear the input El
    transactionEl.value = null;
    amountEl.value = null;
  }
});

// initial settings
init();
