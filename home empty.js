

$(document).ready(function() {
  let $table = $("<table></table>");


  // Load any previously added images from local storage
  let addedFilenamesC = JSON.parse(localStorage.getItem("addedFilenamesC")) || [];
  let addedFilenamesO = JSON.parse(localStorage.getItem("addedFilenamesO")) || [];
  let imageOrder = JSON.parse(localStorage.getItem("imageOrder")) || [];

  // Iterate through each image and add it to the table
  for (let i = 0; i < addedFilenamesC.length; i++) {
    let filenameC = addedFilenamesC[i];
    let filenameO = addedFilenamesO[i];

    // Create the table row
    let $row = $("<tr></tr>");

    // Add the filename to the table
    let $textCell = $("<td></td>").text(filenameC + filenameO);
    $row.append($textCell);

    // Add the links to the table
    let linkUrlC = `src/Site1/Accueil.html?linkUrlC=\\${filenameC}`;
    let $linkCellChifa = $("<td></td>").html(`<a href="${linkUrlC}">Go to Page Accueil-C.html</a>`);
    $row.append($linkCellChifa);

    let linkUrlO = `src/Site1/Accueil.html?linkUrlO=\\${filenameO}`;
    let $linkCellOrdonnance = $("<td></td>").html(`<a href="${linkUrlO}">Go to Page Accueil-O.html</a>`);
    $row.append($linkCellOrdonnance);
    // let linkUrl_C_O = `\\src\\Site1\\Accueil.html?linkUrlC=${imageOrder[i]}&linkUrlO=${imageOrder[i+1]}`;

    let linkUrl_C_O = `src/Site1/Accueil.html?linkUrlC=\\${filenameC}&linkUrlO=\\${filenameO}`;
    let $linkCellChifa_Ord = $("<td></td>").html(`<a href="${linkUrl_C_O}">Go to Page Accueil-C-O.html</a>`);
    $row.append($linkCellChifa_Ord);

    // Add the row to the table
    $table.prepend($row);
  }

  // Append the table to the page
  // $("#table-container").append($table);

   let ajax1 = $.get("http://127.0.0.1:5500/ListFilename.txt");
let ajax2 = $.get("http://127.0.0.1:5500/ListFilenameOrdonnance.txt");

// let $table = $("<table></table>");

// Use .when() to wait for both AJAX requests to complete
$.when(ajax1, ajax2).done(function(response1, response2) {
  let addedFilenamesC = JSON.parse(localStorage.getItem("addedFilenamesC")) || [];
  let addedFilenamesO = JSON.parse(localStorage.getItem("addedFilenamesO")) || [];

  // Get the last line from each response
  let lastLineC = response1[0].split("\n").slice(-2, -1)[0];
  let lastLineO = response2[0].split("\n").slice(-2, -1)[0];

  if (!addedFilenamesC.includes(lastLineC) || !addedFilenamesO.includes(lastLineO)) {
    // Add the last image to the added filenames list
    addedFilenamesC.push(lastLineC);
    addedFilenamesO.push(lastLineO);

    localStorage.setItem("addedFilenamesC", JSON.stringify(addedFilenamesC));
    localStorage.setItem("addedFilenamesO", JSON.stringify(addedFilenamesO));

    let $tableRow = $("<tr></tr>");
    let $textCell = $("<td></td>").text(lastLineC + lastLineO);
    let linkUrlC = `src/Site1/Accueil.html?linkUrlC=${lastLineC}`;
    let $linkCellChifa = $("<td></td>").html(`<a href="${linkUrlC}">Go to Page Accueil-C.html</a>`);
    let linkUrlO = `src/Site1/Accueil.html?linkUrlO=${lastLineO}`;
    let $linkCellOrdonnance = $("<td></td>").html(`<a href="${linkUrlO}">Go to Page Accueil-O.html</a>`);
    let linkUrl_C_O = `src/Site1/Accueil.html?linkUrlC=${lastLineC}&linkUrlO=${lastLineO}`;

    

    let $linkCellChifa_Ord = $("<td></td>").html(`<a href="${linkUrl_C_O}">Go to Page Accueil-C-O.html</a>`);
    $tableRow.append($textCell, $linkCellChifa, $linkCellOrdonnance, $linkCellChifa_Ord);
    $table.find("tbody").append($tableRow);
    $table.find("tbody").prepend($tableRow);


    // Store the updated list of added filenames and image order in local storage
    let imageOrder = [];
    for (let i = 0; i < addedFilenamesC.length; i++) {
      imageOrder.push(addedFilenamesC[i]);
      imageOrder.push(addedFilenamesO[i]);

    }
    localStorage.setItem("imageOrder", JSON.stringify(imageOrder));
  } else {
    let imageOrder = JSON.parse(localStorage.getItem("imageOrder")) || [];
    let $tableRows = $table.find("tr");
    for (let i = 0; i < imageOrder.length; i += 2) {
      let indexC = addedFilenamesC.indexOf(imageOrder[i]);
      let indexO = addedFilenamesO.indexOf(imageOrder[i+1]);
      if (indexC >= 0 && indexO >= 0) {
        let $tableRow = $tableRows.eq(indexC);
        let $textCell = $tableRow.find("td").eq(0);
        let $linkCellChifa = $tableRow.find("td").eq(1).find("a");
        let $linkCellOrdonnance = $tableRow.find("td").eq(2).find("a");
        let $linkCellChifa_Ord = $tableRow.find("td").eq(3).find("a");
        let linkUrlC = `\\src\\Site1\\Accueil.html" + "?linkUrlC=" +${'\\'+imageOrder[i]}`;        console.log("io "+ '\\'+imageOrder[i]);



        let linkUrlO = `\\src\\Site1\\Accueil.html" + "?linkUrlO=" +${'\\'+imageOrder[i+1]}`;


        let linkUrl_C_O = `\\src\\Site1\\Accueil.html?linkUrlC=${imageOrder[i]}&linkUrlO=${imageOrder[i+1]}`;
        $textCell.text(imageOrder[i] + imageOrder[i+1]);
        $linkCellChifa.attr("href", linkUrlC);
        $linkCellOrdonnance.attr("href", linkUrlO);
        $linkCellChifa_Ord.attr("href", linkUrl_C_O);
        $tableRow.appendTo($table.find("tbody"));
      } else {
        // RemoII²ve the missing entry from the image order list
        imageOrder.splice(i, 2);
        localStorage.setItem("imageOrder", JSON.stringify(imageOrder));
      }

    }
  }

});

// Append the table to the HTML body
$table.append("<thead><tr><th>Image Paths</th><th>Go Chifa</th><th>Go Ordonnance</th><th>Go Chifa-Ordonnance</th></tr></thead>");
$table.append("<tbody></tbody>");
$("body").append($table);







  })


  
      
// Initialize the page by loading any previously added images from local storage
$(document).ready(function() {
  const addedFilenamesC = JSON.parse(localStorage.getItem("addedFilenamesC")) || [];
  const addedFilenamesO = JSON.parse(localStorage.getItem("addedFilenamesO")) || [];
  const tableData = JSON.parse(localStorage.getItem("tableData"));

  const $table = $("<table></table>");
  for (let i = 0; i < addedFilenamesC.length; i++) {
    const rowDataC = addedFilenamesC[i];
    const rowDataO = addedFilenamesO[i+1];
    const $tableRow = $("<tr></tr>");
    const $textCell = $("<td></td>").text(rowDataC + rowDataO);
    const $linkCellChifa = $("<td></td>").html(`<a href="src/Site1/Accueil.html?id=${rowDataC}">Go to Page Accueil-C.html</a>`);
    const $linkCellOrdonnance = $("<td></td>").html(`<a href="src/Site1/Accueil.html?id=${rowDataO}">Go to Page Accueil-O.html</a>`);
    const $linkCellChifa_Ord = $("<td></td>").html(`<a href="src/Site1/Accueil.html?id=${rowDataO}-${rowDataC}">Go to Page Accueil-C-O.html</a>`);
    // $tableRow.prepend($textCell, $linkCellChifa, $linkCellOrdonnance, $linkCellChifa_Ord);
    $table.append($tableRow);


  }
  $("body").append($table);
});
