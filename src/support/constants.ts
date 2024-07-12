import * as dotenv from 'dotenv';

dotenv.config();

export enum FORMAT_DATA_TYPE {
  _SPACE_ = '_SPACE_',
  _STRING_RANDOM_ = 'STRING_RANDOM_',
}

export const DEFAULT_LANGUAGE = 'ja';

export enum LOCAL_STORAGE_KEYS {
  LANG = 'lang',
  USER = 'user',
  ACCESS_TOKEN = 'access_token',
  ACCESS_TOKEN_EXPIRED_AT = 'token_expired_at',
  REFRESH_TOKEN = 'refresh_token',
  REFRESH_TOKEN_EXPIRED_AT = 'refresh_token_expired_at',
}

export enum LANGUAGE {
  EN = 'English',
  JP = '日本語',
}

export const OptionLanguage = {
  EN: 'en',
  JA: 'ja',
};

function getPageURL(page: string) {
  return `${process.env.APP_URL as string}/${page}` as string;
}

export const PAGE_URLS = {
  LOGIN: getPageURL('login'),
  VIDEO: getPageURL('video/list'),
};
export enum MESSAGE_COLOR {
  FgRed = '\x1b[31m',
  Reset = '\x1b[0m',
  FgBlue = '\x1b[34m',
  FgGreen = '\x1b[32m',
}

export enum REPORT {
  PATH_FILE_REPORT = 'reports',
  FILE_NAME_REPORT = 'report.html',
}
