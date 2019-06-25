import React, { Component } from 'react';

class Videos extends Component {

  state = {
    youtubePlaylistDatas: null,
  }

  componentDidMount() {
    this.getYoutubeDatas();
  }

  getYoutubeDatas() {
    fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLCGIzmTE4d0ic-x5M9c0C1MvQla301_zo&key=AIzaSyBcpblMXYwaU0gCg7QoPMZmONE-Sj8_jNs",  {method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }
    })
    .then((res)=>{
        if (res.status !== 200) {
           return;
        }
        return res.json()
    })
    .then((data) => {

        // console.log(data.items);
        const youtubeDatas = data.items;
        this.setState({youtubePlaylistDatas: youtubeDatas});
        console.log(this.state.youtubePlaylistDatas);
        // this.setState({ match : match[0], matchId : match[0].fifa_id});
        // this.setState({commentsData: {...this.state.commentsData, matchId: this.state.fifaId}});
        // this.getMatchComments(this.state.fifaId);
    });
  }





  render() {
    return (
          <div>
            <h1>Vidéos</h1>
            <video src="https://www.youtube.com/watch?v=QrOuS48v_M8&list=PLCGIzmTE4d0ic-x5M9c0C1MvQla301_zo" controls={true}></video>
              {/*this.state.youtubePlaylistDatas &&
                this.state.youtubePlaylistDatas.map((video, index) => {
                  return(
                    <video key={index} src={"https://www.youtube.com/watch?v="+ video.snippet.resourceId.videoId + "&list=PLCGIzmTE4d0ic-x5M9c0C1MvQla301_zo"} controls={true}></video>
                  )
                })
              */}
          </div>
    )
  }
}

export default Videos;
