import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {UUID} from "node:crypto";
import {Ausgabe} from "./ausgabe";
import {Benutzer} from "./benutzer";

@Entity("ausgabe_benutzer_zuo")
export class AusgabeBenutzerZuordnung extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id! : UUID

    @Column()
    betragAufgeteilt! :Number

    @ManyToOne(() => Ausgabe, (c) => c.ausgabenAufgeteilt)
    ausgabe!: Ausgabe

    @Column('uuid')
    @RelationId((zuo : AusgabeBenutzerZuordnung) => zuo.ausgabe)
    ausgabeId!: UUID

    @ManyToOne(() => Benutzer, (c) => c.ausgaben)
    benutzer!: Benutzer

    @Column('uuid')
    @RelationId((zuo : AusgabeBenutzerZuordnung) => zuo.ausgabe)
    benutzerId!: UUID

    static async createZuordnung(betragAufgeteilt: Number, ausgabeId : UUID, benutzerId : UUID) : Promise<AusgabeBenutzerZuordnung> {
        const zuordnung = new AusgabeBenutzerZuordnung();
        zuordnung.betragAufgeteilt = betragAufgeteilt;
        zuordnung.ausgabeId = ausgabeId;
        zuordnung.benutzerId = benutzerId;
        await zuordnung.save();
        return zuordnung;
    }
}