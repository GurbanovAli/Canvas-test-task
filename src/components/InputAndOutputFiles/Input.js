import React, { useRef, useEffect, useState } from 'react';
import { useAppSend, useAppState, appWork } from '../ControlFile';
import WebWorker from '../../file.worker';
import throttle from 'lodash.throttle';
// import WebWorker from "react-webworker"

function GetInput({
  is: Component = 'div',
    ...rest
}) {
  return <Component className='component' {...rest}/>;
}

const sendDefault = throttle(
  (progress, send) =>
    send({
      type: appWork.CHANGE,
      payload: progress,
    }),
);

function Input (...rest){
  const sendProgress = sendDefault
  const ref = useRef(document.createElement('div'));
  const thisRef = useRef(new WebWorker());
  const [file, setFile] = useState();
  const appSend = useAppSend();
  const appState = useAppState();

  useEffect(() => {
    const thisWorker = thisRef.current;
    const messageHandler = ({ data }) => {
      const { error, progress, ...payload } = data;

      if (!error && !progress) {
        appSend({
          type: appWork.SUCCESS,
          payload,
        });
      } else if (progress) {
        sendProgress(progress, appSend);
      } else {
        appSend({
          type: appWork.ERROR,
          payload: error,
        });
      }
    };

    thisWorker.addEventListener('message', messageHandler);
    return () => {
      thisWorker.terminate();
    };
}, [appSend, sendProgress]);


  useEffect(() => {
    if (file) {
      appSend({ type: appWork.LOADING, payload: true });

      thisRef.current.postMessage([file]);
    }
}, [file, appSend]);

  const inputId = 'file-input';
  const loading = useState(false);
  const handleInputChange = e => {
    appSend({ type: appWork.RESET });
    const [file] = e.target.files;

    if (file) {
      setFile(file);
    }
    e.target.blur();
  }

// render() {
  return (
    <div className='button download_button'
     ref={ref} {...rest} >
      <GetInput
        is="input"
        type="file"
        id={inputId}
        accept=".txt"
        onChange={handleInputChange}
        disabled={appState.loading} />
      <label htmlFor={inputId}>
      {loading}  Canvas-Input file  </label>
      </div>
 )
}

export default Input;
