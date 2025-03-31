// import { rootSaga } from './root.saga.js';
// import createSagaMiddleware from "redux-saga";
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './app/theme.slice.js';
import navPanelReducer from './app/navPanel.slice.js';
// import usersSagaReducer from './users/users.slice.js';
// import isUserSagaReducer from './isUser/isUser.slice.js';
// import postSagaReducer from './post/post.slice.js';

// const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    navPanel: navPanelReducer,
    // users: usersSagaReducer,
    // isUser: isUserSagaReducer,
    // post: postSagaReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    // sagaMiddleware,
  ]
});
// sagaMiddleware.run(rootSaga);