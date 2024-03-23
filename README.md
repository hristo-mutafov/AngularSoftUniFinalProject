# AngularSoftUniFinalProject

### Start Project

-   `npm install` - installing project dependencies.

-   `npm run prepare` - optional for activating pre-commit hooks.

-   `ng s` start development server.

### Build

-   `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Connect to Rest API

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

### State Management

There are Behavior Subjects used for managing the global state of the user authentication and cart count. They are located in `core/state` folder

### User Types

The application supports Unauthenticated users, Authenticated users and Staff users.

-   Unauthenticated users can scroll through the products and open their details page.
-   Authenticated users, additionally can add these products to a their cart, and buy them. Also they have the ability to add products in their favorites list, and can configure their profile inside the profile menus.
-   Staff users can Updated, Create and Delete Products.

### Folder Structure

The Folder structure is common. There is `core`, `pages`, `shared` main folders.

-   `Core` folder contain the core functionalities of the application, and these, which are essential for it. The components, that are used only one one place like layout components are also there.
-   `Pages` folder contain the main components, structured like the routing system of the application
-   `Shared` folder, contain the components and files, which are shared within the other components. It also contains the split components that form the main pages, stored in `Pages` folder

### Borrowed work from internet

-   The content of the 400 page is almost entirely taken from internet, just because is interesting and funny.
-   The .SVG image inside the 500 page is also taken from internet.
