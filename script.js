function showSection(sectionId) {
    if (typeof display === 'function') {
        display(sectionId);
        return;
    }

    var section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

var bookingModal = document.getElementById('bookingModal');
var closeBooking = document.getElementById('closeBooking');
var bookingForm = document.getElementById('bookingForm');
var selectedTest = document.getElementById('selectedTest');
var selectedPrice = document.getElementById('selectedPrice');
var selectedTestText = document.getElementById('selectedTestText');
var bookingMessage = document.getElementById('bookingMessage');
var patientName = document.getElementById('patientName');
var testCards = document.querySelectorAll('.test-card');

function openBookingForm(card) {
    var testName = card.querySelector('h4').textContent.trim();
    var testPrice = card.querySelector('p').textContent.trim();

    selectedTest.value = testName;
    selectedPrice.value = testPrice;
    selectedTestText.textContent = testName + ' - ' + testPrice;
    bookingMessage.textContent = '';
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    patientName.focus();
}

function closeBookingForm() {
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    bookingForm.reset();
    bookingMessage.textContent = '';
}

testCards.forEach(function(card) {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', function() {
        openBookingForm(card);
    });

    card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openBookingForm(card);
        }
    });
});

closeBooking.addEventListener('click', closeBookingForm);

bookingModal.addEventListener('click', function(event) {
    if (event.target === bookingModal) {
        closeBookingForm();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeBookingForm();
    }
});

bookingForm.addEventListener('submit', function(event) {
    bookingMessage.textContent = 'Sending your booking...';
});
