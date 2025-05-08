import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = () => {
    connectDB()
    const PORT = config.port || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer()