
import {Paged} from './paged';

export interface PersonDto {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export type PagedPersonsDto = Paged<PersonDto>;
