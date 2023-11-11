let inputdate = document.querySelector("#inputdate")

let inputSC = document.querySelector("#inputSC")

let inputA = document.querySelector("#amountCurrency").value
let inputbtn = document.querySelector("#inputbtn")

let showSpending = document.querySelector("#showSpending")
let expense = document.querySelector("#expense")

const exchangeRatesToLira ={USD:28.55,EURO:30.51,GBP:34.90,KWD:92.09,Gold:1776.88
}





const addStorage = (addData) =>{
    localStorage.spending = JSON.stringify(addData)

}
const getStorage =() =>{
    if (localStorage?.spending){
        return JSON.parse(localStorage?.spending)
    }else {
        return []
    }
    
}
let data = getStorage()  || [] 
const show = () =>{
    showSpending.innerHTML = ""
    let getData = getStorage()
    getData.forEach(item =>{
        showSpending.innerHTML +=`<tr>
        <th scope="row">${item.date}</th>
        <td>${item.ioe}</td>
        <td>${item.desc}</td>
        <td>${item.ct}</td>
        <td>${item.ia}</td>
        <td>Remove</td>
      </tr>
        `
    });
    expense.innerText = getIncomeExpense()
}
const selectedCT= ()=>{
    const selectCT =document.getElementById("selectOptions")
     return selectCT.options[selectCT.selectedIndex].value
}

const selectedIncOrExp = () =>{
    const selectIoE = document.getElementById("selectIoE")
    return selectIoE.options[selectIoE.selectedIndex].value
}
const convertingExchange = (exchangeRatesToLira,selectedCT,inputA)=>{   
    switch (selectedCT){
        case 'USD':
            return    exchangeRatesToLira['USD']*inputA;
            
        case 'EURO':
            return   exchangeRatesToLira['EURO']*inputA;

        case 'GBP':
             return  exchangeRatesToLira['GBP']*inputA;
            
        case 'KWD':
            return  exchangeRatesToLira['KWD']*inputA;
            
        case 'Gold':
            return  exchangeRatesToLira['Gold']*inputA;
            
        default:
            return inputA
    }
  }


const getIncomeExpense = () => {
    let getData = getStorage();
    let totalIncome = 0
    let totalExpense = 0
    getData.forEach(item => {
        if(item.ioe ==="Income"){
            const convertedMoney=convertingExchange(exchangeRatesToLira,item.ct,item.ia)
            totalIncome += parseFloat(convertedMoney)
            console.log(totalIncome);
            
        }else if (item.ioe ==="Expense"){
            const convertedMoney=convertingExchange(exchangeRatesToLira,item.ct,item.ia)
            totalExpense += parseFloat(convertedMoney)
            console.log(totalExpense);
        }
    })
    
    return getData.map(item => parseInt(item.ia) || 0).reduce((sum, item) => sum + item, 0);
}
inputbtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newData = {
        date: inputdate.value,
        ioe:selectedIncOrExp(),
        desc: inputSC.value,
        ct: selectedCT(),
        ia: inputA,
    };

    data.push(newData);
    console.log(data);
    addStorage(data);
    show();
});



show()

