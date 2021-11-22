
const initialState = {
  currentRoomName: 'General',
  rooms: {
    
  }
}

const roomsReducer = (state = initialState, action) => {
  const {type } = action;

  switch(type) {

    default:
      return state;
  }
}

export default roomsReducer;