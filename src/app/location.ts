export class Location {
    id : string;
    brandName : string;
    rowNo : number;
    columnNumber : number;
    locationName : string

    constructor(userResponse : any){
        this.id = userResponse.id;
        this.brandName = userResponse.brandName;
        this.rowNo = userResponse.rowNo;
        this.columnNumber = userResponse.columnNumber;
        this.locationName = userResponse.locationName;
    }
}
