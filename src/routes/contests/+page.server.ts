import type { PageServerLoad } from './$types';
import { getComments, getVideo, oauth2Client } from '$lib/youtube_client';

export const load = (async (request) => {
    let cre = {
        access_token: request.cookies.get('yt_token'),
        refresh_token: request.cookies.get('yt_refresh'),
    };
    oauth2Client.setCredentials(cre);

    var videoId = "c1vuyTndhv8";
    var video = getVideo(videoId);
    var comments = getComments(videoId);

    return { video: video, comments: comments };
}) satisfies PageServerLoad;