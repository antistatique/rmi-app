
console.log('hello');
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
