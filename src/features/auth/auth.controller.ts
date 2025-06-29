import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error : any) {
      res.status(error.statusCode || 500).json({
        error : error.message || 'Internal Server Error',
      })    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({
        status: "success",
        data: token,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        error : error.message || 'Internal Server Error',
      })
    }
  };
}
