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