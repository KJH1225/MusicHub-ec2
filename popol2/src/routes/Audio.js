import React, {useEffect} from "react";
import AudioPlayer from "react-modern-audio-player";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { API_URL } from "../config/contansts";
import { getCookie, removeCookie } from "../cookie";
import { useNavigate } from 'react-router-dom';

const CustomAudioPlayer = ( {playList} ) => {
  const navigate = useNavigate();
  console.log("Audio/playList: ", playList);

  useEffect(() => {
    // useEffect 내에서 컴포넌트가 마운트된 후에 직접 스타일을 수정합니다.
    const progressBar = document.querySelector(".progress-bar");

    if (progressBar) {
      progressBar.style.width = "50%"; // 원하는 너비로 조절합니다.
    }
  }, []);


  const addPlayList = async () => {
    //재생중인 음악 경로 가져오기
    const url = document.getElementById("rm-audio-player-audio"); 

    //재생중인 음악 이름 가져오기
    const title = document.getElementsByClassName("title")[0].innerText; 

    const login = getCookie('accessToken');
    if (getCookie('accessToken') != null) {
      await axios({
        url: `${API_URL}/api/playlist`,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + login
        },
        data: {
          playList: playList[0],
        }
      })
      .then(() => {
        alert("추가되었습니다!");
      })
      .catch(err => {
        console.error(err);
      });
    }else {
      alert('다시 로그인해주세요');
      removeCookie('accessToken');
      navigate('/');
    }
  }

  
  //재생중인 음악 다운로드
  const handleDownload = () => {

    //재생중인 음악 경로 가져오기
    const url = document.getElementById("rm-audio-player-audio"); 

    //재생중인 음악 이름 가져오기
    const title = document.getElementsByClassName("title")[0].innerText; 


    // URL에서 GET 요청 보내기
    const formet_musicUrl = url.src.substr(21); // "http://localhost:3000"부분 자르기
    axios({
      url: `${API_URL}/api/mp3`,
      method: 'GET',
      responseType: 'blob', // Set the expected response type to Blob
      params: { url: formet_musicUrl }
    })
    .then((response) => {
      console.log(response);
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      // 생성한 URL과 다운로드할 파일명 설정
      link.setAttribute('href', url);
      link.setAttribute('download', `${title}.mp3`);

      // 링크를 문서(body)에 추가
      document.body.appendChild(link);

      // 링크 클릭 => 파일 다운로드
      link.click();

      // 다운로드 후 링크와 URL을 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error during file download:', error);
    });
  };

  

  return (
    
    <div id="Audio">
      
      <AudioPlayer
        playList={playList}
        activeUI={{
          playButton: true,
          playList: true,
          prevNnext: true,
          volume: true,
          volumeSlider: true,
          repeatType: true,
          trackTime: true,
          trackInfo: true,
          artwork: true,
          progress: "bar",
        }}
        placement={{
          interface: {
            templateArea: {
              artwork: "row1-1",
              trackInfo: "row1-2",
              playButton: "row1-3",
              trackTimeCurrent: "row1-4",
              trackTimeDuration: "row1-5",
              progress: "row1-6",
              repeatType: "row1-7",
              volume: "row1-8",
              playList: "row1-9",
            },
          },
          player: "bottom",
        }}
      > 
        {/* <DownloadIcon onClick={handleDownload} style={{cursor: 'pointer'}} /> */}
        {/* <PlaylistAddIcon onClick={addPlayList} style={{cursor: 'pointer', gridArea: 'row1-9'}} /> */}
      </AudioPlayer>
    </div>
  );
};

export default CustomAudioPlayer;
