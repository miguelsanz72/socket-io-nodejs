import { Request, Response } from 'express';

class IndexController {


    constructor() {

    }
    public index(req: Request, res: Response) {

        res.json({
            ok: true,
            mensaje: 'Sistema en Linea!!'
        });
    }

}

export const indexController = new IndexController();
