declare class ProjectController {
    static list(req: any, res: any, next: any): Promise<void>;
    static addProject(req: any, res: any, next: any): Promise<void>;
    static editProject(req: any, res: any, next: any): Promise<void>;
}
export default ProjectController;
