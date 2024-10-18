import { byte, int } from "@zxing/library/esm/customTypings";

export class Product{
    
    productName : string;
    productDescription : string;
    productCategory: string;
        serialNo: string;
        productIdentificationNo: string; 
        quantity : number;
        status : string;
        date : Date;
        warehouseId : string;
        userId : string;
        productLength: number;
        productWidth: number;
        productHeight: number;
        productWeight: number;
        sellingPrice: number;
        sellingAccount :string;
        sellingDesc: string;
        costPrice: number;
        costAccount: string;
        costDesc : string;
        image : byte;
 
        constructor(userResponse : any){
            this.productName = userResponse.productName;
            this.productDescription = userResponse.productDescription;
            this.productCategory = userResponse.productCategory;
            this.serialNo = userResponse.serialNo;
            this.productIdentificationNo = userResponse.productIdentificationNo; 
            this.quantity = userResponse.quantity;
            this.status = userResponse.status;
            this.date = userResponse.date;
            this.warehouseId = userResponse.warehouseId;
            this.userId = userResponse.userId;
            this.productLength = userResponse.productLength;
            this.productWidth = userResponse.productWidth;
            this.productHeight = userResponse.productHeight;
            this.productWeight = userResponse.productWeight;
            this.sellingPrice = userResponse.sellingPrice;
            this.sellingAccount = userResponse.sellingAccount;
            this.sellingDesc = userResponse.sellingDesc;
            this.costPrice = userResponse.costPrice;
            this.costAccount = userResponse.costAccount;
            this.costDesc = userResponse.costDesc;
            this.image =userResponse.image;
        }
 
}