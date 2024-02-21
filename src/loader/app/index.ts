import express, { Express, Response, Router} from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const appLoader = async (app: Express, router: Router) => {
// Use the router at the root path
app.use('/', router)

// Application start - Listen on the specified port
app.listen(port, () => {
    console.log(`🎉 🎉 App is Running in Port ${port} 🎉 🎉`);
});

// Error Handling
app.use((err: any, res: Response) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});
}

// Export the app
export { appLoader };