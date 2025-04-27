let body = document.querySelector("body");

let width = body.scrollWidth,
    height = body.scrollHeight,
    vp_width = window.innerWidth,
    vp_height = window.innerHeight;

var jump_to_origin = () =>
   window.scrollTo(
     // (width / 2) - (vp_width / 2),
     // (height / 2) - (vp_height / 2)
   0, 0);
