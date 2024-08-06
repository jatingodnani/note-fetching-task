import mongoose, { Model, Schema,model } from "mongoose";

interface INotes {
    subject: string;
    branch: string;
    semester: number;
    url: string;
  }
const noteSchema=new Schema<INotes>({
    subject:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

const Notes: Model<INotes> = mongoose.models.Note || model<INotes>('Note', noteSchema);
export default Notes;
