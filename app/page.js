"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Plus, Save, CheckCircle2, Edit3, Trash2 } from 'lucide-react';

// Project Phases Data
const projectPhases = [
  {
    week: 1,
    name: "Project Foundation & Authentication",
    days: [
      {
        day: 1,
        title: "Project Setup",
        tasks: [
          "Create Next.js project",
          "Configure Tailwind CSS",
          "Set up project folder structure",
          "Initialize Git repository",
          "Set up GitHub project board"
        ]
      },
      // ... other days would be similarly structured
    ]
  },
  // ... other weeks would follow this structure
];

const ProjectTracker = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [notes, setNotes] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [editingNote, setEditingNote] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('projectNotes');
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedCompletedTasks) setCompletedTasks(JSON.parse(savedCompletedTasks));
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projectNotes', JSON.stringify(notes));
  }, [notes]);

  // Save completed tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

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
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 text-blue-600" /> Day {day}: {dayData.title}
        </h2>

        {/* Tasks Checklist */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Tasks</h3>
          {dayData.tasks.map((task, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-2 p-2 rounded ${
                completedTasks[`day${day}`]?.[task] 
                  ? 'bg-green-50 line-through text-gray-500' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <input 
                type="checkbox"
                checked={completedTasks[`day${day}`]?.[task] || false}
                onChange={() => toggleTaskCompletion(day, task)}
                className="mr-3 h-4 w-4"
              />
              <span>{task}</span>
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Notes</h3>
            {!editingNote && (
              <button 
                onClick={() => setEditingNote(day)}
                className="text-blue-600 hover:bg-blue-100 p-2 rounded flex items-center"
              >
                {notes[`day${day}`] ? <Edit3 className="mr-1" size={16} /> : <Plus className="mr-1" size={16} />}
                {notes[`day${day}`] ? 'Edit' : 'Add Note'}
              </button>
            )}
          </div>

          {editingNote === day ? (
            <div className="flex flex-col space-y-2">
              <textarea 
                className="w-full border rounded p-2 min-h-[100px]"
                defaultValue={notes[`day${day}`] || ''}
                placeholder="Enter your notes for this day..."
              />
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => addOrEditNote(day, e.target.closest('div').previousSibling.value)}
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                >
                  <Save className="mr-1" size={16} /> Save
                </button>
                <button 
                  onClick={() => setEditingNote(null)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            notes[`day${day}`] && (
              <div className="relative">
                <p className="bg-gray-50 p-3 rounded border">{notes[`day${day}`]}</p>
                <button 
                  onClick={() => deleteNote(day)}
                  className="absolute top-1 right-1 text-red-500 hover:bg-red-100 p-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🚀 60-Day Project Development Tracker
        </h1>

        {/* Week and Day Navigation */}
        <div className="grid grid-cols-8 gap-4 mb-8">
          {[...Array(60)].map((_, i) => {
            const day = i + 1;
            return (
              <button 
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-4 rounded-lg text-center font-semibold transition-all ${
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