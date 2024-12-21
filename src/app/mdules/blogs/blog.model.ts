import { model, Schema } from "mongoose"
import { IBlog } from "./blog.interface"


const blogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true},
        content: { type: String, required: true},
        author: {   
            type: Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
        isPublished: { type: Boolean, default: true }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);


export const Blog = model<IBlog>('Blog', blogSchema);

