import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Brain, 
  Menu, 
  X, 
  Zap,
  Home,
  Settings,
  LogOut,
  ChevronRight,
  Globe
} from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Top notification bar */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-center py-2 text-sm font-medium">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>AI-powered bookmark organization • Save smarter, not harder</span>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-slate-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo with different approach */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Zap className="w-2 h-2 text-slate-900" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight">SaveSmart</h1>
                  <p className="text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                    Intelligent Bookmarking
                  </p>
                </div>
              </div>
            </Link>

            {/* Center navigation - completely different approach */}
            <nav className="hidden lg:flex items-center bg-slate-800/50 rounded-full px-6 py-3 backdrop-blur-sm border border-slate-700">
              <div className="flex items-center space-x-8">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Home</span>
                </Link>
                
                {user && (
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">My Links</span>
                  </Link>
                )}
                
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
              </div>
            </nav>

            {/* Right side - Auth section with card design */}
            <div className="hidden lg:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white truncate max-w-32">
                          {user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-slate-400">Pro User</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="ml-2 p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                        title="Sign Out"
                      >
                        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-6 shadow-lg hover:shadow-cyan-500/25">
                      Start Free
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-700 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-out menu */}
        <div className={`lg:hidden fixed inset-y-0 right-0 z-50 w-80 bg-slate-900 border-l border-slate-700 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-slate-800 transition-colors group"
              >
                <Home className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Home</span>
                <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>

              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 p-4 rounded-xl hover:bg-slate-800 transition-colors group"
                >
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">My Links</span>
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-400">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </nav>

            {user ? (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{user.email}</p>
                      <p className="text-xs text-slate-400">Pro Account</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full justify-center bg-transparent border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;