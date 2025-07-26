import { Column, CreateDateColumn, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

export class User {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({name : "full_name"})
    fullName: string

    @Column({unique : true})
    cpf: string

    @Column({name : "birth_date"})
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
