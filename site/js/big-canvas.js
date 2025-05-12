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

// (mostly) fixes a bug where scrollIntoView
// sometimes scrolls a little too low on the
// first load, (but not every time); couldn't
// figure it out, this is a hacky workaround.
// (20ms seems to work, but there's nothing
// special about that number.)
(async () => {
   await delay(20);
   requestAnimationFrame(() =>
      requestAnimationFrame(() =>
         origin.scrollIntoView(instant)));
})();

document.querySelector('#jump-to-origin')
        .addEventListener('click', () =>
           origin.scrollIntoView(smooth));

document.addEventListener('dblclick',(e) => {
      e.preventDefault();
//      e.stopPropagation();
   },
   true);
