# .NET5 WebAPI react
    Frontend React and Web API using .NET 5
    Create example: Learn React

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