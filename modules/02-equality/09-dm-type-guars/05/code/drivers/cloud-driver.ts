export interface CloudCredentials{
  productId: string;
  subscription: string;
}
export const createCloudStorage = (settings:CloudCredentials):Storage =>{throw new Error('just an example');}
