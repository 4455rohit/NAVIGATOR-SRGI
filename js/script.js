
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
    

    var gfloor=["room G01","room G02","room G03","room G04","entry Exit","principal","store room","phrmacology lab","central distillation lab","biotech","chemisty lab","waterfilter2","girls washroom","computer lab","engeenering library","communication lab","fluid machine lab","room G05","room G06","boys washroom","staff washroom","cad lab","M.tech hod","civil hod","enviermental eng lab","room G07","highway material lab","basic electical lab","Exam cell","ncc room","sport-room","vk maam","cs hod"];
    var ffloor=["corridor fp","room f01","ce exam cell","zoology lab","physics lab","cetral inst lab","store roomf","boys washroom2f","girls washroomf","mechnical lab","toturial room","room f02","waterffilter1","llb court","room f03","room f04","boys comman room","reading room","boys washroomf","staff washroomf","library srcc","computer lab bsc","room f05","room f06","room f07","room f08","principal srcc","staff01","staff02","phyconology","staff03","staff04","principal law","me hod"];
    if ((gfloor.includes(currentPosition)) && (gfloor.includes(destinationPosition))==true)
        {
            window.location.href = 'templates/ground_floor.html';
        }
    else if((ffloor.includes(currentPosition)) && (ffloor.includes(destinationPosition))==true){
            window.location.href = 'templates/fmap.html';
        }
    else{
            window.location.href = 'templates/bothmap.html';
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