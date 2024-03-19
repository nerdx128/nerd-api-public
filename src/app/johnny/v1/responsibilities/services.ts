import { dataSource } from '../../middleware/setDataSource';
import { ResponsibilityEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let responsibilities: Array<ResponsibilityEntity> =
                (await dataSource
                    .createQueryBuilder(ResponsibilityEntity, 'e')
                    .where('e.archived = (:archived)', {
                        archived: false,
                    })
                    .getMany()) as Array<ResponsibilityEntity>;
            return {
                code: 200,
                status: 'Success',
                responsibilities: responsibilities,
            };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Responsibilities not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let responsibility: ResponsibilityEntity = (await dataSource
                .createQueryBuilder(ResponsibilityEntity, 'e')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as ResponsibilityEntity;
            return {
                code: 200,
                status: 'Success',
                responsibility: responsibility,
            };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Responsibility not found',
            };
        }
    },
    add: async (responsibility: ResponsibilityEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(ResponsibilityEntity, 'e')
                .insert()
                .into(ResponsibilityEntity)
                .values(responsibility)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (responsibility: ResponsibilityEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = responsibility;
            let updateResult = await dataSource
                .createQueryBuilder(ResponsibilityEntity, 'e')
                .insert()
                .into(ResponsibilityEntity)
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
                .createQueryBuilder(ResponsibilityEntity, 'e')
                .update(ResponsibilityEntity)
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
                .createQueryBuilder(ResponsibilityEntity, 'e')
                .delete()
                .from(ResponsibilityEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
