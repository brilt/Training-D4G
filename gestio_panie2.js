//lorsque que le js récup les donnée de l'excel, attribuer l'id de la bonne pratique au bouton.
//document.getElementsByTagName("button").addEventListener("click", addPanier);

/*

buttons = document.getElementsByTagName('button'); //récupere tous les boutons de la page
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',addPanier); //ajout d'un eventlistener sur tous les boutons
}
*/





fetch('backup/cleaned-data.xlsx').then(res => { 
    return res.arrayBuffer();
}).then(res => {
    var work_book = XLSX.read(new Uint8Array(res), {
        type: 'array'
    });
    var sheet_name = work_book.SheetNames;

    var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});
    console.log(sheet_data);
    if(sheet_data.length > 0)
    {
       
        for(var row = 0; row < sheet_data.length; row++) //parcours chaque ligne de l'excel
        {
            var table_output = document.createElement("article");
            var categ = document.createElement("div");
            categ.classList.add("category");
            categ.appendChild(document.createTextNode(sheet_data[row][0]));
            table_output.appendChild(categ);

            var planet = document.createElement("div");
            planet.classList.add("rating");
            planet.classList.add("rating_planet");
            var img = document.createElement("img");
            img.src = "images/icon_planet.svg";
            img.alt="Icon planet"
            planet.appendChild(img);
            planet.appendChild(document.createTextNode(sheet_data[row][2]));
            table_output.appendChild(planet);

            var people = document.createElement("div");
            people.classList.add("rating");
            people.classList.add("rating_people");
            var img = document.createElement("img");
            img.src = "images/icon_person.svg";
            img.alt="Icon people"
            people.appendChild(img);
            people.appendChild(document.createTextNode(sheet_data[row][3]));
            table_output.appendChild(people);

            var prosperity = document.createElement("div");
            prosperity.classList.add("rating");
            prosperity.classList.add("rating_prosperity");
            var img = document.createElement("img");
            img.src = "images/icon_clock.svg";
            img.alt="Icon prosperity"
            prosperity.appendChild(img);
            prosperity.appendChild(document.createTextNode(sheet_data[row][4]));
            table_output.appendChild(prosperity);


            var advice = document.createElement("div");
            advice.classList.add("advice");
            advice.appendChild(document.createTextNode(sheet_data[row][5]));
            table_output.appendChild(advice);
            
            var buttonAdd = document.createElement("button");
            buttonAdd.classList.add("add");
            buttonAdd.id = sheet_data[row][1];
            buttonAdd.appendChild(document.createTextNode('0'));
            table_output.appendChild(buttonAdd);

            if(sheet_data[row].hasOwnProperty(6)){
                table_output.classList.add("incontournable");
            }else{
                table_output.classList.add("facultatif");
            }

            document.getElementById('excel_data').appendChild(table_output);
        }

        
    }
}).then(res =>{
    buttons_add = document.getElementsByClassName('add');
    
   
    for (var i = 0; i < buttons_add.length; i++) {
        buttonParent = buttons_add[i].parentElement;
        if(buttonParent.classList.contains("incontournable")){
            
            localStorage.setItem(buttons_add[i].id, JSON.stringify(buttons_add[i].id)); //recupere et stock l'ID du conseil incontournable dans le localStorage
            
        }else{
            buttons_add[i].addEventListener('click',addPanier); //ajout d'un eventlistener sur tous les boutons des bonnes pratiques non incontournable
        }
        
    }
    function addPanier(ev){
        if (localStorage.getItem(ev.target.id)===null){
            localStorage.setItem(ev.target.id, JSON.stringify(ev.target.id)); //recupere et stock l'ID du conseil dans le localStorage
        }else{
            
            localStorage.removeItem(ev.target.id);
    
        }
        document.getElementById(ev.target.id).classList.toggle("changeColor");
        
    }
    
    
    
});





function testCache(){ // at the load of the body, see if the button's ID are stored in the local stoage, if so, we change th color of the button
    for (var i = 0; i < buttons_add.length; i++) {
        if(localStorage.getItem(buttons_add[i].id) !== null){
            buttons_add[i].classList.toggle("changeColor");
        }
    }
}


function filterBP(filter){
    var bps = document.querySelectorAll("article");
    
    bps.forEach(bp =>{
        bp.style.display = "inline-block";
        //console.log(bp)
        var categoryValue = bp.getElementsByClassName("category")[0].innerHTML
        
        if(categoryValue != filter && bp.className != "example"){
            console.log(categoryValue)
            //bp.style.backgroundColor ="red";
            bp.style.display = "none";

        }
        if(filter=="ALL"){
            bp.style.display = "inline-block";
        }

    })
}







/*
darkMode = document.getElementById('darkMode');
function toggleDarkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}


function toggleDarkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}

darkMode.addEventListener('click',toggleDarkMode)
*/






