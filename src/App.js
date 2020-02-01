import React from 'react';
import Download from './components/Download';
import Control from './components/ControlFile';
import Input from './components/InputAndOutputFiles/Input';
import Output from './components/InputAndOutputFiles/Output';
import Image from './components/Image';



const App =()=>(
     <Control>
       <main id='main'>
          <div id='container'>
              Canvas
            <div id='flip'>
              <div><div>Make</div></div>
              <div><div>lifeStyle</div></div>
              <div><div>Awesome!</div></div>
            </div>
              for The Codex
          </div>
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
