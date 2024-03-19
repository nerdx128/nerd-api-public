import { dataSource } from '../../middleware/setDataSource';
import { ProjectEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let projects: Array<ProjectEntity> = (await dataSource
                .createQueryBuilder(ProjectEntity, 'e')
                .where('e.archived = (:archived)', {
                    archived: false,
                })
                .getMany()) as Array<ProjectEntity>;
            return { code: 200, status: 'Success', projects: projects };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Projects not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let project: ProjectEntity = (await dataSource
                .createQueryBuilder(ProjectEntity, 'e')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as ProjectEntity;
            return { code: 200, status: 'Success', project: project };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Project not found',
            };
        }
    },
    add: async (project: ProjectEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(ProjectEntity, 'e')
                .insert()
                .into(ProjectEntity)
                .values(project)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (project: ProjectEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = project;
            let updateResult = await dataSource
                .createQueryBuilder(ProjectEntity, 'e')
                .insert()
                .into(ProjectEntity)
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
                .createQueryBuilder(ProjectEntity, 'e')
                .update(ProjectEntity)
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
                .createQueryBuilder(ProjectEntity, 'e')
                .delete()
                .from(ProjectEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
