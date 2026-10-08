import 'dotenv/config';

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

const config = {
    port: Number(process.env.PORT) || 3000,
    environment: process.env.NODE_ENV || 'development',
    db: {
        dialect: 'mysql',
        host: requireEnv('DB_HOST'),
        port: Number(process.env.DB_PORT) || 3306,
        username: requireEnv('DB_USERNAME'),
        password: process.env.DB_PASSWORD ?? '',
        database: requireEnv('DB_NAME'),
    },
} as const;

export default config;
