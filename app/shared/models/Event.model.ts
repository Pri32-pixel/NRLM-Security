export class AddEventModel {
    t_eventid: number = 0;
    event_name: string = null;
    event_type: number = null;
    event_short_desc: string = null;
    intent_audince: string = null;
    event_venue: string = null;    
    event_start_date_time: string = null;
    event_end_date_time: string = null;
    eventstarttime: string = null;
    eventendtime: string = null;
    event_state: number = 2;
    cross_state:number=null;
    is_active: number = 1;
    createdby: number = null;
    updateby: number = null;
    statelist: string = null;
}

export class ViewEventModel {
    t_eventid: number = 0;
    event_name: string = null;
    event_start_date_time: string = null;
    event_end_date_time: string = null;
    isAllDay=false;
}

export class SearchEventModel {
    title: string = "";
    file_type: string = "";
    doccategoryid: string = "";
    meta_tag: string = "";
    knw_mat_vertical: string = "";
    aprover_name: string = "";
    aprover_desg: string = "";
    knw_lang: string = "";
    user_id: string = "";
    docsourceid: string = "";
    stateid: string = "";
}