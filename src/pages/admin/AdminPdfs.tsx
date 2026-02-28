import React, { useState } from 'react';
import { usePdfs, Pdf } from '@/src/contexts/PdfContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { Plus, Edit, Trash2, Search, FileText, Users, X } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function AdminPdfs() {
  const { pdfs, addPdf, updatePdf, deletePdf, assignPdfToUser, removePdfFromUser } = usePdfs();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Pdf>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [managingAccessId, setManagingAccessId] = useState<string | null>(null);
  const [userIdInput, setUserIdInput] = useState('');

  const filteredPdfs = pdfs.filter(pdf => 
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updatePdf(editingId, formData);
      setEditingId(null);
    } else {
      addPdf({
        title: formData.title || 'Untitled PDF',
        url: formData.url || '',
        coverImage: formData.coverImage,
        description: formData.description,
        assignedUserIds: [],
      });
      setIsAdding(false);
    }
    setFormData({});
  };

  const handleEdit = (pdf: Pdf) => {
    setFormData(pdf);
    setEditingId(pdf.id);
    setIsAdding(true);
  };

  const handleAddAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (managingAccessId && userIdInput.trim()) {
      assignPdfToUser(managingAccessId, userIdInput.trim());
      setUserIdInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage PDFs</h1>
          <p className="text-slate-400">Add and manage PDF resources</p>
        </div>
        <Button onClick={() => { setIsAdding(true); setFormData({}); setEditingId(null); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add PDF
        </Button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit PDF' : 'Add New PDF'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">PDF URL</label>
                <input
                  type="url"
                  required
                  value={formData.url || ''}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Cover Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.coverImage || ''}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Save Changes' : 'Add PDF'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {managingAccessId && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Manage Access</h2>
            <Button variant="outline" size="sm" onClick={() => setManagingAccessId(null)}>Close</Button>
          </div>
          
          <form onSubmit={handleAddAccess} className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter User ID (e.g., user-1)"
              value={userIdInput}
              onChange={e => setUserIdInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
            />
            <Button type="submit">Grant Access</Button>
          </form>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-400">Users with access:</h3>
            {pdfs.find(p => p.id === managingAccessId)?.assignedUserIds.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No users have access to this PDF yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {pdfs.find(p => p.id === managingAccessId)?.assignedUserIds.map(userId => (
                  <div key={userId} className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700">
                    <span className="text-slate-300 text-sm">{userId}</span>
                    <button 
                      onClick={() => removePdfFromUser(managingAccessId, userId)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search PDFs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">PDF Info</th>
                <th className="px-6 py-4">Access</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredPdfs.map((pdf) => (
                <tr key={pdf.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                        {pdf.coverImage ? (
                          <img src={pdf.coverImage} alt={pdf.title} className="h-full w-full object-cover" />
                        ) : (
                          <FileText className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">{pdf.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-xs">{pdf.description || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>{pdf.assignedUserIds.length} users</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setManagingAccessId(pdf.id)}>
                        Manage Access
                      </Button>
                      <button
                        onClick={() => handleEdit(pdf)}
                        className="p-2 text-slate-400 hover:text-brand-400 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deletePdf(pdf.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
