// packages/core/tdengine/client.ts
// tdengineClient.ts
import taos from '@tdengine/websocket';

let conn: any = null; // Adjusted type to 'any' since 'Connection' is not exported

export async function getTDClient() {
  if (!conn) {
    const config = new taos.WSConfig('ws://125.70.228.25:16041/rest/ws');
    config.setUser('root');
    config.setPwd('taosdata');
    config.setDb('tbm');
    config.setTimeOut(500); // 10 seconds timeout

   

    conn = await taos.sqlConnect(config);
  }
  return conn;
}

export async function closeTDClient() {
  if (conn) {
    await conn.close();
    conn = null;
  }
}

