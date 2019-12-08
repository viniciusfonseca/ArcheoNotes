import AppContainer from './src/globals'
import { Model } from '@types/sequelize';

import Article from './src/models/Article'

import { AxiosInstance } from 'axios';

declare global {

    namespace NodeJS {
        export interface ProcessEnv {
            PORT: string
            DROPBOX_TOKEN: string
            DROPBOX_TEST_TOKEN: string
            AWS_API_KEY_ID: string
            AWS_API_KEY: string
        }
    }

    type AppModels = typeof import('./src/models') & {
        article: Model<any, any, typeof Article.types>
    }
    
    let App : typeof AppContainer & {
        Models: AppModels
    }

    let api : AxiosInstance
    let withToken : (token: string) => AxiosInstance

    namespace Types {

        export interface Partner extends PartnerInfo {
            name:         string;
            vip:          boolean;
            private:      boolean;
            email:        string;
            thumbnail:    string;
        }

        export interface PartnerInfo {
            socialName:   string;
            artisticName: string;
            document:     Document;
            document_rg:  Document;
            occupation:   string;
            expertise:    string;
            address:      string;
            cep:          string;
            city:         string;
            country:      string;
            phone_first:  string;
            phone_second: string;
            url_callback: string;
            facebook:     string;
            instagram:    string;
            youtube:      string;
            linkedin:     string;
            telegram:     string;
            modalities:   string;
        }

        export interface Document {
            type:   "CPF" | "CNPJ";
            number: string;
        }

    }
}