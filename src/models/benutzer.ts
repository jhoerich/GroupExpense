import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import 'reflect-metadata';
import {UUID} from "node:crypto";
import {Gruppe} from "./gruppe";
import {BenutzerGruppeZuordnung} from "./benutzerGruppeZuordnung";

@Entity()
export class Benutzer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @Column({length: 100})
    benutzername!: string;

    @Column({length: 200})
    email!: string;

    @Column({length: 300})
    passwortHash!: string;

    @OneToMany(() => Gruppe, (c) => c.benutzer)
    gruppen!: Gruppe[];

    @OneToMany(() => BenutzerGruppeZuordnung, (c) => c.benutzer)
    benutzerGruppenZuordnungen!: BenutzerGruppeZuordnung[];
}