# wah-api
we are happy API

## Dependencies
- mongodb (developed with v4.4.4)
- node (developed with v14.16.0)


## Setup
First, consider using the [infra project](https://github.com/revok/wah-infra) as this automates a lot of the boring stuff. If you're sure you want to set up locally, install mongodb and copy the env.dist file to a .env file. Then run `npm run dev`.


## Create a user

If you need to create a user (you will need this to login in the frontend), you can send a POST request to `[api:port]/user/new`  to register one through the API. Example:

```
curl -X POST \
  http://localhost:8080/user/new \
  -H 'Content-Type: application/json' \
  -d '{
 "username": "admin",
 "password": "admin"
}'
```