## Current To do List
- [] setup http request provider
- [] make sure all forms are submitting their data correctly
- [] set up 404 page


- [] Add calendly or some sort of scheduling system for mentors, check google api 
- [] Zoom API or the like for video calls.


 



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
- [] Mentors should be able to adjust payment fee.? Need to think about this.
- [] need to think of payment Models.
    #### Regular User Dashboard - This whole section can wait!
    - [] should be able to create playlist
    - [] should be able to subscribe to an artist page
    - [] will get updates if subscribed to artist page.

 ### Noticeable Issues
    - [] After clicking through the pages , the page goes blank and 
        "enable JS Error" appears
    - [] endpoints are being hit unneccesarily , need some sort of cache system or pull from local storage if possible
    - [] Footer does not adhere to the bottom of all pages
    - [] Article List pagges need to be designed.
## Completed
#### FBFAF9 BG Color
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