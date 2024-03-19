import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities';

@Entity('plants')
export class PlantEntity extends BaseEntity {
    @Column()
    quantity: number;

    @Column()
    common_name: string;

    @Column()
    kingdom: string;

    @Column()
    phylum: string;

    @Column()
    class: string;

    @Column()
    subclass: string;

    @Column()
    order: string;

    @Column()
    family: string;

    @Column()
    genus: string;

    @Column()
    species: string;

    @Column()
    cultivar: string;

    @Column({ type: 'jsonb' })
    image_url: Array<string>;
}
