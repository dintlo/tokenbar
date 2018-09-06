
window.onscroll = () => {
    const nav = document.querySelector('#main-nav');
    if(this.scrollY <= 500) nav.className = 'navbar navbar-dark navbar-expand-md fixed-top';
     else nav.className = 'navbar navbar-dark navbar-expand-md fixed-top bg-dark';
  };

function exchangeConversion(valNum){
    var price = document.getElementById("tokenPrice").value;
    document.getElementById("currencyAmount").value = valNum / price;
}