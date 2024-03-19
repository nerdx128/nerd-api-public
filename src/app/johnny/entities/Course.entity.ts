import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/entities';
import { DegreeEntity } from './Degree.entity';

@Entity('courses')
export class CourseEntity extends BaseEntity {
    @Column()
    department: string;

    @Column()
    number: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'uuid' })
    degree_id: string;

    @ManyToOne(() => DegreeEntity, (degree) => degree['courses'])
    degree: DegreeEntity;
}
