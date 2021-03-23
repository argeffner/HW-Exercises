// Not sure where to apply the function for it to work

// function hides strings of letters that are not in search bar
function mySearch() {
  let myInput, filtered, ul, li, a, i, txtVal;
  myInput = document.getElementById('myInput');
  filtered = myInput.value.toUpperCase();
  ul = document.getElementById("myList");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtVal = a.textContent || a.innerText;
    if (txtVal.toUpperCase().indexOf(filtered) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}



//  This is for the dropdown toggle button
$(document).ready(function() {
  $(".dropdown-toggle").dropdown();
});