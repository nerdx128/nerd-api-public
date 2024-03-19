import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getDataSource = async (db: string, entities: Array<any>) => {
    const env = process.env.NODE_ENV as string;
    console.log(`NERDX::${new Date().toISOString()}::Environment: ${env}`);

    let host = (
        env === 'prod' ? process.env.DB_HOST : process.env.DB_HOST_LOCAL
    ) as string;
    console.log(
        `NERDX::${new Date().toISOString()}::Connecting to ${host} for ${db}`
    );
    return new DataSource({
        type: 'postgres',
        host: host,
        port: 5432,
        connectTimeoutMS: 0,
        maxQueryExecutionTime: 0,
        extra: {
            connectionTimeoutMillis: 0,
            query_timeout: 0,
            statement_timeout: 0,
            poolSize: 1000,
        },
        namingStrategy: new SnakeNamingStrategy(),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: db,
        entities: [...entities],
        synchronize: false,
        logging: false,
    } as DataSourceOptions);
};
