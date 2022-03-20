import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import userRoutes from './routes/auth.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import resultRoutes from './routes/result.routes.js';

const app = express();

app.use(express.json({ extended: true }));
app.use('/user', userRoutes);
app.use('/', quizRoutes);
app.use('/', resultRoutes);

const PORT = config.get('port') || 3000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    }   catch (err) {
        console.log('Server error: ', err.message);
        process.exit(1);
    }
}
start();