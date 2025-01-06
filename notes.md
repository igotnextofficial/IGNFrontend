## Current To do List
### High Priority
    - [] Search for mentors page needs to be updated , to go to the mentors profile when it is clicked on also page should update UI on Search for category and name 
    - [] Add calendly or some sort of scheduling system for mentors, check google api 
    - [] protect register-mentor page so only admin can access   
    - [] set up forgot password
    - [] set up 404 page
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
- [x] Being logged out for some reason on Refresh 
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

Setting up mail so mentors can access it through gmail :
Sure To allow users to access the email accounts through Gmail, you'll need to set up mail forwarding and configure Gmail to retrieve mail from the email accounts using POP3.

Here's a quick guide:

In your cPanel, set up email forwarding from the cPanel email account to the users' Gmail addresses.

In Gmail, go to Settings > Accounts and Import > Check mail from other accounts, and add the cPanel email account using POP3.



# Working GCP SIGNED_URL LINK

Q LEwis : Uploaded from dev site
https://storage.googleapis.com/ignmagazine-assets/uploads/9db7cd7e-d6d4-4770-a3c5-74f8b774f9d8/images/quinnlewis-1735606562922.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=media-upload-manager%40ign-magazine.iam.gserviceaccount.com%2F20241231%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241231T005603Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=9a95c0677c286c0efb8a7fe17ce9213f37ec47fbb94bd8600a8e63d54d99a434f4c392e9d77f4fde461bb187039d18cc65a288a56176a4bbfb18a694215d94f11342ab9b7793ce4cf6b00ebbbd3f273146867fde74db9e4fdec4dfc8e21c274b45969887eb7966a93173ecf41728581f3e2d6e099f7d677d5c113cf174f9819916feb99ded5121975a995c4d3f659213bbec920f7baace8aecc6042c43f46ad07cfc45ebde6da5b4d510547c1d7af1d4b28445db769caabb05c5a2671fc9d7fe02ca1a0540b37b66849d96ea3274a332842f3f8a05d9346ffd5646043a426e2f4d291cd01708d4bac81d1439d7af69369617e1503c5eae467116399b0d35b3a8



George fuller - uploaded from local :
https://storage.googleapis.com/ignmagazine-assets/uploads/9db7cff5-6322-4146-8081-4aaee0ea3238/images/georgefiuller-1735160172819.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=media-upload-manager%40ign-magazine.iam.gserviceaccount.com%2F20241230%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241230T201305Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=385642289836ef9c032b8660fb46f6f70667f8c254787dcb9bc661b36cae0238e932ee443c8811ebb0a7a51763defa3aa59a5224bbfdb6b88156ef94b1a01e810d1c68c3d252e92be6a191640710edbd3eb65b0318c048d551b871dbbdcb00572cd571d26c0c4882a9908b1b7e099f8245e0420ea654a4e03af0dde203c306785c8f88f5001d2498217b058fcd763878bc61767636de030a008e3f7e91b768ede44534b8823d62256f7e616a7a73d9579e5404eeea04bba779aabead932254a4e637a0d54c424c96271481264def6e3c446e02e78438726a847ec9d67bd55deacc06871e8b0e589affab5e797f7ee90c1333fcabf15dc36dd9ac8cc11223dd01