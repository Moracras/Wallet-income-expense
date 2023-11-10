let inputdate = document.querySelector("#inputdate")
let inputHM = document.querySelector("#inputHM")
let inputHA = document.querySelector("#inputHA")
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
        <td>${item.ha}</td>
        <td>${item.hm}</td>
        <td>sil</td>
      </tr>
        `
    });
    expense.innerText = getExpense()
}

const getExpense = () => {
    let getData = getStorage();
    return getData.map(item => parseInt(item.hm) || 0).reduce((sum, item) => sum + item, 0);
  }
inputbtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission or button click behavior

    // Create a new object with properties based on input field values
    let newData = {
        date: inputdate.value,
        hm: inputHM.value,
        ha: inputHA.value
    };

    // Add the new object to the data array
    data.push(newData);

    // Log the updated data array to the console
    console.log(data);

    // Call the addStorage function to update storage
    addStorage(data);

    // Call the show function to update the UI
    show();
});



show()
