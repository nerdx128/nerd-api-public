import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/entities';
import { RoleEntity } from './Role.entity';
import { ResponsibilityEntity } from './Responsibility.entity';
import { ProjectEntity } from './Project.entity';
import { CollaborationEntity } from './Collaboration.entity';

@Entity('employers')
export class EmployerEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    tenure: string;

    @Column()
    location: string;

    @Column()
    logo: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @OneToMany(() => RoleEntity, (role) => role['employer'])
    roles: Array<RoleEntity>;

    @OneToMany(
        () => ResponsibilityEntity,
        (responsibility) => responsibility['employer']
    )
    responsibilities: Array<ResponsibilityEntity>;

    @OneToMany(() => ProjectEntity, (project) => project['employer'])
    projects: Array<ProjectEntity>;

    @OneToMany(
        () => CollaborationEntity,
        (collaboration) => collaboration['employer']
    )
    collaborations: Array<CollaborationEntity>;
}
