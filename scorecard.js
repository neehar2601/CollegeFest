document.addEventListener('DOMContentLoaded', function() {
    // Event data (we'll use this to populate the event dropdown)
    const events = [
        // Sports Events
        {
            name: "Athletic Meet",
            date: "April 5, 2025",
            category: "sports",
        },
        {
            name: "Football Tournament",
            date: "April 1-3, 2025",
            category: "sports",
        },
        {
            name: "Badminton Championship",
            date: "April 2-4, 2025",
            category: "sports",
        },
        {
            name: "Cricket Tournament",
            date: "April 3-6, 2025",
            category: "sports",
        },
        
        // Cultural Events
        {
            name: "Dance Competition",
            date: "April 7, 2025",
            category: "cultural",
        },
        {
            name: "Battle of Bands",
            date: "April 8, 2025",
            category: "cultural",
        },
        {
            name: "Art Exhibition",
            date: "April 7-10, 2025",
            category: "cultural",
        },
        {
            name: "Fashion Show",
            date: "April 9, 2025",
            category: "cultural",
        },
    ];
    
    // Sample scorecard data (will be replaced by Excel data when uploaded)
    const sampleScoreCards = {
        "Football Tournament": {
            event: "Football Tournament",
            category: "sports",
            date: "April 1-3, 2025",
            venue: "College Grounds",
            status: "Completed",
            headers: ["Team", "Played", "Won", "Lost", "Draw", "Goals For", "Goals Against", "Points"],
            data: [
                ["Engineering", "5", "4", "0", "1", "12", "3", "13"],
                ["Science", "5", "3", "1", "1", "9", "5", "10"],
                ["Commerce", "5", "2", "2", "1", "7", "6", "7"],
                ["Arts", "5", "1", "3", "1", "5", "10", "4"],
                ["Law", "5", "0", "4", "1", "3", "12", "1"]
            ],
            winners: {
                first: "Engineering",
                second: "Science",
                third: "Commerce"
            }
        },
        "Athletic Meet": {
            event: "Athletic Meet",
            category: "sports",
            date: "April 5, 2025",
            venue: "College Stadium",
            status: "Upcoming",
            headers: ["Name", "College", "Event", "Position", "Record", "Points"],
            data: []
        }
    };
    
    // Elements
    const eventCategorySelect = document.getElementById('eventCategory');
    const eventNameSelect = document.getElementById('eventName');
    const fileUpload = document.getElementById('fileUpload');
    const fileName = document.getElementById('fileName');
    const scorecardContainer = document.getElementById('scorecard-container');
    
    // Populate event dropdown
    function populateEvents(category = 'all') {
        eventNameSelect.innerHTML = '<option value="all">All Events</option>';
        
        const filteredEvents = category === 'all' 
            ? events 
            : events.filter(event => event.category === category);
            
        filteredEvents.forEach(event => {
            const option = document.createElement('option');
            option.value = event.name;
            option.textContent = event.name;
            eventNameSelect.appendChild(option);
        });
    }
    
    // Display scorecard
    function displayScorecard(scorecardData) {
        if (!scorecardData || !scorecardData.headers || !scorecardData.data) {
            scorecardContainer.innerHTML = `
                <div class="no-data">
                    <p>No scorecard data available for this event</p>
                </div>
            `;
            return;
        }
        
        // Create the scorecard info section
        let html = `
            <div class="scorecard-info">
                <h3>${scorecardData.event}</h3>
                <div class="scorecard-meta">
                    <div class="scorecard-meta-item">
                        <strong>Category:</strong> ${scorecardData.category}
                    </div>
                    <div class="scorecard-meta-item">
                        <strong>Date:</strong> ${scorecardData.date}
                    </div>
                    <div class="scorecard-meta-item">
                        <strong>Venue:</strong> ${scorecardData.venue || 'TBD'}
                    </div>
                    <div class="scorecard-meta-item">
                        <strong>Status:</strong> <span class="status-${scorecardData.status?.toLowerCase()}">${scorecardData.status || 'Pending'}</span>
                    </div>
                </div>
            </div>
        `;
        
        // If we have data, create the table
        if (scorecardData.data.length > 0) {
            html += '<table class="scorecard-table">';
            
            // Table headers
            html += '<thead><tr>';
            scorecardData.headers.forEach(header => {
                html += `<th>${header}</th>`;
            });
            html += '</tr></thead>';
            
            // Table body
            html += '<tbody>';
            scorecardData.data.forEach(row => {
                let rowClass = '';
                
                // Check if this row represents a winner
                if (scorecardData.winners) {
                    if (row[0] === scorecardData.winners.first) {
                        rowClass = 'winner';
                    } else if (row[0] === scorecardData.winners.second) {
                        rowClass = 'runner-up';
                    } else if (row[0] === scorecardData.winners.third) {
                        rowClass = 'second-runner-up';
                    }
                }
                
                html += `<tr class="${rowClass}">`;
                row.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
            
            // Add winners section if available
            if (scorecardData.winners && scorecardData.winners.first) {
                html += `
                    <div class="winners-section">
                        <h4>Results</h4>
                        <p><strong>Winner:</strong> ${scorecardData.winners.first}</p>
                        ${scorecardData.winners.second ? `<p><strong>Runner-up:</strong> ${scorecardData.winners.second}</p>` : ''}
                        ${scorecardData.winners.third ? `<p><strong>Second Runner-up:</strong> ${scorecardData.winners.third}</p>` : ''}
                    </div>
                `;
            }
        } else {
            html += `
                <div class="no-data">
                    <p>No results available yet for this event</p>
                </div>
            `;
        }
        
        scorecardContainer.innerHTML = html;
    }
    
    // Parse Excel file
    function parseExcelFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Extract headers and data
            const headers = jsonData[0];
            const rows = jsonData.slice(1);
            
            // Extract metadata (event details) from additional rows if present
            let metadata = {};
            
            // Look for metadata in the worksheet (usually in separate named cells)
            // This is a simplified approach - in real cases, we'd need to check specific cells
            const eventCell = worksheet['A1'] ? worksheet['A1'].v : null;
            const categoryCell = worksheet['A2'] ? worksheet['A2'].v : null;
            const dateCell = worksheet['A3'] ? worksheet['A3'].v : null;
            const venueCell = worksheet['A4'] ? worksheet['A4'].v : null;
            
            if (eventCell && eventCell.includes(':')) {
                metadata.event = eventCell.split(':')[1].trim();
            } else {
                // Try to get event name from the file name
                metadata.event = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
            }

            if (categoryCell && categoryCell.includes(':')) {
                metadata.category = categoryCell.split(':')[1].trim().toLowerCase();
            } else {
                // Try to determine category from the first sheet name
                metadata.category = firstSheetName.toLowerCase().includes('sport') ? 'sports' : 'cultural';
            }
            
            if (dateCell && dateCell.includes(':')) {
                metadata.date = dateCell.split(':')[1].trim();
            }
            
            if (venueCell && venueCell.includes(':')) {
                metadata.venue = venueCell.split(':')[1].trim();
            }
            
            // Build scorecard object
            const scorecard = {
                event: metadata.event || file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
                category: metadata.category || 'other',
                date: metadata.date || 'N/A',
                venue: metadata.venue || 'N/A',
                status: 'Updated',
                headers: headers,
                data: rows,
                winners: extractWinners(rows)
            };
            
            // Display the scorecard
            displayScorecard(scorecard);
        };
        
        reader.readAsArrayBuffer(file);
    }
    
    // Helper function to extract winners based on points
    function extractWinners(data) {
        // This is a simplified approach - in real cases, the logic would depend on the scorecard format
        if (!data || data.length === 0) return null;
        
        // Try to find a column that might contain points (usually the last column)
        const pointsColIndex = data[0].length - 1;
        
        // Create a copy of the data with their points
        const dataWithPoints = data.map(row => ({
            name: row[0],
            points: parseFloat(row[pointsColIndex]) || 0
        }));
        
        // Sort by points (descending)
        dataWithPoints.sort((a, b) => b.points - a.points);
        
        // Get top 3
        return {
            first: dataWithPoints[0]?.name,
            second: dataWithPoints[1]?.name,
            third: dataWithPoints[2]?.name
        };
    }
    
    // Event listeners
    eventCategorySelect.addEventListener('change', function() {
        populateEvents(this.value);
    });
    
    eventNameSelect.addEventListener('change', function() {
        if (this.value === 'all') {
            // Show placeholder
            scorecardContainer.innerHTML = `
                <div class="scorecard-placeholder">
                    <p>Select a specific event to view its scorecard</p>
                </div>
            `;
        } else {
            // Check if we have sample data for this event
            if (sampleScoreCards[this.value]) {
                displayScorecard(sampleScoreCards[this.value]);
            } else {
                // Show placeholder for events without sample data
                scorecardContainer.innerHTML = `
                    <div class="no-data">
                        <p>Upload a scorecard Excel file for ${this.value}</p>
                    </div>
                `;
            }
        }
    });
    
    fileUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Display the file name
        fileName.textContent = file.name;
        
        // Parse the Excel file
        parseExcelFile(file);
    });
    
    // Initialize the page
    populateEvents();
});