"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/company/tarvina-yaz-l-m-teknoloji/posts/?feedView=all" },
  { icon: <Instagram size={20} />, url: "https://www.instagram.com/tarvinacom/" },
];

const SocialIcons: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 flex flex-col gap-4 p-2">
      {socialLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-brand hover:text-white transition-all duration-300"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;

