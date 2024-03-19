import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/entities';
import { EmployerEntity } from './Employer.entity';

@Entity('collaborations')
export class CollaborationEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    url: string;

    @Column()
    employer_id: string;

    @ManyToOne(() => EmployerEntity, (employer) => employer['collaborations'])
    employer: EmployerEntity;
}
