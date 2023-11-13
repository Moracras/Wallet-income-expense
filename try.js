let inputdate = document.querySelector("#inputdate")
let inputSC = document.querySelector("#inputSC")
let inputA = document.querySelector("#amountCurrency")
let inputbtn = document.querySelector("#inputbtn")
let showSpending = document.querySelector("#showSpending")
let expense = document.querySelector("#expense")
let formClear = document.querySelector("#formClear")
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
const removeData = (index) => {
    data.splice(index, 1);
    addStorage(data);
};
let data = getStorage()  || [] 
const show = () =>{
    showSpending.innerHTML = ""
    let getData = getStorage()
    getData.forEach((item,index) =>{
        const convertedMoney = convertingExchange(exchangeRatesToLira, item.ct, item.ia);
        let row = `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.ioe}</td>
                <td>${item.desc}</td>
                <td>${item.ct}</td>
                <td>${item.ct === "TL" ? "₺" : item.ct === "EURO" ? "€" : item.ct === "USD" ? "$" : item.ct === "GBP" ? "£" : item.ct === "KWD" ? "د.ك" : "🟡"}${item.ia}</td> 
                <td><button class="remove-btn" data-index="${index}" style="background-color: crimson; color: white;">Remove</button></td>
            </tr>
        `;
        showSpending.innerHTML += row;
    })
     writeIncomeExpense()
     const removeButtons = document.querySelectorAll(".remove-btn");
     removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const indexToRemove = e.target.dataset.index;
            removeData(indexToRemove);
            show();
        });
    });
};


const selectedCT= ()=>{
    const selectCT =document.getElementById("selectOptions")
     return selectCT.options[selectCT.selectedIndex].value
}


const selectedIncOrExp = () =>{
    const selectIoE = document.getElementById("selectIoE")
    return selectIoE.options[selectIoE.selectedIndex].value
}
const convertingExchange = (exchangeRatesToLira,currentCT,inputA)=>{   
    if(currentCT =="TL") return  inputA;
    
    return inputA*exchangeRatesToLira[currentCT] 
    // switch (selectedCT){
    //     case 'USD':
    //         return    exchangeRatesToLira['USD']*inputA;
            
    //     case 'EURO':
    //         return   exchangeRatesToLira['EURO']*inputA;

    //     case 'GBP':
    //          return  exchangeRatesToLira['GBP']*inputA;
            
    //     case 'KWD':
    //         return  exchangeRatesToLira['KWD']*inputA;
            
    //     case 'Gold':
    //         return  exchangeRatesToLira['Gold']*inputA;
    //     case 'abc':
        
    //     case 'xyz' :
    //         console.log("xyz");
    //         break    
            
    //     default:
    //         return inputA
    // }
  }
console.log(selectedCT);


const writeIncomeExpense = () => {
    let getData = getStorage();
    let totalIncome = 0
    let totalExpense = 0
    getData.forEach(item => {
        const convertedMoney=convertingExchange(exchangeRatesToLira,item.ct,item.ia)
        if(item.ioe ==="Income"){ 
            totalIncome += parseFloat(convertedMoney)
            
            console.log("total income:"+totalIncome);
            
        }else if (item.ioe ==="Expense"){
            totalExpense += parseFloat(convertedMoney)
            console.log("total expense:"+totalExpense);
        }
    })
    expense.innerText = totalExpense.toFixed(2)
    income.innerText = totalIncome.toFixed(2)
    remain.innerText = (totalIncome - totalExpense).toFixed(2)
    // return getData.map(item => parseInt(item.ia) || 0).reduce((sum, item) => sum + item, 0);
}

//clearing all data
function clearLocalStorage(){
    localStorage.clear();
    
}


inputbtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newData = {
        date: inputdate.value,
        ioe:selectedIncOrExp(),
        desc: inputSC.value,
        ct: selectedCT(),
        ia:inputA.value
    };

    data.push(newData);
    console.log(data);
    addStorage(data);
    formClear.addEventListener("click",clearLocalStorage)
    show();
});

show()

