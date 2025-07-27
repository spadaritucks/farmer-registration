import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    fullName: string

    @Column({unique : true})
    cpf: string

    @Column()
    birthDate: Date

    @Column()
    phone: string

    @Column()
    active: boolean

    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;       


}
