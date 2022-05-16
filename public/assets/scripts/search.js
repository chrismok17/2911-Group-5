function search() {
    let input, filter, table, tablerow, tabledata, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("viewtable");
    tablerow = table.getElementsByTagName("tr");

    for (i = 0; i < tablerow.length; i++) {
        tabledata = tablerow[i].getElementsByTagName("td")[0];
        if (tabledata) {
            txtValue = tabledata.textContent || tabledata.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tablerow[i].style.display= "";
            }
            else {
                tablerow[i].style.display = "none";
            }
        }
    }
}
