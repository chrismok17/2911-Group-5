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
