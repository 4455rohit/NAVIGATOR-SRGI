document.addEventListener('DOMContentLoaded', () => {
    var current = localStorage.getItem("current");  
    var destination = localStorage.getItem("destination"); 
    window.localStorage.clear();
    
    
        document.getElementById(current).style.fill="#FC100D";

    if(destination=="Boys Washroom" ||destination=="Girls Washroom" || destination=="WaterFilter" || destination=="Entry Exit")
    {
        document.getElementById(destination+1).style.fill="#4BB543";
        document.getElementById(destination+2).style.fill="#4BB543";
        return;
    }
    else{
    document.getElementById(destination).style.fill="#4BB543";
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

    graph={

           // Ground floor
        "corridor":{"Exam-cell-p1":1,"stair-0":6},
        "Exam-cell-p1":{"corridor":2,"Exam-cell-p":1,"sprot-room-pl":1,"sport-room-p":1},
        "Exam-cell":{"Exam-cell-p1":1,"principal":1},

        "principal-p":{"Exam-cell-p":1, "room-G-01-p":1},
        "room-G-01-p":{"principal-p":1,"room-G-02-p":1 },
        "room-G-02-p":{"room-G-01-p":1,"room-G-03-p":1},
        "room-G-03-p":{"room-G-02-p":1, "phrmacology-lab-p":1},

        "phrmacology-lab-p2":{"room-G-03-p":1,"phrmacology-lab-p1":1,"phrmacology-lab-p":1,"v-k-ma'am-p":1},
        "phrmacology-lab-p1":{"phrmacology-lab-p2":1,"store-room-p":1},
        "store-room-p":{"phrmacology-lab-p1":1},
        "phrmacology-lab-p":{"phrmacology-lab-p2":1,"central-distillation-lab-p":1},
        "central-distillation-lab-p":{"phrmacology-lab-p":1,"centrl-distillation-lab-pf":1},
        "central-distillation-lab-pf":{"phrmacology-lab-p":1 ,"biotech-p":1,"chemisty-lab-pl":1},

        "biotech-p":{"central-distillation-lab-pf":1,"water2-p":1},
        "water2-p":{"biotech-p":1,"workshop-p":1 },
        "workshop-p":{"water2-p":1},
        "chemistry-lab-pl":{"central-distillation-lab-pf":1,"cs-hod-p1":1},

        "v-k-ma'am-p":{"phrmacology-lab-p2":1 ,"cs-hod-p":1 , "stair-2":6     },
        "cs-hod-p":{"v-k-ma'am-p":1,"cs-hod-p1":1},

        "cs-hod-p1":{"cs-hod-p":1,"chemistry-lab-pl":1,"chemistry-lab-p":1},

        "chemisty-lab-p":{"cs-hod-p1":1,"girls-toilet-p":1,"computer-lab-p":1},
        "girls-toilet-p":{"chemisty-lab-p":1},
        "computer-lab-p":{"chemisty-lab-p":1,"room-G-04-p":1},
        
        "room-G-04-p":{"computer-lab-p":1,"room-G-05-p":1},
        "room-G-05-p":{"room-G04-p":1,"engeenering-library-p1":1},
        "sport-room-p":{"Exam-cell-p1":1,"nss-room-p":1},

        "engeenering-library-p1":{"room-G-05-p":1,"engeenering-library-p":1},
        "engeenering-library-p":{"engeenering-library-p1":1,"engeenering-library-p2":1,"ncc-room-p":1},
        "engeenering-library-p2":{"engeenering-library-p":1,"communication-lab-p":1},
        "ncc-room-p":{"sport-room-p":1,"engeenering-library-p":1},

        "communication-lab-p":{"engeenering-library-p2":1,"fluid-macine-lab-p":1},
        "fluid-macine-lab-p":{"communication-lab-p":1,"room-G-06-p":1},
        "room-G-06-p":{"fluid-macine-lab-p":1,"cad-lab-p1":1},
        "cad-lab-p1":{"room-G-06-p":1,"cad-lab-p":1,"boys-toilet-p":1},
        "boys-toilet-p":{"cad-lab-p1":1,"staff-toilet-p1":1},
        "staff-toilet-p1":{"boys-toilet-p":1},

        "cad-lab-p":{"cad-lab-p1":1,"m.tech-p":1},
        "m.tech-p":{"m.tech-p":1,"civil-hoo-p":1},
        "civil-hoo-p":{"m.tech-p":1,"enviermental-eng-lab-p":1,"stair-1":6},
        "enviermental-eng-lab-p":{"civil-hoo-p":1,"enviermental-eng-lab-p1":1},
        "enviermental-eng-lab-p1":{"enviermental-eng-lab-p":1,"exit-3-p":1,"room-G-07-p":1},
        "exit-3-p":{"enviermental-eng-lab-p1":1},

        "room-G-07-p":{"enviermental-eng-lab-p1":1,"highway-material-lab-p":1},
        "highway-material-p":{"room-G-07-p":1,"basic-electical-lab-p":1},
        "basic-electical-lab-p":{"highway-material-p":1,"sport-room-pl":1},
        "sport-room-pl":{"basic-electical-lab-p":1,"Exam-cell-p1":1},
        


        //First floor
        "corridor-f":{"corridor-f-p":1,"stair-0":6},
        "corridor-f-p":{"corridor-f":1,"corridor-f-p1":1,"staff01-p":1,"staff-p1":1},
        "corridor-f-p1":{"corridor-f-p":1,"room-f-01-p":1},
        "room-f-01-p":{"corridor-f-p1":1,"ce-exam-cell-p":1},
        "ce-exam-cell-p":{"room-f-01-p":1,"zoology-lab-p":1},
        "zoology-lab-p":{"ce-exam-cell-p":1,"physics-lab-p":1},
        "physics-lab-p":{"zoology-lab-p":1,"cetral-instumentation-lab-p":1},

        "cetral-instumentation-lab-p":{"physics-leb-p":1,"cetral-instumentation-lab-p11":1,"stair-2fp":1},
        "cetral-instumentation-lab-p11":{"cetral-instumentation-lab-p":1,"stair-2b2":1},
        "stair-2b2":{"cetral-instumentation-lab-p11":1,"store-room-l2":1},
        "store-room-l2":{"stair-2b2":1,"store-room-fp1":1,"store-room-fp2":1},
        "store-room-fp1":{"store-room-l2":1,"boys-toilet-2f-p1":1},
        "boys-toilet-2f-p1":{"store-room-fp1":1},

        "stair-2fp":{"cetral-instumentation-lab-p":1,"staff-room-04-p":1,"stair-2f":6},
        "staff-room-04-p":{"stair-2fp":1,"staff04-p1":1},

        "store-room-fp2":{"store-room-l2":1,"staff04-p1":1},
        "staff04-p1":{"staff-room-04-p":1,"store-room-fp2":1,"girls-toilet1-fp1":1},
        "girls-toilet1-fp1":{"staff04-p1":1,"girls-toilet-fp":1,"mechnical-lab-p":1},
        "girls-toilet-fp":{"girls-toilet-fp1":1},

        "mechnical-lab-p":{"girls-toilet-fp1":1,"toturial-room-p":1},
        "toturial-room-p":{"mechnical-lab-p":1,"room-f02-p":1},
        "room-fp2-p":{"toturial-room-p":1,"llb-court-pr":1},
        "llb-court-pr":{"room-fp2-p":1,"llb-court-p":1},

        "llb-court-p":{"llb-court-pr":1,"principal-srcc-p":1,"llb-court-pl":1},
        "staff01":{"coridor-f-p":1,"principal-srcc-p":1},

        "principal-srcc-p":{"staff01-p":1,"llb-court-p":1},
        "llb-court-pl":{"llb-court-p":1,"room-f03-p":1},
        
        "room-f03-p":{"llb-court-pl":1,"room-f04":1},
        "room-f04-p":{"room-f03-p":1,"boys-comman-room-p":1},
        "boys-comman-room-p":{"room-f04-p":1,"reading-room-p":1},
        "reading-room-p":{"boys-comman-room-p":1,"srcc-library-p1":1},
        "srcc-library-p1":{"reading-room-p":1,"library-srcc":1,"boys-toilet-f1-p":1},
        "boys-toilet-f1-p":{"srcc-library-p1":1,"staff-toilet-pf1":1},
        "staff-toilet-fp1":{"boys-toilet-f1-p":1},

        "library-srcc-p1":{"srcc-library-p1":1,"stair-1fp":1},
        "stair-1fp":{"library-srcc-p1":1,"me-hod-p":1,"stair-f-1":6},
        "me-hod-p":{"stair-1fp":1,"computer-lab-bsc-p1":1},
        "computer-lab-bsc-p1":{"me-hod-p":1,"room-f05-p":1,"computer-lab-bsc-p2":1},
        "computer-lab-bsc-p2":{"computer-lab-bsc-p1":1},

        "room-f05-p":{"computer-lab-bsc-p1":1,"room=f06-p":1},
        "room=f06-p":{"room-f05-p":1,"room-f07-p":1},
        "room-f07-p":{"room=f06-p":1,"room-f08-p":1},
        "room-f08-p":{"room-f07-p":1,"staff-p1":1},
        "staff-p1":{"room-f08-p":1,"corridor-f-p":1},
        

        //stair
        "stair-f-0":{"corridor-f":6,"stair-0":6},
        "stair-2f":{"stair-2fp":6,"stair-2":6},
        "stair-f-1":{"stair-1fp":6,"stair-1":6},
        "stair-1":{"civil-hoo-p":6,"stair-f-1":6},
        "stair-0":{"corridor":6,"stair-f-0":6},
        "stair-2":{"v-k-ma'am-p":6,"stair-2f":6}


    };
    var allStairs=["Stairs1p","Stairs2p","Stairs3p","Stairs4p"];

    path1=findShortestPath(graph,current+"p", destination+"p");
    console.log(path1)
    console.log(path1.path)
    for(var i=0;i<path1.path.length;i++)
    {
        var cpath=path1.path[i];
        console.log(cpath);
        document.getElementById(path1.path[i]).style.fill="#1668f5";
        // if (allStairs.includes(cpath))
        // {
        //   document.getElementById(cpath+"_2").style.fill="#1668f5";
        // }
    }

});