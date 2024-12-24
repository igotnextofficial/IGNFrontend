## Current To do List
### High Priority
    - [] protect register-mentor page so only admin can access   
    - [] set up forgot password
    - [] set up 404 page
    - [] Add calendly or some sort of scheduling system for mentors, check google api 
    - [] Artist edit profile should show a count so users know how long their bio can be and the like.
    - [] make sure all forms are submitting their data correctly


    ### Low Priority
    - [] Once the session happens their should be a list of past sessions for the users to view. ? (What is the benefits?)
    - [] in the dropdown, account should be changed to edit-profile
    - [] consider allowing number in username lol it looks tacky plus would an artist be named <artist-name>123? lol
    - [] Find a mentor page needs to be adjusted to pull in the mentors from the db (this data should be cached.)


## Upcoming updates

### Authentication
- [] Most Important circle back around to authentication process and storing of tokens
- [] Handle decoding token on frontend to verify the users scope and access any other needed info


### Dashobards

#### Writer Dashboard





#### Artist Dashboard

#### Mentor Dashboard 


### Editor Component




## Backlog

- [] upload and streaming music.
- [] need to think of payment Models.
- [] what does a regular subscriber see when they log on ? just articles?
    #### Regular User Dashboard - This whole section can wait!
    - [] should be able to create playlist
    - [] should be able to subscribe to an artist page
    - [] will get updates if subscribed to artist page.

 ### Noticeable Issues

    - [] endpoints are being hit unneccesarily , need some sort of cache system or pull from local storage if possible
    - [] Footer does not adhere to the bottom of all pages

    
## Completed
#### FBFAF9 BG Color
- [x] Mentors should be able to adjust payment fee.? Need to think about this.
- [x] Add specialties list for mentors.
- [x] Learn more underneath the mentor card should link to the mentor profile page which will include the fee they charge.
- [x] genre list needs to be set up on the backend so when a user is pulled in so is the genre i can handle this on the shieldAuthService.
- [x] Allow Mentors to set their price per 6 sessions
- [x] setup stripe payment API
- [x] Add Fake Data, Articles,admin 
- [x] make sure pagination is setup
- [x] add expiration time to tokens
- [x] should be able to toggle between being open or closed to accepting new clients.
- [x]  Page to Leave Notes for mentee 
- [x] Add categories to article creation pages.
- [x] add an image upload feature for the articles 
- [x] Add an Editor Context &amp; provider for forms to use.
- [x] on Dashboard page remove drafts from side of compose or when saved redirect page
Writer Dashboard
- [x] Article Dashboard published articles should show the current signed in users articles
- [x]  Most popular articles should show that users most popular articles
Artist Dashboard
- [x]  need to create this dashboard
- [x]  Should be able to find a mentor and request session
Editor Component
- [x] Should be an Editor context that will wrap around the component this will allow the various seperate components to access and set the data it needs to set accordingly. 
- [x] After clicking through the pages , the page goes blank and 
        "enable JS Error" appears
- [x] Article List pages need to be designed.
- [x] setup http request provider
- [x] Zoom API or the like for video calls.
- [x] page crashes on refresh ,could be how i changed local storage
- [x] sign up page role list should only allow a subscriber and a artist, Mentors will be created internally by an admin user.
- [x] once a user books a mentor and that mentor is pending approval then it should remain this way on all page (text "pending approval should remain")
- [x] when i have the session displaying it should have a link to enter the meeting, if it is like 5 mins before the scheduled meeting.
- [x] on the upcoming session should be a link for the mentor to be able to join the session. 
- [x] UpcomingSessions.tsx function to display date needs to be redone (formatDate func)
- [x] export getUpcomingSessionWithinMax() func to be reused by other components
- [x] bio should default to empty string not null
- [x]drop down for account holder does not go to new page unless text is clicked directly, fix