import { buildSignature } from 'file:///home/allan/chengtong-vision/apps/backend/utils/smsSender.js';

const username = '13636685581';
const password = '$2a$10$oIIKUzCeEDG2F2eCCJuV2eLMbNdRSBe3Ni6PiWkxqoCf0db7PnT7m';
const timestamp = '1596254400000';

console.log('payload:', `${username}${password}${timestamp}`);
console.log('signature:', buildSignature(username, password, timestamp));
