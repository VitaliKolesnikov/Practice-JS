'Use strict'

let start = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button')
let incomePlus = btnPlus[0]
let expensesPlus = btnPlus[1]
let depositCheck = document.querySelector('.deposit-checkmark')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item')
let income2 = document.querySelectorAll('.additional_income-item')[1]
let budgetMonthValue = document.querySelector('.budget_month-value')
let budgetDayValue = document.querySelector('.budget_day-value')
let expensesMonthValue = document.querySelector('.expenses_month-value')
let additionalIncomeValue = document.querySelector('.additional_income-value')
let additionalExpensesValue = document.querySelector('.additional_expenses-value')
let incomePeriodValue = document.querySelector('.income_period-value')
let targetMonthValue = document.querySelector('.target_month-value')
let salaryAmount = document.querySelector('.salary-amount')
let incomeTitle = document.querySelector('.income-title')
let incomeAmount = document.querySelector('.income-amount')
let expensesTitle = document.querySelector('.expenses-title')
let expensesItems = document.querySelectorAll('.expenses-items');
let targetAmount = document.querySelector('.target-amount')
let periodSelect = document.querySelector('.period-select')
let additionalExpenses = document.querySelector('.additional_expenses')
let additionalExpensesItem = document.querySelector('.additional_expenses-item')
let incomeItem = document.querySelectorAll('.income-items') 


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0, 
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        if(salaryAmount.value === '') {
            alert('Ошибка,заполните поле "Месячный доход"!')
            return
        }
        appData.budget = +salaryAmount.value;
        console.log('salaryAmount: ', salaryAmount.value)

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', '); 
        targetMonthValue.value = Math.ceil(appData.getTargetMonth())
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function() {
        
        console.log(expensesItems.parentNode);
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus)

        if (expensesItems.length === 2) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value
        if(itemExpenses != '' && cashExpenses != '') {
            appData.expenses[itemExpenses] = cashExpenses;
        }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item != '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue  !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },
    getIncome: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой?', 'Фриланс')
            let cashIncome = prompt('Сколько в месяц зарабатываешь на этом?', 10000)
            appData.income[itemIncome] = cashIncome;
        }

        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key]
        }
    },
    getInfoDeposit: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            appData.percentDeposit = prompt('Каокой годовой процент?', 10)
            appData.moneyDeposit = prompt('Какая сумма заложена?', 100000)
        }
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function() {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода')
        } else if (appData.budgetDay > 300) {
            return ('Средний уровень дохода')
        } else if (appData.budgetDay > 0) {
            return ('Низкий уровень дохода')
        } else {
            return ('Что-то опшло не так')
        }
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value
    }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);


/*2:11if(appData.getTargetMonth() > 0) {

}*/

