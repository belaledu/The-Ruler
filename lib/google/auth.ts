import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'];

export function getGoogleAuth() {
  const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json';
  
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: SCOPES,
    });
    return auth;
  } catch (error) {
    console.error('Failed to initialize Google Auth. Please ensure credentials.json exists and is valid.', error);
    return null;
  }
}

export async function getSheetsClient() {
  const auth = getGoogleAuth();
  if (!auth) return null;
  return google.sheets({ version: 'v4', auth });
}

export async function getDriveClient() {
  const auth = getGoogleAuth();
  if (!auth) return null;
  return google.drive({ version: 'v3', auth });
}
