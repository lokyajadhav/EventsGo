import app from './app'
import * as http from 'http'

import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port , () => {

    console.log(`Server is running at http://localhost:${port}`);
});