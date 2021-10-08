const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const defaultInput = `<div class="container">
<div class = "row">
    <input type="text" class="col-10" id="inputText">
    <input type="submit" class="col-2" onclick="search()" value="search">
</div>
</div>`

document.body.innerHTML = defaultInput;
let container = document.querySelector('.container');
let containerRow = document.querySelector('.row');
async function search(){
    try{
    let inputWord = document.getElementById('inputText').value;
    let result = await fetch(url+inputWord);
    let resultJson =  await result.json();
    document.body.innerHTML = defaultInput;
   console.log(resultJson.title);
   if(resultJson.title == "No Definitions Found"){
     displayException(resultJson);

   }
   else {
    resultJson.forEach(element => {
        displayResult(element)
    });
    }
}
catch(Exception) {
    alert(Exception)
} 

}

function displayException(resultJson){
    let containerRow = document.querySelector('.row');
    containerRow.innerHTML = containerRow.innerHTML +
    `<div class = "col-12">${resultJson.title}</div>`
    
    
}

function displayResult(resultJson) {
    let containerRow = document.querySelector('.row');
    containerRow.innerHTML = containerRow.innerHTML +
    `<div class = "col-2">word :</div> <div class = "col-10">${resultJson.word}</div>
    <div class = "col-2">Meaning :</div><div class = "col-10"></div>` + displayMeaning(resultJson.meanings);
    //containerRow.appendChild(divMain);
    console.log(resultJson[0]);
}

function displayMeaning(meaningArray){
    let returnVal = '';
     meaningArray.forEach((e)=>{
        returnVal = returnVal + `<div class="col-2">${e.partOfSpeech}</div>
        <div class="col-10">${e.definitions[0].definition}</div>`
    })
    console.log(returnVal)
    return returnVal;
}

