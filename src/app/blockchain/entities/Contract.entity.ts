import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities';

@Entity('contracts')
export class ContractEntity extends BaseEntity {
    @Column({ type: 'uuid' })
    company_id: string;

    @Column()
    description: string;

    @Column()
    symbol: string;

    @Column()
    address: string;

    @Column()
    type: string;

    @Column()
    minter: string;

    @Column()
    chain_id: number;

    @Column()
    chain_url: string;

    @Column()
    chain_api_key: string;

    @Column()
    partner_contract_id: string;

    @Column({ type: 'jsonb' })
    abi: string;

    @Column()
    deployed_block: string;

    @Column()
    max_supply: number;
}
