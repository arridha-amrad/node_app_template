import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';

class User {
    @prop({ required: true, unique: true, type: String })
    email!: string;

    @prop({ required: true, unique: true, type: String })
    username!: string;

    @prop({ required: true, type: String })
    password!: string;
}

export type IUserModel = User;

export type IUserModelDocument = DocumentType<User>;

export const UserModel = getModelForClass(User, {
    schemaOptions: {
        timestamps: true,
    },
});
