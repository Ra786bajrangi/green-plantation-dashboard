import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} GreenTrack. All rights reserved.</p>
        <p className="mt-1 text-xs text-green-100">Made with ❤️ for a greener planet.</p>
      </div>
    </footer>
  );
};

export default Footer;
