export interface IUser extends Document {
    displayName: string;
    email: string;
    password?: string;
    registrationDate: Date;
    oldestValidJWT?: Date;
}
