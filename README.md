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
