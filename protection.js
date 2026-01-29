/**
 * Source Code Protection Module
 * @file Prevents unauthorized access to source code and developer tools
 * @version 1.0.0
 * @author ClubConnect Development Team
 * 
 * This module disables:
 * - Developer tools (F12)
 * - View source (Ctrl+U)
 * - Inspect element (Ctrl+Shift+C, Ctrl+Shift+I)
 * - Console (Ctrl+Shift+J)
 * - Right-click context menu
 * 
 * @note This is a client-side protection and should not be relied upon as the sole
 * security measure. Always implement server-side security measures.
 */

// ==========================================
// SOURCE CODE PROTECTION SCRIPT
// ==========================================
// Disables F12, Ctrl+U, Right Click, Inspect Element, and all developer tools access

(function() {
  'use strict';

  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, false);

  // Disable keyboard shortcuts for developer tools
  document.addEventListener('keydown', function(e) {
    // F12 - Developer Tools
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I - Developer Tools
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+C - Inspect Element
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U - View Source
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+S - Save Page
    if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+K - Firefox Console
    if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.keyCode === 75)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+M - Responsive Design Mode
    if (e.ctrlKey && e.shiftKey && (e.key === 'M' || e.keyCode === 77)) {
      e.preventDefault();
      return false;
    }
    
    // F1 - Help (sometimes opens dev tools)
    if (e.key === 'F1' || e.keyCode === 112) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+E - Network panel (Firefox)
    if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.keyCode === 69)) {
      e.preventDefault();
      return false;
    }
  }, false);

  // Detect if DevTools is open (basic detection)
  const devToolsChecker = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      // DevTools likely open - you can redirect or show warning
      // For now, we'll just try to close it
      window.blur();
      document.body.innerHTML = '';
      window.location.reload();
    }
  };

  // Check periodically
  setInterval(devToolsChecker, 1000);

  // Disable text selection (optional - uncomment if needed)
  // document.addEventListener('selectstart', function(e) {
  //   e.preventDefault();
  //   return false;
  // }, false);

  // Disable copy (optional - uncomment if needed)
  // document.addEventListener('copy', function(e) {
  //   e.preventDefault();
  //   return false;
  // }, false);

  // Disable drag (optional - uncomment if needed)
  // document.addEventListener('dragstart', function(e) {
  //   e.preventDefault();
  //   return false;
  // }, false);

  // Clear console periodically
  setInterval(function() {
    console.clear();
  }, 2000);

  // Override console methods
  if (window.console) {
    const noop = function() {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'profile', 'profileEnd', 'dirxml', 'assert', 'count', 'markTimeline', 'timeStamp', 'clear'];
    
    for (let i = 0; i < methods.length; i++) {
      console[methods[i]] = noop;
    }
  }

  // Prevent inspect element via mouse event
  document.addEventListener('mousedown', function(e) {
    if (e.button === 2) {
      e.preventDefault();
      return false;
    }
  }, false);

  // Debugger detection and prevention
  setInterval(function() {
    (function() {
      return false;
    })['constructor']('debugger')();
  }, 50);

})();
