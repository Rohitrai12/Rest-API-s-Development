import express from "express";
import globalErrorHandler from "./middlewares/ErrorHandler";
import userRouter from "./features/users/userRouter";
import bookRouter from "./features/books/bookRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to elib apis" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

app.use(globalErrorHandler);

export default app;
