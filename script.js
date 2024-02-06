let num = 1;
let col = 1;
let row = 1;

function modifyPoint(point) {
    point.removeAttribute("onclick");
    point.style.width = '30px';
    point.style.height = '30px';
    point.style.backgroundColor = 'red';
    point.innerText = num;
    if (point.id == "above") {
      row ++;
      let id = '' + col + row;
      point.id = id;
      document.getElementById('corner').remove();
    } else if(point.id == "corner") {
      row ++;
      col ++;
      let id = '' + col + row;
      point.id = id;
      document.getElementById('above').remove();

    }
    createPointAbv(point); // Create the initial circle
    createPointCor(point);
    num++;
  }
  
  function createPointAbv(parent) {
    const id = "above";
    const computedStyle = getComputedStyle(parent);
    const parentBottom = parseInt(computedStyle.bottom);
    const parentLeft = parseInt(computedStyle.left);
    console.log(parentBottom);
    const point = document.createElement('div'); 
    point.classList.add('point');
    point.style.bottom = (40 + parentBottom) + 'px';
    point.style.left = (parentLeft) + 'px';
    //point.onclick = () => modifyPoint(point);
    point.id = id;
    point.setAttribute('onclick', 'modifyPoint(this)');
  
    document.body.appendChild(point);
  }

  function createPointCor(parent) {
    const id = "corner";
    const computedStyle = getComputedStyle(parent);
    const parentBottom = parseInt(computedStyle.bottom);
    const parentLeft = parseInt(computedStyle.left);
    console.log(parentBottom);
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.bottom = (40 + parentBottom) + 'px';
    point.style.left = (40 + parentLeft) + 'px';
    //point.onclick = () => modifyPoint(point);
    point.id = id;
    point.setAttribute('onclick', 'modifyPoint(this)');
    
  
    document.body.appendChild(point);
  }
  

  