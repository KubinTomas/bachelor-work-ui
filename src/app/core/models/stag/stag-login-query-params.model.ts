import { StagUserInfoModel } from "./stag-user-info.model";

export class StagLoginQueryParamsModel {
    stagUserInfo: string;
    stagUserName: string;
    stagUserRole: string;
    stagUserTicket: string;
    stagUserInfoEncoded: StagUserInfoModel[];
}
