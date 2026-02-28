import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Layers } from 'lucide-react';
import { useCourses } from '@/src/contexts/CourseContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { Button } from '@/src/components/ui/Button';

export function MyCourses() {
  const { courses, enrollments } = useCourses();
  const { user } = useAuth();

  if (!user) return null;

  // Find courses the user is enrolled in
  const userEnrollments = enrollments.filter(e => e.userEmail === user.email);
  const enrolledCourses = courses.filter(course => 
    userEnrollments.some(e => e.courseId === course.id)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
        <p className="text-slate-600">Access your purchased learning materials here.</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
            <BookOpen className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No courses yet</h3>
          <p className="text-slate-600 mb-6 max-w-md">You haven't been granted access to any courses yet. If you recently purchased a course, please wait for admin approval.</p>
          <Link to="/products">
            <Button className="bg-brand-600 hover:bg-brand-500">Browse Store</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => {
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            
            return (
              <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-video bg-slate-100 relative">
                  {course.imageUrl ? (
                    <img src={course.imageUrl || undefined} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <BookOpen className="h-12 w-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-3 text-white text-sm font-medium">
                      <span className="flex items-center gap-1"><Layers className="h-4 w-4" /> {course.modules.length} Modules</span>
                      <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" /> {totalLessons} Lessons</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 line-clamp-2">{course.description}</p>
                  
                  <div className="mt-auto">
                    <Link to={`/dashboard/courses/${course.id}`}>
                      <Button className="w-full bg-brand-50 text-brand-700 hover:bg-brand-100 border-none font-bold">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
