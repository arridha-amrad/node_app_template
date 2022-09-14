import { Type, Static } from '@sinclair/typebox';
import envSchema from 'env-schema';

const schema = Type.Object({
    PORT: Type.Number({
        default: 8080,
    }),
    DB_URL: Type.String(),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
    dotenv: {
        path: '../../.env.dev',
    },
    schema,
});
