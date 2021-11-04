// API: https://www.openbrewerydb.org/documentation/01-listbreweries

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// ***********************************************************************************


let fetchBrew = (fetch,userCity) => {
 // let userCity = document.getElementById("userCity").value
 let url = 'https://api.openbrewerydb.org/breweries?by_city=' + userCity
 fetch(url)
 .then(response => response.json())
 .then(json => {
     let breweries = json 
     if (breweries == '') {
      console.log('Please enter valid city')
     }
     else {  
      displayBrew(breweries) 
     }
 });
}

let displayBrew = (breweries) => {
 document.getElementById('list').innerHTML = ''
 let ul = document.createElement('ul')
 breweries.forEach(b => {
  let li = document.createElement('li')
  li.classList = "brewList"
  li.innerHTML = `<b>Name:</b> ${b.name} <br> <b>Address:</b> ${b.street} <br> <b>Phone:</b> ${b.phone} <br> <b>Website:</b> ${b.website_url}`
  let heart = document.createElement('img')
  heart.classList = 'unstarred'
  heart.src = "./Star.png" 
  heart.onclick = (e) => {favorite(e)}
  li.appendChild(heart)
  ul.appendChild(li)
 });
 document.getElementById('list').appendChild(ul)
}

let favorite = (e) => {
 if (e.target.classList.contains('unstarred')) {
  e.target.classList.remove('unstarred')
  e.target.classList.add('starred')
  e.target.src = './Starred.png'
 }
 else {
  e.target.classList.remove('starred')
  e.target.classList.add('unstarred')
  e.target.src = "./Star.png" 
 }
}


// ***********************************************************************************


// Tests

if (typeof describe === 'function') {

 describe('fetchBrew()', () => {
   it('Can fetch the right url', () => {
     let fakeFetch = url => {
      assert(
       url === 
       'https://api.openbrewerydb.org/breweries?by_city=Austin'
      )
      return  new Promise(function(resolve) {
      
      })
     }
     fetchBrew(fakeFetch,'Austin')
   });
 });

 describe('fetchBrew()', () => {
  it('parses the response of fetch correctly', () => {
    let fakeFetch = url => {
     return Promise.resolve({
      json: () => Promise.resolve({

      })
     })
    }
    fetchBrew(fakeFetch,'Austin')
  });
});

} 
