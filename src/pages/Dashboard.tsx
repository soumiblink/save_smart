import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BookmarkForm from '../components/bookmarks/BookmarkForm';
import BookmarkList from '../components/bookmarks/BookmarkList';
import TagFilter from '../components/bookmarks/TagFilter';
import type { Bookmark, BookmarkFormData } from '../types/types';
import { addBookmark, deleteBookmark, fetchBookmarks } from '../services/bookmark.service';
import { 
  BookmarkPlus, 
  Search, 
  Filter,
  TrendingUp,
  Calendar,
  Tag,
  Plus,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user) {
      loadBookmarks();
    }
  }, [user]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const loadBookmarks = async () => {
    try {
      const data = await fetchBookmarks(user!.id);
      setBookmarks(data);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setError('Failed to load bookmarks. Please try again.');
    }
  };

  const handleAddBookmark = async (data: BookmarkFormData) => {
    setError(null);
    setSuccess(null);
    try {
      setIsLoading(true);
      const tags = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];
      
      const newBookmark = await addBookmark({ ...data, tags }, user!.id);
      setBookmarks([newBookmark, ...bookmarks]);
      setSuccess('Bookmark saved successfully!');
      setShowAddForm(false);
      
      if (newBookmark.summary === null) {
        setError('Bookmark saved, but summary generation failed. You can try updating the bookmark later.');
      }
    } catch (error: any) {
      console.error('Error adding bookmark:', error);
      const errorDetails = error.response?.data?.details || error.message;
      setError(`Failed to save bookmark: ${errorDetails}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    try {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter(b => b.id !== id));
      setSuccess('Bookmark deleted successfully!');
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      setError('Failed to delete bookmark. Please try again.');
    }
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const allTags = Array.from(
    new Set(bookmarks.flatMap(b => b.tags || []))
  ).sort();

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchTerm === '' || 
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bookmark.summary && bookmark.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => bookmark.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const recentBookmarks = bookmarks.slice(0, 3);
  const totalBookmarks = bookmarks.length;
  const totalTags = allTags.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob dark:opacity-5"></div>
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000 dark:opacity-5"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000 dark:opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                Your Dashboard
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mt-2">
                Welcome back, {user?.name || user?.email}
              </p>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Bookmark
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Total Bookmarks</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{totalBookmarks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookmarkPlus className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Total Tags</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{totalTags}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {bookmarks.filter(b => {
                    const bookmarkDate = new Date(b.createdAt || Date.now());
                    const now = new Date();
                    return bookmarkDate.getMonth() === now.getMonth() && bookmarkDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-800 dark:text-green-200">{success}</p>
            <button
              onClick={() => setSuccess(null)}
              className="ml-auto text-green-500 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Add Bookmark Form */}
        {showAddForm && (
          <div className="mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BookmarkPlus className="w-5 h-5" />
                  Add New Bookmark
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <BookmarkForm
                onSubmit={handleAddBookmark}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Filter Info */}
              {selectedTags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {selectedTags.length} filter{selectedTags.length !== 1 ? 's' : ''} active
                  </span>
                </div>
              )}
            </div>
            
            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                <TagFilter
                  tags={allTags}
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Your Bookmarks
                <span className="text-lg font-normal text-slate-500 dark:text-slate-400">
                  ({filteredBookmarks.length})
                </span>
              </h2>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <BookmarkList
                bookmarks={filteredBookmarks}
                onDelete={handleDeleteBookmark}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;