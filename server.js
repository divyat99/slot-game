const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const slotRoutes = require('./routes/slot');
const slotGameSocket = require('./sockets/slotGameSocket');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/slot', slotRoutes);

// WebSocket for multiplayer slot game
slotGameSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
