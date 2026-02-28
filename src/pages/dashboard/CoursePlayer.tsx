import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses, Course, Module, Lesson } from '@/src/contexts/CourseContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { ChevronLeft, PlayCircle, FileText, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';
import { SecureVideoPlayer } from '@/src/components/SecureVideoPlayer';
import { PDFReader } from '@/src/components/PDFReader';
import { QuizPlayer } from '@/src/components/QuizPlayer';

export function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, enrollments } = useCourses();
  const { user } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user || !courseId) return;

    // Verify enrollment
    const isEnrolled = enrollments.some(e => e.userEmail === user.email && e.courseId === courseId);
    if (!isEnrolled && user.email !== 'mdrifat.contact@gmail.com') { // Admin can view
      navigate('/dashboard/courses');
      return;
    }

    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      // Expand first module and set first lesson active by default
      if (foundCourse.modules.length > 0) {
        setExpandedModules({ [foundCourse.modules[0].id]: true });
        if (foundCourse.modules[0].lessons.length > 0) {
          setActiveLesson(foundCourse.modules[0].lessons[0]);
        }
      }
    }
  }, [courseId, courses, enrollments, user, navigate]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  if (!course) {
    return <div className="p-8 text-center text-slate-500">Loading course...</div>;
  }

  const renderLessonContent = () => {
    if (!activeLesson) return null;

    switch (activeLesson.type) {
      case 'video':
        return (
          <div className="w-full bg-black flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-5xl mx-auto">
              <SecureVideoPlayer src={activeLesson.url} title={activeLesson.title} />
            </div>
          </div>
        );
      case 'pdf':
        return (
          <div className="flex-1 w-full h-full bg-slate-100 p-4 lg:p-8">
            <div className="w-full h-full max-w-5xl mx-auto flex flex-col">
              <PDFReader url={activeLesson.url} title={activeLesson.title} />
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="flex-1 w-full h-full bg-slate-50 overflow-y-auto">
            {activeLesson.quizData ? (
              <QuizPlayer quizData={activeLesson.quizData} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                Quiz data not available.
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getLessonTypeText = (type: string) => {
    switch (type) {
      case 'video': return 'Video Lesson';
      case 'pdf': return 'PDF Document';
      case 'quiz': return 'Quiz';
      default: return 'Lesson';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 -m-6">
      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center px-4 shrink-0 shadow-sm z-10">
        <Link to="/dashboard/courses" className="flex items-center text-slate-500 hover:text-slate-900 transition-colors mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-bold text-slate-900 truncate">{course.title}</h1>
      </div>

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Main Content Area (Video/PDF/Quiz) */}
        <div className="flex-1 bg-slate-900 overflow-y-auto flex flex-col relative">
          {activeLesson ? (
            <div className="flex-1 flex flex-col">
              {renderLessonContent()}
              
              <div className="p-6 lg:p-8 bg-white border-t border-slate-200 shrink-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeLesson.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    {getLessonIcon(activeLesson.type)}
                    {getLessonTypeText(activeLesson.type)}
                  </span>
                  {activeLesson.duration && (
                    <span>• {activeLesson.duration}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              Select a lesson from the sidebar to begin.
            </div>
          )}
        </div>

        {/* Sidebar Curriculum */}
        <div className="w-full lg:w-80 xl:w-96 bg-white border-l border-slate-200 flex flex-col shrink-0 h-[50vh] lg:h-auto overflow-y-auto">
          <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
            <h2 className="font-bold text-slate-900">Course Content</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {course.modules.map((module, mIndex) => (
              <div key={module.id} className="border-b border-slate-100">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Module {mIndex + 1}</div>
                    <div className="font-bold text-slate-800 text-sm">{module.title}</div>
                  </div>
                  {expandedModules[module.id] ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                </button>
                
                {expandedModules[module.id] && (
                  <div className="bg-slate-50 pb-2">
                    {module.lessons.map((lesson, lIndex) => {
                      const isActive = activeLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full flex items-start gap-3 p-3 pl-6 text-left transition-colors ${
                            isActive ? 'bg-brand-50 border-l-2 border-brand-500' : 'hover:bg-slate-100 border-l-2 border-transparent'
                          }`}
                        >
                          <div className={`mt-0.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`}>
                            {getLessonIcon(lesson.type)}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${isActive ? 'text-brand-700' : 'text-slate-700'}`}>
                              {lIndex + 1}. {lesson.title}
                            </div>
                            {lesson.duration && (
                              <div className="text-xs text-slate-500 mt-0.5">{lesson.duration}</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
