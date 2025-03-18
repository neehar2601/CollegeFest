document.addEventListener('DOMContentLoaded', function() {
    // Set the date for the countdown (April 11, 2025 - Grand Finale)
    const countdownDate = new Date("April 11, 2025 09:00:00").getTime();
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").innerHTML = "<h3>The Fest Has Begun!</h3>";
        }
    }, 1000);
    
    // Events data
    const events = [
        // Sports Events (Week 1)
        {
            name: "Athletic Meet",
            date: "March 29, 2025",
            description: "Annual athletic competition featuring track and field events, relay races, and more.",
            category: "sports",
            registrationLink: "register-athletics.html"
        },
        {
            name: "Football Tournament",
            date: "April 1-3, 2025",
            description: "Inter-college football competition with teams competing for the championship trophy.",
            category: "sports",
            registrationLink: "register-football.html"
        },
        {
            name: "Badminton Championship",
            date: "April 2-4, 2025",
            description: "Exciting basketball matches between college teams with knockout rounds.",
            category: "sports",
            registrationLink: "register-basketball.html"
        },
        {
            name: "Cricket Tournament",
            date: "March 31 - April 1, 2025",
            description: "T20 cricket matches between departments and colleges.",
            category: "sports",
            registrationLink: "register-cricket.html"
        },
        
        // Cultural Events (Week 2)
        {
            name: "Dance Competition",
            date: "April 7, 2025",
            description: "Showcase your dancing skills with solo, duo, and group performances.",
            category: "cultural",
            registrationLink: "register-dance.html"
        },
        {
            name: "Battle of Bands",
            date: "April 8, 2025",
            description: "Musical competition for college bands to demonstrate their talent.",
            category: "cultural",
            registrationLink: "register-bands.html"
        },
        {
            name: "Art Exhibition",
            date: "April 7-10, 2025",
            description: "Display of paintings, sculptures, and other art forms created by students.",
            category: "cultural",
            registrationLink: "register-art.html"
        },
        {
            name: "Fashion Show",
            date: "April 9, 2025",
            description: "Trendy fashion showcase by student designers and models.",
            category: "cultural",
            registrationLink: "register-fashion.html"
        },
        
        // Special Events
        {
            name: "Stage Program",
            date: "April 11, 2025",
            description: "Final showdown and closure of MSIS College fest Felicity. Register below to showcase your talent",
            category: "special",
            registrationLink: "https://forms.gle/nRFYkhZYVVcRxSyL6"
        },
        // {
        //     name: "Grand Stage Program",
        //     date: "April 11, 2025",
        //     description: "Final day celebration with performances, award ceremony, and celebrity guests.",
        //     category: "special",
        //     registrationLink: "register-finale.html"
        // },
        // {
        //     name: "Debate Championship",
        //     date: "April 8, 2025",
        //     description: "Intellectual discourse and oratory competition on contemporary topics.",
        //     category: "special",
        //     registrationLink: "register-debate.html"
        // }
    ];
    
    // Schedule data organized by weeks
    const schedule = {
        "week1": [
            {
                day: "March 29, 2025",
                events: [
                    { time: "07:00 AM", event: "Reporting Time", venue: "MIT Ground" },
                    { time: "07:30 AM", event: "Jersey Distribution", venue: "MIT Ground" },
                    { time: "08:00 AM", event: "Breakfast", venue: "MIT Ground" },
                    { time: "08:30 PM", event: "Event starts", venue: "MIT Ground" }
                ]
            },
            {
                day: "March 31, 2025",
                events: [
                    // { time: "09:00 AM", event: "Basketball Championship - Day 1", venue: "Sports Complex" },
                    // { time: "10:00 AM", event: "Football Tournament - Day 2", venue: "College Grounds" },
                    // { time: "11:00 AM", event: "Tech Hackathon Begins", venue: "Innovation Lab" },
                    { time: "04:30 PM", event: "Cricket Tournament", venue: "MIT Ground" }
                ]
            },
            {
                day: "April 1, 2025",
                events: [
                    { time: "04:30 AM", event: "Cricket Tournament - Finals", venue: "MIT Cricket Ground" },
                ]
            },
            {
                day: "April 4, 2025",
                events: [
                    { time: "09:00 AM", event: "Basketball Championship - Finals", venue: "Sports Complex" },
                    // { time: "01:00 PM", event: "Cricket Tournament - Day 2", venue: "Cricket Ground" },
                    { time: "03:00 PM", event: "Volleyball Tournament", venue: "Volleyball Court" },
                    // { time: "06:00 PM", event: "Sports Quiz", venue: "Seminar Hall" }
                ]
            },
            {
                day: "April 5, 2025",
                events: [
                    // { time: "08:00 AM", event: "Athletic Meet", venue: "College Stadium" },
                    // { time: "09:00 AM", event: "Cricket Tournament - Day 3", venue: "Cricket Ground" },
                    { time: "02:00 PM", event: "Chess Tournament", venue: "Student Center" },
                //     { time: "06:00 PM", event: "Sports Day Award Ceremony", venue: "Main Auditorium" }
                ]
            },
            {
                day: "April 6, 2025",
                events: [
                    
                    { time: "09:00 AM", event: "Badminton Tournament", venue: "Indoor Stadium" },
                    { time: "12:00 PM", event: "Table Tennis", venue: "College Grounds" }
                ]
            }
        ],
        "week2": [
            {
                day: "April 7, 2025",
                events: [
                    { time: "09:00 AM", event: "Art Exhibition - Opening", venue: "Art Gallery" },
                    { time: "11:00 AM", event: "Photography Contest Begins", venue: "Campus-wide" },
                    { time: "02:00 PM", event: "Dance Workshop", venue: "Dance Studio" },
                    { time: "06:00 PM", event: "Dance Competition", venue: "Open Air Theater" }
                ]
            },
            {
                day: "April 8, 2025",
                events: [
                    { time: "10:00 AM", event: "Debate Championship", venue: "Seminar Hall" },
                    { time: "01:00 PM", event: "Poetry Slam", venue: "Library Lawn" },
                    { time: "03:00 PM", event: "Battle of Bands - Preliminaries", venue: "Open Air Theater" },
                    { time: "07:00 PM", event: "Battle of Bands - Finals", venue: "Open Air Theater" }
                ]
            },
            {
                day: "April 9, 2025",
                events: [
                    { time: "10:00 AM", event: "Drama Competition", venue: "Main Auditorium" },
                    { time: "02:00 PM", event: "Creative Writing Contest", venue: "Library" },
                    { time: "05:00 PM", event: "Fashion Show", venue: "Open Air Theater" },
                    { time: "08:00 PM", event: "Cultural Night", venue: "College Grounds" }
                ]
            },
            {
                day: "April 10, 2025",
                events: [
                    { time: "09:00 AM", event: "Classical Music Competition", venue: "Music Room" },
                    { time: "11:00 AM", event: "Art Exhibition - Closing Day", venue: "Art Gallery" },
                    { time: "02:00 PM", event: "Film Festival", venue: "Media Center" },
                    { time: "06:00 PM", event: "Cultural Awards Night", venue: "Main Auditorium" }
                ]
            }
        ],
        "finale": [
            {
                day: "April 11, 2025",
                events: [
                    { time: "10:00 AM", event: "We will be right back with schedule", venue: "Library Auditorium" }
                    // { time: "01:00 PM", event: "Celebrity Meet & Greet", venue: "Library Auditorium" },
                    // { time: "03:00 PM", event: "Award Ceremony", venue: "Library Auditorium" },
                    // { time: "06:00 PM", event: "Grand Stage Program", venue: "Library Auditorium" },
                    // { time: "09:00 PM", event: "Closing Ceremony & Fireworks", venue: "Auditorium" }
                ]
            }
        ]
    };
    
    // Display events
    function displayEvents(category = 'sports') {
        const filteredEvents = category === 'all' ? events : events.filter(event => event.category === category);
        const eventsGrid = document.getElementById('eventsGrid');
        eventsGrid.innerHTML = '';
        
        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = '<p class="no-events">No events in this category</p>';
            return;
        }
        
        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            eventCard.innerHTML = `
                <div class="event-date">${event.date}</div>
                <div class="event-details">
                    <span class="event-category">${getCategoryName(event.category)}</span>
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <a href="${event.registrationLink}" class="event-link">Register</a>
                </div>
            `;
            
            eventsGrid.appendChild(eventCard);
        });
    }
    
    function getCategoryName(category) {
        switch(category) {
            case 'sports': return 'Sports';
            case 'cultural': return 'Cultural';
            case 'special': return 'Special';
            default: return 'Event';
        }
    }
    
    // Display schedule
    function displaySchedule(week = 'week1') {
        const scheduleContent = document.getElementById('scheduleContent');
        scheduleContent.innerHTML = '';
        
        if (!schedule[week] || schedule[week].length === 0) {
            scheduleContent.innerHTML = '<p class="no-schedule">No schedule available for this period</p>';
            return;
        }
        
        schedule[week].forEach(daySchedule => {
            const daySection = document.createElement('div');
            daySection.className = 'schedule-day';
            
            let dayContent = `<h3>${daySchedule.day}</h3>`;
            
            daySchedule.events.forEach(event => {
                dayContent += `
                    <div class="schedule-item">
                        <div class="schedule-time">${event.time}</div>
                        <div class="schedule-content">
                            <h4>${event.event}</h4>
                            <p class="schedule-venue">Venue: ${event.venue}</p>
                        </div>
                    </div>
                `;
            });
            
            daySection.innerHTML = dayContent;
            scheduleContent.appendChild(daySection);
        });
    }
    
    // Initial display
    displayEvents('sports');
    displaySchedule('week1');
    
    // Tab switching for events
    const eventTabs = document.querySelectorAll('.tab-btn');
    eventTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            eventTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            displayEvents(this.getAttribute('data-category'));
        });
    });
    
    // Tab switching for schedule
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            scheduleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            displaySchedule(this.getAttribute('data-week'));
        });
    });
    
    // Main registration button
    document.getElementById('mainRegisterBtn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Please select a specific event to register for from the events section.');
        document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
});