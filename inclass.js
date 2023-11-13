// selectors 

const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input")
const ekleFormu = document.getElementById("ekle-formu")
// variables 

let gelirler = 0;
let harcamaListesi = [];

// hesap tablosu 

const gelirinizTd =document.getElementById("geliriniz")
const giderinizTd =document.getElementById("gideriniz")
const kalanTd =document.getElementById("kalan")
const kalanTh =document.getElementById("kalanTh")
// const kalanTh = 


// harcama formu 
const harcamaFormu = document.getElementById("harcama-formu")
const harcamaAlaniInput = document.getElementById("harcama-alani")
const tarihInput = document.getElementById("tarih")
const miktarInput = document.getElementById("miktar")

// harcama tablosu 
const harcamaBody = document.getElementById("harcama-body")
const temizleBtn = document.getElementById("temizle-btn")

// Ekle formu

ekleBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    gelirler = gelirler + Number(gelirInput.value)
    localStorage.setItem("gelirler", gelirler)
    gelirinizTd.innerText = gelirler
    ekleFormu.reset()
})

window.addEventListener("load",()=>{
    gelirler = Number(localStorage.getItem("gelirler")) || 0
    gelirinizTd.innerText = gelirler
    tarihInput.valueAsDate = new Date()
    harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || []

    harcamaListesi.forEach((harcama) => harcamayiDomaYaz(harcama))
    hesaplaVeGuncelle()
})

harcamaFormu.addEventListener("submit", (e) =>{
    e.preventDefault() //reload u engeller

    const yeniHarcama = {
        id: new Date().getTime(),
        // tarih: tarihInput.value,
        tarih: new Date() (tarihInput.value).toLocaleDateString(),
        alan: harcamaAlaniInput.value,
        miktar: miktarInput.value
    }

    // console.log(yeniHarcama);
    harcamaFormu.reset()
    tarihInput.valueAsDate = new Date()

    harcamaListesi.push(yeniHarcama)
    localStorage.setItem("harcamalar",JSON.stringify(harcamaListesi)),
    harcamayiDomaYaz(yeniHarcama)
})
// harcamayı doma yaz 

const harcamayiDomaYaz = ({id, miktar, tarih,alan}) =>{

    // const{id, miktar, tarih,alan} = yeniHarcama
// 1.yöntem 
    // harcamaBody.innerHTML += `
    // <tr>
    // <td>${tarih}</td>
    // <td>${alan}</td>
    // <td>${miktar}</td>
    // <td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
    
    // </tr>
    // `
// 2.yöntem 

 const tr = document.createElement("tr")
 const appendTd =(content) =>{
    const td = document.createElement("td");
    td.textContent = content
    return td;
 }
 const createLastTd =() =>{
    const td = document.createElement("td");
    const iElement = document.createElement("i");
    iElement.id = id;
    iElement.className ="fa-solid fa-trash-can text-danger"
    iElement.type ="button";
    td.appendChild(iElement)
    return td;
 }

 tr.append(
    appendTd(tarih),
    appendTd(alan),
    appendTd(miktar),
    createLastTd()
 )


 harcamaBody.append(tr)
}

const hesaplaVeGuncelle = () =>{
    // gelirinizTd.innerText = gelirler //geliri ekrana yaz
    gelirinizTd.innerText = new Intl.NumberFormat().format(gelirler) // geliri ekrana yaz

    //giderler toplamı
    const giderler = harcamaListesi.reduce(
        (toplam, harcama) => toplam + Number(harcama.miktar),0
    )
    giderinizTd.innerText = new Intl.NumberFormat().format(giderler) //giderler toplamı ekrana yazdırır
    kalanTd.innerText = new Intl.NumberFormat().format(gelirler - giderler)

    const borclu = gelirler - giderler < 0;

    kalanTd.classList.toggle('text-danger',borclu)
    kalanTh.classList.toggle('text-danger', borclu)
}

harcamaBody.addEventListener("click",(e) =>{
    console.log(e.target);

    if (e.target.classList.contains("fa-trash-can")){
        e.target.parentElement.parentElement.remove()

    }
    const id =e.target.id
// silinen harcmayı arrayden cıkarır
    harcamaListesi = harcamaListesi.filter((harcama => harcama.id != id))

    // yeni arrayi locale update eder 
    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))
    
    // silinidkten sonra yeniden hesapla
    hesaplaVeGuncelle()
})

temizleBtn.addEventListener("click", ()=>{
    if(confirm("Silmek istediğinize emin misiniz?")){
        harcamaListesi = [] // tüm harcamaları listeden siler
        gelirler = 0 // geliri sıfırlar
        localStorage.clear() // tüm local storage siler
        localStorage.removeItem('gelirler')//sadece gelirleri siler
        localStorage.removeItem('harcamalar')// sadece giderleri siler
        harcamaBody.innerHTML ="" // Dom dan harcamaları siler
        hesaplaVeGuncelle()
    }
})