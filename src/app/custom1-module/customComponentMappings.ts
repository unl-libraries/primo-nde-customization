import { ReportProblemComponent } from '../report-problem/report-problem.component';
import { HathiTrustAvailabilityComponent } from '../hathi-trust-availability/hathi-trust-availability.component'; 
// Define the map
export const selectorComponentMap = new Map<string, any>([

	['nde-record-availability-after', ReportProblemComponent],
	['nde-record-availability-bottom', HathiTrustAvailabilityComponent]	


]);
