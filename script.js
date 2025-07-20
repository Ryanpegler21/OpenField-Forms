const scriptURL = 'https://script.google.com/macros/s/AKfycbytLZ3QhRbrceAKBXRi0SO2fN-wYVjXGdBVez-eSnRuq-e5hiq5QiwmmH_YZi6TDe7O/exec';
const form = document.forms['submit-to-google-sheet'];
const submitButton = document.querySelector('.submit-btn');
const buttonText = document.querySelector('.btn-text');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Show loading state
  submitButton.disabled = true;
  buttonText.style.display = 'none';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  submitButton.appendChild(spinner);
  formStatus.style.display = 'none';

  try {
    // 2. Send the data
    const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    // 3. Handle success
    formStatus.textContent = "Thank you for joining! We'll be in touch soon.";
    formStatus.className = 'success';
    formStatus.style.display = 'block';
    form.reset();
    form.style.display = 'none'; // Optionally hide form on success

  } catch (error) {
    // 4. Handle errors
    console.error('Error!', error.message);
    formStatus.textContent = 'Something went wrong. Please try again.';
    formStatus.className = 'error';
    formStatus.style.display = 'block';

  } finally {
    // 5. Reset button state (only if there was an error)
    submitButton.disabled = false;
    buttonText.style.display = 'inline';
    submitButton.removeChild(spinner);
  }
});

