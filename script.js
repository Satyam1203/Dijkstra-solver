let blocks = document.getElementsByClassName('block-dijk')[0];
let addEdge = false;
let cnt = 0;
let visited = [];
let unvisited = [];
let dist;

const addEdges = () => {
    addEdge = true; 
    dist = new Array(cnt+1).fill(0).map(() => new Array(cnt+1).fill(0));
    console.table(dist)
}

let arr = [];

let appendBlock = (x,y)=>{
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.top = `${y}px`;
    block.style.left = `${x}px`;
    block.style.transform = `translate(-50%,-50%)`;
    block.id = cnt;
    unvisited.push(cnt);
    block.innerText = cnt++;
    block.addEventListener('click', (e)=>{
        e.stopPropagation() || (window.event.cancelBubble = 'true');
        if(!addEdge) return;
        block.style.backgroundColor = 'coral';
        console.log(e);
        arr.push(block.id);
        if( arr.length === 2 ) drawUsingId(arr);
    })
    blocks.appendChild(block);
}

blocks.addEventListener('click', (e)=>{
    if(addEdge) return;
    if(cnt>12) {
        alert("cannot add more than 12 vertices");
        return;
    }
    console.log(e.x,e.y);
    appendBlock(e.x,e.y);
})

const drawLine = (x1,y1,x2,y2,ar) => {
    const len = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
    const slope = (x2-x1) ? (y2-y1)/(x2-x1) : null;
    
    dist[Number(ar[0])][Number(ar[1])] = Math.round(len/10);
    dist[Number(ar[1])][Number(ar[0])] = Math.round(len/10);
    console.table(dist);
    const line = document.createElement('div');
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
    arr = [];
}

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
    console.table(x1,y1,x2,y2);
    drawLine(x1,y1,x2,y2,ar);
}

const findShortestPath = (source) => {
    let cost = [];
    console.log(dist, source);
    // for(i of dist){
    //     i[0]===source ? cost[i[1]]=i[2] : (i[1]===source ? cost[i[0]]=i[2] : null );
    // }
    for(i=0;i<cnt;i++){
        i===source ? null : (dist[source][i] ? cost[i]=dist[source][i] : cost[i]=Infinity );
    }
    cost[source] = 0;
    console.log(cost);


    // unvisited.splice(unvisited.indexOf(source),1);
    // visited.push(source);
    // cost[source] = Infinity;
    // while(unvisited.length){
    //     let mini = cost.indexOf(Math.min(...cost));
    //     visited.push(mini);
    //     unvisited.splice(unvisited.indexOf(mini),1);
    //     cost[mini]=Infinity;

    //     for(i in dist){
    //         if(i[0]===mini){
    //             cost[mini]=Math.min(i[2], i[0]+cost[i[0]]);
    //         }else if(i[1]===mini){
    //             cost[mini]=Math.min(i[2], i[1]+cost[i[1]]);
    //         }
    //     }
    //     console.table(dist)
    //     console.log(cost)
    // }
}