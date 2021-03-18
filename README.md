# wah-api
we are happy API


## Create a user


```
curl -X POST \
  http://localhost:8080/user/new \
  -H 'Content-Type: application/json' \
  -d '{
 "username": "admin",
 "password": "admin"
}'
```