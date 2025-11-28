# 📄 Resume Builder - Full Stack CRUD Application

A modern, full-featured Resume Maker web application built with React.js, featuring a complete CRUD (Create, Read, Update, Delete) system with JSON-Server backend, React Router for navigation, and Tailwind CSS for beautiful, responsive styling.

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, and Delete resumes
- **Real-time Preview**: See your resume update instantly as you type
- **Multiple Pages**: Navigate between Home, Create, Edit, and View pages
- **Backend Integration**: JSON-Server for data persistence
- **PDF Export**: Download your resume as a professional PDF
- **Responsive Design**: Beautiful UI that works on all devices
- **Toast Notifications**: User-friendly feedback with React Toastify
- **Form Validation**: Input validation and error handling
- **Modern UI**: Tailwind CSS for clean, professional styling

## 🛠️ Technologies Used

- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **JSON-Server** - REST API backend
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **react-to-print** - PDF generation
- **Vite** - Build tool and development server

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd resume_builder
```

2. Install all dependencies:
```bash
npm install --legacy-peer-deps
```
**Note:** The `--legacy-peer-deps` flag is required due to React 19 compatibility with some packages.

3. Start the JSON-Server (in one terminal):
```bash
npm run server
```
This will start the JSON-Server on `http://localhost:3001`

4. Start the React development server (in another terminal):
```bash
npm run dev
```
This will start the Vite dev server (usually on `http://localhost:5173`)

**OR** use the convenient script to run both simultaneously:
```bash
npm run dev:all
```

5. Open your browser and visit `http://localhost:5173`

## 📝 Application Structure

### Pages

- **Home** (`/`) - Landing page with overview and quick actions
- **Create Resume** (`/create`) - Form to create a new resume
- **View Resumes** (`/resumes`) - List all saved resumes
- **View Resume** (`/resumes/:id`) - View a specific resume with PDF download
- **Edit Resume** (`/resumes/:id/edit`) - Edit an existing resume

### Components

- **Layout** - Navigation bar and page wrapper
- **ResumeForm** - Reusable form component for creating/editing resumes

### Services

- **api.js** - Axios-based API service for all CRUD operations

## 🔧 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start JSON-Server backend
- `npm run dev:all` - Run both frontend and backend simultaneously
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 API Endpoints

The JSON-Server provides the following REST API endpoints:

- `GET /resumes` - Get all resumes
- `GET /resumes/:id` - Get a single resume
- `POST /resumes` - Create a new resume
- `PUT /resumes/:id` - Update a resume
- `DELETE /resumes/:id` - Delete a resume

## 🎨 Features in Detail

### CRUD Operations

1. **Create**: Fill out the form with personal info, skills, education, and experience
2. **Read**: View all your resumes or a specific resume
3. **Update**: Edit any existing resume
4. **Delete**: Remove resumes you no longer need

### Form Sections

- **Personal Information**: Contact details and professional links
- **Skills**: Add multiple skills with easy removal
- **Education**: Multiple education entries with degree, school, year, and GPA
- **Work Experience**: Detailed work history with descriptions

### Resume Preview

- Professional layout with clear sections
- Real-time updates as you type
- Print-optimized styling
- Clean typography and spacing

### PDF Export

- One-click PDF download
- Print-friendly formatting
- Professional appearance

## 📱 Responsive Design

The app is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## 🔐 Data Storage

Resumes are stored in `db.json` using JSON-Server. The data structure includes:

```json
{
  "resumes": [
    {
      "id": 1,
      "personalInfo": { ... },
      "skills": [ ... ],
      "education": [ ... ],
      "experience": [ ... ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🎯 Usage Guide

1. **Creating a Resume**:
   - Click "Create" in the navigation or "Create New Resume" button
   - Fill in all the required fields
   - Add skills, education, and experience as needed
   - Click "Create Resume" to save

2. **Viewing Resumes**:
   - Click "My Resumes" to see all saved resumes
   - Click "View" on any resume to see the full preview
   - Use "Download PDF" to export your resume

3. **Editing a Resume**:
   - Go to "My Resumes"
   - Click "Edit" on the resume you want to modify
   - Make your changes and click "Update Resume"

4. **Deleting a Resume**:
   - Go to "My Resumes"
   - Click the delete button (trash icon)
   - Confirm the deletion

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📄 License

This project is open source and available for personal and commercial use.

---

**Happy Resume Building! 🎉**
