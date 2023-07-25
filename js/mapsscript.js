document.addEventListener('DOMContentLoaded', () => {
  var current = localStorage.getItem("current");
  var destination = localStorage.getItem("destination");
  window.localStorage.clear();


  document.getElementById(current).style.fill = "#FC100D";

  if (destination == "boys washroom" || destination == "girls washroom" || destination == "waterfilter" || destination == "corridorp") {
    document.getElementById(destination + 1).style.fill = "#4BB543";
    document.getElementById(destination + 2).style.fill = "#4BB543";
    return;
  }
  else {
    document.getElementById(destination).style.fill = "#4BB543";
  }

  let shortestDistanceNode = (distances, visited) => {
    let shortest = null;
    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  };

  let findShortestPath = (graph, startNode, endNode) => {
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
      parents[child] = startNode;
    }
    let visited = [];
    let node = shortestDistanceNode(distances, visited);
    while (node) {
      let distance = distances[node];
      let children = graph[node];
      for (let child in children) {
        if (String(child) === String(startNode)) {
          continue;
        } else {
          let newdistance = distance + children[child];
          if (!distances[child] || distances[child] > newdistance) {
            distances[child] = newdistance;
            parents[child] = node;
          }
        }
      }
      visited.push(node);
      node = shortestDistanceNode(distances, visited);
    }

    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();
    let results = {
      distance: distances[endNode],
      path: shortestPath,
    };
    return results;
  };

  graph = {

    // Ground floor
    "corridorp": { "Exam cellap": 1, "stair0gp": 6},
    "Exam cellap": { "corridorp": 1, "Exam cellp": 1, "sprot roomlp": 1, "sport roomp": 1 },
    "Exam cellp": { "Exam cellap": 1, "principalp": 1 },

    "principalp": { "Exam cellp": 1, "room G01p": 1 },
    "room G01p": { "principalp": 1, "room G02p": 1 },
    "room G02p": { "room G01p": 1, "room G03p": 1 },
    "room G03p": { "room G02p": 1, "phrmacology labbp": 1 },

    "phrmacology labbp": { "room G03p": 1, "phrmacology labap": 1, "phrmacology labp": 1, "vk maamp": 1 },
    "phrmacology labap": { "phrmacology labbp": 1, "store roomp": 1 },
    "store roomp": { "phrmacology labap": 1 },
    "phrmacology labp": { "phrmacology labbp": 1, "central distillation labp": 1 },
    "central distillation labp": { "phrmacology labp": 1, "centrl distillation labap": 1 },
    "central distillation labap": { "central distillation labp": 1, "biotechp": 1, "chemisty lablp": 1 },

    "biotechp": { "central distillation labap": 1, "waterfilter2p": 1 },
    "waterfilter2p": { "biotechp": 1, "workshopp": 1 },
    "workshopp": { "waterfilter2p": 1 },

    "vk maamp": { "phrmacology labbp": 1, "cs hodp": 1,"stair2gp":6},
    "cs hodp": { "vk maamp": 1, "cs hodap": 1 , "stair2gp": 6 },
    "cs hodap": { "cs hodp": 1, "chemisty lablp": 1 ,"chemisty labp":1},
    
    "chemisty lablp": {  "cs hodap": 1,"central distillation labap": 1 },
    "chemisty labp": { "cs hodap": 1, "girls washroomp": 1, "computer labp": 1 },
    "girls washroomp": { "chemisty labp": 1 },
    "computer labp": { "chemisty labp": 1, "room G04p": 1 },

    "room G04p": { "computer labp": 1, "room G05p": 1 },
    "room G05p": { "room G04p": 1, "engeenering librarybp": 1 },

    "engeenering librarybp": { "room G05p": 1, "engeenering libraryp": 1 },
    "engeenering libraryp": { "engeenering librarybp": 1, "engeeneringlibraryap": 1, "ncc room p": 1 },
    "engeeneringlibraryap": { "engeenering libraryp": 1, "communication labp": 1 },
    "sport roomp": { "Exam cellp": 1, "ncc roomp": 1 },
    "ncc roomp": { "sport roomp": 1, "engeenering libraryp": 1 },

    "communication labp": { "engeeneringlibraryap": 1, "fluid macine labp": 1 },
    "fluid macine labp": { "communication labp": 1, "room G06p": 1 },
    "room G06p": { "fluid macine labp": 1, "cad labap": 1 },
    "cad labap": { "room G06p": 1, "cad labp": 1, "boys washroomp": 1 },
    "boys washroomp": { "cad labap": 1, "staff washroomp": 1 },
    "staff washroomp": { "boys washroomp": 1 },
    "cad labp": { "cad labap": 1, "m.tech hodp": 1 },
    "m.tech hodp": { "cad labp": 1, "civil hodp": 1 },
    "civil hodp": { "m.tech hodp": 1, "enviermental eng labp": 1 , "stair 1": 6},
    
    "enviermental eng labp": { "civil hodp": 1, "enviermental eng labap": 1 },
    "enviermental eng labap": { "enviermental eng labp": 1, "exit3p": 1, "room G 07p": 1 },
    "exit3p": { "enviermental eng labap": 1 },
    "room G07p": { "enviermental eng labap": 1,"highway material labp": 1 },
    "highway material labp": { "room G07p": 1,"basic electical labp": 1 },
    "basic electical labp": {  "highway material labp": 1,"sport roomlp": 1 },

    "sport roomlp": {  "Exam cellap": 1,"basic electical labp": 1 },
    

   



    //First floor
    "corridor fp": { "corridor fbp": 1, "stairf0p": 6 },
    "corridor fbp": { "corridor fp": 1, "corridor fap": 1, "staff01p": 1, "staffap": 1 },
    "corridor fap": { "corridor fbp": 1, "room f01p": 1 },
    "room f01p": { "corridor fap": 1, "ce exam cellp": 1 },
    "ce exam cellp": { "room f01p": 1, "zoology labp": 1 },
    "zoology labp": { "ce exam cellp": 1, "physics labp": 1 },
    "physics labp": { "zoology labp": 1, "cetral inst labp": 1 },

    "cetral inst labp": { "physics labp": 1, "cetral inst labbp": 1, "to stair2fp": 1 },
    "cetral inst labbp": { "cetral inst labp": 1, "stair2bp": 1 },
    "stair2bp": { "cetral inst labbp": 1, "store roomlbp": 1 },
    "store roomlbp": { "stair2bp": 1, "store roomfap": 1, "store roomfbp": 1 },
    "store roomfap": { "store roomlbp": 1, "boys washroomfp": 1 },
    "boys washroom2fap": { "store roomfap": 1 },

    "to stair2fp": { "cetral inst lab p": 1, "staff04 p": 1, "stair2fp": 6 },
    "staff04p": { "to stair2fp": 1, "staff04ap": 1 },

    "store roomfbp": { "store roomlbp": 1, "staff04ap": 1 },
    "staff04ap": { "staff04p": 1, "store roomfbp2": 1, "girls waashroomfap": 1 },
    "girls washroomfap": { "staff04ap": 1, "girls washroomfp": 1, "mechnical labp": 1 },
    "girls washroomfp": { "girls washroomfap": 1 },

    "mechnical labp": { "girls washroomfap": 1, "toturial roomp": 1 },
    "toturial roomp": { "mechnical labp": 1, "room f02p": 1 },
    "room f02p": { "toturial roomp": 1, "llb courtbp": 1 },
    "llb courtbp": { "room f02p": 1, "llb courtp": 1 },

    "llb courtp": { "llb courtbp": 1, "principal srccp": 1, "llb courtap": 1 },
    "staff01p": { "coridor fbp": 1, "principal srccp": 1 },

    "principal srccp": { "staff01p": 1, "llb courtp": 1 },
    "llb courtap": { "llb courtp": 1, "room f03p": 1 },

    "room f03p": { "llb courtap": 1, "room f04p": 1 },
    "room f04p": { "room f03p": 1, "boys comman roomp": 1 },
    "boys comman roomp": { "room f04p": 1, "reading roomp": 1 },
    "reading roomp": { "boys comman roomp": 1, "srcc libraryap": 1 },
    "srcc libraryap": { "reading roomp": 1, "srcc librarybp": 1, "boys washroomfap": 1 },
    "boys washroomfap": { "srcc libraryap": 1, "staff washroomfap": 1 },
    "staff washroomfap": { "boys washroomfap": 1 },

    "library srccbp": { "srcc libraryap": 1, "to stair1fp": 1 },
    "to  stair1fp": { "library srccbp": 1, "me hodp": 1, "stair1fp": 6 },
    "me hodp": { "to stair1fp": 1, "computer lab bscdp": 1 },
    "computer lab bscdp":{"me hodp":1,"computer lab bscap":1},
    "computer lab bscap": { "computer lab bsadp": 1, "room f05p": 1, "computer lab bscbp": 1 },
    "computer lab bscbp": { "computer lab bscap": 1 },

    "room f05p": { "computer lab bscap": 1, "room f06p": 1 },
    "room f06p": { "room f05p": 1, "room f07p": 1 },
    "room f07 p": { "room f06 p": 1, "room f08p": 1 },
    "room f08 p": { "room f07p": 1, "staffap": 1 },
    "staffap": {  "corridor fap": 1,"room f08p": 1 },


    //stair
    "stair1gp": { "civil hodp": 6, "stair1fp": 6 },
    "stair0gp": { "corridorp": 6, "stair0fp": 6 },
    "stair2gp": { "vk maamp": 6, "stair2fp": 6 },
    "stair0fp": {  "stair0gp": 6,"to stair0fp": 6 },
    "stair2fp": {  "stair2gp": 6,"to stair2fp": 6 },
    "stair1fp": {  "stair1gp": 6,"to stair1fp": 6 }
  


  };
  var allStairs = ["Stair0gp", "Stair1gp", "Stair2gp"];

  path1 = findShortestPath(graph, current + "p", destination + "p");
  console.log(path1)
  console.log(path1.path)
  for (var i = 0; i < path1.path.length; i++) {
    var cpath = path1.path[i];
    console.log(cpath);
    document.getElementById(path1.path[i]).style.fill = "#1668f5";
    // if (allStairs.includes(cpath))
    // {
    //   document.getElementById(cpath+"_2").style.fill="#1668f5";
    // }
  }

});