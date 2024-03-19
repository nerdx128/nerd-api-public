import { dataSource } from '../../middleware/setDataSource';
import { CourseEntity } from '../../entities';

export const services = {
    getAll: async () => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let courses: Array<CourseEntity> = (await dataSource
                .createQueryBuilder(CourseEntity, 'e')
                .where('e.archived = (:archived)', {
                    archived: false,
                })
                .getMany()) as Array<CourseEntity>;
            return { code: 200, status: 'Success', courses: courses };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Courses not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let course: CourseEntity = (await dataSource
                .createQueryBuilder(CourseEntity, 'e')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as CourseEntity;
            return { code: 200, status: 'Success', course: course };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Course not found',
            };
        }
    },
    add: async (course: CourseEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(CourseEntity, 'e')
                .insert()
                .into(CourseEntity)
                .values(course)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (course: CourseEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = course;
            let updateResult = await dataSource
                .createQueryBuilder(CourseEntity, 'e')
                .insert()
                .into(CourseEntity)
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
                .createQueryBuilder(CourseEntity, 'e')
                .update(CourseEntity)
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
                .createQueryBuilder(CourseEntity, 'e')
                .delete()
                .from(CourseEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
