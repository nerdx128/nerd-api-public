import { dataSource } from '../../middleware/setDataSource';
import { SchoolEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let schools: Array<SchoolEntity> = (await dataSource
                .createQueryBuilder(SchoolEntity, 'e')
                .leftJoinAndSelect('e.degrees', 'd')
                .leftJoinAndSelect('d.courses', 'c')
                .where('e.archived = (:archived)', {
                    archived: false,
                })
                .getMany()) as Array<SchoolEntity>;
            return { code: 200, status: 'Success', schools: schools };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Schools not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let school: SchoolEntity = (await dataSource
                .createQueryBuilder(SchoolEntity, 'e')
                .leftJoinAndSelect('e.degrees', 'd')
                .leftJoinAndSelect('d.courses', 'c')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as SchoolEntity;
            return { code: 200, status: 'Success', school: school };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'School not found',
            };
        }
    },
    add: async (school: SchoolEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(SchoolEntity, 'e')
                .insert()
                .into(SchoolEntity)
                .values(school)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (school: SchoolEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = school;
            let updateResult = await dataSource
                .createQueryBuilder(SchoolEntity, 'e')
                .insert()
                .into(SchoolEntity)
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
                .createQueryBuilder(SchoolEntity, 'e')
                .update(SchoolEntity)
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
                .createQueryBuilder(SchoolEntity, 'e')
                .delete()
                .from(SchoolEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
