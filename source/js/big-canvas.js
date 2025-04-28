let body = document.querySelector('body');

let width = body.scrollWidth,
    height = body.scrollHeight,
    vp_width = window.innerWidth,
    vp_height = window.innerHeight;

window.addEventListener(
   'load',
   () => {
      document.querySelector(
         '#jump-to-origin'
      ).addEventListener(
         'click',
         () => {
            window.scrollTo({
               top: (height / 2) - (vp_height / 2),
               left: (width / 2) - (vp_width / 2),
               behavior: 'smooth'
            })
         }
      )
   }
);
