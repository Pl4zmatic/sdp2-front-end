export interface User {
    ID: number;
    LASTNAME: string;
    FIRSTNAME: string;
    EMAIL: string;
    ROL: number;
    ADRES: string;
    BIRTHDATE: string;
    GSMNUMMER: string;
}

export interface CreateUserBody {
    ADRES: string;
    BIRTHDATE: string;
    EMAIL: string;
    FIRSTNAME: string;
    GSMNUMMER: string;
    LASTNAME: string;
    PASSWORD: string;
    ROL: number;
} 