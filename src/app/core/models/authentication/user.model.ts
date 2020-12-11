import { StagUserInfoModel } from "../stag/stag-user-info.model";

export class UserModel {
    email: string;
    name: string;
    surname: string;

    activeStagUserInfo: StagUserInfoModel;
    stagUserInfo: StagUserInfoModel[];

    isStagUser: boolean;
}