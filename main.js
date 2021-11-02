// API: https://www.openbrewerydb.org/documentation/01-listbreweries

let fetchBrew = () => {
 let userCity = document.getElementById("userCity").value
 let url = 'https://api.openbrewerydb.org/breweries?by_city=' + userCity
 fetch(url)
 .then(response => response.json())
 .then(json => {
     let breweries = json 
     if (breweries == '') {
      window.alert('Please enter in a valid city')
     }
     else {  displayBrew(breweries) }
 });
}

let displayBrew = (breweries) => {
 document.getElementById('list').innerHTML = ''
 let ul = document.createElement('ul')
 breweries.forEach(b => {
  let li = document.createElement('li')
  li.classList = "brewList"
  li.innerHTML = `<b>Name:</b> ${b.name} <br> <b>Address:</b> ${b.street} <br> <b>Phone:</b> ${b.phone} <br> <b>Website:</b> ${b.website_url}`
  ul.appendChild(li)
 });
 document.getElementById('list').appendChild(ul)
}

