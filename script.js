const amount = document.querySelector("#id03");
const fromcurr = document.querySelector("#curr");
const tocurr = document.querySelector("#Currency");
const msg = document.querySelector("#id09");
const btn = document.querySelector("#id08");
const dropdowns = document.querySelectorAll("#container select");

// Populate dropdowns
for (let select of dropdowns){
    for (let currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;

        if (select.name === 'from' && currcode === "USD"){
            newOption.selected = 'selected';
        } else if (select.name === "to" && currcode === "INR"){
            newOption.selected = 'selected';
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    });
}

//Function
const updateExchangeRate = async () =>{
    try {
        let amountval = amount.value;

        if (amountval === "" || amountval < 1){
            amountval = 1;
            amount.value = "1";
        }

        
        let URL = `https://open.er-api.com/v6/latest/${fromcurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data.rates[tocurr.value];
        let finalamt = amountval * rate;

        msg.innerText = `${amountval} ${fromcurr.value} = ${finalamt.toFixed(2)} ${tocurr.value}`;
    } catch (err) {
        console.error(err);
        msg.innerText = "❌ Failed to fetch exchange rate";
    }
};

// Update flag
const updateflag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

// Button click
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

