// DOM Selections
const selects = document.getElementsByTagName('select');
const qinputs = document.getElementsByClassName('currency_quantity');
const address = document.getElementById('base_address');
const display = document.getElementById('displayArea');

// Initial Settings
let rate, rrate;
window.onload = () => {
  giveRate();
  Array.from(selects).map(select => loadLogo(select) )
  Array.from(qinputs).map(inputf => inputf.value = '')
}

function loadLogo(element) {
  giveRate();
  element.parentElement.style.backgroundImage = 'url(./images/'+element.value+'.png)';
  calcPrices(document.getElementById(element.id.slice(0,element.id.indexOf('_')) + '_input'));
}
function giveRate() {
  if (selects[0].value === selects[1].value) { rate = 1; } else {
    let coins = selects[0].value + selects[1].value;
    exchanger.PairPrice(coins).then(info => rate = info);
  }
}
function calcPrices(input) {
  if (!Number.isInteger(Number(input.value))) { return; }
  let which_index = Array.from(qinputs).indexOf(input);
  if (which_index == 0) { rrate = rate; } else { rrate = 1/rate; }
  Array.from(qinputs).find(item => { return item !== input }).value = rrate * input.value;
}

// Event Listeners
Array.from(selects).forEach(select => { select.addEventListener('change',() => { loadLogo(select)   }) })
Array.from(qinputs).forEach(qinput => { qinput.addEventListener('keyup' ,() => { calcPrices(qinput) }) })