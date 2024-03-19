import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/entities/Base.entity';
import { DegreeEntity } from './Degree.entity';

@Entity('schools')
export class SchoolEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    logo: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @OneToMany(() => DegreeEntity, (degree) => degree['school'])
    degrees: Array<DegreeEntity>;
}
