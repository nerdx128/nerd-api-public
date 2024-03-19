import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/entities';
import { EmployerEntity } from './Employer.entity';
import { CollaborationEntity } from './Collaboration.entity';

@Entity('projects')
export class ProjectEntity extends BaseEntity {
    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    page: string;

    @Column()
    description: string;

    @Column()
    image_url: string;

    @Column()
    date: Date;

    @ManyToOne(() => EmployerEntity, (employer) => employer['projects'])
    employer: EmployerEntity;
}
