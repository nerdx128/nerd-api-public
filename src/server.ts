import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT} ${process.env.NODE_ENV}`);
});
