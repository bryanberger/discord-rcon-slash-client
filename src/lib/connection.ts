import rcon from 'rcon';

const options = {
  tcp: true, // false for UDP
  challenge: false // COD doesn't require a challenge
};

const conn = new rcon(
  process.env.GAME_SERVER_HOST,
  process.env.GAME_SERVER_PORT,
  process.env.GAME_SERVER_PASSWORD,
  options
);

const connect = () => {
  return new Promise((resolve, reject) => {
    if (conn.hasAuthed) {
      console.log('re-using connection');
      return resolve(true);
    }

    console.log('making new rcon connection');

    conn.connect();
    conn.on('auth', () => resolve(true)).on('error', (err: Error) => reject(err));
  });
};

export async function send(message: string) {
  await connect();
  conn.send(message.trim());
}
