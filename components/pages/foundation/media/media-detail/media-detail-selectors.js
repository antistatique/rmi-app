
import { createSelector } from 'reselect';

const mediaReleases = state => state.staticContent.content['media-releases'];
export const mediaId = state => state.routes.query.id;



export const getMedia = createSelector(
  [mediaReleases, mediaId],
  (_mediaReleases, _mediaId) => _mediaReleases.find(mediaRelease => mediaRelease.id === _mediaId) || {}
);




export default { getMedia };
