import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    database: string;

    @Column()
    domain: string;

    @Column()
    hero_image: string;
}
