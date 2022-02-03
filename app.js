'Use strict'

let start = document.getElementById('start');
let btnplus1 = document.getElementsByTagName('button')[0]
let btnplus2 = document.getElementsByTagName('button')[1]
let depositCheck = document.querySelector('.deposit-checkmark')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item')[0]
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
let expensesAmount = document.querySelector('.expenses-amount')
let expensesItem = document.querySelector('.additional_expenses-item')
let targetAmount = document.querySelector('.target-amount')
let periodSelect = document.querySelector('.period-select')

let money

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0, 
    income: {},
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    start: function () {
        do {
            money = prompt('Ваш месячный доход?', 50000);
        }
        while (isNan(money) || money === '' || money === null)
    },
    asking: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой?', 'Фриланс')
            let cashIncome = prompt('Сколько в месяц зарабатываешь на этом?', 10000)
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы через запятую', 'Кола,фрукты,бензин')
        appData.addExpenses = addExpenses.toLowerCase().split(',');

        for (let i = 0; i < 2; i++) {
            let itemExpenses = prompt('Введете обязательную статью расходов?', 'Садик государственный')
            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 2500)
            }
            while (isNan(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;
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
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function() {
        return appData.mission / appData.budgetMonth;
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
        return appData.budgetMonth * appData.period
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('расходы за месяц: ' + appData.expensesMonth);
