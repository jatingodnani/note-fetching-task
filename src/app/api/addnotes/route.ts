import connectDB from "@/lib/mongoConnect";
import Notes from "@/schema/notes";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { branch, semester, subject,url } = await request.json();
        console.log(branch, semester, subject, url);
        const existingNote = await Notes.findOne({ branch, subject, semester });
        if (existingNote) {
            existingNote.url = url;
            const result = await existingNote.save();
            return NextResponse.json({ res: "Successfully updated", result }, { status: 200 });
        } else {
            const newNote = new Notes({ branch, semester, subject, url });
            const result = await newNote.save();
            return NextResponse.json({ res: "Successfully added", result }, { status: 201 });
        }
    } catch (error) {
        console.error("Error processing note:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request:NextRequest,
    { params }: { params: { branch: string }}){
        const searchParams = request.nextUrl.searchParams
        const sem= searchParams.get('semester')
        const branch= searchParams.get('branch')
        console.log("this is ",sem,branch)
        try{
            await connectDB();
            const notes = await Notes.find({ branch,semester:sem });
            console.log(notes,"hlo")
            if(!notes){
               NextResponse.json({ error: 'Not found' }, { status: 404 });    }
            return NextResponse.json({ notes }, { status: 200 })
        }catch(Error){
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    

}