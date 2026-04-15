# bot (Docker Hub)

Container image for tmvdl/ai:bot.

## Pull

```bash
docker pull tmvdl/ai:bot
```

## Run

```bash
docker run -it --rm --net host -e NEWS_API_KEY=<your_news_api_key> tmvdl/ai:bot
```

## Docker Compose

```yaml
services:
  bot:
    image: tmvdl/ai:bot
    environment:
      - NODE_ENV=production
      - NEWS_API_KEY=<your_news_api_key>
```

Run with:

```bash
docker compose up
```

## Commands

- `/news <search>`
- `/weather <city/region>`
- `/ifood <flavor>`
- `/g1 <search>`
- `/google <search>`
- `/duckduckgo <search>`

## Source

- GitHub: https://github.com/tarsislimadev/bot

## License

License: [MIT](./LICENSE)
