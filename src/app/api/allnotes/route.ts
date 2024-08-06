import connectDB from "@/lib/mongoConnect";
import Notes from "@/schema/notes";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
export async function GET(request:NextRequest){
       
        try{
            await connectDB();
            const notes = await Notes.find();
            console.log(notes)
           
            return NextResponse.json({ notes }, { status: 200 })
        }catch(Error){
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    

}