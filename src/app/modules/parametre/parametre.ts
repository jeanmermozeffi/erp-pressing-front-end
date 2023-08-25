import { FormControl, FormGroup } from "@angular/forms";

/**
 * Nous créons ce type car dans plusieurs composants de notre application, nous utilisons
 * un formulaire et nous ne souhaitons pas typer à chaque fois
 *
 * Il représente le formulare d'un pays
 */
export type PaysFormType = FormGroup<{
  nom: FormControl;
  code: FormControl;
  indicatif: FormControl;
}>;

/**
 * Nous créons ce type car dans plusieurs composants de notre application, nous utilisons
 * un formulaire et nous ne souhaitons pas typer à chaque fois
 *
 * Il représente le formulare d'un pays
 */
export type RegionFormType = FormGroup<{
  nom: FormControl;
  pays: FormControl;
}>;

/**
 * Nous créons ce type car dans plusieurs composants de notre application, nous utilisons
 * un formulaire et nous ne souhaitons pas typer à chaque fois
 *
 * Il représente le formulare d'un pays
 */
export type VilleFormType = FormGroup<{
  nom: FormControl;
  region: FormControl;
}>;

/**
 * Nous créons ce type car dans plusieurs composants de notre application, nous utilisons
 * un formulaire et nous ne souhaitons pas typer à chaque fois
 *
 * Il représente le formulare d'un pays
 */
export type NationaliteFormType = FormGroup<{
  nom: FormControl;
  pays: FormControl;
}>;

export type Pays = {
  id?: number;
  nom: string;
  code: string;
  indicatif: number;
};

export type Region = {
  id?: number;
  nom: string;
  pays: Pays;
};

export type Ville = {
  id?: number;
  nom: string;
  region: Region;
}

export type Nationalite = {
  id?: number;
  nom: string;
  pays: Pays;
}


