# AngularSoftUniFinalProject

### Start Project

-   `npm install` - installing project dependencies.

-   `npm run prepare` - optional for activating pre-commit hooks.

-   `ng s` start development server.

### Build

-   `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Authentication and Authorization

#### Authentication

Two tokens are used for authentication. Access Token and Refresh Token. The authentication process is as follows.

-   At Login and Register, both tokens are received, which we save respectively:

```
Access token - session storage
Refresh token - local storage
```

-   On initialization of the application, a check is made in the main component (app.component.ts) for the presence of the tokens. Access token recovery is called if necessary. Finally, if the checks pass, the user's profile is called and stored as state. If they fail, the user is considered unauthenticated.

-   Between each request to the server the same check is done inside http interceptor. This time the idea is simply to see if the access token can still be used or not. If not, a request is made for a refresh token. From here on, if the original request returns a 401, then we update the state and send the user to login. Before any invalid expired tokens are sent, everything is checked locally just to avoid burning the server with unnecessary requests.

#### Authorization

Authorization is implemented using three guards. First two (`is-authenticated.guard.ts` and `already-authenticated.guard.ts`) checks if the user is authenticated and the other (`is-staff.guard.ts`) checks if he has a specific role (isStaff role).
