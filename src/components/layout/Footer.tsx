import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Heart, 
  Twitter, 
  Github, 
  Linkedin, 
  Mail,
  Zap,
  Globe,
  Shield,
  BookOpen,
  Coffee
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background pattern matching header */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Brand section - matches header logo */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Zap className="w-1.5 h-1.5 text-slate-900" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">SaveSmart</h3>
                  <p className="text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                    Intelligent Bookmarking
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                AI-powered bookmark organization that helps you save smarter, not harder. 
                Transform chaos into clarity.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com" 
                  className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a 
                  href="https://github.com" 
                  className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a 
                  href="mailto:hello@savesmart.com" 
                  className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-emerald-400" />
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Dashboard</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Features</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Pricing</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Integrations</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support links */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-cyan-400" />
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Help Center</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Documentation</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>API Reference</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Contact Us</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal links */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-400" />
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Privacy Policy</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Terms of Service</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Cookie Policy</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span>Security</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar with gradient - matches header notification */}
        <div className="border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <p>
                  © {currentYear} SaveSmart, Inc. All rights reserved.
                </p>
                <div className="hidden lg:flex items-center space-x-2 text-xs">
                  <span>Made with</span>
                  <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                  <span>by</span>
                  <span className="font-semibold text-white">Soumi Ghosh</span>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400">All systems operational</span>
                </div>
                <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-500">
                  <Coffee className="w-3 h-3" />
                  <span>Powered by caffeine</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient bottom accent - matches header notification bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
      </div>
    </footer>
  );
};

export default Footer;