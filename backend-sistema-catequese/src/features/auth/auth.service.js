import dotenv from 'dotenv';
dotenv.config();

const authUrl = process.env.NEON_AUTH_URL;
const authKey = process.env.NEON_AUTH_KEY;

function getHeaders() {
  if (!authUrl || !authKey) {
    throw new Error('NEON_AUTH_URL e NEON_AUTH_KEY devem estar configurados.');
  }

  return {
    'Content-Type': 'application/json',
    apikey: authKey,
    Authorization: `Bearer ${authKey}`,
  };
}

function buildUrl(path) {
  const normalizedUrl = authUrl.endsWith('/') ? authUrl.slice(0, -1) : authUrl;
  return `${normalizedUrl}${path}`;
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error_description || data.error || 'Erro ao comunicar com Neon Auth.';
    throw new Error(message);
  }
  return data;
}

class AuthService {
  async signup(email, password) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios para cadastro.');
    }

    const response = await fetch(buildUrl('/v1/signup'), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return await parseResponse(response);
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios para login.');
    }

    const url = new URL(buildUrl('/v1/token'));
    url.searchParams.set('grant_type', 'password');

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return await parseResponse(response);
  }

  async me(token) {
    if (!token) {
      throw new Error('Token de autenticação não informado.');
    }

    const response = await fetch(buildUrl('/v1/user'), {
      method: 'GET',
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    });

    return await parseResponse(response);
  }
}

export default new AuthService();
