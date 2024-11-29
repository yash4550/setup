export declare class BookingController {
    static acceptReject(data: any, callback: any, socket: any, io: any): Promise<void>;
    static statusUpdate(data: any, callback: any, socket: any, io: any): Promise<void>;
    static getBookingDriverEmit(data: any, callback: any, socket: any, io: any): Promise<void>;
    /**
     * @api {get} /api/app/booking/get-booking-driver/:lat/:long  Get Booking Driver
     * @apiVersion 1.0.0
     * @apiName Get Booking Driver
     * @apiGroup App-Booking
     */
    static getBookingDriver(req: any, res: any, next: any): Promise<void>;
    static updateLocation(data: any, callback: any, socket: any, io: any): Promise<void>;
    static verifyOtpBooking(data: any, callback: any, socket: any, io: any): Promise<void>;
    /**
     * @api {get} /api/app/booking/get-booking-list/:status  Get Booking List
     * @apiVersion 1.0.0
     * @apiName Get Booking List
     * @apiGroup App-Booking
     */
    static getBookingList(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {get} /api/app/booking/get-booking-list-customer/:status  Get Booking List
     * @apiVersion 1.0.0
     * @apiName Get Booking List
     * @apiGroup App-Booking
     */
    static getBookingListCustomer(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {get} /api/app/booking/pre-booking-ride-list  Pre Booking Ride List
     * @apiVersion 1.0.0
     * @apiName Pre Booking Ride List
     * @apiGroup App-Booking
     */
    static preBookingRide(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {post} /api/app/booking/cancel-ride  Cancel Ride List
     * @apiVersion 1.0.0
     * @apiName Cancel Ride List
     * @apiGroup App-Booking
     */
    static cancelRide(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {post} /api/app/booking/get-booking/:id  Get Booking
     * @apiVersion 1.0.0
     * @apiName Get Booking
     * @apiGroup App-Booking
     */
    static getBookingById(req: any, res: any, next: any): Promise<void>;
}
