function search() {
    let input, filter, table, tablerow, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("viewtable");
    tablerow = table.getElementsByTagName("tr");

    for (i = 0; i < tablerow.length; i++) {
        let movie_name = tablerow[i].getElementsByTagName("td")[0];
        let movie_genre = tablerow[i].getElementsByTagName("td")[1]
        let movie_date = tablerow[i].getElementsByTagName("td")[2]
        let movie_status = tablerow[i].getElementsByTagName("td")[3]
        if (movie_name) {
            if (movie_name.textContent.toUpperCase().indexOf(filter) > -1 || movie_genre.textContent.toUpperCase().indexOf(filter) > -1 || movie_date.textContent.toUpperCase().indexOf(filter) > -1 || movie_status.textContent.toUpperCase().indexOf(filter) > -1) {
                tablerow[i].style.display= "";
            }
            else {
                tablerow[i].style.display = "none";
            }
        }
    }
}

function sort(column) {
    let table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("viewtable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("tr");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("td")[column];
        y = rows[i + 1].getElementsByTagName("td")[column];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() || parseInt(x.innerHTML > parseInt(y.innerHTML))){
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() || parseInt(x.innerHTML > parseInt(y.innerHTML))) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        };
      };
    };
};
  
