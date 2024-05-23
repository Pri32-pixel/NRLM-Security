export class TicketResponseModel {
     nGrievanceId: number = 0;
     tGrievanceComment: string = "";
     nGrievanceStatusId: number = null;
     tFileUploadPath: string = "";
     tGrievanceSubject: string = "";
     tGrievanceDescription: string = "";
     CreatedByName: string = "";
}
export class TicketModel {
     nGrievanceId: number = 0;
     nGrievanceTypeId: number = null;
     nGrievanceStatusId: number = null;
     nGrievanceUserId: number = null;
     nRoleId: number = 3;
     tComplaintFor: string = "Test";
     nComplaintMobileNo: number = 0;
     tGrievanceSubject: string = null;
     tGrievanceDescription: string = null;
     tFileUploadPath: string = "";
     bIsActive: boolean = true;
     nCreatedBy: number = null;
     nUpdateBy: number = null;
     nGrievancePriorityId: number = null;
     tTokenNo: string = "";
}
export class TicketAssignModel {
     nGrievanceId: number = 0;
     nRoleId: number = null;
     nGrievancePriorityId:number=null;
     nGrievanceUserId: number = null;
     tUserName: string = "";
     tGrievanceSubject: string = "";
     tGrievanceDescription: string = "";
     nGrievanceStatusId: number = 7;
     CreatedByName: string = "";
}
export class ListOfTicketViewModel {
     nGrievanceId: number = 0;
     tGrievanceType: string = "";
     tGrievanceStatus: string = "";
     tGrievanceSubject: string = "";
     tGrievanceDescription: string = "";
     tFileUploadPath: string = "";
     dCreatedDt: string = ""
     bIsActive: boolean = false;
}
export class ListOfTicketModel {
     nGrievanceId: number = 0;
     tGrievanceComment: string = "";
     tGrievanceStatus: string = "";
     tGrievanceSubject: string = "";
     GrievanceDescription: string = "";
     tFileUploadPath: string = "";
     dCreatedDt: string = ""
     bIsActive: boolean = false;
}
export class KMApproveModel {
     approver_id: number = 11;
     approver_status: number = 1;
     is_published: number = 1;
     published_by: number = 11;
     mkid: number = 0;
}

export class KMApproveModelOutside {
     outside_published_by: number = 11;
     is_outside_publish: number = 1;
     mkid: number = 0;
}


export class GetGrievanceByUserIdandStatus {
     nGrievanceUserId: number = 0;
     nGrievanceStatusId: number = 0;
}
export class FileToUploadModel {
     fileName: string = "";
     fileSize: number = 0;
     fileType: string = "";
     lastModifiedTime: number = 0;
     lastModifiedDate: Date = null;
     fileAsBase64: string = "";
}

export class ReportParamGrievanceCount {
     nGrievanceUserId: number = 0;
     nRoleId: number = 0;
}

export class ReportParamKMSCount {
     userId: number = 0;
     roleid: number = 0;
}
export class ReportParamGrievanceDetail {
     nGrievanceStatusId: number = null;
     nRoleId: number = null;
     dFromDate: string;
     dToDate: string;
}

export class ReportGrievanceHistory {
          nGrievanceId: number = 0;
          nGrievanceTypeId : number = 0;
          tGrievanceType: string = null;
          nGrievanceTypeOrder : number = 0;
          nGrievanceStatusId : number = 0;
          tGrievanceStatus : string = null;
          nGrievanceStatusOrder  : number = 0;
          nGrievanceUserId : number = 0;
          tUserName: string = null;
          tPhoneNo : string = null;
          nRoleId : number = 0;
          tRoleName : string = null;
          tComplaintFor : string = null;
          nComplaintMobileNo : string = null;    
          tGrievanceSubject: string = null; 
          tGrievanceDescription: string = null;      
          tFileUploadPath: string = null;     
          boolbIsActive: string = null;     
          dCreatedDt: string = null;     
          nCreatedBy: string = null;     
          CreatedByName: string = null;     
          DateTimedUpdatedDt: string = null;     
          nUpdateBy: number = 0;     
          UpdateByName: string = null;     
          tGrievanceComment: string = null;     
}