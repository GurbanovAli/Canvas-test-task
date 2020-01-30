import React from 'react';
import {
   useAppState
} from './ControlFile';

function Download() {
   const {
      url: href
   } = useAppState();
   const Component = href ? 'a' : 'button';

   return (
      <div className = 'download_button' >
      <Component
      className = 'button'
      href = { href }
      download = { href ? 'output' : null } >
      Download canvas
      </Component>
      </div>
   );
}

export default Download;
