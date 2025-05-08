import app from "./src/app";
import { config } from "./src/config/config";

const startServer = () => {
    const PORT = config.port || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer()