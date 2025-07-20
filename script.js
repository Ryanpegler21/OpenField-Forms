const scriptURL = 'https://script.google.com/macros/s/AKfycbytLZ3QhRbrceAKBXRi0SO2fN-wYVjXGdBVez-eSnRuq-e5hiq5QiwmmH_YZi6TDe7O/exec';
const form = document.forms['submit-to-google-sheet'];
const submitButton = document.querySelector('.submit-btn');
const buttonText = document.querySelector('.btn-text');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading state
  submitButton.disabled = true;
  buttonText.style.display = 'none';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  submitButton.appendChild(spinner);
  formStatus.style.display = 'none';

  try {
    // Send form data
    const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    // Redirect to thank-you page
    window.location.href = 'thank-you.html';

  } catch (error) {
    console.error('Error!', error.message);
    formStatus.textContent = 'Something went wrong. Please try again.';
    formStatus.className = 'error';
    formStatus.style.display = 'block';
  } finally {
    // Reset button state if there's an error
    submitButton.disabled = false;
    buttonText.style.display = 'inline';
    submitButton.removeChild(spinner);
  }
});
