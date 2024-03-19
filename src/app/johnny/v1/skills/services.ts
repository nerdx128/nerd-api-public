import { dataSource } from '../../middleware/setDataSource';
import { SkillEntity } from '../../entities';

export const services = {
    getAll: async (type?: string) => {
        try {
            let where = 'e.archived = (:archived)';
            let params: any = { archived: false };
            if (type) {
                where += ' and e.type = (:type)';
                params = { ...params, type: type };
            }
            if (!dataSource.isInitialized) await dataSource.initialize();
            let skills: Array<SkillEntity> = (await dataSource
                .createQueryBuilder(SkillEntity, 'e')
                .where(where, { ...params })
                .getMany()) as Array<SkillEntity>;
            return { code: 200, status: 'Success', skills: skills };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Skills not found',
            };
        }
    },
    getById: async (id: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let skill: SkillEntity = (await dataSource
                .createQueryBuilder(SkillEntity, 'e')
                .where('e.archived = (:archived) and e.id = (:id)', {
                    archived: false,
                    id: id,
                })
                .getOne()) as SkillEntity;
            return { code: 200, status: 'Success', skill: skill };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Skill not found',
            };
        }
    },
    add: async (skill: SkillEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            let insertResult = await dataSource
                .createQueryBuilder(SkillEntity, 'e')
                .insert()
                .into(SkillEntity)
                .values(skill)
                .execute();
            return { code: 200, status: 'Success', result: insertResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
    update: async (skill: SkillEntity) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const { updated_at, ...rest } = skill;
            let updateResult = await dataSource
                .createQueryBuilder(SkillEntity, 'e')
                .insert()
                .into(SkillEntity)
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
                .createQueryBuilder(SkillEntity, 'e')
                .update(SkillEntity)
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
                .createQueryBuilder(SkillEntity, 'e')
                .delete()
                .from(SkillEntity)
                .where('id = :id', { id: id })
                .execute();
            return { code: 200, status: 'Success', result: deleteResult };
        } catch (error: any) {
            return { code: 500, status: error.message };
        }
    },
};
