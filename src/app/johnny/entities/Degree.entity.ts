import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/entities/Base.entity';
import { CourseEntity } from './Course.entity';
import { SchoolEntity } from './School.entity';

@Entity('degrees')
export class DegreeEntity extends BaseEntity {
    @Column()
    type: string;

    @Column()
    major: string;

    @Column()
    focus: string;

    @Column()
    minor: string;

    @Column()
    start_date: string;

    @Column()
    grad_date: string;

    @Column({ type: 'uuid' })
    school_id: string;

    @OneToMany(() => CourseEntity, (course) => course['degree'])
    courses: Array<CourseEntity>;

    @ManyToOne(() => SchoolEntity, (school) => school['degrees'])
    school: SchoolEntity;
}
