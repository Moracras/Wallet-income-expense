let inputdate = document.querySelector("#inputdate")

let inputSC = document.querySelector("#inputSC")

let inputA = document.querySelector("#amountCurrency")
let inputbtn = document.querySelector("#inputbtn")

let showSpending = document.querySelector("#showSpending")
let expense = document.querySelector("#expense")






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


const getIncomeExpense = () => {
    let getData = getStorage();
    return getData.map(item => parseInt(item.ia) || 0).reduce((sum, item) => sum + item, 0);
  }
inputbtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    let newData = {
        date: inputdate.value,
        ioe:selectedIncOrExp(),
        desc: inputSC.value,
        ct: selectedCT(),
        ia: inputA.value,
    };

    data.push(newData);
    console.log(data);
    addStorage(data);
    show();
});



show()

