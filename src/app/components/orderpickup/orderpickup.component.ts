import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import Quagga from '@ericblade/quagga2';
import { getMainBarcodeScanningCamera } from '../../camera-access';
import { ShopifyService } from 'src/app/service/shopify.service';

@Component({
  selector: 'app-orderpickup',
  templateUrl: './orderpickup.component.html',
  styleUrls: ['./orderpickup.component.css']
})
export class OrderpickupComponent implements OnInit {

  @Input() orderId: any;
  @Input() productId: any;
  @Input() clientId: any;
  @Input() orderQuantity : any;
  @Input() lineItemId: any;

  @Output() onDatePicked = new EventEmitter<any>();
  products : any ;  
  productObject : any = {}; 
  orders: any;
  orderObject : any;
  receivedProductId : any;
  receivedLocationId : any;
  receivedQuantity : any;
  quantity : string = "";
  totalQuantity: number =0;

  edited : boolean = true;
  errorMessage: string | undefined;
  started: boolean | undefined;
  tote: any;
  location: any;
  product_identificationno: any
  noneditableProductInput : boolean = false;
  noneditableLocationInput : boolean = false;
  showDiv : boolean = false;
  updateStore : any;
  userName :string = "";
  warehouseId : string = "";
  constructor(private route : ActivatedRoute, 
    private router : Router,
    private productService : ProductServiceService, 
    private changeDetectorRefP: ChangeDetectorRef,private shopifyServ : ShopifyService
    ) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!; 

    let resp = this.shopifyServ.getOrderById(this.warehouseId,this.clientId,this.orderId);
    resp.subscribe((data)=>{
      this.orders = data; 
      this.orderObject = Array.of(this.orders);
      console.log( this.orderObject)
    })

    let resp1 = this.productService.searchDetailsInStore(this.productId,this.warehouseId);
    resp1.subscribe((data)=>{
      this.products=data 
      this.productObject = JSON.parse(this.products); 
      this.receivedProductId = this.productObject.map((item: { productId: any; }) => item.productId) 
      this.receivedLocationId = this.productObject.map((item: { locationId: any; }) => item.locationId) 
      this.receivedQuantity = this.productObject.map((item: { storeQuantity: any; }) => item.storeQuantity)
      console.log(this.receivedProductId);
      console.log(this.receivedLocationId);
      console.log(this.receivedQuantity[0]);
      console.log(this.orderQuantity)
      if(this.receivedQuantity[0] === this.orderQuantity || this.receivedQuantity[0] > this.orderQuantity){
        this.quantity = this.orderQuantity;
      }else{
        this.quantity = this.receivedQuantity[0];
      }
      console.log("quantity" + this.quantity)
    }) 
    
  }
  
  

  onSubmit(){
    this.updateStore = {
      "tote":this.tote,
      "orderId":this.orderId,
      "productId":this.productId,
      "orderQuantity":this.orderQuantity,
      "warehouseId":this.warehouseId,
      "clientId":this.clientId,
      "locationId":(<HTMLInputElement>document.getElementById('locationId')).value,
      "line_items":this.lineItemId
    }
    console.log(this.updateStore);
    let resp = this.productService.updateInStore(this.updateStore);
    resp.subscribe((data) =>{
      this.onDatePicked.emit("Order Picked");
    })
  }
  closeScanner(){
    this.edited=true;
    Quagga.stop();
  }
  openScanner(){

    this.edited = false;
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    } 
    this.initializeScanner();
  }

  private initializeScanner(): Promise<void> {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported. Please use Chrome on Android or Safari on iOS';
      this.started = false;
      return Promise.reject(this.errorMessage);
    }
    
    return Quagga.CameraAccess.enumerateVideoDevices()
      .then(mediaDeviceInfos => {
        const mainCamera = getMainBarcodeScanningCamera(mediaDeviceInfos);
        if (mainCamera) {
          console.log(`Using ${mainCamera.label} (${mainCamera.deviceId}) as initial camera`);
          return this.initializeScannerWithDevice(mainCamera.deviceId);
        } else {
          console.error(`Unable to determine suitable camera, will fall back to default handling`);
          return this.initializeScannerWithDevice(undefined);
        }
      })
      .catch(error => {
        this.errorMessage = `Failed to enumerate devices: ${error}`;
        this.started = false;
      });
  }

  private initializeScannerWithDevice(preferredDeviceId: string | undefined): Promise<void> {
    console.log(`Initializing Quagga scanner...`);

    const constraints: MediaTrackConstraints = {};
    if (preferredDeviceId) {
      // if we have a specific device, we select that
      constraints.deviceId = preferredDeviceId;
    } else {
      // otherwise we tell the browser we want a camera facing backwards (note that browser does not always care about this)
      constraints.facingMode = 'environment';
    }

    return Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints,
        area: { // defines rectangle of the detection/localization area
          top: '25%',    // top offset
          right: '10%',  // right offset
          left: '10%',   // left offset
          bottom: '25%'  // bottom offset
        },
        target: document.querySelector('#scanner-container') ?? undefined
      },
      decoder: {
        readers: ['code_128_reader'],
        multiple: false
      },
      // See: https://github.com/ericblade/quagga2/blob/master/README.md#locate
      locate: false
    },
    (err) => {
      if (err) {
        console.error(`Quagga initialization failed: ${err}`);
        this.errorMessage = `Initialization error: ${err}`;
        this.started = false;
      } else {
        console.log(`Quagga initialization succeeded`);
        Quagga.start();
        this.started = true;
        this.changeDetectorRefP.detectChanges();
        Quagga.onDetected((res) => {  
          
        console.log("Quagga");
          if (res.codeResult.code) {
            console.log(res.codeResult);
            this.edited=true;
            this.started= false;
            Quagga.offDetected(); 
            if(this.receivedProductId == res.codeResult.code.toString() || this.receivedLocationId == res.codeResult.code.toString()){
              alert("Matched");
            }else{
              alert("Try again");
            }
          
          }

          Quagga.stop();
        });
        
      }
    });
  }
  matchId(id:any){
    if(this.receivedProductId == id || this.receivedLocationId == id){
      alert("Matched");
    }else{
      alert("Try again");
    }

  }



}
