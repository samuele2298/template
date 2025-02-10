import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emptyObjectValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const numkeys = Object.keys(control.value);
        return numkeys.length > 0 ? null : { emptyObject: true};
    };
}
