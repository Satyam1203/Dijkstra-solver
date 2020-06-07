let blocks = document.getElementsByClassName('block-dijk')[0];
let cnt = 0;

let arr = [];

let appendBlock = (x,y)=>{
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.top = `${y}px`;
    block.style.left = `${x}px`;
    block.style.transform = `translate(-50%,-50%)`;
    block.id = cnt;
    block.innerText = cnt++;
    block.addEventListener('click', (e)=>{
        e.stopPropagation() || (window.event.cancelBubble = 'true');
        block.style.backgroundColor = 'coral';
        console.log(block.innerText);
        arr.push(block.id);
        if( arr.length === 2 ) drawUsingId(arr);
    })
    blocks.appendChild(block);
}

blocks.addEventListener('click', (e)=>{
    if(cnt>12) {
        alert("cannot add more than 12 vertices");
        return;
    }
    console.log(e.x,e.y);
    appendBlock(e.x,e.y);
})

const drawLine = (x1,y1,x2,y2) => {
    const len = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
    const slope = (x2-x1) ? (y2-y1)/(x2-x1) : null;
    
    console.log(slope);
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.width = `${len}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${
        (x1>x2) ? Math.PI + Math.atan(slope) : 
        Math.atan(slope)}rad)`;

    blocks.appendChild(line);
    document.getElementById(arr[0]).style.backgroundColor = '#333';
    document.getElementById(arr[1]).style.backgroundColor = '#333';
    arr = [];
}

const drawUsingId = (ar) => {
    x1 = Number(document.getElementById(ar[0]).style.left.slice(0,-2));
    y1 = Number(document.getElementById(ar[0]).style.top.slice(0,-2));
    x2 = Number(document.getElementById(ar[1]).style.left.slice(0,-2));
    y2 = Number(document.getElementById(ar[1]).style.top.slice(0,-2));
    console.table(x1,y1,x2,y2);
    drawLine(x1,y1,x2,y2);
}