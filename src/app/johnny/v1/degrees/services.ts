import { dataSource } from '../../middleware/setDataSource';
import { DegreeEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let degrees: Array<DegreeEntity> = (await dataSource
                .createQueryBuilder(DegreeEntity, 'e')
                .leftJoinAndSelect('e.courses', 'c')
                .where('e.archived = (:archived)', {
                    archived: false,
                })
                .getMany()) as Array<DegreeEntity>;
            return { code: 200, status: 'Success', degrees: degrees };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Degrees not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let degree: DegreeEntity = (await dataSource
                .createQueryBuilder(DegreeEntity, 'e')
                .leftJoinAndSelect('e.courses', 'c')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as DegreeEntity;
            return { code: 200, status: 'Success', degree: degree };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Degree not found',
            };
        }
    },
    add: async (degree: DegreeEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(DegreeEntity, 'e')
                .insert()
                .into(DegreeEntity)
                .values(degree)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (degree: DegreeEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = degree;
            let updateResult = await dataSource
                .createQueryBuilder(DegreeEntity, 'e')
                .insert()
                .into(DegreeEntity)
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
                .createQueryBuilder(DegreeEntity, 'e')
                .update(DegreeEntity)
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
                .createQueryBuilder(DegreeEntity, 'e')
                .delete()
                .from(DegreeEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
