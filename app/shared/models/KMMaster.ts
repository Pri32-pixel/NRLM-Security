export class EventTypeModel {
    e_typeid: number = 0;
    event_type: string = null;
    createdby: number=0;
    is_active: number = 0;
    updateby : number =0;
}
export class EventTypeViewModel 
{
    e_typeid: number = 0;
    event_type: string="";
    is_active: boolean = false;
}

export class FileTypeModel {
    ftypeid: number = 0;
    file_type: string = null;
    createdby: number=0;
    is_active: number = 0;
    updateby : number =0;
}
export class FileTypeViewModel 
{
    ftypeid: number = 0;
    file_type: string="";
    is_active: boolean = false;
}

export class KMVerticalModel {
    knw_typeid: number = 0;
    knw_material_vertical: string = null;
    createdby: number=0;
    is_active: number = 0;
    updateby : number =0;
}
export class KMSubVerticalModel {
    knw_typeid: number = 0;
    knw_subtypeid: number = 0;
    knw_material_vertical: string = null;
    knw_matvert_subtype: string = null;
    createdby: number=0;
    is_active: number = 0;
    updateby : number =0;
}
export class KMVerticalViewModel 
{
    knw_typeid: number = 0;
    knw_subtypeid: number = 0;
    knw_material_vertical: string="";
    is_active: boolean = false;
}

export class LanguageModel {
    lng_id: number = 0;
    language: string = null;
    createdby: number=0;
    is_active: number = 0;
    updateby : number =0;
}
export class LanguageViewModel 
{
    lng_id: number = 0;
    language: string="";
    is_active: boolean = false;
}