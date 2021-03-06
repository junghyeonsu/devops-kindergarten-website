// ref: https://github.com/reduxjs/cra-template-redux-typescript/blob/master/template/src/features/counter/counterSlice.ts
import axios from 'axios';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import type { User } from '#/types';

import { loginAPI, logoutAPI, refreshAPI } from '#/lib/api/auth';
import storage from '#/lib/storage';
import { REFRESH_TOKEN } from '#/constants';
import JSUtility from '#/lib/JSUtility';
import { LOGIN_ASYNC, LOGOUT_ASYNC, REFRESH_ASYNC, SLICE_NAME } from './actions';

const initialState: User = {
  username: '',
  userId: 0,
  authority: [],
  isLogin: false,
};

export const refreshAsync = createAsyncThunk(
  REFRESH_ASYNC,
  async (refreshTokenIncome: string) => {
    const result = await refreshAPI(refreshTokenIncome);
    // eslint-disable-next-line no-console
    if (JSUtility.isDevelopment()) console.log('refreshAsync createAsyncThunk result.data', result.data);
    const { accessToken, refreshToken } = result.data;
    const refreshTokenWithExpire = {
      refreshToken,
      expire: JSUtility.convertCurrentTimeToTwoWeeksLaterInUnix(), // 14일로 지정
    };

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`; // 액세스 토큰을 모든 API 마다 보내도록 설정
    storage.set(REFRESH_TOKEN, refreshTokenWithExpire); // 리프레시 토큰은 로컬스토리지에 저장

    return result.data;
  },
);

export const loginAsync = createAsyncThunk(
  LOGIN_ASYNC,
  async ({ username, password }: { username: string, password: string }) => {
    const result = await loginAPI({ username, password });
    // eslint-disable-next-line no-console
    if (JSUtility.isDevelopment()) console.log('loginAsync createAsyncThunk result.data', result.data);
    const { accessToken, refreshToken } = result.data;
    const refreshTokenWithExpire = {
      refreshToken,
      expire: JSUtility.convertCurrentTimeToTwoWeeksLaterInUnix(), // 14일로 지정
    };

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`; // 액세스 토큰을 모든 API 마다 보내도록 설정
    storage.set(REFRESH_TOKEN, refreshTokenWithExpire); // 리프레시 토큰은 로컬스토리지에 저장

    return result.data;
  },
);

export const logoutAsync = createAsyncThunk(
  LOGOUT_ASYNC,
  async (username: string) => {
    const result = await logoutAPI(username); // 로그아웃 API 요청
    // eslint-disable-next-line no-console
    if (JSUtility.isDevelopment()) console.log('logoutAsync createAsyncThunk result.data', result.data);

    storage.remove(REFRESH_TOKEN); // 리프레시 토큰 삭제
    delete axios.defaults.headers.common.Authorization; // 액세스 토큰 헤더에서 삭제

    return result.data;
  },
);

export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLogin = true;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.authority = action.payload.authority;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLogin = false;
        state.username = '';
        state.userId = 0;
        state.authority = [];
      })
      .addCase(refreshAsync.fulfilled, (state, action) => {
        state.isLogin = true;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.authority = action.payload.authority;
      });
  },
});

export default authSlice.reducer;
