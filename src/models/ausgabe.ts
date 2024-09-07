import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {UUID} from "node:crypto";
import {Waehrung} from "./waehrung";
import {BenutzerGruppeZuordnung} from "./benutzerGruppeZuordnung";
import {AusgabeBenutzerZuordnung} from "./ausgabeBenutzerZuordnung";

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

    @Column('uuid')
    @RelationId((ausgabe : Ausgabe) => ausgabe.waehrung)
    waehrungId! : UUID;

    @ManyToOne(() => BenutzerGruppeZuordnung, (c) => c.ausgaben)
    benutzerGruppeZuordnung!: BenutzerGruppeZuordnung;

    @Column('uuid')
    @RelationId((ausgabae : Ausgabe) => ausgabae.benutzerGruppeZuordnung)
    benutzerGruppeZuordnungId! : UUID;

    @OneToMany(() => AusgabeBenutzerZuordnung, (c) => c.ausgabe)
    ausgabenAufgeteilt!: AusgabeBenutzerZuordnung[]

    static async createAusgabe(beschreibung : string, betrag : number, benutzerGruppeZuoId : UUID, waehrungId : UUID) : Promise<Ausgabe> {
        const ausgabe = new Ausgabe();
        ausgabe.beschreibung = beschreibung;
        ausgabe.betrag = betrag;
        ausgabe.benutzerGruppeZuordnungId = benutzerGruppeZuoId;
        ausgabe.waehrungId = waehrungId;
        ausgabe.ausgabenAufgeteilt = [];
        await ausgabe.save();
        return ausgabe;
    }

    async ausgabeBenutzerZuordnungHinzufuegen(benutzerId : UUID, betragAufgeteilt : number) : Promise<void> {
        const zuo = await AusgabeBenutzerZuordnung.createZuordnung(betragAufgeteilt, this.id, benutzerId);
        this.ausgabenAufgeteilt.push(zuo);
    }
}