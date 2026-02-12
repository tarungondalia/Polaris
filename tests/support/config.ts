export const getBaseUrl = (): string => {
  return process.env.BASE_URL?.trim() || 'https://practicesoftwaretesting.com';
};

export const getApiUrl = (): string => {
  const baseUrl = getBaseUrl();
  if (process.env.API_URL?.trim()) {
    return process.env.API_URL.trim();
  }
  if (baseUrl.includes('with-bugs')) {
    return 'https://api-with-bugs.practicesoftwaretesting.com';
  }
  return 'https://api.practicesoftwaretesting.com';
};

export const appUrl = (path = '/'): string => {
  const base = getBaseUrl().replace(/\/$/, '');
  const hashBase = `${base}/#`;
  if (!path.startsWith('/')) {
    return `${hashBase}/${path}`;
  }
  return `${hashBase}${path}`;
};
