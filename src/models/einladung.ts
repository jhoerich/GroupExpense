import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {UUID} from "node:crypto";
import {Gruppe} from "./gruppe";
import {Benutzer} from "./benutzer";

@Entity()
export class Einladung extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @ManyToOne(() => Gruppe, (c) => c.einladungen)
    gruppe!: Gruppe;

    @Column('uuid')
    @RelationId((einladung : Einladung) => einladung.gruppe)
    gruppeId!: UUID;

    @Column()
    erstelltAm!: Date

    static async createEinladung(gruppeId: UUID) : Promise<Einladung> {
        const einladung = new Einladung();
        einladung.gruppeId = gruppeId;
        einladung.erstelltAm = new Date();
        await einladung.save();
        return einladung;
    }
}