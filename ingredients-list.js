
  function loadDataFromLocalStorage(){
    return JSON.parse(localStorage.getItem("recipes") )
  }

  var tableBody = $("#recipes")
  console.log (tableBody)

  var data = loadDataFromLocalStorage()
 

for (var i=0; i< data.length; i++){

  var tableRow = $("<tr>")
  tableRow.attr("class", "table-expand-row")
  tableRow.attr("data-open-details", "")

  var td1 = $("<td>").attr("class", "recipeTitle").text(data[i])
  var td2 = $("<td>").html("<i class='fas fa-info-circle fa-lg'></i><span class='expand-icon'></span>")
  tableRow.append(td1, td2)
  tableBody.append(tableRow)
}

$('[data-open-details]').click(function (e) {
  e.preventDefault();
  $(this).next().toggleClass('is-active');
  $(this).toggleClass('is-active');
});




  
  // for (var i = 0; i < response.results.length; i++) {
  //   searchResults.push(response.results[i]);
  // }

  
