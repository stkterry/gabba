
export const selSessionError = state => state.session.err;
export const selSessionSignIn = state => state.session.isSignedIn;

export const selCurrentRoomName = state => state.rooms.currentRoomName;

export const selCurrentRoom = state => state.rooms.rooms[state.rooms.currentRoomName];

export const selCurrentPageDate = state => state.messages[state.rooms.currentRoomName].pageDate;
export const selCurrentMessages = state => state.messages[state.rooms.currentRoomName].messages;

export const selUser = state => state.session.user;