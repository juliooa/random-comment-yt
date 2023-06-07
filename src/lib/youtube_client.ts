import { google, youtube_v3 } from 'googleapis';
import { SECRET_GOOGLE_API, SECRET_CLIENT_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';

type Video = {
    id: string,
    title: string,
    thumbnailUrl: string,
}

export type Comment = {
    id: string;
    authorName: string;
    authorProfileImageUrl: string;
    text: string;
}

export const oauth2Client = new google.auth.OAuth2(
    SECRET_CLIENT_ID,
    SECRET_GOOGLE_API,
    "http://localhost:5174/redirect"
);

export async function getComments(videoId: string): Promise<Comment[]> {
    let totalComments: Comment[] = [];

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    let nextPageToken: string = "";
    do {
        let params = {
            part: ['id', 'snippet'],
            videoId: videoId,
            pageToken: nextPageToken,
        };

        let response = await youtube.commentThreads.list(params);
        if (response.data.items != undefined && response.data.items.length > 0) {
            response.data.items.forEach(commentThread => {
                let commentYT = commentThread.snippet?.topLevelComment;
                if (commentYT != undefined) {
                    let c: Comment = {
                        id: commentYT.id!,
                        authorName: commentYT.snippet?.authorDisplayName!,
                        authorProfileImageUrl: commentYT.snippet?.authorProfileImageUrl!,
                        text: commentYT.snippet?.textOriginal!,
                    };
                    totalComments.push(c);
                }
            });
        }

        nextPageToken = response.data.nextPageToken ?? "";
    } while (nextPageToken);

    return totalComments;
}

export async function getVideo(videoId: string): Promise<Video> {

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    let params = {
        part: ['id', 'snippet'],
        id: [videoId]
    };

    var response = await youtube.videos.list(params);
    if (response.data.items != undefined && response.data.items.length > 0) {
        var videoYT = response.data.items[0];
        var video: Video = {
            id: videoYT.id!,
            title: videoYT.snippet?.title!,
            thumbnailUrl: videoYT.snippet?.thumbnails?.high?.url!,
        }

        return video;
    }

    throw error(404, "Video not found");
}