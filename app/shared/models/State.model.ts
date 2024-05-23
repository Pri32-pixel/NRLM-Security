export class CountryDropdownModel {
    public nCountryId: string = "";
    public tCountryName: string = "";
}
export class StateViewModel 
{
    public nStateId: number = 0;
    public tStateCode: string="";
    public tStateName: string = "";
    public nCountryId: number = null;  
    public tCountryName: string ="";
    public dCreatedDt : string = ""
    public bIsActive: boolean = false;
    public nCreatedBy: number=4;
    public nUpdateBy: number=4; 
}
export class StateModel 
{
    public stateid: number = 0;
    public statecode: string="aaa";
    public statename: string = "";
    public countryid: number = null;  
    public createdby: number=4;
    public is_active:number=0;
    public updateby: number=4; 
}
export class CountryViewModel 
{
    public nCountryId: number = 0;
    public tCountryName: string="";
}