// from the global namespace:
// scrollX, scrollY, innerWidth,
// innerHeight

// editing on a phone (textastic!),
// hence the tight nesting


let getCoords = element => {
   let box = element.getBoundingClientRect();
   return {
      x: scrollX + box.x,
      y: scrollY + box.y,
      width: box.width,
      height: box.height,
      centerX: scrollX + box.x +
               (box.width / 2),
      centerY: scrollY + box.y +
               (box.height / 2)
   };
};

let scrollTo = (element, scrollBehavior) => {
   let coords = getCoords(element);
   let x = coords.centerX -
           (innerWidth / 2),
       y = coords.centerY -
           (innerHeight / 2);
   window.scrollTo({
      top: y,
      left: x,
      behavior: scrollBehavior
   });
};

let delay = ms =>
   new Promise(resolve =>
      setTimeout(resolve, ms));


window.addEventListener('load', () => {
   let origin = document
      .querySelector('#origin');

   scrollTo(origin, 'instant');

   (async () => {
      await delay(1);
      scrollTo(origin, 'instant');
   })();

   document
      .querySelector('#jump-to-origin')
      .addEventListener('click', () =>
         scrollTo(origin, 'smooth'));
});
