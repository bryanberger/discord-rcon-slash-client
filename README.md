# Discord RCON Slash Client

A proof of concept rcon pass-through slash command for Discord. Currently setup to expose a few commands for CS:GO servers.

### Setup

```
npm install
copy .env.example .env # and fill it in
run `make create` to build the `base` image
```

### Docker

```
make up # docker-compose up, used for dev

make up-prod # used on the server to execute the prod compose file

make down # docker-compose down
```

Based off of https://github.com/Snazzah/slash-create-template
