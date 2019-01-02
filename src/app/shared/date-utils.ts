export class DateUtils {

    public static toString(date: Date): string {
        console.log("DateUtils ", date);
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('/');
    }

    public static toDate(timestamp: number): Date {
        return new Date(timestamp);
    }

}