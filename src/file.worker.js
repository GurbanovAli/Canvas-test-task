import { createInput } from './components/CanvasBar';

self.addEventListener('message', createInput(self.postMessage));
