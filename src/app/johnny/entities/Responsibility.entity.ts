import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/entities/Base.entity';
import { EmployerEntity } from './Employer.entity';

@Entity('responsibilities')
export class ResponsibilityEntity extends BaseEntity {
    @Column({ type: 'jsonb' })
    descriptions: Array<string>;

    @Column({ type: 'uuid' })
    employer_id: string;

    @ManyToOne(() => EmployerEntity, (employer) => employer['responsibilities'])
    employer: EmployerEntity;
}
