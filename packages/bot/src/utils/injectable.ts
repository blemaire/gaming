import {injectable as inversifyInjecatble} from 'inversify';
import {container} from './inversify.config';

export function injectable() {
  return function (target: any) {
    inversifyInjecatble()(target);
    container.bind(target).to(target).inSingletonScope();
  };
}
