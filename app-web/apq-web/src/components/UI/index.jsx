'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Skeleton Loader Component
export function Skeleton({ className, ...props }) {
  return (
    <div 
      className={cn("animate-pulse bg-gray-200 dark:bg-gray-700 rounded", className)} 
      {...props} 
    />
  );
}

// Card Component
export function Card({ children, className, hover = true, ...props }) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm",
        hover && "hover:shadow-lg transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Button Component
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  loading = false,
  disabled = false,
  ...props 
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        "font-semibold rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// Input Component
export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-colors focus:outline-none",
          error 
            ? "border-red-500 focus:border-red-600" 
            : "border-gray-200 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-400",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Badge Component
export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}

// Toast Notification Component (Simple implementation)
export function Toast({ message, type = 'success', onClose }) {
  const types = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div className={cn("fixed bottom-4 right-4 px-6 py-4 rounded-xl text-white shadow-lg flex items-center gap-3 animate-slide-up z-50", types[type])}>
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Modal Component
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
