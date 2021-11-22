import socketIOClient from 'socket.io-client';

const ENDPOINT = process.env.SOCKET_ORIGIN || `http://localhost:${process.env.SOCKET_PORT || 5002}`;

export default class SocketAPI {

  socket;
  room;
  userId;

  
  setUserId(userId) {

    return new Promise((resolve, reject) => {
      if (!userId) return reject("Where is the userId?");
      this.userId = userId;
      resolve();
    })
  }

  connect(opts) {
    this.socket = socketIOClient(ENDPOINT);
    this.room = opts.room;
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        this.socket.emit('join', this.room);
        return resolve();
      })
      this.socket.on('connect_error', err => reject(err));
    })
  }

  joinRoom(room) {
    return new Promise((resolve, reject) => {
      this.socket.emit('join', room);
      return resolve();
    })
  }

  leaveRoom(room) {
    return new Promise((resolve, reject) => {
      this.socket.emit('leave', room);
      return resolve();
    })
  }

  disconnect() {
    return new Promise(resolve => {
      this.socket.disconnect(() => {
        this.socket = null;
        this.room = null;
        resolve();
      })
    })
  }

  emit(event, data, cb) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return PromiseRejectionEvent("No socket connection");
      return this.socket.emit(
        event,
        { ...data, room: this.room, userId: this.userId },
        cb || (res => res.error ? reject(res.error) : resolve(res))
      )
    })
  }

  on(event, func) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("No socket connection");

      this.socket.on(event, func);
      resolve();
    })
  }
}