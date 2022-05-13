function search() {
    let input = document.getElementById("searchbar");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("viewtable");
    let tablerow = table.getElementById("table_row_odd");

    for (let i = 0; i < tablerow.length; i++) {
        td = tablerow[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tablerow[i].style.display= "";
            }
            else {
                tablerow[i].style.display = "none";
            }
        }
    }
}
