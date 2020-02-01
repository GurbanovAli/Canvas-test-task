import { createInput } from '../components/CanvasBar';

export default class WebWorker {
  constructor() {
    this._messages = [];
    this._errors = [];
    this.message = this.message.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
  }

  message([data]) {
    this._messages.forEach(async message => {
      const inputHandler = createInput(data => message({ data }));
      await inputHandler({ data: [data] });
    });
  }

  addEventListener(event, handler) {
    switch (event) {
      case 'message':
        this._messages.push(handler);
        break;
      case 'error':
        this._errors.push(handler);
        break;
      default:
    }
  }
  terminate() {}
}
