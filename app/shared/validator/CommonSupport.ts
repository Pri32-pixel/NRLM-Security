import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
@Injectable()
export class CommonSupport
{
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    action: boolean = false;
    actionButtonLabel: string = 'Retry';
    constructor( public snackBar: MatSnackBar) {
        

    }
    public showSnakBar(snakeMessage)
    {
                             let config = new MatSnackBarConfig();
                        //config.duration = this.setAutoHide ? this.autoHide : 0;
                        config.verticalPosition = this.verticalPosition;
                        config.duration=5000;  
                        this.snackBar.open(snakeMessage, this.action ? this.actionButtonLabel : undefined, config);

    }
}