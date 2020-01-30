import React, {
   useReducer,
   useContext,
   createContext
} from 'react';

const appState = {
   loading: false,
   progress: 0
};
const SetContext = createContext(null);
const SubmitContext = createContext(null);
export const appWork = {
   SUCCESS: 'success',
   ERROR: 'error',
   RESET: 'reset',
   LOADING: 'loading',
   CHANGE: 'change',

};

export default function Control({
   children,
   state: initialState = appState
}) {
   const [state, submit] = useReducer(appReducer, initialState);
   return (
      <SetContext.Provider value = {
         state
      } >
      <SubmitContext.Provider value = {
         submit
      } > {
         children
      } </SubmitContext.Provider>
      </SetContext.Provider>
   );
}


export function useAppState() {
   const context = useContext(SetContext);
   return context;
}

export function useAppSend() {
   const context = useContext(SubmitContext);
   return context;
}

function appReducer(state, action) {
   switch (action.type) {
      case appWork.SUCCESS:
         const {
            result, url, getFile
         } = action.payload;
         return {
            result, url, getFile, loading: false
         };
      case appWork.ERROR:
         return {
            error: action.payload,
               loading: false
         };
      case appWork.RESET:
         return appState;
      case appWork.LOADING:
         return {
            loading: action.payload
         };
      case appWork.CHANGE:
         return {
            ...state,
            progress: action.payload
         };
      default:
         return state;

   }
}
