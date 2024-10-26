import { createApi } from "unsplash-js";
import * as nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: "M6WxmJv35fKLWl0YuNIqd7l8eGsae9NaESKLOiDl63I",
  fetch: nodeFetch.default as unknown as typeof fetch,
});

export const getUnsplashList = async () => {
  return await unsplash.photos.list({perPage: 12});
};

export const getUnsplashTopicList = async () => {
  return await unsplash.topics.getPhotos({
    topicIdOrSlug: 'nature',
    perPage: 12,
  });
};
