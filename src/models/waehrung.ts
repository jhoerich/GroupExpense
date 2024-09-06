import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UUID} from "node:crypto";
import {Ausgabe} from "./ausgabe";

@Entity()
export class Waehrung extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id! : UUID;

    @Column({length: "10"})
    kennzeichen! : string;

    @Column({length: "100"})
    bezeichnung!: string;

    @Column()
    vorkomma!: number;

    @Column()
    nachkomma!: number;

    @OneToMany(() => Ausgabe, (c) => c.waehrung)
    ausgaben!: Ausgabe[];
}