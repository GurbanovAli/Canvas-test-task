import React from 'react';
import { useAppState } from '../ControlFile';


function Output() {
   const state = useAppState();
   const {
      loading = false, getFile = 'No file'
   } = state;
   return (
         <div
           className = 'output' >
           { loading }
           <pre> { getFile } </pre> 
         </div>
   );
}

export default Output;
