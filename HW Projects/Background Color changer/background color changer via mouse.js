document.addEventListener('mousemove', function(e){
    //  console.log(e.pageX, e.pageY);  to test locations
     let r = Math.round(e.pageX * 255 / window.innerWidth);
    let b = Math.round(e.pageY * 255 / window.innerHeight)
    console.log(r,0,b);
    let color = `rgb(${r}, 0, ${b})`;
    document.body.style.backgroundColor = color;
    console.log(color);
  });