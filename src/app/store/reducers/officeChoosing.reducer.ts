import { SelectorsModel } from '../../shared/models/selectors.model';
import { officeChoosingActionType, officeChoosingTypeActions } from '../actions/officeChoosing.action';

const initialState: SelectorsModel = {
  country: [],
  city: [],
  address: []
};

export function officeChoosingReducer(
  state: SelectorsModel = initialState,
  action: officeChoosingTypeActions
) {
  switch (action.type) {
    case officeChoosingActionType.SELECTORS_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload.selectorsData,
      };
  }
  return state;
}
