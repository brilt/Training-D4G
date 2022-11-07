//lorsque que le js récup les donnée de l'excel, attribuer l'id de la bonne pratique au bouton.
//document.getElementsByTagName("button").addEventListener("click", addPanier);

/*

buttons = document.getElementsByTagName('button'); //récupere tous les boutons de la page
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',addPanier); //ajout d'un eventlistener sur tous les boutons
}
*/


buttons_add = document.getElementsByClassName('add');
for (var i = 0; i < buttons_add.length; i++) {
    buttons_add[i].addEventListener('click',addPanier); //ajout d'un eventlistener sur tous les boutons add
}

function addPanier(ev){

    if (localStorage.getItem(ev.target.id)===null){
        localStorage.setItem(ev.target.id, JSON.stringify(ev.target.id)); //recupere et stock l'ID du conseil dans le localStorage
        //document.getElementById("demo").innerHTML = "ITEM ADDED";
        document.getElementById(ev.target.id).style.color = "red";
        document.getElementById(ev.target.id).innerHTML = "Delete";
    }else{
        document.getElementById(ev.target.id).style.color = "blue";
        document.getElementById(ev.target.id).innerHTML = "Add";
        localStorage.removeItem(ev.target.id);

    }

    //document.getElementById('body').style.backgroundColor = "white";
    
    //document.body.style.backgroundColor = "red";
    //ev.style.display = "none"
    
    //alert(ev.target.id);
}

document.getElementById('clickme').addEventListener('click',display)
function display(){
    //document.getElementById('body').style.backgroundColor = "blue";
    Object.keys(localStorage).forEach(function(key){ //boucler dans le local storage
        console.log(localStorage.getItem(key));
        document.getElementById('disp').innerHTML += localStorage.getItem(key);
     });
}
/*const button = document.getElementByTagName('button');
button.addEventListener("click",(event) => {
    

});*/







