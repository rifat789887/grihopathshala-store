import React, { createContext, useContext, useState, useEffect } from 'react';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  url: string;
  duration?: string;
  quizData?: QuizData;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  modules: Module[];
}

export interface Enrollment {
  id: string;
  userEmail: string;
  courseId: string;
  grantedAt: string;
}

interface CourseContextType {
  courses: Course[];
  enrollments: Enrollment[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Omit<Course, 'id'>) => void;
  deleteCourse: (id: string) => void;
  grantAccess: (userEmail: string, courseId: string) => void;
  revokeAccess: (id: string) => void;
}

const initialCourses: Course[] = [
  {
    id: 'c1',
    title: 'SSC Physics Masterclass',
    description: 'Complete video course for SSC Physics with detailed notes.',
    imageUrl: 'https://picsum.photos/seed/physics_course/800/600',
    modules: [
      {
        id: 'm1',
        title: 'Chapter 1: Physical Quantities and Measurement',
        lessons: [
          { id: 'l1', title: 'Introduction to Physics', type: 'video', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', duration: '10:00' },
          { id: 'l2', title: 'Chapter 1 Notes', type: 'pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
        ]
      }
    ]
  }
];

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('grihopathshala_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem('grihopathshala_enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('grihopathshala_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('grihopathshala_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...courseData, id: Date.now().toString() };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updatedData: Omit<Course, 'id'>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    // Also remove related enrollments
    setEnrollments(prev => prev.filter(e => e.courseId !== id));
  };

  const grantAccess = (userEmail: string, courseId: string) => {
    // Check if already enrolled
    if (enrollments.some(e => e.userEmail === userEmail && e.courseId === courseId)) {
      return;
    }
    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      userEmail,
      courseId,
      grantedAt: new Date().toISOString()
    };
    setEnrollments(prev => [newEnrollment, ...prev]);
  };

  const revokeAccess = (id: string) => {
    setEnrollments(prev => prev.filter(e => e.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, enrollments, addCourse, updateCourse, deleteCourse, grantAccess, revokeAccess }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
