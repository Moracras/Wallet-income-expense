// selectors 

const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input")
const ekleFormu = document.getElementById("ekle-formu")
// variables 

let gelirler = 0; //gelir girişlerini tutacak olan değişken
let harcamaListesi = []; //harcama objelerimizi tutacak olan array


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

ekleFormu.addEventListener("submit", (e) =>{
    e.preventDefault()
    gelirler = gelirler + Number(gelirInput.value)
    localStorage.setItem("gelirler", gelirler)
    gelirinizTd.innerText = gelirler
    ekleFormu.reset()
    hesaplaVeGuncelle()
})
// Sayfa ilk açıldığında localStorage de bulunan verileri ekrana yazdırır, değişkenlere atama yapar
window.addEventListener("load",()=>{
    gelirler = Number(localStorage.getItem("gelirler")) || 0
    gelirinizTd.innerText = gelirler
    tarihInput.valueAsDate = new Date()
    harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || []

    harcamaListesi.forEach((harcama) => harcamayiDomaYaz(harcama))
    hesaplaVeGuncelle()
})
// Harcama girişlerinin yapılması
harcamaFormu.addEventListener("submit", (e) =>{
    e.preventDefault() //reload u engeller

    const yeniHarcama = {
        id: new Date().getTime(),
        // tarih: tarihInput.value,
        tarih: new Date(tarihInput.value).toLocaleDateString(),
        alan: harcamaAlaniInput.value,
        miktar: miktarInput.value
    }

    // console.log(yeniHarcama);
    harcamaFormu.reset()
    tarihInput.valueAsDate = new Date()

    harcamaListesi.push(yeniHarcama)
    localStorage.setItem("harcamalar",JSON.stringify(harcamaListesi)),
    harcamayiDomaYaz(yeniHarcama)
    hesaplaVeGuncelle()
})
// harcamayı doma yaz 

const harcamayiDomaYaz = ({id, miktar, tarih,alan}) =>{

    // const{id, miktar, tarih,alan} = yeniHarcama
// 1.yöntem  //innerHTML ile
    // harcamaBody.innerHTML += `
    // <tr>
    // <td>${tarih}</td>
    // <td>${alan}</td>
    // <td>${miktar}</td>
    // <td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
    
    // </tr>
    // `
// 2.yöntem  // create element yöntemi ile

 const tr = document.createElement("tr")
  // tr elementinin ilk üç td sini oluşturur.
 const appendTd =(content) =>{
    const td = document.createElement("td");
    td.textContent = content
    return td;
 }
 // tr elementinin son td sini oluşturur.
 const createLastTd =() =>{
    const td = document.createElement("td");
    const iElement = document.createElement("i");
    iElement.id = id;
    iElement.className ="fa-solid fa-trash-can text-danger"
    iElement.type ="button";
    td.appendChild(iElement)
    return td;
 }
 // td oluşturarak tr ye ekleme
 tr.append(
    appendTd(tarih),
    appendTd(alan),
    appendTd(miktar),
    createLastTd()
 )


 harcamaBody.append(tr)// harcamayı sona ekler
 // harcamaBody.prepend(tr) // harcamayı öne ekler

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
// Kalan 0 dan küçükse kalan ve miktarı kırmızı yaz
    const borclu = gelirler - giderler < 0;

    kalanTd.classList.toggle('text-danger',borclu)
    kalanTh.classList.toggle('text-danger', borclu)
}

harcamaBody.addEventListener("click",(e) =>{
    console.log(e.target);

    if (e.target.classList.contains("fa-trash-can")){
        e.target.parentElement.parentElement.remove()

    }
      //silinen harcamanın id sini alır
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
        // localStorage.clear() // tüm local storage siler
        localStorage.removeItem('gelirler')//sadece gelirleri siler
        localStorage.removeItem('harcamalar')// sadece giderleri siler
        harcamaBody.innerHTML ="" // Dom dan harcamaları siler
        hesaplaVeGuncelle() //silindikten sonra yeniden hesapla
    }
})


