document.addEventListener('submit', async (e) => {
   e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', document.getElementById('img').files[0]);
  
    const url = 'http://localhost:1516/upload';
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      throw new Error('Image upload failed');
    }
  
    const data = await response.json();
    window.location.href=`${data}`;
  });
  