import React from 'react';
import Download from './components/Download';
import Control from './components/ControlFile';
import Input from './components/InputAndOutputFiles/Input';
import Output from './components/InputAndOutputFiles/Output';
import Image from './components/Image';



const App =()=>(
     <Control>
       <main id='main'>
          <h1>Canvas for The Codex</ h1>
          <div className='main_block'>
             <div className='button_block'>
               <Input />
               <Download />
               <Image />
             </div>
             <Output />
          </div>
       </main>
     </Control>
    );

export default App;
