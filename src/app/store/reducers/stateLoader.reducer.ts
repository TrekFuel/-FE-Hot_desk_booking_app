import {
  stateLoaderActionType,
  stateLoaderTypeActions,
} from '../actions/stateLoader.action';
import { LoaderInterface } from '../../layout/loader/modules/loader.interface';

const viseble: LoaderInterface = { viseble: false };

export function stateLoaderReducer(
  state: LoaderInterface = viseble,
  action: stateLoaderTypeActions
) {
  switch (action.type) {
    case stateLoaderActionType.LOADER_VISIBLE:
      return {
        ...state,
        viseble: true,
      };
    case stateLoaderActionType.LOADER_NOT_VISIBLE:
      return {
        ...state,
        viseble: false,
      };
  }
  return state;
}
