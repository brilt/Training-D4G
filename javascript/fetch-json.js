json = new Array();
fetch("data/cleaned-data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((bp) => {
      var table_output = document.createElement("article");

      table_output.classList.add("advice");
      table_output.appendChild(
        document.createTextNode(["-"] + bp["Famille Origine"] + "- " + bp["critere"])
      );
      table_output.classList.add(bp["Famille Origine"]);

      table_output.classList.add("add");
      table_output.id = bp["ID"];

      if (bp.hasOwnProperty("incontournable")) {
        table_output.classList.add("incontournable");
        table_output.classList.add("BASKET");
      } else {
        table_output.classList.add("facultatif");
      }

      if (localStorage.getItem(table_output.id) !== null) {
        table_output.classList.toggle("BASKET");
        
      }

      document.getElementById("excel_data").appendChild(table_output);
    });
  })
  .then((res) => {
    bp_add = document.getElementsByClassName("add");

    for (var i = 0; i < bp_add.length; i++) {
      
      currentBp = bp_add[i];
      if (currentBp.classList.contains("incontournable")) {
        localStorage.setItem(currentBp.id, JSON.stringify(currentBp.id));
        currentBp.classList.add("BASKET");
      } else {
        currentBp.addEventListener("click", addPanier);
      }
    }
    function addPanier(ev) {
      if (localStorage.getItem(ev.target.id) === null) {
        localStorage.setItem(ev.target.id, JSON.stringify(ev.target.id));
      } else {
        localStorage.removeItem(ev.target.id);
      }
      document.getElementById(ev.target.id).classList.toggle("BASKET");
    }
  })
/* Ajout ; 
.then((res) => {
  json.forEach((bp) => {

    if (localStorage.getItem(bp["ID"]) === null) {

    }

    function addDetails(ev) {
      if (localStorage.getItem(ev.target.id) === null) {
        details.appendChild(
          document.createTextNode(bp["Priorité"] + " " + bp["acteurs"])
        );
      }
    }
  });
}); /* Ajout */

function filterBP(filter) {
  
  var bps = document.querySelectorAll("article");

  bps.forEach((bp) => {
    bp.style.display = "block";

    if (!bp.classList.contains(filter) && bp.className != "example") {
      bp.style.display = "none";
    }
    if (filter == "ALL") {
      bp.style.display = "block";
    }

  });
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

/* Ajout */
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
  modalContainer.classList.toggle("active")
}


/* Ajout */