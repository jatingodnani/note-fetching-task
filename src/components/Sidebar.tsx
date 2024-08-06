"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { FaSpinner } from "react-icons/fa";
import Link from "next/link"; // Correct import for Link component

interface Note {
  _id: string;
  subject: string;
  branch: string;
  semester: number;
  url: string;
  __v: number;
}

interface SemesterData {
  [key: string]: Note[];
}

const Sidebar: React.FC = () => {
  const params = useParams();
  const branch = params.branch as string;

  const [open, setOpen] = useState<string>('sem1');
  const [semesters, setSemesters] = useState<SemesterData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<{ notes: Note[] }>('/api/allnotes');
        const data = response.data;

        const semesterData: SemesterData = {
          sem1: [],
          sem2: [],
          sem3: [],
          sem4: []
        };

        data.notes
          .filter(note => note.branch.toLowerCase() === branch.toLowerCase())
          .forEach(note => {
            const sem = `sem${note.semester}`;
            if (sem in semesterData) {
              semesterData[sem].push(note);
            }
          });

        setSemesters(semesterData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    if (branch) {
      fetchNotes();
    }
  }, [branch]);

  if (!branch) return <div>Branch not specified</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[20%] min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      {isLoading ? (
        <FaSpinner size={30} className="animate-spin" />
      ) : (
        <>
          <h1>{branch} Notes</h1>
          <div className="w-full bg-gray-700 p-4 rounded-lg shadow-lg">
            {Object.keys(semesters).map((sem) => (
              <div key={sem} className="mb-4">
                <button
                  onClick={() => setOpen(sem)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300 mb-2"
                >
                  {sem}
                </button>
                {open === sem && semesters[sem].map((note) => (
                  <Link href={`/notesfetch/${branch}?semester=${note.semester}&subject=${note.subject}`} key={note._id} className=" w-[150px] mt-4 p-2 bg-gray-400 rounded text-white">
                    <span className="w-full mt-4">{note.subject}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
