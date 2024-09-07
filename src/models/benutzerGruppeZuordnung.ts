import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {UUID} from "node:crypto";
import {Benutzer} from "./benutzer";
import {Gruppe} from "./gruppe";
import {Ausgabe} from "./ausgabe";

@Entity("benutzer_gruppe_zuo")
export class BenutzerGruppeZuordnung extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @ManyToOne(() => Benutzer, (c) => c.benutzerGruppenZuordnungen)
    benutzer!: Benutzer

    @Column('uuid')
    @RelationId((zuordnung : BenutzerGruppeZuordnung) => zuordnung.benutzer)
    benutzerId!: UUID;

    @ManyToOne(() => Gruppe, (c) => c.benutzerGruppenZuordnungen)
    gruppe!: Gruppe

    @Column('uuid')
    @RelationId((zuordnung : BenutzerGruppeZuordnung) => zuordnung.gruppe)
    gruppeId!: UUID;

    @OneToMany(() => Ausgabe, (c) => c)
    ausgaben!: Ausgabe[]

    @Column()
    beigetretenAm!: Date

    @Column()
    sollBerechnetWerdenAb!: Date

    static async createZuordnung(benutzerId : UUID, gruppeId : UUID, beigetretenAm : Date, sollBerechnetWerdenAb : Date) : Promise<BenutzerGruppeZuordnung> {
        const zuordnung = new BenutzerGruppeZuordnung();
        zuordnung.benutzerId = benutzerId;
        zuordnung.gruppeId = gruppeId;
        zuordnung.beigetretenAm = beigetretenAm;
        zuordnung.sollBerechnetWerdenAb = sollBerechnetWerdenAb;
        zuordnung.ausgaben = []
        await zuordnung.save();
        return zuordnung;
    }
}