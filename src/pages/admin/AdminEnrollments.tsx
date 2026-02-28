import React, { useState } from 'react';
import { Search, ShieldCheck, Trash2, UserCheck, BookOpen } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useCourses } from '@/src/contexts/CourseContext';

export function AdminEnrollments() {
  const { courses, enrollments, grantAccess, revokeAccess } = useCourses();
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const handleGrantAccess = () => {
    if (!email || !selectedCourseId) {
      alert("Please enter an email and select a course.");
      return;
    }
    grantAccess(email, selectedCourseId);
    setEmail('');
    setSelectedCourseId('');
    alert("Access granted successfully!");
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Course Access Management</h1>
        <p className="text-slate-400">Manually grant or revoke user access to LMS courses.</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-400" /> Grant Access
        </h2>
        <div className="grid md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-slate-300 mb-1">User Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-slate-300 mb-1">Select Course</label>
            <select 
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
            >
              <option value="">-- Choose a course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Button onClick={handleGrantAccess} className="w-full bg-brand-600 hover:bg-brand-500 text-white h-[42px]">
              Grant
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white">Active Enrollments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-medium border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">Course Enrolled</th>
                <th className="px-6 py-4">Granted On</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No active enrollments found.
                  </td>
                </tr>
              ) : (
                enrollments.map((enrollment) => {
                  const course = courses.find(c => c.id === enrollment.courseId);
                  return (
                    <tr key={enrollment.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{enrollment.userEmail}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-brand-400" />
                          {course ? course.title : <span className="text-red-400">Course Deleted</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(enrollment.grantedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            if(confirm('Revoke access for this user?')) revokeAccess(enrollment.id);
                          }}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Revoke Access"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
