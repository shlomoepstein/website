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

let before = visualViewport.height;

// after first layout and paint
requestAnimationFrame(() =>
   requestAnimationFrame(() =>
      origin.scrollIntoView(instant)));

let after = visualViewport.height;
alert(`${before}\n${after}`)

document
   .querySelector('#jump-to-origin')
   .addEventListener('click', () => {
      origin.scrollIntoView(smooth);
      alert(
         `${visualViewport.height}`
      );
   });
