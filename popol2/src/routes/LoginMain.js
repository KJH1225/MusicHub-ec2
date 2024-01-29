import React, {useState } from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Listb from "./Listbar.js";
import EditProfile from './EditProfile.js';
import MembershipManagement from './Membershipmang';
import MusicDetail from './MusicDetail'
import Dj from './Dj.js';
import Chart from './Chart.js';
import Monthmusic from './Monthmusic.js';
import Newchart from './Newchart.js';
import Video from './Video.js';
import Playlist from './Playlist';
import Mypage from './Mypage';
import Musics from './Musics';
import CustomAudioPlayer from './Audio.js';
import UpLoader from './UpLoader.js';
import { API_URL } from '../config/contansts.js';
import '../scss/LoginMain.scss';

const LoginMain = () => {
  const location = useLocation();
  const hidePages = ['/login-main/uploader', '/login-main/video'];
  const Hide = hidePages.includes(location.pathname);

  const [playList, setPlayList] = useState([
    {
      name: "오늘 뭐 듣지?",
      writer: "재생 버튼을 클릭해보세요",
      img: `${API_URL}/images/defaultMusicImg.png`,
      src: `${API_URL}/api/upload/music/RoieShpigler-Aluminum.mp3`,
      id: 1,
    },
  ]);

  // 음악을 클릭했을 때 재생목록에 추가하는 함수
  const onMusic = (music) => {
    // e.preventDefault();
    // console.log(e.target.value);
    console.log(music);
    setPlayList([
      {
        name: music.name,
        writer: music.singer,
        img: API_URL+ '/api' +music.imageUrl,
        src: API_URL+ '/api' +music.musicUrl,
        musicId: music.id,
        id: 1,
      },
    ]);
  };

  // 음악을 클릭했을 때 재생목록에 추가하는 함수
  const onPlaylist = (musics) => {
    if(musics == null){
      return
    }
    
    const playlist = []
    musics.map((music, index) => {
      playlist.push(
        {
          name: music.name,
          writer: music.singer,
          img: API_URL+ '/api' +music.imageUrl,
          src: API_URL+ '/api' +music.musicUrl,
          musicId: music.id,
          id: index+1,
        }
      )
    })
    console.log("playlist: ", playlist);
    setPlayList(playlist);
  };

  return (
    <div id="loginMain">
      <Listb id='Listb'/>
      <div id='loginMain-content'>
        <Routes>
          <Route path="/playlist" element={<Playlist onMusic={onMusic} />} />
          <Route path="/user/mypage" element={<Mypage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/member" element={<MembershipManagement />} />
          <Route path="/musics" element={<Musics onMusic={onMusic} />} />
          <Route path="/detail" element={<MusicDetail onMusic={onMusic} />} />
          <Route path="/dj" element={<Dj onMusic={onMusic} onPlaylist={onPlaylist} />} />
          <Route path="/month" element={<Monthmusic onMusic={onMusic} />} />
          <Route path="/chart" element={<Chart onMusic={onMusic} />} />
          <Route path='/new' element={<Newchart onMusic={onMusic} />} />
          <Route path='/video' element={<Video onMusic={onMusic} />} />
          <Route path="/uploader" element={<UpLoader />} />
        </Routes>
      </div>
      {!Hide &&  <CustomAudioPlayer playList={playList} />}
    </div>
  );
};


export default LoginMain;
