import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-1 bottom-0 left-0 w-full">
      <div className="container mx-auto px-3">
        <p className="text-center mb-2">
          &copy; {new Date().getFullYear()} Job<span className='text-purple-500'>Junction</span>. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-of-service" className="hover:text-gray-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-400">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
