const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;
const TEST_ORIGIN = process.env.TEST_ORIGIN || '';
app.use(cors({ origin: TEST_ORIGIN, credentials: true }));
app.use(express.json());
app.get('/cookie/set', (req, res) => {
  res.cookie('vio015_test_cookie', 'poc-ok', { httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 15 * 60 * 1000 });
  res.json({ ok: true, message: 'Cookie artificial emitted' });
});
app.get('/cookie/check', (req, res) => {
  const received = /(?:^|;\s*)vio015_test_cookie=/.test(req.headers.cookie || '');
  res.json({ cookieRecebido: received, cookieHeaderPresente: Boolean(req.headers.cookie) });
});
app.get('/health', (req, res) => res.json({ ok: true }));
app.listen(PORT, () => console.log('POC cookie API listening on ' + PORT));
