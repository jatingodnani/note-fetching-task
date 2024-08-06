"use client";
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

interface Note {
  _id: string;
  subject: string;
  branch: string;
  semester: number;
  url: string;
  __v: number;
}

function FetchNote() {
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const semester = searchParams.get('semester');
  const params = useParams();
  const branch = params.branch;

  const [noteUrl, setNoteUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/notes/${branch}?semester=${semester}&subject=${subject}`);
        const notes: Note[] = response.data.notes;

        if (notes.length > 0) {
          setNoteUrl(notes[0].url);
        } else {
          setError('No note found for the specified parameters.');
        }
      } catch (error) {
        setError('Failed to fetch the note.');
      } finally {
        setIsLoading(false);
      }
    };

    if (subject && semester && branch) {
      fetchNote();
    }
  }, [subject, semester, branch]);

  if (isLoading) return <div className="flex justify-center items-center"><FaSpinner size={30} className="animate-spin"/></div>;
  if (error) return <div>Error: {error}</div>;
  if (!noteUrl) return <div>No note available</div>;

  return (
    <div className="bg-black flex h-screen w-full justify-center items-center">
      <iframe
        src={noteUrl}
        width="100%"
        height="100%"
        allow="autoplay"
        className="max-w-full max-h-full"
      ></iframe>
    </div>
  );
}

export default FetchNote;
