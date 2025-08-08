import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookmarkPlus, 
  Share2, 
  Zap, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  Shield, 
  Clock,
  Star,
  Users
} from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:opacity-10"></div>
          <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                AI-Powered Bookmark Management
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
              Never Lose a
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Great Link Again
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Save, organize, and rediscover your favorite content with AI-powered summaries and intelligent search.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg"
                >
                  Start for Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Privacy focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to
              <span className="text-blue-600 dark:text-blue-400"> stay organized</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to make bookmark management effortless and intelligent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <BookmarkPlus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Smart Saving
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Just paste any URL and our AI automatically extracts title, description, and generates intelligent tags for easy organization.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                AI Summaries
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Get instant, intelligent summaries of your saved content. Never forget why you saved something important.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-700 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Universal Access
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Access your bookmarks from any device, anywhere. Real-time sync keeps everything up to date.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-700 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Share2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Smart Sharing
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Create curated collections and share them with teams or make them public for the community.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-cyan-200 dark:hover:border-cyan-700 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Time Travel
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Never lose content to broken links. We archive snapshots so you can access content even if the original disappears.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Smart Search
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Find anything instantly with AI-powered search that understands context, not just keywords.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Add CSS for animations */}
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

export default Home;