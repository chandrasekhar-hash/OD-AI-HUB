// Public API client for OD AI HUB Website
// Resolves AWS server connection issues by adapting to host, protocol, and reverse proxies dynamically
const getApiBase = () => {
  if (typeof window === 'undefined') return '/api/v1';
  if (window.location.protocol === 'file:') return 'http://localhost:8000/api/v1';
  // If running on Vite dev server (port 3000 or 5173), route to the same host on backend port 8000
  if (window.location.port === '3000' || window.location.port === '5173') {
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1`;
  }
  // If running on any server (AWS EC2, Docker, port 80, port 443, port 8000), use relative path
  return '/api/v1';
};
const API_BASE = getApiBase();

window.odApi = {
  // Fetch active categories
  getCategories: async () => {
    try {
      const res = await fetch(`${API_BASE}/academy/categories`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to load categories:', err);
      return [];
    }
  },

  // Fetch published courses for category slug
  getCategoryCourses: async (categorySlug) => {
    try {
      const res = await fetch(`${API_BASE}/academy/categories/${encodeURIComponent(categorySlug)}/courses`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Failed to load courses for ${categorySlug}:`, err);
      return [];
    }
  },

  // Fetch published course detail by slug
  getCourseDetail: async (courseSlug) => {
    try {
      const res = await fetch(`${API_BASE}/academy/courses/${encodeURIComponent(courseSlug)}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Failed to load course ${courseSlug}:`, err);
      return null;
    }
  },

  // Fetch animated counters
  getStats: async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to load stats:', err);
      return [];
    }
  },

  // Fetch student testimonials
  getTestimonials: async () => {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to load testimonials:', err);
      return [];
    }
  },

  // Fetch FAQs
  getFaqs: async () => {
    try {
      const res = await fetch(`${API_BASE}/faqs`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      return [];
    }
  },

  // Submit visitor enquiry
  submitEnquiry: async (data) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.detail || `Submission failed (HTTP ${res.status})`);
    }
    return await res.json();
  }
};
