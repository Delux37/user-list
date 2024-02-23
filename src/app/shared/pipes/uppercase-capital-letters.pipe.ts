import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'appUppercaseCapitalLetter',
  standalone: true
})
export class UppercaseCapitalLettersPipe implements PipeTransform {
  public transform(value: string): string {
     return value
       .replace(/([A-Z])/g, ' $1')
       .trim()
       .toUpperCase()
  }
}
