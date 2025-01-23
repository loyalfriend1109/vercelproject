// Initialize EmailJS
    emailjs.init("RZeLqZZY8D09xiGN3"); // Replace with your EmailJS Public Key

  // Handle form submission
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const name1 = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;

// Here you would typically send this data to your server
console.log('Form submitted:', {
    name1,
    email,
    message
});

    // Send the email
    emailjs.send("service_1kxibqc", "template_jwv3jv7", {
      user_name: name1,
      user_email: email,
      user_message: message,
    })
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      alert("Failed to send message. Please try again.");
      console.error("EmailJS Error:", error);
    });
  });