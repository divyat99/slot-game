module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      socket.on('slot', (data) => {
        // Handle slot event, e.g., calling slotReels controller
        console.log('Slot initiated', data);
      });
  
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  };
  