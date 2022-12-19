# Unsecure chat

A semi RESTful API backend for a chat. Deploy this online, then build a frontend. Designed for educational use.

## Features

+ lowDB database for persistent storage
+ channels
+ public messages (no security)


## Example
```js
// All messages
const response = await fetch(baseUrl + '/messages')
const allMessages = await response.json()

// Limit to channel
const response = await fetch(baseUrl + '/messages/testChannel')
const channelMessages = await response.json()

// Post new message
const message = { userId: 27, userAlias: 'Ada', message: 'Example chat message' }
const settings = { method: 'POST', body: JSON.stringify(message) }
const response = await fetch(baseUrl + '/messages/testChannel', settings)
// response.status is 200 on success
```



## Endpoints

|Method |Route                |Description |
|-------|---------------------|------------|
| GET   | /messages/          | Get all messages. |
| GET   | /messages/:channel  | Get all messages matching the channel name. Exact matches only. |
| POST  | /messages/:channel  | Post a new message. |


## Data format

**POST message**
```
{
	userId: string or number !== 0,
	userAlias: "User's chosen alias",
	message: "The chat message"
}
```


**GET message**
```
{
	userId: string or number !== 0,
	userAlias: "User's chosen alias",
	message: "The chat message",
	timeSent: "2022-12-19T21:02",
	channel: "95of"
}
```
