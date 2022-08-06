# SWAPI

This project is a webapp that shows Stars Wars characters from [SWAPI](https://swapi.dev).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local run

To run the project locally, follow the next steps

```bash
yarn install
yarn dev
```

If you want to check if the test are ok, you can run the following commands

- `yarn test` to execute unit tests.
- `yarn cypress` to open Cypress and see the execution of e2e/integration tests.
- `yarn e2e` to execute e2e/integration tests in CI mode, showing results in terminal and creating videos and screenshots.

## Deploy

This project is deployed in Vercel. The URL is [https://swapi-isaaccf.vercel.app/](https://swapi-isaaccf.vercel.app/).

## Used packages

I decided to use [Luxon](https://moment.github.io/luxon/#/) to manage dates and time calculation.

In the requirements there is a single calculation, get how many years ago each film was published. This could be done with a simple method developed in the project, but the time to develop that method probably will be unuseful when another requirement comes, like get the last edition of the information. I think to have a date management library is useful, even if in this case could be done in other way.

## New features

Without a specific order, following I writed a few new features or improvements to the code:

- If you're inside a character details, when you go back, if there were more pages loaded in search or index page, because you used the "Loade more" button several times, you will only get the first one. This could be solved using some state management, like Redux, saving the pages loaded before navigate to details, and when the user comes back to index or seach page, get the pages from the state.

- The application can show more information, maybe a Link in each film to show all the details.

- The pagination could be done in other several ways. One of them could be create a traditional paginator, with the number os pages, based on the total records getted from the API and the records showed in each page. Another way could be to create an infinite scroll, calculating how many cards can be placed in the screen, get all the pages that we need to fill all the cards and get one more page when the user reach the final of the page.