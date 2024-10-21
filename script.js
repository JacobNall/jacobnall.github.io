function filterData() {
  event.preventDefault();
  
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;

  // Convert the input dates to Date objects
  var start = new Date(startdate);
  var end = new Date(enddate);

  // Get all table rows from the body of the table (excluding the header)
  var tableBody = document.getElementById("pitch-data");
  var rows = tableBody.getElementsByTagName("tr");

  // Loop through each row to check the date
  for (var i = 0; i < rows.length; i++) {
      var row = rows[i];

      // Get the date value from the second cell (index 1)
      var dateText = row.cells[1].textContent;

      // Convert the date from the row to a Date object
      var rowDate = new Date(dateText);

      // Check if the rowDate is within the range (inclusive)
      if (rowDate >= start && rowDate <= end) {
          row.style.display = "";  // Show the row
      } else {
          row.style.display = "none";  // Hide the row
      }
  }
  
  console.log("Filtering data from", startdate, "to", enddate);
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