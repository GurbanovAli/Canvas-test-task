import React from 'react';


export default function Image(...args) {

   async function getImage(...args) { // function that returns background image
      const accessKey = 'a4e459094ff30eccca82da8258dd3e4e4ce923d584ab01bb47d1e4d364388591';
      const city = 'Minsk';
      const url = `https://api.unsplash.com/photos/random?query=${city}&client_id=${accessKey}`;
      const data = await fetch(url).then((res) => res.json());
      const root = document.getElementById('main');
      const img = root.style.backgroundImage = `url(${data.urls.full}&w=1100)`;
      return img;
   }

   return (
      <div>
      <button id = 'image'
      className = 'button download_button'
      onClick = { getImage } > Change Background </button>
      </div>
   );
}
