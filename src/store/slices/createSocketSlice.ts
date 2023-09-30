import { Socket } from 'socket.io-client';
import { GetState, SetState } from 'zustand';
import { io } from 'socket.io-client';
import { generateRandomString } from '../../helpers';

export interface ISocketSlice {
  socketInstance: Socket | null;
  setSocketInstance: () => void;
  validateSocketConnection: () => void;
  roomId: string;
  isLive: boolean;
  intervalId: any;
}

const createSocketSlice = (
  set: SetState<ISocketSlice>,
  get: GetState<ISocketSlice>
) => ({
  socketInstance: null,
  roomId: '',
  isLive: false,
  intervalId: '',
  setSocketInstance: () => {
    const id = generateRandomString(12);
    const so = get().socketInstance;

    set({ socketInstance: io('http://localhost:3080') });
    so?.on('socket-connected', () => {
      get().validateSocketConnection();
      so?.on('join-room', (id) => {
        console.log('[Socket]: join-room', id);
        set({ roomId: id });
      });
      so?.emit('join-room', id);
    });
  },
  validateSocketConnection: () => {
    if (get().intervalId) {
      clearInterval(get().intervalId);
    }
    const so = get().socketInstance;
    so?.on('health-check', (status) => {
      console.log('[Socket]: health-check', status);
      set({ isLive: status });
    });
    so?.emit('health-check');
    const intervalId = setInterval(() => {
      so?.emit('health-check');
    }, 10 * 1000);
    set({ intervalId });
  },
});

export default createSocketSlice;
