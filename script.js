// DOM Access
const globalBalance = document.querySelector('.globalBalance')
const income = document.querySelector('.income')
const expense = document.querySelector('.expense')
const list = document.querySelector('.historyList')
const form = document.querySelector('.newTransaction')
const transactionType = document.querySelector('.transactionTypeColor')
const textInput = document.querySelector('.newTransactionText')
const amountInput = document.querySelector('.newTransactionAmount')
const addButton = document.querySelector('.addButton')
const showPswImg = document.querySelector('.showPsw')
const hidePswImg = document.querySelector('.hidePsw')
const pswImg = document.querySelector('.pswImg')




// Item List Array 
const transactionsArr = [
    // {text:'Rent', amount: -1000},
    // {text: 'Salary', amount: 7500},
];
transactions = transactionsArr;

// EVENTS

// Add Button

addButton.addEventListener('click', addNewTransaction)
window.addEventListener('keypress', (e) => {
    const enterKey = 13
    if(e.keyCode === enterKey) {
        addNewTransaction()
    }
})


// FUNCTIONS
// Add transaction item to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const itemList = document.createElement('li');

    // Add class to the item list based on the sign (value)
    itemList.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    
    itemList.innerHTML = `<p class="transactionName">${transaction.text}</p>        
    <span class="transactionAmount">${sign} ${Math.abs(transaction.amount)}</span>
    <p class="deleteBtn">x</p>
    `
    list.appendChild(itemList)
    
}

// Add and Remove new transaction to the array 
function addNewTransaction(transaction) {
    if(textInput.value === '' || amountInput.value === '') {
        preventDefault()
        alert('Please enter a valid transaction and its amount')
    } else {
        const transaction = { // New transaction object to push
            text: textInput.value,
            amount: +amountInput.value,
        }
        transactions.push(transaction)
        addTransactionDOM(transaction);
        updateBalanceValues();
        textInput.value = '';
        amountInput.value = '';
        
        // Remove Transaction's Event and Function    
        list.addEventListener('click', removeItem)


        // Remove Item from the DOM and from the transactions' Array
        function removeItem(e) {
            const item = e.target
            const itemParent = item.parentElement; 
            const nameOfRemoved =itemParent.firstChild.innerHTML
            
            if (item.classList[0] === 'deleteBtn' && 
                transaction.text.indexOf(nameOfRemoved) === 0) {
                itemParent.remove() // Remove from the UI 
                transactions.splice(transaction.text.indexOf(nameOfRemoved), 1)
                console.log(`You've removed ${nameOfRemoved} item`);
                updateBalanceValues()
            }
        }
    }      
}

// Update balance values
function updateBalanceValues() {
// Get transactions amount in a new array with MAP
    const amountsArr = transactionsArr
    .map(transaction => transaction.amount);

// Get the total balance (incomes & expenses) with REDUCE
    const totalBalance = amountsArr
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
// Filter those amounts: incomes (+) & expenses(-)
    const amountsIncome = amountsArr.filter(item => item > 0);
    const amountsExpense = amountsArr.filter(item => item < 0);

// Get the total amount of each one with REDUCE
    totalIncomes = amountsIncome.reduce((acc, item) => (acc += item), 0);
    totalExpenses = Math.abs(amountsExpense.reduce((acc, item) => (acc += item), 0)); 
    
// Show or Hide Balance's Functions
globalBalance.innerHTML = `$${totalBalance}`;

    showPswImg.addEventListener('click', () => {
        showPswImg.classList.add('hide')
        hidePswImg.classList.remove('hide')
        globalBalance.innerHTML = '$ ***';
    })
    hidePswImg.addEventListener('click', () => {
        hidePswImg.classList.add('hide')
        showPswImg.classList.remove('hide')
        globalBalance.innerHTML = `$${totalBalance}`;
    })

// Update the UI
    income.innerHTML = `+ $${totalIncomes}`
    expense.innerHTML = `- $${totalExpenses}`

} 

// GLOBAL FUNCTION Init app
function init () {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateBalanceValues()
    addNewTransaction()
}
updateBalanceValues()
init();
