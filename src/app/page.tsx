import Image from "next/image";
import "./globals.css"
import NoteForm from "@/components/Noteform";
export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black"><NoteForm/></div>
  );
}
