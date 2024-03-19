import { dataSource } from '../../middleware/setDataSource';
import { PlantEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let where = 'p.archived = (:archived)';
            let params: any = { archived: false };
            let plants: Array<PlantEntity> = (await dataSource
                .createQueryBuilder(PlantEntity, 'p')
                .where(where, { ...params })
                .getMany()) as Array<PlantEntity>;
            console.log({ plants });
            return { code: 200, status: 'Success', plants: plants };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Plants not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let where = 'p.archived = (:archived) and p.id = (:id)';
            let params: any = { archived: false, id: id };
            let plant: PlantEntity = (await dataSource
                .createQueryBuilder(PlantEntity, 'p')
                .where(where, { ...params })
                .getOne()) as PlantEntity;
            return { code: 200, status: 'Success', plant: plant };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Plant not found',
            };
        }
    },
    add: async (plant: PlantEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(PlantEntity, 'p')
                .insert()
                .into(PlantEntity)
                .values(plant)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (plant: PlantEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = plant;
            let updateResult = await dataSource
                .createQueryBuilder(PlantEntity, 'p')
                .insert()
                .into(PlantEntity)
                .values({ ...rest, updated_at: new Date() })
                .orUpdate(
                    [
                        'name',
                        'location',
                        'logo',
                        'description',
                        'url',
                        'updated_at',
                    ],
                    ['id'],
                    {
                        skipUpdateIfNoValuesChanged: true,
                    }
                )
                .execute();

            return { code: 200, status: 'Success', result: updateResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    archive: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let archiveResult = await dataSource
                .createQueryBuilder(PlantEntity, 'p')
                .update(PlantEntity)
                .set({
                    archived: true,
                    updated_at: new Date(),
                    archived_at: new Date(),
                })
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: archiveResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    delete: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let deleteResult = await dataSource
                .createQueryBuilder(PlantEntity, 'p')
                .delete()
                .from(PlantEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
