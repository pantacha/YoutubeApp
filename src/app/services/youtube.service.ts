import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {
  private apiUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string = "AIzaSyDbh96xwnh20Lx1K3U9Z2tt7jpfdE76pkM";
  private playlist: string = "UUuaPTYj15JSkETGnEseaFFg";

  private nextPageToken: string = "";


  constructor(public http: Http) {

  }

  getVideos(){
    let url = `${this.apiUrl}/playlistItems`;
    let params = new URLSearchParams();
    params.set('part','snippet');
    params.set('maxResults','10');
    params.set('playlistId',this.playlist);
    params.set('key',this.apiKey);

    return this.http.get(url, {search: params}).map( response => {
                console.log(response.json());
                this.nextPageToken = response.json().nextPageToken;

                let videos: any[] = [];
                for(let video of response.json().items){
                  let snippet = video.snippet;
                  videos.push(snippet);
                }
                return videos;
              });
  }

}
