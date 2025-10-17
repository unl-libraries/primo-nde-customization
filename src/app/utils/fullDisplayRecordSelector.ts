import { createFeatureSelector, createSelector } from '@ngrx/store';
 
interface FullDisplayState {
  selectedRecordId: string | null;
}
 
interface SearchState {
  entities: { [key: string]: any };
}
 
const selectFullDisplay = createFeatureSelector<FullDisplayState>('full-display');
const selectSearchState = createFeatureSelector<SearchState>('Search');
const selectFullDisplayRecordId = createSelector(
  selectFullDisplay,
  (fullDisplay: FullDisplayState) => fullDisplay?.selectedRecordId ?? null
);
export const selectFullDisplayRecord = createSelector(
  selectFullDisplayRecordId,
  selectSearchState,
  (recordId: string | null, searchState: SearchState) => recordId ? searchState.entities[recordId] : null
);
 
=============
const selectSearchState = createFeatureSelector<SearchState>('Search');
//This selects the top-level slice of the store registered under the feature key ‘Search’. 

//Next, we create a selector to access the entities:
const selectSearchEntities = createSelector(
  selectSearchState,
  state => state.entities
);

//To find the current record, we need its docid. In the full-display feature, this is stored as selectedRecordId:
const selectFullDisplayState = createFeatureSelector<FullDisplayState>('full-display');
const selectFullviewRecordId = createSelector(
  selectFullDisplayState,
  state => state.selectedRecordId
);

//We can now combine both selectors to get the full record (including the pnx):
const selectFullviewRecord = createSelector(
  selectFullviewRecordId,
  selectSearchEntities,
  (recordId, searchEntities) => searchEntities[recordId]
);