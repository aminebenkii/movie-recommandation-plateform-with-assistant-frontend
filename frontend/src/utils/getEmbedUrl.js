// utils/getEmbedUrl.js

export function getEmbedUrl(
  source,
  tmdbId,
  imdbId,
  language,
  type = "movie",
  season = 1,
  episode = 1
) {
  if (!source || (!tmdbId && !imdbId)) return null;

  const isMovie = type === "movie";
  const s = season;
  const e = episode;

  const urls = {
    en: {
      vidsrc: isMovie
        ? `https://vidsrc.to/embed/movie/${imdbId || tmdbId}`
        : `https://vidsrc.to/embed/tv/${imdbId || tmdbId}/${s}/${e}`,

      superembed: imdbId
        ? `https://multiembed.mov/?video_id=${imdbId}`
        : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1${!isMovie ? `&s=${s}&e=${e}` : ""}`,

      "2embed": isMovie
        ? `https://2embed.cc/embed/imdb/movie?id=${imdbId}`
        : `https://2embed.cc/embed/imdb/tv?id=${imdbId}&s=${s}&e=${e}`,

      mostream: `https://mostream.us/embed.php?imdb=${imdbId}${!isMovie ? `&s=${s}&e=${e}` : ""}`,

      "embed-api": isMovie
        ? `https://player.embed-api.stream/?id=${tmdbId}&type=movie`
        : `https://player.embed-api.stream/?id=${tmdbId}&s=${s}&e=${e}`,

      moviesapi: tmdbId
        ? `https://moviesapi.club/embed/${tmdbId}`
        : null,
    },

    fr: {
      frembed: isMovie
        ? `https://frembed.icu/api/film.php?id=${imdbId}`
        : `https://frembed.icu/api/serie.php?id=${imdbId}&sa=${s}&epi=${e}`,

      frwatch: isMovie
        ? `https://frwatch.net/film.php?id=${tmdbId}`
        : `https://frwatch.net/serie.php?id=${tmdbId}&sa=${s}&epi=${e}`,

      vidsrc: isMovie
        ? `https://vidsrc.to/embed/movie/${imdbId || tmdbId}`
        : `https://vidsrc.to/embed/tv/${imdbId || tmdbId}/${s}/${e}`,

      superembed: imdbId
        ? `https://multiembed.mov/?video_id=${imdbId}`
        : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1${!isMovie ? `&s=${s}&e=${e}` : ""}`,
    },
  };

  return urls[language]?.[source] || null;
}
