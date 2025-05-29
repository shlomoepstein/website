let log = (() => {
   let output = document.getElementById('output');

   let logFunction = message =>
      output.innerText = message;

   logFunction.append = message =>
      output.innerText = `${output.innerText ? `${output.innerText}\n` : ''}${message}`;

   logFunction.clear = () =>
      output.innerText = '';

   return logFunction;
})();

document.getElementById('button1')
   .addEventListener('click', () =>
      log('testing...'));

document.getElementById('button2')
   .addEventListener('click', () =>
      log.append('testing append...'));

document.getElementById('button3')
   .addEventListener('click', () =>
      log.clear());

let stylesheet = document.styleSheets[0];

document.getElementById('borders-toggle')
   .addEventListener('change', (event) =>
      event.target.checked
         ? stylesheet.insertRule('* {border: 1px solid red;}', 0)
         : stylesheet.deleteRule(0));
