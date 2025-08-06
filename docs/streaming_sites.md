# 🎥 Video Embed Providers (2025) – English & French Support

This document lists the **best gray-market video embed providers** active in 2025 that support embedding **full movies and TV shows** via **IMDb or TMDB IDs**. Includes **English** and **French audio** options, URL formats, ID support, subtitle info, ad annoyance level, and stability.

---

## ✅ ENGLISH AUDIO – Top Providers (Movies & TV)

All providers below support:
- Both **movies** and **TV shows**
- **IMDb** or **TMDB** ID-based access
- **English audio**
- Embed-ready players
- 720p–1080p+ streaming
- Low ads or popup behavior
- Subtitle support

| Provider         | Type         | ID Support       | Movie Embed URL Example                                                                 | TV Show Embed URL Example                                                                            |
|------------------|--------------|------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **VidSrc**       | ✅ Movies+TV | IMDb & TMDB      | `https://vidsrc.to/embed/movie/tt9100054`<br>`https://vidsrc.to/embed/movie/12345`       | `https://vidsrc.to/embed/tv/tt18382028/1/5`<br>`https://vidsrc.to/embed/tv/12345/1/5`                  |
| **2Embed (clones)** | ✅ Movies+TV | IMDb (some TMDB) | `https://2embed.cc/embed/imdb/movie?id=tt1234567`                                       | `https://2embed.cc/embed/imdb/tv?id=tt7654321&s=1&e=2`                                                 |
| **SuperEmbed**   | ✅ Movies+TV | IMDb & TMDB      | `https://multiembed.mov/?video_id=tt8385148`<br>`https://multiembed.mov/?video_id=114472&tmdb=1` | `https://multiembed.mov/?video_id=114472&tmdb=1&s=1&e=2`                                              |
| **Mostream**     | ✅ Movies+TV | IMDb & TMDB      | `https://mostream.us/embed.php?imdb=tt9074344`                                          | `https://mostream.us/embed.php?imdb=tt27528139&s=1&e=1`                                               |
| **Embed-API**    | ✅ Movies+TV | TMDB only        | `https://player.embed-api.stream/?id=786892&type=movie`                                 | `https://player.embed-api.stream/?id=237748&s=1&e=2`                                                  |
| **MoviesAPI**    | ✅ Movies+TV | IMDb & TMDB      | No static URL – use generator or API                                                    | No static URL – use generator or API                                                                  |

---

## ✅ FRENCH AUDIO – Top Providers (Movies & TV)

These providers support:
- **French-dubbed audio** (VF)
- Movies and full TV show episodes
- ID-based access (IMDb or TMDB)
- HD to 4K quality
- Low or no ads
- Simple integration and stability

| Provider       | Type         | ID Support    | Movie URL Example                                                   | TV Show URL Example                                                              | Notes |
|----------------|--------------|---------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------|-------|
| **Frembed**    | ✅ Movies+TV | IMDb & TMDB   | `https://frembed.com/film.php?id=tt1234567`                          | `https://frembed.com/serie.php?id=tt9876543&sa=1&epi=2`                          | 100% French audio, no subs, minimal ads |
| **FrWatch**    | ✅ Movies+TV | TMDB only     | `https://frwatch.net/film.php?id=550`                                | `https://frwatch.net/serie.php?id=237748&sa=1&epi=2`                             | French dub, now also supports English + FR subs |
| **VidSrc**     | ✅ Movies+TV | IMDb & TMDB   | Same as English section above                                       | Same as English section above                                                    | Supports some French (only if original or source provides), not guaranteed |
| **SuperEmbed** | ✅ Movies+TV | IMDb & TMDB   | Same as English section above                                       | Same as English section above                                                    | Supports French only if present in sources; can attach custom French subs |

---

## 🧠 TL;DR: Which To Use?

- ✅ **Need English content?**  
  Use: `VidSrc`, `SuperEmbed`, `Embed-API`

- 🇫🇷 **Need French-dubbed content (VF)?**  
  Use: `Frembed` (best), `FrWatch` (VF + bilingual), optionally `SuperEmbed` (with manual subs)

- ✅ All listed providers support **movies + TV shows**, with season/episode selection.

- 🆔 All accept **IMDb** or **TMDB** IDs (some are TMDB-only – see table above)

---

## 🛠 Example Use Case

If you're building a site or tool that shows a movie player from a TMDB/IMDb ID, just format the embed URL using the patterns above. For instance:

```js
// Example for embedding a movie from TMDB on VidSrc
const embedUrl = `https://vidsrc.to/embed/movie/${tmdbId}`;
```

```js
// Example for embedding an episode from SuperEmbed using TMDB ID
const embedUrl = `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=1&e=2`;
```

You can iframe those URLs directly in your frontend like so:

```html
<iframe src="https://vidsrc.to/embed/movie/tt1234567" width="100%" height="500" allowfullscreen></iframe>
```

---

## 📝 Notes

- Some providers (like SuperEmbed) allow attaching **custom subtitle files** via URL
- Many providers rotate or change domains – always test before deploying
- You can create a wrapper function to generate URLs depending on language and content type (movie or TV)
- For **best results**, cache content metadata (IMDb/TMDB ID, title, etc.) in your database and resolve only on demand

---

## 🤖 Need Help?

Ask for:
- Python/PHP/Node wrappers for generating URLs
- Embed testing scripts
- Subtitle auto-injection solutions
- Batch validators for movie libraries

---
