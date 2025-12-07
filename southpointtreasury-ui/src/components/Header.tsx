"use client";

// Icons
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const NotificationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);


interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  onMenuClick?: () => void;
}

export default function Header({ title, searchPlaceholder = "Search for transaction, item, etc", onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-button" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <h1 className="header-title">{title}</h1>
        <div className="search-box">
          <SearchIcon />
          <input type="text" placeholder={searchPlaceholder} />
        </div>
      </div>
      <div className="header-right">
        <div className="header-icon">
          <MessageIcon />
        </div>
        <div className="header-icon notification">
          <NotificationIcon />
          <span className="notification-badge"></span>
        </div>
        <div className="header-profile">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Profile" />
          <ChevronDownIcon />
        </div>
      </div>
    </header>
  );
}

