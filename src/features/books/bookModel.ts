import mongoose from "mongoose";
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}
interface Book {
    _id: string;
    title: string;
    description: string;
    author: User;
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
  }

const bookSchema = new mongoose.Schema<Book>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            // add ref
            ref: "User",
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            requied: true,
        },
        genre: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<Book>("Book", bookSchema);