import { Request, Response } from 'express';
export declare const createValidation: import("express-validator").ValidationChain[];
export declare const updateValidation: import("express-validator").ValidationChain[];
export declare const getAll: (req: Request, res: Response) => Promise<void>;
export declare const getById: (req: Request, res: Response) => Promise<void>;
export declare const create: (req: Request, res: Response) => Promise<void>;
export declare const update: (req: Request, res: Response) => Promise<void>;
export declare const remove: (req: Request, res: Response) => Promise<void>;
export declare const importCSV: (req: Request, res: Response) => Promise<void>;
export declare const getConvertedPrice: (price: number, currency: string, targetCurrency: string) => Promise<number>;
//# sourceMappingURL=subscriptionController.d.ts.map