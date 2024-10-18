import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Quagga from '@ericblade/quagga2';
import { getMainBarcodeScanningCamera } from '../../camera-access';
import { ShopifyService } from 'src/app/service/shopify.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {

  pickedUpList : any;
  packedUpList : any;
  userName :string = "";
  warehouseId : string = "";
  orderDetals: any;
  orderDetalsObject: any;
  displayStyle = "none";

  list : any;
  listObject : any;
  recOrderId : any;
  edited : boolean = true;
  errorMessage: string | undefined;
  started: boolean | undefined;
  scannedId : string = "";
  constructor(private service: ProductServiceService,private shopifyServ : ShopifyService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;

    let resp = this.service.getPickedUpList(this.warehouseId);
    resp.subscribe((data)=>{
      this.pickedUpList = data;
      console.log(this.pickedUpList)
    })
    let resp1 = this.service.getPackedUpList(this.warehouseId);
    resp1.subscribe((data)=>{
      this.packedUpList = data;
      console.log(this.packedUpList)
    })
  }
  onClickPackButton(orderId:any){
    this.displayStyle = "block";
    let resp1 = this.service.getPackOrderById(this.warehouseId,orderId);
    resp1.subscribe((data)=>{
      this.orderDetals = data; 
      this.orderDetalsObject = Array.of(this.orderDetals);
      console.log( this.orderDetalsObject)
    })
  }
  savePDF(orderId : any){
    this.displayStyle = "none";
      const data = document.getElementById('packaging_slip');
      if(data){
        html2canvas(data ).then(canvas => {
          // Few necessary setting options
          var imgWidth = 80;
          var pageHeight = 70;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
           
          const contentDataURL = canvas.toDataURL('image/png')
          let pdf = new jspdf('p', 'pt', 'a4'); // A4 size page of PDF
         
          var position = 5;
          pdf.addImage(contentDataURL, 'PNG', 0, position, 500, 500)

          let resp = this.service.updatePickedUpList(this.warehouseId,orderId)
          resp.subscribe((data)=>{
            
          })
          
           pdf.autoPrint();
  //This is a key for printing
        pdf.output('dataurl');
          });
        }
      }

      onClickShipButton(orderId:any){
        let resp = this.service.getPackedUpListById(this.warehouseId,orderId);
        resp.subscribe((data)=>{
          this.list = data
          this.listObject = JSON.parse(JSON.stringify(this.list))
          this.recOrderId = this.listObject.map((item: { orderId: any; }) => item.orderId) 
          console.log(this.recOrderId)
        })
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
        this.changeDetectorRef.detectChanges();
        Quagga.onDetected((res) => {  
          
        console.log("Quagga");
          if (res.codeResult.code) {
            console.log(res.codeResult);
            this.edited=true;
            this.started= false;
            Quagga.offDetected();
           this.scannedId=res.codeResult.code.toString();
           console.log(this.scannedId);
           if(this.recOrderId[0] === this.scannedId){
             let resp = this.service.updateListtoShipped(this.warehouseId,this.recOrderId);
             resp.subscribe((data)=>{
               alert("Matched")
             })
           }else{
             alert("Scan Again!")
           }
            
          }

          Quagga.stop();
        });
        
      }
    });
  }
  


  

}

