
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import reducer from './reducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn','data'],
  blacklist: [''],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const Store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const Persistor = persistStore(Store);

export {Store, Persistor};
