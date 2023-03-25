
function colorChange()
{
    var currentPosition = document.getElementById("current").value;
    var destinationPosition = document.getElementById("destination").value;
    if(currentPosition == "")
    {
        alert("Please Select Nearest room-G-0Number.")
        return false;
       
    }
    else if(destinationPosition == "")
    {
        alert("Please Enter Your Destination.")
        return false;
        
    }
    // else if(currentPosition==destinationPosition)
    // {
    //     alert("Current and Destination position cannot be same.")
    // }
    else
    {
    localStorage.setItem("current", currentPosition);
    localStorage.setItem("destination", destinationPosition);
    

    var gfloor=["room-G-01","room-G-02","room-G-03","room-G-04","entry Exit","principal","store-room","phrmacology-lab","central-distillation-lab","biotech","chemist"];
    var ffloor=[];
    if ((gfloor.includes(currentPosition)) && (gfloor.includes(destinationPosition))==true)
        {
            window.location.href = 'templates/ground_floor.html';
        }
    else if((ffloor.includes(currentPosition)) && (ffloor.includes(destinationPosition))==true){
            window.location.href = 'templates/firstFloorMap.html';
        }
    else{
            window.location.href = 'templates/bothMap.html';
        }
    }
   
}


function selectFromMap(){
    window.location.href="selectFromMap"
    document.getElementById
}
document.addEventListener('DOMContentLoaded', () => {
var current = localStorage.getItem("current");  
var destination = localStorage.getItem("destination");
console.log(current,destination);
if (current){
    var crnt=document.getElementById("current");
    // crnt.innerHTML='<option value="'+current+'">current</option>';
    crnt.value=current;
    // console.log(crnt);
}
if (destination){
    var dest=document.getElementById("destination");
    dest.value=destination;
}
});