import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, RelationId} from "typeorm";
import 'reflect-metadata';
import {UUID} from "node:crypto";
import {Benutzer} from "./benutzer";
import {BenutzerGruppeZuordnung} from "./benutzerGruppeZuordnung";
import {Einladung} from "./einladung";
import e from "express";

@Entity()
export class Gruppe extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id! : UUID

    @Column({length: 100})
    bezeichnung! : string;

    @ManyToOne(() => Benutzer, (c) => c.gruppen)
    benutzer!: Benutzer

    @Column('uuid')
    @RelationId((gruppe : Gruppe) => gruppe.benutzer)
    benutzerId!: UUID

    @OneToMany(() => BenutzerGruppeZuordnung, (c) => c.gruppe)
    benutzerGruppenZuordnungen!: BenutzerGruppeZuordnung[];

    @OneToMany(() => Einladung, (c) => c.gruppe)
    einladungen!: Einladung[];

    static async createGruppe(bezeichnung : string, benutzerId : UUID) : Promise<Gruppe> {
        const gruppe = new Gruppe();
        gruppe.bezeichnung = bezeichnung;
        gruppe.benutzerId = benutzerId;
        gruppe.benutzerGruppenZuordnungen = [];
        gruppe.einladungen = [];
        await gruppe.save();
        gruppe.benutzerGruppenZuordnungen.push(await BenutzerGruppeZuordnung.createZuordnung(benutzerId, gruppe.id, new Date(), new Date()))
        return gruppe;
    }

    async benutzerHinzufuegen(benutzerId : UUID, sollBerechnetWerdenAb : Date | null) : Promise<void> {
        const zuo = await BenutzerGruppeZuordnung.createZuordnung(benutzerId, this.id, new Date(), sollBerechnetWerdenAb ?? new Date());
        this.benutzerGruppenZuordnungen.push(zuo);
    }

    async einladungHinzufuegen() : Promise<Einladung> {
        const einladung = await Einladung.createEinladung(this.id);
        this.einladungen.push(einladung);
        return einladung;
    }
}