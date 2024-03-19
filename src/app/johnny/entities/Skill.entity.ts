import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities/Base.entity';

@Entity('skills')
export class SkillEntity extends BaseEntity {
    @Column()
    type: 'fullstack' | 'blockchain' | 'platform';

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    years: string;

    @Column()
    rating: string;
}
