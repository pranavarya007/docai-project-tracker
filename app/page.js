"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Plus, Save, CheckCircle2, Edit3, Trash2 } from 'lucide-react';

// Project Phases Data
const projectPhases = [
  {
    "week": 1,
    "name": "Project Foundation & Authentication",
    "days": [
      {
        "day": 1,
        "title": "Project Setup",
        "tasks": [
          "Create Next.js project",
          "Configure Tailwind CSS",
          "Set up project folder structure",
          "Initialize Git repository",
          "Set up GitHub project board"
        ]
      },
      {
        "day": 2,
        "title": "Authentication Setup",
        "tasks": [
          "Set up Firebase project",
          "Configure project settings",
          "Integrate Firebase SDK",
          "Test basic Firebase connection"
        ]
      },
      {
        "day": 3,
        "title": "Authentication Features",
        "tasks": [
          "Implement Google/Email authentication",
          "Create authentication context",
          "Develop login and signup pages",
          "Test authentication workflows"
        ]
      },
      {
        "day": 4,
        "title": "Frontend Structure Planning",
        "tasks": [
          "Design initial wireframes",
          "Sketch layout components",
          "Plan navigation structure",
          "Research dark/light mode implementation"
        ]
      },
      {
        "day": 5,
        "title": "Frontend Base Structure",
        "tasks": [
          "Create responsive layout components",
          "Implement dark/light mode",
          "Set up initial routing",
          "Test navigation flows"
        ]
      },
      {
        "day": 6,
        "title": "Project Configuration Basics",
        "tasks": [
          "Configure environment variables",
          "Set up basic error logging",
          "Create an initial deployment pipeline"
        ]
      },
      {
        "day": 7,
        "title": "Review and Documentation",
        "tasks": [
          "Write initial documentation",
          "Perform first code review",
          "Finalize Week 1 progress"
        ]
      }
    ]
  },
  {
    "week": 2,
    "name": "Document Upload & Processing",
    "days": [
      {
        "day": 8,
        "title": "Upload Interface Basics",
        "tasks": [
          "Create file upload component",
          "Add input validation for files",
          "Implement basic styling for file upload"
        ]
      },
      {
        "day": 9,
        "title": "Upload Interface Enhancements",
        "tasks": [
          "Add drag and drop functionality",
          "Create file preview functionality",
          "Test upload progress indicator"
        ]
      },
      {
        "day": 10,
        "title": "Document Processing Setup",
        "tasks": [
          "Set up PDF parsing logic",
          "Develop text extraction utility",
          "Plan text chunking algorithm"
        ]
      },
      {
        "day": 11,
        "title": "Advanced Document Processing",
        "tasks": [
          "Implement OCR for scanned documents",
          "Set up document metadata storage",
          "Test document processing pipeline"
        ]
      },
      {
        "day": 12,
        "title": "Database Integration Basics",
        "tasks": [
          "Set up Firebase database",
          "Create document storage schema",
          "Develop basic document tracking"
        ]
      },
      {
        "day": 13,
        "title": "Document Library Features",
        "tasks": [
          "Add user document library interface",
          "Implement basic search functionality",
          "Test document retrieval features"
        ]
      },
      {
        "day": 14,
        "title": "API Integration",
        "tasks": [
          "Develop document management APIs",
          "Connect backend to database",
          "Test API endpoints"
        ]
      }
    ]
  },
  {
    "week": 3,
    "name": "AI Chat Integration",
    "days": [
      {
        "day": 15,
        "title": "Chat UI Setup",
        "tasks": [
          "Create chat interface skeleton",
          "Add message input component",
          "Implement send functionality"
        ]
      },
      {
        "day": 16,
        "title": "Chat UI Enhancements",
        "tasks": [
          "Develop conversation history display",
          "Design responsive chat layout",
          "Add error and loading states"
        ]
      },
      {
        "day": 17,
        "title": "AI API Setup",
        "tasks": [
          "Connect to OpenAI API",
          "Develop prompt engineering utility",
          "Test basic AI responses"
        ]
      },
      {
        "day": 18,
        "title": "Context Management",
        "tasks": [
          "Implement conversation context retention",
          "Optimize prompt building",
          "Add token usage tracking"
        ]
      },
      {
        "day": 19,
        "title": "Chat Multi-Document Features",
        "tasks": [
          "Develop multi-document chat capabilities",
          "Add semantic search integration",
          "Test document switching in chat"
        ]
      },
      {
        "day": 20,
        "title": "Citation and Source Tracking",
        "tasks": [
          "Implement source tracking",
          "Develop citation display functionality",
          "Test source verification"
        ]
      },
      {
        "day": 21,
        "title": "Export and Advanced Testing",
        "tasks": [
          "Develop conversation export functionality",
          "Perform thorough UI/UX testing",
          "Finalize Week 3 deliverables"
        ]
      }
    ]
  },
  {
    "week": 4,
    "name": "Monetization & User Experience",
    "days": [
      {
        "day": 22,
        "title": "Freemium Model Setup",
        "tasks": [
          "Create pricing tiers",
          "Develop credit-based usage system",
          "Design upgrade prompts"
        ]
      },
      {
        "day": 23,
        "title": "Freemium Model Testing",
        "tasks": [
          "Implement paywall components",
          "Test credit system workflows",
          "Adjust pricing tier logic"
        ]
      },
      {
        "day": 24,
        "title": "Payment Integration Basics",
        "tasks": [
          "Set up Stripe payment gateway",
          "Test basic payment flows",
          "Develop subscription management backend"
        ]
      },
      {
        "day": 25,
        "title": "Payment Features",
        "tasks": [
          "Add payment success/failure flows",
          "Implement receipt generation",
          "Test payment method management"
        ]
      },
      {
        "day": 26,
        "title": "User Onboarding Flow",
        "tasks": [
          "Develop onboarding screens",
          "Add tutorial section",
          "Test user onboarding workflows"
        ]
      },
      {
        "day": 27,
        "title": "User Feedback System",
        "tasks": [
          "Create feedback form",
          "Develop backend for feedback storage",
          "Test feedback submission and viewing"
        ]
      },
      {
        "day": 28,
        "title": "Accessibility Enhancements",
        "tasks": [
          "Add accessibility features",
          "Test for screen reader compatibility",
          "Ensure keyboard navigation works"
        ]
      }
    ]
  },
  {
    "week": 5,
    "name": "Performance & Optimization",
    "days": [
      {
        "day": 29,
        "title": "Code Splitting",
        "tasks": [
          "Implement dynamic imports",
          "Analyze bundle size",
          "Test for performance improvements"
        ]
      },
      {
        "day": 30,
        "title": "Rendering Optimization",
        "tasks": [
          "Optimize rendering performance",
          "Reduce unnecessary re-renders",
          "Implement caching strategies"
        ]
      },
      {
        "day": 31,
        "title": "Security Basics",
        "tasks": [
          "Implement basic encryption",
          "Set up secure environment variables",
          "Test basic security features"
        ]
      },
      {
        "day": 32,
        "title": "Advanced Security",
        "tasks": [
          "Add multi-factor authentication",
          "Develop comprehensive error handling",
          "Perform security audits"
        ]
      },
      {
        "day": 33,
        "title": "Unit Testing",
        "tasks": [
          "Write unit tests for components",
          "Develop unit tests for APIs",
          "Test coverage for core modules"
        ]
      },
      {
        "day": 34,
        "title": "Integration Testing",
        "tasks": [
          "Perform integration tests",
          "Identify and resolve bugs",
          "Test edge cases"
        ]
      },
      {
        "day": 35,
        "title": "Testing Finalization",
        "tasks": [
          "Conduct user acceptance testing",
          "Fix remaining bugs",
          "Optimize AI response accuracy"
        ]
      }
    ]
  },
  {
    "week": 6,
    "name": "Deployment & Launch Preparation",
    "days": [
      {
        "day": 36,
        "title": "Production Setup",
        "tasks": [
          "Configure production environment",
          "Set up CI/CD pipeline",
          "Test deployment workflows"
        ]
      },
      {
        "day": 37,
        "title": "Monitoring and Logging",
        "tasks": [
          "Set up monitoring tools",
          "Implement logging systems",
          "Test error reporting"
        ]
      },
      {
        "day": 38,
        "title": "Beta Testing Setup",
        "tasks": [
          "Invite beta users",
          "Collect feedback",
          "Fix beta bugs"
        ]
      },
      {
        "day": 39,
        "title": "Performance Testing",
        "tasks": [
          "Conduct performance stress tests",
          "Address bottlenecks",
          "Ensure scalability"
        ]
      },
      {
        "day": 40,
        "title": "Launch Preparation",
        "tasks": [
          "Finalize documentation",
          "Set up customer support channels",
          "Prepare marketing materials"
        ]
      },
      {
        "day": 41,
        "title": "Launch Execution",
        "tasks": [
          "Push final build to production",
          "Announce launch on social media",
          "Monitor user traffic"
        ]
      },
      {
        "day": 42,
        "title": "Post-Launch Maintenance",
        "tasks": [
          "Fix early launch issues",
          "Monitor AI responses",
          "Collect user feedback"
        ]
      },
      {
        "day": 43,
        "title": "Continuous Improvement",
        "tasks": [
          "Analyze user behavior",
          "Plan new features",
          "Start Week 7 iteration"
        ]
      }
    ]
  }
  // ... other weeks would follow this structure
];

const ProjectTracker = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [notes, setNotes] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [editingNote, setEditingNote] = useState(null);

  // localStorage logic remains the same as original code

  const toggleTaskCompletion = (day, task) => {
    const key = `day${day}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [task]: !(prev[key]?.[task] || false)
      }
    }));
  };

  const addOrEditNote = (day, noteText) => {
    setNotes(prev => ({
      ...prev,
      [`day${day}`]: noteText
    }));
    setEditingNote(null);
  };

  const deleteNote = (day) => {
    setNotes(prev => {
      const newNotes = {...prev};
      delete newNotes[`day${day}`];
      return newNotes;
    });
  };

  const renderDayDetails = (day) => {
    const dayData = projectPhases.flatMap(phase => phase.days).find(d => d.day === day);
    
    if (!dayData) return null;

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center flex-wrap">
          <Calendar className="mr-2 text-blue-600 w-5 h-5 sm:w-6 sm:h-6" /> 
          <span className="mt-1">Day {day}: {dayData.title}</span>
        </h2>

        {/* Tasks Checklist - More Compact */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Tasks</h3>
          {dayData.tasks.map((task, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-1 sm:mb-2 p-1 sm:p-2 rounded text-sm sm:text-base ${
                completedTasks[`day${day}`]?.[task] 
                  ? 'bg-green-50 line-through text-gray-500' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <input 
                type="checkbox"
                checked={completedTasks[`day${day}`]?.[task] || false}
                onChange={() => toggleTaskCompletion(day, task)}
                className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4"
              />
              <span>{task}</span>
            </div>
          ))}
        </div>

        {/* Notes Section - Improved Mobile Layout */}
        <div className="mt-4 sm:mt-6">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h3 className="text-base sm:text-lg font-semibold">Notes</h3>
            {!editingNote && (
              <button 
                onClick={() => setEditingNote(day)}
                className="text-blue-600 hover:bg-blue-100 p-1 sm:p-2 rounded flex items-center text-sm sm:text-base"
              >
                {notes[`day${day}`] ? <Edit3 className="mr-1" size={14} /> : <Plus className="mr-1" size={14} />}
                {notes[`day${day}`] ? 'Edit' : 'Add Note'}
              </button>
            )}
          </div>

          {editingNote === day ? (
            <div className="flex flex-col space-y-2">
              <textarea 
                className="w-full border rounded p-1 sm:p-2 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                defaultValue={notes[`day${day}`] || ''}
                placeholder="Enter your notes for this day..."
              />
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => addOrEditNote(day, e.target.closest('div').previousSibling.value)}
                  className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded flex items-center text-sm sm:text-base"
                >
                  <Save className="mr-1" size={14} /> Save
                </button>
                <button 
                  onClick={() => setEditingNote(null)}
                  className="border px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            notes[`day${day}`] && (
              <div className="relative">
                <p className="bg-gray-50 p-2 sm:p-3 rounded border text-sm sm:text-base">{notes[`day${day}`]}</p>
                <button 
                  onClick={() => deleteNote(day)}
                  className="absolute top-1 right-1 text-red-500 hover:bg-red-100 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
          🚀 60-Day Project Development Tracker
        </h1>

        {/* Responsive Day Navigation */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          {[...Array(60)].map((_, i) => {
            const day = i + 1;
            return (
              <button 
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-2 sm:p-3 md:p-4 rounded-lg text-center font-semibold transition-all text-xs sm:text-sm ${
                  selectedDay === day 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white hover:bg-blue-100 text-gray-700'
                }`}
              >
                Day {day}
              </button>
            );
          })}
        </div>

        {/* Day Details Section */}
        {selectedDay && renderDayDetails(selectedDay)}
      </div>
    </div>
  );
};

export default ProjectTracker;