export class CountryDropdownModel {
    public nCountryId: string = "";
    public tCountryName: string = "";
}
export class PostDocModel 
{
    //{"approver_id":"1","title":"title","details":"details","approver_id":"1","doccategoryid":"1","docsourceid":"1","cross_state_status":"1","knw_lang":"1","is_active":"1","createdby":"5"}
    public mkid: number = 0;
    public approver_id: number = 0;
    public title: string="";
    public details: string = "";
    public doccategoryid: number = null;  
    public docsourceid: number =null;
    public cross_state_status:number=0;
    public knw_lang:number=null;
    public is_active: number = 0;
    public createdby: number=11;
    public meta_tag: string = "";
    public aprover_desg: string = "";
    public aprover_name: string = "";
    public file_type: number = null;
    public knw_mat_vertical: number = null;
    public knw_material_subtypeid: number = null;
    public statelist: string = null;
    //public updateby: number=11;
}
export class CountryViewModel 
{
    public nCountryId: number = 0;
    public tCountryName: string="";
}

export class FeedbackRatingViewModel 
{
    public feedback_by: number = 0;
    public feedback_cmnt: string="";
    public rating_val: number = 0;
    public is_active: number=1;
    public rating_visible: number=1;
    public mkid: number=1;
    
}