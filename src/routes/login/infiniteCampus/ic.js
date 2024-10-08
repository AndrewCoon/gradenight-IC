import InfiniteCampus from 'infinite-campus';

export function ic_login(district, state, user, pass) {

    return new Promise((resolve, reject) => {
        let ic = new InfiniteCampus(district, state, user, pass);

        ic.on('ready', () => {
            console.log("IC Logged in");
            resolve(new ICClient(ic));
        });

        ic.on('error', (err) => {
            reject(err);
        });


    });
}


export class ICClient{
    constructor(ic) {
        
        this.ic = ic;
    }

    getMessages() {
        return new Promise((resolve, reject) => {
            this.ic.getNotifications(200).then((notifications) => {
                console.log(JSON.stringify(notifications));
                resolve(JSON.stringify(notifications));
            })
        });

        //return this._xmlJsonSerialize(this._makeServiceRequest('GetPXPMessages'));
    }

    getCalendar() {
        //return this._xmlJsonSerialize(this._makeServiceRequest('StudentCalendar'));
    }

    getAttendance() {
        //return this._xmlJsonSerialize(this._makeServiceRequest('Attendance'));
    }

    getGradebook(reportPeriod) {
        /*(let params = {};
        if (typeof reportPeriod !== 'undefined') {
            params.ReportPeriod = reportPeriod;
        }
        return this._xmlJsonSerialize(this._makeServiceRequest('Gradebook', params));
        */
    }

    getClassNotes() {
       // return this._xmlJsonSerialize(this._makeServiceRequest('StudentHWNotes'));
    }

    getStudentInfo() {
       // return this._xmlJsonSerialize(this._makeServiceRequest('StudentInfo'));
    }

    getSchedule(termIndex) {
        /*let params = {};
        if (typeof termIndex !== 'undefined') {
            params.TermIndex = termIndex;
        }
        return this._xmlJsonSerialize(this._makeServiceRequest('StudentClassList'));
        */
    }

    getSchoolInfo() {
        //return this._xmlJsonSerialize(this._makeServiceRequest('StudentSchoolInfo'));
    }

    listReportCards() {
       //return this._xmlJsonSerialize(this._makeServiceRequest('GetReportCardInitialData'));
    }

    getReportCard(documentGuid) {
        //return this._xmlJsonSerialize(this._makeServiceRequest('GetReportCardDocumentData', { DocumentGU: documentGuid }));
    }

    listDocuments() {
        //return this._xmlJsonSerialize(this._makeServiceRequest('GetStudentDocumentInitialData'));
    }

    getDocument(documentGuid) {
        //return this._xmlJsonSerialize(this._makeServiceRequest('GetContentOfAttachedDoc', { DocumentGU: documentGuid }));
    }

    _xmlJsonSerialize(servicePromise) {
        return servicePromise.then(result => xml2json.toJson(result[0].ProcessWebServiceRequestResult));
    }

    
}

