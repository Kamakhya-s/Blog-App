import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//we create services in form of function which are require
// such that only this page need change if switch to firebase or other db
 class AuthService{
client = new Client();
account;
constructor()
{
    this.client
    .setEndpoint(conf.appwriteURL)
    .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  //  console.log(this.account);
}
async createAccount({email,password,name})
{
 try {
      const userAccount=  await this.account.create(ID.unique(),email,password,name);
        if(userAccount)
        {//call another method
            return this.login({email,password});
        }
        else return userAccount;
        
            } catch (error) {
                throw error;
            }
}

async login({email,password})
{
  try {
    return await this.account.createEmailPasswordSession(email,password);
    
  } catch (error) {
    throw error;
  }
}

async getCurrentUser() {
     try {
         return await this.account.get();
     } catch (error) {
         console.log("Appwrite service :: getCurrentUser :: error"+ error.message);
          
     }
    return null;
}
async logout()
{
    try {
    await this.account.deleteSessions();
    } 
    catch (error) {
      console.log( "Appwrite service :: logout :: error "+error.message);
      return null;
    }
    return null;
}
}


const authService = new AuthService();
export default authService