import { SelectorsModel } from '../../shared/models/selectors.model';
import {
  officeChoosingActionType,
  officeChoosingTypeActions,
} from '../actions/officeChoosing.action';

const initialState: SelectorsModel = {
  country: [],
  city: [],
  address: [],
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
    case officeChoosingActionType.SELECTORS_CREATE_ADDRESS:
      console.log(action.payload.selectorData, state);
      return {
        country: [...state.country, action.payload.selectorData.countryName],
        city: [
          ...state.city,
          {
            city: action.payload.selectorData.city,
            country: action.payload.selectorData.countryName,
          },
        ],
        address: [
          ...state.address,
          {
            city: action.payload.selectorData.city,
            address: action.payload.selectorData.street,
            addressId: action.payload.selectorData.id,
          },
        ],
      };
  }
  return state;
}
