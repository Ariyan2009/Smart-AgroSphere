const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.getAttribute('data-value');
        stars.forEach(s => s.classList.remove('selected'));
        star.classList.add('selected');
    });
});

document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const suggestion = document.getElementById('suggestion').value;

    if (!selectedRating) {
        alert('Please select a rating.');
        return;
    }

    const data = { name, rating: selectedRating, suggestion };

    // Send data to Google Apps Script
    try {
        const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Review successfully sent!');
            document.getElementById('reviewForm').reset();
            stars.forEach(s => s.classList.remove('selected'));
            selectedRating = 0;
        } else {
            alert('Failed to send review.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
