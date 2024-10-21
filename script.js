function filterData() {
event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
console.log(startdate);
console.log(enddate);
}

document.addEventListener('DOMContentLoaded', function() {
  const url = 'https://compute.samford.edu/zohauth/clients/datajson/1';
  
  fetch(url)
      .then(response => response.json())
      .then(data => {
          const tableBody = document.getElementById('pitch-data');
          
          data.forEach(pitch => {
              const row = document.createElement('tr');
              
              row.innerHTML = `
                  <td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
                  <td>${pitch.Date}</td>
                  <td>${pitch.Time}</td>
                  <td>${pitch.Batter}</td>
                  <td>${pitch.Balls}</td>
                  <td>${pitch.Strikes}</td>
                  <td>${pitch.Outs}</td>
                  <td>${pitch.PitchCall}</td>
                  <td>${pitch.KorBB || ''}</td>
                  <td>${pitch.RelSpeed || ''}</td>
                  <td>${pitch.SpinRate || ''}</td>
                  <td>${pitch.SpinAxis || ''}</td>
              `;
              
              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching pitch data:', error);
      });
});