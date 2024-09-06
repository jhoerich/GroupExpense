import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import 'reflect-metadata';
import {UUID} from "node:crypto";
import {Benutzer} from "./benutzer";
import {BenutzerGruppeZuordnung} from "./benutzerGruppeZuordnung";

@Entity()
export class Gruppe extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id! : UUID

    @Column({length: 100})
    bezeichnung! : string;

    @ManyToOne(() => Benutzer, (c) => c.gruppen)
    benutzer!: Benutzer

    @OneToMany(() => BenutzerGruppeZuordnung, (c) => c.gruppe)
    benutzerGruppenZuordnungen!: BenutzerGruppeZuordnung[];
}