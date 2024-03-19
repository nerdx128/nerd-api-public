import { getDataSource } from '../../middleware/databaseFunctions';
import { DataSource } from 'typeorm';
import * as e from '../entities';

export let dataSource: DataSource;
export const setDataSource = async (req: any, res: any, next: any) => {
    console.log('NERDX::', new Date().toISOString(), '::Setting Data Source');
    try {
        const db = 'blockchain';

        let entities = [e.CompanyEntity, e.ContractEntity];

        if (db) dataSource = await getDataSource(db, entities);
        next();
    } catch (error: any) {
        next(error.message);
    }
};
