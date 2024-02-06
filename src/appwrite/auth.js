import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client(); //step 1
  account;

  //Q)how to avoide vendor locking or dependency lock problem??


  //ANS==>>just change the internal implementation of constructor and following functions (createAccount,login.....) as per the new backend as service(i.e....firebase,khudka backend session)
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client); //step 2
  }

  //signup functionality--->>

  async createAccount({ email, password, name }) {
    //this is the method that avoids vendor locking ....it abstracts the process of Account creation from user so we can change the internal implementation of this method ....if appwrite blocked   ...........all process is inside this function
    try {
      const userAccount = await this.account.create(
        ID.unique(),//id and email are compulsory with sequence at 1 and 2 respectively from the appwrite documentation
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //login functionality-->>
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      return error;
    }
  }

  // async getCurrent() {
  //   try {
  //     return await this.account.get();
  //   } catch (error) {
  //     console.log("Appwrite service ::getCurrentUser::error", error);
  //   }
  //   return null;
  // }

  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
}


  //logout-->>
  async logout() {
    try {
      await this.account.deleteSessions();//this will delete all sessions
    } catch (error) {
      console.log("Appwrite service::logout::error", error);
    }
  }
}

// export default AuthService;
const authService = new AuthService();
export default authService;
