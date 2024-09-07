import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import 'reflect-metadata';
import {UUID} from "node:crypto";
import {Gruppe} from "./gruppe";
import {BenutzerGruppeZuordnung} from "./benutzerGruppeZuordnung";
import {AusgabeBenutzerZuordnung} from "./ausgabeBenutzerZuordnung";

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

    @OneToMany(() => AusgabeBenutzerZuordnung, (c) => c.benutzer)
    ausgaben!: AusgabeBenutzerZuordnung[];

    static async createBenutzer(benutzername : string, email : string, passwortHash: string) : Promise<Benutzer> {
        const benutzer = new Benutzer();
        benutzer.benutzername = benutzername;
        benutzer.email = email;
        benutzer.passwortHash = passwortHash;
        benutzer.gruppen = [];
        benutzer.benutzerGruppenZuordnungen = [];
        benutzer.ausgaben = [];
        await benutzer.save();
        return benutzer;
    }

    async gruppeHinzufuegen(gruppeId : UUID, sollBerechnetWerdenAb : Date | null) : Promise<void> {
        const zuo = await BenutzerGruppeZuordnung.createZuordnung(this.id, gruppeId, new Date(), sollBerechnetWerdenAb ?? new Date());
        this.benutzerGruppenZuordnungen.push(zuo);
    }

    async ausgabeHinzufuegen(ausgabeId : UUID, betragAufggteilt : Number) {
        const zuo = await AusgabeBenutzerZuordnung.createZuordnung(betragAufggteilt, ausgabeId, this.id);
        this.ausgaben.push(zuo);
    }
}