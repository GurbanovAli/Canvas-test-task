const can = {
   canvas: '',
   line: '',
   rectangle: '',
   bucketFill: '',
};

const pixels = {
   point: Symbol('x'),
   empty: Symbol(' '),
};

function simpleF() {}

function symbolToString(symbol) {

   const [_, match] = symbol.toString().match(/^Symbol\(([\w ]+)\)$/);
   return match;
}

function matrixString(matrix) {
   const [topRow] = matrix;
   const border = `-${topRow.map(() => '-').join('')}-`;
   const body = matrix.reduce(
      (str, row) => `${str}|${row.map(symbolToString).join('')}|\n`,
      ''
   );
   return `${border}\n${body}${border}`;
}

function checkValues(...args) {
   return (
      args.length && args.every(arg => Number.isSafeInteger(arg) && arg >= 0)
   );
}

function getValues(a, b, ...values) {
   return values.every(value => value >= a && value <= b);
}

function coordinatesCanvas(height, width, ...coordinates) {
   const abscissas = coordinates.filter((c, i) => !(i % 2));
   const ordinates = coordinates.filter((c, i) => i % 2);

   return (
      getValues(1, width, ...abscissas) &&
      getValues(1, height, ...ordinates)
   );
}

function getBooleen(...args) {
   return args.every(arg => Boolean(arg));
}

function createCoordinates(a, b) {
   return [Math.min(a, b), Math.max(a, b)];
}

function getColorFromInput(colorInput) {
   const colorSymbol = Symbol.for(colorInput);

   return Object.values(pixels).includes(colorSymbol) ?
      Symbol(colorInput) :
      colorSymbol;
}

class Canvas {
   constructor(width, height) {
      this._width = width;
      this._height = height;
      this._matrix = [];
      this._init();
   }

   static create = (width, height) => {
      if (!checkValues(width, height)) {
         throw new Error(`${can.Canvas}: dimensions aren't safe integers`);
      }

      return new Canvas(width, height);
   };

   _init() {
      for (let i = 0; i < this._height; ++i) {
         this._matrix[i] = [];

         for (let j = 0; j < this._width; ++j) {
            this._matrix[i][j] = pixels.empty;
         }
      }
   }

   _getPixel(col, row) {
      return this._matrix[row - 1][col - 1];
   }

   _setPixel(col, row, value) {
      this._matrix[row - 1][col - 1] = value;
   }

   _coordinatesCanvas(...points) {
      return coordinatesCanvas(this._height, this._width, ...points);
   }

   print() {
      return matrixString(this._matrix);
   }

   drawLine(x1, y1, x2, y2, getPercent = simpleF) {
      const isXPos = x1 === x2;
      const isYPos = y1 === y2;

      if (!getBooleen(x1, y1, x2, y2)) {
         throw new Error(
            can.line
         );
      }

      if (!this._coordinatesCanvas(x1, y1, x2, y2)) {
         throw new Error(
            can.line
         );
      }

      if (!(isXPos || isYPos)) {
         throw new Error(
            can.line
         );
      }

      const getProgress = (i, start, end) => {
         const steps = end - start + 1;

         return ((i - start) / steps) * 100;
      };

      if (isXPos) {
         let [start, end] = createCoordinates(y1, y2);

         for (let i = start; i <= end; ++i) {
            this._setPixel(x1, i, pixels.point);
            const progress = getProgress(i, start, end);
            getPercent(progress);
         }
      }

      if (isYPos) {
         let [start, end] = createCoordinates(x1, x2);

         for (let i = start; i <= end; ++i) {
            this._setPixel(i, y1, pixels.point);
            const progress = getProgress(i, start, end);
            getPercent(progress);
         }
      }
   }

   drawRectangle(x1, y1, x2, y2, getPercent = simpleF) {
      try {
         this.drawLine(x1, y1, x2, y1, getPercent);
         this.drawLine(x2, y1, x2, y2, getPercent);
         this.drawLine(x2, y2, x1, y2, getPercent);
         this.drawLine(x1, y2, x1, y1, getPercent);
      } catch (e) {
         throw new Error(can.rectangle);
      }
   }

   fill(x, y, colorInput, getPercent = simpleF) {
      if (!getBooleen(x, y, colorInput)) {
         throw new Error(
            can.bucketFill
         );
      }

      if (!this._coordinatesCanvas(x, y)) {
         throw new Error(
            can.bucketFill
         );
      }

      const color = getColorFromInput(colorInput);

      const point = {
         x,
         y
      };
      const queue = [];
      const visitedPixels = {};
      queue.push(point);

      while (queue.length) {
         let {
            x,
            y
         } = queue.pop();
         const pixelKey = `${x}-${y}`;

         if (
            this._coordinatesCanvas(x, y) &&
            !visitedPixels[pixelKey]
         ) {
            const pixel = this._getPixel(x, y);
            visitedPixels[pixelKey] = true;

            getPercent(
               (Object.keys(visitedPixels).length / (this._height * this._width)) *
               100
            );

            if (pixel !== pixels.point) {
               this._setPixel(x, y, color);
               queue.push({
                  x: x + 1,
                  y
               });
               queue.push({
                  x: x - 1,
                  y
               });
               queue.push({
                  x,
                  y: y + 1
               });
               queue.push({
                  x,
                  y: y - 1
               });
            }
         }
      }
   }
}

export default Canvas;
