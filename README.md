## The Honey-Dirt Question
This project demonstrates a very simple polling web application, asking the silly hypothetical question, would you rather the train you are driving suddenly become filled with honey or dirt? Users can vote on which they prefer and see what others voted for. The application keeps track of a user ID in the browser's local storage to prevent users from voting multiple times (yes I know clearing browsing data will circumvent this). I used a combination of both CSS grid and flexbox to lay out the page and added a media query to change the layout to suit narrower screens.

- Server - Tracks the vote option, associated user ID, and the timestamp of the vote.
- Results - Timestamps of votes are displayed below each option.
- Forms - Two forms: one for each option. Forms consist of a submit button as well as hidden fields containing the user ID and vote option.
- Server Logic - Overrides user's existing vote if it already exists. Adds timestamp.
- Derived Field - Counts the number of votes for each option.

Render Link: https://a2-kyleplosky.onrender.com/

## Technical Achievements
- **Single Page App**: The entire application is contained within a single page. I used `preventDefault` to prevent the forms from submitting directly to the server and instead used `fetch` calls to access the server's API.
- **Modifying Existing Data**: Users can change or remove their votes. This utilizes the user ID system to modify/remove the appropriate vote. The same API endpoint is used for both the initial submission and modification, it simply checks if a vote already exists with that user ID and changes it if so.

### Design/Evaluation Achievements
- **User Testing**: 
    - Tester 1
        - Last name: Walters
        - Problems: Thought the space between the two sentences in the header was too small
        - Comments: Liked it, thought there might be a secret button somewhere
        - Changes: Somehow make the space bigger, suggested make clicking the buttons again clear the vote
    - Tester 2
        - Last name: dos Santos
        - Problems: None
        - Comments: Noticed that the buttons get slightly bigger when the checkmarks appear, tried to break it by clicking the space the button would expand into but didn't have any issue
        - Changes: Also suggested making clicking the buttons again clear the vote
    - I ended up implementing both of these suggestions