import connectDB from "@/lib/mongoConnect";
import Notes from "@/schema/notes";
import {  NextResponse } from "next/server";
import {type NextRequest} from "next/server"
export async function GET(request:NextRequest,
    { params }: { params: { branch: string }}){
        const searchParams = request.nextUrl.searchParams
        const sem= searchParams.get('semester')
        const subject= searchParams.get('subject')
        const slug = params.branch.toLowerCase();
        console.log("this is ",slug,slug,subject)
        try{
            await connectDB();
            const notes = await Notes.find({ branch: slug,subject,semester:sem });
            return NextResponse.json({ notes }, { status: 200 })
        }catch(Error){
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    

}




export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { branch, semester, subject } = await request.json();
        console.log(branch, semester, subject);
        const existingNote = await Notes.findOne({ branch, subject, semester });
        if (existingNote) {

        } else {
            NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error processing note:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}