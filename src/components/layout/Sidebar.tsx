"use client";

import React from "react";
import { NavItem } from "@/types/dashboard";
import {
  BarChart3,
  Settings,
  MessageSquare,
  GitBranch,
  Container,
  Database,
  Shield,
  CreditCard,
  X,
} from "lucide-react";

interface SidebarProps {
  navigationItems: NavItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

const getIcon = (id: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    feedback: <MessageSquare className="w-4 h-4" />,
    "actions-analytics": <BarChart3 className="w-4 h-4" />,
    "workflow-runs": <GitBranch className="w-4 h-4" />,
    "docker-builds": <Container className="w-4 h-4" />,
    cache: <Database className="w-4 h-4" />,
    "study-risks": <Shield className="w-4 h-4" />,
    "usage-billing": <CreditCard className="w-4 h-4" />,
    settings: <Settings className="w-4 h-4" />,
  };

  return iconMap[id] || <BarChart3 className="w-4 h-4" />;
};

export const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  isOpen = true,
  onClose,
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        lg:transform-none
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between p-4 lg:justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">B</span>
              </div>
              <span className="text-white font-semibold">blacksmith</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.id}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => {
                    // Handle navigation
                    if (onClose) onClose();
                  }}
                >
                  {getIcon(item.id)}
                  <span>{item.label}</span>
                </button>
              </div>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="p-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-400 text-xs font-medium">
                  STORAGE PERFORMANCE
                </span>
              </div>
              <div className="text-white text-sm">
                <div>CPU Usage</div>
                <div className="text-xs text-gray-400">85%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
