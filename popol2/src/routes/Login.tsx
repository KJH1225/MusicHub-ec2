import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Scroll from './Scroll';
import axios from 'axios';
import '../scss/Login.scss';
import { useNavigate } from "react-router-dom";
import { setCookie } from '../cookie';
import { API_URL } from '../config/contansts'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// 기본 테마 생성
const defaultTheme = createTheme();

// 로그인 페이지 컴포넌트
export default function SignInSide() {
  const navigate = useNavigate();
  
// 로그인 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get('email');
    const pwd = data.get('password');
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // 서버로 로그인 요청을 보내어 처리
    await axios.post(`${API_URL}/api/login`,{id,pwd})
			.then((res)=>{
				if (res.status === 200) {
          // 로그인 성공 시 서버에서 받은 토큰을 쿠키에 저장
					const accessToken = res.data.accessToken;
          const time = 3600; //1시간
          const expiration = new Date(Date.now() + time * 1000);
          // console.log("expiration",expiration);
					setCookie('accessToken',accessToken,{
						expires: expiration,
                        // httpOnly: true,
					});
				}
				console.log("로그인 성공 res: ",res);
        // 로그인 성공 시 음악 목록 페이지로 이동
				navigate('/login-main/musics');
			})
			.catch((error)=>{
				console.error("로그인 실패: ",error);
        // 로그인 실패 시 경고 메시지 출력
        alert("아이디나 비밀번호가 틀렸습니다.");
			})
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 6,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <p>테스트 ID: 123</p>
            <p>테스트 PWD: 123</p>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    비밀번호 잊었어요?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/join" variant="body2">
                    {"회원 아니세요? 회원가입"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          <Scroll />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}