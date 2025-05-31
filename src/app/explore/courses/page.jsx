"use client";
import React, { useState } from 'react';

const dummyCourses = [
  {
    title: 'Prompt Engineering for LLMs',
    description: 'Learn the art and science of crafting effective prompts for large language models.',
    level: 'Intermediate',
    category: 'Prompt Engineering',
    duration: '4 hours',
    students: 1200,
    rating: 4.8,
    tags: ['LLM', 'Prompting', 'AI'],
    author: 'Dr. Sarah Chen',
  },
  {
    title: 'Mastering Retrieval-Augmented Generation (RAG)',
    description: 'Deep dive into RAG architectures and implementations for enhanced AI applications.',
    level: 'Advanced',
    category: 'RAG',
    duration: '6 hours',
    students: 800,
    rating: 4.9,
    tags: ['RAG', 'Vector DB', 'LLM'],
    author: 'Alex Kumar',
  },
  {
    title: 'ChatGPT Cheat Sheet: Quick Guide to Conversational AI',
    description: "Essential tips and tricks for maximizing ChatGPT's potential.",
    level: 'Beginner',
    category: 'ChatGPT',
    duration: '2 hours',
    students: 2500,
    rating: 4.7,
    tags: ['ChatGPT', 'Tips', 'AI'],
    author: 'Maria Garcia',
  },
  {
    title: 'Introduction to Artificial Intelligence',
    description: 'Comprehensive overview of AI concepts, applications, and implications.',
    level: 'Beginner',
    category: 'Fundamentals',
    duration: '8 hours',
    students: 3500,
    rating: 4.6,
    tags: ['AI', 'ML', 'Basics'],
    author: 'Dr. Sarah Chen',
  },
  {
    title: 'Introduction to AI Agents and Agentic Workflows',
    description: 'Learn about autonomous AI agents and how to create effective agent systems.',
    level: 'Intermediate',
    category: 'AI Agents',
    duration: '5 hours',
    students: 950,
    rating: 4.8,
    tags: ['Agents', 'Automation', 'AI'],
    author: 'Alex Kumar',
  },
  {
    title: 'Building with ChatGPT and OpenAI APIs',
    description: "Hands-on course on integrating and building with OpenAI's APIs.",
    level: 'Intermediate',
    category: 'Development',
    duration: '6 hours',
    students: 1800,
    rating: 4.9,
    tags: ['API', 'OpenAI', 'Development'],
    author: 'Maria Garcia',
  },
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const categories = ['All Categories', ...Array.from(new Set(dummyCourses.map(c => c.category)))];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All Levels');
  const [category, setCategory] = useState('All Categories');

  const filteredCourses = dummyCourses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === 'All Levels' || course.level === level;
    const matchesCategory = category === 'All Categories' || course.category === category;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Courses</h1>
      <p className="text-gray-500 mb-6">Hands-on learning with interactive exercises and expert instruction</p>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          {levels.map(l => <option key={l}>{l}</option>)}
        </select>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => (
          <div key={course.title + idx} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
              <p className="text-gray-500 mb-2 text-sm">{course.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{course.level}</span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">{course.category}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span>{course.duration}</span>
                <span>•</span>
                <span>{course.students.toLocaleString()} students</span>
                <span>•</span>
                <span>⭐ {course.rating}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {(course.tags || []).map(tag => (
                  <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
              </div>
              <div className="text-xs text-gray-400 mb-2">By {course.author}</div>
            </div>
            <button disabled className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 opacity-60 cursor-not-allowed transition flex items-center justify-between">
              Coming Soon
              <span className="ml-2">&rarr;</span>
            </button>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">No courses found.</div>
        )}
      </div>
    </div>
  );
} 