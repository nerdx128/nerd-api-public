import { dataSource } from '../../middleware/setDataSource';
import { EmployerEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let employers: Array<EmployerEntity> = (await dataSource
                .createQueryBuilder(EmployerEntity, 'e')
                .leftJoinAndSelect('e.roles', 'r')
                .leftJoinAndSelect('e.responsibilities', 're')
                .leftJoinAndSelect('e.projects', 'p')
                .leftJoinAndSelect('e.collaborations', 'c')
                .where('e.archived = (:archived)', {
                    archived: false,
                })
                .getMany()) as Array<EmployerEntity>;
            return { code: 200, status: 'Success', employers: employers };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Employers not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let employer: EmployerEntity = (await dataSource
                .createQueryBuilder(EmployerEntity, 'e')
                .leftJoinAndSelect('e.roles', 'r')
                .leftJoinAndSelect('e.responsibilities', 're')
                .leftJoinAndSelect('e.projects', 'p')
                .leftJoinAndSelect('e.collaborations', 'c')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as EmployerEntity;
            return { code: 200, status: 'Success', employer: employer };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Employer not found',
            };
        }
    },
    add: async (employer: EmployerEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(EmployerEntity, 'e')
                .insert()
                .into(EmployerEntity)
                .values(employer)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (employer: EmployerEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = employer;
            let updateResult = await dataSource
                .createQueryBuilder(EmployerEntity, 'e')
                .insert()
                .into(EmployerEntity)
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
                .createQueryBuilder(EmployerEntity, 'e')
                .update(EmployerEntity)
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
                .createQueryBuilder(EmployerEntity, 'e')
                .delete()
                .from(EmployerEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
