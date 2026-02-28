import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, ArrowLeft, Video, FileText, CheckCircle2, Package, Edit2, Layers, X, HelpCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useCourses, Course, Module, Lesson, QuizData } from '@/src/contexts/CourseContext';
import { QuizBuilder } from '@/src/components/admin/QuizBuilder';

export function AdminCourses() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [modules, setModules] = useState<Module[]>([]);

  const handleEdit = (course: Course) => {
    setTitle(course.title);
    setDescription(course.description);
    setImageUrl(course.imageUrl);
    setModules(course.modules);
    setEditingId(course.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setModules([]);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: 'New Module', lessons: [] }]);
  };

  const handleUpdateModuleTitle = (moduleId: string, newTitle: string) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, title: newTitle } : m));
  };

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const handleAddLesson = (moduleId: string, type: 'video' | 'pdf' | 'quiz') => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, { 
            id: Date.now().toString(), 
            title: `New ${type === 'video' ? 'Video' : type === 'pdf' ? 'PDF' : 'Quiz'}`, 
            type, 
            url: '',
            quizData: type === 'quiz' ? { questions: [] } : undefined
          }]
        };
      }
      return m;
    }));
  };

  const handleUpdateLesson = (moduleId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return m;
    }));
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
      }
      return m;
    }));
  };

  const handleSave = () => {
    const courseData = { title, description, imageUrl, modules };
    if (editingId) {
      updateCourse(editingId, courseData);
    } else {
      addCourse(courseData);
    }
    resetForm();
  };

  if (!isAdding) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">LMS Courses</h1>
            <p className="text-slate-400">Manage your learning management system courses and content.</p>
          </div>
          <Button onClick={() => { resetForm(); setIsAdding(true); }} className="bg-brand-600 hover:bg-brand-500 text-white">
            <Plus className="h-5 w-5 mr-2" /> Create Course
          </Button>
        </div>

        {courses.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
              <Layers className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No courses yet</h3>
            <p className="text-slate-400 mb-6 max-w-md">Create your first course to start adding video lessons and PDF materials.</p>
            <Button onClick={() => { resetForm(); setIsAdding(true); }} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
              Create First Course
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
                <div className="aspect-video bg-slate-900 relative">
                  {course.imageUrl ? (
                    <img src={course.imageUrl || undefined} alt={course.title} className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-300 mb-4 mt-auto">
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4 text-brand-400" /> {course.modules.length} Modules
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4 text-emerald-400" /> 
                      {course.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.type === 'video').length, 0)} Videos
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    <Button variant="outline" onClick={() => handleEdit(course)} className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Edit2 className="h-4 w-4 mr-2" /> Edit Content
                    </Button>
                    <Button variant="outline" onClick={() => {
                      if(confirm('Are you sure you want to delete this course?')) deleteCourse(course.id);
                    }} className="border-slate-600 text-red-400 hover:bg-red-500/10 hover:text-red-300 px-3">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={resetForm} className="flex items-center text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Courses
        </button>
        <Button onClick={handleSave} className="bg-brand-600 hover:bg-brand-500 text-white">
          <Save className="h-4 w-4 mr-2" /> {editingId ? 'Update Course' : 'Save Course'}
        </Button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white mb-4">Course Details</h2>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Course Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Advanced Mathematics Masterclass"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Cover Image URL</label>
          <input 
            type="text" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Curriculum (Modules & Lessons)</h2>
          <Button onClick={handleAddModule} variant="outline" className="border-brand-500/30 text-brand-400 hover:bg-brand-500/10">
            <Plus className="h-4 w-4 mr-2" /> Add Module
          </Button>
        </div>

        {modules.map((module, mIndex) => (
          <div key={module.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex items-center gap-3">
              <div className="font-bold text-slate-500">Module {mIndex + 1}:</div>
              <input 
                type="text"
                value={module.title}
                onChange={(e) => handleUpdateModuleTitle(module.id, e.target.value)}
                className="flex-1 bg-transparent border-none text-white font-semibold focus:outline-none focus:ring-0 p-0"
              />
              <button onClick={() => handleDeleteModule(module.id)} className="text-slate-500 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              {module.lessons.map((lesson, lIndex) => (
                <div key={lesson.id} className="flex flex-col gap-3 bg-slate-900 p-3 rounded-lg border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="mt-2 text-slate-500">
                      {lesson.type === 'video' ? <Video className="h-5 w-5" /> : lesson.type === 'pdf' ? <FileText className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={lesson.title}
                          onChange={(e) => handleUpdateLesson(module.id, lesson.id, 'title', e.target.value)}
                          placeholder="Lesson Title"
                          className="flex-1 bg-slate-800 border border-slate-700 rounded md px-3 py-1.5 text-sm text-white focus:border-brand-500 focus:outline-none"
                        />
                        {lesson.type === 'video' && (
                          <input 
                            type="text"
                            value={lesson.duration || ''}
                            onChange={(e) => handleUpdateLesson(module.id, lesson.id, 'duration', e.target.value)}
                            placeholder="Duration (e.g. 10:00)"
                            className="w-32 bg-slate-800 border border-slate-700 rounded md px-3 py-1.5 text-sm text-white focus:border-brand-500 focus:outline-none"
                          />
                        )}
                      </div>
                      {lesson.type !== 'quiz' && (
                        <input 
                          type="text"
                          value={lesson.url}
                          onChange={(e) => handleUpdateLesson(module.id, lesson.id, 'url', e.target.value)}
                          placeholder={`${lesson.type === 'video' ? 'Video' : 'PDF'} URL Link`}
                          className="w-full bg-slate-800 border border-slate-700 rounded md px-3 py-1.5 text-sm text-slate-300 focus:border-brand-500 focus:outline-none"
                        />
                      )}
                    </div>
                    <button onClick={() => handleDeleteLesson(module.id, lesson.id)} className="mt-2 text-slate-500 hover:text-red-400">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {lesson.type === 'quiz' && (
                    <QuizBuilder 
                      quizData={lesson.quizData || { questions: [] }} 
                      onChange={(data) => handleUpdateLesson(module.id, lesson.id, 'quizData', data)} 
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <Button onClick={() => handleAddLesson(module.id, 'video')} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8">
                  <Video className="h-3 w-3 mr-1.5" /> Add Video
                </Button>
                <Button onClick={() => handleAddLesson(module.id, 'pdf')} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8">
                  <FileText className="h-3 w-3 mr-1.5" /> Add PDF
                </Button>
                <Button onClick={() => handleAddLesson(module.id, 'quiz')} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8">
                  <HelpCircle className="h-3 w-3 mr-1.5" /> Add Quiz
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
