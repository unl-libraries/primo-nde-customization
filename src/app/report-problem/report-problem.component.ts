import { Component, Input, inject,OnInit } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

type FullDisplayState = {selectedRecordId: string | null;}
type SearchState = { entities: { [key: string]: any };}

const selectFullDisplay = createFeatureSelector<FullDisplayState>('full-display');
const selectSearchState = createFeatureSelector<SearchState>('Search');
//Next, we create a selector to access the entities:
const selectSearchEntities = createSelector(
  selectSearchState,
  state => state.entities
);
const selectFullDisplayRecordId = createSelector(selectFullDisplay,  state => state.selectedRecordId);
//We can now combine both selectors to get the full record (including the pnx):
const selectFullDisplayRecord = createSelector(
  selectFullDisplayRecordId,
  selectSearchEntities,
  (recordId, searchEntities) => recordId ? searchEntities[recordId] : null
);

@Component({
  selector: 'custom-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrl: './report-problem.component.scss'
})
export class ReportProblemComponent implements OnInit{
	@Input() private hostComponent!: any; //needed for retrieving data from the record
	public store = inject(Store);
	record$: Observable<any> | undefined;
	constructor(private location: Location) { }
	public baseURL = "https://unl.libwizard.com/f/primodiscovery-report?";
	//private activatedRoute = inject(ActivatedRoute);
	public isfullRecordDisplay =false;
	reportLink$!: string;
	currentURL:any []=[];
	recordID: string | undefined;
	
	ngOnInit(){
		//this.record$ = this.store.select(selectFullDisplayRecord); 
		//determine if viewing a full record
		this.currentURL = this.location.path().split('?');
		this.isfullRecordDisplay = this.currentURL[0] ==='/fulldisplay'		
		//construct the link - want to serialize the query parameters to send and include the correct docid
		//should end up with: 
		// adaptor=Local+Search+Engine&context=L&docid=alma991030187028906387&lang=en&offset=0&query=any,contains,robotics&search_scope=MyInst_and_CI&tab=Everything&vid=01UON_LINC:UNL
		//console.debug("Full record id:",selectFullviewRecordId);
		if (this.isfullRecordDisplay){
			this.record$ = this.store.select(selectFullDisplayRecord); 
			this.record$.subscribe((record) => {
			this.recordID = record?.pnx?.control.recordid[0];
			if (this.recordID){				
				this.reportLink$ = this.baseURL + this.currentURL[1].replace(/alma\d+&/,this.recordID+"&");	
			}
			else{
				//console.debug("No record id found");
				this.reportLink$ = this.baseURL + this.currentURL[1];
			}
		});
		}
	}
}
