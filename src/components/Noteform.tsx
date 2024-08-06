"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Subject {
  subject: string;
}

const NoteForm = () => {
  const [branch, setBranch] = useState<string>('');
  const [semester, setSemester] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const route=useRouter();
  const branches: string[] = ['IT', 'ECE', 'ME'];
  const semesters: string[] = ['1', '2', '3', '4'];
  
  useEffect(() => {
    if (semester.length && branch) {
      fetchSubjects();
    }
  }, [semester]);
 
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/api/addnotes?semester=${semester}&branch=${branch.toLowerCase()}`);
      
      setSubjects(response.data.notes);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    route.push(`/notesfetch/${branch}?semester=${semester}&subject=${subject}`);
  };

  return (
    <div className="min-h-screen w-[100%] md:w-[40%] lg:w-[30%] bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Check Notes</h2>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Branch:</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          >
            <option value="" disabled>Select Branch</option>
            {branches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Semester:</label>
          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setSubject(''); 
            }}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          >
            <option value="" disabled>Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
            disabled={!semester}
          >
            <option value="" disabled>Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.subject} value={sub.subject}>{sub.subject}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Show
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
