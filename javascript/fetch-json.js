json = new Array();
fetch("data/cleaned-data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((bp) => {
      json.push(bp);
      var table_output = document.createElement("article");

      table_output.classList.add("advice");
      table_output.appendChild(
        document.createTextNode(bp["Famille Origine"] + " " + bp["critere"])
      );
      table_output.classList.add(bp["Famille Origine"]);

      table_output.classList.add("add");
      table_output.id = bp["ID"];

      if (bp.hasOwnProperty("incontournable")) {
        table_output.classList.add("incontournable");
        table_output.classList.add("PANIER");
      } else {
        table_output.classList.add("facultatif");
      }

      if (localStorage.getItem(table_output.id) !== null) {
        table_output.classList.toggle("PANIER");
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
        currentBp.classList.add("PANIER");
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
      document.getElementById(ev.target.id).classList.toggle("PANIER");
    }
  }) /* Ajout ; */
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
    bp.style.display = "inline-block";

    if (!bp.classList.contains(filter) && bp.className != "example") {
      bp.style.display = "none";
    }
    if (filter == "ALL") {
      bp.style.display = "inline-block";
    }

  });
}

/* Ajout */
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
  modalContainer.classList.toggle("active")
}


/* Ajout */

/* Ajout
table_output.appendChild(
  document.createTextNode(bp["Priorité"] + " " + bp["acteurs"])
);
/* Ajout */