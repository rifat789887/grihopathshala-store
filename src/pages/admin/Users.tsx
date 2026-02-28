import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Edit2, Ban, CheckCircle2, Shield, User as UserIcon, X, Save, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useAuth } from '@/src/contexts/AuthContext';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Student';
  status: 'Active' | 'Blocked';
  joinDate: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'Md Rifat', email: 'mdrifat.contact@gmail.com', role: 'Super Admin', status: 'Active', joinDate: '2024-01-15' },
  { id: '2', name: 'Rahim Uddin', email: 'rahim@example.com', role: 'Student', status: 'Active', joinDate: '2024-02-10' },
  { id: '3', name: 'Karim Hasan', email: 'karim@example.com', role: 'Student', status: 'Blocked', joinDate: '2024-02-18' },
  { id: '4', name: 'Sadia Islam', email: 'sadia@example.com', role: 'Student', status: 'Active', joinDate: '2024-02-20' },
  { id: '5', name: 'Test User', email: 'test@example.com', role: 'Student', status: 'Active', joinDate: '2024-02-25' },
];

export function Users() {
  const { user: currentUser } = useAuth();
  const isSuperAdmin = currentUser?.email === 'mdrifat.contact@gmail.com';

  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  
  // Edit Form State
  const [editForm, setEditForm] = useState({ name: '', role: 'Student' as 'Super Admin' | 'Admin' | 'Student' });
  
  // Add Form State
  const [addForm, setAddForm] = useState({ name: '', email: '', role: 'Student' as 'Admin' | 'Student' });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleBlock = (id: string) => {
    if (!isSuperAdmin) {
      alert("Only the Super Admin can change user status.");
      return;
    }
    setUsers(users.map(user => {
      if (user.id === id) {
        if (user.email === 'mdrifat.contact@gmail.com') {
          alert("You cannot block the Super Admin.");
          return user;
        }
        return { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return user;
    }));
  };

  const handleDeleteUser = (id: string, email: string) => {
    if (!isSuperAdmin) {
      alert("Only the Super Admin can remove members.");
      return;
    }
    if (email === 'mdrifat.contact@gmail.com') {
      alert("You cannot remove the Super Admin.");
      return;
    }
    if (confirm("Are you sure you want to remove this user? This action cannot be undone.")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const openEditModal = (user: UserData) => {
    setEditingUser(user);
    setEditForm({ name: user.name, role: user.role });
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name: editForm.name, role: editForm.role } : u));
      setEditingUser(null);
    }
  };

  const handleAddUser = () => {
    if (!addForm.name || !addForm.email) {
      alert("Please fill in all required fields.");
      return;
    }
    const newUser: UserData = {
      id: Date.now().toString(),
      name: addForm.name,
      email: addForm.email,
      role: addForm.role,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([newUser, ...users]);
    setIsAddingUser(false);
    setAddForm({ name: '', email: '', role: 'Student' });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400">View, edit, and manage user access.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          {isSuperAdmin && (
            <Button onClick={() => setIsAddingUser(true)} className="bg-brand-600 hover:bg-brand-500 text-white whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" /> Add Member
            </Button>
          )}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 uppercase font-medium border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {user.role === 'Super Admin' ? (
                          <Shield className="h-4 w-4 text-amber-400" />
                        ) : user.role === 'Admin' ? (
                          <Shield className="h-4 w-4 text-brand-400" />
                        ) : (
                          <UserIcon className="h-4 w-4 text-slate-400" />
                        )}
                        <span className={user.role === 'Super Admin' ? 'text-amber-400 font-bold' : user.role === 'Admin' ? 'text-brand-400 font-medium' : ''}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.status === 'Active' ? (
                        <Badge variant="default" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>
                      ) : (
                        <Badge variant="danger" className="bg-red-500/10 text-red-400 border-red-500/20">Blocked</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {isSuperAdmin && (
                          <React.Fragment>
                            <button 
                              onClick={() => handleToggleBlock(user.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                user.status === 'Active' 
                                  ? 'text-slate-400 hover:text-amber-400 hover:bg-amber-500/10' 
                                  : 'text-amber-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                              }`}
                              title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                            >
                              {user.status === 'Active' ? <Ban className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id, user.email)}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Remove User"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Add New Member</h3>
                <button 
                  onClick={() => setIsAddingUser(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                  <select 
                    value={addForm.role}
                    onChange={(e) => setAddForm({ ...addForm, role: e.target.value as 'Admin' | 'Student' })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
                <Button variant="outline" onClick={() => setIsAddingUser(false)} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="bg-brand-600 hover:bg-brand-500 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add Member
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Edit User</h3>
                <button 
                  onClick={() => setEditingUser(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                  <input 
                    type="text" 
                    value={editingUser.email}
                    disabled
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                  <select 
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'Super Admin' | 'Admin' | 'Student' })}
                    disabled={editingUser.email === 'mdrifat.contact@gmail.com' || !isSuperAdmin}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingUser.email === 'mdrifat.contact@gmail.com' && <option value="Super Admin">Super Admin</option>}
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {editingUser.email === 'mdrifat.contact@gmail.com' && (
                    <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Super Admin role cannot be changed.
                    </p>
                  )}
                  {!isSuperAdmin && editingUser.email !== 'mdrifat.contact@gmail.com' && (
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Only Super Admin can change roles.
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
                <Button variant="outline" onClick={() => setEditingUser(null)} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="bg-brand-600 hover:bg-brand-500 text-white">
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
