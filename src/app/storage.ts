export class Storage{
    srNo : number;
    identificationNo : string;
    productName  : string;
    origin : string;
    user : string;
    location : string;
    storeQuantity : number;
    date : string;
    productId : string;
    locationId : string;

    constructor(userResponse : any){
        this.srNo = userResponse.srNo;
        this.identificationNo = userResponse.identificationNo;
        this.productName = userResponse.productName;
        this.origin = userResponse.origin;
        this.user = userResponse.user;
        this.location = userResponse.location;
        this.storeQuantity = userResponse.storeQuantity;
        this.date = userResponse.date;
        this.productId = userResponse.productId;
        this.locationId = userResponse.locationIdl
    }
}