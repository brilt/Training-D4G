//lorsque que le js récup les donnée de l'excel, attribuer l'id de la bonne pratique au bouton.
//document.getElementsByTagName("button").addEventListener("click", addPanier);

/*

buttons = document.getElementsByTagName('button'); //récupere tous les boutons de la page
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',addPanier); //ajout d'un eventlistener sur tous les boutons
}
*/





fetch('cleaned-data.xlsx').then(res => { 
    return res.arrayBuffer();
}).then(res => {
    console.log('file:', res);
    var work_book = XLSX.read(new Uint8Array(res), {
        type: 'array'
    });
    var sheet_name = work_book.SheetNames;

    var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});

    if(sheet_data.length > 0)
    {
        var table_output;
        for(var row = 0; row < sheet_data.length; row++) //parcours chaque ligne de l'excel
        {
            if(sheet_data[row][2] !=null){
                table_output+= '<article>';

                for(var cell = 0; cell < sheet_data[row].length; cell++)
                {

                    

                    

                    
                        switch (cell) {
                            case 0:
                                table_output += '<div class="category"><p>'+" "+sheet_data[row][cell]+" "+'</p></div>';
                                break;
                            case 2:
                                table_output += '<div class="rating rating_planet"><img src="../images/icon_planet.svg" alt="Icon planet"><p>'+sheet_data[row][cell]+'</p></div>';
                                break;
                            case 3:
                                table_output +='<div class="rating rating_people"><img src="../images/icon_person.svg" alt="Icon people"><p>'+sheet_data[row][cell]+'</p></div>';
                                break;
                            case 4:
                                table_output +='<div class="rating rating_prosperity"><img src="../images/icon_clock.svg" alt="Icon prosperity"><p>'+sheet_data[row][cell]+'</p></div>';
                                break;
                            case 5:
                                table_output += '<div class="advice"><p>'+" "+sheet_data[row][cell]+" "+'</p></div>';
                                break;
                            
                            default:
                                break;
                        }
                    
                    
                }
                table_output += '<button id='+ sheet_data[row][1] +' class="add">0</button>';
                table_output += '</article>';
            }

        }

        document.getElementById('excel_data').innerHTML = table_output;
    }
}).then(res =>{
    buttons_add = document.getElementsByClassName('add');
   
    for (var i = 0; i < buttons_add.length; i++) {
        console.log(buttons_add[i]);
        buttons_add[i].onload = function() {console.log("hi");};
        buttons_add[i].addEventListener('click',addPanier); //ajout d'un eventlistener sur tous les boutons add
    }
    function addPanier(ev){
        console.log(ev.target.id);
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






