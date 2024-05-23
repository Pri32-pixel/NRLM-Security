export class DocSourceModel {
     docsourceid: number = 0;
     docsourcecode: string=null;
     docsource: string = null;
     docsourceorder: number = 0;
     createdby: number=0;
     is_active: number = 0;
     updateby : number =0;
}
export class DocSourceViewModel 
{
     nDocSourceId: number = 0;
     tDocSourceType: string="";
     nDocSourceOrder: number = 0;
     dCreatedDt : string = ""
     bIsActive: boolean = false;
}
