export interface FileResponse {
    id: string
    filename: string
    path: string
    mimetype: string
    createdAt: string
}

export type FileEntries = {
    filename: string;
    originalName: any;
    path: string;
    mimetype: string;
    size: number;
    extension: any;
}

export type GoogleOauth2Response = {
    id: string
    email: string
    verified_email: boolean
    name: string
    given_name: string
    family_name: string
    picture: string
}

export enum Role {
    ADMIN = 'admin',
    PESERTA = 'peserta',
}

export enum UserDocuments {
    KTP = 'KTP',
    DocNBM = 'DocNBM',
    DocNIDN = 'DocNIDN',
    Passport = 'Passport',
    BPJSKesehatan = 'BPJSKesehatan',
    BPJSKetenagakerjaan = 'BPJSKetenagakerjaan',
    SertifikasiDosen = 'SertifikasiDosen',
}