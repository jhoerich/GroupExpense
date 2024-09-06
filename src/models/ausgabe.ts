import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UUID} from "node:crypto";
import {Waehrung} from "./waehrung";
import {BenutzerGruppeZuordnung} from "./benutzerGruppeZuordnung";

@Entity()
export class Ausgabe extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @Column({length: 200})
    beschreibung!: string

    @Column()
    betrag!: number

    @ManyToOne(() => Waehrung, (c) => c.ausgaben)
    waehrung! : Waehrung;

    @ManyToOne(() => BenutzerGruppeZuordnung, (c) => c.ausgaben)
    benutzerGruppeZuordnung!: BenutzerGruppeZuordnung;
}