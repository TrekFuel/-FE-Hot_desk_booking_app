import { LoaderInterface } from '../../layout/loader/models/loader.interface';
import { loaderActionType, loaderTypeActions } from '../actions/loader.actions';

const initialState: LoaderInterface = { visible: null };

export function loaderReducer(
  state: LoaderInterface = initialState,
  action: loaderTypeActions
) {
  switch (action.type) {
    case loaderActionType.LOADER_START:
      return {
        ...state,
        visible: true,
      };
    case loaderActionType.LOADER_FINISH:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}
