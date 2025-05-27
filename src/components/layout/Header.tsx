"use client";

import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const scrollingText =
    "*** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS *** FASTER DOCKER BUILDS ***";

  return (
    <>
      {/* Mobile header with menu button */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-black font-bold text-sm">B</span>
          </div>
          <span className="text-white font-semibold">blacksmith</span>
        </div>
        <button
          onClick={onMenuClick}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Scrolling banner */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden relative">
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-sm font-medium">{scrollingText}</span>
        </div>
      </div>
    </>
  );
};
