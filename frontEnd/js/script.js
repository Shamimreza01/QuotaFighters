import {makeUrl } from "./common.js";
import sliceDetails from "./common.js";
async function getData() {
    const url = makeUrl('/data');
    const response = await fetch(url);
    const datum = await response.json();
   

    let currentProfileIndex = 0;
  
    function displayProfile() {
      const container = document.querySelector('.container');
      container.innerHTML = ''; 
  
      const profile = datum[currentProfileIndex];
      const htmlCode = makeHtmlCode(profile,currentProfileIndex,datum.length);
      container.innerHTML = htmlCode;
  
      // Enable/disable buttons based on current index
      const prevButton = container.querySelector('.btn.prev');
      const nextButton = container.querySelector('.btn.next');
      prevButton.disabled = currentProfileIndex === 0;
      nextButton.disabled = currentProfileIndex === datum.length - 1;
    }
  
    // Initial display
    displayProfile();
  
    // Button click handlers
    document.querySelector('.container').addEventListener('click', (event) => {
      if (event.target.classList.contains('btn')) {
        if (event.target.classList.contains('prev')) {
          currentProfileIndex--;
        } else if (event.target.classList.contains('next')) {
          currentProfileIndex++;
        }
  
        displayProfile();
      }
    });
  }
  
  function makeHtmlCode(data,currentProfileIndex,totalProfile) {
    const {_id,Name,ImgUrl,Occupation,Institution,Department,DepartmentalInfo,ParentsInfo,Address,Date,Profile_Link,DetailsInfo,ProviderInfo}=data;
    const identity = `
    <h3> ${currentProfileIndex+1} / ${totalProfile} </h3>
      <div class="imgCard">
        <img src="${ImgUrl}" class="img" alt='${Name}' >
      </div>
      <div class="identity">
        <div>
          <h2>${Name}</h2>
          <h4>${Department}</h4>
          <h5>${Institution}</h5>
          <p>${DepartmentalInfo} </p>
          <p>${data.Address} </p>
          <p class='deathDate'>Death Date: ${Date} </p>
          <p>${sliceDetails(DetailsInfo,50)} <a href='../html/FFDetailsInfo.html?id=${_id}'> <button> more </button></a></p>
        </div>
      </div>
      <div class="buttonSection">
        <button type="button" class="btn prev" disabled>Prev</button>
        <button type="button" class="btn next">Next</button>
      </div>
    `;
    return identity;
  }
  
  getData();
  