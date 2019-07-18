import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Player } from 'video-react';
import "./video-react.scss";

class HomeLayouts extends Component {
    render() {
        return (
            
            <div >
            <h1>HomeLayouts</h1>
                <Player ref="player" videoId="video-1" width={800} height={600}>
                    <source src={"http://localhost:8080/hls/me.mp4"}/>
                </Player>
            </div>
        )

    }
}

export default withRouter(HomeLayouts);