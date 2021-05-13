recoveredCasesEl = document.getElementById('recovered-cases');
populationEl = document.getElementById('population');
confirmedCasesEl = document.getElementById('confirmed-cases');
deathCasesEl = document.getElementById('death-cases');

async function getGlobalCases(){
  const resp = await fetch('https://covid-api.mmediagroup.fr/v1/cases?country=Global');
  const respData = await resp.json();
  recoveredCasesEl.innerText = respData.All.recovered;
  confirmedCasesEl.innerText = respData.All.confirmed;
  deathCasesEl.innerText = respData.All.deaths;
  populationEl.innerText = respData.All.population;
}

getGlobalCases();

async function getGlwobalCases(globalData){
  recoveredCasesEl.innerText = globalData.Global.All.recovered;
  confirmedCasesEl.innerText = globalData.Global.All.confirmed;
  deathCasesEl.innerText = globalData.Global.All.deaths;
  populationEl.innerText = globalData.Global.All.population;
}
async function getCountryCases(globalData, country){


  // recoveredCasesEl.innerText = globalData.Pakistan.All.recovered;
  // confirmedCasesEl.innerText = globalData.Global.All.confirmed;
  // deathCasesEl.innerText = globalData.Global.All.deaths;
  // populationEl.innerText = globalData.Global.All.population;
}
console.log(Array.isArray(svgMapDataGPD))
//Svg MAP
new svgMap({
    targetElementID: 'svgGDP',
    data: svgMapDataGPD,
  });