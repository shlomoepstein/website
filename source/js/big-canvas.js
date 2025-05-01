let origin =
   document.getElementById('origin');
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


window.addEventListener('load', () =>
   requestAnimationFrame(() =>
      requestAnimationFrame(() =>
         origin
            .scrollIntoView(instant))));


document
   .querySelector('#jump-to-origin')
   .addEventListener('click', () =>
      origin.scrollIntoView(smooth));
