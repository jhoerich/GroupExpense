import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UUID} from "node:crypto";
import {Benutzer} from "./benutzer";
import {Gruppe} from "./gruppe";
import {Ausgabe} from "./ausgabe";

@Entity()
export class BenutzerGruppeZuordnung extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @ManyToOne(() => Benutzer, (c) => c.benutzerGruppenZuordnungen)
    benutzer!: Benutzer

    @ManyToOne(() => Gruppe, (c) => c.benutzerGruppenZuordnungen)
    gruppe!: Gruppe

    @OneToMany(() => Ausgabe, (c) => c)
    ausgaben!: Ausgabe[]

    @Column()
    beigetretenAm!: Date

    @Column()
    sollBerechnetWerdenAb!: Date
}