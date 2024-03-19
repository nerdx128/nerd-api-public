import { dataSource } from '../../middleware/setDataSource';
import { RoleEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let roles: Array<RoleEntity> = (await dataSource
                .createQueryBuilder(RoleEntity, 'e')
                .where('e.archived = (:archived)', {
                    archived: false,
                })
                .getMany()) as Array<RoleEntity>;
            return { code: 200, status: 'Success', roles: roles };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Roles not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let role: RoleEntity = (await dataSource
                .createQueryBuilder(RoleEntity, 'e')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as RoleEntity;
            return { code: 200, status: 'Success', role: role };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Role not found',
            };
        }
    },
    add: async (role: RoleEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(RoleEntity, 'e')
                .insert()
                .into(RoleEntity)
                .values(role)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (role: RoleEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = role;
            let updateResult = await dataSource
                .createQueryBuilder(RoleEntity, 'e')
                .insert()
                .into(RoleEntity)
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
                .createQueryBuilder(RoleEntity, 'e')
                .update(RoleEntity)
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
                .createQueryBuilder(RoleEntity, 'e')
                .delete()
                .from(RoleEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
