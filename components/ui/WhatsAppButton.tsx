"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "923264380397"; 

  return (
    <a
      href={`https://wa.me/${phone}?text=Hi%20JAZ-X,%20I'm%20interested%20in%20your%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] group"
    >
      <div className="relative">
        {/* Pulse */}
        <span className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping"></span>

        {/* Button */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#25D366] to-[#00C853] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
          <MessageCircle size={30} className="text-white" />
        </div>
      </div>
    </a>
  );
}