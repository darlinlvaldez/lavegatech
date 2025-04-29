import bcrypt from 'bcrypt';
import crypto from 'crypto';

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

code.pendingUsers = new Map();
code.resetPending = new Map();

export default code;