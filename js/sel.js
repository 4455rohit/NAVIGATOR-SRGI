var current,destination;

function getCurrentLocation(name){
document.getElementById(name).style.fill="red";

localStorage.setItem("current", name);
window.location.href='../index.html';
}
// else if (l.length==3){
//     showPath()
// }
function getDestinationLocation(name){
    document.getElementById(name).style.fill="green";
    
    localStorage.setItem("destination", name);
    window.location.href='../index.html';
    }
