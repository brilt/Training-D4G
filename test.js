function LignePanier (code)
{
    this.codeArticle = code;

    this.getCode = function() 
    {
        return this.codeArticle;
    }
}

function Panier()
{
    this.liste = [];
    this.ajouterArticle = function(code)
    { 
        var index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code));
    }
    this.getArticle = function(code)
    {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (code == this.liste[i].getCode()) return none;
        return -1;
    }
    this.supprimerArticle = function(code)
    {
        var index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
}

var button = document.getElementById("button");
var select = document.getElementById("select");
var basket = document.getElementById("basket");
var totalCost = document.getElementById("total-cost");

function addToBasket() {
 var li = document.createElement("li");
 li.innerHTML = select.options[select.selectedIndex].text;
 basket.appendChild(li);

}

document.getElementById("remove-button").onclick = function() {
var list = document.getElementById("basket");
list.removeChild(list.childNodes[0])

}


button.addEventListener("click", addToBasket);



var button = document.getElementById("button");
var select = document.getElementById("select");
var basket = document.getElementById("basket");
var totalCost = document.getElementById("total-cost");

function addToBasket() {
 var li = document.createElement("li");
 li.innerHTML = select.options[select.selectedIndex].text;
 basket.appendChild(li);

}

document.getElementById("remove-button").onclick = function() {
var list = document.getElementById("basket");
list.removeChild(list.childNodes[0])

}


button.addEventListener("click", addToBasket);