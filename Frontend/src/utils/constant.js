const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";
const API_BASE_URL = rawBaseUrl
  .replace(/\/+$/, "")
  .replace(/\/api\/v1$/i, "");

if (!API_BASE_URL) {
  console.error("Missing VITE_API_BASE_URL in env file.");
}

const API_PREFIX = `${API_BASE_URL}/api/v1`;

export const USER_API_END_POINT = `${API_PREFIX}/user`;
export const JOB_API_END_POINT = `${API_PREFIX}/job`;
export const APPLICATION_API_END_POINT = `${API_PREFIX}/application`;
export const COMPANY_API_END_POINT = `${API_PREFIX}/company`;
