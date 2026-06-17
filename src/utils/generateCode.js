import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const CODE_EXPIRATION = 10 * 60 * 1000; 
export const RESEND_COOLDOWN = 3 * 60 * 1000;

const code = {};

code.generateCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

code.hashPassword = password => bcrypt.hash(password, 10);

code.validateCode = (map, email, codeInput) => {
  const pending = map.get(email);
  if (!pending) return { error: 'El código ha expirado.' };
  if (Date.now() > pending.expiresAt) {
    map.delete(email);
    return { error: 'El código ha expirado. Solicita uno nuevo.' };
  }
  if (pending.code !== codeInput) return { error: 'Código inválido.' };
  return { success: true, data: pending };
};

code.cleanExpired = (map) => {
  const now = Date.now();

  for (const [email, data] of map) {
    if (data.expiresAt <= now) {
      map.delete(email);
    }
  }
};

code.pendingUsers = new Map();
code.resetPending = new Map();

setInterval(() => {
  code.cleanExpired(code.pendingUsers);
  code.cleanExpired(code.resetPending);
}, 60 * 1000);

export default code;