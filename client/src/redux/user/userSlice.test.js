import { createSlice } from '@reduxjs/toolkit';
import { setUser } from './userSlice' // Assuming setUser is your action creator

describe('userSlice', () => {
  test('should set initial state', () => {
    const initialState = {
      currentUser: null,
    };
    const slice = createSlice({
      name: 'user',
      initialState,
      reducers: {},
    });

    const state = slice.reducer({}, {});
    expect(state).toEqual(initialState);
  });

  test('should update currentUser on setUser action', () => {
    const initialState = {
      currentUser: null,
    };
    const user = {
      username: 'testUser',
      avatar: 'https://example.com/avatar.jpg',
    };

    const slice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        setUser(state, action) {
          state.currentUser = action.payload;
        },
      },
    });

    const newState = slice.reducer(initialState, setUser(user));
    expect(newState.currentUser).toEqual(user);
  });
});
