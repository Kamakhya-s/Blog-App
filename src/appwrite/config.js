import conf from "../conf/conf.js";
import { Client, ID , Databases,Storage,Query } from "appwrite";

//here create service for db storage specifically
export class Service
{
    client= new Client();
    databases;
    bucket;
    constructor(){  
         this.client
    .setEndpoint(conf.appwriteURL)
    .setProject(conf.appwriteProjectID);
 
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);

}
async createPost({title,slug,featuredImage,content,status,userid})
{
    try {
       return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,     //documentId
       { 
            title,
            content,
            featuredImage,
            userid,
            status}
            
       )

    } catch (error) {
        throw "Appwrite service :: createPost :: error",error;
    }
}

async updatePost(slug,{title,featuredImage,content,status})
{
   try {
    return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }
    )
    
   } catch (error) {
   throw "Appwrite serive :: updatePost :: error", error;
   }
}
async deletePost(slug)
{
    try {
         return await this.databases.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
      return true;
    } catch (error) {
        throw "Appwrite service :: deletePost :: error",error;
       // return false
    }
   
}
async getPost(slug){
try {
   return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
    )
} catch (error) {
   console.log( "Appwrite service :: getPost :: error",error);
    return false;
}}

async getallPost(queries = [Query.equal("status", "active")]){
    //queries=[Query.equal("status","active")]
try {
 return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
    )

} catch (error) {
    console.log(    "Appwrite service :: getallPost :: error",error);
 
    return false;
}}

//file uplaod

async uploadFile(file)
{
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        throw "Appwrite service :: uploadFile :: error",error;
       // return false;
    }
}
async deleteFile(fileID)
{
    try {
        return await this.bucket.deleteFile(
            conf.appwriteBucketID,
            fileID
        )
        return true
    } catch (error) {
        throw "Appwrite service :: deleteFile :: error",error;
        return false;
    }
}
getFilePreview(fileID)
{
    // return this.bucket.getFilePreview(
    //     conf.appwriteBucketID,
    //     fileID,
    //     1200,               //width
    //     0,                  //height
    //     'center',           // crop center  
    //     '10',               // slight compression
    //     5,                  // border width    
    //     'CDCA30',           // border color
    //     15,                 // border radius
    //     1,                  // full opacity
    //     0,                  // no rotation
    //     'FFFFFF',           // background color
    //     'jpg'
    // )
    return this.bucket.getFilePreview(conf.appwriteBucketID, fileID).href;
}
}
const service = new Service()
export default service