import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinctProgram',
})
export class DistinctProgramPipe implements PipeTransform {
  transform(value: unknown[], args?: any): any {

    const uniqueArray = value.reduce((acc: any, current:any) => {
      const x = acc.find((item: any) => item.id == current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    console.log(uniqueArray);
    return uniqueArray;
  }
}
