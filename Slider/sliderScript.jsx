setInterval(function check(){
if (document.getElementById('radio1').checked){
    document.getElementById('radio2').checked = true;
}
else if (document.getElementById('radio2').checked){
    document.getElementById('radio3').checked = true;
}
else if (document.getElementById('radio3').checked){
    document.getElementById('radio4').checked = true;
}
else if (document.getElementById('radio4').checked){
    document.getElementById('radio1').checked = true;
}
else {
    document.getElementById('radio2').checked = true;
}
}, 6000)