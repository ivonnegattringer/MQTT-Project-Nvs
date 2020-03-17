import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
selector: 'app-camera',
templateUrl: './camera.component.html',
styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
    public showWebcam = true;
    public webcamAvailable = false;
    public deviceId: string;

    public ngOnInit(): void {
       /*  WebcamUtil.getAvailableVideoInputs()
        .then((mediaDevice: MediaDeviceInfo[]) => {
            this.webcamAvailable = mediaDevice && mediaDevice.length > 1;
        });*/
    }

    public toggleWebcam(): void {
        this.showWebcam = !this.showWebcam;
    }
}