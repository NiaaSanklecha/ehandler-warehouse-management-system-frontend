import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { getMainBarcodeScanningCamera } from '../../camera-access';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  errorMessage: string | undefined;
  started: boolean | undefined;
  @Output() scannedNumber =new EventEmitter();
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    } 
     
  }

  
}
