export class DistrictDropdownModel {
     public nStateId: string = "";
     public tStateName: string = "";
 }

 export class DistrictViewModel 
{
    public nDistrictID: number = 0;
    public tDistrictName: string="";
    public tDistrictCode: string = "";
    public nStateId: number = null;  
    public tStateName: string ="";
    public dCreatedDt : string ="";
    public bIsActive: boolean = false;
    public nCreatedBy: number=4;
    public nUpdateBy: number=4; 
}
export class StateViewModel 
{
    public nStateId: number = 0;
    public tStateName: string="";
}
