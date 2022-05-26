// Search and filter function on user's list of movies
function search() {
    // Define variables, grab the search input and table tobe filtered
    let input, filter, table, tablerow, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("viewtable");
    tablerow = table.getElementsByTagName("tr");

    // Loops through all the table rows and compares the input with the table content
    // If they match, keep the row (movie) in table
    // If they do not match, remove the row
    for (i = 0; i < tablerow.length; i++) {
        // Define these variables by grabbing the columns that can be searched: Title, Genre, Date, Status
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
            };
        };
    };
};

// Sort function that when table header is clicked, will sort the column data alphabetically or reversed
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
    // Set default sort direction to "ascending"
    dir = "asc";
    
    // Create a while loop that will continue until no sort switching can be done
    while (switching) {
      // Switching is false on default; loop will not exit
      switching = false;
      rows = table.getElementsByTagName("tr");
      
      // Loops through all the table rows
      for (i = 1; i < rows.length - 1; i++) { 
        shouldSwitch = false;
        
        // Grabs the rows by column clicked
        x = rows[i].getElementsByTagName("td")[column];
        y = rows[i + 1].getElementsByTagName("td")[column];
        let watched = document.getElementsByClassName("watched")
        let unwatched = document.getElementsByClassName("unwatched")
        
        // Compare each row if they should be sorted alphabetically or numerically in ascending order
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() || parseInt(x.innerHTML > parseInt(y.innerHTML)) || watched > unwatched){
            
            // If they do switch, move to next row
            shouldSwitch = true;
            break;
          }

          // Compare each row in descending order
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() || parseInt(x.innerHTML < parseInt(y.innerHTML)) || watched < unwatched) {

            // If they do switch, move to next row
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        // If a switch has been marked, make the switch and mark that a switch has been done
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;

        // Increase switch count by 1 each time a switch occurs
        switchcount++;
      } else {
        // If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        };
      };
    };
};
  
