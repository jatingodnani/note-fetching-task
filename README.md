/**Note-Fetching Website**\
/**Note: This project includes a feature to add notes with the provided API. I have only added notes for the IT field. You can add notes to other fields with the help of the API.**/

**Overview
This website allows users to add, filter, and view notes based on their branch and semester. The website includes the following features:

/**An API to add notes.**/
A form with three select inputs to filter notes by branch and semester.
A dynamic third select input that shows only the notes related to the selected branch and semester.
A page to display the notes PDF.
A sidebar that shows all notes related to the branch and semester.
Adding Notes
To add notes, make a POST request to the following URL with the required body parameters:

URL: note-fetching-task.vercel.app/api/addnotes

Body:

json
Copy code
{
   "url": "https://drive.google.com/file/d/15cBQ8nU9HU5dU1YYXKB1kanGDY4rdPl/preview",
   "subject": "javascript",
   "branch": "it",
   "semester": "4"
}
Using the Website
/**Filtering Notes**/
Branch Selection: Choose your branch from the first select input.
Semester Selection: Select your semester from the second select input.
Notes Selection: The third selec![Screenshot (47)](https://github.com/user-attachments/assets/32159b6c-0513-4b26-897a-1c810fa1c3a0)
t input will dynamically display the notes related to the selected branch and semester.
Viewing Notes
![Screenshot (48)](https://github.com/user-attachments/assets/4ac255ac-ded1-4a26-a312-83025c24e359)

Notes PDF: Navigate to the notes page to view the PDF of the selected note.

Sidebar: The sidebar displays all the notes related to the selected branch and semester, making it easy to switch between different notes.

