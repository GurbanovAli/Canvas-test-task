import Canvas from './Canvas';

function simpleF() {};
const canvasTypes = {
   canvas: 'C',
   line: 'L',
   rectangle: 'R',
   bucketFill: 'B',
};

const stringsToNumbers = strings =>
   strings.map(i => {
      try {
         return JSON.parse(i);
      } catch (e) {
         throw new Error('error');
      }
   });

function createCanvas() {
   let canvas;
   return function currentCanvas(type, getPart, ...args) {
      if (type === canvasTypes.canvas) {
         canvas = Canvas.create(...stringsToNumbers(args));
         return canvas.print();
      }

      if (!canvas) {
         throw new Error(`don't exist canvas`);
      }

      switch (type) {
         case canvasTypes.line:
            canvas.drawLine(...stringsToNumbers(args), getPart);
            return canvas.print();
         case canvasTypes.rectangle:
            canvas.drawRectangle(...stringsToNumbers(args), getPart);
            return canvas.print();
         case canvasTypes.bucketFill:
            const color = args.slice(-1);
            const others = args.slice(0, -1);
            canvas.fill(...stringsToNumbers(others), color, getPart);
            return canvas.print();
         default:
            new Error('error on this canvas');
      }
   }
}

function loadingString(str, change = simpleF) {
   try {
      const actions = str.split('\n').filter(action => action.length);
      const start = actions.length;
      let result = '';
      let getFile;

      function getPart(percent) {
         const progress =
            ((start - actions.length - 1) / start) * 100 + percent * (1 / start);
         change(progress);
      }

      const currentCanvas = createCanvas();
      while (actions.length) {
         const [next, ...args] = actions.shift().split(' ');
         getFile = currentCanvas(next, getPart, ...args);
         result = `${result}${getFile}\n`;
      }
      return [result, getFile];
   } catch (e) {
      throw new Error(e.message);
   }
}


async function Output(file, change = simpleF) {
   const [result, getFile] = await getInput(
      file,
      change
   );
   const blob = new File([result], 'output.txt');
   return [result, URL.createObjectURL(blob), getFile];
}


function getInput(file, change = simpleF) {
   return new Promise((resolve, reject) => {
      if (!file) {
         reject('error');
      }

      if (file.type !== 'text/plain') {
         reject('error');
      }
      const reader = new FileReader();

      reader.onload = function() {
         const text = reader.result;
         try {
            const result = loadingString(text, change);
            resolve(result);
         } catch (e) {
            reject(e.message);
         }
      };

      reader.readAsText(file);
   });
}

export function createInput(message) {
   return async e => {
      if (!e) return;

      const file = e.data[0];

      const change = progress => {
         message({
            progress
         });
      };

      try {
         const [result, dataUrl, getFile] = await Output(
            file,
            change
         );
         message({
            result,
            url: dataUrl,
            getFile
         });
      } catch (error) {
         message({
            error
         });
      }
   };
}

export default {
   Output,
   getInput,
   loadingString,
};
