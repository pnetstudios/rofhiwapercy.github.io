// Basic interactivity for forms and small UI niceties.
document.addEventListener('DOMContentLoaded', () => {
  // Form handling on chess.html
  const signupForm = document.getElementById('signupForm');
  const status = document.getElementById('formStatus');
  const clearBtn = document.getElementById('clearBtn');

  if (clearBtn) clearBtn.addEventListener('click', () => {
    signupForm.reset();
    status.textContent = '';
  });

  if (!signupForm) return;

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());

    // === Option A: Submit via Formspree (no server required) ===
    // 1) Create a free Formspree form and replace FORM_ENDPOINT below
    const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID'; // <- replace this

    // === Option B: OR submit to your own API (self-hosted) ===
    // const API_ENDPOINT = 'https://your-api.example.com/api/signups';

    try {
      // Choose the endpoint you will use.
      const endpoint = FORM_ENDPOINT; // change to API_ENDPOINT if using your server

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // If using your API, you'll want 'Content-Type': 'application/json'
        },
        body: new URLSearchParams(formData) // Formspree expects form-encoded
      });

      if (res.ok) {
        status.textContent = 'Thanks — your request was sent. I will contact you soon.';
        signupForm.reset();
      } else {
        // Try to parse JSON response from Formspree if available
        const text = await res.text();
        console.warn('non-ok response', res.status, text);
        status.textContent = 'There was an issue submitting the form. Please email you@example.com.';
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Network error. Please check your connection or email you@example.com';
    }
  });
});
