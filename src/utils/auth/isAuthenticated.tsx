export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false; // Server-side guard
  
    const token = localStorage.getItem('accessToken'); // or sessionStorage or cookies
    return !!token;
  }
  