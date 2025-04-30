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

let before = `\
visualViewport.height: ${visualViewport.height}
window.innerHeight: ${innerHeight}`;
let inside = 'inside';

// after first layout and paint
requestAnimationFrame(() =>
   requestAnimationFrame(() => {
      inside = `\
visualViewport.height: ${visualViewport.height}
window.innerHeight: ${innerHeight}`

      origin.scrollIntoView(instant);
   })
);

alert(`${before}\n${inside}`);

document
   .querySelector('#jump-to-origin')
   .addEventListener('click', () => {
      origin.scrollIntoView(smooth);
      alert(`\
visualViewport.height: ${visualViewport.height}
window.innerHeight: ${innerHeight}`
      );
   });
