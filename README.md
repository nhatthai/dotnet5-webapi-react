# .NET5 WebAPI and React
    Frontend React and Web API using .NET 5
    Create example: Learn React, Hooks and RxJs

## React
+ Run development
    ```
    cd client-app
    npm start
    ```
+ Run build
    ```
    cd client-app
    npm build
    ```

## .NET 5 Web API
### Migration database in Postgres
+ Create migration

    ```
    dotnet ef migrations add InitialCreate
    ```

+ Apply Migration
    ```
    dotnet ef migrations script
    ```

### Swagger UI
    ```
    https://localhost:44374/swagger/index.html
    ```

## Reference
+ [Fetch data in React](https://www.freecodecamp.org/news/fetch-data-react/)
+ [Fetch data from an API](https://designcode.io/react-hooks-handbook-fetch-data-from-an-api)
