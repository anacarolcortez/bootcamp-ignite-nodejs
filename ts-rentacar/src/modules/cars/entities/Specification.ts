import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from "uuid"

@Entity()
class Specification {

    @PrimaryColumn()
    id?: string

    @Column({type: "text", unique: true, nullable: false})
    name: string

    @Column({type: "text", nullable: false})
    description: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidv4()
        }
    }
}

export { Specification }