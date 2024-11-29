declare class LocationController {
    static list(req: any, res: any, next: any): Promise<void>;
    static addLocation(req: any, res: any, next: any): Promise<void>;
    static editLocation(req: any, res: any, next: any): Promise<void>;
}
export default LocationController;
