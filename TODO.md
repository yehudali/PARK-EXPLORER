TODO

- for each service create its own directory - if theres a service that only one service uses it, put the directory inside of that service. [v]
- put the types of a service under {service-name}.types.ts for example - auth.types.ts [v]

- comments should be in english [v]

- i would create a config.ts that will take the values from the .env and put it inside an object. for example:
```
export config = {
    jwt: {
        secret:  process.env.JWT_SECRET
    },
}                                                [v]
```

- schema/index.its -> schema/relations.ts [v]
- add packages to the monorepo []
- move the database into the packages. keep only the files that are related to the nest in the project. 


- for each service - keep the functions that you export from the service above the other functions, and put thoses you dont export as private. [v]
- i would export the trpc.context from a specific module - its not only related to that service... [v ]