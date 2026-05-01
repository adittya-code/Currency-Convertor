const url = "https://api.frankfurter.app/latest?from=USD&to=INR"

const amount = document.querySelector("#id03");
const fromcurr = document.querySelector("#curr");
const tocurr = document.querySelector("#Currency");
const msg = document.querySelector("#id09");
const btn = document.querySelector("#id08");
const dropdowns = document.querySelectorAll("#container select")










for (let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode
        if (select.name === 'from' && currcode === "USD"){
            newOption.selected = 'selected';
        }else if (select.name === "to" && currcode === "INR"){
            newOption.selected = 'selected';
        }
        select.append(newOption)
    }
     select.addEventListener("change" , (evt)=>{
        updateflag(evt.target)
     })

}










const updateExchangeRate = async () =>{
    let amount = document.querySelector("#id03");
    let amountval = amount.value;
    if (amountval === "" || amountval < 1){
        amountval = 1;
        amount.value = "1";
    }

let URL = `https://api.frankfurter.app/latest?from=${fromcurr.value}&to=${tocurr.value}`;
let proxy = "https://corsproxy.io/?";

let response = await fetch(proxy + encodeURIComponent(URL));
    let data = await response.json();
    let rate = data.rates[tocurr.value];

    let finalamt = (amountval * rate)
    msg.innerText = `${amountval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}











const updateflag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}






btn.addEventListener("click" ,(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
})

