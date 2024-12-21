
import { Document , Schema} from "mongoose";

export interface IBlog extends Document {
   title: string;
   content: string;
   author: Schema.Types.ObjectId;
   isPublished: boolean;
}