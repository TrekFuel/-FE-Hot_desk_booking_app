import { OfficeChoosingInterface } from '../../shared/models/selectors.model';
import {
  officeChoosingActionType,
  officeChoosingTypeActions,
} from '../actions/officeChoosing.actions';

const initialState: OfficeChoosingInterface = {
  createAddressId: null,
  selectorsData: {
    country: [],
    city: [],
    address: [],
  },
};

export function officeChoosingReducer(
  state: OfficeChoosingInterface = initialState,
  action: officeChoosingTypeActions
) {
  switch (action.type) {
    case officeChoosingActionType.SELECTORS_DATA_SUCCESS:
      return {
        ...state,
        createAddressId: null,
        selectorsData: {
          ...action.payload.selectorsData,
        },
      };
    case officeChoosingActionType.SELECTORS_CREATE_ADDRESS:
      return {
        ...state,
        createAddressId: action.payload.selectorData.id,
        selectorsData: {
          country: [
            ...state.selectorsData.country,
            action.payload.selectorData.countryName,
          ],
          city: [
            ...state.selectorsData.city,
            {
              city: action.payload.selectorData.city,
              country: action.payload.selectorData.countryName,
            },
          ],
          address: [
            ...state.selectorsData.address,
            {
              city: action.payload.selectorData.city,
              address: action.payload.selectorData.street,
              addressId: action.payload.selectorData.id,
            },
          ],
        },
      };
    default:
      return {
        ...state,
      };
  }
}
