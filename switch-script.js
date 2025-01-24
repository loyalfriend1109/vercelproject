
function switchlanguage() {
    // Select all elements with the class "englishtext"
    const elements = document.querySelectorAll('.switchlanguage');

    // Loop through each element and toggle the "hidden" class
    elements.forEach(element => {
      element.classList.toggle('hidden');
    });
  }