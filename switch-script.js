
function switchlanguage() {
    // Select all elements with the class "englishtext"
    const elements = document.querySelectorAll('.switchlanguage');

    // Loop through each element and toggle the "hidden" class
    elements.forEach(element => {
      element.classList.toggle('hidden');
    });
    document.getElementById('name').placeholder = document.getElementById('name').placeholder == "Name" ? "Όνομα" : "Name";
    document.getElementById('email').placeholder = document.getElementById('email').placeholder == "Email" ? "Ηλεκτρονική Διεύθυνση" : "Email";
    document.getElementById('message').placeholder = document.getElementById('message').placeholder == "Tell us about your project" ? "Πείτε μας για το έργο σας" : "Tell us about your project";
  }

