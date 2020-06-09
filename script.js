let blocks = document.getElementsByClassName('block-dijk')[0];
let addEdge = false;
let cnt = 0;
let visited = [];
let unvisited = [];
let dist;

// It is called when user starts adding edges by clicking on button given
const addEdges = () => {
    addEdge = true; 
    document.getElementById('add-edge-enable').disabled = 'true';
    // Initializing array for adjacency matrix representation
    dist = new Array(cnt+1).fill(Infinity).map(() => new Array(cnt+1).fill(Infinity));
}

// Temporary array to store clicked elements to make an edge between the(max size =2)
let arr = [];

let appendBlock = (x,y)=>{
    // Creating a node
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.top = `${y}px`;
    block.style.left = `${x}px`;
    block.style.transform = `translate(-50%,-50%)`;
    block.id = cnt;

    block.innerText = cnt++;

    // Click event for node
    block.addEventListener('click', (e)=>{
        // Prevent node upon node
        e.stopPropagation() || (window.event.cancelBubble = 'true');

        // If state variable addEdge is false, can't start adding edges
        if(!addEdge) return;

        block.style.backgroundColor = 'coral';
        arr.push(block.id);

        // When two elements are push, draw a edge and empty the array
        if( arr.length === 2 ) {
            drawUsingId(arr);
            arr=[];
        }
    })
    blocks.appendChild(block);
}

// Allow creating nodes on screen by clicking
blocks.addEventListener('click', (e)=>{
    if(addEdge) return;
    if(cnt>12) {
        alert("cannot add more than 12 vertices");
        return;
    }
    appendBlock(e.x,e.y);
})

// Function to draw a line between nodes
const drawLine = (x1,y1,x2,y2,ar) => {
    // Length of line
    const len = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
    const slope = (x2-x1) ? (y2-y1)/(x2-x1) : null;
    
    // Adding length to distance array
    dist[Number(ar[0])][Number(ar[1])] = Math.round(len/10);
    dist[Number(ar[1])][Number(ar[0])] = Math.round(len/10);

    // Drawing line
    const line = document.createElement('div');
    line.id = ar[0]<ar[1] ? `line-${ar[0]}${ar[1]}` : `line-${ar[1]}${ar[0]}`;
    line.classList.add('line');
    line.style.width = `${len}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    let p = document.createElement('p');
    p.innerText = Math.round(len/10);
    line.style.transform = `rotate(${
        (x1>x2) ? Math.PI + Math.atan(slope) : 
        Math.atan(slope)}rad)`;

    p.style.transform = `rotate(-${
        (x1>x2) ? Math.PI + Math.atan(slope) : 
        Math.atan(slope)}rad)`;

    line.append(p);
    blocks.appendChild(line);
    document.getElementById(arr[0]).style.backgroundColor = '#333';
    document.getElementById(arr[1]).style.backgroundColor = '#333';
}

// Function to get (x, y) coordinates of clicked node
const drawUsingId = (ar) => {
    if(ar[0]===ar[1]){
        document.getElementById(arr[0]).style.backgroundColor = '#333';
        arr=[];
        return;
    }
    x1 = Number(document.getElementById(ar[0]).style.left.slice(0,-2));
    y1 = Number(document.getElementById(ar[0]).style.top.slice(0,-2));
    x2 = Number(document.getElementById(ar[1]).style.left.slice(0,-2));
    y2 = Number(document.getElementById(ar[1]).style.top.slice(0,-2));
    drawLine(x1,y1,x2,y2,ar);
}

// Function to find shortest path from given source to all other nodes
const findShortestPath = (source) => {
    let parent = [];
    parent[source] = -1;
    visited = [];
    for(i=0;i<cnt;i++) unvisited.push(i);

    // Array containing cost of reaching i(th) node from source
    let cost = [];
    for(i=0;i<cnt;i++){
        i===source ? null : (dist[source][i] ? cost[i]=dist[source][i] : cost[i]=Infinity );
    }
    cost[source] = 0;

    // Array which will contain final minimum cost
    let minCost=[];
    minCost[source]=0;

    // Repeating until all edges are visited
    while(unvisited.length){
        let mini = cost.indexOf(Math.min(...cost));
        visited.push(mini);
        unvisited.splice(unvisited.indexOf(mini),1);

        // Relaxation of unvisited edges
        for(j of unvisited){
            if(j===mini) continue;
            if(cost[j] > dist[mini][j]+cost[mini]){
                minCost[j] = dist[mini][j]+cost[mini];
                cost[j] = dist[mini][j]+cost[mini];
                parent[j] = mini;
            }else{
                minCost[j] = cost[j];
                // parent[j] = source;
            }
        }
        cost[mini]=Infinity;
    }
    console.log(visited);
    console.log(minCost);
    for(i=0;i<cnt;i++) parent[i]===undefined ? parent[i]=source : null;
    console.log(parent);
    indicatePath(parent,source);
}


const indicatePath = (parentArr,src)=>{
    for(i=0;i<cnt;i++){
        let p = document.createElement('p');
        p.innerText = ("Node " + i + " --> " + src);
        printPath(parentArr, i, p);
    }
}

const printPath = (parent, j, el_p) => {
    if(parent[j]===-1) return;
    printPath(parent, parent[j], el_p);
    el_p.innerText = el_p.innerText + " " + j;

    document.getElementsByClassName('path')[0].style.padding ='1rem';
    document.getElementsByClassName('path')[0].appendChild(el_p);
}