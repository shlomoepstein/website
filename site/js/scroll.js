let origin = document.getElementById('origin');
let instant = {
   behavior: 'instant',
   block: 'center',
   inline: 'center'
};
let smooth = {
   behavior: 'smooth',
   block: 'center',
   inline: 'center'
};

let delay = ms =>
   new Promise(resolve =>
      setTimeout(resolve, ms));

(async () => {
   await delay(20);
   requestAnimationFrame(() =>
      requestAnimationFrame(() =>
         origin.scrollIntoView(instant)));
})();

document.getElementById('jump-to-origin')
        .addEventListener('click', () =>
           origin.scrollIntoView(smooth));


const viewport = document.getElementById('viewport');
const canvas = document.getElementById('canvas');
const info = document.getElementById('info');
let prevX, prevY;
let virtScrollX = 0,
    virtScrollY = 0;

// viewport.addEventListener(
//    'dblclick', (e) => {
//       e.preventDefault;
//       e.stopPropagation
//    }, true);

viewport.addEventListener(
   'pointerdown', (e) => {
      e.stopPropagation();
      prevX = e.clientX;
      prevY = e.clientY;
      // scrollX = window.scrollX;
      // scrollY = window.scrollY;
      info.innerText = `\
offset: ${e.offsetX}, ${e.offsetY}
viewport: ${e.clientX}, ${e.clientY}
page: ${e.pageX}, ${e.pageY}
screen: ${e.screenX}, ${e.screenY}`;
   }, true);

viewport.addEventListener(
   'pointermove', (e) => {
      e.stopPropagation();
      let dx = e.clientX - prevX;
      let dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      virtScrollX = virtScrollX - dx;
      virtScrollY = virtScrollY - dy;

      canvas.style.transform = `\
translate3d(${-virtScrollX}px, ${-virtScrollY}px, 0)`;

      info.innerText = `\
offset: ${e.offsetX}, ${e.offsetY}
viewport: ${e.clientX}, ${e.clientY}
page: ${e.pageX}, ${e.pageY}
screen: ${e.screenX}, ${e.screenY}
dx: ${dx}
dy: ${dy}`;
   }, true);
