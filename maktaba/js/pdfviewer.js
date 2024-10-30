// Function to get the query parameter (PDF file URL)
function getPDFUrlFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('file');
  }
  
  // Function to render the PDF using PDF.js in sequence (ordered)
  function renderPDF(url) {
    const pdfContainer = document.getElementById('pdf-viewer');
    pdfContainer.innerHTML = ''; // Clear previous content
  
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log('PDF loaded');
  
      const numPages = pdf.numPages;
  
      // Sequential rendering of pages to ensure proper order
      function renderPage(pageNum) {
        pdf.getPage(pageNum).then(function(page) {
          const scale = 1.5; // Adjust the scale to change the size of the rendered PDF
          const viewport = page.getViewport({ scale: scale });
  
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
  
          const renderTask = page.render(renderContext);
          renderTask.promise.then(function() {
            console.log(`Page ${pageNum} rendered`);
            pdfContainer.appendChild(canvas); // Append the canvas to the container
  
            // Render the next page if it exists
            if (pageNum < numPages) {
              renderPage(pageNum + 1); // Render next page
            }
          });
        });
      }
  
      // Start rendering the first page
      renderPage(1);
    }).catch(function(error) {
      console.error('Error rendering PDF:', error);
    });
  }
  
  // Get the PDF file URL from the query and render it
  const pdfUrl = getPDFUrlFromQuery();
  if (pdfUrl) {
    renderPDF(pdfUrl);
  } else {
    console.error('No PDF URL found in the query.');
  }
  