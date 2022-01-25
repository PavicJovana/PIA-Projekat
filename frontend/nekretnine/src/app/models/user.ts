export class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    city: string;
    birthday: Date;
    phone: string;
    email: string;
    agency: string;
    licence_number: string;
    type: number;   //0 - admin;    1 - oglasivac;  2 - kupac
    status: number; //0 - odbijen;  1 - prihvacen;  2 - na cekanju
    image: any;
}