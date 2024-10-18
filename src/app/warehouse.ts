export class Warehouse{
    id:string;
    name:string;
    city:string;
    state:string;

    constructor(userResponse: any){
            this.id = userResponse.id;
            this.name = userResponse.name;
            this.city = userResponse.city;
            this.state = userResponse.state;
        }
}