
export class UserModel {
    username: string  ;
    userloginid:string;
    userpassword: string ;
    userid: number;
    roleid: number;
    deptid:number;
    rolename: string;
    isactive: number;
    tToken:string;
    firstname:string;
    lastname:string;
    stateid:number;
    emailid :string;
    phoneno:string;
    createdby:number;
    tUserLoginId: string ;
    tUserPassword:string;
    tloginPwd:string;
    updateby: number; 
    countryid:number;
    blockid:number;
    districtid:number;
    captchacode:string;

    constructor() {
        this.username=null;
        this.userloginid=null;
        this.userpassword=null;
        this.userid = 0;
        this.roleid = null;
        this.deptid=null;
        this.rolename = null;
        this.isactive = null;
        this.tToken = null;
        this.firstname=null;
        this.lastname=null;
        this.stateid=null;
        this.emailid =null;
        this.phoneno=null;
        this.createdby=null;
        this.tUserLoginId=null;
        this.tUserPassword=null;
        this.updateby=null;
        this.countryid=3;
        this.blockid=null;
        this.districtid=null;
    }

}

export class UserModelLogin {
    tUserLoginId: string ;
    tUserPassword:string;
    constructor() {
        this.tUserLoginId=null;
        this.tUserPassword=null;
    }

}
export class ChangePasswordModel {

        nGrievanceUserId:number;
        tUserOldPassword:string;
        tUserNewPassword:string;
        tUserNewPasswordConf:string;
        dUpdatedDt:string;
        nUpdateBy :number;

    constructor() {
        this.nGrievanceUserId=null;
        this.tUserOldPassword=null;
        this.tUserNewPassword = null;
        this.tUserNewPasswordConf=null;
        this.dUpdatedDt = null;
        this.nUpdateBy = 4;
    }

}

export class RoleDropdownModel 
{
    public nRoleId: string = "";
    public tRoleName: string="";
}
export class  DepartmentDropdownModel
{
    public nDepartmentId: string = "";
    public tDepartmentName: string="";
}

export class  StateDropdownModel
{
    public nStateId: string = "";
    public tStateName: string="";
}