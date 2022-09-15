import { Type, Static } from '@sinclair/typebox';
import envSchema from 'env-schema';

export enum ENV_ENUM {
    prod = 'prod',
    dev = 'dev',
    test = 'test',
}

const schema = Type.Object({
    PORT: Type.Number({
        default: 8080,
    }),
    DEV_DB_URL: Type.String(),
    TEST_DB_URL: Type.String(),
    PROD_DB_URL: Type.String(),
    NODE_ENV: Type.Enum(ENV_ENUM),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
    dotenv: true,
    env: true,
    schema,
});
