let l1 = 0;
let l2 = 0;
let m1 = 0;
let m2 = 0;
let a1 = 0;
let a2 = 0;
let v1 = 0;
let v2 = 0;
let dt = 0;
let g = 9.8;
let dl1 = 0;
let dl2 = 0;
let a1_a = 0;
let a2_a = 0;

function initializeComponents() {
  const inputs = [...document.querySelectorAll('input')];
   l1 = inputs[2].value;
   l2 = inputs[6].value;
   m1 = inputs[1].value;
   m2 = inputs[5].value;
   a1 = inputs[4].value * Math.PI / 180;
   a2 = inputs[8].value * Math.PI / 180;
   v1 = inputs[3].value;
   v2 = inputs[7].value;
   dt = inputs[0].value;
   if(isNaN(l1) || isNaN(l2) || isNaN(m2) || isNaN(m1) || isNaN(v2) || isNaN(v1) || isNaN(a2) || isNaN(a1) || isNaN(dt)){
       alert("Вы заполнили неправильно поля для ввода данных!!!");
   }
}

function accel_calculation() {
  let sin1 = Math.sin(a1);
  let sin2 = Math.sin(a2);
  let sin12 =Math.sin(a2 - a1);
  let cos12 =Math.cos(a2 - a1);

   a1_a = (m2 * l1 * v1 * v1 * sin12 * cos12 + m2 * g * sin2 * cos12 + m2 * l2 * v2 * v2 * sin12 - (m1+m2) * g * sin1) / ((m1+m2) * l1 - m2 * l1 * cos12 * cos12);
   a2_a = (-m2 * l2 * v2 * v2 * sin12 * cos12 + (m1 + m2) * g * sin1 * cos12 - (m1 + m2) * l1 * v1 * v1 * sin12 - (m1 + m2) * g * sin2) / ((l2 / l1) * ((m1 + m2) * l1 - m2 * l1 * cos12 * cos12));
}
function start_button() {
  initializeComponents();

  if(l1>l2){
    let scale = l2/l1;
    dl2 = 250 * scale;
  }
  else if(l1<l2){
    let scale = l1/l2;
    dl1 = 250 * scale;
  }
  else dl1 = dl2 = 250;
  draw();
}

function draw() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
    let x_offset = canvas.offsetWidth / 2;
    let y_offset = canvas.offsetHeight / 8;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00FFFF";
    ctx.moveTo(0,y_offset);
    ctx.lineTo(canvas.offsetWidth, y_offset);
    ctx.stroke();
    accel_calculation();
    v1 = +v1 + a1_a * dt;
    a1 = +a1 + v1 * dt;
    v2 = +v2 + a2_a * dt;
    a2 = +a2 + v2 * dt;
    let x1 = dl1 * Math.sin(a1) + x_offset;
    let x2 = x1 + dl2 * Math.sin(a2);
    let y1 = dl1 * Math.cos(a1) + y_offset;
    let y2 = y1 + dl2 * Math.cos(a2);
    ctx.moveTo(x_offset, y_offset);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.arc(x1,y1,10,0,2 * Math.PI,false);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.arc(x2,y2,10,0,2 * Math.PI,false);
    ctx.stroke();
    requestAnimationFrame(draw);
}




