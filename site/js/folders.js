let counter = 4;
window.onload = () => {
   console.log(`html.clientWidth: ${document.querySelector('html').clientWidth}
window.innerWidth: ${window.innerWidth}
window.outerWidth: ${window.outerWidth}
window.screen.width: ${window.screen.width}
window.screen.availWidth: ${window.screen.availWidth}
window.devicePixelRatio: ${window.devicePixelRatio}`,);

   document.querySelector('button').onclick = () => {
      let newFolder = document.createElement('div');
      newFolder.setAttribute('class', 'folder');
      let image = document.createElement('img');
      image.setAttribute('class', 'folder-icon');
      image.setAttribute('src', 'assets/FolderDark.iconset/icon_256x256.png');
      image.setAttribute('width', '92');
      image.setAttribute('height', '92');
      newFolder.appendChild(image);
      let name = document.createElement('div');
      name.setAttribute('class', 'folder-name');
      let nameText = document.createTextNode(`Folder ${counter++}`);
      name.appendChild(nameText);
      newFolder.appendChild(name);
      document.querySelector('.folder-container').appendChild(newFolder);
   };
};
