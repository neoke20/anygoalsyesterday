# Project is live

You can visit the following page to see the project: [Any Goals Yesterday](https://anygoalsyesterday.netlify.app/)

## Description

The goal of the website is to let a user know whether there were goals in a specific match or not, without disclosing the final result. The idea behind is that some people watch games on the following day because the match they want to see is in the middle of the night for them. However, watching a game that ends up with no goals is mostly a waste of time, but the users cannot check sports websites to see if there were goals because they will necessarily be spoiled about the final result which beats the purpose of watching the game on demand on a streaming platform they might be paying for.

### `competitions`

The first page will list the competitions available (currenlty using the free version of an API called [Football-data](https://www.football-data.org/)). Clicking on a card will redirect to a list of matches for that competition

### `matches`

When users end up on the page, the latest matchday is displayed depending on what the API considers to be the latest match day (usually updates 1 or 2 days before the actual matchday, and shows matches as scheduled).

When matches have been played, if there were goals, the card for a specific game will display "yes" or "no" depending on whether there were goals or not. The user can choose to check whether there were goals in the first and/or second half by accessing an accordion menu. The answer is hidden until the user chooses to reveal it.

All matches that have been cancelled, postponed, are in play are shown as such until the API returns a different status.

### `teams`

The user can choose to click on the team's name to get more information about it and get a list of players from their professional team.
