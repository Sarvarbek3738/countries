const oyquyoshEL = document.querySelector(".oyquyosh")
const body = document.querySelector("body")
const box = document.querySelector(".box")
const inputQidiruv = document.querySelector(".inputQidiruv")
const madal = document.querySelector(".madal")
// =============================================================
const api_link = "https://restcountries.com/v3.1/all";

const getData = async (link) => {
    madal.classList.add("active")
    const req = await fetch(link);
    const data = await req.json()
    console.log(data);
    writeData(data)
    madal.classList.remove("active")

}

const writeData = (DB) => {

    DB.forEach((item) => {
        box.innerHTML += `
        <div  onclick="onecountriy ('${item.name.common}')" class="box1-1">
                       <div class="imgs"> <img src="${item.flags.svg}" alt="${item.name.common}"></div>
                        <div class="text">
                            <h4 class="DavlatNomi" >${item.name.common}</h4>
                            <p>Population: <span class="Population"  >${item.
                population
            }</span></p>
                            <p>Region: <span class="Region"  >${item.
                region
            }</span></p>
                            <p>Capital: <span class="Capital"  >${item.
                capital
            }</span></p>
                        </div>
        </div>
        `
    });
}
getData(api_link)

// =============================================================

var mode = localStorage.getItem("mode") ? localStorage.getItem("mode") : "quyosh";
const oyquyosh = () => {
    if (mode == "temp") {
        body.classList.add("temp")
    } else {
        body.classList.remove("temp")
    }
}
oyquyosh();
oyquyoshEL.addEventListener("click", () => {
    if (mode == "quyosh") {
        mode = "temp"
    } else {
        mode = "quyosh"
    }
    localStorage.setItem("mode", mode)
    oyquyosh()
})

// ==========================================================================================================================

inputQidiruv.addEventListener("input", () => {
    var countiry = document.querySelectorAll(".box1-1")
    countiry.forEach((item) => {
        if (!item.querySelector("h4").textContent.toLowerCase().includes(inputQidiruv.value.toLowerCase())) {
            item.classList.add("hidden")
        } else (
            item.classList.remove("hidden")
        )
    })
})

const select = document.querySelector("select")

select.addEventListener("change", () => {
    var countiry = document.querySelectorAll(".box1-1")
    countiry.forEach((item) => {
        if (select.value != "all") {
            if (!item.querySelector(".Region").textContent.toLowerCase().includes(select.value.toLowerCase())) {
                item.classList.add("hidden")
            } else (
                item.classList.remove("hidden")
            )
        } else {
            item.classList.remove("hidden")
        }
    })

})
const heroModal = document.querySelector(".heroModal")
const block = document.querySelector(".block")
const Exit = document.querySelector(".Exit")
const onecountriy = async (name) => {
    madal.classList.add("active")

    console.log(name);
    const req = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await req.json()
    wreiteModal(data);
    console.log(data);
    madal.classList.remove("active")

    
   

    heroModal.classList.add("Hello")
    Exit.addEventListener(("click"), () => {
        heroModal.classList.remove("Hello")
    })

}
const wreiteModal = (DB)=>{
    DB.forEach((item) =>{
      let keys = Object.keys(item.languages)  
      console.log(keys);
      let Currencies = Object.keys(item.currencies)  
      console.log(Currencies);
      
        block.innerHTML = `
    <div class="blockBox">
                <div class="blockImg">
                    <img src="${item.flags.svg}" alt="">
                </div>
                <div class="blockText ">
                    <div class="left">
                        <h3>${item.name.common}</h3>
                        <p>Native Name: <span>${item.name.common}</span> </p>
                        <p>Population: <span>1${item.
                            population
                            }</span>  </p>
                        <p>Region: <span>${item.region}</span>  </p>
                        <p>Sub Region: <span>${item.subregion
                        }</span>  </p>
                        <p>Capital: <span>${item.capital} </span>  </p>
                        <div class="Countries" ><div><h4>Border Countries: </h4></div> <div><button>France</button><button>Germany</button><button>Netherlands</button></div></div>
                    </div>
                    <div class="right">
                        <p>Top Level Domain: <span> ${item.tld[0]
                        }</span></p>
                        <p>Currencies: <span>${Currencies}</span></p>
                        <p>Languages: <span>${keys}</span></p>
                    </div>
                    
                </div>
                
            </div>
    `
    })
}
