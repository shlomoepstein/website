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
   await delay(10);
   requestAnimationFrame(() =>
      requestAnimationFrame(() =>
         origin.scrollIntoView(instant)));
})();

document.querySelector('#jump-to-origin')
        .addEventListener('click', () =>
           origin.scrollIntoView(smooth));
