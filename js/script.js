let request = new XMLHttpRequest();
request.open('GET', './js/data.json');
request.responseType = 'json';
request.send();

request.onload = function () {
  let values = request.response;
  createGraphics(values);
}

let week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function createGraphics(values) {

  //TOTAL
  let total = 0;
  for (let value of values)
    total += value.amount;
  
  document.querySelector('#total').innerHTML = '$' + total.toFixed(2);

  //GRAPHIC 
  let p = document.querySelectorAll('.col');

  for (let i = 0; i < values.length; i++) {
    let amount = values[i].amount;
    let porc = amount * 100 / total;
    let px = Math.floor(porc * 600 / 100);
    
    let col = document.querySelector('#' + values[i].day);
    col.setAttribute('onmouseover', 'Show(this, true)');
    col.setAttribute('onmouseout', 'Show(this, false)');
    col.setAttribute('onclick', 'ShowClick(this)');
    col.style.height = px + 'px';

    //SHOW VALUE
    p[i].innerHTML += `<p style="bottom:${px}px">$${amount}</p>`
  }

  //WEEK CURRENT
  let weekId = new Date();
  weekId = weekId.getDay();

  document.querySelector('#' + week[weekId]).classList += 'current';
}

//SHOW
function Show(element, bool) {
  let p = document.querySelectorAll('.col p');

  let pos = week.indexOf(element.id);

  if(bool)
    p[pos].style.opacity = 1;
  else
    p[pos].style.opacity = 0;
}

// SHOW CLICK
function ShowClick(element) {
  element.style.opacity = 1;
}