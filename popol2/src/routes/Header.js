import React, {useEffect} from "react";
import "../scss/Header.scss";
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getCookie, removeCookie } from "../cookie";

export default function Header() {
  const logout = () => {
    removeCookie("accessToken");
    window.location.replace("/app2");
  }
  const Login = () => {
    let login = getCookie("accessToken") == null ? 
    <div>
      <NavLink to='/join'>
        <Button style={{color:"#000"}}>회원가입</Button>
      </NavLink>
      <NavLink to='/login'>
        <Button style={{color:"black"}}>로그인</Button>
      </NavLink>
    </div>
  :
    <div>
      <NavLink to='/login-main/user/mypage'>
        <Button style={{color:"black"}}>My</Button>
      </NavLink>
      <NavLink style={{color:"black"}} onClick={logout}>
        로그아웃
      </NavLink>
      {/* <NavLink>
        <Button color="inherit" onClick={logout}>로그아웃</Button>
      </NavLink> */}
    </div>
    return (
      login
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#90EE90' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <NavLink to='/'>
            <Typography variant="h6" component="div" style={{color:"#fff"}}>
              Music
              <span style={{color:"lightseagreen"}}>Hub</span>
            </Typography>
          </NavLink>
          {
            <Login/>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
