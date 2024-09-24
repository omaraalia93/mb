export interface IErrorResponse {
    id:number;
    httpStatusCode:number;
    message:IErrorResponseMessage
}

export interface IErrorResponseMessage {
    id:number,
    messageCode:string,
    messageType :string,
    originalText:string,
    language:string,
    languageCode:string,
    plainText:string,
    title:string,
}
