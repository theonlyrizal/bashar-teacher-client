import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-2xl mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Bashar Teacher</span>
            </h3>
            <p className="text-sm">
              Connecting students with qualified tutors across Bangladesh. Making education accessible and affordable for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/tuitions" className="link link-hover">Browse Tuitions</Link></li>
              <li><Link to="/tutors" className="link link-hover">Find Tutors</Link></li>
              <li><Link to="/about" className="link link-hover">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="link link-hover">Contact Us</Link></li>
              <li><Link to="/faq" className="link link-hover">FAQ</Link></li>
              <li><Link to="/privacy" className="link link-hover">Privacy Policy</Link></li>
              <li><Link to="/terms" className="link link-hover">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@basharteacher.com</li>
              <li>Phone: +880 1XXX-XXXXXX</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaXTwitter className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          <p>&copy; {currentYear} Bashar Teacher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
