import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Funções de validação dos formulários.
// Obs: Todas as mensagens de retorno devem ter o valor atribuído na propriedade errorMessage.

export function validatorNameSign(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
        if (validateMaxCharacterLength(control.value, 40)) 
            return { errorMessage: "Digite um nome com até 40 caracteres" };

        else if (validateMinCharacterLength(control.value, 5))
            return { errorMessage: "Digite um nome com pelo menos 5 caracteres" };

        else return null;
    };
};

export function validatorPasswordSign(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
         if (validateMaxCharacterLength(control.value, 40))
            return { errorMessage: "Digite uma senha com até 40 caracteres" };

        else if (validateMinCharacterLength(control.value, 5))
            return { errorMessage: "Digite uma senha com pelo menos 5 caracteres" };

        else return null;
    };
};


// Funções de apoio aos validadores

function validateMinCharacterLength(value: string, min: number): boolean  {
    if (value.length < min) {
        return true;
    };
    
    return false;
};

function validateMaxCharacterLength(value: string, max: number): boolean {
    if (value.length > max) {
        return true;
    };

    return false;
};
