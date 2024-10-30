document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  let category = '';

  if (path.includes('nyumbayahaki')) {
    category = 'nyumbayahaki';
  } else if (path.includes('kujiimarisha')) {
    category = 'kujiimarisha';
  } else if (path.includes('historia')) {
    category = 'historia';
  }

  if (category) {
    fetch('../../data.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById(`${category}-container`);
        
        if (!container) {
          console.error(`Container for category ${category} not found.`);
          return;
        }

        const books = data[category] || [];

        books.forEach(book => {
          const bookCard = document.createElement('div');
          bookCard.className = 'col-md-4';
          bookCard.innerHTML = `
            <div class="card mb-4 border-0 rounded-3 position-relative">
              <div class="swiper-slide slide-categories">
                <div class="card position-relative p-4 border rounded-3">
                  <a href="#" class="open-pdf" data-pdf-url="${book.link}">
                    <img src="${book.image}" class="img-fluid shadow-sm" alt="${book.title}">
                    <h6 class="mt-4 mb-0 fw-bold">${book.title}</h6>
                  </a>
                  <div class="review-content d-flex">
                    <p class="my-2 me-2 fs-6 text-black-50">${book.description}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          container.appendChild(bookCard);
        });

        // Add click event listeners to open the PDF in a new tab
        document.querySelectorAll('.open-pdf').forEach(link => {
          link.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent default link behavior
            const pdfUrl = this.dataset.pdfUrl;  // Get the PDF URL from the data attribute
            
            // Open the new tab and pass the URL as a query parameter
            window.open(`pdfviewer.html?file=${encodeURIComponent(pdfUrl)}`, '_blank');
          });
        });
      
      })
      .catch(error => console.error('Error loading books:', error));
  } else {
    console.error('Category could not be determined from the URL.');
  }
});
