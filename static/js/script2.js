
function expand_collapse(id) {
  var e = document.getElementById(id);
  var f = document.getElementById(id+"_arrows");
  var g = document.getElementById(id+"_title");
  if(e.style.display == 'none'){
    e.style.display = 'block';
    f.innerHTML = '&#9650';
    g.style.color = '#bf3132';
  }
  else {
    e.style.display = 'none';
    f.innerHTML = '&#9660';
    g.style.color = '#000000';
  }
}

function mySortFunction() {
  // Declare variables 
  var input, filter, table, tr, td, td2, i, txtValue, txtValue2;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query

for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1)){
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}