import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

const initialState = {
  username: '',
  // * and we need set some state here especially the status because we need it to display something on the UI
  status: 'idle',
  address: '',
  position: {},
  error: '',
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

// * we will create the action creator with createAsyncThunk function from redux toolkit
// * so this function will accept two params: 1 for event name string, second is a callback where we can do something so async tasks or something like that and return the payload like a normal action creator
// * but we can fetching data from API, do something like that right, so the second param callback function for handle and return payload, the first param is name event string for dispatch action right

// * and the special thing of this createAsyncThunk that it it will create 3 dispatching event so one for pending, one for fulfilled and one for rejected
// * and that because this is async task and will return Promise and as we now this Promise also has three states right so pending, fulfilled and rejected and that why it creates 3 dispatching events
// * and to handle 3 events we need special reducers in the userSlice which is called extraReducers

// * and this fetchAddress is action creator and then we need to export it and then import it to dispatch an action right
// ! and notice we should give the name of this action creator is fetchAddress not getAddress because get keyword is the convention for the selector callback function remember that
export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  console.log('ok');
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  // * so this extraReducers for handle three event actions so pending, fulfilled, rejected
  // * so each pending, fulfilled, rejected like a reducer, and the when we dispatch the event with user/fetchAddress it will / with pending, fulfilled, rejected so user/fetchAddress/pending so like this
  // * so in case pending we do something, when Promise is fulfilled we do something and when the Promise rejected we do something and handle error
  extraReducers: (builder) =>
    builder
      // .addCase(
      //   fetchAddress.pending,
      //   (state, action) => (state.status = 'loading'), //! this will be error because now we return this expression and not return something
      // * so behind the scene here Redux will return state like we did in useReducer or Redux in classic remember that but in the Redux toolkit will return behind the scene so therefore we only change state
      // * and this is the problem here so we return  => (state.status = 'loading') and then than mean now Redux can't return the state right therefore this will be an error
      // ! An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft, so this error
      // *https://itecnote.com/tecnote/reactjs-error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-return-a-new-value-or-modify-the-draft/
      // * we can fix it easy by use curly braces {} and wrap it inside this {}
      // )
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        const { address, position } = action.payload;
        state.status = 'idle';
        state.address = address;
        state.position = position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const { updateName } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
