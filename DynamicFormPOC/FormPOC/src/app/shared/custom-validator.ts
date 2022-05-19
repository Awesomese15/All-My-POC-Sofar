import { AbstractControl, ValidatorFn } from "@angular/forms";


export function username(userName : string): ValidatorFn{
    return (control: AbstractControl) : {[key : string]: any} | null=>{
        return (control.value?.toLowerCase()===userName) ?{'badUserName' : {value: control.value}}: null;
    }
}