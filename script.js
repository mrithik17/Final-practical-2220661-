document.getElementById('searchBtn').addEventListener('click', function() {
    const countryName = document.getElementById('countryInput').value.trim();
    if (!countryName) {
      alert('Please enter a country name.');
      return;
    }
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then(data => {
        data.forEach(country => {
          const name = country.name.common;
          const capital = country.capital ? country.capital[0] : 'N/A';
          const flag = country.flags.svg;
          const currency = country.currencies ? Object.keys(country.currencies)[0] : 'N/A';
          const population = country.population.toLocaleString();
          const region = country.region;
          const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  
          const card = document.createElement('div');
          card.className = 'country-card';
          card.innerHTML = `
            <h2>${name}</h2>
            <img src="${flag}" alt="Flag of ${name}">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Languages:</strong> ${languages}</p>
          `;
          resultDiv.appendChild(card);
        });
      })
      .catch(error => {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  });
  