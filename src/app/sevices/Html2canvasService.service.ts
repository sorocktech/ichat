import {Injectable} from '@angular/core';

// declare let html2canvas;
import html2canvas from 'html2canvas';
@Injectable()
export class Html2canvasService {
    constructor() {
    }

    public html2canvas(ele) {

        if (!ele) {
            return;
        }

        const option = {allowTaint: true, useCORS: true};
        return html2canvas(ele, option).then((canvas) => {
            if (canvas) {
                return canvas.toDataURL('image/png');
            }
            return null;
        }).catch((res) => {
            console.log(res);
            return res;
        });
    }
}