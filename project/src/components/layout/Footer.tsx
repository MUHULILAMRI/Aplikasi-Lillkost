import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-200 dark:bg-dark-200 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-600 dark:text-primary-500">
                <Home size={24} strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight">LILL KOST</span>
            </div>
            <p className="text-dark-500 dark:text-light-400 mb-4">
              LILL KOST helps you find the perfect boarding house with ease. Search, book, and pay for your ideal kost online.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-dark-400 dark:text-light-500 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-dark-400 dark:text-light-500 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-dark-400 dark:text-light-500 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Find Kost
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary-600 dark:text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-dark-500 dark:text-light-400">
                  info@lillkost.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary-600 dark:text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-dark-500 dark:text-light-400">
                  +62 812 3456 7890
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-300 dark:border-dark-300 mt-10 pt-6 text-center text-dark-500 dark:text-light-400">
          <p>© {new Date().getFullYear()} LILL KOST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;