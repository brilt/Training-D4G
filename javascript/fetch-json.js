json = new Array();
basket = new Array();
fetch("data/cleaned-data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((bp) => {
      json[bp.ID] = bp; //assign the id of BP to the BP
      var table_output = document.createElement("article");

      table_output.classList.add("advice");
      table_output.appendChild(
        document.createTextNode(
          ["-"] + bp["Famille Origine"] + "- " + bp["critere"]
        )
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
        basket[table_output.id] = json[table_output.id];
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
        basket[currentBp.id] = json[currentBp.id];
      } else {
        currentBp.addEventListener("click", addPanier);
      }
    }
    function addPanier(ev) {
      if (localStorage.getItem(ev.target.id) === null) {
        localStorage.setItem(ev.target.id, JSON.stringify(ev.target.id));
        basket[ev.target.id] = json[ev.target.id];
      } else {
        localStorage.removeItem(ev.target.id);
        delete basket[ev.target.id];
      }
      document.getElementById(ev.target.id).classList.toggle("BASKET");
    }
  });

function filterBP(filter) {
  var bps = document.querySelectorAll("article");
  document.getElementById("result").style.display = "none";
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

function afficherTableau() {
    
    filterBP("tableau");
    document.getElementById("result").style.display = "table";
  tableau = document.getElementById("result");
  tableau.innerHTML = `<tr>
  <th>Famille Origine</th>
  <th>Critère</th>
  <th>Cycle de Vie</th>
  <th>Acteurs</th>
  <th>Priorité</th>
  <th>Récurrence</th>
</tr>`;
  tableau.classList.toggle("active");
  for (var bp in basket) {
    var row = document.createElement("tr");

    for (element in basket[bp]) {
      if (element != "incontournable" && element != "ID") {
        var cell = document.createElement("td");
        cell.appendChild(document.createTextNode(basket[bp][element]));
        row.appendChild(cell);
      }
    }

    tableau.appendChild(row);
  }
}

function tableToCSV() {
  var csv_data = [];

  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].querySelectorAll("td,th");

    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      csvrow.push(cols[j].innerHTML);
    }

    csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join("\n");
  // Call this function to download csv file
  downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
  CSVFile = new Blob([csv_data], { type: "text/csv" });

  var temp_link = document.createElement("a");

  temp_link.download = "D4G_Training_Bonnes_Pratiques.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
}
