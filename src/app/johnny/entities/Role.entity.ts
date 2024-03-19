import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/entities';
import { EmployerEntity } from './Employer.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
    @Column()
    title: string;

    @Column()
    tenure: string;

    @ManyToOne(() => EmployerEntity, (employer) => employer['roles'])
    employer: EmployerEntity;
}
