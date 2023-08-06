
# Project Title

A brief description of what this project does and who it's for

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## 🚀 About Me
I'm a full stack developer...


![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## Run Locally

Clone the project

```bash
  git clone git@github.com:thuhuong1234/HIT_Project_2023.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`PORT`= 5000
`MONGODB_URI`="mongodb+srv://thuhuong2003:eibF1VijpNQhLqtm@cluster0.4zctm8s.mongodb.net/?retryWrites=true&w=majority"
`SECRET_KEY`='super-secret'
`JWT_EXPIRES_IN`='1d'
`JWT_EXPIRES_IN2`= '2d'
`URL_SERVER`= http://localhost:5000
`USER`= hdnguyenthuhuong1234@gmail.com
`PASS`= hqwnhdxkkqdnqsyi


#### Register

```http
  POST/api/v1/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |
| `passwordConfirm` | `string` | **Required**. Your passwordConfirm |
| `studentCode` | `string` | **Required**. Your studentCode |
| `phoneNumber` | `string` | **Required**. Your phoneNumber |

### VD:
```http
{
    "name":"Nam",
    "password":"Nam111222@",
    "passwordConfirm":"Nam111222@",
    "studentCode":"2020345242",
    "email":"Nam@gmail.com",
    "phoneNumber":"0342963649"
}
```
### Kết quả:
```http
{
    "status": 201,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY0Y2VkM2VkNTVlMjJjNmU0ZDM0YWEzMyIsImlhdCI6MTY5MTI3NjI3MCwiZXhwIjoxNjkxMzYyNjcwfQ.hkMWo1G_uBjWCCU98l5SwkbnTlPKT6CYnn8ia1vz7nM",
    "data": {
        "name": "Nam",
        "email": "Nam@gmail.com",
        "phoneNumber": "0342963649",
        "role": "member",
        "password": "$2b$08$fzaozzjaaHqNYanp7ELkEuLJcDdRYRY3QO/9gyWyn1lt0qMKRg20.",
        "studentCode": "2020345242",
        "_id": "64ced3ed55e22c6e4d34aa33",
        "createdAt": "2023-08-05T22:57:49.893Z",
        "updatedAt": "2023-08-05T22:57:49.893Z",
        "__v": 0
    }
}
```
#### Login

```http
  POST/api/v1/auth/login 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`      | `string` | **Required**. Id of item to fetch |
| `email`      | `string` | **Required**. Id of item to fetch |


#### VD
```http
{
    "password":"Nam111222@",
    "email":"Nam@gmail.com"
}
```
#### Kết quả
```http
{
    "status": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY0Y2VkM2VkNTVlMjJjNmU0ZDM0YWEzMyIsImlhdCI6MTY5MTI3NjgzOSwiZXhwIjoxNjkxMzYzMjM5fQ.hZ5QtpI_woQB7zVLruW0j_Rj92NM8RIceuJFx-pDBnw"
}
```
#### Kết quả
```http
{
    "status": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY0Y2VkM2VkNTVlMjJjNmU0ZDM0YWEzMyIsImlhdCI6MTY5MTI3NjgzOSwiZXhwIjoxNjkxMzYzMjM5fQ.hZ5QtpI_woQB7zVLruW0j_Rj92NM8RIceuJFx-pDBnw"
}
```

#### Forgot-password
```http
POST/api/v1/auth/forgot-password?email=hdnguyenthuhuong1234@gmail.com
```
#### Forgot-password
```http
{
    "status": 200,
    "message": "success",
    "reset": {
        "accepted": [
            "hdnguyenthuhuong1234@gmail.com"
        ],
        "rejected": [],
        "ehlo": [
            "SIZE 35882577",
            "8BITMIME",
            "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
            "ENHANCEDSTATUSCODES",
            "PIPELINING",
            "CHUNKING",
            "SMTPUTF8"
        ],
        "envelopeTime": 774,
        "messageTime": 705,
        "messageSize": 811,
        "response": "250 2.0.0 OK  1691281192 b2-20020aa78702000000b0066ccb8e8024sm3641815pfo.30 - gsmtp",
        "envelope": {
            "from": "no-relply@quanlylophoc.com",
            "to": [
                "hdnguyenthuhuong1234@gmail.com"
            ]
        },
        "messageId": "<f3b43b3f-e739-2681-8f93-50bd5da21c07@quanlylophoc.com>"
    }
}
```
#### Reset-password
```http
PUT/api/v1/auth/reset-password
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`      | `string` | **Required** your new password |
| `token`      | `string` | **Required** token |

#### Get-me
```http
GET/auth/api/v1/get-me
```

#### Refresh-access-token
```http
GET/api/v1/auth/refresh-access-token
```
```http
{
    "status": 200,
    "newAccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY0Y2VkOWFlODBiOWY1ZjM2N2VjYzQ5ZCIsImlhdCI6MTY5MTI4MzA3OCwiZXhwIjoxNjkxMzY5NDc4fQ.FEzjDl5bOV9p8lWmxz8lzrGeZ8PZGd_D5Xbc9ulbl10"
}
```


#### Logout
```http
GET/api/v1/auth/logout
```
```http
{
    "status": 200,
    "mes": "Logouted!"
}
```

#### Get all members

```http
  GET/api/v1/members
```

#### Get member

```http
  GET/api/v1/members/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create member

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.Member's name|
| `password`  | `string` | **Required**.Member's password|
| `passwordConfirm`| `string` | **Required**.Member's passwordConfirm|
| `email`      | `string` | **Required**.Member's email|
| `role`      | `string` | **Required**.Member's role|


```http
{
    "name": "Hong",
    "password": "Ha001234@",
    "passwordConfirm": "Ha001234@",
    "studentCode": "202034510",
    "email": "Hong@gmail.com",
    "role": "leader"
}
```
```http
  PUT/api/v1/members/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` |Member's name|
| `password`  | `string` |Member's password|
| `email`      | `string` |Member's email|
| `role`      | `string` | Member's role|
| `image`      | `string` | Member's image by body or upload file|


```http
  DELETE/api/v1/members/${id}
```
```http
  GET/api/v1/excel
```
