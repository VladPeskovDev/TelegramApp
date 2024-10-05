import { configureStore } from '@reduxjs/toolkit';
import ShopsSlice from './shops/ShopsSlice';
import ShopsDataSlice from './shops/ShopsDateSlice';


export const store = configureStore({
    reducer: {
        shops: ShopsSlice.reducer,
        shopsDate: ShopsDataSlice.reducer
       
    },
  })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;