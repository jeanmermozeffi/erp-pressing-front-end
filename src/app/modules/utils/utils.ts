import { FormGroup } from '@angular/forms';

// Créer un type générique pour représenter les champs du formulaire
type FormValue<T> = {
  [key in keyof T]: any;
};

// Fonction utilitaire pour créer un objet à partir des valeurs d'un formulaire
export function createObjectFromForm<T>(formGroup: unknown): T | null {
  if (formGroup instanceof FormGroup) {
    const formValue = formGroup.value as FormValue<T>;
    const object: T = {} as T;

    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        object[key] = formValue[key];
      }
    }

    return object;
  }
  return null;
}
