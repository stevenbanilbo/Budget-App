const expensesTab = document.querySelector(".tab1");
const incomeTab = document.querySelector(".tab2");
const allTab = document.querySelector(".tab3");
const balance = document.querySelector(".balance .value");
const incomeTotal = document.querySelector(".income-total");
const outcomeTotal = document.querySelector(".outcome-total");
const chart = document.querySelector(".chart");



const expenseList = document.querySelector("#expense .list");
const incomeList = document.querySelector("#income .list");
const allList = document.querySelector("#all .list");



const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.querySelector(".expense-title-input");
const expenseAmount = document.querySelector(".expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.querySelector(".income-title-input");
const incomeAmount = document.querySelector(".income-amount-input");


const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");


element.classList .remove("active");
element.classList .add("add");
element.classList .remove("hide");
element.classList .add("hide");

let ENTRY_LIST = [];


expensesTab.addEventListener("click", function(){
    show(expenseEl);
    hide( [incomeEl, allEl] );
    active( expenseBtn );
    inactive( [incomeBtn, allBtn] );
})
incomeTab.addEventListener("click", function(){
    show(incomeEl);
    hide( [expenseEl, allEl] );
    active( incomeBtn );
    inactive( [expenseBtn, allBtn] );
})
allTab.addEventListener("click", function(){
    show(allEl);
    hide( [incomeEl, expenseEl] );
    active( allBtn );
    inactive( [incomeBtn, expenseBtn] );
})

function show(element){

    element.classList.remove("hide");    
}

function hide(elementsArray){

    elementsArray.foreach(element =>
    {
        element.classList.add("hide");
    });

}

function active(element){

    element.classList.add("active");
}

function inactive(){

    elementsArray.foreach(element=>{

        element.classList.remove("active");

    }) ;
}








addIncome.addEventListener('click', function() {

    if(!incomeTitle.value || !incomeAmount.value)
     return alert('incomplete'); 

    let income = {
            
        type:"income",
        name: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)
    }

    ENTRY_LIST.push(income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);
    

});

addExpense.addEventListener('click', function() {

    if(!expenseTitle.value || !expenseAmount.value)
     return alert('incomplete'); 

    let income = {
            
        type:"expense",
        name: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }

    ENTRY_LIST.push(expense);
    updateUI();
    clearInput([expenseTitle, expenseAmount]);
    

});



function clearInput(inputs){
    inputs.forEach( input => {
        input.value = "";
    })
}


function calculateTotal(income,ENTRY_LIST)
{
    let sum = 0;
    ENTRY_LIST.foreach(entry =>{
        
        if(entry.type == income)
        {
            sum += entry.amount;
        }
        
    });

    return sum;
}

function calculateTotal(type, ENTRY_LIST)
{
    let sum = 0;
    ENTRY_LIST.foreach(entry =>{
        
        if(entry.type == type)
        {
            sum += entry.amount;
        }
        
    });

    return sum;
}


income = calculateTotal("income", ENTRY_LIST);
outcome = calculateTotal("expense", ENTRY_LIST);
balance = calculateBalance(income,outcome);

function calculateBalance(income, outcome){

    return income - outcome;

}


function showEntry(list, type, title, amount, id){

    const entry = `
                    <li id="${id}" class="${type}">
                    <div class="entry"> ${title}: $${amount} </div>
                    <div id="edit"></div>
                    <div id="delete"></div>

                </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);


                }

function updateUI(){

    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = calculateBalance(income,outcome);


    balanceEl.innerHTML = `<small>$</small>${balance}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;

    clearElement([incomeList, expenseList, allList]);

    ENTRY_LIST.foreach(entry =>{
        if(entry.type =="income"){

            showEntry(incomeList, entry.type, entry.title, entry.amount, index);

        } else if(entry.type == "expense")
            {

                showEntry(expenseList, entry.type, entry.title, entry.amount, index);

            }

         showEntry(allList,entry.type, entry.title, entry.amount, index);   
    });
}