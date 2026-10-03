// Real-time Socket.IO handler
export const setupSocketIO = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join room for consultation or role broadcasts
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Chat message handler
    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', {
        ...data,
        timestamp: new Date()
      });
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.roomId).emit('user_typing', data);
    });

    // Weather alert broadcast
    socket.on('broadcast_alert', (alertData) => {
      io.emit('global_alert', alertData);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
