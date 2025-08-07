"use client";

interface TitleBarProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export default function TitleBar({ onMenuClick }: TitleBarProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white h-full shadow-md">
      <div className="px-8 py-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden text-white hover:text-blue-200 bg-transparent border-none p-1 cursor-pointer transition-colors mr-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-[18px] h-[18px] text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold m-0 leading-tight">Fara</h1>
            <p className="text-blue-200 text-sm m-0 leading-tight">
              Route Optimizer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-200">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">Optimize travel routes efficiently</span>
          </div>
        </div>
      </div>
    </header>
  );
}
