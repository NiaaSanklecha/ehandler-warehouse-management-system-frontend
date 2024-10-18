import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import Quagga from '@ericblade/quagga2';
import Quagga1 from '@ericblade/quagga2';
import { getMainBarcodeScanningCamera } from '../../camera-access';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-scanbarcode',
  templateUrl: './scanbarcode.component.html',
  styleUrls: ['./scanbarcode.component.css']
})
export class ScanbarcodeComponent implements OnInit  {
  warehouseList:any = {};
  user :string = "";
  warehouseId : string = "";
  edited : boolean = true;
  products : any = {}; 
  product_identificationno : string = "";
  stringObject: any = {}; 
  errorMessage: string | undefined;
  started: boolean | undefined;
  locationData : any = {};
  location : string = "";
  locationObject : any;
  storedObject : any = {};
  productList : any = {};
  storageList : any = {};
  noneditableProductInput : boolean = false;
  noneditableLocationInput : boolean = false;

 
  constructor( private productService : ProductServiceService, private changeDetectorRefP: ChangeDetectorRef, private changeDetectorRefL: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    
    let resp = this.productService.getProductsNotStored(this.warehouseId);
    resp.subscribe((data)=>{
      this.productList = data;
      console.log(this.productList);
      console.log("type" + typeof this.productList)
    })
    let resp1 = this.productService.getStorage(this.warehouseId);
    resp1.subscribe((data) =>{
      console.log("get storage");
      this.storageList = data;
    })
    //this.scanProduct();
  }
  openScanner(){
    this.edited = false;
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    } 
    this.initializeScanner();
  }
  closeScanner(){
    this.edited=true;
    Quagga.stop();
  }
  /* public scanProduct() {
    
    let resp = this.productService.editProductDetails(this.scannedNumber);
    resp.subscribe((data)=>{
      this.products=data 
      this.stringObject = JSON.parse(this.products)
      console.log(this.stringObject);
    })
    
  } */

  public onSubmit(){
    this.storedObject.user = this.user
    console.log(this.stringObject) 
    console.log(Object.assign({}, ...this.stringObject));
    this.productService.addProductInStore(this.product_identificationno,this.location ,this.storedObject,this.warehouseId)
    .subscribe(data => {
      window.alert("Product Stored")
      window.location.reload();
    });
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
          top: '10%',    // top offset
          right: '20%',  // right offset
          left: '10%',   // left offset
          bottom: '20%'  // bottom offset
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
           this.product_identificationno=res.codeResult.code.toString();
           
           let resp = this.productService.searchProductDetails(this.product_identificationno,this.warehouseId);
              resp.subscribe(data =>{
                if(data == null){
                  this.products=data 
                this.stringObject = JSON.parse(this.products)
                console.log(this.stringObject);
                this.noneditableProductInput = true;
                }else{
                  alert("Please Scan Again!!!")
                  this.product_identificationno="";
                }
               
            })
           //window.alert(`code: ${res.codeResult.code} type: ${typeof res.codeResult.code}`);
            //this.scanProduct(this.scannedNumber);
            /* let resp = this.productService.editProductDetails(this.scannedNumber);
            resp.subscribe((data)=> { this.products=data 
            this.stringObject = JSON.parse(this.products)
            console.log(this.stringObject);
           window.alert(`code: ${res.codeResult.code} type: ${typeof res.codeResult.code}`); */
           // })
          }

          Quagga.stop();
        });
        
      }
    });
  }
  searchProductDetails(){
    let resp = this.productService.searchProductDetails(this.product_identificationno,this.warehouseId);
              resp.subscribe((data)=>{
                this.products=data 
                this.stringObject = JSON.parse(this.products)
                console.log(this.stringObject);
                this.noneditableProductInput = true;
            })
  }
  searchLocationDetails(){
    let resp = this.productService.searchLocation(this.location,this.warehouseId);
                resp.subscribe((rdata)=>{
                  this.locationData=rdata 
                  this.locationObject = JSON.parse(this.locationData)
                  console.log(this.locationObject);
                  this.noneditableLocationInput = true;
                })
  }
  searchLocation(){
    this.edited = false;
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    }
    this.initializeScanner1(); 
  }
    private initializeScanner1(): Promise<void> {
      if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
        this.errorMessage = 'getUserMedia is not supported. Please use Chrome on Android or Safari on iOS';
        this.started = false;
        return Promise.reject(this.errorMessage);
      }
      
      return Quagga1.CameraAccess.enumerateVideoDevices()
        .then(mediaDeviceInfos => {
          const mainCameraL = getMainBarcodeScanningCamera(mediaDeviceInfos);
          if (mainCameraL) {
            console.log(`Using ${mainCameraL.label} (${mainCameraL.deviceId}) as initial camera`);
            return this.initializeScannerWithDevice1(mainCameraL.deviceId);
          } else {
            console.error(`Unable to determine suitable camera, will fall back to default handling`);
            return this.initializeScannerWithDevice1(undefined);
          }
        })
        .catch(error => {
          this.errorMessage = `Failed to enumerate devices: ${error}`;
          this.started = false;
        });
    }
  
    private initializeScannerWithDevice1(preferredDeviceId: string | undefined): Promise<void> {
      console.log(`Initializing Quagga1 scanner...`);
  
      const constraints: MediaTrackConstraints = {};
      if (preferredDeviceId) {
        // if we have a specific device, we select that
        constraints.deviceId = preferredDeviceId;
      } else {
        // otherwise we tell the browser we want a camera facing backwards (note that browser does not always care about this)
        constraints.facingMode = 'environment';
      }
  
      return Quagga1.init({
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
          console.error(`Quagga1 initialization failed: ${err}`);
          this.errorMessage = `Initialization error: ${err}`;
          this.started = false;
        } else {
          console.log(`Quagga1 initialization succeeded`);
          Quagga1.start();
          this.started = true;
          
          
          this.changeDetectorRefL.detectChanges();
          Quagga1.onDetected((res1) => {  
            console.log("Quagga1");
            if (res1.codeResult.code) {
              console.log(res1.codeResult);
              this.edited=true;
              this.started= false;
              Quagga.offDetected();
             this.location=res1.codeResult.code.toString();
             let resp = this.productService.searchLocation(this.location,this.warehouseId);
                resp.subscribe(rdata=>{
                  if(rdata == null){
                    this.locationData=rdata 
                  this.locationObject = JSON.parse(this.locationData)
                  console.log(this.locationObject);
                  this.noneditableLocationInput =true;
                  }else{
                    alert("Please Scan Again!!!");
                    this.location="";
                  }
                })
             //window.alert(`code: ${res.codeResult.code} type: ${typeof res.codeResult.code}`);
              //this.scanProduct(this.scannedNumber);
              /* let resp = this.productService.editProductDetails(this.scannedNumber);
              resp.subscribe((data)=> { this.products=data 
              this.stringObject = JSON.parse(this.products)
              console.log(this.stringObject);
             window.alert(`code: ${res.codeResult.code} type: ${typeof res.codeResult.code}`); */
             // })
            }
            Quagga1.stop();
          });
          
        }
      });
    }

  
  

}
    



