## MY PORTFOLIO

Set `.env.local` like this:

```env
SITE_ACCESS_SLUG=replace-this-with-a-very-long-random-slug
SITE_ACCESS_SECRET=replace-this-with-a-separate-long-random-secret
```

Open the site once with:

```text
http://localhost:3001/?h=your-secret-slug
```

That request sets a signed session cookie. Without that cookie, access stays blocked.

Docker deploy:

```bash
docker build -t clausum-app .
docker run -p 3000:3000 \
  -e SITE_ACCESS_SLUG=your-secret-slug \
  -e SITE_ACCESS_SECRET=your-separate-secret \
  clausum-app
```

Dokploy:

Use the repo's `Dockerfile` as the build source and set `SITE_ACCESS_SLUG` and `SITE_ACCESS_SECRET` as runtime environment variables in Dokploy. Do not bake secrets into the image.
